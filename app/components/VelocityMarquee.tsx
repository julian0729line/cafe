'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'motion/react'

function wrap(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export function VelocityMarquee({
  items,
  baseVelocity = 3,
}: {
  items: string[]
  baseVelocity?: number
}) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const directionFactor = useRef(1)

  useAnimationFrame((_t, delta) => {
    if (reduce) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const row = (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {items.map((item, i) => (
        <span key={i} className="font-sans-app font-black text-[11px] tracking-[0.3em] uppercase text-[#F5F5F0] px-8 flex items-center gap-8">
          {item}
          <span className="text-[#960E17] text-lg">✦</span>
        </span>
      ))}
    </div>
  )

  // Estructura única (sin ramas) para evitar desajustes de hidratación: bajo
  // reduced-motion el useAnimationFrame sale temprano y x queda en 0 (estático).
  return (
    <div className="bg-[#C1121F] border-y-2 border-[#960E17] py-4 overflow-hidden">
      <motion.div className="flex" style={{ x }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  )
}
