import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { KeyCapabilitiesGrid } from "@/components/sections/KeyCapabilitiesGrid";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { SuccessCarousel } from "@/components/sections/SuccessCarousel";
import { TrustCompliance } from "@/components/sections/TrustCompliance";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemCards />
      <KeyCapabilitiesGrid />
      <ImpactMetrics />
      <SuccessCarousel />
      <TrustCompliance />
      <FooterCTA />
      <Footer />
    </main>
  );
}
