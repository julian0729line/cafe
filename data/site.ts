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
  concept: 'Café literario, cultural y gastronómico',
  tagline: 'Cultura, gastronomía y literatura en Cali',
  description:
    'Un espacio que reúne café, cocina, agenda cultural y literatura en un mismo lugar.',
  brandKeywords: [
    'café literario',
    'café cultural',
    'Cali',
    'gastronomía',
    'librería',
    'agenda cultural',
  ],
  foundedLabel: null,
  seo: {
    title: 'Café Valparaíso — Café literario y cultural en Cali',
    description:
      'Café Valparaíso reúne cultura, gastronomía y literatura en un mismo espacio en Cali, Colombia.',
  },
  statusNotes:
    'Nombre, ciudad y concepto son datos genéricos de trabajo. legalName y foundedLabel quedan en null hasta que el negocio los confirme.',
} as const
