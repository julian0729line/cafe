/**
 * Textos del home compacto — Café Valparaíso.
 *
 * Arquitectura de cuatro momentos: Hero → Universo (4 accesos) → Atmósfera →
 * Cierre de reserva. Texto mínimo: el Home orienta y da acceso; las páginas
 * internas explican. Solo datos confirmados; sin fechas, precios, direcciones,
 * aforos ni artistas inventados. No importa ningún componente.
 */

import { siteConfig } from '@/data/site'
import { eventCategories, eventsConfig, featuredEvents } from '@/data/events'
import { menuCategories, menuConfig } from '@/data/menu'
import { libraryConfig } from '@/data/library'
import { spacesConfig } from '@/data/spaces'

// Próximo evento real (si existe). Hoy `featuredEvents` está vacío a propósito:
// no hay eventos confirmados, así que la pieza Agenda no inventa fecha ni
// nombre — muestra el acceso con un descriptor de categorías confirmadas.
const nextEvent = featuredEvents[0] ?? null

export const homeContent = {
  // 1 · HERO — se entiende en cinco segundos. Nombre + una línea + dos accesos.
  hero: {
    title: siteConfig.name,
    titleLead: 'Café',
    titleAccent: 'Valparaíso',
    tagline: 'Café, cocina y cultura en Cali.',
    primaryCta: { label: 'Reservar', href: '/reservas' },
    secondaryCta: { label: 'Ver agenda', href: eventsConfig.ctaHref },
    videoSrc: '/media/valparaiso-home.mp4',
    // Poster aplazado (sin archivo real): el hero degrada con el fondo editorial
    // de reserva. Ver docs/HERO_VIDEO_REAL.md.
    posterSrc: undefined as string | undefined,
  },

  // 2 · UNIVERSO VALPARAÍSO — cuatro accesos en una sola composición. Misma
  // gramática (nombre protagonista + una línea + acceso), distinta escala y
  // superficie por pieza.
  universe: {
    eyebrow: 'Universo Valparaíso',
    menu: {
      piece: '01',
      name: 'Menú',
      tags: [...menuCategories], // Café · Cocina · Coctelería · Postres
      cta: { label: 'Ver menú', href: menuConfig.ctaHref },
    },
    agenda: {
      piece: '02',
      name: 'Agenda',
      // Descriptor de categorías confirmadas (no es un evento inventado).
      line: `${eventCategories[0]}, ${eventCategories[1].toLowerCase()} y ${eventCategories[2].toLowerCase()}.`,
      event: nextEvent, // null mientras no haya evento confirmado
      cta: { label: 'Ver agenda', href: eventsConfig.ctaHref },
    },
    library: {
      piece: '03',
      name: 'Librería La Maga',
      line: 'Para cuando el amor duele o florece.',
      cta: { label: 'Conocer La Maga', href: libraryConfig.ctaHref },
    },
    spaces: {
      piece: '04',
      name: 'Espacios',
      sedes: spacesConfig.sedes, // ['Pance', 'Juanambú']
      line: 'Dos sedes para encontrarnos.',
      cta: { label: 'Ver espacios', href: spacesConfig.ctaHref },
    },
  },

  // 3 · ATMÓSFERA — respiración visual breve (solo CSS, sin segundo video, sin
  // CTA, sin párrafo). Una microfrase.
  atmosphere: {
    microphrase: 'Nos vemos adentro',
  },

  // 4 · CIERRE — el único gran momento rojo, corto. Sin párrafo ni ghost word.
  reservationCta: {
    title: 'Conversemos sobre tu próxima reserva.',
    primaryCta: { label: 'Reservar', href: '/reservas' },
    // «Contacto» vive en el navbar y el footer; no se duplica aquí para
    // respetar el presupuesto de accesos del Home.
  },

  // Microfrases flotantes del recorrido (máx. 3, decorativas, aria-hidden).
  microphrases: {
    hero: 'Café de por medio',
    universe: 'Mesa para quedarse',
  },
} as const
