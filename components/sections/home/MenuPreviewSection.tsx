import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

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
 * (`.menu-row`/`.menu-fill`). La información (número, línea y descripción) es
 * siempre visible: el hover solo añade el relleno decorativo. Sin precios ni
 * platos inventados. Server Component.
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
    <section className={cn('border-b border-[rgba(28,25,18,0.12)] bg-[#F5F5F0] py-20 md:py-32', className)}>
      <Container variant="default">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 max-w-3xl font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>

        {items.length > 0 ? (
          <ul className="mt-12 border-t border-[#181f0d]/10">
            {items.map((item, i) => (
              <li
                key={item.title}
                className="menu-row group flex items-baseline justify-between gap-4 border-b border-[#181f0d]/10 py-5"
              >
                <span className="menu-fill" aria-hidden="true" />
                <span className="relative z-10 flex items-baseline gap-4">
                  <span className="font-sans-app text-[11px] tabular-nums text-[#C1121F] transition-colors group-hover:text-[#F5F5F0]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-playfair text-2xl text-[#181f0d] transition-colors group-hover:text-[#F5F5F0] md:text-3xl">
                    {item.category ?? item.title}
                  </span>
                </span>
                {item.description ? (
                  <span className="relative z-10 max-w-[52%] pl-6 text-right font-playfair text-sm italic text-[#4A5728] transition-colors group-hover:text-[#F5F5F0] md:text-base">
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
