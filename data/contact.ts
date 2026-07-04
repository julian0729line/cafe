/**
 * Datos de contacto — Café Valparaíso.
 *
 * Ningún canal (WhatsApp, teléfono, correo, Instagram, Maps) está
 * confirmado en el repo todavía: todos quedan en `null` hasta que el
 * negocio los entregue. No se inventa ninguna dirección ni horario.
 */

export type ContactLocation = {
  name: string
  addressLabel: string | null
  status: 'confirmed' | 'pending'
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
  locations: [] as ContactLocation[],
  maps: null,
  reservationChannels: [
    { label: 'Formulario de contacto', href: '/contacto', status: 'pending' },
  ] as ReservationChannel[],
  statusNotes:
    'Pendientes de confirmar: WhatsApp, teléfono, correo, Instagram, sedes/direcciones y enlace de Google Maps.',
} as const
