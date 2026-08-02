'use server'

import { createClient } from '@supabase/supabase-js'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

/**
 * El cliente de Supabase se crea aquí dentro, nunca a nivel de módulo: esta
 * acción solo se ejecuta al enviar el formulario, así que `npm run build`
 * sin variables de entorno nunca la evalúa (ver CLAUDE.md).
 */
export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const nombre = String(formData.get('nombre') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const mensaje = String(formData.get('mensaje') ?? '').trim()

  if (!nombre || !mensaje) {
    return { status: 'error', message: 'Escribe tu nombre y tu mensaje.' }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return {
      status: 'error',
      message: 'El formulario no está disponible en este momento. Escríbenos por WhatsApp.',
    }
  }

  const supabase = createClient(url, key)
  const { error } = await supabase
    .from('mensajes_contacto')
    .insert({ nombre, email: email || null, mensaje })

  if (error) {
    return {
      status: 'error',
      message: 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.',
    }
  }

  return { status: 'success', message: 'Recibimos tu mensaje. Te respondemos pronto.' }
}
