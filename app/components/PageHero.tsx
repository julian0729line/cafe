'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'

type Line = { text: string; accent?: boolean; italic?: boolean; tail?: string }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * Hero "protagonista" reutilizable: palabra fantasma gigante + tipografía
 * grande con entrada kinética escalonada, sobre auroras cálidas. Da a cada
 * página el mismo peso visual que el home.
 */
export function PageHero({
  eyebrow,
  lines,
  ghost,
  size = 'clamp(3rem, 9vw, 7rem)',
  maxWidth = 'max-w-5xl',
}: {
  eyebrow?: string
  lines: Line[]
  ghost?: string
  size?: string
  maxWidth?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className="relative px-8 py-24 md:py-28 border-b border-[#4A5728] overflow-hidden vignette noise">
      <div className="aurora">
        <div className="aurora-blob" style={{ top: '-25%', left: '3%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(180,132,58,0.42), transparent 65%)' }} />
        <div className="aurora-blob b2" style={{ bottom: '-30%', right: '6%', width: '34vw', height: '34vw', background: 'radial-gradient(circle, rgba(193,18,31,0.32), transparent 65%)' }} />
        <div className="aurora-blob b3" style={{ top: '10%', right: '22%', width: '26vw', height: '26vw', background: 'radial-gradient(circle, rgba(138,154,82,0.4), transparent 65%)' }} />
      </div>

      {ghost && (
        <span
          className="pointer-events-none select-none absolute -bottom-6 md:-bottom-10 right-2 md:right-8 font-playfair font-black leading-none text-[#F5F5F0]/[0.05] z-0"
          style={{ fontSize: 'clamp(7rem, 24vw, 20rem)' }}
          aria-hidden="true"
        >
          {ghost}
        </span>
      )}

      <motion.div
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate="show"
        className={`${maxWidth} mx-auto relative z-10`}
      >
        {eyebrow && (
          <motion.p variants={item} className="font-sans-app text-[#C9A227] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
            {eyebrow}
          </motion.p>
        )}
        {lines.length > 0 && (
          <h1
            className="font-playfair font-black leading-[0.92] tracking-tight"
            style={{ fontSize: size }}
          >
            {lines.map((l, i) => (
              <motion.span
                key={i}
                variants={item}
                className={`block ${l.accent ? 'text-[#FF7F70]' : 'text-[#F5F5F0]'} ${l.italic ? 'italic' : ''}`}
              >
                {l.text}
                {l.tail && <span className="text-[#FF7F70]">{l.tail}</span>}
              </motion.span>
            ))}
          </h1>
        )}
        <motion.div variants={item} className="flex gap-3 mt-8">
          <div className="w-16 h-[3px] bg-[#C1121F]" />
          <div className="w-8 h-[3px] bg-[#A6B86B]" />
        </motion.div>
      </motion.div>
    </div>
  )
}
