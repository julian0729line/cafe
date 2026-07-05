import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'

export type EventCardProps = {
  title: string
  category?: string
  dateLabel?: string
  description?: string
  href?: string
  ctaLabel?: string
  className?: string
}

export default function EventCard({
  title,
  category,
  dateLabel,
  description,
  href,
  ctaLabel = 'Ver más',
  className = '',
}: EventCardProps) {
  return (
    <Card variant="dark" padding="md" className={className}>
      {category ? <Badge variant="olive">{category}</Badge> : null}
      <h3 className="mt-4 font-playfair text-xl font-bold text-[#F5F5F0]">{title}</h3>
      {dateLabel ? (
        <p className="mt-2 font-sans-app text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6B86B]">
          {dateLabel}
        </p>
      ) : null}
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
