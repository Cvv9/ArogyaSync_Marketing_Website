"use client";

import React from "react";
import { motion } from "framer-motion";
import { WifiOff, RefreshCcw, Database } from "lucide-react";

export function OfflineMode() {
    return (
        <section className="py-24 bg-soft-gray/30">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">Resilience</h2>
                            <h3 className="text-4xl md:text-5xl font-display font-bold text-navy-dark mb-6">Designed for Every Environment.</h3>
                            <p className="text-navy-dark/60 text-lg">Healthcare doesn&apos;t stop when the internet does. ArogyaSync is built to handle unstable connectivity with enterprise-grade resilience.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-soft-gray shadow-sm">
                                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Database className="text-emerald w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-navy-dark mb-1">Local Edge Caching</h4>
                                    <p className="text-sm text-navy-dark/60">If the connection drops, data is stored locally on the device with high-integrity encryption.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-soft-gray shadow-sm">
                                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                                    <RefreshCcw className="text-emerald w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-navy-dark mb-1">Intelligent Auto-Sync</h4>
                                    <p className="text-sm text-navy-dark/60">The system automatically detects restoration of connectivity and pushes cached data to the cloud in sequential order.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-navy-dark rounded-[40px] p-12 text-center border border-white/5 shadow-2xl relative z-10">
                            <WifiOff className="w-20 h-20 text-emerald mx-auto mb-8 animate-pulse" />
                            <h4 className="text-2xl font-bold text-white mb-4">Fail-Safe Active</h4>
                            <p className="text-white/40 mb-8 max-w-sm mx-auto">Sensors continue monitoring. Edge AI continues processing. Data remains 100% secure.</p>
                            <div className="flex justify-center gap-4">
                                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest">
                                    Offline Storage Active
                                </div>
                                <div className="px-4 py-2 bg-emerald/20 rounded-full border border-emerald/50 text-[10px] text-emerald font-bold uppercase tracking-widest">
                                    Queue: 42 Records
                                </div>
                            </div>
                        </div>
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-emerald/20 rounded-full blur-[100px] -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
