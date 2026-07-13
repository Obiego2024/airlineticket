import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  ChevronDown,
  Bell,
  User,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUi } from "@/context/UiContext";

const navLinks = [
  { to: "/", key: "nav.home" },
  { to: "/flights", key: "nav.flights" },
  { to: "/destinations", key: "nav.destinations" },
  { to: "/deals", key: "nav.deals" },
  { to: "/services", key: "nav.services" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, language, setLanguage, t } = useUi();
  const darkMode = theme === "dark";
  const languageOptions = [
    { code: 'en' as const, label: 'English', short: 'EN' },
    { code: 'es' as const, label: 'Español', short: 'ES' },
    { code: 'fr' as const, label: 'Français', short: 'FR' },
    { code: 'de' as const, label: 'Deutsch', short: 'DE' },
    { code: 'pt' as const, label: 'Português', short: 'PT' },
    { code: 'ar' as const, label: 'العربية', short: 'AR' },
    { code: 'zh' as const, label: '中文', short: 'ZH' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleDark = () => toggleTheme();
  const isHome = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'glass shadow-md bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Plane className={`w-5 h-5 -rotate-45 transition-colors ${scrolled || !isHome ? 'text-sky-500' : 'text-white'}`} />
          <span className={`font-display text-xl font-extrabold tracking-tight transition-colors ${
            scrolled || !isHome ? 'text-foreground' : 'text-white'
          }`}>
            SkyLux
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-sky-500 ${
                scrolled || !isHome ? 'text-foreground/80' : 'text-white/90'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Right Action Stack */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language Selection menu */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                scrolled || !isHome ? 'text-foreground hover:bg-foreground/5' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{t('nav.langLabel')}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full right-0 mt-2 w-56 max-h-80 overflow-auto rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur z-50"
                >
                  <div className="px-2 py-1.5 mb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t('nav.language')}</p>
                    <p className="text-xs text-muted-foreground">{t('nav.languageSubtitle')}</p>
                  </div>
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${language === lang.code ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' : 'text-foreground hover:bg-foreground/5'}`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{lang.short}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleDark}
            className={`p-2 rounded-lg transition-colors ${
              scrolled || !isHome ? 'text-foreground hover:bg-foreground/5' : 'text-white/80 hover:bg-white/10'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Alert Bell */}
          <Link
            to="/dashboard"
            className={`p-2 rounded-lg transition-colors relative ${
              scrolled || !isHome ? 'text-foreground hover:bg-foreground/5' : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* Account Interactive Dropdown */}
          <div className="relative flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`rounded-full gap-2 ${
                scrolled || !isHome ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t('nav.signIn')}</span>
            </Button>

            {/* Premium Order Now Action Button */}
            <Button
              size="sm"
              asChild
              className="rounded-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95"
            >
              <Link to="/flights">
                <ShoppingBag className="w-4 h-4" />
                <span>{t('nav.orderNow')}</span>
              </Link>
            </Button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-background border rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <Link to="/login" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-foreground/5 transition-colors">
                    <User className="w-4 h-4" /> {t('nav.signIn')}
                  </Link>
                  <Link to="/register" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-foreground/5 transition-colors">
                    <Plane className="w-4 h-4" /> {t('nav.signUp')}
                  </Link>
                  <hr className="border-border" />
                  <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-foreground/5 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> {t('nav.dashboard')}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled || !isHome ? 'text-foreground' : 'text-white'
          }`}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Context Menu View */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border overflow-hidden bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
              
              <hr className="my-2 border-border" />
              
              {/* Mobile Mobile Quick Sign In & Order Stack */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" asChild className="rounded-xl w-full justify-center">
                  <Link to="/login">{t('nav.signIn')}</Link>
                </Button>
                <Button asChild className="rounded-xl w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link to="/flights">{t('nav.orderNow')}</Link>
                </Button>
              </div>

              <button
                onClick={toggleDark}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {darkMode ? t('nav.lightMode') : t('nav.darkMode')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}