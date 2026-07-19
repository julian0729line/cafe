import Container from '@/components/ui/Container'

export interface SpacesIntroductionSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  leadParagraph?: string
  bodyParagraph?: string
  pullQuote?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Introducción editorial de «Espacios» sobre marfil: dos párrafos + una
 * frase destacada en caja (sin capitular, a diferencia del manifiesto de
 * Librería, para diferenciar la composición). Solo afirma lo respaldado por
 * los datos reales (`data/spaces.ts`, `data/contact.ts`): dos sedes, cuatro
 * tipos de encuentro. Server Component.
 */
export default function SpacesIntroductionSection({
  index = '02',
  eyebrow = 'Hospitalidad y encuentro',
  title = 'Un espacio también',
  emphasis = 'es una forma de hospitalidad.',
  leadParagraph = 'Un espacio de Café Valparaíso no es solo una mesa reservada: es una extensión de la misma casa, donde el café, la literatura y la conversación comparten el lugar.',
  bodyParagraph = 'Encuentros privados, celebraciones, reuniones y actividades culturales conviven bajo la misma identidad editorial, en nuestras sedes de Pance y Juanambú.',
  pullQuote = 'La hospitalidad no es un servicio aparte: es el mismo lugar, dispuesto para ti.',
  className = '',
}: SpacesIntroductionSectionProps) {
  return (
    <section
      className={cn(
        'border-b border-[rgba(28,25,18,0.12)] bg-[#F5F5F0] py-20 md:py-32',
        className
      )}
    >
      <Container variant="default">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-6 max-w-3xl font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-xl font-sans-app text-base leading-relaxed text-[#343E1C] md:text-lg">
              {leadParagraph}
            </p>
            {bodyParagraph ? (
              <p className="mt-5 max-w-xl font-sans-app text-base leading-relaxed text-[#4A5728]">
                {bodyParagraph}
              </p>
            ) : null}
          </div>

          {pullQuote ? (
            <div className="md:col-span-5">
              <div className="border border-[#181f0d]/15 bg-[#F7F1E6] px-7 py-8">
                <p className="font-playfair text-xl italic leading-snug text-[#7A2230]">
                  {pullQuote}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
