"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Beaker } from "lucide-react";

const team = [
    {
        name: "Dr. Arjun Chadha",
        role: "CEO & Co-Founder",
        bio: "Dental Specialist + MBA. Digital Health Strategist with 10+ years in clinical tech.",
        initials: "AC"
    },
    {
        name: "Varun Cumbamangalam",
        role: "CTO & Co-Founder",
        bio: "MS Robotics (Utah). 6+ Years IoT Experience in medical hardware & edge AI.",
        initials: "VC"
    }
];

export function TeamAdvisory() {
    return (
        <section id="team" className="py-24 bg-clinical-white">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto mb-16">
                    <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">
                        Leadership
                    </h2>
                    <h3 className="text-4xl font-display font-bold text-navy-dark mb-6">
                        Driven by clinicians, built by engineers.
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group p-10 rounded-[40px] border border-soft-gray bg-clinical-white shadow-xl hover:shadow-2xl transition-all text-left"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-navy-dark flex items-center justify-center text-clinical-white text-3xl font-display font-bold mb-8 group-hover:scale-110 transition-transform">
                                {member.initials}
                            </div>
                            <h4 className="text-2xl font-display font-bold text-navy-dark mb-2">{member.name}</h4>
                            <p className="text-emerald font-bold text-xs uppercase tracking-widest mb-6">{member.role}</p>
                            <p className="text-navy-dark/60 text-lg leading-relaxed mb-8">{member.bio}</p>

                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-soft-gray flex items-center justify-center text-navy-dark hover:bg-navy-dark hover:text-clinical-white transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-soft-gray flex items-center justify-center text-navy-dark hover:bg-navy-dark hover:text-clinical-white transition-colors">
                                    <Mail className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-8 border border-dashed border-soft-gray rounded-3xl max-w-2xl mx-auto flex items-center gap-6 text-left">
                    <div className="w-12 h-12 rounded-full bg-navy-dark/5 flex items-center justify-center">
                        <Beaker className="text-navy-dark w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-navy-dark">Advisory Board</h4>
                        <p className="text-sm text-navy-dark/60 mt-1">Backed by veterans in Medical Robotics, Hospital Administration, and Edge Computing from IIT Patna and University of Utah.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
