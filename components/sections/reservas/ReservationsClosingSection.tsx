import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type ReservationsClosingCta = { label: string; href: string }

export interface ReservationsClosingSectionProps {
  title?: string
  primaryCta?: ReservationsClosingCta
  secondaryCta?: ReservationsClosingCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre de Reservas: sin backend de reservas confirmado (sin Server
 * Action, endpoint ni tabla de Supabase para solicitudes), el único canal
 * real es `/contacto` — la misma ruta que ya usaba `reservationChannels[0]`
 * en `data/contact.ts` y la página anterior de `/reservas`. El CTA describe
 * la acción real (ir a contacto), no una confirmación ni un pago.
 * Server Component.
 */
export default function ReservationsClosingSection({
  title = 'Hablemos de tu próximo encuentro.',
  primaryCta = { label: 'Hablar con el equipo', href: '/contacto' },
  secondaryCta = { label: 'Ver espacios', href: '/espacios' },
  className = '',
}: ReservationsClosingSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#181f0d] py-20 md:py-28', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="text" className="relative text-center">
        <h2
          className="mx-auto max-w-2xl font-playfair font-black italic leading-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title}
        </h2>
        {primaryCta || secondaryCta ? (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            {primaryCta ? (
              <LinkButton href={primaryCta.href} variant="secondary" size="lg">
                {primaryCta.label}
              </LinkButton>
            ) : null}
            {secondaryCta ? (
              <LinkButton href={secondaryCta.href} variant="ghost" size="lg">
                {secondaryCta.label}
              </LinkButton>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
