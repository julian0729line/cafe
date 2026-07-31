'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { isSupabaseConfigured } from '@/utils/supabase/config'
import { AuthFormShell } from '../components/AuthFormShell'
import { AuthComingSoon } from '../components/AuthComingSoon'

export default function RegisterPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError('No se pudo crear la cuenta. Intenta con otro correo.')
      setLoading(false)
      return
    }
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-[#343E1C] flex items-center justify-center p-8 relative overflow-hidden vignette noise">
        <div className="aurora">
          <div className="aurora-blob" style={{ top: '-5%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(180,132,58,0.45), transparent 65%)' }} />
          <div className="aurora-blob b2" style={{ bottom: '-10%', right: '5%', width: '38vw', height: '38vw', background: 'radial-gradient(circle, rgba(193,18,31,0.4), transparent 65%)' }} />
        </div>

        <div className="max-w-md w-full relative z-10 fade-up fade-up-2">
          <div className="border border-[#4A5728] bg-[#3d4720]/60 backdrop-blur-sm rounded-[1.5rem] p-12">
            <p className="text-[#C9A227] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
              Paso 2 de 2
            </p>
            <h2 className="font-playfair font-black text-5xl text-[#F5F5F0] leading-[0.95] mb-6">
              Revisa<br />tu <span className="italic text-[#FF7F70]">correo.</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#C1121F] mb-8" />
            <p className="text-[#A6B86B] text-sm mb-2">Enviamos un enlace a</p>
            <p className="text-[#F5F5F0] font-bold text-sm mb-8 break-all">{email}</p>
            <p className="text-[#A6B86B] text-xs leading-relaxed">
              Ábrelo para activar tu cuenta, luego inicia sesión.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/login" className="press text-[10px] text-[#A6B86B] tracking-widest uppercase hover:text-[#F5F5F0] transition-colors">
              ← Volver al login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!isSupabaseConfigured) {
    return (
      <AuthComingSoon
        eyebrow="Tu primera página"
        titleTop="Cada historia"
        titleAccent="comienza aquí."
        quote="“Somos el lugar donde 16 años de conversaciones todavía resuenan entre estas paredes.”"
        bandLabel="Programa de socios"
      />
    )
  }

  return (
    <AuthFormShell
      eyebrow="Tu primera página"
      titleTop="Cada historia"
      titleAccent="comienza aquí."
      quote="“Somos el lugar donde 16 años de conversaciones todavía resuenan entre estas paredes.”"
      bandLabel="Paso 1 de 2"
    >
      <div className="w-full max-w-sm fade-up fade-up-2">

            <div className="mb-10">
              <h2 className="font-playfair font-black text-5xl text-[#343E1C] leading-[0.95]">
                Crea<br />tu cuenta
              </h2>
              <div className="w-10 h-[3px] bg-[#C1121F] mt-5" />
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="register-nombre" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Nombre
                </label>
                <input
                  id="register-nombre"
                  type="text"
                  required
                  autoComplete="name"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  aria-describedby={error ? 'register-error' : undefined}
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 transition-shadow rounded-none placeholder:text-[#8a8a80]"
                />
              </div>

              <div>
                <label htmlFor="register-email" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Correo electrónico
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  aria-describedby={error ? 'register-error' : undefined}
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 transition-shadow rounded-none placeholder:text-[#8a8a80]"
                />
              </div>

              <div>
                <label htmlFor="register-password" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Contraseña
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  aria-describedby={error ? 'register-error' : undefined}
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 transition-shadow rounded-none placeholder:text-[#8a8a80]"
                />
              </div>

              {error && (
                <div id="register-error" role="alert" className="border-2 border-[#C1121F] bg-[#C1121F]/10 px-4 py-3">
                  <p className="text-[#960E17] text-[10px] font-bold tracking-widest uppercase">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="press btn-fill btn-fill-red w-full bg-[#C1121F] text-[#F5F5F0] font-black py-4 text-[11px] tracking-[0.3em] uppercase disabled:opacity-40 shadow-[4px_4px_0px_0px_#343E1C] group flex items-center justify-center gap-3"
              >
                <span>{loading ? 'Creando...' : 'Crear cuenta'}</span>
                {!loading && <span className="transition-transform group-hover:translate-x-1">→</span>}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-[#343E1C]/10">
              <p className="text-[11px] text-[#4A5728] tracking-wide">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-black text-[#343E1C] underline underline-offset-4 decoration-[#C1121F]">
                  Inicia sesión
                </Link>
              </p>
            </div>

      </div>
    </AuthFormShell>
  )
}
