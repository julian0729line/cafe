import Container from '@/components/ui/Container'
import NumeroFoto from './NumeroFoto'
import type { CapituloFoto as CapFoto } from '@/content/menuNumero'

/**
 * Capítulo-foto — un plato como protagonista, contenido en panel verde profundo,
 * con numeral fantasma gigante al fondo. `lado` alterna la composición (foto
 * izq/der) para el ritmo asimétrico de revista. Nombre e ingredientes como texto
 * real; sin precio. La foto respira solo en hover/focus. Server Component.
 */
export default function CapituloFoto({ cap }: { cap: CapFoto }) {
  const fotoDer = cap.lado === 'der'

  return (
    <section
      className="relative overflow-hidden bg-[#181F0D] text-[#F5F5F0]"
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 85% 5%, rgba(74,87,40,.45), transparent 55%),' +
          'radial-gradient(120% 120% at 5% 100%, rgba(18,24,10,.85), transparent 60%)',
      }}
    >
      {/* Numeral fantasma */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[-0.15em] select-none font-playfair font-bold leading-[0.7] text-[#F5F5F0] opacity-[0.06] ${
          fotoDer ? 'left-[0.02em]' : 'right-[0.02em]'
        }`}
        style={{ fontSize: 'clamp(9rem, 22vw, 15rem)' }}
      >
        {cap.numeral}
      </span>

      <Container variant="default">
        <div
          className={`relative z-10 grid items-center gap-8 py-14 md:gap-14 md:py-20 ${
            fotoDer
              ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,46%)]'
              : 'md:grid-cols-[minmax(0,46%)_minmax(0,1fr)]'
          }`}
        >
          <NumeroFoto
            dish={cap.dish}
            className={`mx-auto w-full max-w-[420px] md:mx-0 ${fotoDer ? 'md:order-2' : ''}`}
          />
          <div className={fotoDer ? 'md:order-1' : ''}>
            <p className="font-sans-app text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#FF7F70]">
              {cap.eyebrow}
            </p>
            <p
              className="mt-2 font-playfair font-medium leading-[0.95] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 3.5rem)' }}
            >
              {cap.dish.nameLead} <span className="italic text-[#FF7F70]">{cap.dish.nameAccent}</span>
            </p>
            <p className="mt-2 font-playfair text-lg italic text-[#F5F5F0]/75">{cap.firma}</p>
            <p className="mt-4 font-sans-app text-xs uppercase tracking-[0.05em] text-[#F5F5F0]/60">
              {cap.dish.ingredients}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
