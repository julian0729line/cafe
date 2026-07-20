import Container from '@/components/ui/Container'

export interface LibraryManifestoSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  leadParagraph?: string
  bodyParagraph?: string
  aside?: string
  keywords?: string[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Manifiesto de curaduría de Librería La Maga: declaración editorial sobre
 * marfil, con capitular (`.dropcap`), cita lateral y palabras clave tomadas
 * de las categorías reales de `data/library.ts`. Máximo dos párrafos
 * principales; sin cifras ni especialidades no confirmadas. Server Component.
 */
export default function LibraryManifestoSection({
  index = '02',
  eyebrow = 'Manifiesto de curaduría',
  title = 'Los libros también',
  emphasis = 'se sirven en la mesa.',
  leadParagraph = 'En Café Valparaíso los libros no se archivan: se conversan. Librería La Maga reúne una curaduría literaria propia, título a título, pensada para acompañar la mesa y la sobremesa.',
  bodyParagraph = 'El club de lectura es su forma de encuentro: leer en comunidad, compartir una taza y volver con lo que cada libro trae a la conversación. Todavía no publicamos nuestro inventario en línea, pero cada visita es una invitación a preguntar, hojear y quedarse.',
  aside = 'Curar no es acumular: es elegir con cuidado.',
  keywords = [],
  className = '',
}: LibraryManifestoSectionProps) {
  return (
    <section
      className={cn(
        'relative border-b border-[rgba(28,25,18,0.12)] bg-[#F5F5F0] py-20 md:py-32',
        className
      )}
    >
      <Container variant="default" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>

        <h2
          className="mt-6 max-w-3xl font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p
              className="dropcap max-w-2xl font-playfair leading-relaxed text-[#181f0d]"
              style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)' }}
            >
              {leadParagraph}
            </p>
            {bodyParagraph ? (
              <p className="mt-6 max-w-2xl font-sans-app text-base leading-relaxed text-[#4A5728]">
                {bodyParagraph}
              </p>
            ) : null}
          </div>

          {aside ? (
            <aside className="md:col-span-4 md:pt-2">
              <p className="border-l-2 border-[#C1121F] pl-5 font-playfair text-lg italic leading-snug text-[#7A2230]">
                {aside}
              </p>
            </aside>
          ) : null}
        </div>

        {keywords.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
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
