"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download, Send, Calendar, Activity, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED BACKGROUND PULSE RINGS
// ─────────────────────────────────────────────────────────────────────────────
const PulseRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    {[0, 1, 2, 3].map(i => (
      <motion.div key={i}
        className="absolute rounded-full"
        style={{ border: `1px solid ${EMERALD}${["22","18","10","08"][i]}` }}
        animate={{ scale: [0.6 + i * 0.25, 1.4 + i * 0.35], opacity: [0.5, 0] }}
        transition={{ duration: 3.5 + i * 0.6, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
        initial={{ width: 320, height: 320 }}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING STAT CHIPS
// ─────────────────────────────────────────────────────────────────────────────
const floaters = [
  { icon: Users,    text: "50+ Hospitals",    color: EMERALD, x: "-8%",  y: "15%",  delay: 0.8  },
  { icon: Activity, text: "95% Accuracy",   color: SKY,     x: "88%",  y: "12%",  delay: 1.0  },
  { icon: Shield,   text: "HIPAA Certified",  color: INDIGO,  x: "-6%",  y: "72%",  delay: 1.2  },
  { icon: Zap,      text: "< 500ms Latency",  color: AMBER,   x: "86%",  y: "68%",  delay: 1.4  },
];


type FloatingChipsProps = {
  active: boolean;
};

type CTAItem = {
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  primary: boolean;
  delay: number;
};

type CTACardProps = {
  item: CTAItem;
  active: boolean;
};

const FloatingChips = ({ active }:FloatingChipsProps) => (
  <>
    {floaters.map(({ icon: Icon, text, color, x, y, delay }) => (
      <motion.div key={text}
        className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl"
        style={{ left: x, top: y,
          background: "#ffffff",
          border: `1.5px solid ${color}20`,
          boxShadow: `0 4px 16px ${color}0e, 0 1px 4px rgba(0,0,0,0.05)` }}
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay, type: "spring", stiffness: 110, damping: 16 }}
        whileHover={{ scale: 1.06, y: -2 }}
      >
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: color + "12" }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
        <span className="text-[11px] font-bold text-slate-700">{text}</span>
      </motion.div>
    ))}
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// MINI WAVEFORM decoration
// ─────────────────────────────────────────────────────────────────────────────
const WaveformDecoration = () => (
  <div className="flex items-center justify-center gap-px opacity-25 pointer-events-none select-none">
    {Array.from({ length: 40 }).map((_, i) => {
      const h = 4 + Math.abs(Math.sin(i * 0.55)) * 28 + (i === 8 || i === 9 ? 20 : 0) + (i === 10 ? -10 : 0);
      return (
        <motion.div key={i}
          className="rounded-full flex-shrink-0"
          style={{ width: 3, height: h, background: EMERALD }}
          animate={{ scaleY: [1, 0.4 + Math.random() * 0.6, 1] }}
          transition={{ duration: 1.2 + Math.random() * 0.8, repeat: Infinity,
            delay: i * 0.05, ease: "easeInOut" }}
        />
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CTA BUTTON CARD
// ─────────────────────────────────────────────────────────────────────────────
const ctaItems = [
  {
    label: "Schedule Demo",
    sub: "Free 30-min walkthrough",
    icon: Calendar,
    color: EMERALD,
    primary: true,
    delay: 0.3,
  },
  {
    label: "Download PDF",
    sub: "Product brochure",
    icon: Download,
    color: SKY,
    primary: false,
    delay: 0.4,
  },
  {
    label: "Contact Sales",
    sub: "Talk to our team",
    icon: Send,
    color: INDIGO,
    primary: false,
    delay: 0.5,
  },
  {
    label: "Start Free Pilot",
    sub: "No commitment needed",
    icon: ArrowRight,
    color: AMBER,
    primary: true,
    delay: 0.6,
  },
];

const CTACard = ({ item, active }:CTACardProps) => {
  const [hov, setHov] = React.useState(false);
  const c = item.color;
  const Icon = item.icon;

  return (
    <motion.button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2 py-5 px-4 cursor-pointer w-full group"
      style={{
        background: item.primary ? c : "#ffffff",
        border: `1.5px solid ${item.primary ? c : c + "25"}`,
        boxShadow: hov
          ? `0 12px 36px ${c}22, 0 2px 8px rgba(0,0,0,0.05)`
          : item.primary
            ? `0 4px 20px ${c}28`
            : `0 2px 10px ${c}08`,
        transition: "box-shadow 0.3s, transform 0.2s",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: item.delay, type: "spring", stiffness: 80, damping: 18 }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* shimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0 -skew-x-12"
          style={{ background: `linear-gradient(90deg, transparent, ${item.primary ? "rgba(255,255,255,0.12)" : c + "06"}, transparent)` }}
          animate={hov ? { x: ["−100%", "200%"] } : {}}
          transition={{ duration: 0.55 }}
        />
      </div>

      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: item.primary ? "rgba(255,255,255,0.18)" : c + "0e",
          border: `1px solid ${item.primary ? "rgba(255,255,255,0.25)" : c + "25"}` }}
        animate={hov ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}>
        <Icon className="w-5 h-5" style={{ color: item.primary ? "#ffffff" : c }} />
      </motion.div>

      <span className="text-sm font-bold" style={{ color: item.primary ? "#ffffff" : c }}>
        {item.label}
      </span>
      <span className="text-[10px] font-medium"
        style={{ color: item.primary ? "rgba(255,255,255,0.65)" : "#94a3b8" }}>
        {item.sub}
      </span>
    </motion.button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TRUST LOGOS ROW
// ─────────────────────────────────────────────────────────────────────────────
const trustItems = [
  // { label: "IIT Patna Incubated", color: EMERALD },
  { label: "Equity-Free Grant", color: SKY },
  { label: "HIPAA-Aligned", color: INDIGO },
  // { label: "12+ Hospitals", color: AMBER },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function FooterCTA() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-28 bg-white overflow-hidden"
      style={{ borderTop: `1px solid ${EMERALD}12` }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* dot grid */}
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="ctadots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.11)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctadots)" />
        </svg>
        {/* emerald top blob */}
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 700, height: 700, background: `${EMERALD}06`, top: "-20%", left: "50%", transform: "translateX(-50%)" }}
          animate={{ scale: [1,1.1,1], opacity: [0.5,0.9,0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 400, height: 400, background: `${SKY}04`, bottom: "-10%", right: "-5%" }}
          animate={{ scale: [1,1.12,1], opacity: [0.4,0.8,0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <PulseRings />
      {/* <FloatingChips active={active} /> */}

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div className="flex justify-center mb-6"
            initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5 }}>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
                animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
              Ready to Deploy
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-[1.05]"
            initial={{ opacity:0, scale:0.94 }} animate={active ? { opacity:1, scale:1 } : {}}
            transition={{ duration:0.65, delay:0.1 }}>
            Transform your hospital
            <br />
            <span style={{
              backgroundImage: `linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>this quarter.</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p className="text-slate-500 text-xl md:text-2xl leading-relaxed mb-8"
            initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.2 }}>
            Join 50+ visionary hospitals already delivering smart care at a fraction of the cost.
          </motion.p>

          {/* Waveform accent */}
          <motion.div className="mb-10"
            initial={{ opacity:0 }} animate={active ? { opacity:1 } : {}}
            transition={{ delay:0.3, duration:0.6 }}>
            <WaveformDecoration />
          </motion.div>

          {/* CTA buttons grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {ctaItems.map((item, i) => (
              <CTACard key={i} item={item} active={active} />
            ))}
          </div>

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.7, duration:0.5 }}>
            {trustItems.map((t, i) => (
              <React.Fragment key={t.label}>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                  <span className="text-xs font-semibold text-slate-500">{t.label}</span>
                </div>
                {i < trustItems.length - 1 && (
                  <div className="w-px h-4 bg-slate-200 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Final note */}
          <motion.p className="mt-6 text-xs text-slate-400 font-medium"
            initial={{ opacity:0 }} animate={active ? { opacity:1 } : {}}
            transition={{ delay:0.9, duration:0.5 }}>
            No upfront hardware costs · Setup in under 30Min · Cancel anytime
          </motion.p>

        </div>
      </div>
    </section>
  );
}