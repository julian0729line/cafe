import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import { contactConfig } from '@/data/contact'

export interface SpacesHeroProps {
  eyebrow?: string
  titleLead?: string
  titleAccent?: string
  description?: string
  index?: string
  cta?: { label: string; href: string; external?: boolean }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Portada editorial de «Espacios»: en vez de una letra tipográfica gigante
 * (recurso ya usado en Librería), la identidad visual es arquitectónica —
 * marcos y líneas finas superpuestos, sin planos técnicos ni medidas
 * inventadas. Composición asimétrica, sin fotografía. Server Component.
 */
export default function SpacesHero({
  eyebrow = 'Pance y Juanambú',
  titleLead = 'Espacios para',
  titleAccent = 'encontrarnos.',
  description,
  index = '01',
  cta = { label: 'Solicitar una reserva', href: contactConfig.whatsappHref, external: true },
  className = '',
}: SpacesHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-[#4A5728] bg-[#181f0d] py-28 md:py-40',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />

      {/* Recurso arquitectónico abstracto: marcos y líneas finas, no un plano técnico */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[6%] top-[10%] hidden h-[60%] w-[34%] border border-[#4A5728]/70 md:block" />
        <div className="absolute right-[14%] top-[22%] hidden h-[40%] w-[22%] border border-[#6B7A3C]/40 md:block" />
        <span className="absolute left-0 top-[68%] block h-px w-full bg-[#4A5728]/50" />
        <span className="absolute left-[18%] top-0 hidden h-full w-px bg-[#4A5728]/30 md:block" />
      </div>

      <Container variant="default" className="relative">
        <div className="max-w-2xl">
          <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
            <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
            {eyebrow}
          </p>
          <h1
            className="mt-6 font-playfair font-black leading-[0.9] tracking-tight text-[#F5F5F0]"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 6rem)' }}
          >
            {titleLead} <em className="italic text-[#FF7F70]">{titleAccent}</em>
          </h1>
          <span className="mt-8 block h-px w-24 bg-[#C1121F]" aria-hidden="true" />
          {description ? (
            <p className="mt-8 max-w-xl font-sans-app text-base leading-relaxed text-[#A6B86B] md:text-lg">
              {description}
            </p>
          ) : null}
          {cta ? (
            <div className="mt-10">
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
        </div>
      </Container>
    </section>
  )
}
