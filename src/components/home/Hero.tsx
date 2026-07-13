import { motion } from "framer-motion";
import {  ShieldCheck } from "lucide-react";
import heroImg from "../../../Assets/hero-plane.jpg";
import SearchCard from "../../components/home/SearchCard";
import { useUi } from "@/context/UiContext";

export function Hero() {
  const { t } = useUi();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-8 md:pb-16 overflow-hidden bg-slate-950">
      {/* Dynamic Background Image & Mask Matrix */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <img
          src={heroImg}
          alt="Premium carrier aircraft above altitude clouds"
          className="h-full w-full object-cover opacity-85"
          width={1920}
          height={1200}
          loading="eager"
        />
        {/* Multidirectional Premium Contrast Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Controlled Floating Ambient Radiance Orbs */}
      <motion.div 
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-amber-500/5 blur-[120px]" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-[140px]" 
      />

      {/* Main Structural Hero Layout Block */}
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-white"
        >
          {/* Operational Verification Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 bg-slate-900/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-slate-300 mb-6 shadow-xl">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            <span>{t('hero.badge')}</span>
          </span>
          
          {/* Main Typography Header */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
            {t('hero.titleLine1')} <br />
            {t('hero.titleLine2')}{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
              {t('hero.highlight')}
            </span>
          </h1>
          
          {/* System Sub-description Paragraph */}
          <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-300 max-w-xl">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Search Engine Entry Module */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14"
        >
          <SearchCard />
        </motion.div>
      </div>
    </section>
  );
}