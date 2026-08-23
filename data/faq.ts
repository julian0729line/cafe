/**
 * Preguntas frecuentes — Café Valparaíso.
 *
 * Solo preguntas respondibles con datos ya confirmados en `data/contact.ts`
 * y `data/spaces.ts`. Nada sobre horarios, aforos ni tarifas: esos campos
 * siguen en `null` hasta que el negocio los confirme (ver `statusNotes` en
 * esos archivos), así que no se les inventa una respuesta aquí.
 */

export type FaqItem = {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: '¿Cómo puedo reservar en Café Valparaíso?',
    answer:
      'Escribiéndonos por WhatsApp: es nuestro único canal de reservas y el más rápido para confirmar disponibilidad.',
  },
  {
    question: '¿Dónde están ubicados?',
    answer:
      'Tenemos dos sedes en Cali: Pance (Cra. 125 #23A-58) y Juanambú (Av. 9 Norte #9-31).',
  },
  {
    question: '¿Puedo reservar un espacio para un evento privado?',
    answer:
      'Sí. Escríbenos por WhatsApp contándonos qué tipo de encuentro planeas (privado, celebración, reunión de trabajo o actividad cultural) y coordinamos los detalles contigo.',
  },
  {
    question: '¿Las dos sedes ofrecen lo mismo?',
    answer:
      'Ambas comparten la misma propuesta de café, cocina y cultura de Café Valparaíso; para elegir la más conveniente, cuéntanos por WhatsApp desde qué zona de Cali llegas.',
  },
]
