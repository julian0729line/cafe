import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const DEFAULT_NEXT = '/dashboard'

/**
 * Reduce `next` a una ruta interna segura del mismo origen (evita un open
 * redirect). Rechaza URLs absolutas, protocol-relative (`//host`), barras
 * invertidas (literales o percent-encoded una vez) y cualquier esquema no
 * `http(s)` (`javascript:`, `data:`, etc.). El valor final nunca se toma del
 * string crudo: se reconstruye solo con `pathname` + `search` + `hash` de la
 * URL ya resuelta y verificada contra `origin`, así que aunque algún caso no
 * contemplado explícitamente lograra pasar las validaciones previas, jamás
 * podría filtrar un esquema o host distinto en el resultado.
 */
function getSafeNextPath(rawNext: string | null, origin: string): string {
  if (!rawNext) return DEFAULT_NEXT
  if (!rawNext.startsWith('/')) return DEFAULT_NEXT
  if (rawNext.startsWith('//')) return DEFAULT_NEXT
  if (rawNext.includes('\\')) return DEFAULT_NEXT

  let decoded: string
  try {
    decoded = decodeURIComponent(rawNext)
  } catch {
    return DEFAULT_NEXT
  }
  if (decoded.includes('\\')) return DEFAULT_NEXT

  try {
    const resolved = new URL(rawNext, origin)
    if (resolved.origin !== origin) return DEFAULT_NEXT
    return `${resolved.pathname}${resolved.search}${resolved.hash}`
  } catch {
    return DEFAULT_NEXT
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = getSafeNextPath(searchParams.get('next'), origin)

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
