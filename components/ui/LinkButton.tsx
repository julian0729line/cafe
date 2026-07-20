import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import {
  buttonBaseClasses,
  buttonVariantClasses,
  buttonSizeClasses,
  type ButtonVariant,
  type ButtonSize,
} from './Button'

export interface LinkButtonProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export default function LinkButton({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${buttonBaseClasses} ${buttonVariantClasses[variant]} ${buttonSizeClasses[size]} ${className}`.trim()}
      {...rest}
    />
  )
}
