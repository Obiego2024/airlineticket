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

// Expanded language list
const languageOptions = [
  { code: 'en' as const, label: 'English', short: 'EN' },
  { code: 'es' as const, label: 'Español', short: 'ES' },
  { code: 'fr' as const, label: 'Français', short: 'FR' },
  { code: 'de' as const, label: 'Deutsch', short: 'DE' },
  { code: 'it' as const, label: 'Italiano', short: 'IT' },
  { code: 'pt' as const, label: 'Português', short: 'PT' },
  { code: 'nl' as const, label: 'Nederlands', short: 'NL' },
  { code: 'tr' as const, label: 'Türkçe', short: 'TR' },
  { code: 'sv' as const, label: 'Svenska', short: 'SV' },
  { code: 'ru' as const, label: 'Русский', short: 'RU' },
  { code: 'ar' as const, label: 'العربية', short: 'AR' },
  { code: 'hi' as const, label: 'हिन्दी', short: 'HI' },
  { code: 'zh' as const, label: '中文', short: 'ZH' },
  { code: 'ja' as const, label: '日本語', short: 'JA' },
  { code: 'ko' as const, label: '한국어', short: 'KO' },
  { code: 'vi' as const, label: 'Tiếng Việt', short: 'VI' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const { theme, toggleTheme, language, setLanguage, t } = useUi();
  const darkMode = theme === "dark";
  const isHome = location.pathname === '/';
  
  const isScrolledOrNotHome = scrolled || !isHome;

  const themeClasses = {
    navBg: isScrolledOrNotHome
      ? 'glass shadow-md bg-background/80 dark:bg-background/90 backdrop-blur-md border-b border-border'
      : 'bg-transparent border-b border-transparent',
    logoText: isScrolledOrNotHome
      ? 'text-foreground dark:text-white'
      : 'text-white',
    navLink: isScrolledOrNotHome
      ? 'text-foreground/80 dark:text-white/80 hover:text-sky-500 dark:hover:text-sky-400'
      : 'text-white/90 hover:text-sky-200',
    iconBtn: isScrolledOrNotHome
      ? 'text-foreground hover:bg-foreground/5 dark:text-white dark:hover:bg-white/10'
      : 'text-white/80 hover:bg-white/10',
    primaryBtn: isScrolledOrNotHome
      ? 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white'
      : 'bg-white/20 hover:bg-white/30 text-white'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${themeClasses.navBg}`}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Plane className={`w-5 h-5 -rotate-45 transition-colors duration-300 ${isScrolledOrNotHome ? 'text-sky-500 dark:text-sky-400' : 'text-white'}`} />
          <span className={`font-display text-xl font-extrabold tracking-tight transition-colors duration-300 ${themeClasses.logoText}`}>
            SkyLux
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-300 ${themeClasses.navLink}`}
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
              onClick={() => {
                setLangOpen(!langOpen);
                setUserMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 ${themeClasses.iconBtn}`}
            >
              <Globe className="w-4 h-4" />
              <span>{t('nav.langLabel')}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur z-50"
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
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                        language === lang.code 
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' 
                          : 'text-foreground hover:bg-foreground/5 dark:text-white/80 dark:hover:bg-white/10'
                      }`}
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
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-300 ${themeClasses.iconBtn}`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Alert Bell */}
          <Link
            to="/adminLoginpage"
            className={`p-2 rounded-lg transition-colors duration-300 relative ${themeClasses.iconBtn}`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* Account Interactive Dropdown */}
          <div className="relative flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setLangOpen(false);
              }}
              className={`rounded-full gap-2 transition-colors duration-300 ${themeClasses.primaryBtn}`}
            >
              <User className="w-4 h-4" />
              <span>{t('nav.signIn')}</span>
            </Button>

            {/* Premium Order Now Action Button */}
            <Button
              size="sm"
              asChild
              className="rounded-full gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white shadow-sm transition-all active:scale-95"
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
                  className="absolute top-full right-0 mt-2 w-48 bg-background border rounded-xl shadow-lg overflow-hidden z-50 dark:border-border"
                >
                  <Link to="/login" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground dark:text-white/95 hover:bg-foreground/5 transition-colors">
                    <User className="w-4 h-4" /> {t('nav.signIn')}
                  </Link>
                  <Link to="/register" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground dark:text-white/95 hover:bg-foreground/5 transition-colors">
                    <Plane className="w-4 h-4" /> {t('nav.signUp')}
                  </Link>
                  <hr className="border-border" />
                  <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground dark:text-white/95 hover:bg-foreground/5 transition-colors">
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
          className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${themeClasses.logoText}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border overflow-hidden bg-background dark:bg-background"
          >
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 text-sm font-medium text-foreground dark:text-white/95 hover:bg-foreground/5 rounded-xl transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
              
              <hr className="my-2 border-border" />
              
              {/* Mobile Language Selection Row */}
              <div className="px-4 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('nav.language')}</p>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border border-border/50 rounded-xl">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                        language === lang.code
                          ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400'
                          : 'border-border text-foreground dark:text-white/80 hover:bg-foreground/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {lang.short}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="my-2 border-border" />
              
              {/* Mobile Quick Sign In & Order Stack */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" asChild className="rounded-xl w-full justify-center">
                  <Link to="/login">{t('nav.signIn')}</Link>
                </Button>
                <Button asChild className="rounded-xl w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-800">
                  <Link to="/flights">{t('nav.orderNow')}</Link>
                </Button>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-foreground dark:text-white/95 hover:bg-foreground/5 rounded-xl transition-colors"
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