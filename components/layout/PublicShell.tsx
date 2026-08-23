import type { ReactNode } from 'react'
import PublicNavbar from './PublicNavbar'
import PublicFooter from './PublicFooter'
import MobileStickyCta from './MobileStickyCta'
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
    activeHref?: string
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
    <div className={cn('flex min-h-full flex-col bg-[#181f0d] text-[#F5F5F0]', className)}>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#F5F5F0] focus:px-5 focus:py-3 focus:font-sans-app focus:text-[11px] focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-[#343E1C]"
      >
        Saltar al contenido principal
      </a>
      {showNavbar ? <PublicNavbar {...navbar} /> : null}
      <main id="contenido-principal" tabIndex={-1} className={cn('flex-1 pb-16 md:pb-0', mainClassName)}>
        {children}
      </main>
      {showFooter ? <PublicFooter {...footer} /> : null}
      {showNavbar ? <MobileStickyCta /> : null}
    </div>
  )
}
