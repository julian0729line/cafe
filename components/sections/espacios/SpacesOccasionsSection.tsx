import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import { contactConfig } from '@/data/contact'

export type SpaceOccasionLine = {
  title: string
  tag?: string
  description?: string
}

export interface SpacesOccasionsSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  occasions?: SpaceOccasionLine[]
  cta?: { label: string; href: string; external?: boolean }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Tipos de encuentro reales (`spacesPreview` en `data/spaces.ts`), en un
 * módulo de dos columnas con divisores finos — no cards, no la fila de
 * ancho completo ya usada en Agenda/Menú/Librería. Sin bodas, conferencias
 * ni otros usos no confirmados. Conduce al WhatsApp real de reservas.
 * Server Component.
 */
export default function SpacesOccasionsSection({
  index = '04',
  eyebrow = 'Para qué usarlos',
  title = 'Cada encuentro tiene',
  emphasis = 'una escala y un ritmo distinto.',
  description = 'Estas son las formas de encuentro que ya conviven en Café Valparaíso.',
  occasions = [],
  cta = { label: 'Escribir por WhatsApp', href: contactConfig.whatsappHref, external: true },
  className = '',
}: SpacesOccasionsSectionProps) {
  return (
    <section className={cn('bg-[#F5F5F0] py-20 md:py-32', className)}>
      <Container variant="default">
        <div className="max-w-2xl">
          <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
            <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
            {eyebrow}
          </p>
          <h2
            className="mt-5 font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
          >
            {title} <span className="italic text-[#C1121F]">{emphasis}</span>
          </h2>
          {description ? (
            <p className="mt-4 font-sans-app text-base leading-relaxed text-[#4A5728]">
              {description}
            </p>
          ) : null}
        </div>

        {occasions.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-[#181f0d]/10 pt-10 md:grid-cols-2">
            {occasions.map((occasion) => (
              <div
                key={occasion.title}
                className="border-l-2 border-[#C1121F]/70 pl-6"
              >
                {occasion.tag ? (
                  <span className="font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#C1121F]">
                    {occasion.tag}
                  </span>
                ) : null}
                <h3 className="mt-2 font-playfair text-2xl text-[#181f0d]">{occasion.title}</h3>
                {occasion.description ? (
                  <p className="mt-2 max-w-sm font-sans-app text-sm leading-relaxed text-[#4A5728]">
                    {occasion.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {cta ? (
          <div className="mt-14">
            <LinkButton
              href={cta.href}
              variant="secondary"
              size="md"
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
