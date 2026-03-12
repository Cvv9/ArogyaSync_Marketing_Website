"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Thermometer, Heart, Wind, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const vitals = [
    { id: "hr", name: "Heart Rate", value: 72, unit: "BPM", icon: Heart, color: "text-red-500" },
    { id: "bp", name: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, color: "text-emerald" },
    { id: "spo2", name: "SpO2", value: 98, unit: "%", icon: Wind, color: "text-blue-500" },
    { id: "temp", name: "Temperature", value: 98.6, unit: "°C", icon: Thermometer, color: "text-amber-500" },
];

export function OCRShowcase() {
    const [isScanning, setIsScanning] = useState(false);
    const [detectedVitals, setDetectedVitals] = useState<string[]>([]);

    useEffect(() => {
        if (isScanning) {
            const timers = vitals.map((v, i) =>
                setTimeout(() => {
                    setDetectedVitals(prev => [...prev, v.id]);
                }, (i + 1) * 800)
            );

            const endTimer = setTimeout(() => setIsScanning(false), vitals.length * 800 + 500);

            return () => {
                timers.forEach(clearTimeout);
                clearTimeout(endTimer);
            };
        }
    }, [isScanning]);

    return (
        <section id="ocr" className="py-24 bg-clinical-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Interactive Demo */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-navy-dark/10 shadow-2xl group cursor-pointer"
                            onClick={() => {
                                if (!isScanning) {
                                    setDetectedVitals([]);
                                    setIsScanning(true);
                                }
                            }}>
                            <Image
                                src="/images/PATIENT.png"
                                alt="OCR Simulation"
                                fill
                                className="object-cover transition-transform group-hover:scale-105 duration-700"
                            />

                            {/* Overlay / Scanning Animation */}
                            <div className="absolute inset-0 bg-navy-dark/20 backdrop-brightness-50 flex items-center justify-center">
                                {!isScanning && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-clinical-white/10 backdrop-blur-md border border-clinical-white/20 p-6 rounded-2xl text-clinical-white flex flex-col items-center gap-4"
                                    >
                                        <Zap className="w-10 h-10 text-emerald animate-pulse" />
                                        <span className="font-display font-bold text-lg text-white">Click to Start Live OCR</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Scanning Line */}
                            <AnimatePresence>
                                {isScanning && (
                                    <motion.div
                                        initial={{ top: "0%" }}
                                        animate={{ top: "100%" }}
                                        transition={{ duration: vitals.length * 0.8, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald to-transparent z-20 shadow-[0_0_20px_rgba(16,183,127,0.8)]"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Data Extraction Glow Markers */}
                            <AnimatePresence>
                                {isScanning && vitals.map((v, i) => (
                                    <motion.div
                                        key={v.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: i * 0.8 }}
                                        className="absolute w-8 h-8 border-2 border-emerald rounded-full flex items-center justify-center z-30"
                                        style={{
                                            top: `${20 + (i * 15)}%`,
                                            right: '20%'
                                        }}
                                    >
                                        <div className="w-2 h-2 bg-emerald rounded-full animate-ping" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <p className="mt-6 text-center text-navy-dark/50 text-sm font-medium">
                            Demo simulating computer vision extraction from a legacy monitor
                        </p>
                    </div>

                    {/* Right: Content & Digital Output */}
                    <div className="flex-1 space-y-10">
                        <div>
                            <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">
                                Proprietary OCR Engine
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-display font-bold text-navy-dark mb-6">
                                Clinical precision at the speed of light.
                            </h3>
                            <p className="text-navy-dark/70 text-lg leading-relaxed">
                                Our advanced computer vision models are trained on over 1M hours of diverse hospital monitor footage, ensuring 99.8% accuracy even in low-light environments.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {vitals.map((vital) => (
                                <div
                                    key={vital.id}
                                    className={cn(
                                        "p-6 rounded-2xl border transition-all duration-500",
                                        detectedVitals.includes(vital.id)
                                            ? "bg-clinical-white border-emerald shadow-lg shadow-emerald/5"
                                            : "bg-soft-gray/30 border-soft-gray/50 opacity-40"
                                    )}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <vital.icon className={cn("w-5 h-5", vital.color)} />
                                        <span className="text-sm font-bold text-navy-dark/60 uppercase tracking-wide">
                                            {vital.name}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-mono font-bold text-navy-dark">
                                            {detectedVitals.includes(vital.id) ? vital.value : "--"}
                                        </span>
                                        <span className="text-xs font-medium text-navy-dark/40">
                                            {vital.unit}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <div className="flex items-center gap-6 p-4 bg-navy-dark/5 rounded-2xl border border-navy-dark/10">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-clinical-white bg-soft-gray overflow-hidden">
                                            <div className="w-full h-full bg-navy-dark/20" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs font-medium text-navy-dark/60">
                                    Trusted by <span className="text-navy-dark font-bold">50+ Senior Clinicians</span> for data accuracy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
