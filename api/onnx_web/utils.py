import gc
import threading
import importlib
from logging import getLogger
from os import environ, path
from typing import Any, Dict, List, Optional, Sequence, Union
from platform import system

import torch

from .params import DeviceParams, SizeChart

logger = getLogger(__name__)

SAFE_CHARS = "._-"


def base_join(base: str, tail: str) -> str:
    tail_path = path.relpath(path.normpath(path.join("/", tail)), "/")
    return path.join(base, tail_path)


def is_debug() -> bool:
    return get_boolean(environ, "DEBUG", False)


def get_boolean(args: Any, key: str, default_value: bool) -> bool:
    return args.get(key, str(default_value)).lower() in ("1", "t", "true", "y", "yes")


def get_and_clamp_float(
    args: Any, key: str, default_value: float, max_value: float, min_value=0.0
) -> float:
    return min(max(float(args.get(key, default_value)), min_value), max_value)


def get_and_clamp_int(
    args: Any, key: str, default_value: int, max_value: int, min_value=1
) -> int:
    return min(max(int(args.get(key, default_value)), min_value), max_value)


def get_from_list(
    args: Any, key: str, values: Sequence[Any], default_value: Optional[Any] = None
) -> Optional[Any]:
    selected = args.get(key, default_value)
    if selected in values:
        return selected

    logger.warn("invalid selection %s, options: %s", selected, values)
    if len(values) > 0:
        return values[0]

    return None


def get_from_map(args: Any, key: str, values: Dict[str, Any], default: Any) -> Any:
    selected = args.get(key, default)
    if selected in values:
        return values[selected]
    else:
        return values[default]


def get_not_empty(args: Any, key: str, default: Any) -> Any:
    val = args.get(key, default)

    if val is None or len(val) == 0:
        val = default

    return val


def get_size(val: Union[int, str, None]) -> Union[int, SizeChart]:
    if val is None:
        return SizeChart.auto

    if type(val) is int:
        return val

    if type(val) is str:
        for size in SizeChart:
            if val == size.name:
                return size

        return int(val)

    raise ValueError("invalid size")


def run_gc(devices: Optional[List[DeviceParams]] = None):
    logger.debug(
        "running garbage collection with %s active threads", threading.active_count()
    )
    gc.collect()

    if torch.cuda.is_available() and devices is not None:
        for device in [d for d in devices if d.device.startswith("cuda")]:
            logger.debug("running Torch garbage collection for device: %s", device)
            with torch.cuda.device(device.torch_str()):
                torch.cuda.empty_cache()
                torch.cuda.ipc_collect()
                mem_free, mem_total = torch.cuda.mem_get_info()
                mem_pct = (1 - (mem_free / mem_total)) * 100
                logger.debug(
                    "CUDA VRAM usage: %s of %s (%.2f%%)",
                    (mem_total - mem_free),
                    mem_total,
                    mem_pct,
                )


def sanitize_name(name):
    return "".join(x for x in name if (x.isalnum() or x in SAFE_CHARS))


def merge(a, b, path=None):
    "merges b into a"
    if path is None:
        path = []
    for key in b:
        if key in a:
            if isinstance(a[key], dict) and isinstance(b[key], dict):
                merge(a[key], b[key], path + [str(key)])
            elif a[key] == b[key]:
                pass  # same leaf value
            else:
                raise ValueError("conflict at %s" % ".".join(path + [str(key)]))
        else:
            a[key] = b[key]
    return a


toaster = None

def show_system_toast(msg: str) -> None:
    global toaster

    sys_name = system()
    if sys_name == "Linux":
        if importlib.util.find_spec("gi.repository") is not None:
            from gi.repository import Notify
            if toaster is None:
                Notify.init("onnx-web")

            Notify.Notification.new(msg).show()
        else:
            logger.info("please install the PyGObject module to enable toast notifications on Linux")
    elif sys_name == "Windows":
        if importlib.util.find_spec("win10toast") is not None:
            from win10toast import ToastNotifier
            if toaster is None:
                toaster = ToastNotifier()

            toaster.show_toast(msg, duration=15)
        else:
            logger.info("please install the win10toast module to enable toast notifications on Windows")
    else:
        logger.info("system notifications not yet available for %s", sys_name)
