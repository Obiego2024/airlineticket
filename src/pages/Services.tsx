import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SectionHeader } from "@/components/home/Destinations";
import { useUi } from "@/context/UiContext";

// Fixed: Export as a standard default functional component for React Router DOM
export default function Services() {
  const { t } = useUi();

  return (
    <div className="min-h-screen bg-background">
      {/* Note: Removed Navbar and Footer from here because they are handled 
        globally inside your layout wrappers in App.tsx 
      */}
      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
            subtitle={t('services.subtitle')}
          />
        </section>
        <Features />
        <HowItWorks />
      </main>
    </div>
  );
}