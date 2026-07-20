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
  {
    title: 'Cafés de especialidad',
    category: 'Café',
    description: 'Nuestra barra de café, el centro de la experiencia Valparaíso.',
  },
  {
    title: 'Cocina de autor',
    category: 'Cocina',
    description: 'Una propuesta gastronómica con identidad propia.',
  },
  {
    title: 'Coctelería de temporada',
    category: 'Coctelería',
    description: 'Preparaciones que acompañan las tardes y noches culturales.',
  },
  {
    title: 'Postres de la casa',
    category: 'Postres',
    description: 'El cierre dulce para compartir sobre la mesa.',
  },
]

export const menuConfig = {
  ctaHref: '/menu',
  statusNotes:
    'Líneas gastronómicas generales confirmadas (café, cocina, coctelería, postres). Sin precios ni platos específicos confirmados: la carta detallada se conecta cuando el negocio la entregue.',
} as const
