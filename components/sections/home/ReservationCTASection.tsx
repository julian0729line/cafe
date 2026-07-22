import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type ReservationCta = {
  label: string
  href: string
  external?: boolean
  ariaLabel?: string
}

export interface ReservationCTASectionProps {
  title?: string
  primaryCta?: ReservationCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre de reserva — el único gran momento cromático (rojo de marca), ahora
 * corto: sin párrafo, sin ghost word gigante, un solo acceso. Altura acotada
 * (60vh móvil / 70vh desktop). «Contacto» vive en el navbar y el footer, no se
 * duplica aquí. Server Component.
 */
export default function ReservationCTASection({
  title = 'Conversemos sobre tu próxima reserva.',
  primaryCta = { label: 'Reservar', href: '/reservas' },
  className = '',
}: ReservationCTASectionProps) {
  return (
    <section
      className={cn(
        'relative flex h-[60vh] items-center overflow-hidden bg-[#C1121F] md:h-[70vh]',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />
      <span className="absolute left-6 top-1/2 hidden h-px w-16 -translate-y-1/2 bg-[#F5F5F0]/50 md:block md:left-10 md:w-24" />

      <Container variant="wide" className="relative">
        <div className="max-w-4xl">
          <h2
            className="font-playfair font-black leading-[0.92] tracking-[-0.03em] text-[#F5F5F0]"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)' }}
          >
            {title}
          </h2>
          {primaryCta ? (
            <div className="mt-9">
              <LinkButton
                href={primaryCta.href}
                variant="primary"
                size="lg"
                {...(primaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                aria-label={primaryCta.ariaLabel ?? primaryCta.label}
              >
                {primaryCta.label}
              </LinkButton>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
