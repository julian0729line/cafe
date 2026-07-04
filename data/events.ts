/**
 * Agenda cultural — Café Valparaíso.
 *
 * `featuredEvents` queda vacío a propósito: no hay eventos, fechas ni
 * precios confirmados en el repo. Las categorías son genéricas y sirven
 * de guía mientras se conecta la agenda real.
 */

export const eventCategories = [
  'Club de lectura',
  'Música en vivo',
  'Conversaciones',
  'Arte y cultura',
] as const

export type EventCategory = (typeof eventCategories)[number]

export type FeaturedEvent = {
  title: string
  category: EventCategory
  dateLabel: string | null
  description: string | null
  href: string | null
  status: 'confirmed' | 'pending'
}

export const featuredEvents: FeaturedEvent[] = []

export const eventsConfig = {
  ctaHref: '/agenda',
  statusNotes:
    'Sin eventos, fechas ni precios confirmados. La agenda cultural real se publica cuando el negocio la entregue.',
} as const
