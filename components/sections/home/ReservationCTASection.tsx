import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

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
 * CTA final — cierre editorial sobre rojo de marca, con grano y un wordmark
 * tenue estático (sin marquee continuo). Mucho aire, dos CTA como máximo y sin
 * datos de contacto inventados. Server Component.
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
    <section className={cn('relative overflow-hidden bg-[#C1121F] py-24 md:py-40', className)}>
      <span className="grain-soft" aria-hidden="true" />
      {/* Wordmark tenue de fondo (decorativo, estático) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-playfair font-black leading-none text-[#F5F5F0]/10"
        style={{ fontSize: '16vw' }}
      >
        Café Valparaíso
      </span>

      <Container variant="text" className="relative text-center">
        <p className="font-sans-app text-[11px] font-bold uppercase tracking-[0.4em] text-[#F5F5F0]/70">
          {eyebrow}
        </p>
        <h2
          className="mx-auto mt-7 max-w-3xl font-playfair font-black italic leading-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
        >
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-6 max-w-xl font-sans-app text-base leading-relaxed text-[#F5F5F0]/85">
            {description}
          </p>
        ) : null}

        {primaryCta || secondaryCta ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
      </Container>
    </section>
  )
}
