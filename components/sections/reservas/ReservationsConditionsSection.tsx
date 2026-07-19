import Container from '@/components/ui/Container'

export interface ReservationsConditionsSectionProps {
  eyebrow?: string
  title?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Condiciones de reserva: ninguna política (personas, consumo mínimo,
 * abono, cancelación, horarios) está confirmada en `data/spaces.ts` ni en
 * `data/contact.ts` todavía, así que la sección declara ese estado como
 * decisión editorial —no como error—, sin publicar cifras ni completar
 * campos faltantes. Mismo patrón visual de `AgendaStatusSection`/
 * `LibraryEncountersSection` (caja con borde rojo sobre oliva), reutilizado
 * aquí con contenido propio. Server Component.
 */
export default function ReservationsConditionsSection({
  eyebrow = 'Condiciones',
  title = 'Las condiciones se confirman de acuerdo con las características de cada solicitud.',
  className = '',
}: ReservationsConditionsSectionProps) {
  return (
    <section className={cn('bg-[#2A331A] py-16 md:py-24', className)}>
      <Container variant="default">
        <div className="border border-[#C1121F] bg-[#343E1C] px-8 py-14 md:px-14 md:py-16">
          <span className="font-sans-app text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF7F70]">
            {eyebrow}
          </span>
          <p className="mt-6 max-w-2xl font-playfair text-2xl italic leading-snug text-[#F5F5F0] md:text-3xl">
            {title}
          </p>
        </div>
      </Container>
    </section>
  )
}
