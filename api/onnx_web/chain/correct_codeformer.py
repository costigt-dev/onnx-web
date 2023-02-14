from logging import getLogger

from PIL import Image

from ..params import ImageParams, StageParams, UpscaleParams
from ..server.device_pool import JobContext
from ..utils import ServerContext

logger = getLogger(__name__)

device = "cpu"


def correct_codeformer(
    job: JobContext,
    _server: ServerContext,
    stage: StageParams,
    _params: ImageParams,
    source: Image.Image,
    *,
    source_image: Image.Image = None,
    upscale: UpscaleParams,
    **kwargs,
) -> Image.Image:
    from codeformer import CodeFormer

    device = job.get_device()
    # TODO: terrible names, fix
    image = source or source_image

    pipe = CodeFormer(upscale=upscale.face_outscale).to(device.torch_device())
    return pipe(image)
