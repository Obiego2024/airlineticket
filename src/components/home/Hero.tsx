import { motion } from "framer-motion";
import { ShieldCheck, CalendarRange, ArrowRight } from "lucide-react";
import heroImg from "../../../Assets/hero-plane.jpg";
import SearchCard from "../../components/home/SearchCard";
import { useUi } from "@/context/UiContext";
import { Link } from "react-router-dom";

export function Hero() {
  const { t } = useUi();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-8 md:pb-16 overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      
      {/* Eye-Friendly Background Image & Optimized Mask Overlay */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <img
          src={heroImg}
          alt="Premium carrier aircraft above altitude clouds"
          className="h-full w-full object-cover opacity-20 dark:opacity-75 transition-opacity duration-300 filter saturate-[0.85]"
          width={1920}
          height={1200}
          loading="eager"
        />
        
        {/* Multidirectional Gradients for Maximum Copy Contrast */}
        {/* Light Mode Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50 dark:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/45 to-transparent dark:hidden" />
        
        {/* Dark Mode Gradients */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent" />
        
        {/* Muted Blueprint Dot Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000001_1px,transparent_1px),linear-gradient(to_bottom,#00000001_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)]" />
      </div>

      {/* Ultra-Soft Ambient Backlighting */}
      <motion.div 
        animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-slate-900/[0.01] blur-[120px] dark:bg-amber-500/5" 
      />
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-indigo-500/[0.01] blur-[140px] dark:bg-indigo-500/5" 
      />

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Top Operational Badges & Immediate Action Link */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-slate-800 shadow-sm dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
              <span>{t('hero.badge')}</span>
            </span>

            {/* "Book Now" Direct Shortcut */}
            <Link
              to="/flights"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-[10px] font-mono uppercase tracking-widest text-amber-800 hover:bg-amber-500/20 active:scale-98 transition-all dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-400 dark:hover:bg-amber-500/10"
            >
              <CalendarRange className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Book Flights Now</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          {/* Typography Header */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-950 dark:text-white">
            {t('hero.titleLine1')} <br />
            {t('hero.titleLine2')}{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent dark:from-amber-400 dark:via-amber-300 dark:to-amber-200">
              {t('hero.highlight')}
            </span>
          </h1>
          
          {/* Softened Sub-description */}
          <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-700 max-w-xl dark:text-slate-300/95">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Dynamic Search Card Module */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12"
        >
          <SearchCard />
        </motion.div>
      </div>
    </section>
  );
}