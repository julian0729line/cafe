import Container from '@/components/ui/Container'
import Folio from '@/components/ui/Folio'
import GhostType from '@/components/ui/GhostType'
import EditorialRule from '@/components/ui/EditorialRule'

export interface AboutSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  lead?: string
  body?: string
  aside?: string
  keywords?: string[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_KEYWORDS = [
  'Literatura',
  'Café',
  'Cocina',
  'Arte',
  'Música',
  'Conversaciones',
  'Comunidad',
]

/**
 * «Qué es Café Valparaíso» — manifiesto editorial sobre marfil. Composición
 * asimétrica deliberada (folio apaisado en el margen + columna de lectura
 * angosta con dropcap + cita volada), tipografía-imagen de fondo y separador de
 * entrega. Server Component.
 */
export default function AboutSection({
  index = '01',
  eyebrow = 'Qué es Café Valparaíso',
  title = 'Más que un café,',
  emphasis = 'un lugar de encuentro.',
  lead = 'Café Valparaíso reúne cultura, gastronomía, literatura y conversación en Cali.',
  body,
  aside,
  keywords = DEFAULT_KEYWORDS,
  className = '',
}: AboutSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[#F5F5F0] py-24 md:py-36',
        className
      )}
    >
      <GhostType tone="paper" position="right-middle" sizeVw={30} opacity={0.05}>
        “
      </GhostType>

      <Container variant="default" className="relative">
        {/* Encabezado asimétrico: folio apaisado a la izquierda, título ocupando
            las 9 columnas de la derecha (rompe el stack centrado). */}
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-3">
            <Folio number={index} label={eyebrow} tone="paper" variant="stacked" />
            <EditorialRule weight="thick" tone="red" width="short" className="mt-6" />
          </div>

          <div className="md:col-span-9">
            <h2
              className="max-w-3xl font-playfair font-black leading-[0.92] tracking-[-0.03em] text-[#181f0d]"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}
            >
              {title} <span className="italic text-[#C1121F]">{emphasis}</span>
            </h2>
          </div>
        </div>

        {/* Cuerpo: columna de lectura angosta desplazada + cita volada al margen. */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-4">
            <p
              className="dropcap font-playfair leading-relaxed text-[#181f0d]"
              style={{ fontSize: 'clamp(1.2rem, 2.3vw, 1.7rem)' }}
            >
              {lead}
            </p>
            {body ? (
              <p className="mt-7 max-w-2xl font-sans-app text-base leading-relaxed text-[#4A5728]">
                {body}
              </p>
            ) : null}
          </div>

          {aside ? (
            <aside className="md:col-span-3 md:col-start-1 md:row-start-1 md:pt-3">
              <p className="border-l-2 border-[#C1121F] pl-5 font-playfair text-xl italic leading-snug text-[#7A2230]">
                {aside}
              </p>
            </aside>
          ) : null}
        </div>

        {keywords.length > 0 ? (
          <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[rgba(28,25,18,0.12)] pt-8">
            {keywords.map((word) => (
              <li
                key={word}
                className="font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#4A5728]"
              >
                {word}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
