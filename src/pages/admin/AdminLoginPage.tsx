import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ShieldCheck } from 'lucide-react'

const ADMIN_EMAIL = 'admin@skylux.com'
const ADMIN_PASSWORD = 'admin1234'

export default function AdminLoginPage() {
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState(ADMIN_PASSWORD)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (window.localStorage.getItem('adminAuth') === 'true') {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError('Use the demo admin credentials to enter the panel.')
      return
    }

    window.localStorage.setItem('adminAuth', 'true')
    window.localStorage.setItem('adminAuthEmail', email.trim())
    setError('')
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_55%)] px-4 py-12 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Admin access</p>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Sign in to SkyLux Admin</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email-input" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 focus-within:border-sky-500 dark:border-slate-700 dark:bg-slate-950 context-focus">
              <Mail className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white outline-none"
                placeholder="admin@skylux.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-input" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 focus-within:border-sky-500 dark:border-slate-700 dark:bg-slate-950">
              <Lock className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white outline-none"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error ? <p className="text-sm text-rose-500">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          Demo credentials: <span className="font-semibold text-slate-900 dark:text-white">admin@skylux.com</span> / <span className="font-semibold text-slate-900 dark:text-white">admin1234</span>
        </div>
      </motion.div>
    </div>
  )
}