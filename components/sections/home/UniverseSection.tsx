import Link from 'next/link'
import Container from '@/components/ui/Container'

type Cta = { label: string; href: string }

export interface UniverseSectionProps {
  eyebrow?: string
  menu: {
    piece?: string
    name?: string
    dishLead?: string
    dishAccent?: string
    ingredients?: string
    cta: Cta
  }
  spaces: { piece?: string; name?: string; sedes: readonly string[]; line: string; cta: Cta }
}

type RowProps = {
  href: string
  /** El nombre es el protagonista de la fila: va en Playfair, grande. */
  name: React.ReactNode
  line: string
  access: string
}

/**
 * Una fila editorial. No es una tarjeta: no tiene marco, ni fondo propio, ni
 * etiqueta numerada. Lo único que la separa de la siguiente es una regla fina,
 * y lo único que la sostiene es el aire alrededor del nombre.
 *
 * Toda la fila es el enlace, así que el área de toque en móvil es la pieza
 * completa y no solo el texto del acceso.
 */
function Row({ href, name, line, access }: RowProps) {
  return (
    <Link
      href={href}
      className="group block border-b border-[rgba(28,25,18,0.14)] py-10 motion-safe:transition-colors motion-safe:duration-500 hover:bg-[rgba(28,25,18,0.025)] md:py-14"
    >
      <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-4">
        <h3 className="col-span-12 md:col-span-6">
          <span className="block font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#181f0d] motion-safe:transition-transform motion-safe:duration-500 md:group-hover:translate-x-2">
            {name}
          </span>
        </h3>

        <p className="col-span-12 font-sans-app text-base leading-relaxed text-[#4A5728] md:col-span-4">
          {line}
        </p>

        <span className="col-span-12 inline-flex items-center gap-3 font-sans-app text-[11px] font-bold uppercase tracking-[0.22em] text-[#7A2230] md:col-span-2 md:justify-end">
          {access}
          {/* La línea que se extiende: el único movimiento de la sección. */}
          <span
            aria-hidden="true"
            className="block h-px w-6 bg-[#C1121F] motion-safe:transition-all motion-safe:duration-500 md:group-hover:w-10"
          />
        </span>
      </div>
    </Link>
  )
}

/**
 * Universo Valparaíso — los accesos del Home, en filas editoriales.
 *
 * Antes eran dos tarjetas con marco, fondo propio y una etiqueta «01 · Acceso»
 * cada una. Eso convertía cada acceso en un afiche y ponía dos protagonistas
 * compitiendo en el mismo viewport. Ahora el protagonista es la tipografía y el
 * espacio negativo: filas de ancho completo separadas por una regla fina, sin
 * marcos y sin numeración decorativa.
 *
 * La carta va primero pero deliberadamente contenida: ya tuvo su momento
 * protagonista arriba, en «La carta en movimiento».
 *
 * Movimiento: una sola idea, y solo en escritorio con hover disponible. El
 * nombre se desplaza unos píxeles y la línea del acceso se extiende. Nada
 * depende del hover para funcionar, así que en móvil la sección está completa
 * sin interacción. Server Component.
 */
export default function UniverseSection({
  eyebrow = 'Universo Valparaíso',
  menu,
  spaces,
}: UniverseSectionProps) {
  return (
    <section
      aria-label="Universo Café Valparaíso"
      className="relative overflow-hidden bg-[#F5F5F0] py-20 md:py-32"
    >
      <Container variant="default" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          {eyebrow}
        </p>

        <div className="mt-10 border-t border-[rgba(28,25,18,0.14)] md:mt-14">
          <Row
            href={menu.cta.href}
            name={<span style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>La carta</span>}
            line="Cocina de autor, café de especialidad y postres de la casa."
            access={menu.cta.label}
          />

          <Row
            href={spaces.cta.href}
            name={
              <span className="flex flex-wrap items-baseline gap-x-5">
                {spaces.sedes.map((sede, i) => (
                  <span
                    key={sede}
                    style={{
                      fontSize:
                        i === 0 ? 'clamp(2.4rem, 6vw, 4.5rem)' : 'clamp(1.9rem, 4.6vw, 3.4rem)',
                    }}
                  >
                    {sede}
                  </span>
                ))}
              </span>
            }
            line={spaces.line}
            access={spaces.cta.label}
          />
        </div>
      </Container>
    </section>
  )
}
