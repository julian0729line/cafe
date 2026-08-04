/**
 * Estructura gastronómica — Café Valparaíso.
 *
 * `menuPreviewItems` describe líneas/categorías, no platos con precio: no
 * hay carta ni precios confirmados en el repo todavía.
 */

export const menuCategories = ['Café', 'Cocina', 'Coctelería', 'Postres'] as const

export type MenuCategory = (typeof menuCategories)[number]

export type MenuPreviewLine = {
  title: string
  category: MenuCategory
  description: string | null
}

export const menuPreviewItems: MenuPreviewLine[] = [
  {
    title: 'Cafés de especialidad',
    category: 'Café',
    description: 'Nuestra barra de café, el centro de la experiencia Valparaíso.',
  },
  {
    title: 'Cocina de autor',
    category: 'Cocina',
    description: 'Una propuesta gastronómica con identidad propia.',
  },
  {
    title: 'Coctelería de temporada',
    category: 'Coctelería',
    description: 'Preparaciones que acompañan las tardes y noches culturales.',
  },
  {
    title: 'Postres de la casa',
    category: 'Postres',
    description: 'El cierre dulce para compartir sobre la mesa.',
  },
]

export const menuConfig = {
  ctaHref: '/menu',
  statusNotes:
    'Líneas gastronómicas generales confirmadas (café, cocina, coctelería, postres). Sin precios ni platos específicos confirmados: la carta detallada se conecta cuando el negocio la entregue.',
} as const

/**
 * Destacados de la casa — platos y bebidas con foto real que se muestran como
 * cinemagraphs (galería en /menu). Solo ítems con fotografía real y nombre
 * confirmados por el negocio; nada inventado, sin precios.
 *
 * Cada ítem es «drop-in»: para añadir uno nuevo se generan sus assets en
 * `public/media/{slug}/` (mismo pipeline que Lomo/Tapeo: {slug}-plato-desktop,
 * -mobile, -fondo en AVIF+WebP) y se agrega una entrada aquí. Sin tocar código
 * de componentes.
 *
 * - kind: 'plato' | 'bebida' (etiqueta editorial + encaja layout).
 * - aspect: relación de la baldosa (los platos suelen ser cuadrados; las
 *   bebidas, verticales, p. ej. '4 / 5' o '3 / 4').
 * - origin: transform-origin del push-in (foco de la foto).
 * - luz: intensidad de la respiración de luz (min/max opacidad).
 * - lqip: placeholder incrustado (~22px) para que no parpadee en negro.
 */
export type MenuFeaturedKind = 'plato' | 'bebida' | 'postre'

export type MenuFeaturedItem = {
  slug: string
  kind: MenuFeaturedKind
  nameLead: string
  nameAccent: string
  ingredients: string
  aspect: string
  origin: string
  luz?: { min: number; max: number }
  /**
   * Tope de zoom del push-in en hover. Se mantiene moderado (~1.03) porque las
   * fuentes son de resolución limitada; escalar más delata el upscaling. Se
   * reserva un valor mayor para cuando exista el original en alta resolución.
   */
  scaleMax?: number
  hasMobile?: boolean
  lqip: string
}

const LQIP_LOMO =
  'data:image/webp;base64,UklGRgoBAABXRUJQVlA4IP4AAAAwBgCdASoYABgAPu1srlIppaQiqAgBMB2JaACsBagcYFURHSPVgv6q1ny9flv44vmakEeJXkbyamSAAP5ojTDkNccBSndMbQvKKk95t+t4vNfWPJ47KrpbUzEeEzrPtcCuYvinS1tNh1SzsHUvjO99Z6pqplDPdo8ZbroVcJl4ZR57NGeVVcZJWTpSiHQBHb4wcfkTvKbJz+EWf332XKwEQhl9ZySOiBAoT7Id1Iu6YtE7Jec0lAO75zWuw3XBpTr6KGq2Oci0WWaS+xlmOY3ngm94VGcHHR85bBrkfYIlSfovHi30J01kd5MslOig6lN0LS8Xdx+H/9H69I4AAA=='

const LQIP_TAPEO =
  'data:image/webp;base64,UklGRnYBAABXRUJQVlA4IGoBAACwBgCdASoWABYAPu1ur1IppiQiqAgBMB2JbACdMoR09oBXtoAQyDx5EHl+jFlrdrLssDI7YG2O3nQii/jzgAD5aSTCxF1uJ0yeOGSt/5/x1o0Jo1LQwdzHU29JSN7gJQgjslCVrMFZ2zMp8Vpu2o3LH+52OSfObWHP+hBh5cOzlFpRTL0KYo2arJVzIyzW2aFcI8rF1hZWVhOdYqczH4ig4wop4sI7PbthOEytYI+mFQAZ1jh8kj/iYaLAe/m8m9ZWlOuuOjyqvcafqM4Qfb2XP7XTGQnhI3ZfvKV9X419nwq8s78eyTx7NjXCRJfug+SVabSlr3tgIluSWSCvgpHh/39Lq7ahIplprZvVa2l6V/5KqO4HW9HtvFiZwQRQNshJyPB5YyXY1J4iiZ9731MywowWRrvwOAhui0Kzs5cu+83//YasLNu+R//AVfKwdP0PCgC02tdsl3M32dFXK1okYsPsJGAxCbM0AA=='

const LQIP_CERDO =
  'data:image/webp;base64,UklGRl4BAABXRUJQVlA4IFIBAACQBgCdASoWABYAPu1urlIppiQiqAgBMB2JbACdKKczoxvAxifOlMgSdC/hcDkopLY5PXFzf7F59LYxDNAAAP54Zv4NkyphmPtgtUszK69/MOWKFwni+D2nae57fRSg+Sku02z6uFjqyciUGfT/YLTiC79zM+AejNMjLoZZFNEH7Scsf3q8YcVo54CTDJ7wYPKBdjDW/TmJBsnYY81bzGA7i9Z30+nZGfqjl/pzeQr4lC9krsRIyu8SUkBkiA/QuVo/caNAXmk3z/ZdRMeGOI4nuvcdmNPNcpkrdHvLYWRIFprO1gJfJE+0+3WsSnP80V/z6qwFeuB6uzPNAv+zW7onPX6ZQ5uOJoI564wGVrGV2v+waBfZH6/TZymzh5g2Xu42Ii9yd7ph3mnGLZmtCg5JddtMw0QlMD+T1XD8HvIZFFwV62zyoJZpdflXEA1uKVkAAA=='

const LQIP_TE_CHAI =
  'data:image/webp;base64,UklGRkQBAABXRUJQVlA4IDgBAACQBgCdASoWABYAPu1ur1IppiQiqAgBMB2JaACdMui6gNJfMl8ixCckbdxo7TVxkZFXyZMJKVee8z61UoTAAPzLDjQ9XHaaEA2zkymOhjtFTnIB1k7mIZ62DVe12JH8uOkShQUaBdsd+x16IVnbluib+CuHWz9dQoemC2MzgfSFEnRPy6c/0dmjmHAmU5nP+TCOMYSwOSU4hram/9AtKSEhU6y/omtCstA9dl2fsrwM4/DkDvyhzidP2ZesOzYekdeiygEJ7mz+RkTbdzMKk10Ys+oOgIT/WfCb9Wk0DRIPyjbbxS5m0CItb68aiA00K3YLARCjjn/NX/vQUbDU81cH/Bvd7B6GqTznp4Nji9kfqtciMQIicG/Wcy/BFGEmG6ep7gXEUIkkJ6Q1xeU3RlEjhJ/RpNvAAAA='

const LQIP_CAPU =
  'data:image/webp;base64,UklGRh4BAABXRUJQVlA4IBIBAAAQBgCdASoWABYAPu1oqVAppaOiqA1RMB2JaACdMoMw7RmHkuFpW2jLeiJSOGNOxBMD5qN3ATlCGoAA9oWHbjxW9hCYKx9Pr214iK5L4sZ45KwN3c7ULYHt6OdbgytvlMbLzRzwT5bH7mZbbh5w/csZZaNT8YD3aDMclQipIReMRFgwZD8PaX9TI2xy20uPr4NJYXocCGjpd6On4fd5Wl7E8R4F5xX02Qi9iOixtgtJRS+r9AHzzeT9rbbcE/CvnBXROe9RVkjdHytre1Wx+ajq9brVX8G5PS1fdGto+IymcLVvF8zPOwdu1hu1hfjVmx101GkiIrBnw0Nyu1aO0ISiAJRmBJYlEaYGvUajaI12AAAA'

const LQIP_BLANCA =
  'data:image/webp;base64,UklGRlQBAABXRUJQVlA4IEgBAACwBQCdASoWABYAPu1mqk8ppaOiKA1RMB2JbACdLwArgPbkMxiHPsbi6v8nfy1oUf6oOjwPvgAA/sBeuaDq67ZjN7EKpwXr+MdmlUS8wk+AnuvTU+mRvpFVqqXSiIwyY72SdMOo0aBoFsYqxWLLtb0sktcVwg6ENgW0ecLgSau5WVM17rcNnCNIdGXI98jOr4w1wsWBx/UQisqBRllGaQomtm/deqlPCn/To4HuJGpJm/+q9McxmMegSJZsDrkXugo9nRU2bs8PDF9CiB8EOwnh1rFDS2IA6IDLTvhoqRcwYv38cD9F5Xzy1Oeak1ZW9Ugvz7hK2RTUH9sxJOcH3lhu2EdQwBQac/L8/cQY8Zy/sqlVSiUnwomnjlwP9Cjzy2WPeav5TaNqEm9gnoLj+i4OyqWa99e2fCIP0W6xrbvYuR8vYDMFgAAA'

export const menuFeatured: MenuFeaturedItem[] = [
  {
    slug: 'lomo',
    kind: 'plato',
    nameLead: 'Lomo',
    nameAccent: 'Bestiario',
    ingredients: 'Pasta · hongos · cebolla crocante',
    aspect: '1 / 1',
    origin: '51% 60%',
    luz: { min: 0.08, max: 0.18 },
    scaleMax: 1.03,
    hasMobile: true,
    lqip: LQIP_LOMO,
  },
  {
    slug: 'tapeo',
    kind: 'plato',
    nameLead: 'Tapeo',
    nameAccent: 'Cortázar',
    ingredients: 'Pan dorado · jamón curado · rúgula · almendra · glaseado',
    aspect: '1 / 1',
    origin: '50% 46%',
    luz: { min: 0.1, max: 0.2 },
    scaleMax: 1.03,
    hasMobile: true,
    lqip: LQIP_TAPEO,
  },
  {
    slug: 'cerdo',
    kind: 'plato',
    nameLead: 'Costillas',
    nameAccent: 'BBQ',
    ingredients: 'Papas criollas · ajonjolí · cebollín · salsa verde',
    aspect: '1 / 1',
    origin: '48% 56%',
    luz: { min: 0.08, max: 0.18 },
    scaleMax: 1.03,
    hasMobile: true,
    lqip: LQIP_CERDO,
  },
  {
    slug: 'te-chai',
    kind: 'bebida',
    nameLead: 'Te',
    nameAccent: 'Chai',
    ingredients: 'Especias · panela · leche artesanal',
    aspect: '1 / 1',
    origin: '50% 42%',
    luz: { min: 0.1, max: 0.2 },
    hasMobile: true,
    lqip: LQIP_TE_CHAI,
  },
  {
    slug: 'capuccino-licor',
    kind: 'bebida',
    nameLead: 'Capuccino',
    nameAccent: 'con Licor',
    ingredients: 'Espresso · leche · licor Amaretto',
    aspect: '1 / 1',
    origin: '50% 45%',
    luz: { min: 0.1, max: 0.2 },
    hasMobile: true,
    lqip: LQIP_CAPU,
  },
  {
    slug: 'blanca-mujer',
    kind: 'postre',
    nameLead: 'Blanca',
    nameAccent: 'Mujer',
    ingredients: 'Guanábana · agraz · salsa de berries · romero',
    aspect: '1 / 1',
    origin: '50% 40%',
    luz: { min: 0.08, max: 0.18 },
    hasMobile: true,
    lqip: LQIP_BLANCA,
  },
]
