import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import Folio from '@/components/ui/Folio'
import GhostType from '@/components/ui/GhostType'

export type MenuPreviewItem = {
  title: string
  category?: string
  description?: string
  href?: string
}

export interface MenuPreviewSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  items?: MenuPreviewItem[]
  note?: string
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_ITEMS: MenuPreviewItem[] = [
  { title: 'Cafés de especialidad', category: 'Café' },
  { title: 'Cocina de autor', category: 'Cocina' },
  { title: 'Coctelería de temporada', category: 'Coctelería' },
  { title: 'Postres de la casa', category: 'Postres' },
]

/**
 * «Gastronomía / Menú» — lista editorial sobre marfil con hover-fill rojo
 * (`.menu-row`/`.menu-fill`), el mejor micro-momento interactivo del sitio.
 * Encabezado asimétrico con folio y tipografía-imagen de fondo. La información
 * es siempre visible; el hover solo añade el relleno. Server Component.
 */
export default function MenuPreviewSection({
  index = '03',
  eyebrow = 'Gastronomía',
  title = 'Toda buena lectura',
  emphasis = 'pide su bebida.',
  items = DEFAULT_ITEMS,
  note,
  cta = { label: 'Ver menú', href: '/menu' },
  className = '',
}: MenuPreviewSectionProps) {
  return (
    <section
      className={cn('relative overflow-hidden bg-[#F5F5F0] py-24 md:py-36', className)}
    >
      <GhostType tone="paper" position="right-bottom" sizeVw={28} opacity={0.05}>
        Carta
      </GhostType>

      <Container variant="default" className="relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Folio number={index} label={eyebrow} tone="paper" variant="stacked" />
            <h2
              className="mt-8 max-w-3xl font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#181f0d]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}
            >
              {title} <span className="italic text-[#C1121F]">{emphasis}</span>
            </h2>
          </div>
        </div>

        {items.length > 0 ? (
          <ul className="mt-14 border-t border-[#181f0d]/10">
            {items.map((item, i) => (
              <li
                key={item.title}
                className="menu-row group flex items-baseline justify-between gap-4 border-b border-[#181f0d]/10 py-6"
              >
                <span className="menu-fill" aria-hidden="true" />
                <span className="relative z-10 flex items-baseline gap-5">
                  <span className="font-sans-app text-[11px] tabular-nums text-[#C1121F] transition-colors group-hover:text-[#F5F5F0]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-playfair leading-[0.95] text-[#181f0d] transition-colors group-hover:text-[#F5F5F0]"
                    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}
                  >
                    {item.category ?? item.title}
                  </span>
                </span>
                {item.description ? (
                  <span className="relative z-10 hidden max-w-[46%] pl-6 text-right font-playfair text-sm italic text-[#4A5728] transition-colors group-hover:text-[#F5F5F0] sm:block md:text-base">
                    {item.description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          {note ? (
            <p className="font-playfair text-base italic text-[#4A5728]">{note}</p>
          ) : (
            <span />
          )}
          {cta ? (
            <LinkButton href={cta.href} variant="wine" size="md" className="shrink-0">
              {cta.label}
            </LinkButton>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
