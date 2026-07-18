import { motion } from 'framer-motion'
import { Plus, PencilLine, Trash2 } from 'lucide-react'
import { promoCodes } from '@/lib/adminData'

export default function PromosPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Promo management</p>
            <h1 className="mt-2 font-display text-2xl font-semibold">Launch and manage offers</h1>
          </div>
          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-600/20">
            <Plus className="h-4 w-4" /> Create Promo
          </button>
        </div>
      </motion.div>

      <div className="grid gap-4">
        {promoCodes.map((promo, index) => (
          <motion.div key={promo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{promo.code}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{promo.type} • {promo.value}{promo.type === 'Percentage' ? '%' : ' USD'}</p>
              </div>
              <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
                <div><span className="text-slate-500">Expiry:</span> {promo.expiry}</div>
                <div><span className="text-slate-500">Usage:</span> {promo.usage}</div>
                <div><span className="text-slate-500">Status:</span> {promo.status}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-2xl border border-slate-200 p-2.5 text-slate-600 dark:border-slate-800 dark:text-slate-300"><PencilLine className="h-4 w-4" /></button>
                <button className="rounded-2xl border border-slate-200 p-2.5 text-rose-600 dark:border-slate-800"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
