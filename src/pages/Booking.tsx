import { useState, useRef } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
// Import html2canvas and jspdf for device-level downloading
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import {
  Plane,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Armchair,
  Package,
  CreditCard,
  BadgeCheck,
  Luggage,
  Utensils,
  Zap,
  Shield,
  Coffee,
  Wifi,
  Building,
  Car,
  DollarSign,
  Building2,
  Clock,
  ShieldAlert,
  Printer,
  Briefcase,
  Download
} from 'lucide-react'
import { flights, generateSeats, extras } from '../lib/data'
import type { Seat } from '../lib/data'

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", 
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", 
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
  "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", 
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const steps = [
  { id: 'passenger', label: 'Passengers', icon: User },
  { id: 'seats', label: 'Seats', icon: Armchair },
  { id: 'extras', label: 'Extras', icon: Package },
  { id: 'payment', label: 'Payment', icon: CreditCard },
]

const seatTypeStyles: Record<string, string> = {
  available: 'bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/20 cursor-pointer',
  occupied: 'bg-slate-200 dark:bg-slate-700 border-slate-200 dark:border-slate-600 cursor-not-allowed opacity-50',
  premium: 'bg-amber-50 dark:bg-amber-500/10 border-amber-400 hover:border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-500/20 cursor-pointer',
  selected: 'bg-sky-500 border-sky-500 text-white',
}

const extraIcons: Record<string, React.ReactNode> = {
  briefcase: <Luggage className="w-5 h-5" />,
  utensils: <Utensils className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  wifi: <Wifi className="w-5 h-5" />,
  building: <Building className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
}

type DealBookingState = {
  airline: string
  airlineCode: string
  from: string
  to: string
  price: number
  oldPrice: number
  discount: number
  cabin?: string
}

export default function Booking({ promoRegistered = false }: { promoRegistered?: boolean }) {
  const { flightId } = useParams()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [seats, setSeats] = useState<Seat[]>(generateSeats())
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])

  // State to track if the payment has been confirmed/approved by an admin
  const [paymentApproved, setPaymentApproved] = useState(false)
  const [showPendingScreen, setShowPendingScreen] = useState(false)

  // Passenger state
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    passportNumber: '',
    email: '',
    phone: ''
  })

  // Payment state
  const [paymentData, setPaymentData] = useState({
    method: 'direct',
    paypalEmail: '',
    transferReference: '',
    agreedToTerms: false,
  })

  const dealRouteState = (location.state as DealBookingState | null) ?? null
  const flight = (
    dealRouteState
      ? {
          id: 0,
          airline: dealRouteState.airline,
          flightNumber: `${dealRouteState.airlineCode}-DEAL`,
          departure: {
            airport: dealRouteState.from,
            code: dealRouteState.airlineCode,
            time: 'Flexible',
            city: dealRouteState.from,
          },
          arrival: {
            airport: dealRouteState.to,
            code: dealRouteState.airlineCode,
            time: 'Flexible',
            city: dealRouteState.to,
          },
          duration: 'Flexible',
          stops: 0,
          aircraft: 'Premium cabin',
          terminal: 'TBD',
          price: dealRouteState.price,
          cabin: dealRouteState.cabin || 'Business',
          baggage: 'Included',
          refundable: true,
          seatsAvailable: 6,
          rating: 5,
        }
      : flights.find((f) => f.id === Number(flightId)) || flights[0]
  ) as (typeof flights)[number]
  const selectedSeatIds = seats.filter((s) => s.type === 'selected').map((s) => s.id)
  const seatPrice = seats.filter((s) => s.type === 'selected').reduce((sum, s) => sum + (s.price || 0), 0)
  const extrasPrice = selectedExtras.reduce((sum, id) => {
    const extra = extras.find((e) => e.id === id)
    return sum + (extra?.price || 0)
  }, 0)
  const totalPrice = flight.price + seatPrice + extrasPrice
  const promoRate = promoRegistered ? 0.02 : 0
  const promoDiscount = Math.round(totalPrice * promoRate)
  const discountedTotal = totalPrice - promoDiscount

  const toggleSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seatId && (s.type === 'available' || s.type === 'premium')) {
          return { ...s, type: 'selected' as const }
        }
        if (s.id === seatId && s.type === 'selected') {
          return { ...s, type: s.price && s.price > 35 ? 'premium' as const : 'available' as const }
        }
        return s
      })
    )
  }

  const toggleExtra = (extraId: number) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    )
  }

  const handleComplete = () => {
    if (paymentData.method === 'direct') {
      if (!paymentData.transferReference) {
        alert('Validation Error: Please enter your transaction transfer reference number.')
        return
      }
      if (!paymentData.agreedToTerms) {
        alert('Validation Error: You must agree to the Terms and Conditions before proceeding.')
        return
      }

      if (!paymentApproved) {
        setShowPendingScreen(true)
        return
      }
    } else if (paymentData.method === 'paypal') {
      if (!paymentData.paypalEmail) {
        alert('Payment Declined: Enter a valid verified PayPal routing account configuration email.')
        return
      }
      if (!paymentApproved) {
        setShowPendingScreen(true)
        return
      }
    }

    setCompleted(true)
  }

  if (completed) {
    return (
      <BookingConfirmation 
        flight={flight} 
        totalPrice={discountedTotal} 
        promoRegistered={promoRegistered}
        promoDiscount={promoDiscount}
        passenger={passengerDetails} 
        selectedSeats={selectedSeatIds} 
        hasBaggageExtra={selectedExtras.includes(1)} // dynamic checked bag mapping
      />
    )
  }

  if (showPendingScreen && !paymentApproved) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto animate-pulse">
            <Clock className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Awaiting Administrator Approval</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We received your payment details with transfer reference <span className="font-mono font-bold text-slate-700 dark:text-slate-200">"{paymentData.transferReference || 'N/A'}"</span>. 
              Your seats are temporarily reserved. E-tickets will be delivered immediately following manual backend ledger confirmation.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/20 rounded-2xl p-4 text-left">
            <div className="flex gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Simulation Portal Note</h4>
                <p className="text-xs text-amber-700 dark:text-amber-500/90 mt-1">
                  In production, this updates dynamically via a webhook/websocket once an admin approves the ticket in the dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest font-semibold">Mock Admin Dashboard Trigger</p>
            <button
              onClick={() => {
                setPaymentApproved(true);
                setCompleted(true);
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/15 text-sm"
            >
              [Admin] Approve Payment & Confirm Booking
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i === currentStep
              const isCompleted = i < currentStep

              return (
                <div key={step.id} className="flex items-center flex-1 min-w-[72px] last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-sky-500 text-white'
                          : isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs mt-1.5 font-medium hidden sm:block ${
                        isActive ? 'text-sky-500' : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <PassengerForm 
                  key="passenger" 
                  passengerDetails={passengerDetails} 
                  setPassengerDetails={setPassengerDetails} 
                />
              )}
              {currentStep === 1 && (
                <SeatSelection key="seats" seats={seats} onToggleSeat={toggleSeat} />
              )}
              {currentStep === 2 && (
                <ExtrasSelection key="extras" selectedExtras={selectedExtras} onToggleExtra={toggleExtra} />
              )}
              {currentStep === 3 && (
                <PaymentForm key="payment" totalPrice={discountedTotal} paymentData={paymentData} setPaymentData={setPaymentData} />
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10"
                >
                  <BadgeCheck className="w-5 h-5" />
                  Submit for Approval
                </button>
              )}
            </div>
          </div>

          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Booking Summary
              </h3>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="font-medium text-sm text-slate-900 dark:text-white">{flight.flightNumber}</p>
                  <p className="text-xs text-slate-500">{flight.departure.code} → {flight.arrival.code}</p>
                </div>
              </div>
              <div className="space-y-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Flight Fare</span>
                  <span className="font-medium text-slate-900 dark:text-white">${flight.price}</span>
                </div>
                {seatPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Seats ({selectedSeatIds.length})</span>
                    <span className="font-medium text-slate-900 dark:text-white">${seatPrice}</span>
                  </div>
                )}
                {extrasPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Ancillaries</span>
                    <span className="font-medium text-slate-900 dark:text-white">${extrasPrice}</span>
                  </div>
                )}
                {promoRegistered && (
                  <div className="flex justify-between text-sm text-emerald-700">
                    <span className="font-medium">Promo discount (2%)</span>
                    <span className="font-medium">-${promoDiscount}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900 dark:text-white">Total</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">${discountedTotal}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

interface PassengerFormProps {
  passengerDetails: any;
  setPassengerDetails: React.Dispatch<React.SetStateAction<any>>;
}

function PassengerForm({ passengerDetails, setPassengerDetails }: PassengerFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPassengerDetails((prev: any) => ({ ...prev, [name]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Passenger Details</h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold">1</div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Primary Passenger Manifesto</h3>
            <p className="text-xs text-slate-500">Must match government-issued identification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
            <input
              type="text"
              name="firstName"
              value={passengerDetails.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={passengerDetails.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nationality</label>
            <select 
              name="nationality" 
              value={passengerDetails.nationality}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">Select Country</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={passengerDetails.passportNumber}
              onChange={handleChange}
              placeholder="P12345678"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Contact Routing Details</h3>
        <p className="text-xs text-slate-500 mb-4">Destination indexing endpoints for high-density E-Ticket transmission vouchers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Destination</label>
            <input
              type="email"
              name="email"
              value={passengerDetails.email}
              onChange={handleChange}
              placeholder="john.doe@flightnetwork.com"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mobile Contact Vector</label>
            <input
              type="tel"
              name="phone"
              value={passengerDetails.phone}
              onChange={handleChange}
              placeholder="+1 (555) 234-5678"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SeatSelection({ seats, onToggleSeat }: { seats: Seat[]; onToggleSeat: (id: string) => void }) {
  const rows = Array.from(new Set(seats.map((s) => s.row))).sort((a, b) => a - b)
  const cols = ['A', 'B', 'C', 'D', 'E', 'F']

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Select Cabin Placement</h2>
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center gap-2">
              <span className="w-6 text-xs text-slate-400 text-right">{row}</span>
              <div className="flex gap-2">
                {cols.slice(0, 3).map((col) => {
                  const seat = seats.find((s) => s.row === row && s.col === col)
                  if (!seat) return null
                  return (
                    <button
                      key={seat.id}
                      onClick={() => onToggleSeat(seat.id)}
                      disabled={seat.type === 'occupied'}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 text-xs font-medium transition-all ${seatTypeStyles[seat.type]}`}
                    >
                      {seat.type !== 'occupied' && seat.col}
                    </button>
                  )
                })}
              </div>
              <div className="w-6 sm:w-10" />
              <div className="flex gap-2">
                {cols.slice(3, 6).map((col) => {
                  const seat = seats.find((s) => s.row === row && s.col === col)
                  if (!seat) return null
                  return (
                    <button
                      key={seat.id}
                      onClick={() => onToggleSeat(seat.id)}
                      disabled={seat.type === 'occupied'}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 text-xs font-medium transition-all ${seatTypeStyles[seat.type]}`}
                    >
                      {seat.type !== 'occupied' && seat.col}
                    </button>
                  )
                })}
              </div>
              <span className="w-6 text-xs text-slate-400">{row}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ExtrasSelection({ selectedExtras, onToggleExtra }: { selectedExtras: number[]; onToggleExtra: (id: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Travel Extras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {extras.map((extra) => {
          const isSelected = selectedExtras.includes(extra.id)
          return (
            <button
              key={extra.id}
              onClick={() => onToggleExtra(extra.id)}
              className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                isSelected ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100'}`}>
                {extraIcons[extra.icon]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{extra.name}</h3>
                  <span className="font-semibold text-slate-900 dark:text-white">${extra.price}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{extra.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

interface PaymentFormProps {
  totalPrice: number;
  paymentData: any;
  setPaymentData: React.Dispatch<React.SetStateAction<any>>;
}

function PaymentForm({ paymentData, setPaymentData }: PaymentFormProps) {
  const paymentMethods = [
    { id: 'direct', label: 'Direct Bank Transfer' },
    { id: 'paypal', label: 'PayPal' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setPaymentData((prev: any) => ({ ...prev, [name]: val }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Secure Settlement Engine</h2>

      <div className="grid grid-cols-2 gap-2">
        {paymentMethods.map((pm) => (
          <button
            key={pm.id}
            type="button"
            onClick={() => setPaymentData((prev: any) => ({ ...prev, method: pm.id }))}
            className={`py-3 px-2 rounded-xl border-2 text-xs font-bold text-center transition-all ${
              paymentData.method === pm.id
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
            }`}
          >
            {pm.label}
          </button>
        ))}
      </div>

      {/* Direct Bank Transfer View */}
      {paymentData.method === 'direct' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Direct Bank Transfer Instructions</h4>
              <p className="text-xs text-slate-500">Transfer total amount manually to standard ledger accounts.</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Bank Name</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Global Horizon Bank</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Number</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">9876 5432 1098 7654</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Holder</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Horizon Aviation Group</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Required Reference</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">HZ-FLY-TX</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Your Transfer Transaction Reference / ID
              </label>
              <input
                type="text"
                name="transferReference"
                value={paymentData.transferReference}
                onChange={handleChange}
                placeholder="Paste transfer receipt Reference ID here..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={paymentData.agreedToTerms}
                onChange={handleChange}
                className="mt-1 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                I understand that my seats and ticket reservation are held as <strong>Pending</strong> and will not be officially booked until an administrator manually verifies and confirms receipt of funds.
              </span>
            </label>
          </div>
        </div>
      )}

      {/* PayPal View */}
      {paymentData.method === 'paypal' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">PayPal Access Node Connection</h4>
            <p className="text-xs text-slate-500 mt-1">Specify your registered portal address token context below.</p>
          </div>
          <input
            type="email"
            name="paypalEmail"
            value={paymentData.paypalEmail}
            onChange={handleChange}
            placeholder="billing@paypal-account.com"
            className="w-full max-w-md mx-auto block px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 text-center font-mono"
          />
        </div>
      )}
    </motion.div>
  )
}

interface BookingConfirmationProps {
  flight: any;
  totalPrice: number;
  promoRegistered: boolean;
  promoDiscount: number;
  passenger: any;
  selectedSeats: string[];
  hasBaggageExtra: boolean;
}

function BookingConfirmation({ flight, passenger, selectedSeats, hasBaggageExtra }: BookingConfirmationProps) {
  const passRef = useRef<HTMLDivElement>(null)

  // Standard Print trigger
  const handlePrint = () => {
    window.print()
  }

  // Passenger dynamic formulation
  const passengerLastName = (passenger.lastName || 'Passenger').toUpperCase()
  const passengerFirstName = (passenger.firstName || 'Guest').toUpperCase()
  const formattedName = `${passengerLastName} / ${passengerFirstName} MR`

  // Dynamic Routing setup
  const flightNo = flight.flightNumber || 'SV1801'
  const departureCode = flight.departure?.code || 'RUH'
  const departureAirport = flight.departure?.airport || 'Riyadh King Khalid Intl'
  const arrivalCode = flight.arrival?.code || 'GIZ'
  const arrivalAirport = flight.arrival?.airport || 'Gizan'

  const departureTime = flight.departure?.time || '23:40'
  const arrivalTime = flight.arrival?.time || '01:30'

  // Dynamic Airline Name linking directly to the chosen Flight layout
  const airlineName = flight.airline || 'SAUDIA'

  // Generate dynamic dates based on the year 2026
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' } as const
  const today = new Date('2026-07-15T15:00:00')
  const departureDateString = today.toLocaleDateString('en-GB', dateOptions)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const arrivalDateString = tomorrow.toLocaleDateString('en-GB', dateOptions)

  const assignedSeat = selectedSeats[0] || '39A'

  // Unique dynamic details
  const randomTicketNumber = `065${Math.floor(1000000000 + Math.random() * 9000000000)}`
  const randomBookingRef = Math.random().toString(36).substring(2, 8).toUpperCase()

  // Dynamic PDF download using html2canvas & jsPDF
  const handleDownloadPDF = async () => {
    const element = passRef.current
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2.5, // Crisp retina-quality canvas scaling
        useCORS: true,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`BoardingPass_${passengerLastName}_${flightNo}.pdf`)
    } catch (error) {
      console.error('PDF generation error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 print:p-0">
        
        {/* Confirmation banner */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 text-center space-y-6 shadow-xl print:hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <BadgeCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Approved & Ticket Issued!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
              Your flight is locked. Download a copy directly to your device or print to keep standard offline travel documents handy.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/10"
            >
              <Download className="w-4 h-4" />
              Download PDF Ticket
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-sky-500/10"
            >
              <Printer className="w-4 h-4" />
              Print Ticket Layout
            </button>
            <Link to="/" className="inline-block px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl text-sm transition-colors hover:bg-slate-50">
              Return Home
            </Link>
          </div>
        </div>

        {/* CSS override for system print */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-boarding-pass, .printable-boarding-pass * {
              visibility: visible;
            }
            .printable-boarding-pass {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              color: #000 !important;
              background: #fff !important;
            }
          }
        ` }} />

        {/* Boarding Pass Component Wrapper */}
        <div 
          ref={passRef}
          className="printable-boarding-pass max-w-3xl mx-auto bg-white border border-slate-300 rounded-lg p-8 space-y-6 shadow-md text-slate-900 select-none font-sans"
        >
          {/* Top Row: Logo & Fake Barcode */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {/* Dynamically loads the chosen airline name directly here */}
                <span className="font-serif tracking-widest text-2xl font-extrabold text-[#B59A57] uppercase">{airlineName}</span>
                <span className="text-xs bg-[#B59A57] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider scale-90">SKYTEAM</span>
              </div>
              <p className="text-2xl font-extrabold tracking-tight text-slate-800">Boarding Pass</p>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-wide mt-1">{formattedName}</h1>
            </div>

            <div className="flex flex-col items-end">
              <div className="w-48 h-8 bg-slate-900 flex items-center justify-between px-1 opacity-90 overflow-hidden relative">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div 
                    key={i} 
                    style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} 
                    className="h-full bg-white" 
                  />
                ))}
              </div>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest mt-1">SEQ: {Math.floor(Math.random() * 90) + 10}</span>
            </div>
          </div>

          {/* FLIGHT INFORMATION */}
          <div className="space-y-3">
            <div className="bg-[#B59A57] text-white text-[11px] font-bold px-4 py-1 uppercase tracking-wider rounded-sm">
              Flight Information
            </div>
            
            <div className="grid grid-cols-5 gap-2 text-center py-2">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Flight</p>
                <p className="text-xl font-black text-slate-900">{flightNo}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Seat</p>
                <p className="text-xl font-black text-slate-900">{assignedSeat}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Zone</p>
                <p className="text-xl font-black text-slate-900">3</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Boarding Time</p>
                <p className="text-xl font-black text-slate-900">{departureTime}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Gate</p>
                <p className="text-xl font-black text-slate-900">Check Monitors</p>
              </div>
            </div>
          </div>

          {/* Route details */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">From ({departureCode})</span>
              <p className="font-extrabold text-slate-900 text-lg">{departureAirport}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Plane className="w-3.5 h-3.5 rotate-90 text-[#B59A57]" />
                <span>Terminal 5</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">{departureDateString} {departureTime}</p>
            </div>

            <div className="space-y-1 pl-4 border-l border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">To ({arrivalCode})</span>
              <p className="font-extrabold text-slate-900 text-lg">{arrivalAirport}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Plane className="w-3.5 h-3.5 rotate-180 text-[#B59A57]" />
                <span>Arrival Gate Terminal</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">{arrivalDateString} {arrivalTime}</p>
            </div>
          </div>

          {/* TRAVEL INFORMATION */}
          <div className="space-y-3">
            <div className="bg-[#B59A57] text-white text-[11px] font-bold px-4 py-1 uppercase tracking-wider rounded-sm">
              Travel Information
            </div>

            <div className="grid grid-cols-3 gap-6 text-xs">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <User className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-800">Boarding pass information</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Validate physical passport credentials prior to gate approach.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Shield className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-800">Travel documents</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Passport Number {passenger.passportNumber || 'N/A'} must match physical visa records.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Briefcase className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-800">Checked baggage allowance</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {hasBaggageExtra ? '1 Checked bag up to 23 kg allowed.' : 'Checked bag extra not purchased. Carry-on limits apply.'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Luggage className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-800">Carry-on baggage allowance</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">One piece not to exceed 07 kg and standard 115cm dimensions.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pl-4 border-l border-slate-100">
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400">Class of Travel</h4>
                  <p className="font-bold text-slate-800">Guest Discounted</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400">Booking Reference</h4>
                  <p className="font-extrabold text-[#B59A57] tracking-wider">{randomBookingRef}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400">Ticket No (ETKT)</h4>
                  <p className="font-semibold text-slate-800">{randomTicketNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT STEPS */}
          <div className="space-y-3">
            <div className="bg-[#B59A57] text-white text-[11px] font-bold px-4 py-1 uppercase tracking-wider rounded-sm">
              Next Steps
            </div>

            <div className="grid grid-cols-3 gap-6 text-[10px] text-slate-600 leading-relaxed">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Note</h4>
                <p>Please reserve enough time for baggage check-in, security controls, and boarding procedures.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Carry-on baggage only</h4>
                <p>Proceed straight to airport security controls if you have no checked bags.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Departure</h4>
                <p>Have a wonderful trip! Regularly check digital departure status monitors for adjustments.</p>
              </div>
            </div>
          </div>

          {/* Bottom Barcode */}
          <div className="border-t border-slate-150 pt-4 flex flex-col items-center gap-1">
            <div className="w-64 h-8 bg-slate-900 flex items-center justify-between px-1 opacity-80 overflow-hidden">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  style={{ width: `${(i % 5 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} 
                  className="h-full bg-white" 
                />
              ))}
            </div>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest">*{randomTicketNumber}*</span>
          </div>
        </div>

      </div>
    </div>
  )
}