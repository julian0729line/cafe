/**
 * Textos estructurados del home — Café Valparaíso.
 *
 * Compone datos de `data/` en la forma que consumirán (en un GOAL
 * posterior) las secciones de `components/sections/home/`. No importa
 * ningún componente: solo datos.
 */

import { siteConfig } from '@/data/site'
import { featuredEvents, eventsConfig } from '@/data/events'
import { menuPreviewItems, menuConfig } from '@/data/menu'
import { libraryCategories, libraryConfig } from '@/data/library'
import { spacesPreview, spacesConfig } from '@/data/spaces'
import { contactConfig } from '@/data/contact'

export const homeContent = {
  hero: {
    eyebrow: 'Café literario · ' + siteConfig.city,
    title: siteConfig.name,
    description: siteConfig.tagline,
    primaryCta: { label: 'Reservar', href: '/reservas' },
    secondaryCta: { label: 'Ver agenda', href: '/agenda' },
    highlights: [
      { label: 'Ciudad', value: siteConfig.city },
      { label: 'Concepto', value: 'Café literario' },
      { label: 'Comunidad', value: 'Activa' },
    ],
  },
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Más que un café',
    description: siteConfig.description,
    features: [
      {
        title: 'Café literario',
        description: 'Un espacio pensado para leer, escribir y conversar sobre una taza de café.',
      },
      {
        title: 'Espacio cultural',
        description: 'Agenda viva de encuentros y actividades para la comunidad.',
      },
      {
        title: 'Gastronomía de autor',
        description: 'Cocina y barra propias, con identidad propia.',
      },
      {
        title: 'Comunidad',
        description: 'Un lugar que se construye con quienes vuelven.',
      },
    ],
  },
  culture: {
    eyebrow: 'Agenda cultural',
    title: 'Cosas que pasan aquí',
    description:
      'Encuentros y actividades culturales; la agenda con fechas reales se publica cuando esté confirmada.',
    events: featuredEvents,
    cta: { label: 'Ver agenda', href: eventsConfig.ctaHref },
  },
  menu: {
    eyebrow: 'Lo que servimos',
    title: 'Nuestro menú',
    description: 'Café, cocina y coctelería con identidad propia.',
    items: menuPreviewItems,
    cta: { label: 'Ver menú', href: menuConfig.ctaHref },
  },
  library: {
    eyebrow: 'Librería La Maga',
    title: 'Libros y conversación',
    description: 'Curaduría literaria, clubes de lectura y un rincón para perderse entre libros.',
    categories: libraryCategories,
    cta: { label: 'Ver librería', href: libraryConfig.ctaHref },
  },
  spaces: {
    eyebrow: 'Espacios',
    title: 'Un lugar para cada encuentro',
    description: 'Espacios pensados para reuniones, celebraciones y actividades culturales.',
    spaces: spacesPreview,
    cta: { label: 'Ver espacios', href: spacesConfig.ctaHref },
  },
  reservationCta: {
    eyebrow: 'Te esperamos',
    title: 'Ven a vivir Valparaíso',
    description: 'Reserva tu mesa o escríbenos para resolver cualquier duda antes de tu visita.',
    primaryCta: { label: 'Reservar', href: '/reservas' },
    secondaryCta: {
      label: 'Escríbenos',
      href: contactConfig.reservationChannels[0]?.href ?? '/contacto',
    },
  },
} as const
