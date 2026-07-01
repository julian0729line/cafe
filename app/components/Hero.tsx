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

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
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

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-end pb-16 px-8 pt-28 noise overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 72px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 72px)',
        }}
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Número 16 — ancla visual con parallax */}
        <motion.div
          style={{ y: ghostY, opacity: ghostOpacity }}
          className="relative select-none pointer-events-none mb-[-1.5rem] md:mb-[-3rem]"
        >
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair font-black text-[15vw] leading-none text-[#F5F5F0]/[0.07] block"
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
            className="font-sans-app text-[10px] font-bold tracking-[0.4em] uppercase text-[#A6B86B] mb-4"
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
            className="font-playfair italic text-[#A6B86B] text-lg md:text-xl max-w-lg leading-relaxed mb-8"
          >
            Un espacio donde cada taza cuenta una historia y cada página abre un mundo.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-5"
          >
            <MagneticButton
              href="#ubicacion"
              className="press btn-fill group font-sans-app text-[11px] font-black tracking-[0.3em] uppercase text-[#343E1C] bg-[#F5F5F0] border-2 border-[#F5F5F0] px-8 py-4 inline-flex items-center gap-3 shadow-[5px_5px_0px_0px_#C1121F]"
            >
              <span>Cómo llegar</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
            <a
              href="#menu"
              className="press font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5F5F0]/60 hover:text-[#F5F5F0] transition-colors border-b border-transparent hover:border-[#F5F5F0]/30 pb-0.5"
            >
              Ver el menú
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
