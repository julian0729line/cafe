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

export type SedeName = (typeof spacesConfig.sedes)[number]

export type SedePhoto = {
  /** Ruta dentro de `public/` (ver `public/media/README.md`). */
  src: string
  /** Texto alternativo real: describe la sala, no repite el nombre de la sede. */
  alt: string
  /** Reserva el espacio antes de que cargue la imagen y evita saltos de layout. */
  aspect?: string
}

/**
 * Fotografía de cada sede. `null` = todavía no hay foto real de esa sede, y
 * la sección la omite sin romperse (mismo criterio que `hero.posterSrc`): se
 * mantiene la composición tipográfica en vez de mostrar un hueco.
 *
 * Ninguna sede lleva foto de la otra ni una imagen genérica: una foto de sede
 * es una promesa de a dónde va a llegar el cliente, así que solo entra aquí
 * material real del lugar que nombra.
 */
export const sedePhotos: Record<SedeName, SedePhoto | null> = {
  Pance: null,
  Juanambú: null,
}
