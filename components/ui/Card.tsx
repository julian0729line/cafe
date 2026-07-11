import type { ElementType, ReactNode } from 'react'

export type CardVariant = 'paper' | 'dark' | 'outline' | 'editorial'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const VARIANT_CLASSES: Record<CardVariant, string> = {
  paper: 'bg-[#F7F1E6] text-[#1C1912] border border-[rgba(28,25,18,0.12)]',
  dark: 'tile text-[#F5F5F0] border border-[#4A5728]',
  outline: 'border border-[#4A5728] text-[#F5F5F0] bg-transparent',
  // El sello "stamp" es un rasgo de identidad deliberado (imprenta), no una
  // sombra blanda tipo SaaS; se conserva sólo en esta variante de cierre.
  editorial:
    'bg-[#C1121F] text-[#F5F5F0] shadow-[5px_5px_0px_0px_#343E1C]',
}

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export interface CardProps {
  as?: ElementType
  variant?: CardVariant
  padding?: CardPadding
  className?: string
  children: ReactNode
}

export default function Card({
  as: Tag = 'div',
  variant = 'paper',
  padding = 'md',
  className = '',
  children,
}: CardProps) {
  return (
    <Tag
      className={`relative rounded-sm transition-colors duration-300 ${VARIANT_CLASSES[variant]} ${PADDING_CLASSES[padding]} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
