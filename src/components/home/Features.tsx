import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BadgeDollarSign, Headphones, ShieldCheck, 
  Zap, Globe2, RefreshCw, Armchair, 
  Sparkles, ConciergeBell, Search 
} from "lucide-react";
import { SectionHeader } from "./Destinations";
import { useUi } from "@/context/UiContext";

const items = [
  { icon: BadgeDollarSign, title: "Best Prices", desc: "Real-time fare comparisons across 500+ premium commercial airlines." },
  { icon: Headphones, title: "24/7 Concierge", desc: "Speak directly to a dedicated human specialist any time, anywhere globally." },
  { icon: ShieldCheck, title: "Secure Booking", desc: "Bank-grade cryptographic encryption protecting private transactional data." },
  { icon: Zap, title: "Fast Refunds", desc: "Prioritized automated refund processing completed in as little as 24 hours." },
  { icon: Globe2, title: "Trusted Worldwide", desc: "Premium flight privileges trusted by enterprise clients across 190+ countries." },
  { icon: RefreshCw, title: "Flexible Tickets", desc: "Modify flight schedules effortlessly with flexible zero-fee options." },
  { icon: Armchair, title: "Elite Fleet", desc: "Fly exclusively on top-tier modern aircraft configured for maximum cabin space." },
  { icon: Sparkles, title: "Lounge Access", desc: "Complimentary premium airport lounge passes included with every ticket class." },
  { icon: ConciergeBell, title: "Bespoke Itineraries", desc: "Custom-tailored multi-city routes mapped out to your specific business timeline." },
];

export function Features() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { t } = useUi();

  // Filter features based on live user search input
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Determine pagination slice based on "View More" toggle state
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-slate-100/70 px-4 py-28 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      {/* Dynamic Ambient Blur (Ultra-soft shadowed focus) */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-slate-900/[0.02] blur-[130px] dark:bg-amber-500/5" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-slate-900/[0.02] blur-[130px] dark:bg-indigo-500/5" />
      
      {/* Soft Engineering Grid Overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]" />

      <SectionHeader 
        eyebrow={t('features.eyebrow')} 
        title={t('features.title')} 
        subtitle={t('features.subtitle')} 
      />

      {/* Search Bar & Counter */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-b border-slate-200 pb-6 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={t('features.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-slate-300 focus:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
        </div>
        
        {/* Data Counter */}
        <div className="self-start rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 font-mono text-xs text-slate-500 shadow-sm dark:border-white/5 dark:bg-slate-900 dark:text-slate-400 sm:self-auto">
          {t('features.showing')} {visibleItems.length} {t('features.of')} {filteredItems.length} {t('features.options')}
        </div>
      </div>

      {/* Cards Grid */}
      <motion.div 
        layout="position"
        className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, i) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.3, delay: searchQuery || showAll ? 0 : i * 0.04 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-8 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:border-slate-300/40 hover:bg-white hover:shadow-xl hover:shadow-slate-300/50 dark:border-white/5 dark:bg-slate-900/30 dark:shadow-none dark:hover:border-amber-500/20 dark:hover:bg-slate-900/60"
              >
                {/* Micro-glow (only active in dark mode) */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(1000px_at_50%_0px,rgba(245,158,11,0.03),transparent_50%)]" />
                
                <div>
                  {/* Icon Design */}
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 shadow-inner transition-all duration-300 group-hover:border-slate-300 group-hover:bg-slate-900 group-hover:text-white dark:border-white/10 dark:bg-slate-950 dark:text-slate-400 dark:group-hover:border-amber-500 dark:group-hover:bg-amber-500 dark:group-hover:text-slate-950">
                    <Icon className="h-4 w-4 stroke-[2]" />
                  </div>
                  
                  {/* Content Elements */}
                  <h3 className="text-lg font-semibold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-slate-950 dark:text-slate-100 dark:group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Action Trigger Button */}
      {filteredItems.length > 6 && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex active:scale-95 items-center gap-2 rounded-xl border border-slate-200 bg-white/85 px-6 py-3 text-sm font-medium tracking-wide text-slate-600 shadow-md shadow-slate-200/50 transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:shadow-md dark:hover:border-white/20 dark:hover:bg-slate-900/80 dark:hover:text-white"
          >
            <span>{showAll ? t('features.collapse') : t('features.viewAll')}</span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-amber-500"
            >
              ↓
            </motion.span>
          </button>
        </div>
      )}

      {/* Zero-State Feedback */}
      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center text-sm text-slate-400 dark:text-slate-500"
        >
          {t('features.none')} "{searchQuery}".
        </motion.div>
      )}
    </section>
  );
}