import type { CSSProperties } from 'react'
import type { MenuFeaturedItem } from '@/data/menu'

/**
 * Foto contenida del número — la ilustración real dentro de su marco editorial
 * (no a sangre, por la resolución disponible). Con `breathe`, respira solo en
 * `:hover`/`:focus-within` de su ancestro `.especimen` (globals.css): un
 * protagonista a la vez. Sin `breathe` (índice «De la barra», fuentes ~355 px)
 * queda estática, para no escalar una fuente pobre. Server Component.
 */
export default function NumeroFoto({
  dish,
  breathe = true,
  className = '',
}: {
  dish: MenuFeaturedItem
  breathe?: boolean
  className?: string
}) {
  const b = `/media/${dish.slug}/${dish.slug}`
  const name = `${dish.nameLead} ${dish.nameAccent}`

  const style: CSSProperties & Record<string, string | number> = {
    aspectRatio: dish.aspect,
    backgroundImage: `url("${dish.lqip}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '--especimen-origin': dish.origin,
    '--especimen-scale': dish.scaleMax ?? 1.03,
    '--especimen-luz-min': dish.luz?.min ?? 0.08,
    '--especimen-luz-max': dish.luz?.max ?? 0.18,
  }

  return (
    <figure
      className={`${breathe ? 'especimen ' : ''}relative overflow-hidden rounded-[3px] border border-[#4A5728]/35 shadow-[0_30px_70px_-34px_rgba(0,0,0,.75)] ${className}`}
      style={style}
    >
      <picture>
        {dish.hasMobile ? (
          <>
            <source media="(max-width: 767px)" type="image/avif" srcSet={`${b}-plato-mobile.avif`} />
            <source media="(max-width: 767px)" type="image/webp" srcSet={`${b}-plato-mobile.webp`} />
          </>
        ) : null}
        <source type="image/avif" srcSet={`${b}-plato-desktop.avif`} />
        <img
          src={`${b}-plato-desktop.webp`}
          alt={name}
          width={469}
          height={469}
          loading="lazy"
          decoding="async"
          className="especimen-plato absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {breathe ? (
        <span
          aria-hidden="true"
          className="especimen-luz absolute inset-0"
          style={{ background: 'radial-gradient(46% 42% at 50% 46%, rgba(255,214,150,0.95), transparent 72%)' }}
        />
      ) : null}

      <span aria-hidden="true" className="grain-soft" />
    </figure>
  )
}
