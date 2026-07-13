import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Star, ShieldCheck, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./Destinations";

const reviews = [
  { 
    name: "Sofia Martinez", 
    role: "Chief Procurement Officer", 
    company: "Vanguard Global",
    verification: "Enterprise Account",
    text: "The algorithmic booking pipeline fundamentally overhauled our corporate transit structure. Route discovery latency is non-existent, and the dedicated concierge service resolves high-priority scheduling conflicts instantly.",
    route: "JFK → LHR // Business Class"
  },
  { 
    name: "James Chen", 
    role: "VP of Operations", 
    company: "Apex Tech Scale",
    verification: "Corporate Client",
    text: "SkyLux successfully reduced our engineering team's operational travel overhead by 24% this fiscal year. The programmatic escrowed settlement feature makes distributed multi-passenger billing completely seamless.",
    route: "SFO → SIN // First Class"
  },
  { 
    name: "Aisha Patel", 
    role: "Managing Director", 
    company: "Patel & Partners Venture",
    verification: "Elite Tier Member",
    text: "Managing complex, multi-city international venture routing used to be an operational bottleneck. With SkyLux, our asset deployment timelines across 12 countries felt remarkably optimized from deployment to landing.",
    route: "LHR → DXB // Private Chartered"
  },
  {
    name: "Marcus Aurelius",
    role: "Global Logistics Lead",
    company: "Centurion Logistics",
    verification: "Enterprise Account",
    text: "With a global workforce, handling sudden flight cancellations used to disrupt our entire supply chain meetings. SkyLux's 24/7 dedicated concierge bypasses standard lines, re-routing our executives in minutes.",
    route: "CDG → HND // Business Class"
  },
  {
    name: "Elena Rostova",
    role: "Director of Talent",
    company: "Mirai Robotics",
    verification: "Corporate Client",
    text: "The integration of multi-currency tokenized billing directly solved our complex accounting workflows. Our global talent acquisition team moves around smoothly with zero administrative hassle.",
    route: "ICN → FRA // Premium Economy"
  },
  {
    name: "David Vance",
    role: "Managing Partner",
    company: "Vance Equity Group",
    verification: "Elite Tier Member",
    text: "Private chartered scaling configurations usually take days to provision accurately. SkyLux's dynamic automated availability engine gives us immediate pricing and scheduling clarity in under an hour.",
    route: "MIA → VVI // Private Chartered"
  },
  {
    name: "Sanya Musslin",
    role: "International Controller",
    company: "Nordic Fintech Labs",
    verification: "Corporate Client",
    text: "The real-time fare volatility projections saved our departments significant overhead on late-notice engineering syncs. An absolute game changer for scalable corporate tech operations.",
    route: "CPH → SFO // Business Class"
  },
  {
    name: "Janna Patel",
    role: "VP of Global Events",
    company: "Nexus Media Group",
    verification: "Enterprise Account",
    text: "Moving high-profile event speakers across three distinct continents simultaneously requires flawless operational timing. SkyLux handled every itinerary vector cleanly with zero latency.",
    route: "AMS → LAX // First Class"
  },
  {
    name: "Tariq Al-Mansoor",
    role: "Chief Strategy Officer",
    company: "Emirates Strategic Fund",
    verification: "Elite Tier Member",
    text: "Security compliance protocols across cross-border financial routing are strict. SkyLux's utilization of bank-grade cryptographic architecture fulfills our compliance criteria effortlessly.",
    route: "DXB → HKG // First Class"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const CARD_WIDTH = 400; 
  const CARD_GAP = 24; 
  const AUTO_PLAY_INTERVAL = 4000; // Slide every 4 seconds

  const handleScroll = (direction: "prev" | "next") => {
    let nextIndex = activeIndex;
    if (direction === "prev") {
      nextIndex = activeIndex > 0 ? activeIndex - 1 : reviews.length - 1; // Loops back to end
    }
    if (direction === "next") {
      nextIndex = activeIndex < reviews.length - 1 ? activeIndex + 1 : 0; // Loops back to start
    }
    
    setActiveIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const targetX = -(index * (CARD_WIDTH + CARD_GAP)) + (containerWidth / 2) - (CARD_WIDTH / 2);
    
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  };

  // Handle Auto-Sliding Loop
  useEffect(() => {
    if (isHovered) return; // Pause auto-slide when reading/hovering

    const timer = setInterval(() => {
      handleScroll("next");
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered]);

  // Handle window resizing recalculation
  useEffect(() => {
    scrollToIndex(activeIndex);
    const handleResize = () => scrollToIndex(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white sm:px-6 lg:px-8">
      {/* Background Ambience styling */}
      <div className="absolute top-1/2 right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[140px]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader 
          eyebrow="Case Studies" 
          title="Trusted by Modern Enterprises" 
          subtitle="Discover how leading corporate travelers optimize international routing efficiency." 
        />

        {/* Carousel Container */}
        <div 
          ref={containerRef} 
          className="relative mt-16 w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            style={{ x, display: "flex", gap: `${CARD_GAP}px` }}
            drag="x"
            dragConstraints={containerRef}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                handleScroll("next");
              } else if (info.offset.x > swipeThreshold) {
                handleScroll("prev");
              } else {
                scrollToIndex(activeIndex); 
              }
            }}
          >
            {reviews.map((r, i) => {
              const isSelected = activeIndex === i;
              const initials = r.name.split(" ").map(n => n[0]).join("");

              return (
                <motion.blockquote
                  key={r.name}
                  animate={{
                    scale: isSelected ? 1 : 0.95,
                    opacity: isSelected ? 1 : 0.35,
                    borderColor: isSelected ? "rgba(245, 158, 11, 0.4)" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isSelected ? "0 0 50px rgba(245, 158, 11, 0.06)" : "none"
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
                  className="relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-slate-900/40 p-8 backdrop-blur-xl"
                >
                  <div>
                    {/* Top Verification Header */}
                    <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-1 text-[10px] font-mono tracking-wider text-amber-500 uppercase">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>{r.verification}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className="h-3 w-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>

                    {/* Content Text */}
                    <p className="text-sm font-normal leading-relaxed text-slate-300">
                      "{r.text}"
                    </p>
                  </div>

                  {/* Verified Metadata Footer */}
                  <div className="mt-8 border-t border-white/5 pt-5">
                    <div className="mb-3 font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
                      <Building2 className="h-3 w-3" />
                      <span>Verified Manifest: {r.route}</span>
                    </div>
                    
                    <footer className="flex items-center gap-3">
                      {/* Premium Initials/Avatar Image Frame */}
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 p-[1px] shadow-inner border border-white/10 group-hover:border-amber-500/30">
                        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-gradient-to-tr from-amber-500/10 to-amber-500/20 font-mono text-xs font-bold tracking-tight text-amber-400">
                          {initials}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold tracking-tight text-slate-200">
                          {r.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {r.role}, <span className="text-slate-500">{r.company}</span>
                        </p>
                      </div>
                    </footer>
                  </div>
                </motion.blockquote>
              );
            })}
          </motion.div>
        </div>

        {/* Lower Utility Control Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row max-w-5xl mx-auto border-t border-white/5 pt-8">
          
          {/* Tracking Step Monitor Indicator */}
          <div className="flex items-center gap-2">
            <div className="text-xs font-mono text-slate-400">
              Analysing record <span className="text-amber-500 font-bold">{activeIndex + 1}</span> of {reviews.length}
            </div>
            <div className="hidden sm:flex h-1.5 w-32 items-center rounded-full bg-white/5 overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500"
                animate={{ width: `${((activeIndex + 1) / reviews.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Interactive Navigation Control Pill Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleScroll("prev")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 transition-all hover:border-white/20 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll("next")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 transition-all hover:border-white/20 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}