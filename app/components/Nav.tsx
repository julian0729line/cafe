'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'

const LINKS = [
  { href: '#menu', label: 'Menú' },
  { href: '#historia', label: 'Historia' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // Scroll-spy con IntersectionObserver (sin listeners de scroll)
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Bloquear scroll del body con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex items-center justify-between gap-6 w-full max-w-5xl rounded-full px-5 py-3 border transition-colors duration-500 ${
            scrolled || open
              ? 'border-[#F5F5F0]/10 bg-[#343E1C]/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a
            href="#top"
            className="press font-playfair text-[#F5F5F0] text-base italic tracking-wide"
          >
            Café Literario
          </a>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(({ href, label }) => {
              const isActive = active === href.slice(1)
              return (
                <a
                  key={href}
                  href={href}
                  className="relative px-4 py-2 font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[#F5F5F0]/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative ${
                      isActive ? 'text-[#F5F5F0]' : 'text-[#A6B86B] hover:text-[#F5F5F0]'
                    }`}
                  >
                    {label}
                  </span>
                </a>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/login"
              className="press font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] hover:text-[#F5F5F0] transition-colors px-4 py-2"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="press btn-fill btn-fill-red font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#F5F5F0] border-2 border-[#C1121F] rounded-full px-5 py-2"
            >
              Únete
            </Link>
          </div>

          {/* Hamburguesa móvil */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[2px] bg-[#F5F5F0]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[2px] bg-[#F5F5F0]"
            />
          </button>
        </nav>
      </motion.header>

      {/* Overlay móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[#343E1C]/95 backdrop-blur-xl flex flex-col justify-center px-10"
          >
            <div className="flex flex-col gap-6">
              {LINKS.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-playfair text-4xl text-[#F5F5F0]"
                >
                  {label}
                </motion.a>
              ))}
            </div>

            <div className="flex gap-4 mt-14">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#A6B86B] px-6 py-3 border border-[#4A5728] rounded-full"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5F5F0] px-6 py-3 border-2 border-[#C1121F] rounded-full"
              >
                Únete
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
