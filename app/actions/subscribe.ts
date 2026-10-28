'use server'

/**
 * Alta en la lista de la agenda cultural.
 *
 * ⚠ SIN PROVEEDOR CONECTADO: hoy esto valida el correo y lo registra en el
 * log del servidor. NO lo guarda en ningún sitio duradero, así que los correos
 * se pierden al reiniciarse el contenedor.
 *
 * Es un BLOQUEADOR DE LANZAMIENTO, no un detalle: el formulario le promete a
 * la persona «te escribiremos pronto» y ahora mismo esa promesa no se puede
 * cumplir. Antes de publicar hay que conectar Resend, Brevo o Mailchimp aquí,
 * o retirar el bloque de suscripción de la página.
 */

export type SubscribeState = { status: 'idle' | 'ok' | 'error'; message?: string }

// Deliberadamente laxa. Validar correos con una expresión estricta rechaza
// direcciones legítimas; aquí solo queremos descartar basura evidente.
const looksLikeEmail = (value: string) =>
  value.length >= 3 && value.length <= 254 && value.indexOf('@') > 0

export async function subscribe(email: string): Promise<SubscribeState> {
  const value = email.trim()

  if (!looksLikeEmail(value)) {
    return { status: 'error', message: 'Revisa el correo e intenta de nuevo.' }
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn(
      `[newsletter] Sin proveedor configurado. Correo NO almacenado: ${value}`,
    )
    return { status: 'ok' }
  }

  // TODO: enviar a la audiencia real cuando exista la clave.
  console.info(`[newsletter] alta: ${value}`)
  return { status: 'ok' }
}
