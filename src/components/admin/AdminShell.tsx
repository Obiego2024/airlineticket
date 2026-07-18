import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  Plane,
  Building2,
  Ticket,
  Users,
  CreditCard,
  TicketPercent,
  FileBarChart,
  Settings,
  UserCircle2,
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronRight,
  Moon,
  SunMedium,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react'
import { useUi } from '@/context/UiContext'
import { notifications } from '@/lib/adminData'

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3 },
  { to: '/admin/flights', label: 'Flights', icon: Plane },
  { to: '/admin/airlines', label: 'Airlines', icon: Building2 },
  { to: '/admin/bookings', label: 'Bookings', icon: Ticket },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/promos', label: 'Promo Codes', icon: TicketPercent },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/profile', label: 'Admin Profile', icon: UserCircle2 },
]

export default function AdminShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme, t } = useUi()
  const darkMode = theme === 'dark'

  useEffect(() => {
    const isAuthenticated = window.localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const breadcrumbs = useMemo(() => {
    const path = location.pathname.replace('/admin', '').split('/').filter(Boolean)
    const base = [{ label: 'Admin', to: '/admin' }]
    return base.concat(
      path.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        to: `/admin/${path.slice(0, index + 1).join('/')}`,
      }))
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <div className="flex min-h-screen">
        
        {/* --- Desktop Sidebar --- */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200 bg-white/80 backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/80 lg:flex ${
            collapsed ? 'w-24' : 'w-72'
          }`}
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/10">
                  <Plane className="h-5 w-5" />
                </div>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    <p className="text-[10px] font-bold tracking-[0.25em] text-slate-400 dark:text-slate-500">SKYLUX</p>
                    <p className="font-display text-base font-semibold">Admin Panel</p>
                  </motion.div>
                )}
              </div>
              <button
                onClick={() => setCollapsed((value) => !value)}
                className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              >
                {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <button
                onClick={() => {
                  window.localStorage.removeItem('adminAuth')
                  window.localStorage.removeItem('adminAuthEmail')
                  navigate('/admin/login', { replace: true })
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* --- Main Content Layout --- */}
        <div className={`flex flex-1 flex-col transition-all duration-300 ${collapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
          
          {/* --- Global Header --- */}
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              
              {/* Breadcrumbs & Mobile Trigger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-600 lg:hidden dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="hidden min-[400px]:block">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">Operations Control</p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {breadcrumbs.map((item, index) => (
                      <div key={item.to} className="flex items-center gap-1 sm:gap-2">
                        {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-700" />}
                        <Link
                          to={item.to}
                          className={
                            index === breadcrumbs.length - 1
                              ? 'font-semibold text-slate-900 dark:text-white'
                              : 'hover:text-blue-600 transition-colors'
                          }
                        >
                          {item.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Utility Toolbar */}
              <div className="flex items-center gap-2 sm:gap-3">
                <label className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  <Search className="h-4 w-4" />
                  <input
                    className="w-40 bg-transparent outline-none text-slate-800 dark:text-slate-100"
                    placeholder={t('dashboard.search') || 'Search'}
                  />
                </label>
                <button className="relative rounded-2xl border border-slate-200 p-2.5 text-slate-600 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950" />
                </button>
                <button
                  onClick={toggleTheme}
                  className="rounded-2xl border border-slate-200 p-2.5 text-slate-600 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  {darkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 pr-3 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-semibold text-white">
                    AD
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold leading-none">Amara Wells</p>
                    <p className="mt-0.5 text-[10px] text-slate-500 leading-none">Super Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* --- Outlet Area --- */}
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* --- Mobile Sidebar Drawers & Backdrop --- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Darkened Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-out Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white/95 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white">
                    <Plane className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Admin Panel</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Premium controls</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto py-4">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Sidebar Notifications Segment */}
              <div className="mt-auto border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Recent Alerts</p>
                <ul className="mt-3 space-y-2">
                  {notifications.slice(0, 2).map((notification) => (
                    <li
                      key={notification.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                    >
                      {notification.title}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}