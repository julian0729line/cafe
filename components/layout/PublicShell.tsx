import type { ReactNode } from 'react'
import PublicNavbar from './PublicNavbar'
import PublicFooter from './PublicFooter'
import type { PublicNavItem, PublicNavbarCta } from './PublicNavbar'
import type { FooterColumn, FooterContactItem, FooterLink } from './PublicFooter'

export type PublicShellProps = {
  children: ReactNode
  className?: string
  mainClassName?: string
  showNavbar?: boolean
  showFooter?: boolean
  navbar?: {
    brandLabel?: string
    brandHref?: string
    eyebrow?: string
    navItems?: PublicNavItem[]
    cta?: PublicNavbarCta
  }
  footer?: {
    brand?: string
    description?: string
    columns?: FooterColumn[]
    contactItems?: FooterContactItem[]
    legalLinks?: FooterLink[]
    socialLinks?: FooterLink[]
    copyright?: string
  }
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function PublicShell({
  children,
  className = '',
  mainClassName = '',
  showNavbar = true,
  showFooter = true,
  navbar,
  footer,
}: PublicShellProps) {
  return (
    <div className={cn('flex min-h-full flex-col', className)}>
      {showNavbar ? <PublicNavbar {...navbar} /> : null}
      <main className={cn('flex-1', mainClassName)}>{children}</main>
      {showFooter ? <PublicFooter {...footer} /> : null}
    </div>
  )
}
