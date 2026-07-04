import type { ElementType, ReactNode } from 'react'

const WIDTH_BY_VARIANT = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  text: 'max-w-2xl',
  full: 'max-w-none',
} as const

export type ContainerVariant = keyof typeof WIDTH_BY_VARIANT

export interface ContainerProps {
  as?: ElementType
  variant?: ContainerVariant
  className?: string
  children: ReactNode
}

export default function Container({
  as: Tag = 'div',
  variant = 'default',
  className = '',
  children,
}: ContainerProps) {
  return (
    <Tag className={`w-full mx-auto px-4 md:px-8 ${WIDTH_BY_VARIANT[variant]} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
