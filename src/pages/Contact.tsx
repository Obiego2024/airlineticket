import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/home/Destinations";
import { useUi } from "@/context/UiContext";

// 1. Fixed: Import your actual Footer component, not the one from node_modules

// 2. Fixed: Export ContactPage as the default functional component for React Router DOM
export default function ContactPage() {
  const { t } = useUi();

  return (
    <div className="min-h-screen bg-background">
      {/* Note: If Navbar and Footer are already automatically wrapped in your App.tsx, 
        you can safely delete the <Navbar /> and <Footer /> tags here to avoid duplicates!
      */}
      <main className="pt-32 pb-24">
        <SectionHeader 
          eyebrow={t('contact.eyebrow')} 
          title={t('contact.title')} 
          subtitle={t('contact.subtitle')} 
        />
        <div className="mx-auto max-w-6xl px-6 mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { I: Mail, t: t('contact.email'), v: "hello@skylux.travel" },
              { I: Phone, t: t('contact.phone'), v: "+1 (800) SKY-LUXE" },
              { I: MapPin, t: t('contact.hq'), v: "One World Trade Center, NYC" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-soft)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)]">
                  <c.I className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.t}</p>
                  <p className="font-bold">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="rounded-3xl bg-card border border-border p-8 shadow-[var(--shadow-soft)] space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label={t('contact.firstName')} />
              <Input label={t('contact.lastName')} />
            </div>
            <Input label={t('contact.email')} type="email" />
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('contact.message')}</label>
              <textarea rows={5} className="mt-2 w-full rounded-2xl bg-background border border-border p-4 outline-none focus:border-primary" />
            </div>
            <button className="w-full py-4 rounded-2xl bg-[image:var(--gradient-primary)] text-white font-semibold shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-shadow">
              {t('contact.send')}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input type={type} className="mt-2 w-full rounded-2xl bg-background border border-border p-4 outline-none focus:border-primary" />
    </div>
  );
}