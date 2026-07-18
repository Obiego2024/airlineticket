import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, AlertCircle, Coins, CreditCard, Landmark, Check, Hash } from 'lucide-react'
import { paymentMethods as paymentSeed } from '@/lib/adminData'

interface PaymentMethod {
  id: string | number
  name: string
  type: 'Bank' | 'Gateway' | 'Crypto'
  details: string
  enabled: boolean
  fee?: string 
  currencies?: string 
  // Bank-specific fields
  bankName?: string
  accountNumber?: string
  accountName?: string
  routingNumber?: string
}

export default function PaymentsPage() {
  // --- Stateful Database ---
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentSeed)

  // --- UI Interactivity States ---
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // --- Modal Form State ---
  const [formFields, setFormFields] = useState({
    name: '',
    details: '',
    fee: '0.0%',
    currencies: 'USD, EUR, GBP',
    // Bank details
    bankName: '',
    accountNumber: '',
    accountName: '',
    routingNumber: ''
  })

  // --- Toggle Handler ---
  const handleToggle = (id: string | number) => {
    setMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    )
  }

  // --- Open Edit Modal ---
  const handleOpenEdit = (method: PaymentMethod) => {
    setEditingMethod(method)
    setFormFields({
      name: method.name,
      details: method.details,
      fee: method.fee || '1.5%',
      currencies: method.currencies || 'USD, EUR, GBP',
      bankName: method.bankName || '',
      accountNumber: method.accountNumber || '',
      accountName: method.accountName || '',
      routingNumber: method.routingNumber || ''
    })
    setIsModalOpen(true)
  }

  // --- Form Submit Handler ---
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMethod) return

    setMethods((prev) =>
      prev.map((method) =>
        method.id === editingMethod.id
          ? { ...method, ...formFields }
          : method
      )
    )
    setIsModalOpen(false)
  }

  // Dynamic Count
  const activeCount = methods.filter((method) => method.enabled).length

  // Helper to render platform-specific payment icons
  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'Bank':
        return <Landmark className="h-5 w-5 text-blue-500" />
      case 'Crypto':
        return <Coins className="h-5 w-5 text-amber-500" />
      default:
        return <CreditCard className="h-5 w-5 text-emerald-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Counters */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Payment Configuration</p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settlement Channels</h1>
          </div>
          <div className="self-start rounded-full bg-slate-50 border border-slate-100 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            {activeCount} active channel{activeCount !== 1 && 's'}
          </div>
        </div>
      </motion.div>

      {/* Payment Channels Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {methods.map((method, index) => (
            <motion.div 
              key={method.id} 
              layout
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.03 }} 
              className={`group rounded-2xl border p-5 shadow-sm transition-all duration-300 ${
                method.enabled 
                  ? 'border-emerald-500/20 bg-emerald-50/5 dark:border-emerald-500/10 dark:bg-emerald-950/5' 
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${
                    method.enabled 
                      ? 'bg-emerald-500/10 border-emerald-500/10' 
                      : 'bg-slate-50 border-slate-100 dark:bg-slate-800/30 dark:border-slate-800'
                  }`}>
                    {getMethodIcon(method.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-2">
                      <p className="font-semibold text-slate-900 dark:text-white">{method.name}</p>
                      {method.enabled && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-800 dark:text-emerald-400">
                          <Sparkles className="h-2.5 w-2.5" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-mono text-[13px]">{method.details}</p>
                    
                    {/* Render Bank Account Details Summary on Card if configured */}
                    {method.type === 'Bank' && method.accountNumber && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
                        <Hash className="h-3.5 w-3.5" />
                        <span>{method.bankName || 'Bank'} • •••• {method.accountNumber.slice(-4)}</span>
                      </div>
                    )}

                    {/* Dynamic Metadata Badges */}
                    <div className="pt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
                      <div>
                        <span className="font-medium text-slate-400 dark:text-slate-500">Fee:</span> <span className="font-semibold text-slate-600 dark:text-slate-300">{method.fee || '1.2% + $0.30'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-400 dark:text-slate-500">Settles:</span> <span className="font-semibold text-slate-600 dark:text-slate-300">{method.currencies || 'USD, EUR, GBP'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-100 dark:border-slate-800/50 pt-4 sm:pt-0 sm:border-0">
                  <button 
                    onClick={() => handleOpenEdit(method)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 transition-colors shadow-sm"
                  >
                    Configure
                  </button>
                  
                  {/* Custom Smooth Sliding Switch */}
                  <button 
                    onClick={() => handleToggle(method.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      method.enabled ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                    aria-label={`Toggle ${method.name}`}
                  >
                    <span
                      className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        method.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    >
                      {method.enabled && (
                        <Check className="h-3 w-3 text-emerald-600 absolute inset-0 m-auto" />
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- Advanced Configuration Modal --- */}
      <AnimatePresence>
        {isModalOpen && editingMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {editingMethod.type === 'Bank' ? 'Configure Bank Transfer' : 'Configure Gateway'}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {editingMethod.type === 'Bank' ? 'Manual billing settlement coordinates' : 'Parameters for live transaction routing'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                {/* Standard Fields */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Method Name</label>
                  <input 
                    required
                    value={formFields.name} 
                    onChange={(e) => setFormFields(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Payment Instructions / Description</label>
                  <textarea 
                    required
                    rows={2}
                    value={formFields.details} 
                    onChange={(e) => setFormFields(prev => ({ ...prev, details: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" 
                  />
                </div>

                {/* Conditional BANK Details Fields */}
                {editingMethod.type === 'Bank' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 border-t border-b border-slate-100 dark:border-slate-800/60 py-4 my-2"
                  >
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Receiving Bank Details</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bank Name</label>
                        <input 
                          required={editingMethod.type === 'Bank'}
                          placeholder="e.g. Chase Bank"
                          value={formFields.bankName} 
                          onChange={(e) => setFormFields(prev => ({ ...prev, bankName: e.target.value }))}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Routing / Sort Code</label>
                        <input 
                          placeholder="e.g. 123456789"
                          value={formFields.routingNumber} 
                          onChange={(e) => setFormFields(prev => ({ ...prev, routingNumber: e.target.value }))}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Number</label>
                        <input 
                          required={editingMethod.type === 'Bank'}
                          placeholder="e.g. 9876543210"
                          value={formFields.accountNumber} 
                          onChange={(e) => setFormFields(prev => ({ ...prev, accountNumber: e.target.value }))}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account Holder Name</label>
                        <input 
                          required={editingMethod.type === 'Bank'}
                          placeholder="e.g. Acme Corp LLC"
                          value={formFields.accountName} 
                          onChange={(e) => setFormFields(prev => ({ ...prev, accountName: e.target.value }))}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Transaction Fee</label>
                    <input 
                      placeholder="e.g. 1.5% + $0.30"
                      value={formFields.fee} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, fee: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Settles In</label>
                    <input 
                      placeholder="USD, EUR, GBP"
                      value={formFields.currencies} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, currencies: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                    />
                  </div>
                </div>

                {/* Gateway Warning (Only shows for non-Bank methods) */}
                {editingMethod.type !== 'Bank' ? (
                  <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-4 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-400/90">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Settlement Verification Required</p>
                      <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">Ensure API key mapping and target credentials match database definitions before enabling routing.</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-blue-500/5 border border-blue-500/10 p-4 flex items-start gap-3 text-xs text-blue-700 dark:text-blue-400/90">
                    <Landmark className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Manual Verification Channel</p>
                      <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">Ensure bank coordinates are correct. Customers will see this exact configuration when checking out.</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-5 py-2.5 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 shadow transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}