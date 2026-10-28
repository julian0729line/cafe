'use client'

import { useEffect, useState } from 'react'
import { waLink, wa } from '@/lib/content'

/**
 * Barra de acción fija en mobile, por debajo de md.
 *
 * Aparece pasado el 60% de la altura de pantalla: antes de eso el hero ya
 * tiene sus propios botones a la vista y una barra extra solo taparía
 * contenido. Las dos acciones cubren los dos caminos reales — quien reserva
 * y quien simplemente va a aparecer.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="hd-nav flex gap-2 border-2 border-[#181f0d] bg-[#F5F5F0] p-2" style={{ boxShadow: '3px 3px 0 #181f0d' }}>
        <a href={waLink(wa.general)} className="ck-btn ck-red flex-1" style={{ boxShadow: 'none', padding: '12px 14px' }}>
          Reservar
        </a>
        <a href="#visitanos" className="ck-btn ck-cream flex-1" style={{ boxShadow: 'none', padding: '12px 14px' }}>
          Cómo llegar
        </a>
      </div>
    </div>
  )
}
