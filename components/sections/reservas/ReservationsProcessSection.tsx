import Container from '@/components/ui/Container'

export type ReservationProcessStep = {
  number: string
  title: string
}

export interface ReservationsProcessSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  steps?: ReservationProcessStep[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_STEPS: ReservationProcessStep[] = [
  { number: '01', title: 'Cuéntanos sobre tu encuentro.' },
  { number: '02', title: 'Revisamos los detalles.' },
  { number: '03', title: 'Confirmamos contigo las condiciones.' },
]

/**
 * Proceso conceptual de solicitud: tres pasos, sin automatización, sin
 * tiempos de respuesta ni confirmación automática. Ninguna solicitud
 * equivale a una reserva confirmada hasta el paso 3. Server Component.
 */
export default function ReservationsProcessSection({
  index = '03',
  eyebrow = 'Cómo funciona',
  title = 'De la solicitud',
  emphasis = 'a la confirmación.',
  steps = DEFAULT_STEPS,
  className = '',
}: ReservationsProcessSectionProps) {
  return (
    <section className={cn('bg-[#181f0d] py-20 md:py-28', className)}>
      <Container variant="default">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
          <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 max-w-2xl font-playfair font-black leading-[0.95] tracking-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
        </h2>

        {steps.length > 0 ? (
          <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <li key={step.number} className="border-t border-[#4A5728] pt-6">
                <span className="font-playfair text-3xl italic text-[#FF7F70]">
                  {step.number}
                </span>
                <p className="mt-4 max-w-xs font-playfair text-xl leading-snug text-[#F5F5F0]">
                  {step.title}
                </p>
              </li>
            ))}
          </ol>
        ) : null}
      </Container>
    </section>
  )
}
