import Container from '@/components/ui/Container'

export interface AgendaStatusSectionProps {
  eyebrow?: string
  title?: string
  message?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Estado real de la agenda cultural («Agenda próxima a publicarse», tomado
 * de `data/events.ts`), presentado como decisión editorial y no como error
 * o página vacía. Sin fechas ficticias ni botones deshabilitados falsos.
 * Server Component.
 */
export default function AgendaStatusSection({
  eyebrow = 'Estado de la agenda',
  title = 'Agenda próxima a publicarse',
  message = 'Estamos preparando la próxima programación cultural. Las fechas y los detalles se publicarán próximamente.',
  className = '',
}: AgendaStatusSectionProps) {
  return (
    <section className={cn('bg-[#181f0d] py-16 md:py-24', className)}>
      <Container variant="default">
        <div className="border border-[#C1121F] bg-[#2A331A] px-8 py-14 md:px-14 md:py-16">
          <span className="font-sans-app text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF7F70]">
            {eyebrow}
          </span>
          <p className="mt-6 max-w-2xl font-playfair text-2xl italic leading-snug text-[#F5F5F0] md:text-3xl">
            {title}
          </p>
          {message ? (
            <p className="mt-5 max-w-xl font-sans-app text-base leading-relaxed text-[#A6B86B]">
              {message}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
