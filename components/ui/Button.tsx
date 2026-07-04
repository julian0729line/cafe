import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'wine'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonBaseClasses =
  'press inline-flex items-center justify-center gap-2 font-sans-app font-bold uppercase tracking-[0.2em] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none'

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'rounded-none border-2 border-[#F5F5F0] bg-[#F5F5F0] text-[#343E1C] shadow-[5px_5px_0px_0px_#C1121F] hover:bg-transparent hover:text-[#F5F5F0]',
  secondary:
    'rounded-none border-2 border-[#C1121F] bg-[#C1121F] text-[#F5F5F0] shadow-[4px_4px_0px_0px_#343E1C] hover:bg-[#960E17] hover:border-[#960E17]',
  ghost:
    'rounded-full border border-[#4A5728] bg-transparent text-[#F5F5F0] hover:border-[#F5F5F0]',
  dark: 'rounded-full bg-[#343E1C] text-[#F5F5F0] hover:opacity-90',
  wine: 'rounded-none bg-[#7A2230] text-[#F7F1E6] shadow-[4px_4px_0px_0px_#1C1912] hover:opacity-90',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-[10px] px-4 py-2',
  md: 'text-[11px] px-6 py-3',
  lg: 'text-[11px] px-8 py-4',
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
