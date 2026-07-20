import Container from '@/components/ui/Container'

export type SpaceLocationLine = {
  name: string
  city: string
}

export interface SpacesLocationsSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  locations?: SpaceLocationLine[]
  note?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Sedes confirmadas de Café Valparaíso (`spacesConfig.sedes` / `contactConfig.locations`
 * en `data/spaces.ts` y `data/contact.ts`): solo nombre y ciudad — sin
 * dirección, capacidad ni fotografía, porque no están confirmadas todavía.
 * Composición tipográfica alternada (una sede a la izquierda, la otra
 * desplazada a la derecha) en vez de una cuadrícula uniforme de cards.
 * Server Component.
 */
export default function SpacesLocationsSection({
  index = '03',
  eyebrow = 'Nuestras sedes',
  title = 'Dos casas,',
  emphasis = 'una misma identidad.',
  locations = [],
  note = 'Capacidad, disponibilidad y condiciones de cada sede se confirman por contacto.',
  className = '',
}: SpacesLocationsSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#181f0d] py-20 md:py-32', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="default" className="relative">
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
        </div>

        {locations.length > 0 ? (
          <div className="mt-16 flex flex-col gap-16 md:gap-20">
            {locations.map((location, i) => {
              const isRight = i % 2 === 1
              return (
                <div
                  key={location.name}
                  className={cn(
                    'max-w-md border-t border-[#4A5728] pt-8',
                    isRight ? 'md:ml-auto md:border-t-0 md:border-l md:pl-10 md:pt-0' : ''
                  )}
                >
                  <span className="font-sans-app text-[11px] font-bold tabular-nums tracking-[0.2em] text-[#FF7F70]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-playfair text-3xl text-[#F5F5F0] md:text-4xl">
                    {location.name}
                  </h3>
                  <p className="mt-2 font-sans-app text-sm uppercase tracking-[0.25em] text-[#8A9A52]">
                    {location.city}
                  </p>
                </div>
              )
            })}
          </div>
        ) : null}

        {note ? (
          <p className="mt-16 max-w-xl font-playfair text-base italic leading-relaxed text-[#D9DCC4]">
            {note}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
