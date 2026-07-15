import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API pipeline latency
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="relative mx-auto max-w-auto px-4 pb-28 bg-slate-100/70 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* Premium Depth Panel Container */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 p-10 md:p-16 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/40 dark:shadow-none">
        
        {/* Soft Mesh Grid Background & Custom Orbs */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000001_1px,transparent_1px),linear-gradient(to_bottom,#00000001_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]" />
        <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-slate-900/[0.01] blur-3xl dark:bg-amber-500/5" />
        <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-indigo-500/[0.015] blur-3xl dark:bg-indigo-500/5" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Headline Copy Elements */}
          <div className="max-w-2xl lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:border-white/5 dark:bg-slate-950 dark:text-amber-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>SkyLux Intelligence Dispatch</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl leading-[1.1] dark:text-white">
              Acquire Exclusive <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent dark:from-amber-400 dark:to-amber-200">Fare-Drop Intelligence</span>
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-500 max-w-lg dark:text-slate-400">
              Join over 500,000 global travelers who bypass standard tariff pricing structures, securing up to 60% savings via insider terminal routes.
            </p>
          </div>

          {/* Form Processing Module */}
          <div className="w-full lg:col-span-5">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form
                  key="newsletter-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 max-w-md lg:ml-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      disabled={status === "loading"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter operational email address..."
                      className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-slate-300 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200 dark:placeholder-slate-500"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="text-[10px] font-mono text-slate-400 text-center sm:text-left pl-1 dark:text-slate-500">
                    Zero spam. Encrypted delivery protocol natively maintained.
                  </div>
                </motion.form>
              ) : (
                /* Sleek Animated Zero-State Post Submission Success */
                <motion.div
                  key="newsletter-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-6 border border-amber-500/30 bg-amber-500/[0.03] rounded-2xl max-w-md lg:ml-auto dark:border-amber-500/20 dark:bg-amber-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950">
                    <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900 tracking-tight dark:text-white">
                    Terminal Link Established
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 max-w-xs dark:text-slate-400">
                    Verification vector dispatched. Prepare to receive incoming routing optimization alerts.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}