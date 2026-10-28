'use client'

import { useEffect, useState } from 'react'
import { nav, waLink, wa } from '@/lib/content'

/**
 * Barra flotante fija. Tres comportamientos:
 *   · gana sombra sólida al pasar de 40px de scroll
 *   · marca la sección visible (IntersectionObserver con una banda estrecha
 *     en mitad de pantalla, para que solo una sección esté activa a la vez)
 *   · overlay a pantalla completa por debajo de xl, que bloquea el scroll
 *
 * El estado inicial del scroll se sincroniza dentro de `requestAnimationFrame`
 * y no en el cuerpo del efecto: `react-hooks/set-state-in-effect` prohíbe lo
 * segundo, y además así no se pinta un estado y acto seguido otro.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // El overlay cubre la página entera: si el body sigue desplazándose detrás,
  // al cerrarlo la persona aparece en un punto distinto del que dejó.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Cerrar con Escape es lo que espera cualquiera que use teclado.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className="fixed inset-x-3 top-3 z-50 md:inset-x-6"
        style={{ transition: 'box-shadow .2s ease' }}
      >
        <nav
          aria-label="Principal"
          className="hd-nav flex items-center justify-between gap-4 border-2 border-[#181f0d] bg-[#F5F5F0] px-4 py-3 md:px-6"
          style={{ boxShadow: scrolled ? '3px 3px 0 #181f0d' : 'none', transition: 'box-shadow .2s ease' }}
        >
          <a href="#inicio" className="ck-d shrink-0 text-xl md:text-2xl">
            Café <em className="hd-u font-playfair italic text-[#C1121F]">Valparaíso</em>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`inline-block rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      isActive ? 'bg-[#181f0d] text-[#F5F5F0]' : 'hover:text-[#C1121F]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={waLink(wa.general)}
              className="ck-btn ck-red"
              style={{ boxShadow: 'none', padding: '10px 18px', minHeight: 44 }}
            >
              Reservar
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="ck-btn ck-cream xl:hidden"
              style={{ boxShadow: 'none', padding: '10px 18px', minHeight: 44 }}
            >
              Menú
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="ck-dots fixed inset-0 z-[60] overflow-y-auto bg-[#F5F5F0] px-5 py-6">
          <div className="mx-auto flex max-w-xl flex-col gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ck-btn ck-ink self-end"
            >
              Cerrar
            </button>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="ck-card-sm ck-d bg-[#F5F5F0] px-5 py-6 text-3xl"
              >
                {item.label}
              </a>
            ))}
            <a
              href={waLink(wa.general)}
              onClick={() => setOpen(false)}
              className="ck-btn ck-red mt-2"
            >
              Reservar mesa →
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
