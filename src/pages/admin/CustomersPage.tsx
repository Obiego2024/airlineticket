import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Search } from 'lucide-react'
import { customers as seedCustomers, type AdminCustomer } from '@/lib/adminData'

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [registeredCustomers, setRegisteredCustomers] = useState<AdminCustomer[]>(() => {
    if (typeof window === 'undefined') return seedCustomers

    const stored = window.localStorage.getItem('adminRegisteredCustomers')
    if (!stored) return seedCustomers

    try {
      return JSON.parse(stored) as AdminCustomer[]
    } catch {
      return seedCustomers
    }
  })

  useEffect(() => {
    window.localStorage.setItem('adminRegisteredCustomers', JSON.stringify(registeredCustomers))
  }, [registeredCustomers])

  useEffect(() => {
    const stored = window.localStorage.getItem('adminRegisteredCustomers')
    if (!stored) {
      window.localStorage.setItem('adminRegisteredCustomers', JSON.stringify(seedCustomers))
    }
  }, [])

  const visibleCustomers = useMemo(() => {
    const term = search.toLowerCase()
    return registeredCustomers.filter((customer) => {
      return [customer.name, customer.email, customer.country].some((value) => value.toLowerCase().includes(term))
    })
  }, [registeredCustomers, search])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Customer intelligence</p>
            <h1 className="mt-2 font-display text-2xl font-semibold">Understand traveler values</h1>
          </div>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <Search className="h-4 w-4" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers"
              className="w-full bg-transparent outline-none"
            />
          </label>
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {visibleCustomers.map((customer, index) => (
          <motion.div key={customer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <img src={customer.avatar} alt={customer.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white">{customer.name}</p>
                  {customer.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{customer.email}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              <div><span className="text-slate-500">Phone:</span> {customer.phone}</div>
              <div><span className="text-slate-500">Country:</span> {customer.country}</div>
              <div><span className="text-slate-500">Bookings:</span> {customer.bookings}</div>
              <div><span className="text-slate-500">Spend:</span> {customer.spend}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
