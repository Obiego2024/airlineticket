import { motion } from 'framer-motion'
import { Lock, Activity } from 'lucide-react'
import { notifications } from '@/lib/adminData'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-sky-500 text-xl font-semibold text-white">AW</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Admin profile</p>
              <h1 className="mt-1 font-display text-2xl font-semibold">Amara Wells</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">amara.wells@northstarair.com</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">2FA enabled</div>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            <h2 className="font-display text-xl font-semibold">Security settings</h2>
          </div>
          <div className="mt-6 space-y-4">
            <label className="block text-sm text-slate-600 dark:text-slate-300">
              <span className="mb-2 block font-medium">Current password</span>
              <input type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none dark:border-slate-800 dark:bg-slate-950" />
            </label>
            <label className="block text-sm text-slate-600 dark:text-slate-300">
              <span className="mb-2 block font-medium">New password</span>
              <input type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none dark:border-slate-800 dark:bg-slate-950" />
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Two-factor authentication</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Secures account access instantly</p>
              </div>
              <button className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white">Enabled</button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <h2 className="font-display text-xl font-semibold">Activity log</h2>
          </div>
          <div className="mt-6 space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
