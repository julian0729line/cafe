import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import { contactConfig } from '@/data/contact'

export type MenuClosingCta = { label: string; href: string; external?: boolean }

export interface MenuClosingSectionProps {
  title?: string
  cta?: MenuClosingCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre editorial de Menú sobre verde profundo (distinto del rojo de
 * Home), con grano y un único CTA al WhatsApp real de reservas. Sin
 * políticas de reserva inventadas. Server Component.
 */
export default function MenuClosingSection({
  title = 'Una mesa, una conversación y algo para compartir.',
  cta = { label: 'Reservar por WhatsApp', href: contactConfig.whatsappHref, external: true },
  className = '',
}: MenuClosingSectionProps) {
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
        {cta ? (
          <div className="mt-9">
            <LinkButton
              href={cta.href}
              variant="secondary"
              size="lg"
              {...(cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {cta.label}
            </LinkButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
