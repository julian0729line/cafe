import Container from '@/components/ui/Container'

export type LibraryCategoryLine = {
  title: string
  description?: string
}

export interface LibraryCategoriesSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  categories?: LibraryCategoryLine[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Categorías reales de `data/library.ts` (`libraryCategories`) en filas
 * editoriales sobre fondo profundo, con relleno tenue al hover
 * (`.editorial-fill`, GOAL 17 — distinto del relleno sólido de Menú, para
 * diferenciar el lenguaje visual entre páginas). No son enlaces: sin
 * inventario ni ficha de detalle todavía, así que no se usan `<a>`/`<button>`
 * ni `tabIndex` artificial. Sin precios, autores ni libros inventados.
 * Server Component.
 */
export default function LibraryCategoriesSection({
  index = '03',
  eyebrow = 'Cómo está organizada',
  title = 'La curaduría',
  emphasis = 'tiene forma.',
  description = 'Tres líneas conviven en Librería La Maga, cada una con su propio ritmo de lectura.',
  categories = [],
  className = '',
}: LibraryCategoriesSectionProps) {
  return (
    <section className={cn('bg-[#181f0d] py-20 md:py-32', className)}>
      <Container variant="default">
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
          {description ? (
            <p className="mt-4 font-sans-app text-base leading-relaxed text-[#A6B86B]">
              {description}
            </p>
          ) : null}
        </div>

        {categories.length > 0 ? (
          <ul className="mt-12 border-t border-[#4A5728]">
            {categories.map((category, i) => (
              <li
                key={category.title}
                className="editorial-fill group relative flex flex-col gap-3 border-b border-[#4A5728] py-8 text-[#C1121F] md:flex-row md:items-baseline md:justify-between md:gap-10"
              >
                <span className="relative z-10 flex items-baseline gap-5">
                  <span className="font-playfair text-2xl italic text-[#FF7F70]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-playfair text-2xl text-[#F5F5F0] md:text-3xl">
                    {category.title}
                  </h3>
                </span>
                {category.description ? (
                  <p className="relative z-10 max-w-md font-sans-app text-sm leading-relaxed text-[#A6B86B] md:text-right">
                    {category.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
