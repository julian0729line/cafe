import type { ReactNode } from 'react'

/**
 * Nota manuscrita al margen. La rotación leve es lo que la separa del texto
 * de la página: sin ella parece una etiqueta más, no algo escrito a mano.
 */
export function HandNote({
  children,
  className = '',
  rotate = -3,
  tone = 'red',
}: {
  children: ReactNode
  className?: string
  rotate?: number
  tone?: 'red' | 'ink' | 'cream'
}) {
  const color = tone === 'red' ? '#C1121F' : tone === 'cream' ? '#F5F5F0' : '#181f0d'
  // El `display` lo decide quien usa el componente. Fijarlo aquí en
  // `inline-block` choca con un `hidden sm:inline-block` del lado de la
  // llamada: ambas son utilidades de Tailwind con la misma especificidad, así
  // que ganaría la que el compilador emita de última — y la nota se colaba en
  // mobile.
  return (
    <span
      className={`hd-hand ${className}`}
      style={{ color, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  )
}

/** Número de sección dentro de un círculo dibujado, más la etiqueta. */
export function Kicker({
  number,
  label,
  tone = 'ink',
}: {
  number: number
  label: string
  tone?: 'ink' | 'cream'
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span
        className="hd-circle hd-hand grid h-11 w-11 shrink-0 place-items-center text-[26px]"
        style={{ color: '#C1121F' }}
      >
        {number}
      </span>
      <span
        className="text-[13px] font-bold uppercase tracking-[0.18em]"
        style={{ color: tone === 'cream' ? '#F5F5F0' : '#181f0d' }}
      >
        {label}
      </span>
    </div>
  )
}

/** Título de sección con la parte acentuada en itálica roja y subrayada. */
export function SectionTitle({
  title,
  accent,
  tone = 'ink',
}: {
  title: string
  accent: string
  tone?: 'ink' | 'cream'
}) {
  return (
    <h2
      className="ck-d text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95]"
      style={{ color: tone === 'cream' ? '#F5F5F0' : '#181f0d' }}
    >
      {title}{' '}
      <em className="hd-u font-semibold italic text-[#C1121F]">{accent}</em>
    </h2>
  )
}
