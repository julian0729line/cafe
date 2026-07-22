import Microphrase from './Microphrase'

export interface AtmosphereBreakSectionProps {
  microphrase?: string
}

/**
 * Atmósfera — interrupción visual corta entre el universo de accesos y la
 * reserva. Solo tratamiento gráfico CSS derivado de la paleta (duotono, grano,
 * color): sin segundo `<video>`, sin párrafo, sin CTA. Una sola microfrase
 * flotante. Altura acotada (40vh móvil / 55vh desktop). Server Component.
 */
export default function AtmosphereBreakSection({
  microphrase = 'Nos vemos adentro',
}: AtmosphereBreakSectionProps) {
  return (
    <section
      aria-hidden="true"
      className="relative h-[40vh] overflow-hidden border-y border-[#4A5728] bg-[#12180a] md:h-[55vh]"
    >
      {/* Duotono cálido derivado de la paleta (café + brasa), estático */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 120% at 20% 10%, rgba(201,162,39,.20), transparent 55%),' +
            'radial-gradient(90% 120% at 88% 92%, rgba(193,18,31,.26), transparent 58%),' +
            'linear-gradient(160deg, #2a331a 0%, #1a2110 55%, #12180a 100%)',
        }}
      />
      <span className="grain-soft" />
      {/* Regla editorial fina como acento compositivo */}
      <span className="absolute left-6 top-1/2 h-px w-16 -translate-y-1/2 bg-[#C1121F] md:left-10 md:w-24" />

      <Microphrase
        tone="night"
        className="bottom-8 right-6 text-[clamp(1.6rem,4vw,2.6rem)] md:bottom-10 md:right-10"
      >
        {microphrase}
      </Microphrase>
    </section>
  )
}
