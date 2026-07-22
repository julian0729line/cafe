import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import Folio from '@/components/ui/Folio'

export type CultureLine = {
  number: string
  title: string
  description?: string
  status?: string
}

export interface CulturePreviewSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  lines?: CultureLine[]
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_LINES: CultureLine[] = [
  { number: '01', title: 'Clubes de lectura', status: 'Programación próxima' },
  { number: '02', title: 'Música en vivo', status: 'Programación próxima' },
  { number: '03', title: 'Conversaciones', status: 'Programación próxima' },
  { number: '04', title: 'Arte y cultura', status: 'Programación próxima' },
]

/**
 * «Agenda cultural» — sumario editorial: cada categoría es una fila-índice de
 * gran escala (número volado + título Playfair enorme + estado), con relleno
 * rojo al hover (`.menu-row`). Reemplaza la grilla de tarjetas por un ritmo de
 * lectura vertical, como el índice de una revista. Server Component.
 */
export default function CulturePreviewSection({
  index = '02',
  eyebrow = 'Agenda cultural',
  title = 'Cosas que pasan',
  emphasis = 'cuando la voz se comparte.',
  description = 'Programación cultural en construcción; publicamos las fechas cuando estén confirmadas.',
  lines = DEFAULT_LINES,
  cta = { label: 'Ver agenda', href: '/agenda' },
  className = '',
}: CulturePreviewSectionProps) {
  return (
    <section
      className={cn('relative overflow-hidden bg-[#181f0d] py-24 md:py-36', className)}
    >
      <Container variant="default" className="relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Folio number={index} label={eyebrow} tone="night" variant="stacked" />
            <h2
              className="mt-8 font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#F5F5F0]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}
            >
              {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
            </h2>
            {description ? (
              <p className="mt-6 max-w-xl font-sans-app text-base leading-relaxed text-[#A6B86B]">
                {description}
              </p>
            ) : null}
          </div>
          {cta ? (
            <div className="md:col-span-4 md:text-right">
              <LinkButton href={cta.href} variant="ghost" size="md">
                {cta.label}
              </LinkButton>
            </div>
          ) : null}
        </div>

        {lines.length > 0 ? (
          <ul className="mt-14 border-t border-[#4A5728]">
            {lines.map((line) => (
              <li
                key={line.number}
                className="menu-row group border-b border-[#4A5728]"
              >
                <span className="menu-fill" aria-hidden="true" />
                <div className="relative z-10 flex items-baseline justify-between gap-6 py-6 md:py-8">
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className="font-sans-app text-xs font-bold tabular-nums tracking-[0.2em] text-[#FF7F70] transition-colors group-hover:text-[#F5F5F0]/70">
                      {line.number}
                    </span>
                    <h3
                      className="font-playfair leading-[0.95] text-[#F5F5F0] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
                    >
                      {line.title}
                    </h3>
                  </div>
                  {line.status ? (
                    <span className="hidden shrink-0 font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#A6B86B] transition-colors group-hover:text-[#F5F5F0] sm:block">
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
