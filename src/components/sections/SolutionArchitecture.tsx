"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, Camera, Wifi, Layers, X, Activity, Zap, Shield, ArrowRight } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Hotspot {
  id: string;
  title: string;
  icon: React.ElementType;
  x: string;
  y: string;
  color: string;
  content: string;
  tech: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const hotspots: Hotspot[] = [
  {
    id: "camera",
    title: "AI Camera",
    icon: Camera,
    x: "28%", y: "38%",
    color: EMERALD,
    content: "High-resolution sensor optimized for low-light clinical environments. Captures vitals with 95% accuracy.",
    tech: "",
  },
  {
    id: "processor",
    title: "ARM Cortex-M4 Edge AI",
    icon: Cpu,
    x: "52%", y: "52%",
    color: INDIGO,
    content: "Edge processing ensures data never leaves the local network without encryption. <100ms processing latency.",
    tech: "TensorFlow Lite Micro · Secure Element · 128MB RAM",
  },
  {
    id: "connectivity",
    title: "Dual-Stack Wireless",
    icon: Wifi,
    x: "70%", y: "36%",
    color: SKY,
    content: "Seamless integration with hospital WiFi and BLE-enabled peripherals for consolidated monitoring.",
    tech: "WiFi 6 · BLE 5.2 · Mesh Ready",
  },
  {
    id: "mounting",
    title: "Universal Mount",
    icon: Layers,
    x: "38%", y: "65%",
    color: AMBER,
    content: "Patented mechanical design fits any legacy monitor in under 5 minutes without tools.",
    tech: "Antimicrobial Coating · Tool-less Setup · Universal Fit",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED BACKGROUND — circuit lines + ECG
// ─────────────────────────────────────────────────────────────────────────────
const DeviceBackground: React.FC<{ active: boolean }> = ({ active }) => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="centerglow" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stopColor={EMERALD} stopOpacity="0.07" />
        <stop offset="100%" stopColor={EMERALD} stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Center glow */}
    <ellipse cx="450" cy="250" rx="280" ry="200" fill="url(#centerglow)" />

    {/* Grid lines */}
    {Array.from({ length: 10 }).map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 55} x2="900" y2={i * 55}
        stroke={`${EMERALD}08`} strokeWidth="1" />
    ))}
    {Array.from({ length: 16 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="500"
        stroke={`${EMERALD}08`} strokeWidth="1" />
    ))}

    {/* Circuit trace lines between hotspots */}
    {[
      { d: "M 252 190 L 450 190 L 468 260", color: EMERALD },
      { d: "M 468 260 L 630 180 L 630 180", color: SKY },
      { d: "M 342 325 L 342 260 L 468 260", color: AMBER },
      { d: "M 468 260 L 468 320",            color: INDIGO },
    ].map((line, i) => (
      <motion.path key={i} d={line.d}
        fill="none" stroke={`${line.color}30`} strokeWidth="1.2" strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
      />
    ))}

    {/* ECG waveform across center */}
    <motion.polyline
      points="60,250 130,250 150,250 165,210 180,290 195,250 260,250 290,250 310,230 330,270 350,250 820,250"
      fill="none" stroke={`${EMERALD}22`} strokeWidth="1.5" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ delay: 0.4, duration: 1.8 }}
    />

    {/* Travelling packet on ECG */}
    <motion.circle r="3" fill={EMERALD}
      style={{ filter: `drop-shadow(0 0 4px ${EMERALD}88)` }}
      initial={{ cx: 60, cy: 250, opacity: 0 }}
      animate={active ? { cx: [60, 820], cy: [250, 250], opacity: [0, 1, 1, 0] } : {}}
      transition={{ delay: 2.2, duration: 2.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
    />

    {/* Watermark text */}
    <text x="450" y="265" textAnchor="middle" fill={`${EMERALD}06`}
      fontSize="80" fontWeight="900" fontFamily="sans-serif" letterSpacing="-2">
      AROGYASYNC
    </text>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// HOTSPOT BUTTON
// ─────────────────────────────────────────────────────────────────────────────
const HotspotPin: React.FC<{
  spot: Hotspot;
  active: boolean;
  selected: boolean;
  index: number;
  onClick: () => void;
}> = ({ spot, active, selected, index, onClick }) => {
  const Icon = spot.icon;
  const c = spot.color;

  return (
    <motion.button
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: spot.x, top: spot.y }}
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={active ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 200, damping: 16 }}
    >
      {/* Pulse rings */}
      {[0, 1].map(i => (
        <motion.div key={i}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1px solid ${c}${selected ? "50" : "30"}` }}
          animate={{ scale: [1, 2.2 + i * 0.5], opacity: [0.6, 0] }}
          transition={{ duration: 2 + i * 0.4, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Pin body */}
      <motion.div
        className="relative w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: selected ? c : "#ffffff",
          border: `2px solid ${selected ? c : c + "50"}`,
          boxShadow: selected
            ? `0 0 0 4px ${c}18, 0 4px 16px ${c}30`
            : `0 2px 12px ${c}18, 0 1px 4px rgba(0,0,0,0.06)`,
        }}
        animate={selected ? { scale: 1.1 } : { scale: 1 }}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon className="w-4 h-4" style={{ color: selected ? "#ffffff" : c }} />
      </motion.div>

      {/* Tooltip label */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-bold pointer-events-none"
        style={{ background: "#ffffff", border: `1px solid ${c}20`,
          boxShadow: `0 2px 8px rgba(0,0,0,0.08)`, color: c }}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.15 }}>
        {spot.title}
      </motion.div>
    </motion.button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// POPOVER PANEL
// ─────────────────────────────────────────────────────────────────────────────
const HotspotPanel: React.FC<{
  spot: Hotspot;
  onClose: () => void;
}> = ({ spot, onClose }) => {
  const Icon = spot.icon;
  const c = spot.color;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="absolute top-6 right-6 w-72 z-30 rounded-[24px] overflow-hidden"
      style={{
        background: "#ffffff",
        border: `1.5px solid ${c}22`,
        boxShadow: `0 16px 48px ${c}12, 0 4px 16px rgba(0,0,0,0.06)`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }} />

      <div className="p-6">
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-slate-100"
          style={{ color: "#94a3b8" }}>
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: `${c}10`, border: `1.5px solid ${c}22` }}>
          <Icon className="w-5 h-5" style={{ color: c }} />
        </div>

        <h4 className="text-base font-bold text-slate-900 mb-2">{spot.title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{spot.content}</p>

        {/* Tech specs */}
        <div className="rounded-xl p-3" style={{ background: `${c}06`, border: `1px solid ${c}12` }}>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
            Technical Specs
          </span>
          <span className="text-xs font-mono font-semibold" style={{ color: c }}>
            {spot.tech}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LEGEND ITEM
// ─────────────────────────────────────────────────────────────────────────────
const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <motion.div className="w-2.5 h-2.5 rounded-full"
      style={{ background: color }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }} />
    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function SolutionArchitecture() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="solutions" className="py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="archdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.11)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 600, height: 600, background: `${EMERALD}05`, top: "-10%", left: "50%", transform: "translateX(-50%)" }}
          animate={{ scale: [1,1.08,1], opacity: [0.5,0.9,0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.span
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
            initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }} viewport={{ once:true }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            Solution Architecture
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-[1.1]"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.1 }} viewport={{ once:true }}>
            Engineering clinical trust{" "}
            <span style={{
              backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>into every byte.</span>
          </motion.h2>
          <motion.p
            className="text-slate-500 text-lg leading-relaxed"
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.15 }} viewport={{ once:true }}>
            ArogyaSync isn&apos;t just a camera — it&apos;s a complete Edge AI ecosystem designed for the most demanding healthcare environments.
          </motion.p>
        </div>

        {/* Interactive device canvas */}
        <motion.div
          ref={ref}
          className="relative aspect-video max-w-5xl mx-auto rounded-[36px] overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #f8fffe, #f0fdf8, #f8faff)",
            border: `1.5px solid ${EMERALD}18`,
            boxShadow: `0 8px 48px ${EMERALD}0c, 0 2px 12px rgba(0,0,0,0.04)`,
          }}
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.2 }} viewport={{ once:true }}>

          {/* Animated background */}
          <DeviceBackground active={active} />

          {/* Hotspots */}
          {hotspots.map((spot, i) => (
            <HotspotPin key={spot.id} spot={spot} active={active} index={i}
              selected={selectedHotspot?.id === spot.id}
              onClick={() => setSelectedHotspot(s => s?.id === spot.id ? null : spot)}
            />
          ))}

          {/* Popover */}
          <AnimatePresence>
            {selectedHotspot && (
              <HotspotPanel
                spot={selectedHotspot}
                onClose={() => setSelectedHotspot(null)}
              />
            )}
          </AnimatePresence>

          {/* Bottom legend */}
          <div className="absolute bottom-5 left-6 flex flex-wrap gap-5">
            <LegendItem color={EMERALD} label="Edge AI Processing" />
            <LegendItem color={SKY}     label="IoT Gateway"        />
            <LegendItem color={INDIGO}  label="Secure Element"     />
            <LegendItem color={AMBER}   label="Mechanical Layer"   />
          </div>

          {/* Top-left live badge */}
          <div className="absolute top-5 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)",
              border:`1px solid ${EMERALD}20`, boxShadow:`0 2px 8px rgba(0,0,0,0.06)` }}>
            <motion.div className="w-2 h-2 rounded-full" style={{ background:EMERALD }}
              animate={{ scale:[1,1.5,1], opacity:[0.6,1,0.6] }}
              transition={{ duration:1.4, repeat:Infinity }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color:EMERALD }}>
              Click hotspots to explore
            </span>
          </div>
        </motion.div>

        {/* Bottom spec strip */}
        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          transition={{ delay:0.4, duration:0.6 }} viewport={{ once:true }}>
          {[
            { icon: Camera,   label: "95% OCR",       sub: "Capture Accuracy", color: EMERALD },
            { icon: Cpu,      label: "<100ms",           sub: "Edge Latency",     color: INDIGO  },
            { icon: Wifi,     label: "WiFi 6 + BLE 5.2", sub: "Connectivity",    color: SKY     },
            { icon: Layers,   label: "<30 Minutes",        sub: "Install Time",     color: AMBER   },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background:"#ffffff", border:`1.5px solid ${s.color}14`,
                boxShadow:`0 2px 10px ${s.color}07` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:`${s.color}0e`, border:`1px solid ${s.color}20` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.label}</div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{s.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}