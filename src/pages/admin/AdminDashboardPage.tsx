import { motion } from 'framer-motion'
import { BarChart3, CreditCard, Plane, Ticket, TrendingUp, Users, Wallet } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { bookings, customers, dashboardMetrics, destinationSeries, occupancySeries, revenueSeries } from '@/lib/adminData'

const statusStyles: Record<string, string> = {
  Scheduled: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Delayed: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Boarding: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  Cancelled: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 p-8 text-white shadow-2xl shadow-blue-600/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Executive overview</p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Airline operations at a glance</h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">Monitor flights, bookings, payments and customer health from a unified premium admin console.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-100">Live status</p>
            <p className="mt-1 text-2xl font-semibold">92% on-time</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10">
                {metric.label.includes('Flights') ? <Plane className="h-5 w-5" /> : metric.label.includes('Bookings') ? <Ticket className="h-5 w-5" /> : metric.label.includes('Customers') ? <Users className="h-5 w-5" /> : metric.label.includes('Revenue') ? <Wallet className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-emerald-600">{metric.change}</span>
              <span className="text-slate-500 dark:text-slate-400">{metric.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Revenue trend</p>
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Monthly sales performance</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600 dark:bg-emerald-500/10">
              <TrendingUp className="h-4 w-4" /> +13.2%
            </div>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" fill="url(#revenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Seat utilization</p>
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Weekly occupancy</h2>
            </div>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancySeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Occupancy']} />
                <Bar dataKey="occupancy" radius={[8, 8, 0, 0]} fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Recent activity</p>
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Latest bookings</h2>
            </div>
            <button className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">View all</button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3">Booking</th>
                  <th className="pb-3">Passenger</th>
                  <th className="pb-3">Flight</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 6).map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-100 text-slate-700 last:border-0 dark:border-slate-800 dark:text-slate-300">
                    <td className="py-3 font-medium text-slate-900 dark:text-white">{booking.id}</td>
                    <td className="py-3">{booking.passengerName}</td>
                    <td className="py-3">{booking.flight}</td>
                    <td className="py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[booking.bookingStatus] || 'bg-slate-100 text-slate-600'}`}>{booking.bookingStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Top routes</p>
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Popular destinations</h2>
              </div>
            </div>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={destinationSeries} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3}>
                    {destinationSeries.map((entry, index) => <Cell key={entry.name} fill={['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index % 5]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Customer pulse</p>
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Verified accounts</h2>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div>
                <p className="text-3xl font-semibold text-slate-900 dark:text-white">{customers.filter((customer) => customer.verified).length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Verified customers</p>
              </div>
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-500/10">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
