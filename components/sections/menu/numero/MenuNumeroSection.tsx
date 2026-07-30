import Container from '@/components/ui/Container'
import PortadaCarta from './PortadaCarta'
import CapituloFoto from './CapituloFoto'
import CapituloTexto from './CapituloTexto'
import NumeroFoto from './NumeroFoto'
import { menuNumero } from '@/content/menuNumero'

/**
 * «La Carta, Nº 01» — /menu como número de revista literaria. Masthead →
 * portada (plato de la casa) → capítulos que alternan foto↔texto (un
 * protagonista por capítulo, numerales fantasma detrás) → índice «De la barra».
 * Ritmo editorial, sin precios (la carta se comparte en la mesa). Se nutre de
 * `menuNumero` (copia) + `menuFeatured` (fotos). Server Component.
 */
export default function MenuNumeroSection() {
  const { masthead, portada, capitulos, barra } = menuNumero

  return (
    <div className="bg-[#F5F5F0]">
      {/* Masthead */}
      <Container variant="default">
        <header className="flex items-center gap-5 border-b border-[#1E2410]/15 py-8">
          <span className="font-playfair text-xl italic font-medium text-[#1E2410]">{masthead.titulo}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#1E2410]/25" />
          <span className="font-sans-app text-xs uppercase tracking-[0.18em] text-[#4A5728]">
            {masthead.numero}
          </span>
        </header>
      </Container>

      {/* Portada */}
      <PortadaCarta eyebrow={portada.eyebrow} dish={portada.dish} sub={portada.sub} />

      {/* Capítulos — alternancia foto ↔ texto */}
      {capitulos.map((cap) =>
        cap.tipo === 'foto' ? (
          <CapituloFoto key={cap.numeral} cap={cap} />
        ) : (
          <CapituloTexto key={cap.numeral} cap={cap} />
        )
      )}

      {/* Índice — De la barra */}
      <section className="bg-[#EFE4D0]">
        <Container variant="default">
          <div className="py-16 md:py-24">
            <div className="mb-9 flex items-center gap-4">
              <span className="font-sans-app text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#C1121F]">
                {barra.eyebrow}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-[#1E2410]/20" />
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
              {barra.dishes.map((dish) => (
                <article key={dish.slug}>
                  <NumeroFoto dish={dish} breathe={false} className="border-[#1E2410]/15" />
                  <p className="mt-4 font-playfair text-xl text-[#1E2410]">
                    {dish.nameLead} <span className="italic text-[#C1121F]">{dish.nameAccent}</span>
                  </p>
                  <p className="mt-1 font-sans-app text-sm tracking-[0.02em] text-[#4A5728]">
                    {dish.ingredients}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
