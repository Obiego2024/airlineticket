import { useState } from "react";
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
  CheckCircle,
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

const INPUT_CLASSES =
  "bg-transparent outline-none w-full text-sm font-semibold text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-0";

// ==========================================
// Sub-Component: Input Field Layout Wrapper
// ==========================================
interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function InputField({ label, icon, children, className = "" }: InputFieldProps) {
  return (
    <label
      className={`group relative flex flex-col gap-1 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer ${className}`}
    >
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mt-0.5 flex items-center w-full">
        {children}
      </div>
    </label>
  );
}

// ==========================================
// Sub-Component: Enterprise Dropdown Select
// ==========================================
interface FormSelectProps {
  label: string;
  icon: React.ReactNode;
  value: string; // Structured as "City (CODE)"
  options: readonly AirportOption[];
  onChange: (value: string) => void;
  className?: string;
}

function FormSelect({ label, icon, value, options, onChange, className = "" }: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedAirport =
    options.find((opt) => `${opt.city} (${opt.code})` === value) || options[0];

  return (
    <div
      className={`relative flex flex-col gap-1 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all duration-200 group ${className}`}
    >
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 select-none">
        <span className="text-primary">{icon}</span>
        {label}
      </span>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center justify-between w-full text-sm font-semibold text-neutral-850 dark:text-neutral-100 text-left pt-0.5 outline-none focus:ring-0"
      >
        <span className="truncate">
          {selectedAirport.city} ({selectedAirport.code})
        </span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-1.5 shadow-xl"
            >
              {options.map((option) => {
                const optionValue = `${option.city} (${option.code})`;
                const isSelected = optionValue === value;

                return (
                  <li
                    key={option.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(optionValue);
                      setIsOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onChange(optionValue);
                        setIsOpen(false);
                      }
                    }}
                    tabIndex={0}
                    className={`flex flex-col w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer outline-none transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:bg-neutral-100 dark:focus:bg-neutral-900"
                    }`}
                  >
                    <span>
                      {option.city} ({option.code})
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-normal truncate">
                      {option.airport}
                    </span>
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
  
  // Date and Booking State
  const [departDate, setDepartDate] = useState("2026-08-14");
  const [returnDate, setReturnDate] = useState("2026-08-22");
  const [passengers, setPassengers] = useState("1 Adult");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [promoCode, setPromoCode] = useState("");
  
  // Flow control states
  const [isBooked, setIsBooked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const handleSwapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearchFlights = () => {
    setIsSearching(true);
    // Simulate flight searching process, routing to flights page
    setTimeout(() => {
      setIsSearching(false);
      navigate({ to: "/flights" });
    }, 800);
  };

  const handleInstantBooking = () => {
    setIsBooked(true);
    // Build real flight dynamic parameter payload here
    const flightDetails = {
      tripType: tab,
      from,
      to,
      departDate,
      returnDate: tab === "Round Trip" ? returnDate : null,
      passengers,
      cabinClass,
      promoCode,
    };
    console.log("Confirmed Booking Payload Details:", flightDetails);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-neutral-950 rounded-3xl p-5 md:p-6 shadow-xl max-w-5xl mx-auto border border-neutral-200/80 dark:border-neutral-800"
    >
      {isBooked ? (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="py-12 text-center flex flex-col items-center justify-center gap-4"
        >
          <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Booking Successfully Initiated!</h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md text-sm leading-relaxed">
            We are preparing your {cabinClass} reservation from {from} to {to} for {passengers}. Check your dynamic dashboard route parameters to finalize.
          </p>
          <button 
            type="button" 
            onClick={() => setIsBooked(false)} 
            className="mt-4 px-6 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Modify Search
          </button>
        </motion.div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <div className="flex p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800">
              {TRIP_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    tab === t
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-sm font-bold"
                      : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-semibold text-neutral-550 dark:text-neutral-400">
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
                className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-primary"
              >
                <ArrowLeftRight className="h-4 w-4" />
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
              <input 
                type="date" 
                className={INPUT_CLASSES} 
                value={departDate} 
                onChange={(e) => setDepartDate(e.target.value)}
              />
            </InputField>

            {tab === "Round Trip" && (
              <InputField
                label="Return"
                icon={<Calendar className="h-4 w-4" />}
                className="md:col-span-2"
              >
                <input 
                  type="date" 
                  className={INPUT_CLASSES} 
                  value={returnDate} 
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </InputField>
            )}

            <InputField
              label="Passengers & Class"
              icon={<Users className="h-4 w-4" />}
              className={
                tab === "Round Trip" ? "md:col-span-12 lg:col-span-2" : "md:col-span-4 lg:col-span-2"
              }
            >
              <div className="flex gap-2 items-center w-full">
                <select 
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className={`${INPUT_CLASSES} appearance-none cursor-pointer bg-transparent`}
                >
                  <option className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">1 Adult</option>
                  <option className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">2 Adults</option>
                  <option className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">Family (4)</option>
                </select>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <select 
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className={`${INPUT_CLASSES} appearance-none cursor-pointer bg-transparent`}
                >
                  <option className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">Economy</option>
                  <option className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">Business</option>
                  <option className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">First</option>
                </select>
              </div>
            </InputField>
          </div>

          {/* Actions Row */}
          <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
            <div className="w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full text-xs font-semibold tracking-wide uppercase rounded-xl bg-neutral-50 dark:bg-neutral-900 px-4 py-3 border border-neutral-200 dark:border-neutral-800 outline-none focus:border-primary dark:focus:border-primary text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={handleSearchFlights}
                disabled={isSearching}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-neutral-700 dark:text-neutral-250 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all border border-neutral-200 dark:border-neutral-800"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "Searching..." : "Search Flights"}
              </button>

              <button
                type="button"
                onClick={handleInstantBooking}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default SearchCard;