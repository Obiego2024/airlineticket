import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUi } from '@/context/UiContext'
import {
  Plane,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
} from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { t } = useUi()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Plane className="w-8 h-8 text-sky-500" />
            <span className="font-display text-2xl font-bold text-slate-900 dark:text-white">SkyLux</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">{t('auth.loginSubtitle')}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-premium p-6 sm:p-8">
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Chrome className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-800 text-slate-500">{t('auth.orContinue')}</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('auth.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-sky-500 accent-sky-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">{t('auth.rememberMe')}</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-sky-500 hover:text-sky-600 font-medium">
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            >
              {t('auth.signIn')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="text-sky-500 hover:text-sky-600 font-medium">
            {t('auth.signUp')}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
