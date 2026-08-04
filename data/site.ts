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
    'Café Valparaíso reúne cultura, gastronomía, literatura y conversación en Cali, con sus sedes de Pance y Juanambú.',
  // Solo términos que el sitio realmente respalda hoy: al reducirse a cuatro
  // páginas (Inicio, Menú, Espacios, Contacto) se retiraron «agenda cultural»
  // y «librería», que anunciaban secciones que ya no existen. «reservas» sí
  // se mantiene: la reserva por WhatsApp sigue siendo un CTA real del sitio.
  brandKeywords: [
    'café literario',
    'café cultural',
    'cultura',
    'gastronomía',
    'literatura',
    'espacios para eventos',
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
    'Confirmados: marca, ciudad, concepto y sedes (Pance y Juanambú). La Librería La Maga se retiró de la descripción y de las keywords al reducir el sitio a cuatro páginas: ya no tiene sección propia, así que anunciarla sería prometer contenido inexistente. legalName, foundedLabel y siteUrl quedan en null hasta que el negocio confirme razón social, fecha de fundación y dominio real de producción.',
} as const
