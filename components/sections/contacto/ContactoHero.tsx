import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export interface ContactoHeroProps {
  eyebrow?: string
  titleLead?: string
  titleAccent?: string
  description?: string
  index?: string
  whatsappHref?: string | null
  whatsappCtaLabel?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Portada de Contacto: la más directa y funcional del sitio, sin recurso
 * decorativo dominante (a diferencia de la «M» de Librería o los marcos de
 * Espacios) — su trabajo es que la conversación empiece rápido, no crear
 * atmósfera. Único hero del sitio con un CTA externo real en la portada.
 * Server Component.
 */
export default function ContactoHero({
  eyebrow = 'Pance y Juanambú',
  titleLead = 'Hablemos',
  titleAccent = 'en Valparaíso.',
  description = 'Escríbenos por WhatsApp o visítanos en Pance o Juanambú, en Cali.',
  index = '01',
  whatsappHref,
  whatsappCtaLabel = 'Escribir por WhatsApp',
  className = '',
}: ContactoHeroProps) {
  return (
    <section
      className={cn(
        'relative border-b border-[#4A5728] bg-[#181f0d] py-24 md:py-32',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="default" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
          <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
          {eyebrow}
        </p>
        <h1
          className="mt-6 max-w-3xl font-playfair font-black leading-[0.92] tracking-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.25rem)' }}
        >
          {titleLead} <em className="italic text-[#FF7F70]">{titleAccent}</em>
        </h1>
        <span className="mt-8 block h-px w-24 bg-[#C1121F]" aria-hidden="true" />
        {description ? (
          <p className="mt-8 max-w-xl font-sans-app text-base leading-relaxed text-[#A6B86B] md:text-lg">
            {description}
          </p>
        ) : null}
        {whatsappHref ? (
          <div className="mt-10">
            <LinkButton
              href={whatsappHref}
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noreferrer"
            >
              {whatsappCtaLabel}
            </LinkButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
