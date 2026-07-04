/**
 * Estructura gastronómica — Café Valparaíso.
 *
 * `menuPreviewItems` describe líneas/categorías, no platos con precio: no
 * hay carta ni precios confirmados en el repo todavía.
 */

export const menuCategories = ['Café', 'Cocina', 'Coctelería', 'Postres'] as const

export type MenuCategory = (typeof menuCategories)[number]

export type MenuPreviewLine = {
  title: string
  category: MenuCategory
  description: string | null
}

export const menuPreviewItems: MenuPreviewLine[] = [
  { title: 'Cafés de especialidad', category: 'Café', description: null },
  { title: 'Cocina de autor', category: 'Cocina', description: null },
  { title: 'Coctelería de temporada', category: 'Coctelería', description: null },
  { title: 'Postres de la casa', category: 'Postres', description: null },
]

export const menuConfig = {
  ctaHref: '/menu',
  statusNotes:
    'Sin precios ni platos específicos confirmados. El menú real se conecta cuando el negocio lo entregue.',
} as const
