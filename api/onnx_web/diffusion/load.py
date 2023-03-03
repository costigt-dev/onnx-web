from logging import getLogger
from os import path
from typing import Any, Optional, Tuple

import numpy as np
from diffusers import (
    DDIMScheduler,
    DDPMScheduler,
    DiffusionPipeline,
    DPMSolverMultistepScheduler,
    DPMSolverSinglestepScheduler,
    EulerAncestralDiscreteScheduler,
    EulerDiscreteScheduler,
    HeunDiscreteScheduler,
    IPNDMScheduler,
    KarrasVeScheduler,
    KDPM2AncestralDiscreteScheduler,
    KDPM2DiscreteScheduler,
    LMSDiscreteScheduler,
    OnnxRuntimeModel,
    PNDMScheduler,
    StableDiffusionPipeline,
)
from transformers import CLIPTokenizer

from .clip_embedder import load_tokenizer

try:
    from diffusers import DEISMultistepScheduler
except ImportError:
    from ..diffusion.stub_scheduler import StubScheduler as DEISMultistepScheduler

from ..params import DeviceParams, Size
from ..server import ServerContext
from ..utils import run_gc

logger = getLogger(__name__)

latent_channels = 4
latent_factor = 8

pipeline_schedulers = {
    "ddim": DDIMScheduler,
    "ddpm": DDPMScheduler,
    "deis-multi": DEISMultistepScheduler,
    "dpm-multi": DPMSolverMultistepScheduler,
    "dpm-single": DPMSolverSinglestepScheduler,
    "euler": EulerDiscreteScheduler,
    "euler-a": EulerAncestralDiscreteScheduler,
    "heun": HeunDiscreteScheduler,
    "ipndm": IPNDMScheduler,
    "k-dpm-2-a": KDPM2AncestralDiscreteScheduler,
    "k-dpm-2": KDPM2DiscreteScheduler,
    "karras-ve": KarrasVeScheduler,
    "lms-discrete": LMSDiscreteScheduler,
    "pndm": PNDMScheduler,
}


def get_pipeline_schedulers():
    return pipeline_schedulers


def get_scheduler_name(scheduler: Any) -> Optional[str]:
    for k, v in pipeline_schedulers.items():
        if scheduler == v or scheduler == v.__name__:
            return k

    return None


def get_latents_from_seed(seed: int, size: Size, batch: int = 1) -> np.ndarray:
    """
    From https://www.travelneil.com/stable-diffusion-updates.html.
    This one needs to use np.random because of the return type.
    """
    latents_shape = (
        batch,
        latent_channels,
        size.height // latent_factor,
        size.width // latent_factor,
    )
    rng = np.random.default_rng(seed)
    image_latents = rng.standard_normal(latents_shape).astype(np.float32)
    return image_latents


def get_tile_latents(
    full_latents: np.ndarray, dims: Tuple[int, int, int]
) -> np.ndarray:
    x, y, tile = dims
    t = tile // latent_factor
    x = x // latent_factor
    y = y // latent_factor
    xt = x + t
    yt = y + t

    return full_latents[:, :, y:yt, x:xt]


def optimize_pipeline(
    server: ServerContext,
    pipe: StableDiffusionPipeline,
) -> None:
    if "diffusers-attention-slicing" in server.optimizations:
        logger.debug("enabling attention slicing on SD pipeline")
        try:
            pipe.enable_attention_slicing()
        except Exception as e:
            logger.warning("error while enabling attention slicing: %s", e)

    if "diffusers-vae-slicing" in server.optimizations:
        logger.debug("enabling VAE slicing on SD pipeline")
        try:
            pipe.enable_vae_slicing()
        except Exception as e:
            logger.warning("error while enabling VAE slicing: %s", e)

    if "diffusers-cpu-offload-sequential" in server.optimizations:
        logger.debug("enabling sequential CPU offload on SD pipeline")
        try:
            pipe.enable_sequential_cpu_offload()
        except Exception as e:
            logger.warning("error while enabling sequential CPU offload: %s", e)

    elif "diffusers-cpu-offload-model" in server.optimizations:
        # TODO: check for accelerate
        logger.debug("enabling model CPU offload on SD pipeline")
        try:
            pipe.enable_model_cpu_offload()
        except Exception as e:
            logger.warning("error while enabling model CPU offload: %s", e)

    if "diffusers-memory-efficient-attention" in server.optimizations:
        # TODO: check for xformers
        logger.debug("enabling memory efficient attention for SD pipeline")
        try:
            pipe.enable_xformers_memory_efficient_attention()
        except Exception as e:
            logger.warning("error while enabling memory efficient attention: %s", e)


def load_pipeline(
    server: ServerContext,
    pipeline: DiffusionPipeline,
    model: str,
    scheduler_name: str,
    device: DeviceParams,
    lpw: bool,
    inversion: Optional[str],
):
    pipe_key = (pipeline, model, device.device, device.provider, lpw, inversion)
    scheduler_key = (scheduler_name, model)
    scheduler_type = get_pipeline_schedulers()[scheduler_name]

    cache_pipe = server.cache.get("diffusion", pipe_key)

    if cache_pipe is not None:
        logger.debug("reusing existing diffusion pipeline")
        pipe = cache_pipe

        cache_scheduler = server.cache.get("scheduler", scheduler_key)
        if cache_scheduler is None:
            logger.debug("loading new diffusion scheduler")
            scheduler = scheduler_type.from_pretrained(
                model,
                provider=device.ort_provider(),
                sess_options=device.sess_options(),
                subfolder="scheduler",
            )

            if device is not None and hasattr(scheduler, "to"):
                scheduler = scheduler.to(device.torch_str())

            pipe.scheduler = scheduler
            server.cache.set("scheduler", scheduler_key, scheduler)
            run_gc([device])

    else:
        logger.debug("unloading previous diffusion pipeline")
        server.cache.drop("diffusion", pipe_key)
        run_gc([device])

        if lpw:
            custom_pipeline = "./onnx_web/diffusion/lpw_stable_diffusion_onnx.py"
        else:
            custom_pipeline = None

        logger.debug("loading new diffusion pipeline from %s", model)
        components = {
            "scheduler": scheduler_type.from_pretrained(
                model,
                provider=device.ort_provider(),
                sess_options=device.sess_options(),
                subfolder="scheduler",
            )
        }

        if inversion is not None:
            if "ckpt" in inversion:
                components["tokenizer"] = load_tokenizer(["/home/ssube/textual_inversion/autumn.ckpt"])
            else:
                logger.debug("loading text encoder from %s", inversion)
                components["text_encoder"] = OnnxRuntimeModel.from_pretrained(
                    path.join(inversion, "text_encoder"),
                    provider=device.ort_provider(),
                    sess_options=device.sess_options(),
                )
                components["tokenizer"] = CLIPTokenizer.from_pretrained(
                    path.join(inversion, "tokenizer"),
                )

        pipe = pipeline.from_pretrained(
            model,
            custom_pipeline=custom_pipeline,
            provider=device.ort_provider(),
            sess_options=device.sess_options(),
            revision="onnx",
            safety_checker=None,
            **components,
        )

        if not server.show_progress:
            pipe.set_progress_bar_config(disable=True)

        optimize_pipeline(server, pipe)

        if device is not None and hasattr(pipe, "to"):
            pipe = pipe.to(device.torch_str())

        server.cache.set("diffusion", pipe_key, pipe)
        server.cache.set("scheduler", scheduler_key, components["scheduler"])

    return pipe
