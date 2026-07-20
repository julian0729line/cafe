import Container from '@/components/ui/Container'

export type ReservationOptionLine = {
  title: string
  tag?: string
  description?: string
}

export interface ReservationsOptionsSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  options?: ReservationOptionLine[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Tipos de solicitud reales (mismos datos confirmados de `spacesPreview` en
 * `data/spaces.ts`, documentados para render tanto en `/espacios` como en
 * `/reservas`), presentados en filas compactas y funcionales — distintas de
 * la cuadrícula de dos columnas usada en Espacios, para que ambas páginas no
 * compartan estructura. Server Component.
 */
export default function ReservationsOptionsSection({
  index = '02',
  eyebrow = 'Qué puedes solicitar',
  title = 'Distintas formas',
  emphasis = 'de reservar tu lugar.',
  options = [],
  className = '',
}: ReservationsOptionsSectionProps) {
  return (
    <section className={cn('bg-[#F5F5F0] py-16 md:py-24', className)}>
      <Container variant="default">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 max-w-2xl font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>

        {options.length > 0 ? (
          <ul className="mt-10 border-t border-[#181f0d]/10">
            {options.map((option, i) => (
              <li
                key={option.title}
                className="flex flex-col gap-1 border-b border-[#181f0d]/10 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-sans-app text-[11px] tabular-nums text-[#C1121F]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-playfair text-xl text-[#181f0d] md:text-2xl">
                    {option.title}
                  </span>
                </span>
                {option.description ? (
                  <span className="max-w-md font-sans-app text-sm leading-relaxed text-[#4A5728] md:text-right">
                    {option.description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
