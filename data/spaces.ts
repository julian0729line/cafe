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
  {
    title: 'Encuentros privados',
    tag: 'Privado',
    description: 'Un espacio reservado para reuniones cercanas.',
    status: 'pending',
  },
  {
    title: 'Celebraciones',
    tag: 'Eventos',
    description: 'Un lugar con identidad para momentos especiales.',
    status: 'pending',
  },
  {
    title: 'Reuniones',
    tag: 'Trabajo',
    description: 'Para encuentros de trabajo o conversación tranquila.',
    status: 'pending',
  },
  {
    title: 'Actividades culturales',
    tag: 'Cultura',
    description: 'Espacios para lecturas, música y agenda cultural.',
    status: 'pending',
  },
]

// Sedes confirmadas (Fase 1); aforos, tarifas y disponibilidad quedan pendientes.
export const spacesConfig = {
  ctaHref: '/espacios',
  sedes: ['Pance', 'Juanambú'] as const,
  statusNotes:
    'Sedes de Pance y Juanambú confirmadas. Sin aforos, tarifas ni disponibilidad confirmados todavía: esos detalles operativos se confirman por contacto.',
} as const
