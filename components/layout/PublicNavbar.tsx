import Link from 'next/link'
import LinkButton from '@/components/ui/LinkButton'
import Container from '@/components/ui/Container'

export type PublicNavItem = {
  label: string
  href: string
  description?: string
}

export type PublicNavbarCta = {
  label: string
  href: string
  external?: boolean
  ariaLabel?: string
}

export interface PublicNavbarProps {
  className?: string
  brandLabel?: string
  brandHref?: string
  eyebrow?: string
  navItems?: PublicNavItem[]
  cta?: PublicNavbarCta
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function PublicNavbar({
  className = '',
  brandLabel = 'Café Valparaíso',
  brandHref = '/',
  eyebrow,
  navItems = [],
  cta,
}: PublicNavbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-[#4A5728] bg-[#343E1C]',
        className
      )}
    >
      <Container variant="wide">
        <nav
          aria-label="Navegación principal"
          className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-4"
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href={brandHref}
              className="press flex flex-col leading-none"
              aria-label={brandLabel}
            >
              {eyebrow ? (
                <span className="font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.35em] text-[#C9A227]">
                  {eyebrow}
                </span>
              ) : null}
              <span className="font-playfair text-base italic tracking-wide text-[#F5F5F0]">
                {brandLabel}
              </span>
            </Link>

            {cta ? (
              <div className="lg:hidden">
                <LinkButton
                  href={cta.href}
                  variant="secondary"
                  size="sm"
                  {...(cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={cta.ariaLabel ?? cta.label}
                >
                  {cta.label}
                </LinkButton>
              </div>
            ) : null}
          </div>

          {navItems.length > 0 ? (
            <ul className="flex items-center gap-1 overflow-x-auto lg:overflow-visible">
              {navItems.map((item) => (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    title={item.description}
                    className="press block whitespace-nowrap rounded-full px-4 py-2 font-sans-app text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6B86B] transition-colors hover:text-[#F5F5F0]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {cta ? (
            <div className="hidden lg:block">
              <LinkButton
                href={cta.href}
                variant="secondary"
                size="sm"
                {...(cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                aria-label={cta.ariaLabel ?? cta.label}
              >
                {cta.label}
              </LinkButton>
            </div>
          ) : null}
        </nav>
      </Container>
    </header>
  )
}
