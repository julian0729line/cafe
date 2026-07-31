/**
 * Textos del home compacto — Café Valparaíso.
 *
 * Arquitectura de cuatro momentos: Hero → Universo (Menú, Espacios) →
 * Atmósfera → Cierre de reserva. Texto mínimo: el Home orienta y da acceso;
 * las páginas internas explican. Solo datos confirmados; sin fechas, precios,
 * direcciones, aforos ni artistas inventados. No importa ningún componente.
 *
 * El sitio quedó reducido a cuatro páginas (Home, Menú, Espacios, Contacto):
 * Agenda y Librería La Maga se retiraron, y Reservas se reemplazó por el
 * canal real (WhatsApp) en cada CTA de "Reservar".
 */

import { siteConfig } from '@/data/site'
import { menuConfig } from '@/data/menu'
import { spacesConfig } from '@/data/spaces'
import { contactConfig } from '@/data/contact'

export const homeContent = {
  // 1 · HERO — se entiende en cinco segundos. Nombre + una línea + dos accesos.
  hero: {
    title: siteConfig.name,
    titleLead: 'Café',
    titleAccent: 'Valparaíso',
    tagline: 'Café, cocina y cultura en Cali.',
    primaryCta: { label: 'Reservar', href: contactConfig.whatsappHref, external: true },
    secondaryCta: { label: 'Ver menú', href: menuConfig.ctaHref },
    videoSrc: '/media/valparaiso-home.mp4',
    // Poster aplazado (sin archivo real): el hero degrada con el fondo editorial
    // de reserva. Ver docs/HERO_VIDEO_REAL.md.
    posterSrc: undefined as string | undefined,
  },

  // 2 · UNIVERSO VALPARAÍSO — dos accesos en una sola composición. Misma
  // gramática (nombre protagonista + una línea + acceso), distinta escala y
  // superficie por pieza.
  universe: {
    eyebrow: 'Universo Valparaíso',
    menu: {
      piece: '01',
      name: 'Menú',
      // Plato insignia (cinemagraph). Nombre e ingredientes confirmados por el
      // negocio; van como texto real en el DOM. La carta completa vive en /menu.
      dishLead: 'Lomo',
      dishAccent: 'Bestiario',
      ingredients: 'Pasta · hongos · cebolla crocante',
      cta: { label: 'Ver menú', href: menuConfig.ctaHref },
    },
    spaces: {
      piece: '02',
      name: 'Espacios',
      sedes: spacesConfig.sedes, // ['Pance', 'Juanambú']
      line: 'Dos sedes para encontrarnos.',
      cta: { label: 'Ver espacios', href: spacesConfig.ctaHref },
    },
  },

  // 3 · ATMÓSFERA — la respiración de la mitad del recorrido, ahora con un
  // protagonista propio: «Tapeo Cortázar», una entrada real de la casa, como
  // cinemagraph que emerge de la oscuridad. Escena distinta a la del Lomo, así
  // que nunca compiten en el mismo viewport. Nombre e ingredientes confirmados,
  // van como texto real en el DOM. Sin CTA (sigue siendo un respiro, no un
  // acceso): la carta completa vive en /menu.
  atmosphere: {
    kicker: 'Entrada de la casa',
    dishLead: 'Tapeo',
    dishAccent: 'Cortázar',
    ingredients: 'Pan dorado · jamón curado · rúgula · almendra · glaseado',
    microphrase: 'Nos vemos adentro',
  },

  // 4 · CIERRE — el único gran momento rojo, corto. Sin párrafo ni ghost word.
  reservationCta: {
    title: 'Conversemos sobre tu próxima reserva.',
    primaryCta: { label: 'Reservar por WhatsApp', href: contactConfig.whatsappHref, external: true },
    // «Contacto» vive en el navbar y el footer; no se duplica aquí para
    // respetar el presupuesto de accesos del Home.
  },

  // Microfrases flotantes del recorrido (decorativas, aria-hidden). Se retira
  // la del universo: cuando el cinemagraph del plato está visible, nada más
  // compite con él en ese viewport.
  microphrases: {
    hero: 'Café de por medio',
  },
} as const
