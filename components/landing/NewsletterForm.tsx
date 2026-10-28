'use client'

import { useState } from 'react'
import { subscribe } from '@/app/actions/subscribe'
import { agenda } from '@/lib/content'

const copy = agenda.newsletter

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const result = await subscribe(email)
    if (result.status === 'ok') {
      setStatus('ok')
      return
    }
    setStatus('error')
    setMessage(result.message ?? copy.error)
  }

  if (status === 'ok') {
    return (
      <p className="ck-d text-2xl text-[#F5F5F0] md:text-3xl" role="status">
        {copy.success}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Tu correo electrónico
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={copy.placeholder}
        autoComplete="email"
        className="ck-input sm:flex-1"
      />
      <button type="submit" className="ck-btn ck-ink" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : copy.cta}
      </button>
      {status === 'error' ? (
        <p role="alert" className="text-sm font-bold text-[#F5F5F0] sm:sr-only">
          {message}
        </p>
      ) : null}
    </form>
  )
}
