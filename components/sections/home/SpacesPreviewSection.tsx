import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import Folio from '@/components/ui/Folio'

export interface SpacesPreviewSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  sedes?: readonly string[]
  kinds?: readonly string[]
  note?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * «Espacios y reservas» — las dos sedes como cartas tipográficas de lugar, no
 * como marcos de imagen vacíos (que leían como huecos). Cada sede lidera con su
 * nombre a gran escala y un acento art-directed fino; asimetría de tamaño entre
 * ambas. Sin aforos, tarifas ni direcciones inventadas. Server Component.
 */
export default function SpacesPreviewSection({
  index = '04',
  eyebrow = 'Espacios y reservas',
  title = 'Salas y rincones',
  emphasis = 'para reunir gente.',
  description = 'Encuentros, celebraciones, reuniones y actividades culturales en nuestras sedes de Pance y Juanambú.',
  sedes = ['Pance', 'Juanambú'],
  kinds = [],
  note,
  primaryCta = { label: 'Ver espacios', href: '/espacios' },
  secondaryCta = { label: 'Reservar', href: '/reservas' },
  className = '',
}: SpacesPreviewSectionProps) {
  const [firstSede, secondSede] = sedes

  return (
    <section
      className={cn('relative overflow-hidden bg-[#F5F5F0] py-24 md:py-36', className)}
    >
      <Container variant="default" className="relative">
        <div className="max-w-2xl">
          <Folio number={index} label={eyebrow} tone="paper" variant="stacked" />
          <h2
            className="mt-8 font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#181f0d]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}
          >
            {title} <span className="italic text-[#C1121F]">{emphasis}</span>
          </h2>
          {description ? (
            <p className="mt-6 font-sans-app text-base leading-relaxed text-[#4A5728]">
              {description}
            </p>
          ) : null}
        </div>

        {/* Dos cartas de lugar tipográficas, tamaños asimétricos. */}
        {sedes.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
            {firstSede ? (
              <article className="group relative flex min-h-[16rem] flex-col justify-between overflow-hidden border border-[rgba(28,25,18,0.16)] bg-[#181f0d] p-8 md:col-span-7 md:min-h-[22rem] md:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.1]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, #F5F5F0 0px, #F5F5F0 1px, transparent 1px, transparent 30px)',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="font-sans-app text-[10px] font-bold uppercase tracking-[0.3em] text-[#A6B86B]">
                    Sede · Cali
                  </span>
                  <span className="font-sans-app text-[10px] tabular-nums tracking-[0.2em] text-[#FF7F70]">
                    {index}.1
                  </span>
                </div>
                <h3
                  className="relative font-playfair font-black leading-[0.85] tracking-[-0.03em] text-[#F5F5F0]"
                  style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
                >
                  {firstSede}
                </h3>
              </article>
            ) : null}

            {secondSede ? (
              <article className="group relative flex min-h-[16rem] flex-col justify-between overflow-hidden border border-[rgba(28,25,18,0.16)] bg-[#343E1C] p-8 md:col-span-5 md:mt-16 md:min-h-[22rem] md:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.1]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, #F5F5F0 0px, #F5F5F0 1px, transparent 1px, transparent 30px)',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="font-sans-app text-[10px] font-bold uppercase tracking-[0.3em] text-[#A6B86B]">
                    Sede · Cali
                  </span>
                  <span className="font-sans-app text-[10px] tabular-nums tracking-[0.2em] text-[#FF7F70]">
                    {index}.2
                  </span>
                </div>
                <h3
                  className="relative font-playfair font-black leading-[0.85] tracking-[-0.03em] text-[#F5F5F0]"
                  style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)' }}
                >
                  {secondSede}
                </h3>
              </article>
            ) : null}
          </div>
        ) : null}

        {kinds.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[rgba(28,25,18,0.12)] pt-8">
            {kinds.map((kind) => (
              <li
                key={kind}
                className="font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#4A5728]"
              >
                {kind}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {primaryCta ? (
              <LinkButton href={primaryCta.href} variant="wine" size="md">
                {primaryCta.label}
              </LinkButton>
            ) : null}
            {secondaryCta ? (
              <LinkButton href={secondaryCta.href} variant="secondary" size="md">
                {secondaryCta.label}
              </LinkButton>
            ) : null}
          </div>
          {note ? (
            <p className="font-sans-app text-[11px] uppercase tracking-[0.2em] text-[#4A5728]/70">
              {note}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
