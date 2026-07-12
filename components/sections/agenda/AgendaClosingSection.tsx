import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type AgendaClosingCta = { label: string; href: string }

export interface AgendaClosingSectionProps {
  title?: string
  description?: string
  cta?: AgendaClosingCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre editorial de Agenda sobre rojo de marca, con grano y un único CTA
 * a contacto. Sin canales de contacto inventados. Server Component.
 */
export default function AgendaClosingSection({
  title = '¿Quieres conocer la próxima programación?',
  description = 'Los canales oficiales están en actualización.',
  cta = { label: 'Contacto', href: '/contacto' },
  className = '',
}: AgendaClosingSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#C1121F] py-20 md:py-28', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="text" className="relative text-center">
        <h2
          className="mx-auto max-w-2xl font-playfair font-black italic leading-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-5 max-w-md font-sans-app text-base leading-relaxed text-[#F5F5F0]/85">
            {description}
          </p>
        ) : null}
        {cta ? (
          <div className="mt-9">
            <LinkButton href={cta.href} variant="dark" size="lg">
              {cta.label}
            </LinkButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
