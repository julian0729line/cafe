import Link from 'next/link'
import Container from '@/components/ui/Container'

export type FooterLink = {
  label: string
  href: string
  external?: boolean
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export type FooterContactItem = {
  label: string
  value: string
  href?: string
  external?: boolean
}

export interface PublicFooterProps {
  className?: string
  brand?: string
  description?: string
  columns?: FooterColumn[]
  contactItems?: FooterContactItem[]
  legalLinks?: FooterLink[]
  socialLinks?: FooterLink[]
  copyright?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function FooterLinkAnchor({ label, href, external }: FooterLink) {
  return (
    <Link
      href={href}
      className="press font-sans-app text-sm text-[#A6B86B] transition-colors hover:text-[#F5F5F0]"
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {label}
    </Link>
  )
}

export default function PublicFooter({
  className = '',
  brand = 'Café Valparaíso',
  description = 'Un espacio donde el café y las palabras construyen comunidad.',
  columns = [],
  contactItems = [],
  legalLinks = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} Café Valparaíso. Todos los derechos reservados.`,
}: PublicFooterProps) {
  return (
    <footer className={cn('border-t border-[#4A5728] bg-[#2A331A]', className)}>
      <Container variant="wide" className="py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_repeat(auto-fit,minmax(140px,1fr))]">
          <div className="flex flex-col gap-3">
            <span className="font-playfair text-xl italic text-[#F5F5F0]">{brand}</span>
            <p className="max-w-xs font-sans-app text-sm leading-relaxed text-[#A6B86B]">
              {description}
            </p>
            {socialLinks.length > 0 ? (
              <ul aria-label="Redes sociales" className="mt-2 flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLinkAnchor {...link} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <FooterLinkAnchor {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {contactItems.length > 0 ? (
            <div>
              <h3 className="font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                Contacto
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {contactItems.map((item) => (
                  <li key={item.label} className="font-sans-app text-sm text-[#A6B86B]">
                    <span className="block text-[0.6875rem] uppercase tracking-[0.1em] text-[#D9DCC4]">
                      {item.label}
                    </span>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="press text-[#A6B86B] transition-colors hover:text-[#F5F5F0]"
                        {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(245,245,240,0.12)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans-app text-xs text-[#D9DCC4]">{copyright}</p>
          {legalLinks.length > 0 ? (
            <ul aria-label="Enlaces legales" className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="press font-sans-app text-xs text-[#D9DCC4] transition-colors hover:text-[#F5F5F0]"
                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}
