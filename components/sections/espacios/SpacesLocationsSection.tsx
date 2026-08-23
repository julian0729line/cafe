import Image from 'next/image'
import Container from '@/components/ui/Container'

export type SpaceLocationLine = {
  name: string
  city: string
  /** Foto real de la sede. Si falta, la sede conserva su bloque tipográfico. */
  photo?: { src: string; alt: string; aspect?: string } | null
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
 * en `data/spaces.ts` y `data/contact.ts`): nombre y ciudad — sin dirección
 * ni capacidad, porque no están confirmadas todavía. Composición tipográfica
 * alternada (una sede a la izquierda, la otra desplazada a la derecha) en vez
 * de una cuadrícula uniforme de cards.
 *
 * La fotografía es **opcional por sede** (`sedePhotos`): la sede que tenga
 * foto real la muestra junto a su bloque; la que no, conserva el tratamiento
 * tipográfico intacto. Así una sede sin material no aparece como un hueco
 * roto al lado de otra ilustrada — que es justo el riesgo mientras solo una
 * de las dos tenga fotos. Server Component: sin JS.
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
              const photo = location.photo
              return (
                <div
                  key={location.name}
                  className={cn(
                    'border-t border-[#4A5728] pt-8',
                    photo ? 'max-w-3xl' : 'max-w-md',
                    isRight ? 'md:ml-auto md:border-t-0 md:border-l md:pl-10 md:pt-0' : ''
                  )}
                >
                  <div
                    className={cn(
                      photo ? 'md:flex md:items-end md:gap-10' : '',
                      photo && isRight ? 'md:flex-row-reverse' : ''
                    )}
                  >
                    <div className={photo ? 'md:flex-1' : ''}>
                      {/* Sin contador por sede: la pagina ya numera sus
                          secciones (01 a 04), asi que un «01»/«02» aqui dentro
                          de la seccion 03 hacia leer 01, 02, 04 y parecia que
                          faltaba una. El nombre de la sede es el protagonista. */}
                      <h3 className="font-playfair text-3xl text-[#F5F5F0] md:text-4xl">
                        {location.name}
                      </h3>
                      <p className="mt-2 font-sans-app text-sm uppercase tracking-[0.25em] text-[#8A9A52]">
                        {location.city}
                      </p>
                    </div>

                    {photo ? (
                      <figure
                        className="relative mt-8 overflow-hidden rounded-[3px] border border-[#4A5728]/60 md:mt-0 md:flex-1"
                        style={{ aspectRatio: photo.aspect ?? '4 / 5' }}
                      >
                        {/* `fill` + `sizes`: Next sirve avif/webp y el tamaño
                            justo para cada viewport (next.config.ts ya declara
                            ambos formatos). Un solo archivo fuente basta. */}
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 768px) 36vw, 100vw"
                          className="object-cover"
                        />
                      </figure>
                    ) : null}
                  </div>
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
