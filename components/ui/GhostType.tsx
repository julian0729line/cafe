import type { CSSProperties } from 'react'

export type GhostTypePosition =
  | 'left-bottom'
  | 'right-middle'
  | 'left-top'
  | 'center'
  | 'right-bottom'

export interface GhostTypeProps {
  /** Palabra o carácter que se muestra como tipografía-imagen de fondo. */
  children: string
  /** Ancla de la palabra dentro de su sección `relative`. */
  position?: GhostTypePosition
  /** Tamaño en unidades de viewport (ancho de fuente). Por defecto 34vw. */
  sizeVw?: number
  /** Tono de la capa fantasma. `paper` para superficies claras, `night` para oscuras. */
  tone?: 'night' | 'paper' | 'red'
  /** Opacidad de la capa (0-1). Por defecto 0.06. */
  opacity?: number
  /** Cursiva editorial (por defecto sí). */
  italic?: boolean
  className?: string
}

const POSITION_CLASSES: Record<GhostTypePosition, string> = {
  'left-bottom': 'left-[-0.08em] bottom-[-0.12em]',
  'right-middle': 'right-[-0.06em] top-1/2 -translate-y-1/2',
  'left-top': 'left-[-0.06em] top-[-0.1em]',
  center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  'right-bottom': 'right-[-0.06em] bottom-[-0.12em]',
}

const TONE_COLOR: Record<NonNullable<GhostTypeProps['tone']>, string> = {
  night: '#4A5728',
  paper: '#181f0d',
  red: '#F5F5F0',
}

/**
 * Tipografía-imagen de fondo (ghost type): una palabra o carácter Playfair a
 * gran escala, tenue, puramente decorativa. Generaliza el gesto que ya existía
 * suelto en About («”») y Librería («M») para convertirlo en firma visual del
 * sistema. Estática (no anima), `aria-hidden`, sin coste de cliente.
 */
export default function GhostType({
  children,
  position = 'left-bottom',
  sizeVw = 34,
  tone = 'night',
  opacity = 0.06,
  italic = true,
  className = '',
}: GhostTypeProps) {
  const style: CSSProperties = {
    fontSize: `${sizeVw}vw`,
    color: TONE_COLOR[tone],
    opacity,
  }

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 select-none font-playfair font-black leading-none ${
        italic ? 'italic' : ''
      } ${POSITION_CLASSES[position]} ${className}`.trim()}
      style={style}
    >
      {children}
    </span>
  )
}
