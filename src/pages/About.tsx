import { SectionHeader } from "@/components/home/Destinations";
import { Testimonials } from "@/components/home/Testimonials";
import { useUi } from "@/context/UiContext";

// 1. Rename to a standard React component function
export default function About() {
  const { t } = useUi();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeader 
            eyebrow={t('about.eyebrow')} 
            title={t('about.title')} 
            subtitle={t('about.subtitle')} 
          />
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-16 grid gap-6 md:grid-cols-3">
          {[
            { k: "2M+", v: t('about.travelers') },
            { k: "500+", v: t('about.partners') },
            { k: "190", v: t('about.countries') },
          ].map((s) => (
            <div key={s.v} className="rounded-3xl bg-card border border-border p-8 text-center shadow-[var(--shadow-soft)]">
              <p className="text-5xl font-extrabold gradient-text">{s.k}</p>
              <p className="mt-2 text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
        <Testimonials />
      </main>
    </div>
  );
}