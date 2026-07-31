import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import { contactConfig } from '@/data/contact'

export type SpacesClosingCta = { label: string; href: string; external?: boolean }

export interface SpacesClosingSectionProps {
  title?: string
  primaryCta?: SpacesClosingCta
  secondaryCta?: SpacesClosingCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre editorial de Espacios sobre oliva profundo (distinto del rojo de
 * Librería/Agenda), con el mismo recurso de líneas finas del hero en vez de
 * la «M» tipográfica. No promete disponibilidad inmediata. Server Component.
 */
export default function SpacesClosingSection({
  title = 'Tu próximo encuentro puede empezar aquí.',
  primaryCta = { label: 'Solicitar una reserva', href: contactConfig.whatsappHref, external: true },
  secondaryCta = { label: 'Contacto', href: '/contacto' },
  className = '',
}: SpacesClosingSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#181f0d] py-20 md:py-28', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[10%] top-0 hidden h-full w-px bg-[#4A5728]/40 md:block" />
        <span className="absolute right-[10%] top-0 hidden h-full w-px bg-[#4A5728]/40 md:block" />
      </div>

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
              <LinkButton
                href={primaryCta.href}
                variant="secondary"
                size="lg"
                {...(primaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
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
