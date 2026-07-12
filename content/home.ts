/**
 * Textos estructurados del home — Café Valparaíso.
 *
 * Compone datos de `data/` en la forma que consumen las secciones de
 * `components/sections/home/`. No importa ningún componente: solo datos.
 * Todo el contenido es confirmado o descriptivo/seguro: no hay fechas,
 * precios, direcciones, aforos ni artistas inventados.
 */

import { siteConfig } from '@/data/site'
import { eventCategories, eventsConfig } from '@/data/events'
import { menuPreviewItems, menuConfig } from '@/data/menu'
import { libraryCategories, libraryConfig } from '@/data/library'
import { spacesPreview, spacesConfig } from '@/data/spaces'

// Descripciones editoriales seguras para cada línea de la agenda. Las
// categorías vienen de `data/events.ts`; aquí solo se les da una glosa breve
// (sin fechas, artistas ni precios).
const AGENDA_GLOSSES: Record<(typeof eventCategories)[number], string> = {
  'Clubes de lectura': 'Encuentros alrededor de un libro, con la Librería La Maga.',
  'Música en vivo': 'Sesiones acústicas entre conversaciones y café.',
  Conversaciones: 'Charlas con autores, artistas y voces de la ciudad.',
  'Arte y cultura': 'Talleres, lecturas y actividades culturales.',
}

const agendaLines = eventCategories.map((category, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: category,
  description: AGENDA_GLOSSES[category],
  status: 'Programación próxima',
}))

export const homeContent = {
  hero: {
    eyebrow: siteConfig.concept, // «Café literario, cultural, artístico y gastronómico»
    // El h1 es un único string; la sección lo compone visualmente en dos líneas.
    title: siteConfig.name,
    titleLead: 'Café',
    titleAccent: 'Valparaíso',
    description: 'Un lugar para leer, conversar y comer. Sedes en Pance y Juanambú, en Cali.',
    topLeftLabel: 'Café · Cultura · Cocina',
    topRightLabel: `${siteConfig.city}, ${siteConfig.country}`,
    primaryCta: { label: 'Reservar', href: '/reservas' },
    secondaryCta: { label: 'Ver agenda', href: '/agenda' },
    highlights: [
      { label: 'Ciudad', value: siteConfig.city },
      { label: 'Sedes', value: 'Pance y Juanambú' },
      { label: 'Librería', value: 'La Maga' },
    ],
  },
  about: {
    index: '01',
    eyebrow: 'Qué es Café Valparaíso',
    title: 'Más que un café,',
    emphasis: 'un lugar de encuentro.',
    lead: siteConfig.description,
    body: 'Aquí el café, los libros y la conversación comparten la misma mesa: gastronomía sin prisa, encuentros que cambian con las semanas y una comunidad que vuelve.',
    aside: 'La cultura no es un evento aparte: es parte de la mesa.',
    keywords: [
      'Literatura',
      'Café',
      'Cocina',
      'Arte',
      'Música',
      'Conversaciones',
      'Comunidad',
      'Cali',
      'Pance y Juanambú',
    ],
  },
  culture: {
    index: '02',
    eyebrow: 'Agenda cultural',
    title: 'Cosas que pasan',
    emphasis: 'cuando la voz se comparte.',
    description:
      'Programación cultural en construcción; publicamos las fechas cuando estén confirmadas.',
    lines: agendaLines,
    cta: { label: 'Ver agenda', href: eventsConfig.ctaHref },
  },
  menu: {
    index: '03',
    eyebrow: 'Gastronomía',
    title: 'Toda buena lectura',
    emphasis: 'pide su bebida.',
    items: menuPreviewItems,
    note: 'La carta con precios se comparte en la mesa.',
    cta: { label: 'Ver menú', href: menuConfig.ctaHref },
  },
  library: {
    index: '04',
    eyebrow: libraryConfig.name, // «Librería La Maga»
    title: 'Un estante que',
    emphasis: 'conversa con la carta.',
    description:
      'Curaduría literaria hecha a mano y clubes de lectura que empiezan con un café servido. Aquí los libros no solo se leen: se conversan.',
    categories: libraryCategories,
    mediaLabel: libraryConfig.name,
    cta: { label: 'Conocer Librería La Maga', href: libraryConfig.ctaHref },
  },
  spaces: {
    index: '05',
    eyebrow: 'Espacios y reservas',
    title: 'Salas y rincones',
    emphasis: 'para reunir gente.',
    description:
      'Encuentros, celebraciones, reuniones y actividades culturales en nuestras sedes de Pance y Juanambú.',
    sedes: spacesConfig.sedes,
    kinds: spacesPreview.map((space) => space.title),
    note: 'Aforos y tarifas, pendientes de confirmar.',
    primaryCta: { label: 'Ver espacios', href: spacesConfig.ctaHref },
    secondaryCta: { label: 'Reservar', href: '/reservas' },
  },
  reservationCta: {
    eyebrow: 'Planea tu visita',
    title: 'Conversemos sobre tu próxima reserva.',
    description:
      'Escríbenos para tu reserva, tu evento o tu próxima lectura. Te esperamos en Pance y Juanambú.',
    primaryCta: { label: 'Reservar', href: '/reservas' },
    secondaryCta: { label: 'Contacto', href: '/contacto' },
  },
} as const
