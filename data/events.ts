/**
 * Agenda cultural — Café Valparaíso.
 *
 * `featuredEvents` queda vacío a propósito: no hay eventos, fechas ni
 * precios confirmados en el repo. Las categorías son genéricas y sirven
 * de guía mientras se conecta la agenda real.
 */

export const eventCategories = [
  'Clubes de lectura',
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

// Vacío a propósito: no hay eventos ni fechas confirmadas en Fase 1.
export const featuredEvents: FeaturedEvent[] = []

export const eventsConfig = {
  ctaHref: '/agenda',
  emptyStateTitle: 'Agenda próxima a publicarse',
  emptyStateMessage:
    'Estamos preparando la próxima agenda cultural. Vuelve pronto o escríbenos para conocer las próximas actividades.',
  statusNotes:
    'Categorías generales confirmadas (clubes de lectura, música en vivo, conversaciones, arte y cultura). Sin eventos, fechas ni precios confirmados: la agenda real se publica cuando el negocio la entregue.',
} as const
