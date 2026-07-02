'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { isSupabaseConfigured } from '@/utils/supabase/config'
import { AuthFormShell } from '../components/AuthFormShell'
import { AuthComingSoon } from '../components/AuthComingSoon'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  if (!isSupabaseConfigured) {
    return (
      <AuthComingSoon
        eyebrow="Bienvenido de vuelta"
        titleTop="Tu lugar"
        titleAccent="te espera."
        quote="“Cada visita es una página nueva en la historia de este lugar.”"
        bandLabel="Acceso"
      />
    )
  }

  return (
    <AuthFormShell
      eyebrow="Bienvenido de vuelta"
      titleTop="Tu lugar"
      titleAccent="te espera."
      quote="“Cada visita es una página nueva en la historia de este lugar.”"
      bandLabel="Acceso"
    >
      <div className="w-full max-w-sm fade-up fade-up-2">

            <div className="mb-10">
              <h2 className="font-playfair font-black text-5xl text-[#343E1C] leading-[0.95]">
                Inicia<br />sesión
              </h2>
              <div className="w-10 h-[3px] bg-[#C1121F] mt-5" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 transition-shadow rounded-none placeholder:text-[#8a8a80]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 transition-shadow rounded-none placeholder:text-[#8a8a80]"
                />
              </div>

              {error && (
                <div className="border-2 border-[#C1121F] bg-[#C1121F]/10 px-4 py-3">
                  <p className="text-[#960E17] text-[10px] font-bold tracking-widest uppercase">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="press btn-fill btn-fill-red w-full bg-[#C1121F] text-[#F5F5F0] font-black py-4 text-[11px] tracking-[0.3em] uppercase disabled:opacity-40 shadow-[4px_4px_0px_0px_#343E1C] group flex items-center justify-center gap-3"
              >
                <span>{loading ? 'Ingresando...' : 'Ingresar'}</span>
                {!loading && <span className="transition-transform group-hover:translate-x-1">→</span>}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-[#343E1C]/10">
              <p className="text-[11px] text-[#4A5728] tracking-wide">
                ¿Sin cuenta?{' '}
                <Link href="/register" className="font-black text-[#343E1C] underline underline-offset-4 decoration-[#C1121F]">
                  Regístrate
                </Link>
              </p>
            </div>

      </div>
    </AuthFormShell>
  )
}
