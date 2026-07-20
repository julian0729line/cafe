import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'olive' | 'wine' | 'brass' | 'outline'

const BASE_CLASSES =
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.2em]'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-[#C1121F] text-[#F5F5F0]',
  olive: 'bg-[#4A5728] text-[#F5F5F0]',
  wine: 'bg-[#7A2230] text-[#F7F1E6]',
  brass: 'bg-[#C9A227] text-[#1C1912]',
  outline: 'border border-[#4A5728] text-[#A6B86B]',
}

export interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}

export default function Badge({ variant = 'default', className = '', children }: BadgeProps) {
  return (
    <span className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}>
      {children}
    </span>
  )
}
