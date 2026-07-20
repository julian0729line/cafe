'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function Preloader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Bajo reduced-motion cerramos de inmediato (sin contador ni movimiento).
    // Se hace en rAF, no de forma síncrona en el efecto, para no romper
    // hidratación ni la regla react-hooks/set-state-in-effect.
    if (reduce) {
      const id = requestAnimationFrame(() => setDone(true))
      return () => cancelAnimationFrame(id)
    }
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1700, 1)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else raf = window.setTimeout(() => setDone(true), 350) as unknown as number
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(raf)
    }
  }, [reduce])

  useEffect(() => {
    document.body.style.overflow = done || reduce ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done, reduce])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#343E1C] flex flex-col justify-between p-8 md:p-14 overflow-hidden vignette noise"
        >
          <div className="aurora">
            <div className="aurora-blob" style={{ top: '-10%', left: '5%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(180,132,58,0.5), transparent 65%)' }} />
            <div className="aurora-blob b2" style={{ bottom: '-15%', right: '0%', width: '42vw', height: '42vw', background: 'radial-gradient(circle, rgba(193,18,31,0.4), transparent 65%)' }} />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair italic text-[#F5F5F0] text-lg"
            >
              Café Literario
            </motion.span>
            <motion.button
              type="button"
              onClick={() => setDone(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="press font-sans-app text-[9px] font-bold tracking-[0.3em] uppercase text-[#A6B86B] hover:text-[#F5F5F0] transition-colors"
            >
              Saltar →
            </motion.button>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-sans-app text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9A227] max-w-[12rem] leading-relaxed"
            >
              Dieciséis años sirviendo café y palabras.
            </motion.p>
            <span className="font-playfair font-black text-[#F5F5F0] leading-none tabular-nums" style={{ fontSize: 'clamp(4rem, 16vw, 12rem)' }}>
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
