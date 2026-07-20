import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'wine'
export type ButtonSize = 'sm' | 'md' | 'lg'

// Botones editoriales (GOAL 17): borde marcado, radio pequeño (`rounded-sm`),
// sin sombras ni píldoras, hover-fill sobrio por color. Tap target ≥ 44px.
export const buttonBaseClasses =
  'press inline-flex items-center justify-center gap-2 rounded-sm font-sans-app font-bold uppercase tracking-[0.2em] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none'

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-2 border-[#F5F5F0] bg-[#F5F5F0] text-[#343E1C] hover:bg-transparent hover:text-[#F5F5F0]',
  secondary:
    'border-2 border-[#C1121F] bg-[#C1121F] text-[#F5F5F0] hover:bg-[#960E17] hover:border-[#960E17]',
  ghost:
    'border border-[#4A5728] bg-transparent text-[#F5F5F0] hover:border-[#F5F5F0] hover:bg-[rgba(245,245,240,0.06)]',
  dark: 'border border-[#4A5728] bg-[#343E1C] text-[#F5F5F0] hover:bg-[#4A5728]',
  wine: 'border-2 border-[#7A2230] bg-[#7A2230] text-[#F7F1E6] hover:bg-[#8F2838]',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 text-[10px] px-4 py-2',
  md: 'min-h-11 text-[11px] px-6 py-3',
  lg: 'min-h-12 text-[11px] px-8 py-4',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonBaseClasses} ${buttonVariantClasses[variant]} ${buttonSizeClasses[size]} ${className}`.trim()}
      {...rest}
    />
  )
}
