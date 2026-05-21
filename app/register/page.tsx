'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

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
      <div className="min-h-screen bg-[#343E1C] flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="border-2 border-[#C1121F] bg-[#4A5728] p-12">
            <p className="text-[#8A9A52] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
              Paso 2 de 2
            </p>
            <h2 className="text-6xl font-black text-[#F5F5F0] leading-none tracking-tighter mb-6">
              REVISA<br />TU<br />CORREO.
            </h2>
            <div className="w-12 h-[3px] bg-[#C1121F] mb-8" />
            <p className="text-[#8A9A52] text-sm mb-2">Enviamos un enlace a</p>
            <p className="text-[#F5F5F0] font-black text-sm mb-8 break-all">{email}</p>
            <p className="text-[#6B7A3C] text-xs">
              Ábrelo para activar tu cuenta, luego inicia sesión.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/login" className="text-[10px] text-[#6B7A3C] tracking-widest uppercase hover:text-[#F5F5F0] transition-colors">
              ← Volver al login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">

      {/* 60% — Panel oliva literario */}
      <div className="hidden lg:flex w-[60%] bg-[#343E1C] flex-col justify-between p-14 relative overflow-hidden noise">
        <div className="absolute inset-0 z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 56px)' }} />

        <div className="absolute bottom-0 right-0 font-playfair font-black text-[22rem] leading-none text-[#4A5728]/20 select-none pointer-events-none z-0 translate-x-12 translate-y-8">
          16
        </div>

        <span className="font-playfair italic text-[#F5F5F0] text-lg relative z-10">
          Café Literario
        </span>

        <div className="relative z-10">
          <p className="font-sans-app text-[10px] font-bold tracking-[0.3em] uppercase text-[#6B7A3C] mb-6">
            Tu primera página
          </p>
          <h1 className="font-playfair font-black leading-[0.88] text-[#F5F5F0] mb-3"
            style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>
            Cada historia<br />
            <span className="italic text-[#C1121F]">comienza aquí.</span>
          </h1>
          <div className="flex gap-3 mt-6 mb-8">
            <div className="w-16 h-[3px] bg-[#C1121F]" />
            <div className="w-8 h-[3px] bg-[#6B7A3C]" />
          </div>
          <p className="font-playfair italic text-[#6B7A3C] text-lg leading-relaxed max-w-xs">
            "Somos el lugar donde 16 años de conversaciones todavía resuenan entre estas paredes."
          </p>
        </div>

        <span className="font-sans-app text-[10px] font-bold tracking-[0.3em] uppercase text-[#4A5728] relative z-10">
          16 años · Desde 2008
        </span>
      </div>

      {/* 30% rojo + 10% blanco — Formulario */}
      <div className="w-full lg:w-[40%] bg-[#F5F5F0] flex flex-col">

        <div className="bg-[#C1121F] px-10 py-4 flex items-center justify-between">
          <span className="text-[#F5F5F0] text-[10px] font-bold tracking-[0.3em] uppercase lg:hidden">
            ☕ Proyecto Café
          </span>
          <span className="text-[#F5F5F0] text-[10px] font-bold tracking-[0.3em] uppercase ml-auto">
            Paso 1 de 2
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full max-w-sm">

            <div className="mb-10">
              <h2 className="text-4xl font-black tracking-tighter text-[#343E1C] leading-none">
                CREA<br />TU CUENTA
              </h2>
              <div className="w-10 h-[3px] bg-[#C1121F] mt-4" />
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] rounded-none placeholder:text-[#aaa]"
                />
              </div>

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
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] rounded-none placeholder:text-[#aaa]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5728] mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border-2 border-[#343E1C] bg-white px-4 py-3 text-sm text-[#343E1C] focus:outline-none focus:border-[#C1121F] rounded-none placeholder:text-[#aaa]"
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
                className="w-full bg-[#C1121F] hover:bg-[#960E17] text-[#F5F5F0] font-black py-4 text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-40 shadow-[4px_4px_0px_0px_#343E1C]"
              >
                {loading ? 'Creando...' : 'Crear cuenta →'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-[#343E1C]/10">
              <p className="text-[11px] text-[#6B7A3C] tracking-wide">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-black text-[#343E1C] underline underline-offset-4">
                  Inicia sesión
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
