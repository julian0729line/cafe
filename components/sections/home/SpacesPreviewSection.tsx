import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import Folio from '@/components/ui/Folio'
import GhostType from '@/components/ui/GhostType'
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
 * «Espacios y reservas» — las dos sedes tratadas como dos escenas distintas
 * (escala y desfase vertical asimétricos), no como tarjetas gemelas. Sobre
 * marfil, con media frames oscuros que contrastan como piezas de archivo. Sin
 * aforos, tarifas ni direcciones inventadas. Server Component.
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
  const [firstSede, secondSede] = sedes

  return (
    <section
      className={cn('relative overflow-hidden bg-[#F5F5F0] py-24 md:py-36', className)}
    >
      <GhostType tone="paper" position="left-top" sizeVw={30} opacity={0.05}>
        Sedes
      </GhostType>

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

        {/* Dos escenas asimétricas: la primera sede domina (más ancha, alta);
            la segunda entra desfasada hacia abajo. */}
        {sedes.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-12">
            {firstSede ? (
              <article className="flex flex-col gap-5 md:col-span-7">
                <HomeMediaFrame
                  index={`${index}.1`}
                  label={`Sede ${firstSede}`}
                  caption={`${firstSede} · Cali`}
                  aspectRatio="16 / 11"
                />
                <div className="flex items-baseline justify-between gap-4 border-t border-[rgba(28,25,18,0.18)] pt-4">
                  <h3
                    className="font-playfair leading-none text-[#181f0d]"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                  >
                    {firstSede}
                  </h3>
                  <span className="font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#4A5728]">
                    Cali
                  </span>
                </div>
              </article>
            ) : null}

            {secondSede ? (
              <article className="flex flex-col gap-5 md:col-span-5 md:pt-24">
                <HomeMediaFrame
                  index={`${index}.2`}
                  label={`Sede ${secondSede}`}
                  caption={`${secondSede} · Cali`}
                  aspectRatio="4 / 5"
                />
                <div className="flex items-baseline justify-between gap-4 border-t border-[rgba(28,25,18,0.18)] pt-4">
                  <h3
                    className="font-playfair leading-none text-[#181f0d]"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
                  >
                    {secondSede}
                  </h3>
                  <span className="font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#4A5728]">
                    Cali
                  </span>
                </div>
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
