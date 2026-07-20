/**
 * ¿Hay credenciales de Supabase configuradas?
 *
 * Permite que la web se despliegue y funcione como escaparate SIN Supabase:
 * cuando es `false`, se ocultan/deshabilitan login, registro y el área de
 * socios (en vez de romperse). Al agregar las variables y volver a desplegar,
 * todo el área de socios reaparece sola.
 *
 * Las variables NEXT_PUBLIC_* están disponibles tanto en el servidor
 * (middleware, server components) como en el cliente (inlined en build).
 */
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
