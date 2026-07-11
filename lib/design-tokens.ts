/**
 * Tokens de diseño — Café Valparaíso Web.
 *
 * Contrato visual en código, alineado 1:1 con docs/SISTEMA_DISENO.md.
 * Solo datos: no se conecta todavía a ningún componente ni a app/globals.css
 * (eso ocurre en GOAL 05/06). No modifica runtime, no depende de Tailwind,
 * no importa nada.
 *
 * Regla: cualquier cambio de color/tipografía/espaciado/motion se hace
 * primero aquí, nunca directamente en un componente.
 */

export const designTokens = {
  colors: {
    // Jerarquía cromática pública (dirección Claude Design, GOAL 17).
    // Base editorial casi negra con matiz verde + capas oliva para profundidad.
    // Es la vista canónica de la paleta; los grupos siguientes conservan los
    // alias históricos ya usados en el código (no se rompe ningún consumidor).
    hierarchy: {
      backgroundPrimary: '#181f0d', // NUEVO — fondo editorial principal del sitio público
      backgroundSecondary: '#343E1C', // = base.olive / surface.night — superficie secundaria
      surface: '#4A5728', // = border.night — superficie elevada / borde fuerte
      border: '#6B7A3C', // oliva claro — borde editorial (antes usado como texto, ahora borde)
      muted: '#8A9A52', // oliva atenuado — metadata/acento tenue
      accent: '#C1121F', // = brand.red — acento rojo editorial
      paper: '#F5F5F0', // = text.onNight.primary — marfil principal
    },
    // Neutros fundamentales de las dos superficies del sistema (Noche/Papel).
    base: {
      blackGreen: '#181f0d', // NUEVO — verde casi negro, base editorial del público (GOAL 17)
      ivory: '#F7F1E6', // marfil — fondo de Modo Papel (menú, agenda, librería, contacto)
      paper: '#EFE4D0', // beige/papel — superficie elevada sobre marfil
      ink: '#1C1912', // negro tinta — texto principal sobre superficies claras
      forest: '#2A331A', // verde bosque — superficie más profunda de Modo Noche
      olive: '#343E1C', // oliva editorial — superficie secundaria de Modo Noche
    },
    // Colores de identidad de marca.
    brand: {
      red: '#C1121F', // rojo de marca vivo — CTAs primarios, ticker
      redDark: '#960E17', // hover/pressed del rojo de marca; bordes de error
      wine: '#7A2230', // rojo vino/borgoña — acento editorial en Modo Papel (no es CTA)
      gold: '#C9A227', // dorado viejo/latón — eyebrows y micro-acentos, nunca superficie
    },
    // Acentos de texto ya validados sobre Modo Noche (WCAG AA).
    accent: {
      coral: '#FF7F70', // énfasis de texto sobre Modo Noche; también color de foco global
      oliveMuted: '#A6B86B', // texto secundario/atenuado sobre Modo Noche
    },
    // Fondos de sección y elevación por superficie.
    surface: {
      night: '#343E1C', // = base.olive
      nightDeep: '#2A331A', // = base.forest
      paper: '#F7F1E6', // = base.ivory
      paperRaised: '#EFE4D0', // = base.paper
      brandSolid: '#C1121F', // = brand.red, para bloques sólidos de marca
    },
    // Color de texto por superficie — nunca mezclar onNight con Modo Papel ni viceversa.
    text: {
      onNight: {
        primary: '#F5F5F0',
        muted: '#A6B86B',
        accent: '#FF7F70',
        eyebrow: '#C9A227',
        soft: '#D9DCC4',
      },
      onPaper: {
        primary: '#1C1912',
        secondary: '#6B6355', // gris cálido — verificar contraste real antes de cuerpo extenso
        muted: '#8C8373', // gris cálido claro — solo texto no esencial
      },
    },
    border: {
      night: '#4A5728', // divisores en Modo Noche (uso dominante ya real en el proyecto)
      nightSubtle: 'rgba(245, 245, 240, 0.12)',
      paper: 'rgba(28, 25, 18, 0.12)',
      paperStrong: 'rgba(28, 25, 18, 0.28)',
    },
    state: {
      focus: '#FF7F70', // = accent.coral, ya es la regla global :focus-visible
      success: '#5B7A4F',
      danger: '#960E17', // = brand.redDark, ya usado en errores de formulario
      dangerSurface: 'rgba(193, 18, 31, 0.10)',
    },
    overlay: {
      vignette: 'rgba(18, 24, 8, 0.6)',
      scrimNight: 'rgba(42, 51, 26, 0.72)',
      scrimPaper: 'rgba(28, 25, 18, 0.55)',
      grainOpacity: '0.05',
    },
  },

  typography: {
    fontFamily: {
      display: 'var(--font-playfair)', // Playfair Display — ya instalada, no se agrega ninguna
      body: 'var(--font-dm-sans)', // DM Sans — ya instalada
    },
    scale: {
      display: 'clamp(4rem, 12vw, 10rem)', // momentos de mayor peso (CTA final, portada)
      h1: 'clamp(2.75rem, 7.5vw, 6.5rem)',
      h2: '2.25rem',
      h3: '1.5rem',
      lead: '1.125rem',
      body: '1rem',
      caption: '0.875rem',
      eyebrow: '0.6875rem', // 11px, tamaño real dominante de eyebrows existentes
    },
    lineHeight: {
      display: '0.9',
      heading: '1.05',
      body: '1.625', // = Tailwind leading-relaxed, uso dominante real en párrafos
    },
    tracking: {
      tight: '-0.03em', // titulares
      normal: '0',
      wide: '0.2em', // labels y botones (uso dominante real)
      wider: '0.35em', // eyebrows de mayor énfasis (hero)
    },
  },

  spacing: {
    section: {
      mobile: '4rem',
      desktop: '7rem', // = py-28, uso dominante real
    },
    container: {
      x: '1rem', // = px-4, móvil
      xDesktop: '2rem', // = px-8, uso dominante real en desktop
    },
  },

  // Radios editoriales (GOAL 17): se abandona el aspecto redondeado tipo SaaS.
  // Criterio editorial, no brutalista — radios pequeños, `full` sólo para
  // badges y casos específicos, `none` para media expandida y sellos "stamp".
  radius: {
    none: '0', // media expandida a pantalla, sellos "stamp"
    sm: '0.25rem', // inputs, botones y detalles pequeños (antes 0.5rem)
    md: '0.375rem', // tarjetas editoriales (antes 1.25rem — se descarta el look SaaS)
    lg: '0.5rem', // media/video contenido (antes 1.5rem)
    full: '999px', // sólo badges y pills específicas
  },

  shadows: {
    none: 'none',
    // Sombra dura editorial ("sello de imprenta"), rasgo de identidad — sin blur.
    stamp: '5px 5px 0px 0px currentColor',
    // Sombra suave de elevación para tarjetas.
    soft: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },

  borders: {
    night: '1px solid #4A5728',
    nightSubtle: '1px solid rgba(245, 245, 240, 0.12)',
    paper: '1px solid rgba(28, 25, 18, 0.12)',
  },

  motion: {
    duration: {
      fast: '160ms', // press / feedback inmediato
      base: '300ms', // hover, underline, transición de color
      slow: '800ms', // reveal, entrada de sección
    },
    easing: {
      entrance: 'cubic-bezier(0.16, 1, 0.3, 1)', // fade-up, reveal, aparición de página
      standard: 'cubic-bezier(0.23, 1, 0.32, 1)', // press, hover, transición de estado
    },
  },

  layout: {
    maxWidth: {
      content: '72rem', // = max-w-6xl, contenedor dominante real
      wide: '80rem', // = max-w-7xl, hero ancho
      text: '42rem', // = max-w-2xl, columnas de lectura
      narrow: '36rem', // = max-w-sm, formularios/columnas angostas
    },
  },
} as const

export type DesignTokens = typeof designTokens
export type ColorTokens = typeof designTokens.colors
export type TypographyTokens = typeof designTokens.typography
export type SpacingTokens = typeof designTokens.spacing
export type MotionTokens = typeof designTokens.motion
