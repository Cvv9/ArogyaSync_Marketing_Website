"use client";

import React from "react";
import { Server, Database, ShieldCheck, WifiOff, Zap } from "lucide-react";

export function TechnicalArchitecture() {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">Architecture</h2>
                            <h3 className="text-4xl md:text-5xl font-display font-bold text-navy-dark mb-6">Built for Performance & Scale.</h3>
                            <p className="text-navy-dark/60 text-lg">Our stack is engineered for sub-500ms end-to-end latency and enterprise-grade reliability.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-navy-dark border border-white/10 rounded-2xl shadow-xl">
                                <Zap className="text-emerald w-8 h-8 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">Sub-500ms Latency</h4>
                                <p className="text-sm text-white/40 font-medium leading-relaxed">Proprietary Edge AI ensures vitals are captured and processed instantly.</p>
                            </div>
                            <div className="p-6 bg-navy-dark border border-white/10 rounded-2xl shadow-xl">
                                <Server className="text-emerald w-8 h-8 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">AWS Cloud Core</h4>
                                <p className="text-sm text-white/40 font-medium leading-relaxed">Node.js microservices with InfluxDB for high-frequency time-series data.</p>
                            </div>
                        </div>

                        <div className="p-8 bg-emerald/10 border border-emerald/20 rounded-3xl flex items-start gap-6">
                            <div className="w-12 h-12 bg-emerald rounded-xl flex items-center justify-center shrink-0">
                                <WifiOff className="text-navy-dark w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-bold text-navy-dark mb-2">Fail-Safe Offline Mode</h4>
                                <p className="text-navy-dark/60">Local caching ensures no data loss during internet outages. Devices automatically re-sync once connectivity is restored.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 bg-navy-dark border border-white/10 p-8 rounded-[40px] shadow-2xl">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald/20 rounded-lg flex items-center justify-center">
                                            <div className="w-2 h-2 bg-emerald rounded-full animate-ping" />
                                        </div>
                                        <span className="text-sm font-bold text-white">Edge Device (IoT)</span>
                                    </div>
                                    <span className="text-[10px] text-emerald font-black uppercase">TensorFlow Lite</span>
                                </div>
                                <div className="h-10 w-px bg-gradient-to-b from-emerald to-transparent mx-auto" />
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <Database className="text-emerald w-6 h-6" />
                                        <span className="text-sm font-bold text-white">Cloud Gateway</span>
                                    </div>
                                    <span className="text-[10px] text-emerald font-black uppercase">AES-256</span>
                                </div>
                                <div className="h-10 w-px bg-gradient-to-b from-emerald to-transparent mx-auto" />
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <Server className="text-emerald w-6 h-6" />
                                        <span className="text-sm font-bold text-white">Analytics Engine</span>
                                    </div>
                                    <span className="text-[10px] text-emerald font-black uppercase">Node.js / InfluxDB</span>
                                </div>
                                <div className="h-10 w-px bg-gradient-to-b from-emerald to-transparent mx-auto" />
                                <div className="flex items-center justify-between p-4 bg-emerald rounded-xl">
                                    <div className="flex items-center gap-3 font-bold text-white">
                                        <ShieldCheck className="w-6 h-6" />
                                        <span className="text-sm">Blockchain Ledger</span>
                                    </div>
                                    <span className="text-[10px] text-white font-black uppercase tracking-tighter">Immutable</span>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald/20 rounded-full blur-[120px] -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
