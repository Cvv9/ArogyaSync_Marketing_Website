import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ROIComparisonTable } from "@/components/sections/ROIComparisonTable";
import { FraudPrevention } from "@/components/sections/FraudPrevention";
import { ROICalculator } from "@/components/sections/ROICalculator";

export default function ROIPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 bg-white">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-navy-dark mb-4">Impact Beyond the Bottom Line.</h1>
                    <p className="text-xl text-navy-dark/60 max-w-2xl leading-relaxed">We don&apos;t just save money; we create a foundation of trust and efficiency in clinical workflows.</p>
                </div>
            </div>
            <ROIComparisonTable />
            <ROICalculator />
            <FraudPrevention />
            <Footer />
        </main>
    );
}
