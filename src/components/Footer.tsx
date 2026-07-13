import { Link } from 'react-router-dom'
import { Plane, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
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
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Plane className="w-6 h-6 text-sky-500" />
              <span className="font-display text-xl font-bold text-white">SkyLux</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Redefining air travel since 2015. Experience the world's most premium airline service.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            {[
              { key: 'footer.privacyShort', href: '#' },
              { key: 'footer.termsShort', href: '#' },
              { key: 'footer.cookiesShort', href: '#' },
              { key: 'footer.sitemap', href: '#' },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
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
