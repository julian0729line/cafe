import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type ContactoClosingCta = { label: string; href: string; external?: boolean }

export interface ContactoClosingSectionProps {
  title?: string
  note?: string
  primaryCta?: ContactoClosingCta
  secondaryCta?: ContactoClosingCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Cierre de Contacto sobre oliva profundo (fondo no usado todavía en
 * ningún otro cierre del sitio, para diferenciarlo). Un solo mensaje: cada
 * solicitud abre una conversación real, no confirma una reserva. Server
 * Component.
 */
export default function ContactoClosingSection({
  title = 'Escríbenos y te confirmamos los detalles.',
  note = 'Cada mensaje empieza una conversación real, no una reserva automática.',
  // Sin valor por defecto: el número de WhatsApp es un dato de negocio y
  // debe venir siempre de `data/contact.ts` (vía la página), nunca
  // duplicado aquí.
  primaryCta,
  secondaryCta = { label: 'Ver espacios', href: '/espacios' },
  className = '',
}: ContactoClosingSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#2A331A] py-20 md:py-28', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="text" className="relative text-center">
        <h2
          className="mx-auto max-w-2xl font-playfair font-black italic leading-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title}
        </h2>
        {note ? (
          <p className="mx-auto mt-5 max-w-md font-sans-app text-base leading-relaxed text-[#A6B86B]">
            {note}
          </p>
        ) : null}
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
              <LinkButton
                href={secondaryCta.href}
                variant="ghost"
                size="lg"
                {...(secondaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
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
