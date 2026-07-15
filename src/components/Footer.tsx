import { Link } from 'react-router-dom'
import { Plane, Instagram, Twitter, Facebook, Youtube, ShieldAlert, Globe } from 'lucide-react'
import { useUi } from '@/context/UiContext'

const footerLinks = [
  {
    titleKey: 'footer.fly',
    links: [
      { labelKey: 'footer.bookFlight', href: '/flights' },
      { labelKey: 'nav.destinations', href: '/destinations' },
      { labelKey: 'footer.flightStatus', href: '#' },
      { labelKey: 'footer.checkIn', href: '#' },
    ],
  },
  {
    titleKey: 'footer.experience',
    links: [
      { labelKey: 'footer.cabins', href: '/#experience' },
      { labelKey: 'footer.dining', href: '/#experience' },
      { labelKey: 'footer.entertainment', href: '/#experience' },
      { labelKey: 'footer.lounges', href: '/#experience' },
    ],
  },
  {
    titleKey: 'footer.support',
    links: [
      { labelKey: 'footer.helpCenter', href: '#' },
      { labelKey: 'footer.contactUs', href: '#' },
      { labelKey: 'footer.baggageInfo', href: '#' },
      { labelKey: 'footer.specialAssistance', href: '#' },
    ],
  },
  {
    titleKey: 'footer.legal',
    links: [
      { labelKey: 'footer.privacy', href: '#' },
      { labelKey: 'footer.terms', href: '#' },
      { labelKey: 'footer.cookie', href: '#' },
    ],
  },
]

export default function Footer() {
  const { t } = useUi()

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white text-slate-600 transition-colors duration-300 dark:border-white/5 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 mb-16">
          
          {/* Corporate Brand Card */}
          <div className="col-span-2 flex flex-col justify-between pr-4 lg:col-span-2">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4 outline-none focus:ring-1 focus:ring-slate-400 rounded-md">
                <Plane className="w-5 h-5 text-slate-950 dark:text-amber-500" />
                <span className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white">SkyLux</span>
              </Link>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs">
                SkyLux Aviation Group Corp. operates globally, providing elite, high-efficiency routing and premium commercial aviation services for enterprise clients and frequent travelers.
              </p>
            </div>

            {/* Systems Operations Metrics */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Network Operations: Operational</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase">
                <Globe className="h-3 w-3" />
                <span>IATA: SL // ICAO: SLX</span>
              </div>
            </div>
          </div>

          {/* Navigational Sub-menus */}
          {footerLinks.map((col) => (
            <div key={col.titleKey} className="col-span-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200 mb-4">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      to={link.href}
                      className="text-xs text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dynamic Social & Global Settings Bar */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 py-6 dark:border-white/5">
          
          {/* Social Pill Matrix */}
          <div className="flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-slate-300 hover:text-slate-900 dark:border-white/5 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-white/10 dark:hover:text-white transition-all duration-200"
                aria-label="Social Link"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Micro Regulatory Notice */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400 max-w-md sm:text-right">
            <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span>Pricing verified against active baseline tariffs. Subject to change due to regulatory updates or scheduling constraints.</span>
          </div>

        </div>

        {/* Corporate Legal & Compliance Footer */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 dark:border-white/5">
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            {t('footer.rights')} // Crafted with institutional specifications.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { key: 'footer.privacyShort', href: '#' },
              { key: 'footer.termsShort', href: '#' },
              { key: 'footer.cookiesShort', href: '#' },
              { key: 'footer.sitemap', href: '#' },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-[10px] font-mono text-slate-400 hover:text-slate-950 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}