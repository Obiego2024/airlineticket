// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useUi } from '@/context/UiContext'
// import {
//   Plane,
//   TrendingUp,
//   Users,
//   DollarSign,
//   Ticket,
//   BarChart3,
//   Settings,
//   Calendar,
//   ArrowUpRight,
//   ArrowDownRight,
//   Search,
//   Filter,
// } from 'lucide-react'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
// } from 'recharts'
// import { adminStats, bookings, flights } from '../lib/data'

// const monthlyData = [
//   { month: 'Jan', bookings: 820, revenue: 284000 },
//   { month: 'Feb', bookings: 932, revenue: 312000 },
//   { month: 'Mar', bookings: 1051, revenue: 356000 },
//   { month: 'Apr', bookings: 1120, revenue: 389000 },
//   { month: 'May', bookings: 1284, revenue: 445000 },
//   { month: 'Jun', bookings: 1345, revenue: 478000 },
//   { month: 'Jul', bookings: 1420, revenue: 512000 },
// ]

// const routeData = [
//   { route: 'JFK-LHR', passengers: 3200 },
//   { route: 'LHR-DXB', passengers: 2800 },
//   { route: 'CDG-NRT', passengers: 2400 },
//   { route: 'JFK-DXB', passengers: 2100 },
//   { route: 'LHR-SIN', passengers: 1900 },
// ]

// const cabinData = [
//   { name: 'Economy', value: 62, color: '#3B82F6' },
//   { name: 'Business', value: 28, color: '#D4A843' },
//   { name: 'First', value: 10, color: '#F4A261' },
// ]

// const iconMap: Record<string, React.ReactNode> = {
//   ticket: <Ticket className="w-6 h-6" />,
//   'dollar-sign': <DollarSign className="w-6 h-6" />,
//   users: <Users className="w-6 h-6" />,
//   plane: <Plane className="w-6 h-6" />,
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('overview')
//   const { t } = useUi()

//   const tabs = [
//     { id: 'overview', label: t('dashboard.tabOverview'), icon: <BarChart3 className="w-4 h-4" /> },
//     { id: 'flights', label: t('dashboard.tabFlights'), icon: <Plane className="w-4 h-4" /> },
//     { id: 'bookings', label: t('dashboard.tabBookings'), icon: <Ticket className="w-4 h-4" /> },
//     { id: 'customers', label: t('dashboard.tabCustomers'), icon: <Users className="w-4 h-4" /> },
//     { id: 'settings', label: t('dashboard.tabSettings'), icon: <Settings className="w-4 h-4" /> },
//   ]

//   return (
//     <div className="min-h-screen bg-background pt-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
//         >
//           <div>
//             <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
//               {t('dashboard.adminTitle')}
//             </h1>
//             <p className="text-slate-500 dark:text-slate-400 mt-1">
//               {t('dashboard.adminSubtitle')}
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
//               <Calendar className="w-4 h-4 text-slate-400" />
//               <span className="text-sm text-slate-600 dark:text-slate-300">{t('dashboard.last30Days')}</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 mb-8 shadow-sm border border-slate-200 dark:border-slate-700 w-fit">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 activeTab === tab.id
//                   ? 'bg-sky-500 text-white'
//                   : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
//               }`}
//             >
//               {tab.icon}
//               <span className="hidden sm:inline">{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {activeTab === 'overview' && (
//           <>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               {adminStats.map((stat, i) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-5"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-500">
//                       {iconMap[stat.icon]}
//                     </div>
//                     <span className={`flex items-center gap-1 text-xs font-medium ${
//                       stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
//                     }`}>
//                       {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
//                       {stat.change}
//                     </span>
//                   </div>
//                   <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
//                   <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               {/* Revenue Chart */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
//                     {t('dashboard.revenueOverview')}
//                   </h3>
//                   <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
//                     <TrendingUp className="w-3 h-3" />
//                     +8.3%
//                   </span>
//                 </div>
//                 <ResponsiveContainer width="100%" height={280}>
//                   <AreaChart data={monthlyData}>
//                     <defs>
//                       <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
//                         <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
//                     <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
//                     <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
//                     <Tooltip
//                       contentStyle={{
//                         background: '#fff',
//                         border: '1px solid #e2e8f0',
//                         borderRadius: '12px',
//                         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//                       }}
//                       formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey="revenue"
//                       stroke="#3B82F6"
//                       strokeWidth={2}
//                       fill="url(#revenueGradient)"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </motion.div>

//               {/* Cabin Distribution */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6"
//               >
//                 <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-6">
//                   {t('dashboard.cabinDistribution')}
//                 </h3>
//                 <ResponsiveContainer width="100%" height={200}>
//                   <PieChart>
//                     <Pie
//                       data={cabinData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {cabinData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="flex justify-center gap-4 mt-4">
//                   {cabinData.map((c) => (
//                     <div key={c.name} className="flex items-center gap-1.5">
//                       <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
//                       <span className="text-xs text-slate-500">{c.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Route Performance */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 mb-8"
//             >
//               <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-6">
//                 {t('dashboard.topRoutes')}
//               </h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={routeData} layout="vertical">
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
//                   <XAxis type="number" stroke="#94a3b8" fontSize={12} />
//                   <YAxis dataKey="route" type="category" stroke="#94a3b8" fontSize={12} width={60} />
//                   <Tooltip
//                     contentStyle={{
//                       background: '#fff',
//                       border: '1px solid #e2e8f0',
//                       borderRadius: '12px',
//                     }}
//                   />
//                   <Bar dataKey="passengers" fill="#3B82F6" radius={[0, 6, 6, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </motion.div>

//             {/* Recent Bookings Table */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
//                   {t('dashboard.recentBookings')}
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                     <input
//                       type="text"
//                       placeholder={t('dashboard.search')}
//                       className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:border-sky-500"
//                     />
//                   </div>
//                   <button className="p-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg">
//                     <Filter className="w-4 h-4 text-slate-400" />
//                   </button>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-slate-100 dark:border-slate-700">
//                       <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{t('dashboard.bookingId')}</th>
//                       <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{t('dashboard.route')}</th>
//                       <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{t('dashboard.date')}</th>
//                       <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{t('dashboard.passengers')}</th>
//                       <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{t('dashboard.status')}</th>
//                       <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">{t('dashboard.amount')}</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bookings.map((booking) => (
//                       <tr
//                         key={booking.id}
//                         className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
//                       >
//                         <td className="py-3 pr-4 text-sm font-mono text-sky-500">{booking.id}</td>
//                         <td className="py-3 pr-4 text-sm text-slate-900 dark:text-white">
//                           {booking.flight.departure.code} → {booking.flight.arrival.code}
//                         </td>
//                         <td className="py-3 pr-4 text-sm text-slate-500">{booking.date}</td>
//                         <td className="py-3 pr-4 text-sm text-slate-500">{booking.passengers}</td>
//                         <td className="py-3 pr-4">
//                           <span
//                             className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                               booking.status === 'upcoming'
//                                 ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-500'
//                                 : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500'
//                             }`}
//                           >
//                             {booking.status}
//                           </span>
//                         </td>
//                         <td className="py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
//                           ${booking.total}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </motion.div>
//           </>
//         )}

//         {activeTab === 'flights' && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6"
//           >
//             <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-6">{t('dashboard.flightManagement')}</h3>
//             <div className="space-y-4">
//               {flights.map((flight) => (
//                 <div
//                   key={flight.id}
//                   className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl"
//                 >
//                   <div className="flex items-center gap-3 flex-1">
//                     <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
//                       <Plane className="w-5 h-5 text-sky-500" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-sm text-slate-900 dark:text-white">{flight.flightNumber}</p>
//                       <p className="text-xs text-slate-500">{flight.aircraft}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-6 text-sm">
//                     <span className="text-slate-700 dark:text-slate-300">{flight.departure.code} → {flight.arrival.code}</span>
//                     <span className="text-slate-500">{flight.duration}</span>
//                     <span className="px-2 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-500 rounded-lg text-xs font-medium">{flight.cabin}</span>
//                   </div>
//                   <div className="font-semibold text-slate-900 dark:text-white">${flight.price}</div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {activeTab === 'bookings' && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6"
//           >
//             <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-6">All Bookings</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-slate-100 dark:border-slate-700">
//                     <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">ID</th>
//                     <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Customer</th>
//                     <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Flight</th>
//                     <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Date</th>
//                     <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((b) => (
//                     <tr key={b.id} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0">
//                       <td className="py-3 pr-4 text-sm font-mono text-sky-500">{b.id}</td>
//                       <td className="py-3 pr-4 text-sm text-slate-900 dark:text-white">John Doe</td>
//                       <td className="py-3 pr-4 text-sm text-slate-500">{b.flight.flightNumber}</td>
//                       <td className="py-3 pr-4 text-sm text-slate-500">{b.date}</td>
//                       <td className="py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">${b.total}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         )}

//         {activeTab === 'customers' && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
//           >
//             {[
//               { name: 'John Doe', email: 'john@example.com', trips: 12, miles: '24,500' },
//               { name: 'Sarah Miller', email: 'sarah@example.com', trips: 8, miles: '18,200' },
//               { name: 'James Kim', email: 'james@example.com', trips: 15, miles: '31,400' },
//             ].map((customer, i) => (
//               <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
//                     {customer.name.split(' ').map((n) => n[0]).join('')}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-900 dark:text-white">{customer.name}</p>
//                     <p className="text-xs text-slate-500">{customer.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4">
//                   <div>
//                     <p className="text-lg font-bold text-slate-900 dark:text-white">{customer.trips}</p>
//                     <p className="text-xs text-slate-500">Trips</p>
//                   </div>
//                   <div>
//                     <p className="text-lg font-bold text-slate-900 dark:text-white">{customer.miles}</p>
//                     <p className="text-xs text-slate-500">Miles</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         )}

//         {activeTab === 'settings' && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="max-w-2xl"
//           >
//             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 space-y-6">
//               <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">General Settings</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Airline Name</label>
//                   <input
//                     type="text"
//                     defaultValue="SkyLux Airlines"
//                     className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contact Email</label>
//                   <input
//                     type="email"
//                     defaultValue="support@skylux.com"
//                     className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Currency</label>
//                   <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500">
//                     <option>USD ($)</option>
//                     <option>EUR (€)</option>
//                     <option>GBP (£)</option>
//                     <option>JPY (¥)</option>
//                   </select>
//                 </div>
//                 <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
//                   <div>
//                     <p className="font-medium text-slate-900 dark:text-white">Maintenance Mode</p>
//                     <p className="text-sm text-slate-500">Temporarily disable bookings</p>
//                   </div>
//                   <button className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 relative transition-colors">
//                     <div className="w-5 h-5 rounded-full bg-white shadow-sm absolute left-0.5 top-0.5" />
//                   </button>
//                 </div>
//               </div>

//               <button className="px-6 py-2.5 bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-600 transition-colors">
//                 Save Changes
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }
