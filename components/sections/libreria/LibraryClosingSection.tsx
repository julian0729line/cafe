import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type LibraryClosingCta = { label: string; href: string }

export interface LibraryClosingSectionProps {
  title?: string
  primaryCta?: LibraryClosingCta
  secondaryCta?: LibraryClosingCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre editorial de Librería sobre rojo de marca, con grano y la «M»
 * tipográfica tenue del hero (recurso decorativo, no un logo). Dos CTA como
 * máximo, sin canales de contacto ni catálogo online inventados.
 * Server Component.
 */
export default function LibraryClosingSection({
  title = 'Los libros también son una forma de encontrarnos.',
  primaryCta = { label: 'Ver agenda', href: '/agenda' },
  secondaryCta = { label: 'Contacto', href: '/contacto' },
  className = '',
}: LibraryClosingSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#C1121F] py-20 md:py-28', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[14vw] -right-[6vw] select-none font-playfair text-[#F5F5F0]/10 font-black italic leading-none"
        style={{ fontSize: '42vw' }}
      >
        M
      </span>

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
              <LinkButton href={primaryCta.href} variant="dark" size="lg">
                {primaryCta.label}
              </LinkButton>
            ) : null}
            {secondaryCta ? (
              <LinkButton
                href={secondaryCta.href}
                variant="ghost"
                size="lg"
                className="border-[#F5F5F0]/40 text-[#F5F5F0] hover:border-[#F5F5F0]"
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
