export interface AdminAirline {
  id: number
  name: string
  code: string
  country: string
  fleetSize: number
  website: string
  email: string
  phone: string
  status: 'Active' | 'Maintenance' | 'Paused'
  logo: string
}

export interface AdminFlight {
  id: number
  airlineId: number
  flightNumber: string
  departureAirport: string
  arrivalAirport: string
  departureCity: string
  arrivalCity: string
  departureDate: string
  arrivalDate: string
  departureTime: string
  arrivalTime: string
  duration: string
  cabinClass: string
  price: number
  discountPrice: number
  totalSeats: number
  availableSeats: number
  status: 'Scheduled' | 'Delayed' | 'Boarding' | 'Departed' | 'Cancelled'
  gate: string
  terminal: string
  baggage: string
  refundPolicy: string
  meal: boolean
  wifi: boolean
  airlineName: string
}

export interface AdminBooking {
  id: string
  passengerName: string
  passport: string
  airline: string
  flight: string
  seat: string
  cabinClass: string
  bookingDate: string
  paymentStatus: 'Paid' | 'Pending' | 'Refunded'
  bookingStatus: 'Confirmed' | 'Pending' | 'Cancelled'
  ticketStatus: 'Issued' | 'Pending' | 'Checked In'
}

export interface AdminCustomer {
  id: number
  name: string
  email: string
  phone: string
  country: string
  bookings: number
  spend: string
  verified: boolean
  avatar: string
}

export interface AdminPaymentMethod {
  id: string
  name: string
  type: 'Bank' | 'Gateway' | 'Crypto'
  enabled: boolean
  details: string
}

export interface AdminPromoCode {
  id: number
  code: string
  type: 'Percentage' | 'Fixed'
  value: number
  expiry: string
  usage: number
  status: 'Active' | 'Paused'
}

export interface AdminNotification {
  id: number
  title: string
  message: string
  time: string
  category: 'Booking' | 'Payment' | 'Flight' | 'Customer' | 'System'
}

export const airlineSeeds = [
  { name: 'Delta Air Lines', country: 'United States', website: 'delta.com', email: 'charters@delta.com', phone: '+1 800-221-1212', status: 'Active' as const, logo: 'DL', fleetSize: 980 },
  { name: 'British Airways', country: 'United Kingdom', website: 'britishairways.com', email: 'ops@britishairways.com', phone: '+44 344 493 0787', status: 'Active' as const, logo: 'BA', fleetSize: 290 },
  { name: 'Air Canada', country: 'Canada', website: 'aircanada.com', email: 'support@aircanada.ca', phone: '+1 888-247-2262', status: 'Active' as const, logo: 'AC', fleetSize: 350 },
  { name: 'Lufthansa', country: 'Germany', website: 'lufthansa.com', email: 'ops@lufthansa.com', phone: '+49 69 86 799 799', status: 'Active' as const, logo: 'LH', fleetSize: 330 },
  { name: 'Singapore Airlines', country: 'Singapore', website: 'singaporeair.com', email: 'corporate@singaporeair.com.sg', phone: '+65 6223 8888', status: 'Active' as const, logo: 'SQ', fleetSize: 150 },
  { name: 'Qantas', country: 'Australia', website: 'qantas.com', email: 'bookings@qantas.com.au', phone: '+61 2 8222 2439', status: 'Active' as const, logo: 'QF', fleetSize: 125 },
  { name: 'Emirates', country: 'United Arab Emirates', website: 'emirates.com', email: 'service@emirates.com', phone: '+971 600 555555', status: 'Active' as const, logo: 'EK', fleetSize: 260 },
  { name: 'Air France', country: 'France', website: 'airfrance.com', email: 'partner@airfrance.fr', phone: '+33 9 69 39 36 54', status: 'Active' as const, logo: 'AF', fleetSize: 210 },
  { name: 'All Nippon Airways', country: 'Japan', website: 'ana.co.jp', email: 'sales@ana.co.jp', phone: '+81 3 6741 1120', status: 'Active' as const, logo: 'NH', fleetSize: 215 },
  { name: 'Air New Zealand', country: 'New Zealand', website: 'airnewzealand.co.nz', email: 'team@airnz.co.nz', phone: '+64 9 357 3000', status: 'Active' as const, logo: 'NZ', fleetSize: 105 },
  { name: 'Qatar Airways', country: 'Qatar', website: 'qatarairways.com', email: 'support@qatarairways.com.qa', phone: '+974 4023 0000', status: 'Active' as const, logo: 'QR', fleetSize: 250 },
  { name: 'Iberia', country: 'Spain', website: 'iberia.com', email: 'support@iberia.es', phone: '+34 900 111 500', status: 'Active' as const, logo: 'IB', fleetSize: 85 },
  { name: 'Thai Airways', country: 'Thailand', website: 'thaiairways.com', email: 'customer@thaiairways.com', phone: '+66 2 356 1111', status: 'Active' as const, logo: 'TG', fleetSize: 75 },
  { name: 'South African Airways', country: 'South Africa', website: 'flysaa.com', email: 'ops@flysaa.com', phone: '+27 11 978 1111', status: 'Maintenance' as const, logo: 'SA', fleetSize: 15 },
  { name: 'Swiss International Air Lines', country: 'Switzerland', website: 'swiss.com', email: 'res@swiss.com', phone: '+41 848 700 700', status: 'Active' as const, logo: 'LX', fleetSize: 90 },
  { name: 'LATAM Airlines', country: 'Brazil', website: 'latamairlines.com', email: 'support@latam.com', phone: '+55 11 3958 7007', status: 'Active' as const, logo: 'LA', fleetSize: 310 },
  { name: 'United Airlines', country: 'United States', website: 'united.com', email: 'corporate@united.com', phone: '+1 800-864-8331', status: 'Active' as const, logo: 'UA', fleetSize: 930 },
  { name: 'Air India', country: 'India', website: 'airindia.com', email: 'bookings@airindia.in', phone: '+91 124 264 1407', status: 'Active' as const, logo: 'AI', fleetSize: 130 },
  { name: 'Aeromexico', country: 'Mexico', website: 'aeromexico.com', email: 'customer@aeromexico.com', phone: '+52 55 5133 4000', status: 'Paused' as const, logo: 'AM', fleetSize: 110 },
  { name: 'Korean Air', country: 'South Korea', website: 'koreanair.com', email: 'service@koreanair.com', phone: '+82 2 2656 2001', status: 'Active' as const, logo: 'KE', fleetSize: 160 },
]

export const airlines: AdminAirline[] = airlineSeeds.map((airline, index) => ({
  ...airline,
  id: index + 1,
  code: airline.logo,
}))

const routePairs = [
  ['New York', 'London', 'JFK', 'LHR'],
  ['Dubai', 'Paris', 'DXB', 'CDG'],
  ['Singapore', 'Sydney', 'SIN', 'SYD'],
  ['Toronto', 'Vancouver', 'YYZ', 'YVR'],
  ['Doha', 'Barcelona', 'DOH', 'BCN'],
  ['Los Angeles', 'Tokyo', 'LAX', 'HND'],
  ['Chicago', 'Frankfurt', 'ORD', 'FRA'],
  ['Seoul', 'Honolulu', 'ICN', 'HNL'],
  ['Cape Town', 'Amsterdam', 'CPT', 'AMS'],
  ['Mumbai', 'Dubai', 'BOM', 'DXB'],
]

export const flights: AdminFlight[] = Array.from({ length: 100 }, (_, index) => {
  const airline = airlines[index % airlines.length]
  const route = routePairs[index % routePairs.length]
  const departureDate = new Date(Date.now() + index * 86400000)
  const arrivalDate = new Date(departureDate.getTime() + 1000 * 60 * 60 * 8)
  const basePrice = 420 + (index % 10) * 90
  const discountPrice = basePrice - (index % 4) * 25
  const seats = 180 + (index % 6) * 20
  const availableSeats = Math.max(12, seats - (index % 18) * 8)
  return {
    id: index + 1,
    airlineId: airline.id,
    flightNumber: `${airline.code}${100 + index}`,
    departureAirport: `${route[2]}`,
    arrivalAirport: `${route[3]}`,
    departureCity: route[0],
    arrivalCity: route[1],
    departureDate: departureDate.toISOString().split('T')[0],
    arrivalDate: arrivalDate.toISOString().split('T')[0],
    departureTime: `${String(6 + (index % 12)).padStart(2, '0')}:30`,
    arrivalTime: `${String(14 + (index % 10)).padStart(2, '0')}:15`,
    duration: `${7 + (index % 5)}h ${20 + (index % 3) * 10}m`,
    cabinClass: index % 3 === 0 ? 'First' : index % 2 === 0 ? 'Business' : 'Economy',
    price: basePrice,
    discountPrice,
    totalSeats: seats,
    availableSeats,
    status: index % 5 === 0 ? 'Delayed' : index % 3 === 0 ? 'Boarding' : 'Scheduled',
    gate: `A${(index % 8) + 1}`,
    terminal: index % 2 === 0 ? 'T1' : 'T2',
    baggage: index % 2 === 0 ? '2 bags' : '1 bag',
    refundPolicy: 'Flexible refund up to 24 hours before departure',
    meal: index % 2 === 0,
    wifi: true,
    airlineName: airline.name,
  }
})

export const customers: AdminCustomer[] = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: ['Elena Brooks', 'James Carter', 'Sarah Patel', 'Daniel Kim', 'Mina Chen', 'Lucas Reed', 'Priya Shah', 'Noah Singh'][index % 8],
  email: `traveler${index + 1}@mail.com`,
  phone: `+1 555 010 ${100 + index}`,
  country: ['United States', 'United Kingdom', 'Canada', 'India', 'Germany', 'Singapore', 'Australia'][index % 7],
  bookings: 2 + (index % 5),
  spend: `$${(1800 + index * 120).toLocaleString()}`,
  verified: index % 3 !== 0,
  avatar: ['/avatars/elena.jpg', '/avatars/james.jpg', '/avatars/sarah.jpg'][index % 3],
}))

export const bookings: AdminBooking[] = Array.from({ length: 18 }, (_, index) => ({
  id: `BK-${1000 + index}`,
  passengerName: customers[index % customers.length].name,
  passport: `P${1200 + index}X`,
  airline: airlines[index % airlines.length].name,
  flight: flights[index % flights.length].flightNumber,
  seat: `${String(12 + (index % 6)).padStart(2, '0')}${['A', 'B', 'C', 'D'][index % 4]}`,
  cabinClass: ['Economy', 'Business', 'First'][index % 3],
  bookingDate: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
  paymentStatus: index % 3 === 0 ? 'Paid' : index % 3 === 1 ? 'Pending' : 'Refunded',
  bookingStatus: index % 4 === 0 ? 'Cancelled' : 'Confirmed',
  ticketStatus: index % 2 === 0 ? 'Issued' : 'Checked In',
}))

export const paymentMethods: AdminPaymentMethod[] = [
  { id: 'bank', name: 'Bank Transfer', type: 'Bank', enabled: true, details: 'HSBC • Account: 001 234 556 • Swift: HSBCAESM' },
  { id: 'paystack', name: 'Paystack', type: 'Gateway', enabled: true, details: 'Live key active • Settlement 24h' },
  { id: 'flutterwave', name: 'Flutterwave', type: 'Gateway', enabled: false, details: 'Sandbox mode' },
  { id: 'stripe', name: 'Stripe', type: 'Gateway', enabled: true, details: 'Cards + Apple Pay' },
  { id: 'paypal', name: 'PayPal', type: 'Gateway', enabled: true, details: 'Business account linked' },
  { id: 'usdt', name: 'USDT', type: 'Crypto', enabled: false, details: 'Ethereum network • Wallet 0x9d4b...' },
  { id: 'bitcoin', name: 'Bitcoin', type: 'Crypto', enabled: true, details: 'BTC wallet active' },
  // { id: 'ethereum', name: 'Ethereum', type: 'Crypto', enabled: true, details: 'ERC-20 payouts' },
]

export const promoCodes: AdminPromoCode[] = [
  { id: 1, code: 'WELCOME20', type: 'Percentage', value: 20, expiry: '2026-09-10', usage: 184, status: 'Active' },
  { id: 2, code: 'SUMMER15', type: 'Percentage', value: 15, expiry: '2026-08-01', usage: 92, status: 'Active' },
  { id: 3, code: 'FLY250', type: 'Fixed', value: 250, expiry: '2026-07-30', usage: 38, status: 'Paused' },
]

export const notifications: AdminNotification[] = [
  { id: 1, title: 'New booking received', message: '3 VIP bookings were checked in during the last hour.', time: '8 min ago', category: 'Booking' },
  { id: 2, title: 'Payment received', message: 'A wire transfer of $12,400 was confirmed.', time: '26 min ago', category: 'Payment' },
  { id: 3, title: 'Flight update', message: 'Flight EK401 is delayed by 30 minutes.', time: '1 hr ago', category: 'Flight' },
  { id: 4, title: 'Customer registration', message: 'A new premium member completed signup.', time: '2 hrs ago', category: 'Customer' },
]

export const dashboardMetrics = [
  { label: 'Total Flights', value: '124', change: '+8.4%', detail: 'Across 20 airlines' },
  { label: 'Active Airlines', value: '19', change: '+2', detail: 'Premium network' },
  { label: 'Total Customers', value: '24.4K', change: '+12%', detail: 'Loyalty members' },
  { label: 'Today\'s Bookings', value: '312', change: '+5.1%', detail: 'Peak departures' },
  // { label: 'Revenue', value: '$4.2M', change: '+13.2%', detail: 'Rolling 30 days' },
  { label: 'Pending Payments', value: '48', change: '-3', detail: 'Awaiting settlement' },
  // { label: 'Cancelled Flights', value: '7', change: '-1', detail: 'This week' },
  // { label: 'Available Seats', value: '8,920', change: '+4.8%', detail: 'Inventory ready' },
]

export const revenueSeries = [
  { month: 'Jan', revenue: 320000, bookings: 640 },
  { month: 'Feb', revenue: 366000, bookings: 710 },
  { month: 'Mar', revenue: 402000, bookings: 760 },
  { month: 'Apr', revenue: 438000, bookings: 828 },
  { month: 'May', revenue: 474000, bookings: 892 },
  { month: 'Jun', revenue: 510000, bookings: 956 },
  { month: 'Jul', revenue: 562000, bookings: 1024 },
]

export const occupancySeries = [
  { name: 'Mon', occupancy: 62 },
  { name: 'Tue', occupancy: 69 },
  { name: 'Wed', occupancy: 74 },
  { name: 'Thu', occupancy: 71 },
  { name: 'Fri', occupancy: 81 },
  { name: 'Sat', occupancy: 88 },
  { name: 'Sun', occupancy: 79 },
]

export const destinationSeries = [
  { name: 'London', value: 124 },
  { name: 'Dubai', value: 103 },
  { name: 'Sydney', value: 97 },
  { name: 'Singapore', value: 88 },
  { name: 'Tokyo', value: 74 },
]