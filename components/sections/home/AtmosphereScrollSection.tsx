'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

export type AtmosphereTile = {
  /** Pilar/rincón (p. ej. «Café»). */
  label: string
  /** Glosa breve, descriptiva y segura (sin datos inventados). */
  caption: string
  /** Ruta de imagen/video real opcional (cuando exista). */
  image?: string
  video?: string
}

export interface AtmosphereScrollSectionProps {
  eyebrow?: string
  title?: string
  emphasis?: string
  lead?: string
  tiles: AtmosphereTile[]
  closingLead?: string
  closingCta?: { label: string; href: string }
}

function Heading({
  eyebrow,
  title,
  emphasis,
  lead,
}: {
  eyebrow: string
  title: string
  emphasis?: string
  lead?: string
}) {
  return (
    <div className="mx-auto mb-10 w-full max-w-6xl px-6 md:mb-12 md:px-8 lg:px-12">
      <p className="mb-4 font-sans-app text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A227]">
        {eyebrow}
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          className="text-balance font-playfair font-black leading-[0.95] tracking-[-0.03em] text-[#F5F5F0]"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
        >
          {title}
          {emphasis ? <span className="italic text-[#FF7F70]"> {emphasis}</span> : null}
        </h2>
        {lead ? (
          <p className="max-w-xs font-sans-app text-sm leading-relaxed text-[#A6B86B] md:mb-2">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function Tile({
  tile,
  index,
  className = '',
}: {
  tile: AtmosphereTile
  index: number
  className?: string
}) {
  const hasMedia = Boolean(tile.image || tile.video)
  return (
    <div className={`media-frame group relative ${hasMedia ? '' : 'tile'} ${className}`.trim()}>
      {tile.video ? (
        <video className="media-zoom" autoPlay muted loop playsInline src={tile.video} />
      ) : tile.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="media-zoom" src={tile.image} alt={tile.label} />
      ) : null}
      {hasMedia ? <div className="media-scrim" /> : null}
      {!hasMedia ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, #F5F5F0 0px, #F5F5F0 1px, transparent 1px, transparent 26px)',
          }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className="absolute left-6 top-6 font-playfair text-2xl font-black italic leading-none text-[#F5F5F0]/25"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
        <span className="mb-2 font-sans-app text-[9px] font-bold uppercase tracking-[0.35em] text-[#FF7F70]">
          {tile.caption}
        </span>
        <span className="font-playfair text-3xl italic leading-tight text-[#F5F5F0]">
          {tile.label}
        </span>
      </div>
    </div>
  )
}

/**
 * Atmósfera del home — galería de scroll horizontal anclado (pinned): mientras
 * la sección queda fija, el track se desplaza en horizontal según el avance del
 * scroll vertical. Es el dispositivo «Horizontal Scroll Journey» de storytelling
 * inmersivo, resucitado del legado y reescrito autocontenido. Con `reduce`
 * degrada a una cuadrícula vertical accesible. Client Component (único del home
 * junto al hero).
 */
export default function AtmosphereScrollSection({
  eyebrow = 'El ambiente',
  title = 'Un lugar hecho',
  emphasis = 'de rincones.',
  lead = 'Cada rincón tiene su propia luz, su propio silencio.',
  tiles,
  closingLead = 'está por vivirse en persona.',
  closingCta = { label: 'Reservar', href: '/reservas' },
}: AtmosphereScrollSectionProps) {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const targetRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  // x en píxeles, calculado en vivo desde la geometría real cada frame.
  const x = useTransform(scrollY, (v) => {
    const section = targetRef.current
    const track = trackRef.current
    if (!section || !track) return 0
    const absTop = v + section.getBoundingClientRect().top
    const pinDistance = section.offsetHeight - window.innerHeight
    const p = Math.min(Math.max((v - absTop) / pinDistance, 0), 1)
    const overflow = track.scrollWidth - window.innerWidth
    return -p * overflow
  })

  // Fallback accesible: cuadrícula vertical, sin anclaje ni scroll horizontal.
  if (mounted && reduce) {
    return (
      <section className="border-b border-[#4A5728] bg-[#181f0d] py-24 md:py-32">
        <Heading eyebrow={eyebrow} title={title} emphasis={emphasis} lead={lead} />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-8 lg:px-12">
          {tiles.map((tile, i) => (
            <Tile key={tile.label} tile={tile} index={i} className="min-h-[320px]" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={targetRef}
      aria-label="El ambiente de Café Valparaíso"
      className="relative h-[320vh] border-b border-[#4A5728] bg-[#181f0d]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <Heading eyebrow={eyebrow} title={title} emphasis={emphasis} lead={lead} />
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 pl-6 pr-[8vw] will-change-transform md:pl-8 lg:pl-12"
        >
          {tiles.map((tile, i) => (
            <Tile
              key={tile.label}
              tile={tile}
              index={i}
              className="h-[58vh] w-[78vw] shrink-0 sm:w-[52vw] lg:w-[38vw]"
            />
          ))}
          {/* Tarjeta de cierre */}
          <div className="tile flex h-[58vh] w-[78vw] shrink-0 flex-col justify-center p-10 sm:w-[42vw] lg:w-[30vw]">
            <p className="mb-4 font-sans-app text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A227]">
              Y lo mejor
            </p>
            <p className="mb-6 font-playfair text-3xl italic leading-tight text-[#F5F5F0]">
              {closingLead}
            </p>
            <a
              href={closingCta.href}
              className="press font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF7F70] transition-colors hover:text-[#F5F5F0]"
            >
              {closingCta.label} →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
