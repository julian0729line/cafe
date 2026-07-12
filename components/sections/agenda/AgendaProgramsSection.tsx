import Container from '@/components/ui/Container'

export type AgendaProgramLine = {
  number: string
  title: string
  description?: string
  status?: string
}

export interface AgendaProgramsSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  lines?: AgendaProgramLine[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Líneas culturales confirmadas (`data/events.ts` → `eventCategories`), en
 * filas editoriales de ancho completo. No llevan a un detalle real todavía:
 * no se convierten en `<a>`/`<button>`. El hover es puramente decorativo
 * (borde + fondo oliva suave). Server Component.
 */
export default function AgendaProgramsSection({
  index = '02',
  eyebrow = 'Líneas culturales',
  title = 'Lo que ya está',
  emphasis = 'confirmado.',
  description = 'Las categorías de nuestra programación cultural. Fechas y artistas se suman cuando estén confirmados.',
  lines = [],
  className = '',
}: AgendaProgramsSectionProps) {
  return (
    <section className={cn('bg-[#181f0d] py-20 md:py-28', className)}>
      <Container variant="default">
        <div className="max-w-2xl">
          <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
            <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
            {eyebrow}
          </p>
          <h2
            className="mt-5 font-playfair font-black leading-[0.95] tracking-tight text-[#F5F5F0]"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
          >
            {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
          </h2>
          {description ? (
            <p className="mt-4 font-sans-app text-base leading-relaxed text-[#A6B86B]">
              {description}
            </p>
          ) : null}
        </div>

        {lines.length > 0 ? (
          <ul className="mt-12 border-t border-[#4A5728]">
            {lines.map((line) => (
              <li
                key={line.number}
                className="flex flex-col gap-3 border-b border-[#4A5728] py-7 transition-colors duration-300 hover:border-[#6B7A3C] hover:bg-[#343E1C]/40 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-sans-app text-[11px] font-bold tabular-nums tracking-[0.2em] text-[#FF7F70]">
                    {line.number}
                  </span>
                  <h3 className="font-playfair text-2xl text-[#F5F5F0] md:text-3xl">
                    {line.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-1 md:items-end md:text-right">
                  {line.description ? (
                    <p className="max-w-md font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                      {line.description}
                    </p>
                  ) : null}
                  {line.status ? (
                    <span className="font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#8A9A52]">
                      {line.status}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
