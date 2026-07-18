import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Eye, 
  PencilLine, 
  ShieldCheck, 
  Search, 
  Filter, 
  X, 
  Check, 
  Loader2,
  CheckCircle, // Added for Quick Approve
  Ban // Added for Quick Disapprove
} from 'lucide-react'
import { bookings as bookingsSeed } from '@/lib/adminData'

const paymentStyles: Record<string, string> = {
  Paid: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Refunded: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
}

interface Booking {
  id: string
  passengerName: string
  passport: string
  airline: string
  flight: string
  seat: string
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | string
  ticketStatus: string
}

export default function BookingsPage() {
  // --- Stateful Database ---
  const [bookings, setBookings] = useState<Booking[]>(bookingsSeed)

  // --- Search, Filtering, Pagination ---
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(8)

  // --- UI Interactivity States ---
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [downloadedId, setDownloadedId] = useState<string | null>(null)

  // --- Form Field State (For Editing) ---
  const [formFields, setFormFields] = useState({
    passengerName: '',
    passport: '',
    seat: '',
    paymentStatus: 'Pending',
    ticketStatus: 'Confirmed'
  })

  // --- Filtering Logic ---
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesQuery = `${booking.id} ${booking.passengerName} ${booking.passport} ${booking.flight}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'All' || booking.paymentStatus === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [bookings, query, statusFilter])

  const visibleBookings = useMemo(() => {
    return filteredBookings.slice(0, visibleCount)
  }, [filteredBookings, visibleCount])

  const hasMore = visibleCount < filteredBookings.length

  // --- Action Handlers ---

  // 1. Quick Approve Payment
  const handleApprovePayment = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paymentStatus: 'Paid' } : b))
    )
  }

  // 2. Quick Disapprove Payment
  const handleDisapprovePayment = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paymentStatus: 'Refunded' } : b))
    )
  }

  // 3. Download Simulator
  const handleDownload = (id: string) => {
    setDownloadingId(id)
    setTimeout(() => {
      setDownloadingId(null)
      setDownloadedId(id)
      setTimeout(() => setDownloadedId(null), 2500)
    }, 1200)
  }

  // 4. Edit Action Initialization
  const handleStartEdit = (booking: Booking) => {
    setEditingBooking(booking)
    setFormFields({
      passengerName: booking.passengerName,
      passport: booking.passport,
      seat: booking.seat,
      paymentStatus: booking.paymentStatus,
      ticketStatus: booking.ticketStatus
    })
  }

  // 5. Edit Form Submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBooking) return

    setBookings((prev) =>
      prev.map((b) =>
        b.id === editingBooking.id
          ? { ...b, ...formFields }
          : b
      )
    )
    setEditingBooking(null)
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Header & Search */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Booking management</p>
            <h1 className="mt-2 font-display text-2xl font-semibold">Review passenger reservations</h1>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {filteredBookings.length} match{filteredBookings.length !== 1 && 'es'} found
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <Search className="h-4 w-4" />
            <input 
              value={query} 
              onChange={(e) => { setQuery(e.target.value); setVisibleCount(8); }} 
              placeholder="Search by name, ID, or flight number" 
              className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100" 
            />
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <Filter className="h-4 w-4" />
            <select 
              value={statusFilter} 
              onChange={(e) => { setStatusFilter(e.target.value); setVisibleCount(8); }} 
              className="bg-transparent outline-none cursor-pointer pr-4 font-medium text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Refunded">Refunded Only</option>
            </select>
          </label>
        </div>
      </motion.div>

      {/* Bookings Display Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {visibleBookings.map((booking, index) => (
            <motion.div 
              key={booking.id} 
              layout
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(index * 0.02, 0.15) }} 
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{booking.id}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{booking.passengerName} • {booking.passport}</p>
                  </div>
                </div>

                <div className="grid flex-1 gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
                  <div><span className="text-slate-500">Airline:</span> {booking.airline}</div>
                  <div><span className="text-slate-500">Flight:</span> {booking.flight}</div>
                  <div><span className="text-slate-500">Seat:</span> {booking.seat}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStyles[booking.paymentStatus] || 'bg-slate-100 text-slate-600'}`}>
                    {booking.paymentStatus}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {booking.ticketStatus}
                  </span>

                  {/* Divider line before actions */}
                  <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />
                  
                  {/* Quick Admin Actions (Only show when Pending) */}
                  {booking.paymentStatus === 'Pending' && (
                    <div className="flex items-center gap-1.5 mr-1">
                      <button
                        onClick={() => handleApprovePayment(booking.id)}
                        className="flex items-center gap-1 rounded-2xl border border-emerald-200 bg-emerald-50/50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-400 dark:hover:bg-emerald-500/10 transition-colors"
                        title="Approve Payment"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleDisapprovePayment(booking.id)}
                        className="flex items-center gap-1 rounded-2xl border border-rose-200 bg-rose-50/50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/5 dark:text-rose-400 dark:hover:bg-rose-500/10 transition-colors"
                        title="Disapprove Payment"
                      >
                        <Ban className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                        <span>Disapprove</span>
                      </button>
                    </div>
                  )}
                  
                  {/* View Details button */}
                  <button 
                    onClick={() => setSelectedBooking(booking)}
                    className="rounded-2xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                    title="View Passenger Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  {/* Edit button */}
                  <button 
                    onClick={() => handleStartEdit(booking)}
                    className="rounded-2xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                    title="Edit Booking Info"
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>

                  {/* Simulated Download button */}
                  <button 
                    onClick={() => handleDownload(booking.id)}
                    disabled={downloadingId === booking.id}
                    className={`rounded-2xl border p-2.5 transition-all ${
                      downloadedId === booking.id 
                        ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                    title="Download E-Ticket"
                  >
                    {downloadingId === booking.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : downloadedId === booking.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 py-16 text-center dark:border-slate-800">
            <Search className="h-8 w-8 text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">No bookings found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Modify your search query or clear the payment filter.</p>
          </motion.div>
        )}
      </div>

      {/* Dynamic Load More Footer */}
      {filteredBookings.length > 0 && (
        <div className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{visibleBookings.length}</span> of <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredBookings.length}</span> reservations
          </p>
          {hasMore ? (
            <button onClick={() => setVisibleCount((prev) => prev + 6)} className="rounded-2xl border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
              Load more
            </button>
          ) : (
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">All reservations loaded</span>
          )}
        </div>
      )}

      {/* --- View Ticket Modal --- */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBooking(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Boarding Pass Info</h3>
                <button onClick={() => setSelectedBooking(null)} className="rounded-xl p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="mt-4 space-y-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/30">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Booking ID</span>
                  <span className="text-sm font-mono font-semibold text-blue-600">{selectedBooking.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Passenger</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedBooking.passengerName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Passport</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedBooking.passport}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Airline</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedBooking.airline}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Flight Code</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedBooking.flight}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Seat Assignment</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedBooking.seat}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Ticket Status</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{selectedBooking.ticketStatus}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="mt-6 w-full rounded-2xl bg-slate-900 py-3 font-semibold text-white dark:bg-slate-800 dark:hover:bg-slate-750">
                Close Ticket View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Edit Modal --- */}
      <AnimatePresence>
        {editingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingBooking(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Edit Booking Reservation</h3>
                <button onClick={() => setEditingBooking(null)} className="rounded-xl p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase">Passenger Name</label>
                  <input 
                    required 
                    value={formFields.passengerName} 
                    onChange={(e) => setFormFields(prev => ({ ...prev, passengerName: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Passport</label>
                    <input 
                      required 
                      value={formFields.passport} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, passport: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Seat</label>
                    <input 
                      required 
                      value={formFields.seat} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, seat: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Payment Status</label>
                    <select 
                      value={formFields.paymentStatus} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, paymentStatus: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Refunded</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Ticket Status</label>
                    <select 
                      value={formFields.ticketStatus} 
                      onChange={(e) => setFormFields(prev => ({ ...prev, ticketStatus: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option>Confirmed</option>
                      <option>Check-in Open</option>
                      <option>Boarding</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingBooking(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                    Cancel
                  </button>
                  <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-md">
                    Save Updates
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