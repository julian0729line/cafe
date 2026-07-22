import type { ReactNode } from 'react'

export interface DisplayHeadingProps {
  children: ReactNode
  /** Palabra/frase de énfasis en cursiva roja (o coral en superficie noche). */
  emphasis?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  tone?: 'night' | 'paper' | 'red'
  /** Escala real de manifiesto (token `display`: clamp 4rem→10rem). */
  scale?: 'display' | 'h1'
  align?: 'left' | 'center'
  /** Coloca el énfasis en su propia línea (bloque) en vez de en flujo. */
  emphasisBlock?: boolean
  className?: string
}

const TONE = {
  night: { base: 'text-[#F5F5F0]', emphasis: 'text-[#FF7F70]' },
  paper: { base: 'text-[#181f0d]', emphasis: 'text-[#C1121F]' },
  red: { base: 'text-[#F5F5F0]', emphasis: 'text-[#181f0d]' },
} as const

const SCALE = {
  // Escala de manifiesto: el token `display` de design-tokens que hoy no usa
  // ningún componente. Reservada para hero, interludios y cierres.
  display: 'clamp(4rem, 12vw, 10rem)',
  h1: 'clamp(2.75rem, 7.5vw, 6.5rem)',
} as const

/**
 * Titular a escala de manifiesto. Materializa el token tipográfico `display`
 * (definido en `lib/design-tokens.ts` pero sin consumidor real) para los
 * momentos de mayor peso visual: hero, interludios y cierres. Server Component.
 */
export default function DisplayHeading({
  children,
  emphasis,
  as: Tag = 'h2',
  tone = 'night',
  scale = 'display',
  align = 'left',
  emphasisBlock = false,
  className = '',
}: DisplayHeadingProps) {
  const c = TONE[tone]

  return (
    <Tag
      className={`font-playfair font-black leading-[0.86] tracking-[-0.03em] ${c.base} ${
        align === 'center' ? 'text-center' : ''
      } ${className}`.trim()}
      style={{ fontSize: SCALE[scale] }}
    >
      {emphasisBlock ? <span className="block">{children}</span> : children}
      {emphasis ? (
        emphasisBlock ? (
          <span className={`block italic ${c.emphasis}`}>{emphasis}</span>
        ) : (
          <>
            {' '}
            <em className={`italic ${c.emphasis}`}>{emphasis}</em>
          </>
        )
      ) : null}
    </Tag>
  )
}
