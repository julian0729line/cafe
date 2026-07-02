'use client'

import { motion, useReducedMotion } from 'motion/react'

/**
 * Transición de página (App Router): template.tsx se re-monta en cada
 * navegación, así que este fundido de entrada corre al cambiar de ruta.
 * Se usa solo opacity (no transform) para no romper los elementos
 * `position: fixed` (nav flotante, grano, barra de progreso). Bajo
 * reduced-motion el fundido es instantáneo.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
