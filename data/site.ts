/**
 * Configuración general de marca — Café Valparaíso.
 *
 * Datos genéricos y seguros (nombre, ciudad, concepto). Cualquier dato
 * comercial exacto no confirmado en el repo queda en `null` o con una nota
 * en `statusNotes`, nunca inventado.
 */

export const siteConfig = {
  name: 'Café Valparaíso',
  shortName: 'Valparaíso',
  legalName: null,
  city: 'Cali',
  country: 'Colombia',
  concept: 'Café literario, cultural, artístico y gastronómico',
  tagline: 'Café literario, cultura y gastronomía en Cali',
  description:
    'Café Valparaíso reúne cultura, gastronomía, literatura y conversación en Cali, con sus sedes de Pance y Juanambú y la Librería La Maga.',
  brandKeywords: [
    'café literario',
    'café cultural',
    'cultura',
    'gastronomía',
    'literatura',
    'agenda cultural',
    'librería',
    'reservas',
    'Cali',
    'Pance',
    'Juanambú',
  ],
  foundedLabel: null,
  siteUrl: null,
  locale: 'es_CO',
  defaultLocale: 'es_CO',
  seo: {
    title: 'Café Valparaíso — Café literario y cultural en Cali',
    description:
      'Café Valparaíso reúne cultura, gastronomía, literatura y conversación en Cali, Colombia, con sus sedes de Pance y Juanambú.',
    titleTemplate: '%s | Café Valparaíso',
    defaultTitle: 'Café Valparaíso',
  },
  statusNotes:
    'Confirmados en Fase 1: marca, ciudad, concepto, sedes (Pance y Juanambú) y Librería La Maga. legalName, foundedLabel y siteUrl quedan en null hasta que el negocio confirme razón social, fecha de fundación y dominio real de producción.',
} as const
