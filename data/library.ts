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
  ctaHref: '/libreria',
  statusNotes:
    'Sin inventario de libros, autores ni horarios confirmados. Lista para conectar a la sección de librería.',
} as const
