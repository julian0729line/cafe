import type { CSSProperties } from 'react'
import type { MenuFeaturedItem } from '@/data/menu'

const KIND_LABEL: Record<MenuFeaturedItem['kind'], string> = {
  plato: 'Plato',
  bebida: 'Bebida',
  postre: 'Postre',
}

/**
 * Baldosa-cinemagraph de un destacado (plato, bebida o postre). Fotografía real
 * con la ficha (categoría + nombre binomial + ingredientes) sobre un scrim, para
 * contraste AA. La ilustración está **quieta por defecto** y solo respira cuando
 * la baldosa (`.especimen`) recibe `:hover`/`:focus-within` (ver globals.css):
 * nunca hay más de una en movimiento a la vez, y `prefers-reduced-motion` /
 * táctil quedan estáticos. Dirigida por datos (`menuFeatured`). Sin JavaScript.
 * Server Component.
 */
export default function DishTile({ item }: { item: MenuFeaturedItem }) {
  const base = `/media/${item.slug}/${item.slug}`
  const name = `${item.nameLead} ${item.nameAccent}`

  const style: CSSProperties & Record<string, string | number> = {
    aspectRatio: item.aspect,
    backgroundImage: `url("${item.lqip}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '--especimen-origin': item.origin,
    '--especimen-scale': item.scaleMax ?? 1.03,
    '--especimen-luz-min': item.luz?.min ?? 0.08,
    '--especimen-luz-max': item.luz?.max ?? 0.18,
  }

  return (
    <figure
      className="especimen relative overflow-hidden rounded-[3px] border border-[#181f0d]/10 bg-[#12180a] shadow-[0_30px_70px_-40px_rgba(24,31,13,.55)]"
      style={style}
    >
      {/* Fondo desenfocado (estático) */}
      <picture>
        <source type="image/avif" srcSet={`${base}-fondo.avif`} />
        <img
          src={`${base}-fondo.webp`}
          alt=""
          aria-hidden="true"
          width={240}
          height={240}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Ilustración (respira solo bajo `.especimen:hover`) */}
      <picture>
        {item.hasMobile ? (
          <>
            <source media="(max-width: 767px)" type="image/avif" srcSet={`${base}-plato-mobile.avif`} />
            <source media="(max-width: 767px)" type="image/webp" srcSet={`${base}-plato-mobile.webp`} />
          </>
        ) : null}
        <source type="image/avif" srcSet={`${base}-plato-desktop.avif`} />
        <img
          src={`${base}-plato-desktop.webp`}
          alt={name}
          width={469}
          height={469}
          loading="lazy"
          decoding="async"
          className="especimen-plato absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Respiración de luz (invisible en reposo; entra con el hover) */}
      <span
        aria-hidden="true"
        className="especimen-luz absolute inset-0"
        style={{ background: 'radial-gradient(46% 42% at 50% 46%, rgba(255,214,150,0.95), transparent 72%)' }}
      />

      {/* Grain estático */}
      <span aria-hidden="true" className="grain-soft" />

      {/* Scrim inferior para contraste AA del texto */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.74), rgba(0,0,0,.12) 44%, transparent 64%)' }}
      />

      {/* Ficha */}
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <span className="font-sans-app text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF7F70]">
          {KIND_LABEL[item.kind]}
        </span>
        <span
          className="mt-2 block font-playfair font-black leading-[0.9] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
        >
          <span className="text-[#F5F5F0]">{item.nameLead} </span>
          <span className="italic text-[#FF7F70]">{item.nameAccent}</span>
        </span>
        {item.ingredients ? (
          <span className="mt-2 block font-sans-app text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[#F5F5F0]/80">
            {item.ingredients}
          </span>
        ) : null}
      </figcaption>
    </figure>
  )
}
