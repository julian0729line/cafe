import type { Metadata } from 'next'

import Nav from '@/components/landing/Nav'
import ScrollProgress from '@/components/landing/ScrollProgress'
import StickyCta from '@/components/landing/StickyCta'
import Hero from '@/components/landing/Hero'
import Marquee from '@/components/landing/Marquee'
import InfoRapida from '@/components/landing/InfoRapida'
import Concepto from '@/components/landing/Concepto'
import Agenda from '@/components/landing/Agenda'
import Carta from '@/components/landing/Carta'
import Libreria from '@/components/landing/Libreria'
import Visitanos from '@/components/landing/Visitanos'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Café Valparaíso — Café literario en Cali · Pance y Juanambú',
  description:
    'Café literario, cultural y gastronómico en Cali. Café de especialidad, cocina de autor, Librería La Maga y agenda cultural. Sedes Pance y Juanambú. Reserva tu mesa o evento.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Café Valparaíso — Café literario en Cali',
    description: 'Libros, música, conversación y cocina de autor. Sedes Pance y Juanambú.',
    type: 'website',
    locale: 'es_CO',
  },
}

/**
 * Landing de una sola página.
 *
 * Server Component completo: solo Nav, ScrollProgress, StickyCta y el
 * formulario de la agenda son cliente, y son hojas aisladas. No toca Supabase
 * ni variables de entorno en render, así que `npm run build` sigue pasando sin
 * ninguna env configurada — que es el invariante del proyecto.
 */
export default function Home() {
  return (
    <div className="valpa">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <InfoRapida />
        <Concepto />
        <Agenda />
        <Carta />
        <Libreria />
        <Visitanos />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
