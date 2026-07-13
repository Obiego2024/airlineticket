import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Flights from './pages/Flights'
import FlightDetails from './pages/FlightDetails'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Services from './pages/Services'
import { Deals } from './components/home/Deals'
import { Destinations } from './components/home/Destinations'
import { useUi } from './context/UiContext'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './components/ui/dialog'


function NotFound() {
  const { t } = useUi()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
          <span className="text-4xl font-display font-bold text-sky-500">404</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t('notFound.title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          {t('notFound.subtitle')}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors"
        >
          {t('notFound.home')}
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const [showPromo, setShowPromo] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  // Pages that don't need navbar/footer
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const storedRegistered = window.localStorage.getItem('promoRegistered') === 'true'
    setIsRegistered(storedRegistered)

    if ((location.pathname === '/' || location.pathname === '/flights') && !storedRegistered) {
      setShowPromo(true)
    } else {
      setShowPromo(false)
    }
  }, [location.pathname])

  const handleRegisterPromo = () => {
    window.localStorage.setItem('promoRegistered', 'true')
    setIsRegistered(true)
    setShowPromo(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {!isAuthPage && <Navbar />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights promoRegistered={isRegistered} />} />
          <Route path="/flight/:flightId" element={<FlightDetails />} />
          <Route path="/booking/:flightId" element={<Booking promoRegistered={isRegistered} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {!isAuthPage && !isHome && <Footer />}

      <Dialog open={showPromo} onOpenChange={setShowPromo}>
        <DialogContent>
          <DialogTitle>Join the Promo</DialogTitle>
          <DialogDescription>
            Register now to earn 1–2% off your ticket purchase during the ongoing promo. The bonus is applied automatically when you book after registering.
          </DialogDescription>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleRegisterPromo}
              className="w-full rounded-xl bg-sky-500 px-4 py-3 text-white font-semibold hover:bg-sky-600 transition-colors"
            >
              Yes, register me for the promo
            </button>
            <button
              type="button"
              onClick={() => setShowPromo(false)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
