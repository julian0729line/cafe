/**
 * Espacios y reservas — Café Valparaíso.
 *
 * Espacios genéricos, sin aforos, precios ni sedes confirmadas. Preparado
 * para recibir sedes reales cuando el negocio las entregue.
 */

export type SpacePreviewLine = {
  title: string
  tag: string | null
  description: string | null
  status: 'confirmed' | 'pending'
}

export const spacesPreview: SpacePreviewLine[] = [
  { title: 'Encuentros privados', tag: 'Reuniones', description: null, status: 'pending' },
  { title: 'Celebraciones', tag: 'Eventos', description: null, status: 'pending' },
  { title: 'Actividades culturales', tag: 'Cultura', description: null, status: 'pending' },
]

export const spacesConfig = {
  ctaHref: '/espacios',
  statusNotes:
    'Sin aforos, precios ni sedes confirmadas todavía. Estructura lista para recibir sedes reales.',
} as const
