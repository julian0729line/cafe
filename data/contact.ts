/**
 * Datos de contacto — Café Valparaíso.
 *
 * Ningún canal (WhatsApp, teléfono, correo, Instagram, Maps) está
 * confirmado en el repo todavía: todos quedan en `null` hasta que el
 * negocio los entregue. No se inventa ninguna dirección ni horario.
 */

export type ContactLocation = {
  name: string
  city: string
  address: string | null
  mapsUrl: string | null
  status: 'confirmed' | 'pending'
  notes: string | null
}

export type ReservationChannel = {
  label: string
  href: string
  status: 'confirmed' | 'pending'
}

export const contactConfig = {
  primaryCity: 'Cali, Colombia',
  whatsapp: null,
  phone: null,
  email: null,
  instagram: null,
  // Sedes confirmadas (Fase 1): Pance y Juanambú. Las direcciones exactas,
  // enlaces de Google Maps y horarios quedan pendientes de confirmar.
  locations: [
    {
      name: 'Pance',
      city: 'Cali',
      address: null,
      mapsUrl: null,
      status: 'pending',
      notes: 'Dirección pendiente de confirmar.',
    },
    {
      name: 'Juanambú',
      city: 'Cali',
      address: null,
      mapsUrl: null,
      status: 'pending',
      notes: 'Dirección pendiente de confirmar.',
    },
  ] as ContactLocation[],
  maps: null,
  reservationChannels: [
    { label: 'Formulario de contacto', href: '/contacto', status: 'pending' },
  ] as ReservationChannel[],
  statusNotes:
    'Confirmadas las sedes de Pance y Juanambú (sin dirección exacta). Pendientes de confirmar: WhatsApp, teléfono, correo, Instagram, direcciones exactas, horarios y enlaces de Google Maps.',
} as const
