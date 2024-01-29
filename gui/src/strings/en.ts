/* eslint-disable camelcase */
export const I18N_STRINGS_EN = {
  en: {
    translation: {
      admin: {
        restart: 'Restart Workers',
      },
      convert: 'Save and Convert',
      error: {
        image: {
          csam: 'CSAM detected',
          memory: 'Memory error generating image',
          oom: 'Out of memory generating image',
          unknown: 'Unknown error generating image',
        },
        inpaint: {
          support: 'This diffusion model may not support inpainting.',
        },
      },
      extras: {
        add: 'Add',
        dest: 'Folder',
        format: 'Format',
        label: 'Label',
        model: 'Model',
        name: 'Name',
        remove: 'Remove',
        scale: 'Scale',
        source: 'Source',
        type: 'Type',
      },
      generate: 'Generate',
      profile: {
        add: 'Add Profile',
        saveName: 'Save Profile Name',
        saveProfile: 'Save Profile',
        save: 'Save',
        saveCurrent: 'Save Current Profile',
        name: 'Name',
        cancel: 'Cancel',
        load: 'Load Profile',
      },
      highresMethod: {
        bilinear: 'Bilinear',
        lanczos: 'Lanczos',
        upscale: 'Upscaling',
      },
      history: {
        empty: 'No recent history. Press Generate to create an image.',
      },
      image: {
        thumbnail: 'Thumbnail',
      },
      input: {
        image: {
          empty: 'Please select an image.',
          mask: 'Mask',
          source: 'Source',
        },
        list: {
          error: {
            specific: 'Error: {{message}}',
            unknown: 'Unknown Error',
          },
          idle: 'Idle',
          loading: 'Loading...',
        },
        numeric: {
          error: {
            range: 'Out of range',
          },
        },
      },
      loading: {
        cancel: 'Cancel',
        progress: '{{steps.current}} of {{steps.total}} steps, {{tiles.current}} of {{tiles.total}} tiles, {{stages.current}} of {{stages.total}} stages',
        queue: '{{current}} of {{total}} in queue',
        server: 'Connecting to server...',
        unknown: 'many',
      },
      mask: {
        fill: {
          black: 'Fill with black',
          white: 'Fill with white',
        },
        gray: {
          black: 'Gray to black',
          white: 'Gray to white',
        },
        // eslint-disable-next-line max-len
        help: 'Black pixels in the mask will stay the same, white pixels will be replaced. The masked pixels will be blended with the noise source before the diffusion model runs, giving it more variety to use.',
        invert: 'Invert',
      },
      maskFilter: {
        'gaussian-multiply': 'Gaussian Multiply',
        'gaussian-screen': 'Gaussian Screen',
        'none': 'None',
      },
      model: {
        'none': 'None',
        // correction
        'correction-codeformer': 'CodeFormer',
        'correction-gfpgan-v1-3': 'GFPGAN v1.3',
        // diffusion
        'stable-diffusion-onnx-v1-4': 'Stable Diffusion v1.4',
        'stable-diffusion-onnx-v1-5': 'Stable Diffusion v1.5',
        'stable-diffusion-onnx-v1-inpainting': 'SD Inpainting v1',
        'stable-diffusion-onnx-v2-0': 'Stable Diffusion v2.0',
        'stable-diffusion-onnx-v2-1': 'Stable Diffusion v2.1',
        'stable-diffusion-onnx-v2-inpainting': 'SD Inpainting v2',
        // inversion
        'inversion-cubex': 'Cubex',
        'inversion-birb': 'Birb Style',
        'inversion-line-art': 'Line Art',
        'inversion-minecraft': 'Minecraft Concept',
        'inversion-ugly-sonic': 'Ugly Sonic',
        // upscaling
        'upscaling-bsrgan-x2': 'BSRGAN x2',
        'upscaling-bsrgan-x4': 'BSRGAN x4',
        'upscaling-real-esrgan-x2-plus': 'Real ESRGAN x2 Plus',
        'upscaling-real-esrgan-x4-plus': 'Real ESRGAN x4 Plus',
        'upscaling-real-esrgan-x4-v3': 'Real ESRGAN x4 v3',
        'upscaling-stable-diffusion-x4': 'Stable Diffusion x4',
        'upscaling-swinir-classical-x2': 'SwinIR Classical x2',
        'upscaling-swinir-classical-x3': 'SwinIR Classical x3',
        'upscaling-swinir-classical-x4': 'SwinIR Classical x4',
        'upscaling-swinir-classical-x8': 'SwinIR Classical x8',
        'upscaling-swinir-real-large-x2': 'SwinIR Real Large x2',
        'upscaling-swinir-real-large-x4': 'SwinIR Real Large x4',
        'upscaling-swinir-real-x2': 'SwinIR Real x2',
        'upscaling-swinir-real-x4': 'SwinIR Real x4',
        // extras
        'diffusion-stablydiffused-aesthetic-v2-6': 'Aesthetic Mix v2.6',
        'diffusion-anything': 'Anything',
        'diffusion-anything-v3': 'Anything v3',
        'diffusion-anything-v4': 'Anything v4',
        'diffusion-darkvictorian': 'Dark Victorian',
        'diffusion-dreamlike-photoreal': 'Dreamlike Photoreal',
        'diffusion-dreamlike-photoreal-v1': 'Dreamlike Photoreal 1.0',
        'diffusion-dreamlike-photoreal-v2': 'Dreamlike Photoreal 2.0',
        'diffusion-ghibli': 'Ghibli',
        'diffusion-knollingcase': 'Knollingcase',
        'diffusion-openjourney': 'OpenJourney',
        'diffusion-openjourney-v1': 'OpenJourney v1',
        'diffusion-openjourney-v2': 'OpenJourney v2',
        'diffusion-pastel-mix': 'Pastel Mix',
        'diffusion-unstable-ink-dream-v6': 'Unstable Ink Dream v6',
        // controlnets
        'control': {
          canny: 'Canny Edges',
          depth: 'Depth Map',
          hed: 'HED Edges',
          mlsd: 'M-LSD Segmentation',
          normal: 'Normal Map',
          openpose: 'OpenPose',
          scribble: 'Scribble',
          seg: 'Image Segmentation',
        },
      },
      modelType: {
        control: 'ControlNet',
        correction_one: 'Correction Model',
        correction_other: 'Correction Models',
        diffusion_one: 'Diffusion Model',
        diffusion_other: 'Diffusion Models',
        inversion: 'Textual Inversion',
        lora: 'LoRA',
        network_one: 'Extra Network',
        network_other: 'Extra Networks',
        source_one: 'Other Source',
        source_other: 'Other Sources',
        upscaling_one: 'Upscaling Model',
        upscaling_other: 'Upscaling Models',
      },
      noiseSource: {
        'fill-edge': 'Fill Edges',
        'fill-mask': 'Fill Masked',
        'gaussian': 'Gaussian Blur',
        'histogram': 'Histogram Noise',
        'normal': 'Gaussian Noise',
        'uniform': 'Uniform Noise',
      },
      parameter: {
        batch: 'Batch Size',
        brush: {
          color: 'Brush Color',
          size: 'Brush Size',
          strength: 'Brush Strength',
        },
        cfg: 'CFG',
        eta: 'Eta',
        fillColor: 'Fill Color',
        height: 'Height',
        highres: {
          iterations: 'Iterations',
          label: 'Highres',
          method: 'Upscaler',
          scale: 'Scale',
          steps: 'Steps',
          strength: 'Strength',
        },
        loopback: 'Loopback',
        lpw: 'Long Prompt Weighting',
        maskFilter: 'Mask Filter',
        noiseSource: 'Noise Source',
        negativePrompt: 'Negative Prompt',
        newSeed: 'New Seed',
        outpaint: {
          label: 'Outpaint',
          left: 'Left',
          right: 'Right',
          top: 'Top',
          bottom: 'Bottom',
        },
        overlap: 'Overlap',
        pipeline: 'Pipeline',
        platform: 'Platform',
        prompt: 'Prompt',
        scheduler: 'Scheduler',
        seed: 'Seed',
        size: 'Size',
        sourceFilter: 'Source Filter',
        steps: 'Steps',
        strength: 'Strength',
        tiled_vae: 'Tiled VAE',
        tileOrder: 'Tile Order',
        unet_overlap: 'UNet Overlap',
        unet_tile: 'UNet Tile Size',
        upscale: {
          label: 'Upscale',
          denoise: 'Denoise',
          scale: 'Scale',
          order: 'Upscale Order',
          outscale: 'Outscale',
        },
        vae_overlap: 'VAE Overlap',
        vae_tile: 'VAE Tile Size',
        width: 'Width',
        correction: {
          label: 'Face Correction',
          strength: 'Strength',
          outscale: 'Outscale',
        },
      },
      pipeline: {
        'none': 'Stable Diffusion',
        'controlnet': 'ControlNet',
        'img2img': 'Img2Img',
        'img2img-sdxl': 'Img2Img SDXL',
        'inpaint': 'Inpaint',
        'inpaint-sdxl': 'Inpaint SDXL',
        'lpw': 'Long Prompt Weighting',
        'panorama': 'Panorama',
        'panorama-sdxl': 'Panorama SDXL',
        'pix2pix': 'Instruct Pix2Pix',
        'txt2img': 'Txt2Img',
        'txt2img-sdxl': 'Txt2Img SDXL',
        'txt2txt': 'Txt2Txt',
        'upscale': 'Upscale',
      },
      platform: {
        amd: 'AMD GPU',
        // eslint-disable-next-line id-blacklist
        any: 'Any Platform',
        cpu: 'CPU',
        cuda: 'CUDA',
        directml: 'DirectML',
        nvidia: 'Nvidia GPU',
        rocm: 'ROCm',
        tensorrt: 'TensorRT',
      },
      save: {
        image: 'Image',
        metadata: 'Metadata',
      },
      setting: {
        connectServer: 'Connect',
        history: {
          limit: 'Image History Length',
          width: 'Image History Width',
        },
        prompt: 'Default Prompt',
        reset: {
          all: 'Reset All',
          img2img: 'Reset Img2img',
          inpaint: 'Reset Inpaint',
          txt2img: 'Reset Txt2img',
        },
        scheduler: 'Default Scheduler',
        server: 'API Server',
        state: {
          label: 'Client State',
          load: 'Load',
          save: 'Save',
        },
        darkMode: 'Dark Mode',
      },
      scheduler: {
        'ddim': 'DDIM',
        'ddpm': 'DDPM',
        'deis-multi': 'DEIS Multistep',
        'dpm-multi': 'DPM Multistep',
        'dpm-sde': 'DPM SDE (Turbo)',
        'dpm-single': 'DPM Singlestep',
        'euler': 'Euler',
        'euler-a': 'Euler Ancestral',
        'heun': 'Heun',
        'k-dpm-2-a': 'KDPM2 Ancestral',
        'k-dpm-2': 'KDPM2',
        'karras-ve': 'Karras Ve',
        'ipndm': 'iPNDM',
        'lcm': 'LCM',
        'lms-discrete': 'LMS',
        'pndm': 'PNDM',
        'unipc-multi': 'UniPC Multistep',
      },
      sourceFilter: {
        canny: 'Canny Edges',
        depth: 'Depth Map',
        face: 'Face Detection',
        gaussian: 'Gaussian Blur',
        hed: 'HED Edges',
        mlsd: 'M-LSD Segmentation',
        noise: 'Histogram Noise',
        none: 'None',
        normal: 'Normal Map',
        openpose: 'OpenPose',
        scribble: 'Scribble',
        segment: 'Image Segmentation',
      },
      tab: {
        blend: 'Blend',
        img2img: 'Img2img',
        inpaint: 'Inpaint',
        models: 'Models',
        settings: 'Settings',
        txt2txt: 'Txt2txt',
        txt2img: 'Txt2img',
        upscale: 'Upscale',
      },
      tileOrder: {
        grid: 'Grid',
        spiral: 'Spiral',
      },
      tooltip: {
        delete: 'Delete',
        next: 'Next',
        previous: 'Previous',
        retry: 'Retry',
        save: 'Save',
      },
      upscaleOrder: {
        'correction-both': 'Correction Both',
        'correction-first': 'Correction First',
        'correction-last': 'Correction Last',
      },
      wildcard: 'Wildcard',
    }
  },
};
