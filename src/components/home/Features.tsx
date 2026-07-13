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
    <section className="relative overflow-hidden bg-slate-950 px-4 py-28 text-white sm:px-6 lg:px-8">
      {/* High-End Background Ambient Radiance */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[140px]" />
      
      {/* Fine-lined Engineering Grid Matrix */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />

      <SectionHeader 
        eyebrow={t('features.eyebrow')} 
        title={t('features.title')} 
        subtitle={t('features.subtitle')} 
      />

      {/* Professional Search Bar & Live Counter Toolbelt */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={t('features.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-amber-500/40 focus:bg-slate-900 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>
        
        {/* Dynamic Data Counter Badge */}
        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 self-start sm:self-auto">
          {t('features.showing')} {visibleItems.length} {t('features.of')} {filteredItems.length} {t('features.options')}
        </div>
      </div>

      {/* Feature Layout Grid with Adaptive Physics */}
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
                whileHover={{ y: -4, borderColor: "rgba(245, 158, 11, 0.25)" }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-slate-900/30 p-8 backdrop-blur-xl transition-colors duration-300 hover:bg-slate-900/60"
              >
                {/* Micro-glow Radial Light follow on Hover */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_at_50%_0px,rgba(245,158,11,0.03),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  {/* Clean Technical Icon Design */}
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-slate-400 transition-all duration-300 group-hover:border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                    <Icon className="h-4 w-4 stroke-[2]" />
                  </div>
                  
                  {/* Content Elements */}
                  <h3 className="text-lg font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Dynamic Action Trigger Button */}
      {filteredItems.length > 6 && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-6 py-3 text-sm font-medium tracking-wide text-slate-300 shadow-md transition-all hover:border-white/20 hover:text-white hover:bg-slate-900/80 active:scale-98"
          >
            <span>{showAll ? t('features.collapse') : t('features.viewAll')}</span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="text-slate-500 group-hover:text-amber-500 transition-colors"
            >
              ↓
            </motion.span>
          </button>
        </div>
      )}

      {/* Clean Zero-State Search Feedback */}
      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center text-sm text-slate-500"
        >
          {t('features.none')} "{searchQuery}".
        </motion.div>
      )}
    </section>
  );
}