'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Entrada al hacer scroll: opacidad 0→1 y 24px de desplazamiento.
 *
 * No usa estado a propósito. El reveal es puramente visual, así que mutar la
 * clase por ref evita re-renderizar el árbol entero en cada intersección — y
 * de paso esquiva `react-hooks/set-state-in-effect`, que prohíbe sincronizar
 * estado dentro del cuerpo del efecto.
 *
 * Lo que ya está visible al cargar no se anima: `IntersectionObserver` dispara
 * de inmediato para esos elementos y se les quita la clase antes de que el
 * navegador pinte, sin transición perceptible.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.classList.remove('valpa-reveal-hidden')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.style.transitionDelay = `${delay}ms`
          el.classList.remove('valpa-reveal-hidden')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`valpa-reveal valpa-reveal-hidden ${className}`}>
      {children}
    </div>
  )
}
