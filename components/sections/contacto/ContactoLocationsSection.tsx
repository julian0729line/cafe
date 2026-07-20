import Container from '@/components/ui/Container'

export type ContactLocationLine = {
  name: string
  city: string
  address?: string | null
  mapsUrl?: string | null
}

export interface ContactoLocationsSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  locations?: ContactLocationLine[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Sedes confirmadas (`contactConfig.locations`), con dirección exacta ahora
 * disponible. Composición tipográfica alternada, igual en espíritu a
 * `SpacesLocationsSection` de /espacios (sin reutilizar el componente:
 * ese archivo queda intacto en este GOAL). El enlace a Google Maps solo se
 * renderiza si `mapsUrl` existe — hoy no existe, así que no aparece.
 * Server Component.
 */
export default function ContactoLocationsSection({
  index = '03',
  eyebrow = 'Nuestras sedes',
  title = 'Visítanos en',
  emphasis = 'Pance o Juanambú.',
  locations = [],
  className = '',
}: ContactoLocationsSectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#181f0d] py-20 md:py-28', className)}>
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="default" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
          <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 font-playfair font-black leading-[0.95] tracking-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
        </h2>

        {locations.length > 0 ? (
          <div className="mt-14 flex flex-col gap-14 md:flex-row md:gap-10">
            {locations.map((location) => (
              <div
                key={location.name}
                className="max-w-sm flex-1 border-t border-[#4A5728] pt-7"
              >
                <h3 className="font-playfair text-2xl text-[#F5F5F0]">{location.name}</h3>
                <p className="mt-1 font-sans-app text-[11px] uppercase tracking-[0.25em] text-[#8A9A52]">
                  {location.city}
                </p>
                {location.address ? (
                  <p className="mt-4 font-sans-app text-sm leading-relaxed text-[#D9DCC4]">
                    {location.address}
                  </p>
                ) : null}
                {location.mapsUrl ? (
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="press mt-4 inline-block font-sans-app text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF7F70] hover:text-[#F5F5F0]"
                  >
                    Ver en Google Maps
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
