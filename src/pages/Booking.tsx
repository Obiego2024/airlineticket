import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Download,
  Mail,
  Home,
  QrCode,
  DollarSign,
  AlertCircle,
  Coins
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

export default function Booking({ promoRegistered = false }: { promoRegistered?: boolean }) {
  const { flightId } = useParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [seats, setSeats] = useState<Seat[]>(generateSeats())
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])

  // Passenger unified controlled state layout (includes Email & Phone updates)
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    passportNumber: '',
    email: '',
    phone: ''
  })

  // Complete multi-payment validation parameters mapping
  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paypalEmail: '',
    flexPayPlan: '3_months',
    agreedToTerms: false,
    cryptoCurrency: 'USDT',
    walletConnected: false
  })

  const flight = flights.find((f) => f.id === Number(flightId)) || flights[0]
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

  // Mandatory Verification Interceptor Gate before letting state trigger Complete Confirmation
  const handleComplete = () => {
    if (paymentData.method === 'card') {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
        alert('Payment Declined: Complete all valid Credit Card parameter entries to continue.')
        return
      }
    } else if (paymentData.method === 'paypal') {
      if (!paymentData.paypalEmail) {
        alert('Payment Declined: Enter a valid verified PayPal routing account configuration email.')
        return
      }
    } else if (paymentData.method === 'flexpay') {
      if (!paymentData.agreedToTerms) {
        alert('Payment Declined: Affirm and authorize the Installment Loan Disclosures framework.')
        return
      }
    } else if (paymentData.method === 'crypto') {
      if (!paymentData.walletConnected) {
        alert('Payment Declined: Web3 provider connection or invoice signature simulation required.')
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
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
      {/* Progress Bar Container */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i === currentStep
              const isCompleted = i < currentStep

              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
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

            {/* Step Controls Module */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="flex items-center gap-2 px-8 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10"
                >
                  <BadgeCheck className="w-5 h-5" />
                  Complete Booking
                </button>
              )}
            </div>
          </div>

          {/* Checkout Invoice SidePanel */}
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

      {/* Identity Configuration */}
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

      {/* Mandatory Notification Delivery Routing Form */}
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

function PaymentForm({ totalPrice, paymentData, setPaymentData }: PaymentFormProps) {
  const paymentMethods = [
    { id: 'card', label: 'Credit Card' },
    { id: 'paypal', label: 'PayPal Gateway' },
    { id: 'flexpay', label: 'Flex Pay' },
    { id: 'crypto', label: 'Crypto (Optional)' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setPaymentData((prev: any) => ({ ...prev, [name]: val }))
  }

  const toggleWalletConnection = () => {
    setPaymentData((prev: any) => ({ ...prev, walletConnected: !prev.walletConnected }))
  }

  const calculateInstallment = (plan: string) => {
    const splitCount = plan === '3_months' ? 3 : 6;
    return ((totalPrice * 1.04) / splitCount).toFixed(2);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Secure Settlement Engine</h2>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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

      {/* Credit Card View */}
      {paymentData.method === 'card' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={paymentData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="4111 2222 3333 4444"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Expiration</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">CVV Security Code</label>
              <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="321"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* PayPal View */}
      {paymentData.method === 'paypal' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto"><DollarSign className="w-6 h-6" /></div>
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

      {/* Flex Pay View */}
      {paymentData.method === 'flexpay' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-600"><AlertCircle className="w-5 h-5" /><h4 className="text-sm font-semibold uppercase">Installment Financing Engine</h4></div>
          <select
            name="flexPayPlan"
            value={paymentData.flexPayPlan}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
          >
            <option value="3_months">3 Installment cycles (+4% Processing)</option>
            <option value="6_months">6 Installment cycles (+4% Processing)</option>
          </select>
          <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl grid grid-cols-2 gap-4 text-sm font-mono">
            <div><p className="text-xs text-slate-400">Recurrent Installment</p><p className="font-bold">${calculateInstallment(paymentData.flexPayPlan)} / mo</p></div>
            <div><p className="text-xs text-slate-400">Immediate Initiation Fee</p><p className="font-bold text-emerald-600">${calculateInstallment(paymentData.flexPayPlan)}</p></div>
          </div>
          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <input type="checkbox" name="agreedToTerms" checked={paymentData.agreedToTerms} onChange={handleChange} className="mt-0.5 rounded border-slate-300" />
            <span className="text-xs text-slate-400">Authorize recurrent installment program pulling cycles matching the schedule framework.</span>
          </label>
        </div>
      )}

      {/* Optional Crypto Node Viewport */}
      {paymentData.method === 'crypto' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto"><Coins className="w-6 h-6" /></div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Optional Web3 Payment Protocol</h4>
            <p className="text-xs text-slate-500 mt-1">Settle invoices directly over decentralized ledgers via wallet execution bindings.</p>
          </div>
          <div className="flex justify-center gap-2 max-w-xs mx-auto">
            {['USDT', 'ETH', 'BTC'].map((token) => (
              <button
                key={token}
                type="button"
                onClick={() => setPaymentData((prev: any) => ({ ...prev, cryptoCurrency: token }))}
                className={`flex-1 py-1.5 border text-xs font-mono font-bold rounded-lg ${paymentData.cryptoCurrency === token ? 'border-amber-500 bg-amber-500/10 text-amber-600' : 'border-slate-200 text-slate-500'}`}
              >
                {token}
              </button>
            ))}
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={toggleWalletConnection}
              className={`px-6 py-2 rounded-xl text-xs font-mono font-bold transition-all ${paymentData.walletConnected ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {paymentData.walletConnected ? '✓ Web3 Provider Linked' : 'Link Web3 Browser Wallet'}
            </button>
          </div>
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
}

function BookingConfirmation({ flight, totalPrice, promoRegistered, promoDiscount, passenger, selectedSeats }: BookingConfirmationProps) {
  const pnrReference = 'PNR' + Math.floor(Math.random() * 900000 + 100000);
  const ticketNumber = '016 ' + Math.floor(Math.random() * 9000000000 + 1000000000);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pt-24 pb-16 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl w-full space-y-6">
        
        {/* Header Confirmation Details */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm"><Check className="w-6 h-6" /></div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Electronic Ticket Manifest</h1>
          <p className="text-xs text-slate-400">High-fidelity receipt output payload transmitted successfully.</p>
        </div>

        {/* Dynamic Boarding Stub Visual Display */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="bg-slate-900 dark:bg-slate-800 text-white p-6 flex flex-col sm:flex-row justify-between gap-4 font-mono">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider">{flight.airline || 'SkyLink Airways'}</h2>
              <p className="text-[10px] text-slate-400">PASSENGER CHECK-IN RECORD DEPLOYMENT</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-slate-400">RECORD LOCATOR (PNR)</p>
              <p className="text-lg font-bold text-sky-400 tracking-widest">{pnrReference}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-4 rounded-xl gap-4 font-mono">
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{flight.departure?.code || 'SFO'}</p>
                <p className="text-[11px] text-slate-400 truncate">{flight.departure?.date}</p>
              </div>
              <div className="text-center text-xs text-slate-400 flex-1 px-4">
                <p>{flight.duration}</p>
                <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-700 my-1 relative" />
                <p className="text-[10px]">{flight.stops === 0 ? 'NON-STOP' : 'TRANSIT FLIGHT'}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{flight.arrival?.code || 'JFK'}</p>
                <p className="text-[11px] text-slate-400 font-mono">{flight.arrival?.time}</p>
              </div>
            </div>

            {/* Matrix Data Spec Block */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs border-b border-slate-100 dark:border-slate-800 pb-4">
              <div><span className="block text-slate-400 text-[10px] uppercase">Passenger Legal Name</span><strong className="text-slate-800 dark:text-slate-200">{passenger.lastName ? `${passenger.lastName.toUpperCase()}, ${passenger.firstName}` : 'DOE, JOHN'}</strong></div>
              <div><span className="block text-slate-400 text-[10px] uppercase">Assigned Cabin Index</span><strong className="text-sky-500">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'GATE'}</strong></div>
              <div><span className="block text-slate-400 text-[10px] uppercase">Passport Identification</span><strong className="text-slate-800 dark:text-slate-200">{passenger.passportNumber || 'N/A'}</strong></div>
              <div><span className="block text-slate-400 text-[10px] uppercase">Contact Vector (Email)</span><strong className="text-slate-800 dark:text-slate-200 truncate block">{passenger.email || 'N/A'}</strong></div>
              <div><span className="block text-slate-400 text-[10px] uppercase">Mobile Number Mapping</span><strong className="text-slate-800 dark:text-slate-200">{passenger.phone || 'N/A'}</strong></div>
              <div><span className="block text-slate-400 text-[10px] uppercase">Operational Document ID</span><strong className="text-slate-800 dark:text-slate-200">{ticketNumber}</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
              <div className="text-xs text-slate-400 space-y-0.5 max-w-sm font-mono">
                <p className="font-bold text-amber-600 uppercase flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Gate Security Mandate</p>
                <p className="text-[11px]">Gate operations close exactly 20 minutes before departure execution cycles. Ground handling mandates valid documentation mapping parameters.</p>
              </div>
              <div className="p-2 border rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                <QrCode className="w-16 h-16 text-slate-900" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-col gap-2 text-xs font-mono">
            <span className="text-slate-400 font-medium">Settled Manifest Amount: <strong className="text-slate-900 dark:text-white font-bold">${totalPrice}</strong></span>
            {promoRegistered && (
              <span className="text-emerald-600 font-medium">Promo discount applied: -${promoDiscount}</span>
            )}
            <span className="text-emerald-600 font-bold uppercase flex items-center gap-1"><Check className="w-4 h-4" /> Cleared Block</span>
          </div>
        </div>

        {/* Document Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => alert(`PDF Generated successfully: ${pnrReference}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF Receipt
          </button>
          <button 
            type="button"
            onClick={() => alert(`Email transmitted payload successfully to target destination context: ${passenger.email}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50"
          >
            <Mail className="w-4 h-4" /> Push copy to Email
          </button>
          <Link to="/" className="sm:w-32 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-800">
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>

      </motion.div>
    </div>
  )
}