import Container from '@/components/ui/Container'

export interface ReservationsHeroProps {
  eyebrow?: string
  titleLead?: string
  titleAccent?: string
  description?: string
  index?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Portada de «Reservas»: jerarquía más funcional y compacta que Espacios
 * (sin recurso decorativo dominante), comunica que una reserva empieza con
 * una solicitud, no con una confirmación inmediata. Sin formulario en el
 * hero. Server Component.
 */
export default function ReservationsHero({
  eyebrow = 'Pance y Juanambú',
  titleLead = 'Organicemos',
  titleAccent = 'tu encuentro.',
  description = 'Cuéntanos qué tienes en mente. Una reserva en Café Valparaíso comienza con una solicitud que revisamos contigo.',
  index = '01',
  className = '',
}: ReservationsHeroProps) {
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
      </Container>
    </section>
  )
}
