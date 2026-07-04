import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type HeroHighlight = {
  label: string
  value: string
}

export type HeroCta = {
  label: string
  href: string
  external?: boolean
  ariaLabel?: string
}

export interface HeroSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  highlights?: HeroHighlight[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_HIGHLIGHTS: HeroHighlight[] = [
  { label: 'Ambiente', value: 'Editorial' },
  { label: 'Cocina', value: 'De autor' },
  { label: 'Comunidad', value: 'Activa' },
]

export default function HeroSection({
  eyebrow = 'Café literario · Cali',
  title = 'Café Valparaíso',
  description = 'Cultura, gastronomía y literatura en Cali.',
  primaryCta = { label: 'Reservar', href: '/reservas' },
  secondaryCta = { label: 'Ver agenda', href: '/agenda' },
  highlights = DEFAULT_HIGHLIGHTS,
  className = '',
}: HeroSectionProps) {
  return (
    <section className={cn('border-b border-[#4A5728] px-4 py-16 md:px-8 md:py-24', className)}>
      <Container variant="wide">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.35em] text-[#C9A227]">
              {eyebrow}
            </p>

            <h1
              className="mt-4 font-playfair font-black leading-[0.9] tracking-tight text-[#F5F5F0]"
              style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }}
            >
              {title}
            </h1>

            <p className="mt-6 max-w-lg font-playfair text-lg italic leading-relaxed text-[#D9DCC4] md:text-xl">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              {primaryCta ? (
                <LinkButton
                  href={primaryCta.href}
                  variant="primary"
                  size="lg"
                  {...(primaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={primaryCta.ariaLabel ?? primaryCta.label}
                >
                  {primaryCta.label}
                </LinkButton>
              ) : null}
              {secondaryCta ? (
                <LinkButton
                  href={secondaryCta.href}
                  variant="ghost"
                  size="lg"
                  {...(secondaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={secondaryCta.ariaLabel ?? secondaryCta.label}
                >
                  {secondaryCta.label}
                </LinkButton>
              ) : null}
            </div>
          </div>

          {highlights.length > 0 ? (
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#4A5728] bg-[#2A331A] p-8 md:p-10">
              <span
                aria-hidden="true"
                className="pointer-events-none select-none font-playfair text-[6rem] leading-none text-[#F5F5F0]/10"
              >
                &ldquo;
              </span>
              <div className="mt-4 flex flex-col gap-4">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="flex items-center justify-between border-b border-[#4A5728] pb-3"
                  >
                    <span className="font-sans-app text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6B86B]">
                      {highlight.label}
                    </span>
                    <span className="font-playfair italic text-[#F5F5F0]">{highlight.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
