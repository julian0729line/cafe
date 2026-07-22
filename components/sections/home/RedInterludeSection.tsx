import Container from '@/components/ui/Container'
import DisplayHeading from '@/components/ui/DisplayHeading'
import GhostType from '@/components/ui/GhostType'

export interface RedInterludeSectionProps {
  /** Etiqueta breve superior (opcional). */
  eyebrow?: string
  /** Frase-manifiesto principal, a escala display. */
  statement: string
  /** Palabra/frase en cursiva marfil como remate. */
  emphasis?: string
  /** Palabra fantasma de fondo (tipografía-imagen). */
  ghost?: string
  /** Pie editorial discreto (opcional). */
  footnote?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Interludio rojo — bloque sólido `#C1121F` a pantalla completa que interrumpe
 * el flujo del recorrido como una página de separación de revista impresa. Es
 * el gesto que lleva el rojo de acento (texto/borde/hover) a protagonista de
 * fondo una vez por página. Sin CTAs ni datos: es puro respiro cromático y
 * declaración de marca. Server Component.
 */
export default function RedInterludeSection({
  eyebrow,
  statement,
  emphasis,
  ghost,
  footnote,
  className = '',
}: RedInterludeSectionProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[70vh] items-center overflow-hidden bg-[#C1121F] py-24 md:min-h-[80vh] md:py-40',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />
      {ghost ? (
        <GhostType tone="red" position="center" sizeVw={40} opacity={0.1}>
          {ghost}
        </GhostType>
      ) : null}

      <Container variant="wide" className="relative">
        <div className="max-w-5xl">
          {eyebrow ? (
            <p className="font-sans-app text-[11px] font-bold uppercase tracking-[0.45em] text-[#F5F5F0]/75">
              {eyebrow}
            </p>
          ) : null}
          <DisplayHeading
            as="h2"
            tone="red"
            scale="display"
            emphasis={emphasis}
            emphasisBlock
            className={eyebrow ? 'mt-8' : ''}
          >
            {statement}
          </DisplayHeading>
          {footnote ? (
            <p className="mt-10 max-w-md font-playfair text-lg italic leading-relaxed text-[#F5F5F0]/85">
              {footnote}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
