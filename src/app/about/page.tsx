import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamSection } from "@/components/sections/TeamSection";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">Our Mission</h2>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-navy-dark mb-8 max-w-4xl">To democratize high-precision clinical monitoring through AI-retrofit innovation.</h1>
                    <p className="text-xl text-navy-dark/60 max-w-2xl leading-relaxed">We believe that advanced monitoring shouldn&apos;t be a luxury. By retrofitting existing infrastructure, we democratize clinical data and empower hospitals everywhere.</p>
                </div>
            </div>
            <TeamSection />
            <Footer />
        </main>
    );
}
