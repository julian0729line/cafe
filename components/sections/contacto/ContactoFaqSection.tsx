import Container from '@/components/ui/Container'
import type { FaqItem } from '@/data/faq'

export interface ContactoFaqSectionProps {
  eyebrow?: string
  title?: string
  items: FaqItem[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Preguntas frecuentes de Contacto: acordeón nativo (`<details>`/`<summary>`),
 * sin JS adicional. El `FAQPage` JSON-LD que acompaña esta misma lista de
 * preguntas vive en `app/contacto/page.tsx` (ver `buildFaqJsonLd`). Server
 * Component.
 */
export default function ContactoFaqSection({
  eyebrow = 'Preguntas frecuentes',
  title = 'Antes de escribirnos',
  items,
  className = '',
}: ContactoFaqSectionProps) {
  if (items.length === 0) return null

  return (
    <section className={cn('relative bg-[#F5F5F0] py-20 md:py-28', className)}>
      <Container variant="text" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          {eyebrow}
        </p>
        <h2
          className="mt-4 font-playfair font-black leading-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}
        >
          {title}
        </h2>

        <div className="mt-10 divide-y divide-[rgba(28,25,18,0.12)]">
          {items.map((item) => (
            <details key={item.question} className="group py-6 first:pt-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans-app text-base font-bold text-[#181f0d] md:text-lg">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-playfair text-xl text-[#C1121F] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl font-sans-app text-base leading-relaxed text-[#4A5728]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
