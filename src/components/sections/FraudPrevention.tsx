"use client";

import React from "react";
import { Fingerprint, Lock, ShieldCheck, Database } from "lucide-react";

export function FraudPrevention() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="grid grid-cols-6 h-full">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="border-r border-navy-dark h-full" />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">Integrity</h2>
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-navy-dark mb-8">Solving the ₹900 Cr Insurance Fraud Crisis.</h3>
                        <p className="text-navy-dark/60 text-lg mb-10 leading-relaxed">
                            ArogyaSync uses an immutable blockchain ledger to prevent manual entry loopholes, inflated billing, and ghost patients, enabling &quot;Cashless Everywhere&quot; initiatives.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-6 p-6 rounded-2xl bg-navy-dark border border-white/10 shadow-xl">
                                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Fingerprint className="text-emerald w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Immutable Patient Records</h4>
                                    <p className="text-sm text-white/40">Blockchain ensures data cannot be altered post-entry for billing purposes.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 rounded-2xl bg-navy-dark border border-white/10 shadow-xl">
                                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                                    <ShieldCheck className="text-emerald w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Zero Manual Entry</h4>
                                    <p className="text-sm text-white/40">Direct OCR capture from monitors eliminates the &quot;manual entry loophole&quot;.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="p-10 rounded-[40px] bg-navy-dark border border-white/10 shadow-2xl backdrop-blur-md">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-20 h-20 bg-emerald rounded-full flex items-center justify-center shadow-2xl shadow-emerald/30">
                                    <Lock className="text-white w-10 h-10" />
                                </div>
                                <h4 className="text-2xl font-display font-bold text-white">&quot;Cashless Everywhere&quot;</h4>
                                <p className="text-white/40 font-medium">ArogyaSync creates the trust layer required for seamless insurance processing and claim approvals.</p>
                                <div className="w-full h-px bg-white/10" />
                                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-emerald">
                                    <Database className="w-4 h-4" />
                                    Blockchain Verified
                                </div>
                            </div>
                        </div>
                        {/* Decorative Shield */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald/10 rounded-full blur-2xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
