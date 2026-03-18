"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Send, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

const pricing = [
    {
        title: "Modular Add-On",
        price: "₹25,000",
        period: "per monitor (One-time Hardware)",
        features: [
            "ArogyaSync Retrofit Device",
            "AI- Camera Module",
            "Universal Mounting Kit",
            "Lifetime Hardware Warranty",
            "Plug & Play Support"
        ],
        button: "Order Hardware",
        popular: false
    },
    {
        title: "Clinical Pilot",
        price: "₹2,50,000",
        period: "10 beds",
        features: [
            "Hardware Included",
            "Full Cloud Access",
            "Blockchain Records",
            "On-site Implementation",
            "Clinical Validation Report"
        ],
        button: "Reserve Pilot",
        popular: true
    },
    {
        title: "Enterprise SaaS",
        price: "₹12,50,000",
        period: "Up to 50 beds",
        features: [
            "Cloud + Blockchain Sync",
            "Predictive ML Alerts",
            "API for HIS Integration",
            "24/7 Dedicated Support",
            "Universal Dashboard"
        ],
        button: "Contact Sales",
        popular: false
    }
];

export function PricingAndContact() {
    const [submitted, setSubmitted] = useState(false);

    // CR5-043: Acknowledge form submission instead of silently discarding data.
    // TODO: Integrate with a backend API (e.g. POST /contact) or third-party
    // form service (Formspree, HubSpot, etc.) to persist submissions.
    function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {pricing.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-10 rounded-[40px] border flex flex-col justify-between relative overflow-hidden ${plan.popular ? 'bg-navy-dark text-white border-navy-dark shadow-2xl scale-105 z-10' : 'bg-soft-gray/30 border-soft-gray text-navy-dark'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 py-2 px-6 bg-emerald text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <h4 className={`text-xl font-display font-bold mb-4 ${plan.popular ? 'text-emerald' : 'text-navy-dark'}`}>{plan.title}</h4>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-display font-bold">{plan.price}</span>
                                </div>
                                <p className={`text-xs font-medium uppercase tracking-wider mb-8 ${plan.popular ? 'text-white/40' : 'text-navy-dark/40'}`}>{plan.period}</p>

                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-emerald' : 'text-emerald'}`} />
                                            <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-navy-dark/70'}`}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full h-14 rounded-2xl font-bold">
                                {plan.button}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                    <div className="p-12 rounded-[40px] bg-navy-dark border border-white/10 text-white flex flex-col justify-between shadow-2xl">
                        <div>
                            <h3 className="text-4xl font-display font-bold mb-6">Ready to Get Started?</h3>
                            <p className="text-white/40 text-lg mb-10">Fill out the form and our clinical strategy team will reach out to schedule a custom demo for your facility.</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                                        <Mail className="text-emerald w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/40 block">Global Sales</span>
                                        <span className="text-lg font-bold">cs@arogyasync.com</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                                        <MapPin className="text-emerald w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/40 block">Regional HQ</span>
                                        <span className="text-lg font-bold">IIT Patna Incubation Center, Bihar</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                                        <Activity className="text-emerald w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/40 block">Corporate Office</span>
                                        <span className="text-lg font-bold">Bangalore, KT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <Activity className="text-emerald w-8 h-8" />
                                <span className="text-2xl font-display font-bold text-white">Arogya<span className="text-emerald">Sync</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="p-12 rounded-[40px] bg-white border border-soft-gray shadow-2xl">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mb-6">
                                    <Check className="w-8 h-8 text-emerald" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-navy-dark mb-3">
                                    Thank you for your interest!
                                </h3>
                                <p className="text-navy-dark/60 max-w-sm">
                                    Our clinical strategy team will be in touch soon to schedule a custom demo for your facility.
                                </p>
                            </motion.div>
                        ) : (
                        <form className="space-y-6" onSubmit={handleContactSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-navy-dark/40 ml-1">Full Name</label>
                                    <input type="text" required placeholder="Dr. Abhinav Singh" className="w-full h-14 px-6 rounded-2xl bg-soft-gray/30 border border-soft-gray focus:border-emerald outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-navy-dark/40 ml-1">Hospital Name</label>
                                    <input type="text" required placeholder="Department of Cardiology" className="w-full h-14 px-6 rounded-2xl bg-soft-gray/30 border border-soft-gray focus:border-emerald outline-none transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-navy-dark/40 ml-1">Hospital Size (Beds)</label>
                                    <input type="text" placeholder="50 - 100 Beds" className="w-full h-14 px-6 rounded-2xl bg-soft-gray/30 border border-soft-gray focus:border-emerald outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-navy-dark/40 ml-1">Current Monitor Brand</label>
                                    <input type="text" placeholder="GE / Philips / BPL" className="w-full h-14 px-6 rounded-2xl bg-soft-gray/30 border border-soft-gray focus:border-emerald outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-navy-dark/40 ml-1">Project Details</label>
                                <textarea placeholder="Tell us about your facility's specific monitoring challenges..." className="w-full h-40 p-6 rounded-2xl bg-soft-gray/30 border border-soft-gray focus:border-emerald outline-none transition-all resize-none" />
                            </div>
                            <Button variant="primary" className="w-full h-16 rounded-2xl font-bold text-lg group">
                                Request Custom Demo
                                <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
