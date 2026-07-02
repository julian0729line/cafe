'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { MediaSlot } from './MediaSlot'

type Tile = { eyebrow: string; label: string; video?: string; image?: string }

function Heading() {
  return (
    <div className="px-8 mb-8 md:mb-10 max-w-6xl mx-auto w-full">
      <p className="font-sans-app text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9A227] mb-4">
        El ambiente
      </p>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <h2 className="text-balance font-playfair font-black text-5xl md:text-6xl text-[#F5F5F0] leading-[1.02]">
          Un lugar hecho<br />
          <span className="italic">de rincones.</span>
        </h2>
        <p className="font-sans-app text-[#A6B86B] text-sm leading-relaxed max-w-xs md:mb-2">
          Cada rincón tiene su propia luz, su propio silencio.
        </p>
      </div>
    </div>
  )
}

export function AmbienteScroll({ items }: { items: Tile[] }) {
  const reduce = useReducedMotion()
  // El primer render (servidor + primer cliente) usa siempre la versión anclada
  // para coincidir en hidratación; el fallback a cuadrícula (reduced-motion)
  // se aplica tras montar. rAF evita setState síncrono en el efecto.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const targetRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  // x en píxeles, calculado en vivo desde la geometría real cada frame:
  // p = avance dentro del tramo anclado (0→1), x = -p * (sobra horizontal).
  // Robusto y auto-ajustable a cualquier viewport, sin depender de offsets.
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
      <section id="ambiente" className="px-8 py-28 border-b border-[#4A5728] scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Heading />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((t) => (
              <MediaSlot key={t.label} eyebrow={t.eyebrow} label={t.label} video={t.video} image={t.image} className="rounded-[1.25rem] min-h-[300px]" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="ambiente" ref={targetRef} className="relative h-[300vh] border-b border-[#4A5728] scroll-mt-24">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-16">
        <Heading />
        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 pl-8 pr-[8vw] will-change-transform">
          {items.map((t) => (
            <MediaSlot
              key={t.label}
              eyebrow={t.eyebrow}
              label={t.label}
              video={t.video}
              image={t.image}
              className="w-[78vw] sm:w-[52vw] lg:w-[38vw] h-[58vh] shrink-0 rounded-[1.5rem]"
            />
          ))}
          {/* Tarjeta de cierre */}
          <div className="w-[78vw] sm:w-[42vw] lg:w-[30vw] h-[58vh] shrink-0 rounded-[1.5rem] tile flex flex-col justify-center p-10">
            <p className="font-sans-app text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9A227] mb-4">Y lo mejor</p>
            <p className="font-playfair italic text-[#F5F5F0] text-3xl leading-tight mb-6">
              está por vivirse en persona.
            </p>
            <a href="#ubicacion" className="press font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#FF7F70] hover:text-[#F5F5F0] transition-colors">
              Cómo llegar →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
