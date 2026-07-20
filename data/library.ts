/**
 * Librería La Maga — Café Valparaíso.
 *
 * Categorías de línea editorial, sin inventario, autores ni horarios
 * confirmados en el repo todavía.
 */

export const libraryCategories = [
  {
    title: 'Curaduría literaria',
    description: 'Una selección propia, cuidada título a título.',
  },
  {
    title: 'Club de lectura',
    description: 'Encuentros para leer y conversar en comunidad.',
  },
  {
    title: 'Estantería comunitaria',
    description: 'Un lugar para compartir y descubrir libros.',
  },
] as const

export const libraryConfig = {
  name: 'Librería La Maga',
  ctaHref: '/libreria',
  statusNotes:
    'Librería La Maga confirmada como línea del proyecto (curaduría literaria, clubes de lectura y conversación). Sin inventario de libros, autores, precios ni horarios confirmados todavía.',
} as const
