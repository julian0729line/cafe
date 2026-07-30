/**
 * «La Carta, Nº 01» — el número de revista de /menu. Composición editorial
 * (no un map uniforme): portada + capítulos que alternan foto↔texto, y el
 * índice «De la barra». Las fotos y sus parámetros visuales (origin, escala,
 * lqip) viven en `menuFeatured`; aquí se referencian por slug y se les añade la
 * copia del número. Solo datos confirmados; sin precios (la carta y sus precios
 * se comparten en la mesa).
 */
import { menuFeatured, type MenuFeaturedItem } from '@/data/menu'

const bySlug = (slug: string): MenuFeaturedItem => {
  const item = menuFeatured.find((i) => i.slug === slug)
  if (!item) throw new Error(`menuNumero: falta el ítem «${slug}» en menuFeatured`)
  return item
}

export type CapituloTexto = {
  tipo: 'texto'
  numeral: string
  eyebrow: string
  variant?: 'marfil' | 'vino'
  fraseLead: string
  fraseAccent?: string
  desc: string
}

export type CapituloFoto = {
  tipo: 'foto'
  numeral: string
  eyebrow: string
  lado: 'izq' | 'der'
  dish: MenuFeaturedItem
  firma: string
}

export type Capitulo = CapituloTexto | CapituloFoto

export const menuNumero = {
  masthead: { titulo: 'La Carta', numero: 'Nº 01 · Cali · 2026' },

  portada: {
    eyebrow: 'Portada · Plato de la casa',
    dish: bySlug('lomo'),
    sub: 'El plato con el que se entiende la cocina. El que abre el número.',
  },

  capitulos: [
    {
      tipo: 'texto',
      numeral: 'I',
      eyebrow: 'Capítulo I · Café',
      fraseLead: 'El café es el centro. La barra abre temprano y no tiene prisa.',
      desc: 'Grano de origen, métodos de filtrado y espresso. La conversación viene incluida.',
    },
    {
      tipo: 'foto',
      numeral: 'II',
      eyebrow: 'Capítulo II · Cocina',
      lado: 'izq',
      dish: bySlug('tapeo'),
      firma: 'Tostada abierta, para compartir.',
    },
    {
      tipo: 'texto',
      numeral: 'III',
      eyebrow: 'Capítulo III',
      variant: 'vino',
      fraseLead: 'y ',
      fraseAccent: 'mucho más',
      desc: 'La carta entera —y sus precios— se descubren en la mesa. Aquí va solo el abrebocas.',
    },
    {
      tipo: 'foto',
      numeral: 'IV',
      eyebrow: 'Capítulo IV · A la parrilla',
      lado: 'der',
      dish: bySlug('cerdo'),
      firma: 'Glaseadas, para quedarse.',
    },
  ] as Capitulo[],

  barra: {
    eyebrow: 'De la barra',
    dishes: [bySlug('te-chai'), bySlug('capuccino-licor'), bySlug('blanca-mujer')],
  },
}
