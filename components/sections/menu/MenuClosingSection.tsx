import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type MenuClosingCta = { label: string; href: string }

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
 * Agenda/Home), con grano y un único CTA a reservas. Sin políticas de
 * reserva inventadas. Server Component.
 */
export default function MenuClosingSection({
  title = 'Una mesa, una conversación y algo para compartir.',
  cta = { label: 'Reservar', href: '/reservas' },
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
            <LinkButton href={cta.href} variant="secondary" size="lg">
              {cta.label}
            </LinkButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
