import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'

export type SpaceCardProps = {
  title: string
  description?: string
  tag?: string
  href?: string
  ctaLabel?: string
  className?: string
}

export default function SpaceCard({
  title,
  description,
  tag,
  href,
  ctaLabel = 'Ver más',
  className = '',
}: SpaceCardProps) {
  return (
    <Card variant="dark" padding="md" className={className}>
      {tag ? <Badge variant="brass">{tag}</Badge> : null}
      <h3 className="mt-4 font-playfair text-xl font-bold text-[#F5F5F0]">{title}</h3>
      {description ? (
        <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#A6B86B]">{description}</p>
      ) : null}
      {href ? (
        <LinkButton href={href} variant="ghost" size="sm" className="mt-6">
          {ctaLabel}
        </LinkButton>
      ) : null}
    </Card>
  )
}
