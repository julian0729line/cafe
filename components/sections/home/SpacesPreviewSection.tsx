import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import HomeMediaFrame from './HomeMediaFrame'

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
 * «Espacios y reservas» — dos bloques editoriales para las sedes de Pance y
 * Juanambú, con media frames listos para fotografía real. Sin aforos, tarifas
 * ni direcciones inventadas y sin filmstrip con drag. Server Component.
 */
export default function SpacesPreviewSection({
  index = '05',
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
  return (
    <section className={cn('border-b border-[#4A5728] bg-[#181f0d] py-20 md:py-32', className)}>
      <Container variant="default">
        <div className="max-w-2xl">
          <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
            <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
            {eyebrow}
          </p>
          <h2
            className="mt-5 font-playfair font-black leading-[0.95] tracking-tight text-[#F5F5F0]"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
          >
            {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
          </h2>
          {description ? (
            <p className="mt-4 font-sans-app text-base leading-relaxed text-[#A6B86B]">
              {description}
            </p>
          ) : null}
        </div>

        {sedes.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {sedes.map((sede, i) => (
              <article key={sede} className="flex flex-col gap-5">
                <HomeMediaFrame
                  index={`${index}.${i + 1}`}
                  label={`Sede ${sede}`}
                  aspectRatio="3 / 2"
                />
                <div className="flex items-baseline justify-between gap-4 border-t border-[#4A5728] pt-4">
                  <h3 className="font-playfair text-2xl text-[#F5F5F0] md:text-3xl">{sede}</h3>
                  <span className="font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#A6B86B]">
                    Cali
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {kinds.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {kinds.map((kind) => (
              <li
                key={kind}
                className="font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A9A52]"
              >
                {kind}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {primaryCta ? (
              <LinkButton href={primaryCta.href} variant="ghost" size="md">
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
            <p className="font-sans-app text-[11px] uppercase tracking-[0.2em] text-[#A6B86B]/70">
              {note}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
