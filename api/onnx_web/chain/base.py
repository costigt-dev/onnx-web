from datetime import timedelta
from logging import getLogger
from time import monotonic
from typing import Any, List, Optional, Tuple

from PIL import Image

from ..output import save_image
from ..params import ImageParams, StageParams
from ..server import ServerContext
from ..utils import is_debug
from ..worker import ProgressCallback, WorkerContext
from .stage import BaseStage
from .tile import needs_tile, process_tile_order

logger = getLogger(__name__)


PipelineStage = Tuple[BaseStage, StageParams, Optional[dict]]


class ChainProgress:
    def __init__(self, parent: ProgressCallback, start=0) -> None:
        self.parent = parent
        self.step = start
        self.total = 0

    def __call__(self, step: int, timestep: int, latents: Any) -> None:
        if step < self.step:
            # accumulate on resets
            self.total += self.step

        self.step = step
        self.parent(self.get_total(), timestep, latents)

    def get_total(self) -> int:
        return self.step + self.total

    @classmethod
    def from_progress(cls, parent: ProgressCallback):
        start = parent.step if hasattr(parent, "step") else 0
        return ChainProgress(parent, start=start)


class ChainPipeline:
    """
    Run many stages in series, passing the image results from each to the next, and processing
    tiles as needed.
    """

    def __init__(
        self,
        stages: Optional[List[PipelineStage]] = None,
    ):
        """
        Create a new pipeline that will run the given stages.
        """
        self.stages = list(stages or [])

    def append(self, stage: Optional[PipelineStage]):
        """
        Append an additional stage to this pipeline.

        This requires an already-assembled `PipelineStage`. Use `ChainPipeline.stage` if you want the pipeline to
        assemble the stage from loose arguments.
        """
        if stage is not None:
            self.stages.append(stage)

    def run(
        self,
        job: WorkerContext,
        server: ServerContext,
        params: ImageParams,
        source: Optional[Image.Image],
        callback: Optional[ProgressCallback],
        **kwargs
    ) -> Image.Image:
        """
        TODO: handle List[Image] inputs and outputs
        """
        return self(job, server, params, source=source, callback=callback, **kwargs)

    def stage(self, callback: BaseStage, params: StageParams, **kwargs):
        self.stages.append((callback, params, kwargs))
        return self

    def __call__(
        self,
        job: WorkerContext,
        server: ServerContext,
        params: ImageParams,
        source: Optional[Image.Image] = None,
        callback: Optional[ProgressCallback] = None,
        **pipeline_kwargs
    ) -> Image.Image:
        """
        DEPRECATED: use `run` instead
        """
        if callback is not None:
            callback = ChainProgress.from_progress(callback)

        start = monotonic()
        image = source

        if source is not None:
            logger.info(
                "running pipeline on source image with dimensions %sx%s",
                source.width,
                source.height,
            )
        else:
            logger.info("running pipeline without source image")

        for stage_pipe, stage_params, stage_kwargs in self.stages:
            name = stage_params.name or stage_pipe.__class__.__name__
            kwargs = stage_kwargs or {}
            kwargs = {**pipeline_kwargs, **kwargs}

            if image is not None:
                logger.debug(
                    "running stage %s with source size of %sx%s, parameters: %s",
                    name,
                    image.width,
                    image.height,
                    kwargs.keys(),
                )
            else:
                logger.debug(
                    "running stage %s without source image, %s", name, kwargs.keys()
                )

            if needs_tile(
                stage_pipe.max_tile,
                stage_params.tile_size,
                size=kwargs.get("size", None),
                source=image,
            ):
                tile = stage_params.tile_size
                if stage_pipe.max_tile > 0:
                    tile = min(stage_pipe.max_tile, stage_params.tile_size)

                logger.info(
                    "image larger than tile size of %s, tiling stage",
                    tile,
                )

                def stage_tile(tile: Image.Image, _dims) -> Image.Image:
                    tile = stage_pipe.run(
                        job,
                        server,
                        stage_params,
                        params,
                        tile,
                        callback=callback,
                        **kwargs,
                    )

                    if is_debug():
                        save_image(server, "last-tile.png", tile)

                    return tile

                image = process_tile_order(
                    stage_params.tile_order,
                    image,
                    tile,
                    stage_params.outscale,
                    [stage_tile],
                    **kwargs,
                )
            else:
                logger.debug("image within tile size of %s, running stage", tile)
                image = stage_pipe.run(
                    job,
                    server,
                    stage_params,
                    params,
                    image,
                    callback=callback,
                    **kwargs,
                )

            logger.debug(
                "finished stage %s with result size of %sx%s",
                name,
                image.width,
                image.height,
            )

            if is_debug():
                save_image(server, "last-stage.png", image)

        end = monotonic()
        duration = timedelta(seconds=(end - start))
        logger.info(
            "finished pipeline in %s with result size of %sx%s",
            duration,
            image.width,
            image.height,
        )
        return image
