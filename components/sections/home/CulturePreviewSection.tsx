import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

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
 * «Agenda cultural» — filas editoriales numeradas (categorías reales, sin
 * fechas ni artistas inventados) sobre fondo profundo. Server Component.
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
    <section className={cn('border-b border-[#4A5728] bg-[#181f0d] py-20 md:py-32', className)}>
      <Container variant="default">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
          {cta ? (
            <LinkButton href={cta.href} variant="ghost" size="md" className="shrink-0">
              {cta.label}
            </LinkButton>
          ) : null}
        </div>

        {lines.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {lines.map((line) => (
              <li
                key={line.number}
                className="group border border-[#4A5728] p-7 transition-colors duration-300 hover:border-[#C1121F]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans-app text-[11px] font-bold tabular-nums tracking-[0.2em] text-[#FF7F70]">
                    {line.number}
                  </span>
                  {line.status ? (
                    <span className="font-sans-app text-[10px] uppercase tracking-[0.2em] text-[#A6B86B]">
                      {line.status}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-playfair text-2xl text-[#F5F5F0] md:text-3xl">
                  {line.title}
                </h3>
                {line.description ? (
                  <p className="mt-2 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                    {line.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
