import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

export type AboutFeature = {
  title: string
  description: string
}

export interface AboutSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  features?: AboutFeature[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_FEATURES: AboutFeature[] = [
  {
    title: 'Café literario',
    description: 'Un espacio pensado para leer, escribir y conversar sobre una taza de café.',
  },
  {
    title: 'Espacio cultural',
    description: 'Agenda viva de encuentros, lecturas y actividades para la comunidad.',
  },
  {
    title: 'Gastronomía de autor',
    description: 'Cocina y barra propias, con identidad y cuidado en cada detalle.',
  },
  {
    title: 'Comunidad',
    description: 'Un lugar que se construye con quienes vuelven una y otra vez.',
  },
]

export default function AboutSection({
  eyebrow = 'Quiénes somos',
  title = 'Más que un café',
  description = 'Café Valparaíso reúne cultura, gastronomía y literatura en un mismo espacio, pensado para quedarse.',
  features = DEFAULT_FEATURES,
  className = '',
}: AboutSectionProps) {
  return (
    <section className={cn('border-b border-[#4A5728] px-4 py-16 md:px-8 md:py-28', className)}>
      <Container variant="wide">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        {features.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} variant="dark" padding="md">
                <h3 className="font-playfair text-xl font-bold text-[#F5F5F0]">{feature.title}</h3>
                <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
