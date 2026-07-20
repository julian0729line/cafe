'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'motion/react'
import { MagneticButton } from './MagneticButton'

// Cuando tengas el video de fondo, súbelo a public/media/ y pon la ruta aquí,
// p. ej. '/media/hero.mp4'. Mientras sea null, se usa el fondo animado.
const HERO_VIDEO: string | null = null
const HERO_POSTER: string | undefined = undefined

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 220])
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90])
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12])

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-end pb-16 px-8 pt-28 overflow-hidden vignette noise"
    >
      {/* ── Fondo cinematográfico (video o auroras animadas) ── */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
        {HERO_VIDEO ? (
          <video
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.35) contrast(1.05) brightness(0.6)' }}
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
            src={HERO_VIDEO}
          />
        ) : (
          <div className="aurora">
            <div
              className="aurora-blob"
              style={{
                top: '-10%',
                left: '-5%',
                width: '55vw',
                height: '55vw',
                background:
                  'radial-gradient(circle, rgba(180,132,58,0.55), transparent 65%)',
              }}
            />
            <div
              className="aurora-blob b2"
              style={{
                bottom: '-15%',
                right: '-8%',
                width: '50vw',
                height: '50vw',
                background:
                  'radial-gradient(circle, rgba(193,18,31,0.42), transparent 65%)',
              }}
            />
            <div
              className="aurora-blob b3"
              style={{
                top: '20%',
                right: '15%',
                width: '40vw',
                height: '40vw',
                background:
                  'radial-gradient(circle, rgba(138,154,82,0.5), transparent 65%)',
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Rejilla y scrim para legibilidad */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 72px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 72px)',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#343E1C] via-[#343E1C]/40 to-[#343E1C]/70" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Número 16 — ancla de patrimonio con parallax */}
        <motion.div
          style={{ y: ghostY, opacity: ghostOpacity }}
          className="relative select-none pointer-events-none mb-[-1.5rem] md:mb-[-3rem]"
        >
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair font-black text-[15vw] leading-none text-[#F5F5F0]/[0.08] block"
          >
            16
          </motion.span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.p
            variants={item}
            className="font-sans-app text-[10px] font-bold tracking-[0.4em] uppercase text-[#C9A227] mb-4"
          >
            Café Literario · Desde 2008
          </motion.p>

          <motion.h1
            variants={item}
            className="font-playfair font-black leading-[0.9] tracking-tight text-[#F5F5F0] mb-1"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }}
          >
            Café, libros
          </motion.h1>
          <motion.h1
            variants={item}
            className="font-sans-app font-black leading-[0.9] tracking-tighter text-[#F5F5F0] uppercase mb-6"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }}
          >
            y un lugar<span className="text-[#FF7F70]"> para ti.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-playfair italic text-[#D9DCC4] text-lg md:text-xl max-w-lg leading-relaxed mb-8"
          >
            Un espacio donde cada taza cuenta una historia y cada página abre un mundo.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-5">
            <MagneticButton
              href="#ubicacion"
              className="press btn-fill group font-sans-app text-[11px] font-black tracking-[0.3em] uppercase text-[#343E1C] bg-[#F5F5F0] border-2 border-[#F5F5F0] px-8 py-4 inline-flex items-center gap-3 shadow-[5px_5px_0px_0px_#C1121F]"
            >
              <span>Cómo llegar</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
            <a
              href="#ambiente"
              className="press font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors border-b border-transparent hover:border-[#F5F5F0]/30 pb-0.5"
            >
              Ver el ambiente
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
