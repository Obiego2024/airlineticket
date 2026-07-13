import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUi } from '@/context/UiContext'
import {
  Plane,
  Calendar,
  Star,
  User,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Ticket,
  Award,
  Globe,
} from 'lucide-react'
import { bookings, notifications } from '../lib/data'

const sidebarLinks = [
  { icon: <Plane className="w-5 h-5" />, labelKey: 'nav.dashboard', href: '/dashboard', active: true },
  { icon: <Ticket className="w-5 h-5" />, labelKey: 'dashboard.sidebarTrips', href: '#', active: false },
  { icon: <Calendar className="w-5 h-5" />, labelKey: 'dashboard.sidebarUpcoming', href: '#', active: false },
  { icon: <Award className="w-5 h-5" />, labelKey: 'dashboard.sidebarRewards', href: '#', active: false },
  { icon: <User className="w-5 h-5" />, labelKey: 'dashboard.sidebarPassengers', href: '#', active: false },
  { icon: <CreditCard className="w-5 h-5" />, labelKey: 'dashboard.sidebarPayments', href: '#', active: false },
  { icon: <Bell className="w-5 h-5" />, labelKey: 'dashboard.sidebarNotifications', href: '#', active: false },
  { icon: <Settings className="w-5 h-5" />, labelKey: 'dashboard.sidebarSettings', href: '#', active: false },
]

export default function Dashboard() {
  const { t } = useUi()

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-4 sticky top-24">
              {/* User Profile */}
              <div className="flex items-center gap-3 p-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">John Doe</p>
                  <p className="text-xs text-slate-500">{t('dashboard.member')}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.labelKey}
                    to={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      link.active
                        ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-500'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {link.icon}
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <button className="flex items-center gap-3 px-3 py-2.5 mt-4 w-full text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
                {t('dashboard.signOut')}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {t('dashboard.welcome')}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">{t('dashboard.summary')}</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: t('dashboard.totalTrips'), value: '12', icon: <Globe className="w-5 h-5" />, color: 'bg-sky-500' },
                { label: t('dashboard.upcoming'), value: '2', icon: <Plane className="w-5 h-5" />, color: 'bg-gold' },
                { label: t('dashboard.skymiles'), value: '24,500', icon: <Award className="w-5 h-5" />, color: 'bg-emerald-500' },
                { label: t('dashboard.rewards'), value: '3', icon: <Star className="w-5 h-5" />, color: 'bg-coral' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-5"
                >
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{t('dashboard.myTrips')}</h2>
                <button className="text-sm text-sky-500 font-medium hover:text-sky-600 flex items-center gap-1">
                  {t('dashboard.viewAll')} <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                        <Plane className="w-5 h-5 text-sky-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">
                          {booking.flight.departure.code} → {booking.flight.arrival.code}
                        </p>
                        <p className="text-xs text-slate-500">{booking.flight.airline} {booking.flight.flightNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <User className="w-4 h-4" />
                        {booking.passengers}
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        ${booking.total}
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'upcoming'
                          ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-500'
                          : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500'
                      }`}
                    >
                      {booking.status === 'upcoming' ? t('dashboard.upcomingLabel') : t('dashboard.completedLabel')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6">
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {t('dashboard.notifications')}
              </h2>
              <div className="space-y-3">
                {notifications.map((notif: any) => (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-3 rounded-xl ${
                      !notif.read ? 'bg-sky-50 dark:bg-sky-500/5' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notif.read ? 'bg-sky-500' : 'bg-slate-300'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{notif.title}</p>
                      <p className="text-xs text-slate-500">{notif.message}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
