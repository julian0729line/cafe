import Container from '@/components/ui/Container'
import Microphrase from './Microphrase'

// LQIP (~22px) de «Tapeo Cortázar» incrustado: la figura nunca parpadea en
// negro antes de que carguen AVIF/WebP. Generado con sharp desde la foto real.
const LQIP =
  'data:image/webp;base64,UklGRnYBAABXRUJQVlA4IGoBAACwBgCdASoWABYAPu1ur1IppiQiqAgBMB2JbACdMoR09oBXtoAQyDx5EHl+jFlrdrLssDI7YG2O3nQii/jzgAD5aSTCxF1uJ0yeOGSt/5/x1o0Jo1LQwdzHU29JSN7gJQgjslCVrMFZ2zMp8Vpu2o3LH+52OSfObWHP+hBh5cOzlFpRTL0KYo2arJVzIyzW2aFcI8rF1hZWVhOdYqczH4ig4wop4sI7PbthOEytYI+mFQAZ1jh8kj/iYaLAe/m8m9ZWlOuuOjyqvcafqM4Qfb2XP7XTGQnhI3ZfvKV9X419nwq8s78eyTx7NjXCRJfug+SVabSlr3tgIluSWSCvgpHh/39Lq7ahIplprZvVa2l6V/5KqO4HW9HtvFiZwQRQNshJyPB5YyXY1J4iiZ9731MywowWRrvwOAhui0Kzs5cu+83//YasLNu+R//AVfKwdP0PCgC02tdsl3M32dFXK1okYsPsJGAxCbM0AA=='

export interface AtmosphereBreakSectionProps {
  kicker?: string
  dishLead?: string
  dishAccent?: string
  ingredients?: string
  microphrase?: string
}

/**
 * Atmósfera — el respiro de la mitad del recorrido. Ya no es un degradado
 * abstracto: ahora tiene su propio protagonista, «Tapeo Cortázar» (una entrada
 * real de la casa), como cinemagraph que emerge de la oscuridad — mismo método
 * que el Lomo (fotografía real que respira con transforms CSS: push-in + luz +
 * grain), pero contenido en lugar de a sangre, para preservar nitidez. Es una
 * escena distinta a la del Lomo, así que nunca compiten en el mismo viewport
 * («un protagonista por escena»). Sigue siendo un respiro: sin CTA, sin párrafo.
 * El nombre y los ingredientes van como texto real en el DOM; las capas de
 * imagen son decorativas (`aria-hidden`). `prefers-reduced-motion` congela la
 * pieza. Sin JavaScript. Server Component.
 */
export default function AtmosphereBreakSection({
  kicker = 'Entrada de la casa',
  dishLead = 'Tapeo',
  dishAccent = 'Cortázar',
  ingredients = 'Pan dorado · jamón curado · rúgula · almendra · glaseado',
  microphrase = 'Nos vemos adentro',
}: AtmosphereBreakSectionProps) {
  return (
    <section
      aria-label={`${dishLead} ${dishAccent} — una entrada de la casa`}
      className="relative min-h-[60vh] overflow-hidden border-y border-[#4A5728] bg-[#12180a] md:min-h-[70vh]"
    >
      {/* Duotono cálido derivado de la paleta (café + brasa), estático */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 110% at 12% 8%, rgba(201,162,39,.16), transparent 55%),' +
            'radial-gradient(80% 120% at 92% 96%, rgba(193,18,31,.22), transparent 60%),' +
            'linear-gradient(160deg, #26301a 0%, #191f10 55%, #10160a 100%)',
        }}
      />
      <span aria-hidden="true" className="grain-soft" />
      {/* Regla editorial fina como acento compositivo */}
      <span aria-hidden="true" className="absolute left-6 top-14 h-px w-14 bg-[#C1121F] md:left-10 md:top-20 md:w-24" />

      <Container variant="default" className="relative">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-10 py-16 md:min-h-[70vh] md:flex-row md:justify-between md:gap-16 md:py-20">
          {/* Texto real — identidad del plato, legible sin movimiento */}
          <div className="order-2 w-full max-w-md text-center md:order-1 md:text-left">
            <p className="font-sans-app text-[10px] font-bold uppercase tracking-[0.34em] text-[#FF7F70]">
              {kicker}
            </p>
            <p
              className="mt-5 font-playfair font-black leading-[0.82] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)' }}
            >
              <span className="block text-[#F5F5F0]">{dishLead}</span>
              <span className="-mt-1 block italic text-[#FF7F70]">{dishAccent}</span>
            </p>
            {ingredients ? (
              <p className="mx-auto mt-6 max-w-xs font-sans-app text-xs uppercase leading-relaxed tracking-[0.18em] text-[#D9DCC4]/85 md:mx-0">
                {ingredients}
              </p>
            ) : null}
          </div>

          {/* Figura decorativa — el plato real iluminado, cinemagraph contenido */}
          <figure
            aria-hidden="true"
            className="order-1 relative aspect-square w-[min(76vw,18rem)] shrink-0 overflow-hidden rounded-[3px] md:order-2 md:w-[23rem]"
            style={{
              boxShadow:
                '0 40px 90px -30px rgba(0,0,0,.85), 0 0 70px -12px rgba(201,162,39,.28), 0 0 0 1px rgba(193,18,31,.22)',
              backgroundImage: `url("${LQIP}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Fondo desenfocado (rellena tras el plato, estático) */}
            <picture>
              <source type="image/avif" srcSet="/media/tapeo/tapeo-fondo.avif" />
              <img
                src="/media/tapeo/tapeo-fondo.webp"
                alt=""
                width={240}
                height={240}
                decoding="async"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>

            {/* Plato (animado): cuadrado real del plato (barras negras recortadas) */}
            <picture>
              <source media="(max-width: 767px)" type="image/avif" srcSet="/media/tapeo/tapeo-plato-mobile.avif" />
              <source media="(max-width: 767px)" type="image/webp" srcSet="/media/tapeo/tapeo-plato-mobile.webp" />
              <source type="image/avif" srcSet="/media/tapeo/tapeo-plato-desktop.avif" />
              <img
                src="/media/tapeo/tapeo-plato-desktop.webp"
                alt=""
                width={469}
                height={469}
                decoding="async"
                loading="lazy"
                className="tapeo-plato absolute inset-0 h-full w-full object-cover"
              />
            </picture>

            {/* Respiración de luz sobre la guarnición */}
            <span
              className="tapeo-luz absolute inset-0"
              style={{ background: 'radial-gradient(46% 42% at 50% 44%, rgba(255,214,150,0.95), transparent 72%)' }}
            />

            {/* Grain estático */}
            <span className="grain-soft" />

            {/* Viñeta interior: funde los bordes en la oscuridad (no rectángulo duro) */}
            <span
              className="absolute inset-0"
              style={{ background: 'radial-gradient(120% 120% at 50% 38%, transparent 52%, rgba(0,0,0,0.6))' }}
            />
          </figure>
        </div>
      </Container>

      {/* Microfrase del recorrido (decorativa) — nota de margen, no compite */}
      <Microphrase
        tone="night"
        className="pointer-events-none absolute bottom-6 left-6 text-[clamp(0.95rem,2.2vw,1.4rem)] md:bottom-8 md:left-10"
      >
        {microphrase}
      </Microphrase>
    </section>
  )
}
