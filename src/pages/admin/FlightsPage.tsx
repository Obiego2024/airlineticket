import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, PencilLine, Trash2, Copy, Check, PlaneTakeoff, X, DollarSign } from 'lucide-react'
import { flights as flightSeed, airlines } from '@/lib/adminData'

const statusStyles: Record<string, string> = {
  Scheduled: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20',
  Delayed: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20',
  Boarding: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400 border border-sky-200/50 dark:border-sky-500/20',
  Cancelled: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20',
}

interface Flight {
  id: string
  flightNumber: string
  airlineId: string | number 
  airlineName: string
  departureCity: string
  arrivalCity: string
  departureAirport: string
  arrivalAirport: string
  departureDate: string
  departureTime: string
  availableSeats: number
  totalSeats: number
  cabinClass: string
  status: string
  price: number // Added price support
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>(() =>
    flightSeed.map((flight) => ({
      id: String(flight.id),
      flightNumber: flight.flightNumber,
      airlineId: flight.airlineId,
      airlineName: flight.airlineName,
      departureCity: flight.departureCity,
      arrivalCity: flight.arrivalCity,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      departureDate: flight.departureDate,
      departureTime: flight.departureTime,
      availableSeats: flight.availableSeats,
      totalSeats: flight.totalSeats,
      cabinClass: flight.cabinClass,
      status: flight.status,
      price: (flight as any).price || 299, // Fallback if not inside your seed database
    }))
  )
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [visibleCount, setVisibleCount] = useState(8)

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null)
  const [deletingFlightId, setDeletingFlightId] = useState<string | null>(null)

  const [formFields, setFormFields] = useState<{
    flightNumber: string
    airlineId: string | number
    departureCity: string
    arrivalCity: string
    departureAirport: string
    arrivalAirport: string
    departureDate: string
    departureTime: string
    totalSeats: number
    cabinClass: string
    status: string
    price: number // State integration for price
  }>({
    flightNumber: '',
    airlineId: airlines[0]?.id ?? '',
    departureCity: '',
    arrivalCity: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: new Date().toISOString().split('T')[0],
    departureTime: '12:00',
    totalSeats: 180,
    cabinClass: 'Economy',
    status: 'Scheduled',
    price: 299
  })

  const airlineMap = useMemo(() => {
    return new Map<string | number, (typeof airlines)[number]>(airlines.map((airline) => [airline.id, airline]))
  }, [])

  const normalizeAirlineId = (value: string | number | undefined) => {
    if (value === undefined || value === '') return undefined
    const numericValue = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(numericValue) ? numericValue : undefined
  }

  const allFilteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchesQuery = `${flight.flightNumber} ${flight.airlineName} ${flight.departureCity} ${flight.arrivalCity}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesStatus = status === 'All' || flight.status === status
      return matchesQuery && matchesStatus
    })
  }, [flights, query, status])

  const visibleFlights = useMemo(() => {
    return allFilteredFlights.slice(0, visibleCount)
  }, [allFilteredFlights, visibleCount])

  const hasMore = visibleCount < allFilteredFlights.length

  const handleCopyRoute = (flight: Flight) => {
    const routeText = `${flight.flightNumber}: ${flight.departureCity} (${flight.departureAirport}) → ${flight.arrivalCity} (${flight.arrivalAirport}) - $${flight.price}`
    navigator.clipboard.writeText(routeText).then(() => {
      setCopiedId(flight.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const openFormModal = (flight: Flight | null = null) => {
    if (flight) {
      setEditingFlight(flight)
      setFormFields({
        flightNumber: flight.flightNumber,
        airlineId: flight.airlineId,
        departureCity: flight.departureCity,
        arrivalCity: flight.arrivalCity,
        departureAirport: flight.departureAirport,
        arrivalAirport: flight.arrivalAirport,
        departureDate: flight.departureDate,
        departureTime: flight.departureTime,
        totalSeats: flight.totalSeats,
        cabinClass: flight.cabinClass,
        status: flight.status,
        price: flight.price
      })
    } else {
      setEditingFlight(null)
      setFormFields({
        flightNumber: `FL${Math.floor(100 + Math.random() * 900)}`,
        airlineId: airlines[0]?.id ?? '',
        departureCity: '',
        arrivalCity: '',
        departureAirport: '',
        arrivalAirport: '',
        departureDate: new Date().toISOString().split('T')[0],
        departureTime: '12:00',
        totalSeats: 180,
        cabinClass: 'Economy',
        status: 'Scheduled',
        price: 299
      })
    }
    setIsModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const parsedSeats = Number(formFields.totalSeats) || 180
    const parsedPrice = Number(formFields.price) || 0
    const normalizedAirlineId = normalizeAirlineId(formFields.airlineId)
    const targetAirline = normalizedAirlineId !== undefined ? airlineMap.get(normalizedAirlineId) : undefined

    if (editingFlight) {
      setFlights((prev) =>
        prev.map((flight) =>
          flight.id === editingFlight.id
            ? {
                ...flight,
                ...formFields,
                totalSeats: parsedSeats,
                price: parsedPrice,
                airlineName: targetAirline?.name || 'Unknown Airline',
                availableSeats: Math.min(flight.availableSeats, parsedSeats),
              }
            : flight
        )
      )
    } else {
      const newFlight: Flight = {
        ...formFields,
        id: crypto.randomUUID() as string, 
        totalSeats: parsedSeats,
        price: parsedPrice,
        airlineName: targetAirline?.name || 'Unknown Airline',
        availableSeats: parsedSeats,
      }
      setFlights((prev) => [newFlight, ...prev])
    }
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (deletingFlightId) {
      setFlights((prev) => prev.filter((f) => f.id !== deletingFlightId))
      setDeletingFlightId(null)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Flight management</p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Premium Route Dispatch</h1>
          </div>
          <button 
            onClick={() => openFormModal(null)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-sm text-white shadow-lg shadow-blue-600/15 hover:bg-blue-700 transition-all hover:shadow-blue-600/25 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" /> Add Flight
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-500/10 transition-all">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              value={query} 
              onChange={(e) => { setQuery(e.target.value); setVisibleCount(8); }} 
              placeholder="Search by flight, airline, or city..." 
              className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400" 
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <Filter className="h-4 w-4 text-slate-400" />
            <select 
              value={status} 
              onChange={(e) => { setStatus(e.target.value); setVisibleCount(8); }} 
              className="bg-transparent outline-none cursor-pointer pr-4 font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Delayed">Delayed</option>
              <option value="Boarding">Boarding</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>
      </motion.div>

      {/* Flight Cards Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {visibleFlights.map((flight, index) => {
            const airlineId = normalizeAirlineId(flight.airlineId)
            const airline = airlineId !== undefined ? airlineMap.get(airlineId) : undefined
            
            return (
              <motion.div 
                key={flight.id} 
                layout
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.15) }} 
                className="group relative overflow-hidden rounded-[20px] border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-200/80 dark:border-slate-800/50 dark:bg-slate-900 dark:hover:border-slate-800"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left: Airline and Route Details */}
                  <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50/80 font-bold text-blue-600 dark:bg-blue-500/5">
                      {airline?.logo || <PlaneTakeoff className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold tracking-tight text-slate-950 dark:text-white">{flight.flightNumber}</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[flight.status] || 'bg-slate-100 text-slate-600'}`}>
                          {flight.status}
                        </span>
                        <span className="rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                          {flight.cabinClass}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {flight.departureCity} <span className="text-slate-400 font-normal">({flight.departureAirport})</span>
                        <span className="mx-2 text-slate-300">→</span> 
                        {flight.arrivalCity} <span className="text-slate-400 font-normal">({flight.arrivalAirport})</span>
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{flight.airlineName}</p>
                    </div>
                  </div>
                  
                  {/* Middle: Grid Details */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4 text-sm lg:border-t-0 lg:pt-0 sm:grid-cols-3 lg:flex lg:gap-8">
                    <div>
                      <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Departure</span>
                      <span className="mt-0.5 block font-semibold text-slate-700 dark:text-slate-200">{flight.departureDate} &bull; {flight.departureTime}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Capacity</span>
                      <span className="mt-0.5 block font-semibold text-slate-700 dark:text-slate-200">{flight.availableSeats} / {flight.totalSeats} <span className="text-xs text-slate-400 font-normal">left</span></span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Base Price</span>
                      <span className="mt-0.5 block text-lg font-bold text-slate-950 dark:text-white">${flight.price}</span>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-1.5 border-t border-slate-50 pt-4 lg:border-t-0 lg:pt-0 justify-end">
                    <button 
                      onClick={() => handleCopyRoute(flight)}
                      className={`rounded-xl border p-2 transition-all ${copiedId === flight.id ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}`}
                      title="Copy Route Details"
                    >
                      {copiedId === flight.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => openFormModal(flight)}
                      className="rounded-xl border border-slate-100 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-all"
                      title="Edit Flight"
                    >
                      <PencilLine className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setDeletingFlightId(flight.id)}
                      className="rounded-xl border border-slate-100 p-2 text-rose-500 hover:bg-rose-50/50 hover:border-rose-100 dark:border-slate-800 dark:hover:bg-rose-950/20 dark:hover:border-rose-900/40 transition-all"
                      title="Delete Flight"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Empty State */}
        {allFilteredFlights.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 py-16 text-center dark:border-slate-800">
            <Search className="h-8 w-8 text-slate-300" />
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">No active schedules</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try modifying your query or status filters.</p>
          </motion.div>
        )}
      </div>

      {/* Footer & Load More */}
      {allFilteredFlights.length > 0 && (
        <div className="flex items-center justify-between rounded-[20px] border border-slate-100 bg-white px-5 py-4 text-sm shadow-sm dark:border-slate-800/60 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{visibleFlights.length}</span> of <span className="font-semibold text-slate-800 dark:text-slate-200">{allFilteredFlights.length}</span> routes
          </p>
          {hasMore ? (
            <button onClick={() => setVisibleCount((prev) => prev + 6)} className="rounded-xl border border-slate-100 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-all">
              Load more
            </button>
          ) : (
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Max limits reached</span>
          )}
        </div>
      )}

      {/* Add / Edit Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-[24px] border border-slate-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  {editingFlight ? 'Edit Flight Schedule' : 'Schedule New Flight'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="rounded-xl p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Flight Code</label>
                    <input 
                      required
                      value={formFields.flightNumber} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, flightNumber: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Airline</label>
                    <select 
                      value={formFields.airlineId} 
                      onChange={(e) => {
                        const val = e.target.value
                        const isNumeric = !isNaN(Number(val)) && val.trim() !== ''
                        setFormFields(prev => ({ 
                          ...prev, 
                          airlineId: isNumeric ? Number(val) : val 
                        }))
                      }}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {airlines.map((airline) => (
                        <option key={airline.id} value={airline.id}>{airline.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Origin City</label>
                    <input 
                      required
                      placeholder="e.g. New York"
                      value={formFields.departureCity} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, departureCity: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Dest. City</label>
                    <input 
                      required
                      placeholder="e.g. London"
                      value={formFields.arrivalCity} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, arrivalCity: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Departure Airport</label>
                    <input 
                      required
                      placeholder="JFK"
                      value={formFields.departureAirport} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, departureAirport: e.target.value.toUpperCase() }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Arrival Airport</label>
                    <input 
                      required
                      placeholder="LHR"
                      value={formFields.arrivalAirport} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, arrivalAirport: e.target.value.toUpperCase() }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Departure Date</label>
                    <input 
                      type="date"
                      value={formFields.departureDate} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, departureDate: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Departure Time</label>
                    <input 
                      type="time"
                      value={formFields.departureTime} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, departureTime: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Seats</label>
                    <input 
                      type="number"
                      value={formFields.totalSeats} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, totalSeats: Number(e.target.value) }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Cabin Class</label>
                    <select 
                      value={formFields.cabinClass} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, cabinClass: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Status</label>
                    <select 
                      value={formFields.status} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, status: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option>Scheduled</option>
                      <option>Delayed</option>
                      <option>Boarding</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Price Input Form Field */}
                <div className="relative">
                  <label className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Route Ticket Price (USD)</label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="number"
                      required
                      min="0"
                      value={formFields.price} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2 pl-9 pr-3 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-colors"
                  >
                    {editingFlight ? 'Save Changes' : 'Schedule Flight'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deletingFlightId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setDeletingFlightId(null)} 
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-base font-bold text-slate-950 dark:text-white">Delete Flight Schedule?</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to remove this flight? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button 
                  onClick={() => setDeletingFlightId(null)}
                  className="rounded-xl border border-slate-100 px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}