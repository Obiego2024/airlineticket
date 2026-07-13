import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timer, Plane } from "lucide-react";
import { useUi } from "@/context/UiContext";
import { useNavigate } from "react-router-dom";

const deals = [
  {
    code: "EK",
    airline: "Emirates",
    from: "New York",
    to: "Dubai",
    price: 549,
    old: 899,
    off: 39,
    color: "#DC2626",
  },
  {
    code: "QR",
    airline: "Qatar Airways",
    from: "London",
    to: "Bali",
    price: 689,
    old: 1099,
    off: 37,
    color: "#7C1D3F",
  },
  {
    code: "SQ",
    airline: "Singapore Airlines",
    from: "San Francisco",
    to: "Tokyo",
    price: 749,
    old: 1249,
    off: 40,
    color: "#EAB308",
  },
  {
    code: "BA",
    airline: "British Airways",
    from: "Manchester",
    to: "New York",
    price: 499,
    old: 799,
    off: 38,
    color: "#1D4ED8",
  },
  {
    code: "LH",
    airline: "Lufthansa",
    from: "Frankfurt",
    to: "Toronto",
    price: 579,
    old: 899,
    off: 36,
    color: "#1E40AF",
  },
  {
    code: "AF",
    airline: "Air France",
    from: "Paris",
    to: "Rome",
    price: 199,
    old: 349,
    off: 43,
    color: "#2563EB",
  },
  {
    code: "KL",
    airline: "KLM",
    from: "Amsterdam",
    to: "Cape Town",
    price: 649,
    old: 999,
    off: 35,
    color: "#0EA5E9",
  },
  {
    code: "TK",
    airline: "Turkish Airlines",
    from: "Istanbul",
    to: "Bangkok",
    price: 529,
    old: 849,
    off: 38,
    color: "#B91C1C",
  },
  {
    code: "CX",
    airline: "Cathay Pacific",
    from: "Hong Kong",
    to: "Sydney",
    price: 699,
    old: 1099,
    off: 36,
    color: "#166534",
  },
  {
    code: "ET",
    airline: "Ethiopian Airlines",
    from: "Lagos",
    to: "Addis Ababa",
    price: 349,
    old: 549,
    off: 36,
    color: "#15803D",
  },
  {
    code: "AI",
    airline: "Air India",
    from: "Delhi",
    to: "Dubai",
    price: 279,
    old: 459,
    off: 39,
    color: "#EA580C",
  },
  {
    code: "QF",
    airline: "Qantas",
    from: "Sydney",
    to: "Los Angeles",
    price: 799,
    old: 1299,
    off: 38,
    color: "#B91C1C",
  },
  {
    code: "NZ",
    airline: "Air New Zealand",
    from: "Auckland",
    to: "Singapore",
    price: 589,
    old: 899,
    off: 34,
    color: "#111827",
  },
  {
    code: "DL",
    airline: "Delta Air Lines",
    from: "Atlanta",
    to: "Paris",
    price: 619,
    old: 999,
    off: 38,
    color: "#2563EB",
  },
  {
    code: "UA",
    airline: "United Airlines",
    from: "Chicago",
    to: "Honolulu",
    price: 459,
    old: 749,
    off: 39,
    color: "#1E3A8A",
  },
  {
    code: "AA",
    airline: "American Airlines",
    from: "Dallas",
    to: "Cancún",
    price: 299,
    old: 499,
    off: 40,
    color: "#2563EB",
  },
  {
    code: "AC",
    airline: "Air Canada",
    from: "Toronto",
    to: "Vancouver",
    price: 239,
    old: 399,
    off: 40,
    color: "#DC2626",
  },
  {
    code: "IB",
    airline: "Iberia",
    from: "Madrid",
    to: "Lisbon",
    price: 149,
    old: 249,
    off: 40,
    color: "#991B1B",
  },
  {
    code: "EY",
    airline: "Etihad Airways",
    from: "Abu Dhabi",
    to: "Maldives",
    price: 429,
    old: 699,
    off: 39,
    color: "#92400E",
  },
  {
    code: "MH",
    airline: "Malaysia Airlines",
    from: "Kuala Lumpur",
    to: "Seoul",
    price: 459,
    old: 729,
    off: 37,
    color: "#1D4ED8",
  }
];
function useCountdown() {
  const [t, setT] = useState({ h: 12, m: 34, s: 56 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(({ h, m, s }) => {
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Deals() {
  const countdown = useCountdown();
  const { t } = useUi();
  const navigate = useNavigate();

  const handleBookNow = (deal: typeof deals[number]) => {
    navigate("/paymentform", {
      state: {
        airline: deal.airline,
        airlineCode: deal.code,
        from: deal.from,
        to: deal.to,
        price: deal.price,
        oldPrice: deal.old,
        discount: deal.off,
        cabin: "Business",
      },
    });
  };

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <span className="inline-block px-3 py-1 rounded-full bg-warning/15 text-warning text-xs font-bold uppercase tracking-widest">
              {t('deals.eyebrow')}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight">
              {t('deals.title')}
            </h2>
          </div>
          <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
            <Timer className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold text-foreground/70">{t('deals.endsIn')}</span>
            <div className="flex gap-1 font-mono text-sm font-bold">
              <span className="bg-foreground text-background rounded-md px-2 py-1">{String(countdown.h).padStart(2, "0")}</span>:
              <span className="bg-foreground text-background rounded-md px-2 py-1">{String(countdown.m).padStart(2, "0")}</span>:
              <span className="bg-foreground text-background rounded-md px-2 py-1">{String(countdown.s).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {deals.map((d, i) => (
            <motion.div
              key={d.airline}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all"
            >
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-2xl" style={{ background: d.color }} />
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl font-bold text-white" style={{ background: d.color }}>
                    {d.code}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{d.airline}</p>
                    <p className="text-xs text-muted-foreground">Direct · Business</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-destructive text-white">
                  -{d.off}%
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">{t('deals.from')}</p>
                  <p className="font-bold">{d.from}</p>
                </div>
                <div className="flex-1 relative">
                  <div className="border-t-2 border-dashed border-border" />
                  <Plane className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{t('deals.to')}</p>
                  <p className="font-bold">{d.to}</p>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground line-through">${d.old}</p>
                  <p className="text-3xl font-extrabold gradient-text">${d.price}</p>
                </div>
                <button onClick={() => handleBookNow(d)} className="px-5 py-2.5 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-opacity">
                  {t('deals.bookNow')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}