import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
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

export default function ReservationCTASection({
  eyebrow = 'Te esperamos',
  title = 'Ven a vivir Valparaíso',
  description = 'Reserva tu mesa o escríbenos para resolver cualquier duda antes de tu visita.',
  primaryCta = { label: 'Reservar', href: '/reservas' },
  secondaryCta = { label: 'Escríbenos', href: '/contacto' },
  className = '',
}: ReservationCTASectionProps) {
  return (
    <section className={cn('px-4 py-16 md:px-8 md:py-28', className)}>
      <Container variant="wide">
        <Card variant="editorial" padding="lg" className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.35em] text-[#F5F5F0]/70">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-playfair text-3xl font-black leading-tight text-[#F5F5F0] md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-md font-sans-app text-sm leading-relaxed text-[#F5F5F0]/85">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {primaryCta ? (
              <LinkButton
                href={primaryCta.href}
                variant="dark"
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
                className="border-[#F5F5F0]/40 text-[#F5F5F0] hover:border-[#F5F5F0]"
                {...(secondaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                aria-label={secondaryCta.ariaLabel ?? secondaryCta.label}
              >
                {secondaryCta.label}
              </LinkButton>
            ) : null}
          </div>
        </Card>
      </Container>
    </section>
  )
}
