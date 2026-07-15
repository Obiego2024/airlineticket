import { motion } from "framer-motion";

const partners = [
  "Emirates", 
  "Qatar Airways", 
  "Singapore Airlines", 
  "Lufthansa", 
  "Delta Air Lines", 
  "ANA", 
  "British Airways", 
  "Air France", 
  "Cathay Pacific", 
  "KLM"
];

export function Partners() {
  return (
    <section className="relative border-y border-black/5 dark:border-white/5 bg-slate-50/40 dark:bg-slate-950/40 py-12 overflow-hidden backdrop-blur-md">
      {/* Structural Engineering Grid Subtle Highlights */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px)] bg-[size:6rem_100%]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Professional Meta Section Identifier */}
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
          Global Interconnectivity // <span className="text-amber-600 dark:text-amber-500/80">500+ Validated Carrier Nodes</span>
        </p>
        
        {/* Infinite Logo Marquee Ribbon with Linear Blur Masking */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
          
          <motion.div 
            className="flex gap-16 pr-16 w-max"
            animate={{ x: [0, -1200] }} // Adjust value slightly if you dramatically increase list size
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {/* Multiplied arrays ensure seamless continuous layout looping */}
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center font-sans text-lg font-bold uppercase tracking-wider text-slate-400/80 dark:text-slate-500/60 hover:text-amber-600 dark:hover:text-amber-400/90 transition-colors duration-300 cursor-default whitespace-nowrap select-none group"
              >
                {/* Structural prefix dot element typical of high-end flight systems */}
                <span className="text-amber-600/30 dark:text-amber-500/20 mr-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                  //
                </span>
                {partner}
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}