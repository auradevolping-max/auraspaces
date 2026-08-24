import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Building2, Loader2, Lock, LogIn, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/authService'

const ERROR_MESSAGES = {
  'auth/invalid-email': 'That email address looks invalid.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/too-many-requests':
    'Too many attempts. Please wait a moment and try again.',
}

export default function Login() {
  const { user, initializing } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const redirectTo = location.state?.from?.pathname || '/admin'

  if (!initializing && user) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await login(email.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      console.error('Login error:', err)
      setError(
        ERROR_MESSAGES[err.code] || 'Unable to sign in. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      dir="ltr"
      className="flex min-h-screen items-center justify-center bg-navy-950 px-6"
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold">
            <Building2 size={22} strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 font-display text-2xl text-white">
            Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            Aura Spaces internal dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-navy-800 bg-navy-900/60 p-7"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-500"
              />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@auraspaces.com"
                className="w-full rounded-md border border-navy-700 bg-navy-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-500"
              />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-navy-700 bg-navy-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
