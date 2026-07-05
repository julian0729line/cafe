import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'

export type MenuItemCardProps = {
  title: string
  category?: string
  description?: string
  href?: string
  ctaLabel?: string
  className?: string
}

export default function MenuItemCard({
  title,
  category,
  description,
  href,
  ctaLabel = 'Ver más',
  className = '',
}: MenuItemCardProps) {
  return (
    <Card variant="paper" padding="md" className={className}>
      {category ? <Badge variant="wine">{category}</Badge> : null}
      <h3 className="mt-4 font-playfair text-xl font-bold text-[#1C1912]">{title}</h3>
      {description ? (
        <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#6B6355]">{description}</p>
      ) : null}
      {href ? (
        <LinkButton href={href} variant="wine" size="sm" className="mt-6">
          {ctaLabel}
        </LinkButton>
      ) : null}
    </Card>
  )
}
