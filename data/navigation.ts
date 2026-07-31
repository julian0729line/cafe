/**
 * Navegación pública — Café Valparaíso.
 *
 * Cuatro páginas a propósito: Inicio, Menú, Espacios y Contacto. Agenda,
 * Librería y Reservas se retiraron del sitio — la reserva real siempre fue
 * por WhatsApp, nunca un formulario propio, así que el CTA de "Reservar"
 * apunta directo allá en vez de a una página intermedia.
 */

import { contactConfig } from '@/data/contact'

export const publicNavigation = {
  brandHref: '/',
  items: [
    { label: 'Inicio', href: '/' },
    { label: 'Menú', href: '/menu' },
    { label: 'Espacios', href: '/espacios' },
    { label: 'Contacto', href: '/contacto' },
  ],
  cta: {
    label: 'Reservar',
    href: contactConfig.whatsappHref,
    external: true,
  },
} as const
