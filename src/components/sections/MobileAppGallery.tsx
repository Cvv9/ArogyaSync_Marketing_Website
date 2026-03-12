"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
    {
        url: "/images/vitalsMonitor.png", 
        title: "Dashboard View",
        desc: "Real-time vitals monitoring and historical trends."
    },
    {
        url: "/images/createaccount.png",
        title: "Account Creation",
        desc: "Secure, role-based access for medical professionals."
    },
    {
        url: "/images/dashboardview.png",
        title: "Device Scanning",
        desc: "Seamless BLE pairing and edge device configuration."
    },
    {
        url: "/images/image.png",
        title: "Patient Registration",
        desc: "Digital onboarding for new patient monitoring sessions."
    }
];

export function MobileAppGallery() {
    return (
        <section className="py-24 bg-soft-gray/30">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">Mobile Experience</h2>
                    <h3 className="text-4xl font-display font-bold text-navy-dark">Mobile App Interface Gallery</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                    {screenshots.map((shot, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-navy-dark rounded-[32px] p-6 border border-white/5 shadow-2xl group"
                        >
                            <div className="aspect-[9/19] rounded-2xl overflow-hidden mb-6 relative">
                                <Image
                                    src={shot.url}
                                    alt={shot.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="text-white font-bold mb-2">{shot.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed">{shot.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
