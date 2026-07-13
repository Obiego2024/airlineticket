import { motion } from "framer-motion";
import { Star, Cloud, Clock } from "lucide-react";
import santorini from "../../../Assets/dest-santorini.jpg";
import { useUi } from "@/context/UiContext";
import tokyo from "../../../Assets/dest-tokyo.jpg";
import dubai from "../../../Assets/dest-dubai.jpg";
import paris from "../../../Assets/dest-paris.jpg";
import nyc from "../../../Assets/dest-nyc.jpg";
import bali from "../../../Assets/dest-bali.jpg";

const dests = [
  { city: "Santorini", country: "Greece", price: 549, dur: "9h 30m", weather: "26°", rating: 4.9, img: santorini },
  { city: "Tokyo", country: "Japan", price: 892, dur: "14h 10m", weather: "22°", rating: 4.8, img: tokyo },
  { city: "Dubai", country: "UAE", price: 675, dur: "12h 20m", weather: "34°", rating: 4.9, img: dubai },
  { city: "Paris", country: "France", price: 429, dur: "7h 40m", weather: "18°", rating: 4.7, img: paris },
  { city: "New York", country: "USA", price: 389, dur: "6h 05m", weather: "16°", rating: 4.8, img: nyc },
  { city: "Bali", country: "Indonesia", price: 799, dur: "17h 45m", weather: "29°", rating: 4.9, img: bali },
];

export function Destinations() {
  const { t } = useUi();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeader
        eyebrow={t('destinations.eyebrow')}
        title={t('destinations.title')}
        subtitle={t('destinations.subtitle')}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dests.map((d, i) => (
          <motion.article
            key={d.city}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative rounded-3xl overflow-hidden bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={d.img}
                alt={`${d.city}, ${d.country}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/20 to-transparent" />

              <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full glass-dark text-xs font-semibold text-white">
                <Star className="h-3 w-3 fill-warning text-warning" /> {d.rating}
              </div>
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full glass-dark text-xs font-semibold text-white">
                <Cloud className="h-3 w-3" /> {d.weather}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/70">{d.country}</p>
                    <h3 className="text-2xl font-bold font-display">{d.city}</h3>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/80">
                      <Clock className="h-3 w-3" /> {d.dur}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-white/60 tracking-wider">{t('destinations.from')}</p>
                    <p className="text-2xl font-extrabold">${d.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}