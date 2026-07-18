import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, PencilLine, Trash2, Search, X } from 'lucide-react'
import { airlines as airlineSeed } from '@/lib/adminData'

interface Airline {
  id: string | number
  name: string
  code: string
  country: string
  logo: string
  status: 'Active' | 'Inactive' | string
  fleetSize: number
  website: string
  email: string
  phone: string
}

export default function AirlinesPage() {
  // --- Stateful Database ---
  const [airlines, setAirlines] = useState<Airline[]>(airlineSeed)
  const [query, setQuery] = useState('')

  // --- UI Interactivity States ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAirline, setEditingAirline] = useState<Airline | null>(null)
  const [deletingAirlineId, setDeletingAirlineId] = useState<string | number | null>(null)

  // --- Unified Form State (Add/Edit) ---
  const [formFields, setFormFields] = useState({
    name: '',
    code: '',
    country: '',
    logo: '✈️',
    status: 'Active',
    fleetSize: 10,
    website: '',
    email: '',
    phone: ''
  })

  // --- Filtering ---
  const filteredAirlines = useMemo(() => {
    return airlines.filter((airline) => 
      `${airline.name} ${airline.country} ${airline.code}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [airlines, query])

  // --- Action Handlers ---

  // Initialize form for Add or Edit
  const openFormModal = (airline: Airline | null = null) => {
    if (airline) {
      setEditingAirline(airline)
      setFormFields({
        name: airline.name,
        code: airline.code,
        country: airline.country,
        logo: airline.logo,
        status: airline.status,
        fleetSize: airline.fleetSize,
        website: airline.website,
        email: airline.email,
        phone: airline.phone
      })
    } else {
      setEditingAirline(null)
      setFormFields({
        name: '',
        code: '',
        country: '',
        logo: '✈️',
        status: 'Active',
        fleetSize: 1,
        website: 'https://',
        email: '',
        phone: ''
      })
    }
    setIsModalOpen(true)
  }

  // Handle Form Submission (Add/Edit save)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fleetParsed = Number(formFields.fleetSize) || 1

    if (editingAirline) {
      // Edit mode
      setAirlines((prev) =>
        prev.map((airline) =>
          airline.id === editingAirline.id
            ? { ...airline, ...formFields, fleetSize: fleetParsed }
            : airline
        )
      )
    } else {
      // Add mode
      const newAirline: Airline = {
        id: crypto.randomUUID(),
        ...formFields,
        fleetSize: fleetParsed
      }
      setAirlines((prev) => [newAirline, ...prev])
    }
    setIsModalOpen(false)
  }

  // Confirm and Execute Deletion
  const handleDeleteConfirm = () => {
    if (deletingAirlineId !== null) {
      setAirlines((prev) => prev.filter((airline) => airline.id !== deletingAirlineId))
      setDeletingAirlineId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Airline management</p>
            <h1 className="mt-2 font-display text-2xl font-semibold">Manage partner carriers</h1>
          </div>
          <button 
            onClick={() => openFormModal(null)}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add Airline
          </button>
        </div>
        <label className="mt-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          <Search className="h-4 w-4" />
          <input 
            value={query} 
            onChange={(event) => setQuery(event.target.value)} 
            placeholder="Search airlines by name, country, or code..." 
            className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100" 
          />
        </label>
      </motion.div>

      {/* Grid List */}
      <div className="grid gap-4 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredAirlines.map((airline) => (
            <motion.div 
              key={airline.id} 
              layout
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {airline.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{airline.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{airline.code} • {airline.country}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${airline.status === 'Active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                  {airline.status}
                </span>
              </div>
              
              <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                <div><span className="text-slate-500">Fleet size:</span> {airline.fleetSize}</div>
                <div><span className="text-slate-500">Website:</span> <span className="underline cursor-pointer text-blue-500">{airline.website}</span></div>
                <div><span className="text-slate-500">Email:</span> {airline.email}</div>
                <div><span className="text-slate-500">Phone:</span> {airline.phone}</div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <button 
                  onClick={() => openFormModal(airline)}
                  className="rounded-2xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  title="Edit Partner Profile"
                >
                  <PencilLine className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setDeletingAirlineId(airline.id)}
                  className="rounded-2xl border border-slate-200 p-2.5 text-rose-600 hover:bg-rose-50 dark:border-slate-800 dark:hover:bg-rose-950/30 transition-colors"
                  title="Remove Partner Carrier"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty Search State */}
        {filteredAirlines.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 py-16 text-center dark:border-slate-800">
            <Search className="h-8 w-8 text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">No partner carriers found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Modify your query to filter alternative airlines.</p>
          </motion.div>
        )}
      </div>

      {/* --- Unified Form Modal (Add / Edit) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative z-10 w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {editingAirline ? 'Edit Airline Profile' : 'Register Partner Airline'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="rounded-xl p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Airline Name</label>
                    <input 
                      required
                      placeholder="e.g. Skyline Express"
                      value={formFields.name} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">IATA Code</label>
                    <input 
                      required
                      placeholder="e.g. SK"
                      value={formFields.code} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Base Country</label>
                    <input 
                      required
                      placeholder="e.g. United Kingdom"
                      value={formFields.country} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, country: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Logo Emoji / Icon</label>
                    <input 
                      value={formFields.logo} 
                      placeholder="✈️"
                      onChange={(e) => setFormFields(prev => ({ ...prev, logo: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none text-center" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Fleet Size</label>
                    <input 
                      type="number"
                      value={formFields.fleetSize} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, fleetSize: Number(e.target.value) }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Status</label>
                    <select 
                      value={formFields.status} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, status: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase">Website URL</label>
                  <input 
                    placeholder="https://"
                    value={formFields.website} 
                    onChange={(e) => setFormFields(prev => ({ ...prev, website: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Support Email</label>
                    <input 
                      type="email"
                      placeholder="ops@airline.com"
                      value={formFields.email} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Hotline Phone</label>
                    <input 
                      placeholder="+1 (555) 019-2834"
                      value={formFields.phone} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-md"
                  >
                    {editingAirline ? 'Save Profile' : 'Register Airline'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Delete Confirmation Overlay --- */}
      <AnimatePresence>
        {deletingAirlineId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeletingAirlineId(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Remove Airline Partner?</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to terminate partnership terms with this carrier? All mapped flights may lose associated logos.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button 
                  onClick={() => setDeletingAirlineId(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}