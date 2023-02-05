from logging import getLogger
from typing import Callable, Tuple

import torch
import numpy as np
from diffusers import OnnxStableDiffusionInpaintPipeline
from PIL import Image

from ..device_pool import JobContext
from ..diffusion.load import get_latents_from_seed, load_pipeline
from ..image import expand_image, mask_filter_none, noise_source_histogram
from ..output import save_image
from ..params import Border, ImageParams, Size, SizeChart, StageParams
from ..utils import ServerContext, is_debug
from .utils import process_tile_grid

logger = getLogger(__name__)


def blend_inpaint(
    job: JobContext,
    server: ServerContext,
    stage: StageParams,
    params: ImageParams,
    source_image: Image.Image,
    *,
    expand: Border,
    mask_image: Image.Image = None,
    fill_color: str = "white",
    mask_filter: Callable = mask_filter_none,
    noise_source: Callable = noise_source_histogram,
    **kwargs,
) -> Image.Image:
    logger.info("upscaling image by expanding borders", expand)

    if mask_image is None:
        # if no mask was provided, keep the full source image
        mask_image = Image.new("RGB", source_image.size, "black")

    source_image, mask_image, noise_image, _full_dims = expand_image(
        source_image,
        mask_image,
        expand,
        fill=fill_color,
        noise_source=noise_source,
        mask_filter=mask_filter,
    )

    if is_debug():
        save_image(server, "last-source.png", source_image)
        save_image(server, "last-mask.png", mask_image)
        save_image(server, "last-noise.png", noise_image)

    def outpaint(image: Image.Image, dims: Tuple[int, int, int]):
        left, top, tile = dims
        size = Size(*image.size)
        mask = mask_image.crop((left, top, left + tile, top + tile))

        if is_debug():
            save_image(server, "tile-source.png", image)
            save_image(server, "tile-mask.png", mask)

        pipe = load_pipeline(
            OnnxStableDiffusionInpaintPipeline,
            params.model,
            params.scheduler,
            job.get_device(),
            params.lpw,
        )
        if params.lpw:
            pipe = pipe.inpaint
            rng = torch.manual_seed(params.seed)
        else:
            rng = np.random.RandomState(params.seed)

        latents = get_latents_from_seed(params.seed, size)

        result = pipe(
            params.prompt,
            generator=rng,
            guidance_scale=params.cfg,
            height=size.height,
            image=image,
            latents=latents,
            mask_image=mask,
            negative_prompt=params.negative_prompt,
            num_inference_steps=params.steps,
            width=size.width,
        )
        return result.images[0]

    output = process_tile_grid(source_image, SizeChart.auto, 1, [outpaint])

    logger.info("final output image size", output.size)
    return output
