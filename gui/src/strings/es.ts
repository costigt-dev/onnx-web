/* eslint-disable camelcase */
/**
 * This is a machine translation and may have some mistakes.
 *
 * If you have a more accurate translation for any of these strings, please open an issue or pull request.
 */
export const I18N_STRINGS_ES = {
  es: {
    translation: {
      admin: {
        restart: 'Reiniciar trabajadores',
      },
      convert: 'Guardar y convertir',
      error: {
        image: {
          csam: '',
          memory: '',
          oom: '',
          unknown: '',
        },
        inpaint: {
          support: 'Es posible que este modelo no admita la edición.',
        },
      },
      experimental: {
        label: 'Características Experimentales',
        latent_symmetry: {
          label: 'Simetría latente',
          gradient_start: 'Inicio de gradiente',
          gradient_end: 'Final del gradiente',
          line_of_symmetry: 'Línea de simetría',
        },
        prompt_editing: {
          add_suffix: 'Agregar sufijo',
          filter: 'Filtrar',
          label: '',
          min_length: 'Longitud mínima',
          remove_tokens: 'Eliminar fichas',
        },
      },
      extras: {
        add: 'Agregar',
        dest: 'Nombre de la carpeta',
        format: 'Formato de archivo',
        label: 'Etiqueta',
        model: 'Modelo',
        name: 'Nombre',
        remove: 'Eliminar',
        scale: 'Nivel',
        source: 'Origen',
        type: 'Tipo',
      },
      generate: 'Generar',
      profile: {
        add: 'Agregar perfil',
        saveName: 'Guardar el nombre del perfil',
        saveProfile: 'Guardar perfil',
        save: 'Guardar',
        saveCurrent: 'Guardar perfil actual',
        name: 'Nombre',
        cancel: 'Cancelar',
        load: 'Cargar perfil',
      },
      history: {
        empty: 'Sin antecedentes recientes. Presiona generar para crear una nueva imagen.',
      },
      highresMethod: {
        bilinear: 'Bilineal',
        lanczos: 'Lanczos',
        upscale: '',
      },
      image: {
        thumbnail: 'Miniatura',
      },
      input: {
        image: {
          empty: 'Por favor, seleccione una imagen.',
          mask: 'Máscara de imagen',
          source: 'Imagen de origen',
        },
        list: {
          error: {
            specific: 'Error: {{message}}',
            unknown: 'Error desconocido',
          },
          idle: 'Inactivo',
          loading: 'Sobreprima',
        },
        numeric: {
          error: {
            range: 'Fuera de intervalo',
          },
        },
      },
      loading: {
        cancel: 'Cancelar',
        progress: '{{steps.current}} de {{steps.total}} pasos, {{tiles.current}} de {{tiles.total}} fichas, {{stages.current}} de {{stages.total}} etapas',
        queue: '{{current}} de {{total}} en la cola',
        server: 'Conectando al servidor...',
        unknown: 'muchos',
      },
      mask: {
        fill: {
          black: 'Llenar con negro',
          white: 'Llenar con blanco',
        },
        gray: {
          black: 'Convertir gris a negro',
          white: 'Convertir gris a blanco',
        },
        help: '',
        invert: 'Colores invertidos',
      },
      maskFilter: {
        'gaussian-multiply': 'Gaussiana con multiplicación',
        'gaussian-screen': 'Gaussiana con pantalla',
        'none': 'Ninguno',
      },
      modelType: {
        control: 'ControlNet',
        correction_one: 'Modelo de corrección',
        correction_other: 'Modelos de corrección',
        diffusion_one: 'Modelo de difusión',
        diffusion_other: 'Modelos de difusión',
        inversion: 'Incrustar',
        lora: 'LoRA',
        network_one: 'Red adicional',
        network_other: 'Redes adicionales',
        source_one: 'Otra fuente',
        source_other: 'Otras fuentes',
        upscaling_one: 'Modelo de aumento',
        upscaling_other: 'Modelos de aumento',
      },
      noiseSource: {
        'fill-edge': 'Rellena los bordes',
        'fill-mask': 'Rellena la máscara',
        'gaussian': 'Desenfoque gaussiano',
        'histogram': 'Ruido de histograma',
        'normal': 'Ruido gaussiano',
        'uniform': 'Ruido uniforme',
      },
      parameter: {
        batch: 'Tamaño del lote',
        brush: {
          color: 'Color del pincel',
          size: 'Tamaño del pincel',
          strength: 'Opacidad del pincel',
        },
        cfg: 'CFG',
        eta: 'Eta',
        fillColor: 'Color de relleno',
        height: 'Altura',
        highres: {
          iterations: 'Iteraciones',
          label: 'Alta resolución',
          method: '',
          scale: 'Nivel',
          steps: 'Pasos',
          strength: 'Fortaleza',
        },
        loopback: 'Bucle invertido',
        lpw: 'Ponderación de entrada larga',
        maskFilter: 'Filtro de máscara',
        noiseSource: 'Fuente de ruido',
        negativePrompt: 'Contraindicación',
        newSeed: 'Nueva semilla',
        outpaint: {
          label: 'Pintar afuera',
          left: 'Izquierda',
          right: 'Derecha',
          top: 'Top',
          bottom: 'Fondo',
        },
        overlap: 'Superposición',
        pipeline: 'Tubería',
        platform: 'Plataforma de hardware',
        prompt: 'Aviso',
        scheduler: 'Planificador',
        seed: 'Semilla',
        size: 'Tamaño',
        sourceFilter: 'Filtro de fuente',
        steps: 'Pasos',
        strength: 'Fuerza',
        tiled_vae: 'Embaldosado VAE',
        tiles: 'Losas',
        tileOrder: 'Orden de secciones',
        unet_overlap: 'UNet superposición',
        unet_tile: 'UNet teja',
        upscale: {
          label: 'Aumento',
          denoise: 'Eliminar ruido',
          scale: 'Escala',
          order: 'Orden',
          outscale: 'Escala de producción',
        },
        vae_overlap: 'VAE superposición',
        vae_tile: 'VAE teja',
        width: 'Anchura',
        correction: {
          label: 'Corrección facial',
          strength: 'Fuerza',
          outscale: 'Escala de producción',
        },
      },
      pipeline: {
        'none': '',
        'controlnet': '',
        'img2img': '',
        'img2img-sdxl': '',
        'inpaint': '',
        'inpaint-sdxl': '',
        'lpw': '',
        'panorama': '',
        'panorama-sdxl': '',
        'pix2pix': '',
        'txt2img': '',
        'txt2img-sdxl': '',
        'txt2txt': '',
        'upscale': '',
      },
      save: {
        image: 'Imagen',
        metadata: 'Metadata',
      },
      setting: {
        connectServer: 'Conectar al servidor',
        history: {
          limit: 'Longitud del historial de la imagen',
          width: 'Ancho del historial de imágenes',
        },
        prompt: 'Solicitud predeterminada',
        reset: {
          all: 'Resetear todo',
          img2img: 'Resetear img2img',
          inpaint: 'Resetear inpaint',
          txt2img: 'Resetear txt2img',
        },
        scheduler: 'Programador predeterminado',
        server: 'Servidor API',
        state: {
          label: 'Estado del cliente',
          load: 'Carga estado',
          save: 'Ahorrar',
        },
        darkMode: 'Modo Oscuro',
      },
      sourceFilter: {
        none: '',
        gaussian: '',
        noise: '',
        face: '',
        segment: '',
        mlsd: '',
        normal: '',
        hed: '',
        scribble: '',
        depth: '',
        canny: '',
        openpose: '',
      },
      tab: {
        blend: 'Mezclar',
        img2img: 'Img2img',
        inpaint: 'Inpaint',
        models: 'Modelos',
        settings: 'Ajustes',
        txt2txt: 'Txt2txt',
        txt2img: 'Txt2img',
        upscale: 'Aumentar',
      },
      tileOrder: {
        grid: 'Red',
        spiral: 'Espiral',
      },
      tooltip: {
        delete: 'Borrar',
        next: 'Próximo',
        previous: 'Anterior',
        retry: 'Rever',
        save: 'Ahorrar',
      },
      upscaleOrder: {
        'correction-both': 'corrección en ambos',
        'correction-first': 'corrección primero',
        'correction-last': 'última corrección',
      },
      wildcard: 'Comodín',
    },
  },
};
