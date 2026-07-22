export interface EditorialRuleProps {
  /** Grosor de la regla. `hair` = 1px; `thick` = 3px (separador de entrega). */
  weight?: 'hair' | 'thick'
  tone?: 'night' | 'paper' | 'red'
  /** Ancho: `full` cruza la sección; `short` es un acento de 6rem. */
  width?: 'full' | 'short'
  className?: string
}

const TONE = {
  night: '#4A5728',
  paper: 'rgba(28,25,18,0.28)',
  red: '#C1121F',
} as const

/**
 * Regla horizontal editorial. La variante `thick` funciona como separador de
 * «entrega» entre secciones-capítulo (refuerza la metáfora de revista impresa),
 * a diferencia del `border-b` de 1px genérico. Decorativa. Server Component.
 */
export default function EditorialRule({
  weight = 'thick',
  tone = 'red',
  width = 'short',
  className = '',
}: EditorialRuleProps) {
  return (
    <span
      aria-hidden="true"
      className={`block ${width === 'full' ? 'w-full' : 'w-24'} ${className}`.trim()}
      style={{
        height: weight === 'thick' ? '3px' : '1px',
        backgroundColor: TONE[tone],
      }}
    />
  )
}
