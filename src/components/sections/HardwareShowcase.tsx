"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function HardwareShowcase() {
    return (
        <section className="py-24 bg-soft-gray/30">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">The Hardware</h2>
                    <h3 className="text-4xl font-display font-bold text-navy-dark">ArogyaSync Retrofit Device</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <div className="aspect-video bg-navy-dark rounded-[32px] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center relative group">
                            <Image
                                src="/images/arogyasync_front.png"
                                alt="ArogyaSync Retrofit Device - Front view showing high-precision OCR sensor designed for medical display compatibility"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <p className="mt-6 text-navy-dark/60 font-medium">Detailed view of the high-precision sensor designed for medical display compatibility.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group"
                    >
                        <div className="aspect-video bg-navy-dark rounded-[32px] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center relative group">
                            <Image
                                src="/images/deviceconnected.png"
                                alt="ArogyaSync Retrofit Device seamlessly attached to a legacy vital signs monitor in an active ICU setting"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <p className="mt-6 text-navy-dark/60 font-medium">ArogyaSync device seamlessly attached to a legacy monitor in an active ICU setting.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
