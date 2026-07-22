import type { ElementType } from 'react'

export interface FolioProps {
  /** Número de sección/entrega, ya formateado (p. ej. «02»). */
  number: string
  /** Etiqueta (eyebrow) que acompaña al folio. */
  label?: string
  /** Tono del folio según la superficie. */
  tone?: 'night' | 'paper'
  /**
   * Variante de composición:
   * - `inline`: folio + label en una línea (uso dominante actual).
   * - `stacked`: número grande sobre el label, como folio de revista.
   */
  variant?: 'inline' | 'stacked'
  as?: ElementType
  className?: string
}

const TONE = {
  night: { number: 'text-[#FF7F70]', label: 'text-[#A6B86B]' },
  paper: { number: 'text-[#C1121F]', label: 'text-[#4A5728]' },
} as const

/**
 * Folio editorial: el número de sección tratado como índice de un archivo
 * impreso, no como bullet decorativo. `inline` conserva el patrón existente;
 * `stacked` lo eleva a marca de entrega (número a gran escala + etiqueta).
 * Server Component.
 */
export default function Folio({
  number,
  label,
  tone = 'night',
  variant = 'inline',
  as: Tag = 'p',
  className = '',
}: FolioProps) {
  const c = TONE[tone]

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col gap-2 ${className}`.trim()}>
        <span
          className={`font-playfair font-black italic leading-[0.8] tabular-nums ${c.number}`}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {number}
        </span>
        {label ? (
          <span
            className={`font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] ${c.label}`}
          >
            {label}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <Tag
      className={`font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] ${c.label} ${className}`.trim()}
    >
      <span className={`mr-3 tabular-nums ${c.number}`}>{number}</span>
      {label}
    </Tag>
  )
}
