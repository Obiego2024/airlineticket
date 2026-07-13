import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  ArrowRight,
  Luggage,
  RotateCcw,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  Star,
  Info,
} from 'lucide-react'
import { flights, } from '../lib/data'
import { useUi } from '@/context/UiContext'

const sortOptions = [
  { label: 'Cheapest', value: 'price' },
  { label: 'Fastest', value: 'duration' },
  { label: 'Best Rating', value: 'rating' },
]

const stopsFilter = [
  { label: 'Non-stop', value: 0 },
  { label: '1 Stop', value: 1 },
  { label: '2+ Stops', value: 2 },
]

const airlinesList = [
  { label: 'Delta Air Lines', value: 'Delta Air Lines' },
  { label: 'Emirates', value: 'Emirates' },
  { label: 'British Airways', value: 'British Airways' },
  { label: 'Qatar Airways', value: 'Qatar Airways' },
]

export default function Flights({ promoRegistered = false }: { promoRegistered?: boolean }) {
  const { t } = useUi()
  const [sortBy, setSortBy] = useState('price')
  const [selectedStops, setSelectedStops] = useState<number[]>([])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2500])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCabin, setSelectedCabin] = useState<string[]>([])
  const [refundableOnly, setRefundableOnly] = useState(false)

  // Toggle selections safely
  const toggleStops = (val: number) => {
    setSelectedStops((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const toggleAirline = (val: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const toggleCabin = (val: string) => {
    setSelectedCabin((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  // Optimize and compute totals dynamically across standard datasets
  const processedData = useMemo(() => {
    const filtered = flights.filter((f) => {
      if (selectedStops.length && !selectedStops.includes(Math.min(f.stops, 2))) return false
      if (selectedAirlines.length && !selectedAirlines.includes(f.airline)) return false
      if (f.price < priceRange[0] || f.price > priceRange[1]) return false
      if (selectedCabin.length && !selectedCabin.includes(f.cabin)) return false
      if (refundableOnly && !f.refundable) return false
      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'duration') return a.duration.localeCompare(b.duration)
      return b.rating - a.rating
    })

    // Compute distribution metrics dynamically for counts label sidebar presentation
    const counts = flights.reduce(
      (acc, f) => {
        acc.stops[Math.min(f.stops, 2)] = (acc.stops[Math.min(f.stops, 2)] || 0) + 1
        acc.airlines[f.airline] = (acc.airlines[f.airline] || 0) + 1
        return acc
      },
      { stops: {} as Record<number, number>, airlines: {} as Record<string, number> }
    )

    return { sorted, counts }
  }, [selectedStops, selectedAirlines, priceRange, selectedCabin, refundableOnly, sortBy])

  const { sortedFlights, dynamicCounts } = { 
    sortedFlights: processedData.sorted, 
    dynamicCounts: processedData.counts 
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Stops Filters */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{t('flights.stops') || 'Stops'}</h4>
        <div className="space-y-2">
          {stopsFilter.map((stop) => {
            const isChecked = selectedStops.includes(stop.value)
            return (
              <label key={stop.value} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => toggleStops(stop.value)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isChecked ? 'bg-sky-500 border-sky-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-sky-400'
                    }`}
                  >
                    {isChecked && <Filter className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{stop.label}</span>
                </div>
                <span className="text-xs text-slate-400">{dynamicCounts.stops[stop.value] || 0}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{t('flights.priceRange') || 'Price Range'}</h4>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={2500}
            step={50}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>$0</span>
            <span className="font-medium text-slate-900 dark:text-white">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Real-time Global Airlines Filter */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{t('flights.airlines') || 'Airlines'}</h4>
        <div className="space-y-2">
          {airlinesList.map((airline) => {
            const isChecked = selectedAirlines.includes(airline.value)
            return (
              <label key={airline.value} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => toggleAirline(airline.value)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isChecked ? 'bg-sky-500 border-sky-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-sky-400'
                    }`}
                  >
                    {isChecked && <Filter className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{airline.label}</span>
                </div>
                <span className="text-xs text-slate-400">{dynamicCounts.airlines[airline.value] || 0}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Cabin Class */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{t('flights.cabinClass') || 'Cabin Class'}</h4>
        <div className="space-y-2">
          {['Economy', 'Business', 'First'].map((cabin) => {
            const isChecked = selectedCabin.includes(cabin)
            return (
              <label key={cabin} className="flex items-center cursor-pointer group">
                <div
                  onClick={() => toggleCabin(cabin)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all mr-3 ${
                    isChecked ? 'bg-sky-500 border-sky-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-sky-400'
                  }`}
                >
                  {isChecked && <Filter className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300">{cabin}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Refundable Options */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{t('flights.bookingOptions') || 'Booking Options'}</h4>
        <label className="flex items-center cursor-pointer group">
          <div 
            onClick={() => setRefundableOnly(!refundableOnly)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all mr-3 ${
              refundableOnly ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'
            }`}
          >
            {refundableOnly && <Filter className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">{t('flights.refundableOnly') || 'Flexible / Refundable Tickets'}</span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
      {/* Global Meta Search Routing Banner Summary */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white text-lg">Global Routes Network</span>
                <Plane className="w-4 h-4 text-sky-500 rotate-45 mx-1" />
                <span className="text-sm bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 px-2.5 py-0.5 rounded-full font-medium">10+ Destinations Per carrier</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Flexible Travel Window</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sorting controls dashboard layout row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-white">{sortedFlights.length}</span> verified flights
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium shadow-sm transition-colors hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {promoRegistered && (
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-700 px-3 py-2 text-xs font-medium">
                <Star className="w-4 h-4" />
                Registered for promo — eligible for 2% booking bonus
              </span>
            )}

            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === opt.value
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Layout Left Desktop Sticky Control sidebar panel */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>{t('flights.filters') || 'Filter Flights'}</span>
              </h3>
              <FiltersContent />
            </div>
          </aside>

          {/* Handheld Device Mobile Sidebar Slide Overlay drawer layout component */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-800 p-6 overflow-y-auto shadow-2xl border-r border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h3>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                    >
                      <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>
                  </div>
                  <FiltersContent />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Flight Route Cards Main Content Feed Panel */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {sortedFlights.map((flight, index) => (
                <motion.div
  key={flight.id}
  layoutId={String(flight.id)}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all overflow-hidden"
>
                  <div className="p-5 sm:p-6">
                    {/* Header: Carrier Details, Flight Code and Global Customer Satisfaction Index Score */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 flex items-center justify-center">
                          <Plane className="w-5 h-5 text-sky-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-base leading-tight">{flight.airline}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{flight.flightNumber} · {flight.aircraft}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/30">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{flight.rating}</span>
                      </div>
                    </div>

                    {/* Mid-Row: Direct Route Pathway Geo-Coordinates and Timing Vector Displays */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="text-left w-24 sm:w-28">
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{flight.departure.time}</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{flight.departure.code}</p>
                        <p className="text-xs text-slate-400 truncate">{flight.departure.city}</p>
                      </div>

                      <div className="flex-1 flex flex-col items-center">
                        <p className="text-xs font-semibold text-slate-400 mb-1.5">{flight.duration}</p>
                        <div className="w-full flex items-center gap-2">
                          <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                          <Plane className="w-4 h-4 text-sky-500 rotate-90 flex-shrink-0" />
                          <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                        </div>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''} via ${flight.stopCity}`}
                        </p>
                      </div>

                      <div className="text-right w-24 sm:w-28">
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{flight.arrival.time}</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{flight.arrival.code}</p>
                        <p className="text-xs text-slate-400 truncate">{flight.arrival.city}</p>
                      </div>
                    </div>

                    {/* Badges/Tags Context Row */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/60 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Luggage className="w-3 h-3" />
                        {flight.baggage}
                      </span>
                      {flight.refundable && (
                        <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 border border-emerald-100/30">
                          <RotateCcw className="w-3 h-3" />
                          Refundable
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-sky-50 dark:bg-sky-500/10 rounded-lg text-xs font-bold text-sky-600 dark:text-sky-400">
                        {flight.cabin}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        flight.seatsAvailable <= 3 
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400' 
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {flight.seatsAvailable} seats remaining
                      </span>
                    </div>

                    {/* Bottom row: Dynamic Base Fare Pricing Currency Breakdown and Action Routing Call to Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60">
                      <div>
                        <p className="text-xs font-medium text-slate-400">Total Price Per Person</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">${flight.price}</p>
                      </div>
                      <Link
                        to={`/booking/${flight.id}`}
                        className="px-5 py-2.5 bg-sky-500 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-sky-600 transition-all flex items-center gap-1.5 group"
                      >
                        <span>Select Deal</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Zero State Fallback Display */}
            {sortedFlights.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <Info className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-900 dark:text-white font-semibold">No flights found matching criteria</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mt-1">Try expanding your price cap limits, adjusting cabin settings, or resetting carrier selections.</p>
                <button
                  onClick={() => {
                    setSelectedStops([])
                    setSelectedAirlines([])
                    setPriceRange([0, 2500])
                    setSelectedCabin([])
                    setRefundableOnly(false)
                  }}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}