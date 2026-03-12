"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Award, ShieldCheck, Activity,
  Heart, Thermometer, Wind, Zap, Shield,
  Wifi, Lock, Sparkles, Globe, Smartphone, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};
// ─────────────────────────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const ROSE    = "#e11d48";
const AMBER   = "#d97706";

const stats = [
  // { icon: Award,       text: "Incubated & Backed By IIT Patna" },
  { icon: ShieldCheck, text: "Equity-free grant of received" },
];

// ─────────────────────────────────────────────────────────────────
// ROTATING STAT HIGHLIGHT
// ─────────────────────────────────────────────────────────────────
const statSlides = [
  { number: "97.4%",   label: "AI Diagnostic Accuracy",  accent: INDIGO  },
  { number: "< 500ms", label: "Alert Response Time",     accent: SKY     },
  { number: "95%",   label: "Platform Uptime SLA",     accent: AMBER   },
];
type ECGStripProps = {
  beat: boolean;
  color?: string;
  width?: number;
};

type SyncDotsProps = {
  color?: string;
};

type DataPacketProps = {
  delay: number;
  color: string;
};

type VitalRowProps = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: number;
  unit: string;
  color: string;
  doAnim?: boolean;
  delta: number;
};

type OrbitRingProps = {
  size: number;
  duration: number;
  delay: number;
  color: string;
};

type DeviceCardProps = {
  beat: boolean;
  syncPct: number;
};

type ConnectorLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay: number;
};

type LinePacketProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay: number;
  duration?: number;
};

type SatelliteNodeProps = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  sublabel: string;
  color: string;
  delay: number;
  side: "left" | "right";
};

type CentralHubProps = {
  beat: boolean;
  syncPct: number;
  status: string;
};

type NetworkBarProps = {
  beat: boolean;
  syncPct: number;
};
const StatHighlight = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % statSlides.length), 3000);
    return () => clearInterval(t);
  }, []);
  const s = statSlides[idx];
  return (
    <div style={{ minHeight: "1.2em" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          exit={  { opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-baseline gap-3 flex-wrap"
        >
          <span className="font-extrabold"
            style={{
              backgroundImage: `linear-gradient(135deg, ${s.accent}, ${s.accent}bb)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            {s.number}
          </span>
          <span className="font-medium text-slate-400" style={{ fontSize: "0.42em" }}>
            {s.label}
          </span>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center gap-1.5 mt-2">
        {statSlides.map((sl, i) => (
          <motion.div key={i} className="rounded-full transition-all duration-500"
            style={{ width: i === idx ? 20 : 5, height: 4,
              background: i === idx ? sl.accent : "rgba(0,0,0,0.10)" }} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// ECG STRIP
// ─────────────────────────────────────────────────────────────────
const ECGStrip = ({ beat, color = EMERALD, width = 68 }:ECGStripProps) => {
  const d = "M0,20 L14,20 L18,20 L22,2 L26,38 L30,20 L34,20 L40,20 L44,13 L48,27 L52,20 L68,20";
  return (
    <svg width={width} height="40" viewBox="0 0 68 40" className="overflow-visible">
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.12"
        strokeLinecap="round" strokeLinejoin="round" />
      <motion.path d={d} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={beat ? { pathLength: [0,1,1], pathOffset:[0,0,1], opacity:[0,1,0] } : {}}
        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1] }}
      />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────
// SYNC DOTS
// ─────────────────────────────────────────────────────────────────
const SyncDots = ({ color = EMERALD }) => (
  <span className="inline-flex items-end gap-0.5 ml-0.5">
    {[0, 0.25, 0.5].map(d => (
      <motion.span key={d} className="inline-block w-0.5 h-0.5 rounded-full"
        style={{ background: color }}
        animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
        transition={{ duration: 1.0, delay: d, repeat: Infinity, ease: "easeInOut" }} />
    ))}
  </span>
);

// ─────────────────────────────────────────────────────────────────
// DATA PACKET
// ─────────────────────────────────────────────────────────────────
const DataPacket = ({ delay, color }:DataPacketProps) => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none"
    style={{ background: color, boxShadow: `0 0 5px ${color}` }}
    initial={{ left: "-2%", opacity: 0 }}
    animate={{ left: ["0%", "102%"], opacity: [0, 0.9, 0.9, 0] }}
    transition={{ duration: 2.2, delay, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
  />
);

// ─────────────────────────────────────────────────────────────────
// VITAL ROW
// ─────────────────────────────────────────────────────────────────
const VitalRow = ({ icon: Icon, label, value, unit, color, doAnim, delta }:VitalRowProps) => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    if (!doAnim) return;
    const t = setInterval(() => {
      setVal(v => Math.round((v + (Math.random() > 0.5 ? delta : -delta)) * 10) / 10);
    }, 1800 + Math.random() * 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-2.5 py-2 px-3 rounded-xl"
      style={{ background: color + "08", border: `1px solid ${color}18` }}>
      <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: color + "15" }}>
        <Icon className="w-3 h-3" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <div className="flex items-baseline gap-1">
          <motion.span key={val} initial={{ opacity: 0.5, y: -3 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold" style={{ color }}>{val}</motion.span>
          <span className="text-[10px] text-slate-400">{unit}</span>
        </div>
      </div>
      <svg width="36" height="18" viewBox="0 0 36 18" className="opacity-40">
        <polyline points="0,14 6,10 12,12 18,6 24,8 30,4 36,6"
          fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="36" cy="6" r="2" fill={color} />
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// ORBIT RING
// ─────────────────────────────────────────────────────────────────
const OrbitRing = ({ size, duration, delay, color }:OrbitRingProps) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, border: `1px solid ${color}`,
      top: "50%", left: "50%", x: "-50%", y: "-50%" }}
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  />
);

// ─────────────────────────────────────────────────────────────────
// DEVICE CARD (center piece with vitals)
// ─────────────────────────────────────────────────────────────────
const DeviceCard = ({ beat, syncPct }:DeviceCardProps) => {
  const status = syncPct >= 99 ? "Synced" : "Syncing";
  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 420 }}>
      {/* ambient */}
      <div className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 320, height: 320,
          background: "radial-gradient(ellipse, rgba(5,150,105,0.07), rgba(99,102,241,0.03), transparent)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <OrbitRing size={270} duration={28} delay={0} color="rgba(5,150,105,0.09)" />
      <OrbitRing size={350} duration={42} delay={5} color="rgba(99,102,241,0.05)" />
      <OrbitRing size={190} duration={18} delay={2} color="rgba(14,165,233,0.07)" />

      {[0, 1.0, 2.0].map((d, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: 210, height: 210, border: "1px solid rgba(5,150,105,0.13)",
            top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          animate={{ scale: [1, 1.65], opacity: [0.3, 0] }}
          transition={{ duration: 2.4, delay: d, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 18 }}
        whileHover={{ scale: 1.025, y: -4 }}
        className="relative z-10 rounded-3xl overflow-hidden"
        style={{ width: 255, background: "#ffffff",
          border: "1px solid rgba(5,150,105,0.18)",
          boxShadow: "0 24px 60px rgba(5,150,105,0.08), 0 4px 20px rgba(0,0,0,0.05)" }}
      >
        <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={beat
            ? { boxShadow: ["0 0 0 1px rgba(5,150,105,0.06)", "0 0 0 2.5px rgba(5,150,105,0.40)", "0 0 0 1px rgba(5,150,105,0.06)"] }
            : { boxShadow: "0 0 0 1px rgba(5,150,105,0.04)" }}
          transition={{ duration: 0.7 }} />
        <div className="h-0.5 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />
        {/* shimmer */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <motion.div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
          <DataPacket delay={0}   color={EMERALD} />
          <DataPacket delay={0.9} color={INDIGO}  />
          <DataPacket delay={1.8} color={SKY}     />
        </div>

        <div className="relative z-10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Arogya Sync</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: EMERALD }}>Patient Monitor</p>
            </div>
            <motion.div className="flex items-center gap-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <span className="w-1.5 h-1.5 rounded-full"
                style={{ background: EMERALD, boxShadow: `0 0 6px ${EMERALD}` }} />
              <span className="text-[9px] font-bold tracking-widest" style={{ color: EMERALD }}>ONLINE</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between mb-4 px-2 py-2 rounded-xl"
            style={{ background: "rgba(5,150,105,0.04)", border: "1px solid rgba(5,150,105,0.12)" }}>
            <div className="relative flex-shrink-0">
              <AnimatePresence>
                {beat && [0, 0.15, 0.3].map((d, i) => (
                  <motion.div key={`r${i}`} className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${EMERALD}` }}
                    initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 3 - i * 0.5, opacity: 0 }}
                    transition={{ duration: 0.85, delay: d, ease: "easeOut" }} />
                ))}
              </AnimatePresence>
              <motion.div className="w-2.5 h-2.5 rounded-full"
                style={{ background: EMERALD, boxShadow: `0 0 8px ${EMERALD}88` }}
                animate={beat ? { scale: [1, 1.7, 1] } : { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: beat ? 0.4 : 1.8, repeat: beat ? 0 : Infinity }}
              />
            </div>
            <ECGStrip beat={beat} color={EMERALD} />
            <div className="text-right">
              <motion.span className="text-[11px] font-bold tabular-nums block"
                style={{ color: syncPct >= 99 ? EMERALD : SKY }}
                key={syncPct} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}
              >{syncPct}%</motion.span>
              <span className="text-[9px]" style={{ color: syncPct >= 99 ? EMERALD : "#64748b" }}>
                {status === "Synced" ? "✓ Synced" : "Syncing…"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <VitalRow icon={Heart}       label="Heart Rate"  value={78}   unit="bpm" color={ROSE}   doAnim delta={2}   />
            <VitalRow icon={Activity}    label="SpO₂"        value={98.2} unit="%"   color={SKY}    doAnim delta={0.2} />
            <VitalRow icon={Thermometer} label="Temperature" value={36.8} unit="°C"  color={AMBER}  doAnim delta={0.1} />
            <VitalRow icon={Wind}        label="Resp. Rate"  value={16}   unit="/m"  color={INDIGO} doAnim delta={1}   />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Data Sync</span>
              <span className="text-[9px] text-slate-400">1,240 patients</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden bg-slate-100">
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${EMERALD}, ${SKY})` }}
                animate={{ width: `${syncPct}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      {[
        { icon: Zap,      label: "Response",    value: "< 500ms Latency", x: "-18%", y: "6%",  delay: 1.1, color: SKY     },
        { icon: Sparkles, label: "AI Accuracy", value: "95%",           x: "68%",  y: "6%",  delay: 1.3, color: INDIGO  },
        { icon: Shield,   label: "HIPAA",       value: "Certified",       x: "68%",  y: "76%", delay: 1.5, color: EMERALD },
        // { icon: Activity, label: "Live",        value: "1,240 Patients",  x: "-18%", y: "76%", delay: 1.7, color: ROSE    },
      ].map(({ icon: Icon, label, value, x, y, delay, color }) => (
        <motion.div key={label}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ left: x, top: y, background: "#ffffff",
            border: `1px solid ${color}22`,
            boxShadow: `0 4px 20px ${color}0e, 0 1px 4px rgba(0,0,0,0.05)` }}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay, type: "spring", stiffness: 120, damping: 16 }}
          whileHover={{ scale: 1.06, y: -2 }}
        >
          <div className="p-1.5 rounded-lg" style={{ background: color + "12" }}>
            <Icon className="w-3.5 h-3.5" style={{ color }} />
          </div>
          <div>
            <p className="text-[9px] text-slate-400 leading-none">{label}</p>
            <p className="text-xs font-bold text-slate-800">{value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// NETWORK ECOSYSTEM BAR (from screenshot, light-adapted)
// ─────────────────────────────────────────────────────────────────
const ConnectorLine = ({ x1, y1, x2, y2, color, delay }:ConnectorLineProps) => (
  <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={color} strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.3"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay, duration: 0.9, ease: "easeOut" }}
  />
);

const LinePacket = ({ x1, y1, x2, y2, color, delay, duration = 2.4 }:LinePacketProps) => (
  <motion.circle r="3" fill={color}
    style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    initial={{ cx: x1, cy: y1, opacity: 0 }}
    animate={{ cx: [x1, x2, x1], cy: [y1, y2, y1], opacity: [0, 1, 1, 0] }}
    transition={{ delay, duration, repeat: Infinity, repeatDelay: 0.8,
      ease: "easeInOut", times: [0, 0.45, 0.9, 1] }}
  />
);

const SatelliteNode = ({ icon: Icon, label, sublabel, color, delay, side }:SatelliteNodeProps) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 100, damping: 18 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl cursor-default"
      style={{
        background: hov ? `linear-gradient(135deg,${color}07,#f8fafc)` : "#ffffff",
        border: `1px solid ${hov ? color + "40" : color + "18"}`,
        boxShadow: hov ? `0 8px 24px ${color}15` : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "all 0.25s ease",
        minWidth: 152,
      }}
    >
      <motion.div
        animate={hov ? { scale: 1.15, rotate: -8 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="p-2 rounded-xl flex-shrink-0"
        style={{ background: color + "12", border: `1px solid ${color}20` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: hov ? color : color + "99" }} />
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold truncate"
          style={{ color: hov ? color : "#374151" }}>{label}</p>
        <p className="text-[9px] text-slate-400 mt-0.5 truncate">{sublabel}</p>
      </div>
      <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }} />
    </motion.div>
  );
};

const CentralHub = ({ beat, syncPct, status }:CentralHubProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 12 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 1.1, type: "spring", stiffness: 90, damping: 18 }}
    className="relative rounded-2xl overflow-hidden px-4 py-3 w-full"
    style={{ background: "#ffffff",
      border: "1px solid rgba(5,150,105,0.2)",
      boxShadow: "0 8px 32px rgba(5,150,105,0.09), 0 2px 8px rgba(0,0,0,0.04)" }}
  >
    <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
      animate={beat
        ? { boxShadow: ["0 0 0 1px rgba(5,150,105,0.06)","0 0 0 2.5px rgba(5,150,105,0.40)","0 0 0 1px rgba(5,150,105,0.06)"] }
        : { boxShadow: "0 0 0 1px rgba(5,150,105,0.04)" }}
      transition={{ duration: 0.65 }} />
    <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
      <DataPacket delay={0}   color={EMERALD} />
      <DataPacket delay={0.9} color={INDIGO}  />
      <DataPacket delay={1.8} color={SKY}     />
    </div>
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <motion.div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-emerald-50/60 to-transparent"
        animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 7 }} />
    </div>

    <div className="relative z-10 flex items-center justify-between mb-2">
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
        Arogya Sync · Device Hub
      </span>
      <motion.div className="flex items-center gap-1"
        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }}>
        <span className="w-1 h-1 rounded-full"
          style={{ background: EMERALD, boxShadow: `0 0 5px ${EMERALD}` }} />
        <span className="text-[9px] font-bold tracking-widest" style={{ color: EMERALD }}>LIVE</span>
      </motion.div>
    </div>

    <div className="relative z-10 flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <AnimatePresence>
          {beat && [0, 0.15, 0.3].map((d, i) => (
            <motion.div key={`r${i}`} className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${EMERALD}` }}
              initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 3.5 - i * 0.6, opacity: 0 }}
              transition={{ duration: 0.9, delay: d, ease: "easeOut" }} />
          ))}
        </AnimatePresence>
        <motion.div className="w-3 h-3 rounded-full relative z-10"
          style={{ background: EMERALD, boxShadow: `0 0 8px ${EMERALD}88` }}
          animate={beat ? { scale: [1,1.6,1] } : { scale: [1,1.15,1], opacity: [0.7,1,0.7] }}
          transition={{ duration: beat ? 0.4 : 1.8, repeat: beat ? 0 : Infinity }}
        />
      </div>
      <div className="flex-shrink-0 -my-1">
        <ECGStrip beat={beat} color={EMERALD} width={80} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold flex items-center" style={{ color: EMERALD }}>
            {status === "Synced"
              ? <motion.span initial={{ opacity:0,scale:0.7 }} animate={{ opacity:1,scale:1 }}>✓ Synced</motion.span>
              : <>Syncing<SyncDots color={EMERALD} /></>}
          </span>
          <motion.span className="text-[11px] font-bold tabular-nums"
            style={{ color: syncPct >= 99 ? EMERALD : SKY }}
            key={syncPct} initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
            transition={{ duration: 0.2 }}>{syncPct}%</motion.span>
        </div>
        <div className="h-1 rounded-full overflow-hidden bg-slate-100">
          <motion.div className="h-full rounded-full"
            style={{ background: syncPct >= 99
              ? `linear-gradient(90deg,${EMERALD},${SKY})`
              : `linear-gradient(90deg,${EMERALD},${INDIGO})` }}
            animate={{ width: `${syncPct}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      {/* <div className="hidden sm:flex flex-shrink-0 items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
        style={{ background: `${EMERALD}0f`, border: `1px solid ${EMERALD}28`, color: EMERALD }}>
        <motion.span animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:2,repeat:Infinity }}>
          1,240 live
        </motion.span>
      </div> */}
    </div>
  </motion.div>
);

const NetworkBar = ({ beat, syncPct }:NetworkBarProps) => {
  const status = syncPct >= 99 ? "Synced" : "Syncing";
  const W = 900, H = 90, hub = { x: W/2, y: H/2 };
  const svgNodes = [
    { x: 60,   y: 22,   color: INDIGO,  d: 0.4  },
    { x: 60,   y: H-14, color: SKY,     d: 0.55 },
    { x: W-60, y: 22,   color: SKY,     d: 0.45 },
    { x: W-60, y: H-14, color: EMERALD, d: 0.6  },
  ];
  const leftNodes = [
    { icon: Lock,  label: "Bank-Grade Secure",    sublabel: "HIPAA · AES-256 · TLS 1.3",   color: INDIGO,  delay: 1.3 },
    { icon: Globe, label: "Cloud Infrastructure", sublabel: "Auto-scaling · 99.9% uptime",  color: SKY,     delay: 1.5 },
  ];
  const rightNodes = [
    { icon: Wifi,       label: "Seamless Access",  sublabel: "Any device, zero-friction",  color: SKY,     delay: 1.3 },
    { icon: Smartphone, label: "Mobile & Web App", sublabel: "iOS · Android · Dashboard",  color: EMERALD, delay: 1.5 },
  ];

  return (
    <div className="w-full mt-6">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between gap-4 relative">
        {/* SVG lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {svgNodes.map((n, i) => (
              <g key={i}>
                <ConnectorLine x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} color={n.color} delay={n.d + 0.5} />
                <LinePacket    x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} color={n.color}
                  delay={n.d + 1.2} duration={2.2 + i * 0.3} />
              </g>
            ))}
          </svg>
        </div>
        <div className="flex flex-col gap-2.5 relative z-10">
          {leftNodes.map(n => <SatelliteNode key={n.label} {...n} side="left" />)}
        </div>
        <div className="flex-1 max-w-sm relative z-10">
          <CentralHub beat={beat} syncPct={syncPct} status={status} />
        </div>
        <div className="flex flex-col gap-2.5 items-end relative z-10">
          {rightNodes.map(n => <SatelliteNode key={n.label} {...n} side="right" />)}
        </div>
      </div>

      {/* Progress dots */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.3 }}
        className="hidden md:flex items-center justify-center gap-2 mt-3">
        {[INDIGO, SKY, EMERALD, EMERALD, SKY, INDIGO].map((c, i) => (
          <motion.div key={i} className="rounded-full"
            style={{ background:c, width: i===2||i===3?5:3, height: i===2||i===3?5:3 }}
            animate={{ opacity:[0.25,0.85,0.25], scale:[1,1.5,1] }}
            transition={{ duration:2, delay:i*0.2, repeat:Infinity }} />
        ))}
      </motion.div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden gap-3">
        <CentralHub beat={beat} syncPct={syncPct} status={status} />
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.8 }}
          className="flex flex-wrap justify-center gap-2">
          {[
            { icon: Lock,       label: "Encrypted",  color: INDIGO  },
            { icon: Wifi,       label: "Seamless",   color: SKY     },
            { icon: Zap,        label: "< 500ms",    color: SKY     },
            { icon: Smartphone, label: "Mobile",     color: EMERALD },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.label}
                initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay: 1.8 + i * 0.08 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
                style={{ background:"#ffffff", border:`1px solid ${c.color}22`,
                  boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <Icon className="w-3 h-3" style={{ color: c.color }} />
                <span className="text-[10px] font-semibold" style={{ color: c.color }}>{c.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// DOT GRID BACKGROUND
// ─────────────────────────────────────────────────────────────────
const DotGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
    <svg width="100%" height="100%">
      <defs>
        <pattern id="herodots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.10)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#herodots)" />
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────
// MAIN HERO
// ─────────────────────────────────────────────────────────────────
export function Hero() {
  const [beat, setBeat]       = useState(false);
  const [syncPct, setSyncPct] = useState(78);

  useEffect(() => {
    const fire = () => {
      setBeat(true);
      setTimeout(() => setBeat(false), 1700);
      setSyncPct(p => Math.min(p >= 99 ? 72 : p + Math.floor(Math.random() * 4 + 1), 100));
    };
    fire();
    const id = setInterval(fire, 2200);
    return () => clearInterval(id);
  }, []);

//   const container = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
//   };
//   const fadeUp = {
//     hidden:  { opacity: 0, y: 28 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
//   };

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-20 pb-2 overflow-hidden bg-clinical-white">
      {/* Dot grid texture */}
      <DotGrid />

      {/* Ambient gradient blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div className="absolute top-[15%] left-[5%] w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(5,150,105,0.08)" }}
          animate={{ scale:[1,1.2,1], opacity:[0.6,1,0.6] }}
          transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div className="absolute bottom-[25%] right-[8%] w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(99,102,241,0.06)" }}
          animate={{ scale:[1,1.15,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut", delay:2 }} />
        <motion.div className="absolute top-[50%] right-[30%] w-56 h-56 rounded-full blur-3xl"
          style={{ background: "rgba(14,165,233,0.06)" }}
          animate={{ scale:[1,1.3,1], opacity:[0.4,0.8,0.4] }}
          transition={{ duration:7, repeat:Infinity, ease:"easeInOut", delay:1 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        {/* ── Hero grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy */}
          <motion.div className="space-y-7" variants={container} initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={container}>
              <motion.span
                className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald/10 text-navy-dark text-xs font-bold tracking-wider uppercase"
                whileHover={{ scale: 1.04 }}
              >
                <motion.span className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: EMERALD }}
                  animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }}
                  transition={{ duration:1.5, repeat:Infinity }} />
                The Future of Healthcare Retrofitting
              </motion.span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={container}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-bold text-navy-dark leading-[1.1]">
                Empowering Healthcare with{" "}
                <span className="text-emerald relative inline-block">
                  Real-Time Monitoring
                  <motion.span
                    className="block h-0.5 rounded-full mt-1"
                    style={{ background: `linear-gradient(90deg,${EMERALD},${SKY})` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Rotating stat */}
            <motion.div variants={container}
              className="text-4xl md:text-5xl font-display font-extrabold">
              <StatHighlight />
            </motion.div>

            {/* Body */}
            <motion.p variants={container}
              className="text-lg md:text-xl text-navy-dark/70 max-w-xl leading-relaxed">
              Transform your existing hospital monitors into smart, connected systems with our
              AI-powered plug-and-play retrofit device. Bridging the gap between analog infrastructure
              and digital healthcare — effortlessly.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={container} className="flex flex-wrap gap-4">
              <motion.div className="relative group" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                <motion.div
                  className="absolute -inset-1 rounded-xl blur-lg opacity-0 group-hover:opacity-35 transition-opacity duration-500"
                  style={{ background:`linear-gradient(135deg,${EMERALD},${SKY})` }} />
                <Button variant="gradient" size="lg" className="relative group">
                  Schedule a Demo
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <Link href="/product">
                <Button variant="outline" size="lg">Explore the Tech</Button>
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div variants={container}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-soft-gray">
              {stats.map((stat, i) => (
                <motion.div key={i} className="flex items-center gap-2 text-navy-dark/60 text-sm font-medium"
                  whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <stat.icon className="w-5 h-5 text-emerald" />
                  {stat.text}
                </motion.div>
              ))}
            </motion.div>

            {/* Feature pills */}
            <motion.div variants={container} className="flex flex-wrap gap-3">
              {[
                { icon: CheckCircle, text: "AI-Powered Analytics", color: EMERALD },
                { icon: Shield,      text: "HIPAA Compliant",       color: SKY     },
                { icon: Zap,         text: "Plug & Play Retrofit",  color: INDIGO  },
              ].map(({ icon: Icon, text, color }) => (
                <motion.div key={text}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: color + "0c", border: `1px solid ${color}20`, color:"#374151" }}
                  whileHover={{ scale: 1.05 }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />{text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — device card */}
          <motion.div className="relative lg:ml-auto"
            initial={{ opacity:0, x:40 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.8, ease:"easeOut", delay:0.2 }}
          >
            <DeviceCard beat={beat} syncPct={syncPct} />
          </motion.div>
        </div>

        {/* ── NETWORK BAR — full width below hero grid ── */}
        <motion.div
          initial={{ opacity:0, y:32 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:1.0, duration:0.7, ease:"easeOut" }}
        >
          <NetworkBar beat={beat} syncPct={syncPct} />
        </motion.div>
      </div>
    </section>
  );
}