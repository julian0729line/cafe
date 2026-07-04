/**
 * Navegación pública futura — Café Valparaíso.
 *
 * `items` apunta a rutas del escaparate público que todavía no existen como
 * páginas reales (se crearán en un GOAL posterior). Es válido que hoy no
 * resuelvan: este archivo no se conecta a ningún componente en este GOAL.
 */

export const publicNavigation = {
  brandHref: '/',
  items: [
    { label: 'Inicio', href: '/' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'Menú', href: '/menu' },
    { label: 'Librería', href: '/libreria' },
    { label: 'Espacios', href: '/espacios' },
    { label: 'Contacto', href: '/contacto' },
  ],
  cta: {
    label: 'Reservar',
    href: '/reservas',
  },
} as const
