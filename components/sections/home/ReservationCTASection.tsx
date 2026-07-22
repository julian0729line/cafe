import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import DisplayHeading from '@/components/ui/DisplayHeading'

export type ReservationCta = {
  label: string
  href: string
  external?: boolean
  ariaLabel?: string
}

export interface ReservationCTASectionProps {
  eyebrow?: string
  title?: string
  description?: string
  primaryCta?: ReservationCta
  secondaryCta?: ReservationCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * CTA final — cierre editorial sobre rojo de marca a escala de manifiesto
 * (token `display`), el segundo momento de mayor peso visual del home tras el
 * hero. Wordmark tenue de fondo, grano y dos CTA como máximo. Sin datos de
 * contacto inventados. Server Component.
 */
export default function ReservationCTASection({
  eyebrow = 'Planea tu visita',
  title = 'Conversemos sobre tu próxima reserva.',
  description = 'Escríbenos para tu reserva, tu evento o tu próxima lectura. Te esperamos en Pance y Juanambú.',
  primaryCta = { label: 'Reservar', href: '/reservas' },
  secondaryCta = { label: 'Contacto', href: '/contacto' },
  className = '',
}: ReservationCTASectionProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] items-center overflow-hidden bg-[#C1121F] py-24 md:py-40',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />
      {/* Wordmark tenue de fondo (decorativo, estático) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-playfair font-black italic leading-none text-[#F5F5F0]/10"
        style={{ fontSize: '17vw' }}
      >
        Valparaíso
      </span>

      <Container variant="wide" className="relative">
        <div className="max-w-4xl">
          <p className="font-sans-app text-[11px] font-bold uppercase tracking-[0.45em] text-[#F5F5F0]/75">
            {eyebrow}
          </p>
          <DisplayHeading as="h2" tone="red" scale="display" className="mt-8">
            {title}
          </DisplayHeading>
          {description ? (
            <p className="mt-10 max-w-xl font-playfair text-lg italic leading-relaxed text-[#F5F5F0]/90 md:text-xl">
              {description}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-12 flex flex-wrap items-center gap-4">
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
                  className="border-[#F5F5F0]/60 text-[#F5F5F0] hover:border-[#F5F5F0] hover:bg-[rgba(245,245,240,0.12)]"
                  {...(secondaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={secondaryCta.ariaLabel ?? secondaryCta.label}
                >
                  {secondaryCta.label}
                </LinkButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
