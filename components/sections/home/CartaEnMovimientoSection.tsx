import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type CartaDish = {
  slug: string
  nameLead: string
  nameAccent: string
  ingredients: string
  /** Acento mínimo que acompaña al plato. Nunca tiñe la página entera. */
  accent: string
  lqip: string
  hasMobile: boolean
}

export interface CartaEnMovimientoSectionProps {
  eyebrow?: string
  dishes?: CartaDish[]
  cta?: { label: string; href: string }
}

/**
 * «La carta en movimiento» — el único momento experimental del Home.
 *
 * Una sola caja visual sostiene todos los platos: el scroll los cruza de uno
 * al siguiente, así que se lee como **una misma mesa presentando distintos
 * momentos**, no como cinco tarjetas. Ese es justo el motivo de que las fotos
 * compartan caja, encuadre y tamaño: si se pusieran una al lado de la otra,
 * volverían a ser una cuadrícula.
 *
 * Sin JavaScript. El crossfade se ata al progreso con `animation-timeline`
 * (ver `app/globals.css`), lo que lo hace reversible por construcción: una
 * timeline de scroll corre hacia los dos lados sin código extra. Por eso no
 * hace falta GSAP ni ScrollTrigger aquí, y el componente sigue siendo un
 * Server Component.
 *
 * Solo se animan `opacity` y `transform`, con escala máxima 1.03.
 *
 * Con `prefers-reduced-motion` la pila se desarma en una lista vertical: la
 * sección deja de ser alta, ningún plato queda oculto y nada depende del
 * scroll.
 */
export default function CartaEnMovimientoSection({
  eyebrow = 'La carta',
  dishes = [],
  cta,
}: CartaEnMovimientoSectionProps) {
  if (dishes.length === 0) return null

  // Tramos solapados sobre el recorrido de la sección. El solape es el
  // crossfade: mientras un plato se va, el siguiente ya está entrando.
  const span = 100 / dishes.length
  const overlap = span * 0.35

  return (
    <section
      aria-label="La carta de Café Valparaíso"
      className="carta-track relative border-y border-[#4A5728] bg-[#12180a]"
      style={{ height: `${100 + dishes.length * 22}vh` }}
    >
      <span aria-hidden="true" className="grain-soft" />

      <div className="carta-sticky sticky top-0 flex min-h-svh items-center overflow-hidden">
        <Container variant="default" className="relative w-full">
          <p className="font-sans-app text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A227]">
            {eyebrow}
          </p>

          <div className="carta-stack mt-8">
            {dishes.map((dish, i) => {
              const from = Math.max(0, i * span - overlap)
              const to = Math.min(100, (i + 1) * span + overlap)

              return (
                <div
                  key={dish.slug}
                  className="carta-item grid grid-cols-12 items-center gap-8"
                  style={
                    {
                      '--from': `${from.toFixed(1)}%`,
                      '--to': `${to.toFixed(1)}%`,
                    } as React.CSSProperties
                  }
                >
                  {/* Identidad del plato: texto real en el DOM, legible sin
                      movimiento y sin depender de la fotografía. */}
                  <div className="carta-copy order-2 col-span-12 md:order-1 md:col-span-5">
                    <span
                      aria-hidden="true"
                      className="block h-px w-12 transition-colors"
                      style={{ backgroundColor: dish.accent }}
                    />
                    <h3
                      className="mt-5 font-playfair leading-[0.92] tracking-tight text-[#F5F5F0]"
                      style={{ fontSize: 'clamp(2rem, 4.4vw, 3.5rem)' }}
                    >
                      {dish.nameLead}{' '}
                      <span className="italic" style={{ color: dish.accent }}>
                        {dish.nameAccent}
                      </span>
                    </h3>
                    <p className="mt-4 max-w-xs font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                      {dish.ingredients}
                    </p>
                  </div>

                  {/* La caja compartida. Todos los platos ocupan exactamente
                      esta misma proporción y posición. */}
                  <figure className="carta-media order-1 col-span-12 md:order-2 md:col-span-6 md:col-start-7">
                    <div
                      className="relative overflow-hidden rounded-[3px] border border-[#4A5728]/60"
                      style={{ aspectRatio: '1 / 1', backgroundColor: '#10160a' }}
                    >
                      {/* LQIP incrustado: la caja nunca parpadea en negro. */}
                      <img
                        src={dish.lqip}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-105 object-cover blur-xl"
                      />
                      <picture>
                        {dish.hasMobile ? (
                          <>
                            <source
                              media="(max-width: 767px)"
                              type="image/avif"
                              srcSet={`/media/${dish.slug}/${dish.slug}-plato-mobile.avif`}
                            />
                            <source
                              media="(max-width: 767px)"
                              type="image/webp"
                              srcSet={`/media/${dish.slug}/${dish.slug}-plato-mobile.webp`}
                            />
                          </>
                        ) : null}
                        <source
                          type="image/avif"
                          srcSet={`/media/${dish.slug}/${dish.slug}-plato-desktop.avif`}
                        />
                        <source
                          type="image/webp"
                          srcSet={`/media/${dish.slug}/${dish.slug}-plato-desktop.webp`}
                        />
                        <img
                          src={`/media/${dish.slug}/${dish.slug}-plato-desktop.webp`}
                          alt={`${dish.nameLead} ${dish.nameAccent}`}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </picture>
                    </div>
                  </figure>
                </div>
              )
            })}
          </div>

          {cta ? (
            <div className="mt-12">
              <LinkButton href={cta.href} variant="secondary" size="md">
                {cta.label}
              </LinkButton>
            </div>
          ) : null}
        </Container>
      </div>
    </section>
  )
}
