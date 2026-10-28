'use client'

import { useEffect, useRef } from 'react'

/**
 * Barra roja de progreso de lectura, fija arriba.
 *
 * Escribe `transform` directamente sobre el nodo: a 60fps, pasar el progreso
 * por estado de React sería un re-render por frame para animar un único
 * `scaleX`.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      el.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="valpa-progress" style={{ transform: 'scaleX(0)' }} />
}
