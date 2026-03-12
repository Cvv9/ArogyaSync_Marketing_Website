"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Activity, Shield, Zap, TrendingDown, CheckCircle, Star } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";

// ─────────────────────────────────────────────────────────────────────────────
// VISUAL CARD GRAPHIC  — animated dashboard panel per testimonial
// ─────────────────────────────────────────────────────────────────────────────

/** Testimonial 1: ICU dashboard — ECG + vitals panel */
const ICUDashboardGraphic: React.FC<GraphicProps> = ({ active }) => (
  <div className="relative w-full h-full flex flex-col gap-3 p-4">
    {/* Header bar */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.div className="w-2 h-2 rounded-full" style={{ background: EMERALD }}
          animate={{ scale: [1,1.5,1], opacity: [0.7,1,0.7] }}
          transition={{ duration: 1.4, repeat: Infinity }} />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
          ICU Live Monitor
        </span>
      </div>
      <span className="text-[9px] font-mono" style={{ color: EMERALD + "80" }}>
        Apex Multispeciality
      </span>
    </div>

    {/* ECG strip */}
    <div className="rounded-xl p-3 flex-shrink-0"
      style={{ background: `${EMERALD}06`, border: `1px solid ${EMERALD}15` }}>
      <svg width="100%" height="36" viewBox="0 0 240 36" preserveAspectRatio="none">
        <motion.polyline
          points="0,18 24,18 30,18 36,4 42,32 48,18 60,18 72,18 80,10 88,26 96,18 240,18"
          fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 3px ${EMERALD}88)` }}
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* ghost trail */}
        <polyline points="0,18 24,18 30,18 36,4 42,32 48,18 60,18 72,18 80,10 88,26 96,18 240,18"
          fill="none" stroke={`${EMERALD}15`} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>

    {/* Vital rows */}
    <div className="grid grid-cols-3 gap-2 flex-1">
      {[
        { label: "SpO₂", value: "98.4%", color: SKY,    delay: 0.4 },
        { label: "HR",   value: "76 bpm", color: EMERALD, delay: 0.55 },
        { label: "BP",   value: "118/76", color: INDIGO, delay: 0.7 },
      ].map((v, i) => (
        <motion.div key={i} className="rounded-xl p-2 flex flex-col items-center justify-center"
          style={{ background: `${v.color}07`, border: `1px solid ${v.color}18` }}
          initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: v.delay, duration: 0.4 }}>
          <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: v.color + "80" }}>
            {v.label}
          </span>
          <span className="text-sm font-bold font-mono" style={{ color: v.color }}>{v.value}</span>
        </motion.div>
      ))}
    </div>

    {/* Metric badges */}
    <div className="flex flex-wrap gap-2">
      {[
        { icon: TrendingDown, text: "85% Cost Saved", color: EMERALD },
        { icon: CheckCircle,  text: "99.8% Accuracy", color: SKY    },
        { icon: Zap,          text: "6mo ROI",        color: AMBER  },
      ].map((b, i) => (
        <motion.div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold"
          style={{ background: `${b.color}0c`, border: `1px solid ${b.color}22`, color: b.color }}
          initial={{ opacity: 0, scale: 0.8 }} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.8 + i * 0.1, type: "spring" }}>
          <b.icon className="w-3 h-3" />
          {b.text}
        </motion.div>
      ))}
    </div>
  </div>
);
type GraphicProps = {
  active: boolean;
};

/** Testimonial 2: Retrofit setup — before/after device snap-on */
const RetrofitGraphic: React.FC<GraphicProps> = ({ active }) => (
  <div className="relative w-full h-full flex flex-col gap-3 p-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.div className="w-2 h-2 rounded-full" style={{ background: SKY }}
          animate={{ scale: [1,1.5,1], opacity: [0.7,1,0.7] }}
          transition={{ duration: 1.4, repeat: Infinity }} />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: SKY }}>
          Setup Complete
        </span>
      </div>
      <span className="text-[9px] font-mono" style={{ color: SKY + "80" }}>
        City Heart Institute
      </span>
    </div>

    {/* Device snap-on SVG */}
    <div className="rounded-xl p-3 flex-shrink-0"
      style={{ background: `${SKY}06`, border: `1px solid ${SKY}15` }}>
      <svg width="100%" height="72" viewBox="0 0 280 72">
        {/* Old monitor */}
        <rect x="10" y="8" width="100" height="56" rx="6"
          fill={`${SKY}06`} stroke={`${SKY}20`} strokeWidth="1.2" />
        <rect x="18" y="16" width="84" height="36" rx="3"
          fill={`${SKY}04`} stroke={`${SKY}12`} strokeWidth="1" />
        {/* ECG on screen */}
        <motion.polyline
          points="22,34 30,34 34,26 38,42 42,34 52,34 56,28 60,40 64,34 96,34"
          fill="none" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 3px ${SKY}88)` }}
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        />
        <text x="60" y="60" textAnchor="middle" fill={`${SKY}50`} fontSize="7" fontFamily="monospace">LEGACY</text>

        {/* Connection arrow */}
        <motion.path d="M112,36 L130,36" fill="none" stroke={EMERALD} strokeWidth="2" strokeLinecap="round"
          markerEnd="url(#greenarrow)"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
        <motion.text x="121" y="28" textAnchor="middle" fill={EMERALD} fontSize="6" fontFamily="monospace" fontWeight="bold"
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.1 }}>
          5 min
        </motion.text>

        {/* ArogyaSync device */}
        <motion.g initial={{ x: 20, opacity: 0 }} animate={active ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 16 }}>
          <rect x="134" y="18" width="46" height="36" rx="7"
            fill={`${EMERALD}10`} stroke={`${EMERALD}40`} strokeWidth="1.5" />
          <text x="157" y="32" textAnchor="middle" fill={EMERALD} fontSize="7" fontFamily="monospace" fontWeight="bold">SYNC</text>
          <motion.circle cx="157" cy="42" r="5"
            fill={`${EMERALD}20`} stroke={EMERALD} strokeWidth="1"
            animate={active ? { scale: [1,1.5,1], opacity: [0.7,1,0.7] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="157" cy="42" r="5" fill="none" stroke={EMERALD}
            animate={active ? { r: [5,10], opacity: [0.5,0] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, delay: 1 }} />
        </motion.g>

        {/* Cloud sync */}
        <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}>
          <path d="M200,28 Q192,28 192,36 Q192,43 198,43 L232,43 Q240,43 240,35 Q240,27 230,26 Q228,18 218,22 Q213,16 205,20 Q200,18 200,28Z"
            fill={`${SKY}10`} stroke={`${SKY}35`} strokeWidth="1.2" />
          <text x="216" y="37" textAnchor="middle" fill={SKY} fontSize="6.5" fontFamily="monospace" fontWeight="bold">CLOUD</text>
          {/* line from device to cloud */}
          <motion.line x1="180" y1="36" x2="192" y2="36" stroke={SKY} strokeWidth="1.2" strokeDasharray="2 2"
            initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }} />
          {/* packet */}
          <motion.circle r="2" fill={SKY}
            style={{ filter: `drop-shadow(0 0 3px ${SKY}88)` }}
            initial={{ cx: 180, cy: 36, opacity: 0 }}
            animate={active ? { cx: [180, 192], cy: [36, 36], opacity: [0, 1, 0] } : {}}
            transition={{ delay: 1.8, duration: 0.7, repeat: Infinity, repeatDelay: 1.2 }} />
          <text x="216" y="56" textAnchor="middle" fill={`${SKY}55`} fontSize="5.5" fontFamily="monospace">99.9% uptime</text>
        </motion.g>
      </svg>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Setup",    value: "5 min",  color: EMERALD },
        { label: "Savings",  value: "10×",    color: SKY     },
        { label: "Downtime", value: "99.9%",   color: INDIGO  },
      ].map((s, i) => (
        <motion.div key={i} className="rounded-xl p-2.5 text-center"
          style={{ background: `${s.color}07`, border: `1px solid ${s.color}18` }}
          initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: 1.3 + i * 0.1 }}>
          <div className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
          <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mt-0.5">{s.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIAL DATA
// ─────────────────────────────────────────────────────────────────────────────
type Testimonial = {
  quote: string;
  author: string;
  role: string;
  hospital: string;
  location: string;
  metrics: string[];
  accentColor: string;
  stars: number;
  Graphic: React.ComponentType<GraphicProps>;
};
const testimonials: Testimonial[] = [
  {
    quote: "ArogyaSync reduced documentation time by 4 hours daily while improving monitoring accuracy across our entire ICU.",
    author: "Dr. Sandeep Mehta",
    role: "Head of Critical Care",
    hospital: "Apex Multispeciality Hospital",
    location: "Patna",
    metrics: ["85% cost savings", "6-month ROI", "99.8% accuracy"],
    accentColor: EMERALD,
    stars: 5,
    Graphic: ICUDashboardGraphic,
  },
  {
    quote: "The retrofit was seamless. Within 5 minutes, our 10-year-old monitors were feeding real-time data to our centralized dashboard.",
    author: "Varun Sharma",
    role: "Chief Technology Officer",
    hospital: "City Heart Institute",
    location: "Indore",
    metrics: ["Zero downtime", "Cloud-enabled", "10× cheaper"],
    accentColor: SKY,
    stars: 5,
    Graphic: RetrofitGraphic,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function SuccessCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const next = () => { setDir(1);  setCurrent(p => (p + 1) % testimonials.length); };
  const prev = () => { setDir(-1); setCurrent(p => (p - 1 + testimonials.length) % testimonials.length); };

  useEffect(() => {
    const t = setInterval(next, 9000);
    return () => clearInterval(t);
  }, []);

const t = testimonials[current] as Testimonial; 
  const c = t.accentColor;

  return (
    <section className="py-14 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="testidots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.11)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testidots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 600, height: 600, background: `${c}05`, top: "-15%", right: "-8%" }}
          animate={{ scale: [1,1.08,1], opacity: [0.5,0.9,0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 400, height: 400, background: "rgba(99,102,241,0.04)", bottom: "-10%", left: "-5%" }}
          animate={{ scale: [1,1.12,1], opacity: [0.4,0.8,0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
              initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.5 }} viewport={{ once:true }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
                animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }}
                transition={{ duration:1.5, repeat:Infinity }} />
              Customer Success
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-[1.1]"
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.1 }} viewport={{ once:true }}>
              Trusted by leading{" "}
              <span style={{
                backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>clinicians.</span>
            </motion.h2>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Pips */}
            <div className="flex items-center gap-1.5 mr-2">
              {testimonials.map((_, i) => (
                <motion.button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                  className="rounded-full transition-all duration-400"
                  style={{ width: i === current ? 20 : 6, height: 6,
                    background: i === current ? c : `${c}25` }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            <button onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: "#ffffff", border: `1.5px solid ${c}22`,
                boxShadow: `0 2px 8px ${c}0a`, color: c }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: c, color: "#ffffff",
                boxShadow: `0 4px 16px ${c}30` }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide */}
        <div className="relative" style={{ minHeight: 460 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            >
              {/* LEFT — quote card */}
              <div className="relative rounded-[32px] overflow-hidden flex flex-col justify-between p-8 md:p-10"
                style={{ background: "#ffffff",
                  border: `1.5px solid ${c}20`,
                  boxShadow: `0 8px 40px ${c}0c, 0 2px 8px rgba(0,0,0,0.04)` }}>
                {/* accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[32px]"
                  style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }} />
                {/* dot grid */}
                <svg className="absolute inset-0 w-full h-full opacity-60" aria-hidden>
                  <defs>
                    <pattern id={`qdots-${current}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.7" fill={`${c}10`} />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#qdots-${current})`} />
                </svg>
                {/* radial glow */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${c}07, transparent 60%)` }} />

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07, type: "spring" }}>
                        <Star className="w-4 h-4 fill-current" style={{ color: AMBER }} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote icon */}
                  <Quote className="w-10 h-10 mb-4" style={{ color: c + "40" }} />

                  {/* Quote text */}
                  <motion.p
                    className="text-2xl md:text-3xl font-display font-medium leading-snug italic mb-8"
                    style={{ color: "#1e293b" }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}>
                   "{t?.quote}"
                  </motion.p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                      style={{ background: `${c}12`, border: `1.5px solid ${c}25`, color: c }}>
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-800">{t.author}</div>
                      <div className="text-sm font-medium" style={{ color: c }}>
                        {t.role}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {t.hospital} · {t.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics strip */}
                <div className="relative z-10 mt-8 pt-6"
                  style={{ borderTop: `1px solid ${c}12` }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: c + "80" }}>Verified Metrics</p>
                  <div className="flex flex-wrap gap-2">
                    {t.metrics.map((m, i) => (
                      <motion.span key={i}
                        className="px-3 py-1 rounded-full text-[11px] font-bold"
                        style={{ background: `${c}0c`, border: `1px solid ${c}22`, color: c }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.08, type: "spring" }}>
                        ✓ {m}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — animated visual card */}
              <div className="relative rounded-[32px] overflow-hidden"
                style={{ background: "#ffffff",
                  border: `1.5px solid ${c}18`,
                  boxShadow: `0 8px 40px ${c}0a, 0 2px 8px rgba(0,0,0,0.04)`,
                  minHeight: 400 }}>
                {/* accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[32px]"
                  style={{ background: `linear-gradient(90deg, ${c}55, ${c}, ${c}55)` }} />
                {/* bg tint */}
                <div className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${c}05, transparent 70%)` }} />
                {/* dot grid */}
                <svg className="absolute inset-0 w-full h-full opacity-50" aria-hidden>
                  <defs>
                    <pattern id={`vdots-${current}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.7" fill={`${c}12`} />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#vdots-${current})`} />
                </svg>

                <div className="relative z-10 w-full h-full">
                  <t.Graphic active={true} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust bar */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 pt-8"
          style={{ borderTop: `1px solid ${EMERALD}12` }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }} viewport={{ once: true }}>
          {[
            // { label: "IIT Patna Incubated",    color: EMERALD },
            { label: "Equity-Free Grant ",  color: SKY     },
            { label: "HIPAA-Aligned",           color: INDIGO  },
            // { label: "12+ Hospitals Onboarded", color: AMBER   },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
              <span className="text-xs font-semibold text-slate-500">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}