/**
 * Datos de contacto — Café Valparaíso.
 *
 * Confirmados (GOAL 22 — Fase B): WhatsApp y las direcciones exactas de
 * Pance y Juanambú. Teléfono independiente, correo, Instagram y enlaces de
 * Google Maps siguen sin confirmar: quedan en `null`, nunca inventados —
 * el teléfono en particular NO se asume igual al WhatsApp.
 *
 * Los horarios NO se publican todavía a propósito: existen dos registros
 * previos distintos (uno más reciente que otro) sin una confirmación final
 * del negocio sobre cuál está vigente, así que este archivo no declara
 * ningún campo de horario hasta resolver esa ambigüedad.
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
  // Texto visible; mantiene el formato local de lectura.
  whatsapp: '317 790 7408',
  // Mismo número anterior, en formato técnico internacional para el enlace
  // `wa.me` (https://wa.me/<código de país><número sin espacios>).
  whatsappHref: 'https://wa.me/573177907408',
  phone: null,
  email: null,
  instagram: null,
  locations: [
    {
      name: 'Pance',
      city: 'Cali',
      address: 'Cra. 125 #23A-58, Cali, Colombia',
      mapsUrl: null,
      status: 'confirmed',
      notes: null,
    },
    {
      name: 'Juanambú',
      city: 'Cali',
      address: 'Av. 9 Norte #9-31, Cali, Colombia',
      mapsUrl: null,
      status: 'confirmed',
      notes: null,
    },
  ] as ContactLocation[],
  maps: null,
  reservationChannels: [
    { label: 'WhatsApp', href: 'https://wa.me/573177907408', status: 'confirmed' },
  ] as ReservationChannel[],
  statusNotes:
    'Confirmados: WhatsApp (canal principal de reservas) y las direcciones exactas de Pance y Juanambú. Pendientes de confirmar: teléfono independiente, correo, Instagram, enlaces de Google Maps y la versión vigente de los horarios (hay dos registros previos distintos, no se publican hasta que el negocio confirme cuál está vigente).',
} as const
