import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import LifecycleSection from "@/components/landing/LifecycleSection";
import PillarsSection from "@/components/landing/PillarsSection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import ValuesSection from "@/components/landing/ValuesSection";
import AudienceSection from "@/components/landing/AudienceSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LifecycleSection />
        <PillarsSection />
        <PhilosophySection />
        <ValuesSection />
        <AudienceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
