"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Cpu, CloudCheck, Shield } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Step {
  icon:        React.ElementType;
  title:       string;
  description: string;
  color:       string;
  Graphic:     React.FC<{ active: boolean }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// PER-STEP MINI GRAPHICS
// ─────────────────────────────────────────────────────────────────────────────

/** Step 1 — device snapping onto a monitor */
const AttachGraphic: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="80" height="60" viewBox="0 0 80 60">
    {/* Monitor body */}
    <rect x="4" y="10" width="42" height="30" rx="4"
      fill={`${EMERALD}08`} stroke={`${EMERALD}22`} strokeWidth="1.2" />
    {/* Screen lines */}
    {[18, 24, 30].map((y, i) => (
      <motion.line key={i} x1="10" y1={y} x2="40" y2={y}
        stroke={`${EMERALD}30`} strokeWidth="1"
        initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }} />
    ))}
    {/* Monitor stand */}
    <line x1="25" y1="40" x2="25" y2="48" stroke={`${EMERALD}30`} strokeWidth="1.5" />
    <line x1="18" y1="48" x2="32" y2="48" stroke={`${EMERALD}30`} strokeWidth="1.5" />

    {/* ArogyaSync device snapping in from right */}
    <motion.g
      initial={{ x: 22, opacity: 0 }}
      animate={active ? { x: 0, opacity: 1 } : {}}
      transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 14 }}>
      <rect x="50" y="14" width="24" height="22" rx="5"
        fill={`${EMERALD}12`} stroke={EMERALD} strokeWidth="1.5" />
      <text x="62" y="23" textAnchor="middle" fill={EMERALD} fontSize="6" fontFamily="monospace" fontWeight="bold">OCR</text>
      {/* lens */}
      <motion.circle cx="62" cy="30" r="4"
        fill={`${EMERALD}18`} stroke={EMERALD} strokeWidth="1"
        animate={active ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, delay: 1 }}
        style={{ transformOrigin: "62px 30px" }} />
    </motion.g>

    {/* Snap lines */}
    <motion.path d="M 50 20 L 46 20" stroke={EMERALD} strokeWidth="1.2"
      strokeDasharray="2 1" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 1.1 }} />
    <motion.path d="M 50 32 L 46 32" stroke={EMERALD} strokeWidth="1.2"
      strokeDasharray="2 1" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 1.2 }} />

    {/* ✓ badge */}
    <motion.g initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
      transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
      style={{ transformOrigin: "70px 10px" }}>
      <circle cx="70" cy="10" r="7" fill={EMERALD} />
      <text x="70" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">✓</text>
    </motion.g>
  </svg>
);

/** Step 2 — camera capturing vitals */
const OCRGraphic: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="80" height="60" viewBox="0 0 80 60">
    {/* Camera body */}
    <rect x="14" y="16" width="34" height="26" rx="4"
      fill={`${SKY}08`} stroke={`${SKY}25`} strokeWidth="1.2" />
    {/* Lens */}
    <circle cx="31" cy="29" r="8" fill={`${SKY}10`} stroke={`${SKY}35`} strokeWidth="1" />
    <motion.circle cx="31" cy="29" r="5" fill={`${SKY}18`} stroke={SKY} strokeWidth="1"
      animate={active ? { r: [5, 7, 5] } : {}}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
    <circle cx="31" cy="29" r="2" fill={SKY} />
    {/* Shutter button */}
    <rect x="34" y="12" width="10" height="5" rx="2"
      fill={`${SKY}20`} stroke={`${SKY}30`} strokeWidth="1" />

    {/* Scan beam */}
    <motion.line x1="48" y1="20" x2="78" y2="20"
      stroke={`${SKY}50`} strokeWidth="1.5" strokeLinecap="round"
      animate={active ? { y1: [20, 42, 20], y2: [20, 42, 20] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />

    {/* Vital values appearing */}
    {[{ v: "98%", y: 22, delay: 0.6 }, { v: "76", y: 32, delay: 0.9 }, { v: "120", y: 42, delay: 1.2 }].map((d, i) => (
      <motion.text key={i} x="76" y={d.y} textAnchor="end" fill={SKY}
        fontSize="7" fontFamily="monospace" fontWeight="bold"
        initial={{ opacity: 0, x: 4 }} animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: d.delay, duration: 0.3 }}>
        {d.v}
      </motion.text>
    ))}

    {/* Speed badge */}
    <motion.g initial={{ opacity: 0, scale: 0 }} animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 1.5, type: "spring" }} style={{ transformOrigin: "8px 52px" }}>
      <rect x="2" y="46" width="30" height="12" rx="4"
        fill={`${SKY}10`} stroke={`${SKY}28`} strokeWidth="1" />
      <text x="17" y="55" textAnchor="middle" fill={SKY} fontSize="6" fontFamily="monospace" fontWeight="bold">
        &lt;100ms
      </text>
    </motion.g>
  </svg>
);

/** Step 3 — edge AI chip with signal processing */
const EdgeAIGraphic: React.FC<{ active: boolean }> = ({ active }) => {
  const layers = [[{x:8,y:20},{x:8,y:30},{x:8,y:40}],[{x:30,y:16},{x:30,y:26},{x:30,y:36},{x:30,y:46}],[{x:52,y:22},{x:52,y:38}],[{x:68,y:30}]];
  const colors = [INDIGO, SKY, EMERALD, AMBER];
  const edges: [number,number,number,number][] = [];
  for (let l = 0; l < layers.length - 1; l++)
    for (const a of layers[l]) for (const b of layers[l+1])
      edges.push([a.x, a.y, b.x, b.y]);

  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      {edges.map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${INDIGO}15`} strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
          transition={{ delay: 0.1 + i * 0.03, duration: 0.4 }}
        />
      ))}
      {edges.map(([x1,y1,x2,y2],i) => (
        <motion.circle key={`p${i}`} r="1.8" fill={colors[0]}
          style={{ filter: `drop-shadow(0 0 2px ${INDIGO}88)` }}
          initial={{ cx: x1, cy: y1, opacity: 0 }}
          animate={active ? { cx:[x1,x2], cy:[y1,y2], opacity:[0,1,0] } : {}}
          transition={{ delay: 0.6 + (i * 0.04) % 1.2, duration: 0.7,
            repeat: Infinity, repeatDelay: 0.8 }}
        />
      ))}
      
      {layers.flat().map((n, i) => (
        <motion.circle key={`n${i}`} cx={n.x} cy={n.y} r="4.5"
          fill={`${INDIGO}10`} stroke={`${INDIGO}35`} strokeWidth="0.8"
          initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 250 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
      {/* LOCK badge */}
      <motion.g initial={{ opacity: 0, scale: 0 }} animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, type: "spring" }} style={{ transformOrigin: "68px 50px" }}>
        <rect x="58" y="44" width="20" height="14" rx="4"
          fill={`${INDIGO}10`} stroke={`${INDIGO}30`} strokeWidth="1" />
        <text x="68" y="54" textAnchor="middle" fill={INDIGO} fontSize="6" fontFamily="monospace" fontWeight="bold">🔒 ENC</text>
      </motion.g>
    </svg>
  );
};

/** Step 4 — cloud sync topology */
const CloudSyncGraphic: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="80" height="60" viewBox="0 0 80 60">
    {/* Device node */}
    <rect x="2" y="22" width="18" height="16" rx="3"
      fill={`${AMBER}08`} stroke={`${AMBER}28`} strokeWidth="1" />
    <text x="11" y="33" textAnchor="middle" fill={AMBER} fontSize="5.5" fontFamily="monospace" fontWeight="bold">DEV</text>

    {/* Connector line */}
    <motion.line x1="20" y1="30" x2="34" y2="30"
      stroke={`${AMBER}35`} strokeWidth="1" strokeDasharray="3 2"
      initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
      transition={{ delay: 0.4, duration: 0.4 }} />
    {/* Packet */}
    <motion.circle r="2.5" fill={AMBER}
      style={{ filter: `drop-shadow(0 0 3px ${AMBER}88)` }}
      initial={{ cx: 20, cy: 30, opacity: 0 }}
      animate={active ? { cx:[20,34], cy:[30,30], opacity:[0,1,0] } : {}}
      transition={{ delay: 0.9, duration: 0.7, repeat: Infinity, repeatDelay: 1 }} />

    {/* Cloud */}
    <motion.path d="M40,28 Q34,28 34,34 Q34,40 39,40 L60,40 Q66,40 66,34 Q66,28 58,27 Q56,20 50,23 Q46,17 41,21 Q38,19 38,24 Q40,22 40,28Z"
      fill={`${AMBER}08`} stroke={`${AMBER}30`} strokeWidth="1.2"
      initial={{ scale: 0, opacity: 0 }}
      animate={active ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      style={{ transformOrigin: "50px 30px" }} />
    <text x="50" y="34" textAnchor="middle" fill={AMBER} fontSize="6" fontFamily="monospace" fontWeight="bold">CLOUD</text>

    {/* Output nodes — web + mobile */}
    {[{ x: 70, y: 18, label: "WEB" }, { x: 70, y: 44, label: "APP" }].map((n, i) => (
      <g key={i}>
        <motion.line x1="66" y1="30" x2={n.x-6} y2={n.y+4}
          stroke={`${AMBER}30`} strokeWidth="1" strokeDasharray="2 2"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }} />
        <motion.rect x={n.x - 6} y={n.y} width="16" height="12" rx="3"
          fill={`${AMBER}10`} stroke={`${AMBER}25`} strokeWidth="1"
          initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
          transition={{ delay: 1.0 + i * 0.15, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: `${n.x+2}px ${n.y+6}px` }} />
        <text x={n.x + 2} y={n.y + 8} textAnchor="middle" fill={AMBER} fontSize="5" fontFamily="monospace" fontWeight="bold">
          {n.label}
        </text>
      </g>
    ))}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// STEP DATA
// ─────────────────────────────────────────────────────────────────────────────
const steps: Step[] = [
  {
    icon:        Camera,
    title:       "Seamless Attachment",
    description: "The Smart Retrofit Device attaches seamlessly to any legacy hospital monitor without disrupting existing workflows.",
    color:       EMERALD,
    Graphic:     AttachGraphic,
  },
  {
    icon:        Cpu,
    title:       "AI Capture",
    description: "Built-in AI Camera captures essential vitals (BP, SpO₂, ECG) with ultra-low latency of less than 100ms.",
    color:       SKY,
    Graphic:     OCRGraphic,
  },
  {
    icon:        Shield,
    title:       "Edge AI Processing",
    description: "Processes data locally using TensorFlow Lite and immediately encrypts it for maximum security.",
    color:       INDIGO,
    Graphic:     EdgeAIGraphic,
  },
  {
    icon:        CloudCheck,
    title:       "Unified Sync",
    description: "Cloud infrastructure syncs data to unified Web & Mobile Dashboards for real-time remote monitoring.",
    color:       AMBER,
    Graphic:     CloudSyncGraphic,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED CONNECTOR
// ─────────────────────────────────────────────────────────────────────────────
const StepConnector: React.FC<{ color: string; nextColor: string; active: boolean; delay: number }> = ({
  color, nextColor, active, delay
}) => (
  <div className="hidden lg:flex items-center absolute top-[52px] left-[calc(100%-0px)] w-full -z-10"
    style={{ pointerEvents: "none" }}>
    <div className="relative w-full h-px overflow-visible">
      {/* Track */}
      <div className="absolute inset-0" style={{ background: `${color}15` }} />
      {/* Animated fill */}
      <motion.div className="absolute inset-y-0 left-0"
        style={{ background: `linear-gradient(90deg, ${color}50, ${nextColor}50)` }}
        initial={{ width: "0%" }}
        animate={active ? { width: "100%" } : { width: "0%" }}
        transition={{ delay, duration: 0.7, ease: "easeOut" }}
      />
      {/* Travelling dot */}
      <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}88` }}
        initial={{ left: "0%", opacity: 0 }}
        animate={active ? { left: ["0%", "100%"], opacity: [0, 1, 0] } : {}}
        transition={{ delay: delay + 0.3, duration: 1.0, repeat: Infinity, repeatDelay: 2 }}
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// STEP CARD
// ─────────────────────────────────────────────────────────────────────────────
const StepCard: React.FC<{ step: Step; index: number; active: boolean }> = ({ step, index, active }) => {
  const c = step.color;
  const Icon = step.icon;

  return (
    <motion.div
      className="relative flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.13, type: "spring", stiffness: 80, damping: 18 }}
    >
      {/* Connector line (desktop) */}
      {index < steps.length - 1 && (
        <StepConnector
          color={c}
          nextColor={steps[index + 1].color}
          active={active}
          delay={0.4 + index * 0.13}
        />
      )}

      {/* Card */}
      <div className="relative rounded-[28px] overflow-hidden p-6 flex flex-col gap-4"
        style={{ background: "#ffffff", border: `1.5px solid ${c}16`,
          boxShadow: `0 4px 20px ${c}08, 0 1px 4px rgba(0,0,0,0.04)` }}>
        {/* top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px]"
          style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }} />
        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" aria-hidden>
          <defs>
            <pattern id={`sdots-${index}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill={`${c}12`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#sdots-${index})`} />
        </svg>

        {/* Step number + icon row */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Number badge */}
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
              style={{ background: c, color: "#ffffff",
                boxShadow: `0 3px 10px ${c}35` }}
              animate={active ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, delay: index * 0.3 + 0.8, repeat: Infinity }}>
              {index + 1}
            </motion.div>
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${c}0e`, border: `1px solid ${c}22` }}>
              <Icon className="w-4.5 h-4.5" style={{ color: c, width: 18, height: 18 }} />
            </div>
          </div>

          {/* Live indicator on last step only */}
          {index === steps.length - 1 && (
            <motion.div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold"
              style={{ background: `${c}0e`, border: `1px solid ${c}22`, color: c }}
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c }} />
              LIVE
            </motion.div>
          )}
        </div>

        {/* Graphic zone */}
        <div className="relative z-10 flex items-center justify-center py-2 rounded-xl"
          style={{ background: `${c}04`, border: `1px solid ${c}0c` }}>
          <step.Graphic active={active} />
        </div>

        {/* Text */}
        <div className="relative z-10">
          <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight">{step.title}</h4>
          <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function HowItWorksSteps() {
  const ref    = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="howdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#howdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 500, height: 500, background: `${EMERALD}05`, top: "-10%", left: "-5%" }}
          animate={{ scale: [1,1.08,1], opacity: [0.5,0.9,0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 400, height: 400, background: `${INDIGO}04`, bottom: "-8%", right: "-4%" }}
          animate={{ scale: [1,1.12,1], opacity: [0.4,0.8,0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.span
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
            initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            How It Works
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-[1.1]"
            initial={{ opacity:0, y:16 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.1 }}>
            Four Steps to{" "}
            <span style={{
              backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>Smart Infrastructure.</span>
          </motion.h2>
          <motion.p className="text-slate-500 text-lg leading-relaxed"
            initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.15 }}>
            Our zero-downtime implementation means you can modernize an entire ICU in under an hour.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} active={active} />
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          className="mt-10 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4"
          style={{ background: "#f0fdf8", border: `1px solid ${EMERALD}15`,
            boxShadow: `0 2px 12px ${EMERALD}06` }}
          initial={{ opacity:0, y:14 }} animate={active ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.7, duration:0.5 }}>
          {[
            { label: "No tools needed",        color: EMERALD },
            { label: "< 30 min install",        color: SKY     },
            { label: "AES-256 encrypted",      color: INDIGO  },
            { label: "Real-time dashboards",   color: AMBER   },
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