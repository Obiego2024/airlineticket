import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Calendar,
  Users,
  ArrowLeftRight,
  Search,
  Ticket,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

// ==========================================
// Types & Domain Data Constants
// ==========================================
type TripType = "Round Trip" | "One Way" | "Multi City";

interface AirportOption {
  code: string;
  city: string;
  airport: string;
}

const TRIP_TABS: readonly TripType[] = ["Round Trip", "One Way", "Multi City"] as const;

const AIRPORTS: readonly AirportOption[] = [
  { code: "JFK", city: "New York", airport: "John F. Kennedy Intl" },
  { code: "CDG", city: "Paris", airport: "Charles de Gaulle" },
  { code: "LHR", city: "London", airport: "Heathrow Airport" },
  { code: "HND", city: "Tokyo", airport: "Haneda Airport" },
  { code: "DXB", city: "Dubai", airport: "Dubai International" },
] as const;

// ==========================================
// Sub-Component: Enterprise Dropdown Select
// ==========================================
interface FormSelectProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: readonly AirportOption[];
  onChange: (value: string) => void;
  className?: string;
}

function FormSelect({ label, icon, value, options, onChange, className = "" }: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedAirport = options.find((opt) => `${opt.city} (${opt.code})` === value) || options[0];

  return (
    <div className={`relative flex flex-col gap-1 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 px-4 py-3 hover:bg-white/95 dark:hover:bg-white/10 transition-all duration-200 group ${className}`}>
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/60 select-none">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground text-left pt-0.5 outline-none focus:ring-0"
      >
        <span className="truncate">{selectedAirport.city} ({selectedAirport.code})</span>
        <ChevronDown className={`h-4 w-4 text-foreground/40 transition-transform duration-200 generic-transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-away backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.ul
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1.5 shadow-xl backdrop-blur-md"
            >
              {options.map((option) => {
                const optionValue = `${option.city} (${option.code})`;
                const isSelected = optionValue === value;
                return (
                  <li key={option.code}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(optionValue);
                        setIsOpen(false);
                      }}
                      className={`flex flex-col w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        isSelected 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "text-foreground hover:bg-neutral-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{option.city} ({option.code})</span>
                      <span className="text-xs text-foreground/50 font-normal truncate">{option.airport}</span>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// Main Component: SearchCard
// ==========================================
export function SearchCard() {
  const [tab, setTab] = useState<TripType>("Round Trip");
  const [from, setFrom] = useState("New York (JFK)");
  const [to, setTo] = useState("Paris (CDG)");
  const navigate = useNavigate();

  const handleSwapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass rounded-3xl p-5 md:p-6 shadow-[var(--shadow-elegant)] max-w-5xl mx-auto border border-white/20"
    >
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex p-1 bg-neutral-100 dark:bg-white/5 rounded-full border border-neutral-200/50 dark:border-white/5">
          {TRIP_TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                tab === t
                  ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm font-bold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-medium text-foreground/60">
          <Ticket className="h-4 w-4 text-primary" /> Best price guarantee
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid gap-3 md:grid-cols-12 items-stretch">
        <FormSelect
          label="From"
          icon={<Plane className="h-4 w-4 -rotate-45" />}
          value={from}
          options={AIRPORTS}
          onChange={setFrom}
          className="md:col-span-3"
        />

        {/* Swap Action Button */}
        <div className="hidden md:flex items-center justify-center self-center z-10 -mx-3 unique-swap-wrapper">
          <button
            type="button"
            onClick={handleSwapLocations}
            aria-label="Swap Origin and Destination"
            className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary" />
          </button>
        </div>

        <FormSelect
          label="To"
          icon={<MapPin className="h-4 w-4" />}
          value={to}
          options={AIRPORTS}
          onChange={setTo}
          className="md:col-span-3"
        />

        <InputField label="Depart" icon={<Calendar className="h-4 w-4" />} className="md:col-span-2">
          <input type="date" className={inputCls} defaultValue="2026-08-14" />
        </InputField>

        {tab === "Round Trip" && (
          <InputField label="Return" icon={<Calendar className="h-4 w-4" />} className="md:col-span-2">
            <input type="date" className={inputCls} defaultValue="2026-08-22" />
          </InputField>
        )}

        <InputField
          label="Passengers & Class"
          icon={<Users className="h-4 w-4" />}
          className={tab === "Round Trip" ? "md:col-span-12 lg:col-span-2" : "md:col-span-4 lg:col-span-2"}
        >
          <div className="flex gap-2 items-center w-full">
            <select className={`${inputCls} appearance-none cursor-pointer bg-transparent`}>
              <option className="bg-white dark:bg-neutral-900 text-foreground">1 Adult</option>
              <option className="bg-white dark:bg-neutral-900 text-foreground">2 Adults</option>
              <option className="bg-white dark:bg-neutral-900 text-foreground">Family (4)</option>
            </select>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <select className={`${inputCls} appearance-none cursor-pointer bg-transparent`}>
              <option className="bg-white dark:bg-neutral-900 text-foreground">Economy</option>
              <option className="bg-white dark:bg-neutral-900 text-foreground">Business</option>
              <option className="bg-white dark:bg-neutral-900 text-foreground">First</option>
            </select>
          </div>
        </InputField>
      </div>

      {/* Actions Row */}
      <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-neutral-200/40 dark:border-white/5">
        <div className="w-full md:max-w-xs">
          <input 
            type="text"
            placeholder="Promo code" 
            className="w-full text-xs font-semibold tracking-wide uppercase rounded-xl bg-neutral-100 dark:bg-white/5 px-4 py-3 border border-neutral-200 dark:border-neutral-800 outline-none focus:border-primary dark:focus:border-primary text-foreground placeholder:text-foreground/40 transition-colors" 
          />
        </div>
        
        <button
          type="button"
          onClick={() => navigate({ to: "/flights" })}
          className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all"
        >
          <Search className="h-4 w-4" />
          Search Flights
        </button>
      </div>
    </motion.div>
  );
}

// ==========================================
// Sub-Component: Standard Form Wrapper Layout
// ==========================================
const inputCls = "bg-transparent outline-none w-full text-sm font-semibold text-foreground placeholder:text-foreground/30 focus:ring-0";

function InputField({
  label,
  icon,
  children,
  className = "",
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`group relative flex flex-col gap-1 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 px-4 py-3 hover:bg-white/95 dark:hover:bg-white/10 transition-colors cursor-pointer ${className}`}>
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <div className="text-sm font-semibold text-foreground mt-0.5 flex items-center">{children}</div>
    </label>
  );
}

export default SearchCard;