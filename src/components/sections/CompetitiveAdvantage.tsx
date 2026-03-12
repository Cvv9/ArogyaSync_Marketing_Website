"use client";

import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";

const features = [
    { name: "Retrofit Capability", arogya: true, philips: false, ge: false, manual: false },
    { name: "<30 Minute Installation", arogya: true, philips: false, ge: false, manual: true },
    { name: "Edge AI OCR", arogya: true, philips: false, ge: false, manual: false },
    { name: "Cloud Dashboard", arogya: true, philips: true, ge: true, manual: false },
    { name: "Predictive Alerts", arogya: true, philips: "Premium", ge: "Premium", manual: false },
    { name: "Cost (per 10 beds)", arogya: "₹2.5L", philips: "₹15L+", ge: "₹20L+", manual: "N/A" },
];

export function CompetitiveAdvantage() {
    return (
        <section className="py-24 bg-soft-gray/30">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">
                        Market Comparison
                    </h2>
                    <h3 className="text-4xl font-display font-bold text-navy-dark mb-6">
                        Why leading hospitals choose ArogyaSync.
                    </h3>
                    <p className="text-navy-dark/60">
                        A head-to-head comparison of costs, features, and implementation speed.
                    </p>
                </div>

                <div className="bg-clinical-white rounded-[40px] border border-soft-gray shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-navy-dark/5">
                                    <th className="p-8 text-sm font-bold text-navy-dark uppercase tracking-widest border-b border-soft-gray">Features</th>
                                    <th className="p-8 text-sm font-bold text-navy-dark uppercase tracking-widest border-b border-soft-gray bg-navy-dark/5 relative">
                                        <div className="flex items-center gap-2">
                                            ArogyaSync
                                            <ShieldCheck className="w-4 h-4 text-emerald" />
                                        </div>
                                        <div className="absolute top-0 right-0 py-1 px-3 bg-emerald text-white text-[10px] font-black uppercase tracking-tighter rounded-bl-lg">
                                            Best Value
                                        </div>
                                    </th>
                                    <th className="p-8 text-sm font-bold text-navy-dark/40 uppercase tracking-widest border-b border-soft-gray opacity-60">Philips/GE</th>
                                    <th className="p-8 text-sm font-bold text-navy-dark/40 uppercase tracking-widest border-b border-soft-gray opacity-60">Standard BPL</th>
                                    <th className="p-8 text-sm font-bold text-navy-dark/40 uppercase tracking-widest border-b border-soft-gray opacity-60">Manual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, i) => (
                                    <tr key={i} className="hover:bg-soft-gray/20 transition-colors">
                                        <td className="p-8 text-sm font-bold text-navy-dark border-b border-soft-gray/50">{feature.name}</td>
                                        <td className="p-8 border-b border-soft-gray/50 bg-emerald/5 font-mono text-xs font-bold text-navy-dark">
                                            {typeof feature.arogya === "boolean" ? (
                                                <Check className="text-emerald w-5 h-5" />
                                            ) : (
                                                feature.arogya
                                            )}
                                        </td>
                                        <td className="p-8 border-b border-soft-gray/50 text-xs font-medium text-navy-dark/50">
                                            {typeof feature.philips === "boolean" ? (
                                                feature.philips ? <Check className="text-navy-dark/20 w-5 h-5" /> : <X className="text-alert/20 w-5 h-5" />
                                            ) : (
                                                feature.philips
                                            )}
                                        </td>
                                        <td className="p-8 border-b border-soft-gray/50 text-xs font-medium text-navy-dark/50">
                                            {typeof feature.ge === "boolean" ? (
                                                feature.ge ? <Check className="text-navy-dark/20 w-5 h-5" /> : <X className="text-alert/20 w-5 h-5" />
                                            ) : (
                                                feature.ge
                                            )}
                                        </td>
                                        <td className="p-8 border-b border-soft-gray/50 text-xs font-medium text-navy-dark/50">
                                            {typeof feature.manual === "boolean" ? (
                                                feature.manual ? <Check className="text-navy-dark/20 w-5 h-5" /> : <X className="text-alert/20 w-5 h-5" />
                                            ) : (
                                                feature.manual
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-12 text-center bg-navy-dark text-clinical-white">
                        <div className="inline-block py-2 px-4 rounded-full bg-emerald text-white font-black text-xs uppercase tracking-widest mb-6">
                            85% Total Savings
                        </div>
                        <h4 className="text-2xl font-display font-bold mb-4">Ready to modernize your ICU?</h4>
                        <p className="text-soft-gray/50 mb-8 max-w-xl mx-auto">Skip the multi-crore infrastructure replacement. Retrofit your existing monitors and go smart in 5 minutes.</p>
                        <div className="flex justify-center gap-4">
                            <button className="h-12 px-8 bg-emerald text-white font-bold rounded-full hover:opacity-90 transition-opacity">Schedule Demo</button>
                            <button className="h-12 px-8 border border-white/20 text-clinical-white font-bold rounded-full hover:bg-white/10 transition-colors">Download Datasheet</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
