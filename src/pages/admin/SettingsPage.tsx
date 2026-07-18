import { motion } from 'framer-motion'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">System settings</p>
          <h1 className="mt-2 font-display text-2xl font-semibold">Tune the operator experience</h1>
        </div>
      </motion.div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block text-sm text-slate-600 dark:text-slate-300">
            <span className="mb-2 block font-medium">Company name</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none dark:border-slate-800 dark:bg-slate-950" defaultValue="Northstar Air Admin" />
          </label>
          <label className="block text-sm text-slate-600 dark:text-slate-300">
            <span className="mb-2 block font-medium">Support email</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none dark:border-slate-800 dark:bg-slate-950" defaultValue="ops@northstarair.com" />
          </label>
          <label className="block text-sm text-slate-600 dark:text-slate-300">
            <span className="mb-2 block font-medium">Currency</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none dark:border-slate-800 dark:bg-slate-950" defaultValue="USD" />
          </label>
          <label className="block text-sm text-slate-600 dark:text-slate-300">
            <span className="mb-2 block font-medium">Timezone</span>
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none dark:border-slate-800 dark:bg-slate-950" defaultValue="UTC" />
          </label>
        </div>
        <button className="mt-6 flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-600/20">
          <Save className="h-4 w-4" /> Save changes
        </button>
      </div>
    </div>
  )
}
