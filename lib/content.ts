/**
 * Todo el copy de la landing. Se edita aquí, nunca en los componentes.
 *
 * Los campos `Por confirmar` esperan datos reales del cliente. Se dejan a la
 * vista a propósito: inventar una dirección o un horario es peor que admitir
 * que falta, porque un horario falso manda gente a una puerta cerrada.
 */

export const site = {
  name: 'Café Valparaíso',
  city: 'Cali',
  country: 'CO',
  tagline: 'Ven por un café, quédate por lo que pasa alrededor.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '',
}

/**
 * Enlace a WhatsApp con el mensaje ya escrito.
 *
 * El texto no es decoración: es el único registro fiable de conversión que
 * este negocio puede tener. La analítica pierde el rastro en cuanto la persona
 * salta a la app, así que si cada botón genera un mensaje auto-identificable
 * («quiero reservar en Pance»), la bandeja de WhatsApp queda legible por un
 * humano y se puede contar por sede y por origen sin ningún dashboard.
 *
 * Sin `NEXT_PUBLIC_WHATSAPP` configurado, el enlace cae a `#visitanos`, que es
 * donde están los datos de contacto. Así la página funciona entera sin env.
 */
export const waLink = (message: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
    : '#visitanos'

export const wa = {
  general: 'Hola Café Valparaíso, quiero reservar una mesa.',
  pance: 'Hola Café Valparaíso, quiero reservar una mesa en la sede Pance.',
  juanambu: 'Hola Café Valparaíso, quiero reservar una mesa en la sede Juanambú.',
  evento: 'Hola Café Valparaíso, quiero cotizar un espacio para un evento.',
  actividad: 'Hola Café Valparaíso, quiero proponer una actividad cultural con La Maga.',
} as const

export const nav = [
  { label: 'Qué es', href: '#concepto' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Carta', href: '#carta' },
  { label: 'La Maga', href: '#libreria' },
  { label: 'Visítanos', href: '#visitanos' },
] as const

export const hero = {
  sticker: 'Café literario en Cali',
  titleLine1: 'Café',
  titleLine2: 'Valparaíso',
  lead: 'Ven por un café, quédate por lo que pasa alrededor:',
  leadBold: 'libros, música, conversación y cocina de autor.',
  ctaPrimary: 'Reservar mesa',
  ctaSecondary: 'Ver agenda',
  handNote: '← empieza por aquí',
  pills: ['Sede Pance', 'Sede Juanambú', 'Librería La Maga'],
  videoSticker: 'Café · Cultura · Cocina',
  videoNote: 'Dos sedes en Cali',
  video: { src: '/hero.mp4', webm: '/hero.webm', poster: '/hero-poster.jpg' },
}

export const ticker = [
  'Café literario',
  'Cultura viva',
  'Cocina de autor',
  'Librería La Maga',
  'Pance',
  'Juanambú',
  'Cali',
] as const

export const infoRapida = [
  { title: '¿Dónde?', text: 'Pance y Juanambú, en Cali.', cta: 'Cómo llegar', href: '#visitanos', tone: 'cream' },
  { title: '¿Qué hay?', text: 'Café, cocina, coctelería, libros y agenda cultural.', cta: 'Ver la carta', href: '#carta', tone: 'tint' },
  { title: '¿Un evento?', text: 'Salas y rincones para reuniones y celebraciones.', cta: 'Cotizar espacio', href: waLink(wa.evento), tone: 'cream' },
] as const

export const concepto = {
  kicker: 'El concepto',
  title: 'Un café donde la conversación vale',
  titleAccent: 'tanto como la carta.',
  text: 'La cultura no es un evento aparte: es parte de la mesa. Dos sedes en Cali y una librería propia, La Maga.',
  pilares: [
    { title: 'Leer', text: 'Una librería propia, La Maga, y clubes de lectura abiertos a quien llegue.', tone: 'cream' },
    { title: 'Conversar', text: 'Charlas, música en vivo y encuentros que cambian cada semana.', tone: 'red' },
    { title: 'Comer', text: 'Café de especialidad, cocina de temporada y coctelería de autor.', tone: 'ink' },
  ],
} as const

export const agenda = {
  kicker: 'Agenda cultural',
  title: 'Cada semana,',
  titleAccent: 'algo pasa en la mesa.',
  handNote: '¡programación muy pronto!',
  items: [
    { title: 'Clubes de lectura', text: 'Encuentros alrededor de un libro, con Librería La Maga.' },
    { title: 'Música en vivo', text: 'Sesiones acústicas entre los estantes.' },
    { title: 'Conversaciones', text: 'Charlas con autores, artistas y voces de la ciudad.' },
    { title: 'Talleres', text: 'Escritura, arte y oficios, con cupos limitados.' },
  ],
  newsletter: {
    title: 'Recibe la agenda',
    titleMark: 'antes que nadie.',
    text: 'Un correo cuando publiquemos los encuentros del mes. Nada más.',
    placeholder: 'tu@correo.com',
    cta: 'Suscribirme',
    success: '¡Listo! Te escribiremos pronto.',
    error: 'No pudimos registrarte. Intenta de nuevo.',
  },
} as const

export const carta = {
  kicker: 'Gastronomía',
  title: 'Toda buena lectura',
  titleAccent: 'pide su bebida.',
  text: 'Cocina sin prisa, pensada para quedarse. Carta completa con precios en cada sede.',
  handNote: 'el café, siempre recién molido.', // VALIDAR con el cliente
  cta: 'Reservar mesa',
  items: [
    { title: 'Café', text: 'De especialidad, servido con calma.' },
    { title: 'Cocina', text: 'De temporada, para acompañar la lectura.' },
    { title: 'Coctelería', text: 'De autor, para las tardes largas.' },
    { title: 'Postres', text: 'Repostería de la casa.' },
  ],
} as const

export const libreria = {
  kicker: 'Librería La Maga',
  title: 'Un estante que',
  titleAccent: 'conversa con la carta.',
  text: 'Curaduría literaria hecha a mano y clubes de lectura que empiezan con un café servido. Aquí los libros no solo se venden: se conversan.',
  handNote: '↑ nuestra librería, La Maga',
  cta: 'Proponer una actividad',
  image: { src: '/la-maga.jpg', alt: 'Estantes de la Librería La Maga en Café Valparaíso' },
} as const

export const visitanos = {
  kicker: 'Visítanos',
  title: 'Dos sedes,',
  titleAccent: 'una misma mesa.',
  sedes: [
    { name: 'Pance', address: 'Por confirmar', hours: 'Por confirmar', mapsUrl: '', waMessage: wa.pance },
    { name: 'Juanambú', address: 'Por confirmar', hours: 'Por confirmar', mapsUrl: '', waMessage: wa.juanambu },
  ],
  canales: [
    { label: 'WhatsApp', value: 'Por confirmar' },
    { label: 'Teléfono', value: 'Por confirmar' },
    { label: 'Correo', value: 'Por confirmar' },
    { label: 'Instagram', value: 'Por confirmar' },
  ],
} as const

export const footer = {
  line: 'Café literario, cultural y gastronómico · Cali · Pance y Juanambú',
  quote: '«Ven por un café, quédate por lo que pasa alrededor.»',
} as const
