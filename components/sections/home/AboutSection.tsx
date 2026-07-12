import Container from '@/components/ui/Container'

export interface AboutSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  lead?: string
  body?: string
  aside?: string
  keywords?: string[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_KEYWORDS = [
  'Literatura',
  'Café',
  'Cocina',
  'Arte',
  'Música',
  'Conversaciones',
  'Comunidad',
]

/**
 * «Qué es Café Valparaíso» — manifiesto editorial sobre superficie marfil.
 * Dropcap (`.dropcap`), cita lateral, numeración de sección y mucho espacio
 * negativo. Server Component.
 */
export default function AboutSection({
  index = '01',
  eyebrow = 'Qué es Café Valparaíso',
  title = 'Más que un café,',
  emphasis = 'un lugar de encuentro.',
  lead = 'Café Valparaíso reúne cultura, gastronomía, literatura y conversación en Cali.',
  body,
  aside,
  keywords = DEFAULT_KEYWORDS,
  className = '',
}: AboutSectionProps) {
  return (
    <section
      className={cn('relative overflow-hidden border-b border-[rgba(28,25,18,0.12)] bg-[#F5F5F0] py-20 md:py-32', className)}
    >
      {/* Comilla editorial gigante, decorativa */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-playfair italic leading-none text-[#181f0d]/[0.06] md:block"
        style={{ fontSize: '28vw' }}
      >
        ”
      </span>

      <Container variant="default" className="relative">
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

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p
              className="dropcap max-w-2xl font-playfair leading-relaxed text-[#181f0d]"
              style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)' }}
            >
              {lead}
            </p>
            {body ? (
              <p className="mt-6 max-w-2xl font-sans-app text-base leading-relaxed text-[#4A5728]">
                {body}
              </p>
            ) : null}
          </div>

          {aside ? (
            <aside className="md:col-span-4 md:pt-2">
              <p className="border-l-2 border-[#C1121F] pl-5 font-playfair text-lg italic leading-snug text-[#7A2230]">
                {aside}
              </p>
            </aside>
          ) : null}
        </div>

        {keywords.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {keywords.map((word) => (
              <li
                key={word}
                className="font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#4A5728]"
              >
                {word}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
