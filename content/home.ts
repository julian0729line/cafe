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

  // 2 · LA CARTA EN MOVIMIENTO — el único momento experimental del Home. Una
  // sola caja visual y los platos cruzándose con el scroll: una misma mesa
  // presentando distintos momentos, no cinco tarjetas. Nombres e ingredientes
  // confirmados por el negocio (`data/menu.ts`); sin precios, que no están
  // confirmados en los datos.
  carta: {
    eyebrow: 'La carta',
    slugs: ['lomo', 'te-chai', 'capuccino-licor', 'blanca-mujer', 'tapeo'] as const,
    cta: { label: 'Ver la carta', href: menuConfig.ctaHref },
  },

  // 3 · UNIVERSO VALPARAÍSO — dos accesos en una sola composición. Misma
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

  // 4 · CIERRE — el único gran momento rojo, corto. Sin párrafo ni ghost word.
  reservationCta: {
    title: 'Conversemos sobre tu próxima reserva.',
    primaryCta: { label: 'Reservar por WhatsApp', href: contactConfig.whatsappHref, external: true },
    // «Contacto» vive en el navbar y el footer; no se duplica aquí para
    // respetar el presupuesto de accesos del Home.
  },

  // Microfrases flotantes del recorrido (decorativas, aria-hidden). Queda una
  // sola: «Nos vemos adentro» vivía en la sección Atmósfera, que se retiró al
  // entrar «La carta en movimiento». El presupuesto de la skill directora
  // permite dos por página, así que hay sitio para una segunda si algún día
  // encuentra un lugar donde no compita con el CTA del cierre.
  microphrases: {
    hero: 'Café de por medio',
  },
} as const
