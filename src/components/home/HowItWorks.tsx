import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MousePointerClick, CreditCard, Ticket, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader } from "./Destinations";

const steps = [
  { 
    icon: Search, 
    title: "Global Meta-Search", 
    desc: "Scan real-time inventory systems across 500+ commercial carriers simultaneously.",
    details: ["Multi-routing algorithms", "Live seat map initialization", "Bespoke corporate filtering"]
  },
  { 
    icon: MousePointerClick, 
    title: "Algorithmic Comparison", 
    desc: "Evaluate smart alternatives side-by-side using dynamic parameter matching tools.",
    details: ["Cabin space indexing", "Historical delay analytics", "Fare volatility projections"]
  },
  { 
    icon: CreditCard, 
    title: "Escrowed Settlement", 
    desc: "Finalize transactions securely with bank-grade multi-currency protocol protection.",
    details: ["Biometric verification", "Split-billing configuration", "Instant tokenized invoice routing"]
  },
  { 
    icon: Ticket, 
    title: "Automated Issuance", 
    desc: "Acquire global digital boarding tokens instantly dispatched to operational endpoints.",
    details: ["Apple Wallet integration", "Automated API sync checking", "Dynamic check-in notifications"]
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative overflow-hidden bg-slate-100/70 py-28 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/[0.02] blur-[130px] dark:bg-amber-500/5" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Workflow Architecture" title="Seamless Operations in 4 Core Stages" />

        <div className="mt-20">
          {/* Step Track Connective Background Pipeline */}
          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Horizontal progress bar for desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-slate-200 -z-10 dark:bg-white/5">
              <motion.div 
                className="h-full bg-slate-900 dark:bg-gradient-to-r dark:from-amber-500 dark:via-amber-400 dark:to-amber-500" 
                animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>

            {steps.map((s, i) => {
              const Icon = s.icon;
              const isSelected = activeStep === i;
              const isCompleted = activeStep > i;

              return (
                <button
                  key={s.title}
                  onClick={() => setActiveStep(i)}
                  className="group relative flex flex-col items-center text-center outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-slate-400 rounded-2xl p-4 transition-all duration-300 dark:focus-visible:ring-amber-500/50"
                >
                  {/* Icon Indicator Orb */}
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isSelected 
                      ? "border-slate-800 bg-slate-950 text-white shadow-lg shadow-slate-300/40 dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950 dark:shadow-[0_0_25px_rgba(245,158,11,0.3)]" 
                      : isCompleted
                      ? "border-slate-300 bg-white text-slate-900"
                      : "border-slate-200 bg-white/70 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400 dark:group-hover:border-white/20 dark:group-hover:text-white"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                    ) : (
                      <Icon className="h-5 w-5 stroke-[2]" />
                    )}

                    {/* Step Index Metric Identifier */}
                    <span className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-mono font-bold border transition-colors ${
                      isSelected 
                        ? "bg-slate-950 border-slate-800 text-white dark:bg-slate-950 dark:border-amber-500 dark:text-amber-400" 
                        : "bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-white/10"
                    }`}>
                      0{i + 1}
                    </span>
                  </div>

                  {/* Operational Title Text */}
                  <h3 className={`mt-5 text-base font-semibold tracking-tight transition-colors duration-300 ${
                    isSelected ? "text-slate-950 dark:text-amber-400" : "text-slate-700 group-hover:text-slate-955 dark:text-slate-200 dark:group-hover:text-white"
                  }`}>
                    {s.title}
                  </h3>
                  
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-xs md:max-w-none dark:text-slate-400">
                    {s.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Deep-Dive Preview Submodule Panel */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md shadow-slate-200/50 backdrop-blur-xl md:p-8 max-w-5xl mx-auto dark:border-white/5 dark:bg-slate-900/30 dark:shadow-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase dark:text-amber-500">
                    Stage Features // Phase 0{activeStep + 1}
                  </span>
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {steps[activeStep].title} Integration
                  </h4>
                  <p className="text-sm text-slate-500 max-w-xl dark:text-slate-400">
                    Our backend stack deploys automated optimization pipelines at this crossroads to shield end-users from transaction delays.
                  </p>
                </div>

                {/* Sub-capabilities dynamic checklist */}
                <div className="grid gap-2 sm:grid-cols-1 border-t border-slate-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-8 min-w-[260px] dark:border-white/5">
                  {steps[activeStep].details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <ArrowRight className="h-3 w-3 text-slate-900 flex-shrink-0 dark:text-amber-500" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}