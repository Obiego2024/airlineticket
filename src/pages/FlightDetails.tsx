import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plane,
  ArrowLeft,
  Luggage,
  RotateCcw,
  Armchair,
  Utensils,
  Wifi,
  Star,
  ChevronRight,
} from 'lucide-react'
import { flights } from '../lib/data'

export default function FlightDetails() {
  const { flightId } = useParams()
  const flight = flights.find((f) => f.id === Number(flightId)) || flights[0]

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/flights"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to flights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                  <Plane className="w-7 h-7 text-sky-500" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {flight.airline} {flight.flightNumber}
                  </h1>
                  <p className="text-sm text-slate-500">{flight.aircraft} · {flight.cabin} Class</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <span className="font-semibold text-slate-900 dark:text-white">{flight.rating}</span>
                <span className="text-sm text-slate-500">/5</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-6 py-6 border-y border-slate-100 dark:border-slate-700">
              {/* Departure */}
              <div className="text-center flex-1">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{flight.departure.time}</p>
                <p className="text-lg font-semibold text-sky-500">{flight.departure.code}</p>
                <p className="text-sm text-slate-500">{flight.departure.city}</p>
                <p className="text-xs text-slate-400 mt-1">{flight.departure.airport}</p>
              </div>

              {/* Flight Path */}
              <div className="flex-1 flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-2">{flight.duration}</p>
                <div className="w-full flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-500" />
                  <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-600 relative">
                    {flight.stops > 0 && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-1.5">
                        <div className="w-3 h-3 rounded-full bg-coral border-2 border-white dark:border-slate-800" />
                      </div>
                    )}
                  </div>
                  <Plane className="w-5 h-5 text-sky-500 rotate-90" />
                  <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-600" />
                  <div className="h-2 w-2 rounded-full bg-sky-500" />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}${flight.stopCity ? ` in ${flight.stopCity}` : ''}`}
                </p>
              </div>

              {/* Arrival */}
              <div className="text-center flex-1">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{flight.arrival.time}</p>
                <p className="text-lg font-semibold text-sky-500">{flight.arrival.code}</p>
                <p className="text-sm text-slate-500">{flight.arrival.city}</p>
                <p className="text-xs text-slate-400 mt-1">{flight.arrival.airport}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Luggage className="w-3.5 h-3.5" />
                {flight.baggage}
              </span>
              {flight.refundable && (
                <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Refundable
                </span>
              )}
              <span className="px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-xs text-amber-600 dark:text-amber-400">
                {flight.seatsAvailable} seats left
              </span>
            </div>
          </div>

          {/* Fare Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 mb-6">
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Fare Breakdown
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Base fare</span>
                <span className="text-slate-900 dark:text-white">${Math.round(flight.price * 0.7)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Taxes & fees</span>
                <span className="text-slate-900 dark:text-white">${Math.round(flight.price * 0.2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Carrier charges</span>
                <span className="text-slate-900 dark:text-white">${Math.round(flight.price * 0.1)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white">Total per person</span>
                <span className="font-bold text-xl text-slate-900 dark:text-white">${flight.price}</span>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 mb-6">
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-4">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Luggage className="w-5 h-5" />, title: flight.baggage, desc: 'Checked allowance' },
                { icon: <Armchair className="w-5 h-5" />, title: `${flight.cabin} Class Seat`, desc: 'Comfortable seating' },
                { icon: <Utensils className="w-5 h-5" />, title: 'In-flight Dining', desc: 'Complimentary meals' },
                { icon: <Wifi className="w-5 h-5" />, title: 'Wi-Fi Access', desc: 'Stay connected' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-500 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/booking/${flight.id}`}
              className="flex-1 py-4 bg-gold text-white font-semibold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Select This Flight
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
