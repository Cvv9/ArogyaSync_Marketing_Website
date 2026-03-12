import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HardwareShowcase } from "@/components/sections/HardwareShowcase";
import { SoftwareWalkthrough } from "@/components/sections/SoftwareWalkthrough";
import { MobileAppGallery } from "@/components/sections/MobileAppGallery";


export default function GalleryPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-navy-dark mb-4">Ecosystem in Action.</h1>
                    <p className="text-xl text-navy-dark/60 max-w-2xl mx-auto leading-relaxed">Visualize the future of connected healthcare through our hardware and software showcase.</p>
                </div>
            </div>
            <HardwareShowcase />
            <SoftwareWalkthrough />
            <MobileAppGallery />
            <Footer />
        </main>
    );
}
