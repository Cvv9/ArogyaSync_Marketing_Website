"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lock, Globe, CheckCircle2, ShieldCheck, Fingerprint, Database, Wifi } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";
type Cert = {
  name: string;
  desc: string;
};

type CertCardProps = {
  cert: Cert;
  index: number;
  active: boolean;
};

type AnimatedRingProps = {
  active: boolean;
  color: string;
};

type DataSovereigntyStripProps = {
  active: boolean;
};
// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED SECURITY GRAPHIC — encryption flow visualization
// ─────────────────────────────────────────────────────────────────────────────
const EncryptionGraphic = () => {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center" style={{ height: 200 }}>
      <svg width="100%" height="200" viewBox="0 0 340 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="shieldglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={EMERALD} stopOpacity="0.12" />
            <stop offset="100%" stopColor={EMERALD} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central shield */}
        <circle cx="170" cy="100" r="52" fill="url(#shieldglow)" />
        {[0, 1, 2].map(i => (
          <motion.circle key={i} cx="170" cy="100" r={52 + i * 14}
            fill="none" stroke={`${EMERALD}${["28","18","0c"][i]}`} strokeWidth="1"
            animate={active ? { scale: [1, 1.08, 1], opacity: [0.7, 0.3, 0.7] } : {}}
            transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            style={{ transformOrigin: "170px 100px" }}
          />
        ))}
        <motion.path
          d="M170,62 L196,74 L196,102 Q196,124 170,134 Q144,124 144,102 L144,74 Z"
          fill={`${EMERALD}10`} stroke={EMERALD} strokeWidth="1.8"
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 14 }}
          style={{ transformOrigin: "170px 98px" }}
        />
        <motion.path d="M162,98 L168,104 L180,92" fill="none" stroke={EMERALD}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />

        {/* Satellite nodes */}
        {[
          { cx: 48,  cy: 48,  icon: "🔒", label: "AES-256",   color: EMERALD, delay: 0.4 },
          { cx: 292, cy: 48,  icon: "🛡",  label: "HIPAA",     color: SKY,     delay: 0.55 },
          { cx: 292, cy: 152, icon: "⛓",  label: "Blockchain", color: INDIGO, delay: 0.7 },
          { cx: 48,  cy: 152, icon: "☁",  label: "Cloud",      color: AMBER,  delay: 0.85 },
        ].map((n, i) => (
          <g key={i}>
            {/* connector line */}
            <motion.line x1={n.cx} y1={n.cy} x2={170} y2={100}
              stroke={`${n.color}28`} strokeWidth="1" strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: n.delay, duration: 0.6 }}
            />
            {/* travelling packet */}
            <motion.circle r="3" fill={n.color}
              style={{ filter: `drop-shadow(0 0 3px ${n.color}88)` }}
              initial={{ cx: n.cx, cy: n.cy, opacity: 0 }}
              animate={active ? {
                cx: [n.cx, 170, n.cx],
                cy: [n.cy, 100, n.cy],
                opacity: [0, 1, 1, 0],
              } : {}}
              transition={{ delay: n.delay + 0.8, duration: 1.8, repeat: Infinity,
                repeatDelay: 1.2, ease: "easeInOut", times: [0, 0.45, 0.9, 1] }}
            />
            {/* node circle */}
            <motion.circle cx={n.cx} cy={n.cy} r="26"
              fill={`${n.color}08`} stroke={`${n.color}25`} strokeWidth="1.2"
              initial={{ scale: 0, opacity: 0 }}
              animate={active ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: n.delay, type: "spring", stiffness: 120, damping: 14 }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
            <motion.circle cx={n.cx} cy={n.cy} r="26"
              fill="none" stroke={n.color} strokeWidth="0.8"
              animate={active ? { r: [26, 34], opacity: [0.4, 0] } : {}}
              transition={{ duration: 2, delay: n.delay + 0.3, repeat: Infinity, ease: "easeOut" }}
            />
            <text x={n.cx} y={n.cy - 4} textAnchor="middle" fontSize="11">{n.icon}</text>
            <text x={n.cx} y={n.cy + 10} textAnchor="middle" fill={n.color}
              fontSize="6.5" fontFamily="monospace" fontWeight="bold">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATION CARD
// ─────────────────────────────────────────────────────────────────────────────
const certIcons = [Shield, ShieldCheck, Fingerprint, Globe];
const certColors = [EMERALD, SKY, INDIGO, AMBER];

const CertCard: React.FC<CertCardProps> = ({ cert, index, active }) => {
  const [hov, setHov] = useState(false);
  const Icon = certIcons[index];
  const c = certColors[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 80, damping: 18 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative p-5 rounded-2xl overflow-hidden flex flex-col items-center text-center cursor-default"
      style={{
        background: "#ffffff",
        border: `1.5px solid ${hov ? c + "35" : c + "14"}`,
        boxShadow: hov
          ? `0 8px 28px ${c}10, 0 2px 6px rgba(0,0,0,0.04)`
          : `0 2px 10px ${c}07`,
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />

      {/* icon */}
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: `${c}0e`, border: `1.5px solid ${c}22` }}
        animate={hov ? { scale: 1.1, rotate: -6 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Icon className="w-6 h-6" style={{ color: c }} />
      </motion.div>

      {/* pulse ring on hover */}
      {/* <AnimatedRing active={hov} color={c} /> */}

      <h4 className="text-sm font-bold text-slate-800 mb-1">{cert.name}</h4>
      <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider leading-snug">
        {cert.desc}
      </p>

      {/* verified badge */}
      <motion.div
        className="mt-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold"
        style={{ background: `${c}0c`, border: `1px solid ${c}20`, color: c }}
        animate={hov ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.2 }}>
        <CheckCircle2 className="w-3 h-3" />
        Verified
      </motion.div>
    </motion.div>
  );
};

const AnimatedRing: React.FC<AnimatedRingProps> = ({ active, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: 48, height: 48, border: `1px solid ${color}`, top: "50%", left: "50%",
      x: "-50%", y: "-80%" }}
    animate={active ? { scale: [1, 2.2], opacity: [0.4, 0] } : {}}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// DATA SOVEREIGNTY STRIP
// ─────────────────────────────────────────────────────────────────────────────
const DataSovereigntyStrip: React.FC<DataSovereigntyStripProps> = ({ active }) => (
  <motion.div
    className="col-span-2 rounded-2xl overflow-hidden flex items-center justify-between px-6 py-4 gap-4"
    style={{ background: `linear-gradient(135deg, ${EMERALD}07, ${SKY}05)`,
      border: `1.5px solid ${EMERALD}18`,
      boxShadow: `0 2px 12px ${EMERALD}06` }}
    initial={{ opacity: 0, y: 16 }}
    animate={active ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.6, type: "spring", stiffness: 80, damping: 18 }}
  >
    {/* Left: lock icon + text */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${EMERALD}10`, border: `1.5px solid ${EMERALD}25` }}>
        <Lock className="w-6 h-6" style={{ color: EMERALD }} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-800">Data Sovereignty</h4>
        <p className="text-xs text-slate-400 font-medium">Full control over where your data resides.</p>
      </div>
    </div>

    {/* Right: animated data flow */}
    <div className="flex items-center gap-2 flex-shrink-0">
      {[
        { icon: Database, label: "Local", color: EMERALD  },
        { icon: Wifi,     label: "Sync",  color: SKY      },
        { icon: Globe,    label: "Cloud", color: INDIGO   },
      ].map((n, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${n.color}0e`, border: `1px solid ${n.color}22` }}>
              <n.icon className="w-4 h-4" style={{ color: n.color }} />
            </div>
            <span className="text-[8px] font-bold" style={{ color: n.color + "80" }}>{n.label}</span>
          </div>
          {i < 2 && (
            <div className="relative w-8 flex items-center">
              <div className="w-full h-px" style={{ background: `${n.color}20` }} />
              <motion.div className="absolute w-1.5 h-1.5 rounded-full"
                style={{ background: n.color, boxShadow: `0 0 4px ${n.color}` }}
                animate={active ? { left: ["0%", "100%"] } : {}}
                transition={{ duration: 1.2, delay: 0.8 + i * 0.3, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS DATA
// ─────────────────────────────────────────────────────────────────────────────
const certifications: Cert[] = [
  // { name: "ISO 13485",   desc: "Medical Device Quality Management" },
  // { name: "IEC 60601",   desc: "Medical Electrical Equipment Safety" },
  // { name: "CDSCO",       desc: "Indian Regulatory Approval" },
  // { name: "HIPAA Ready", desc: "Global Data Privacy Standards" },
];

const checkItems = [
  "HIPAA Compliant Architecture",
  "End-to-end AES-256 Data Encryption",
  "Zero Leakage for Insurance Claims",
  "Clinically Validated (95% Accuracy,Tested Internally)",
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function TrustCompliance() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-18 bg-white relative overflow-hidden border-y"
      style={{ borderColor: `${EMERALD}10` }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="trustdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.11)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trustdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 500, height: 500, background: `${EMERALD}05`, top: "-10%", left: "-5%" }}
          animate={{ scale: [1,1.1,1], opacity: [0.5,0.9,0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 400, height: 400, background: `${INDIGO}04`, bottom: "-8%", right: "-4%" }}
          animate={{ scale: [1,1.12,1], opacity: [0.4,0.8,0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: copy + checklist ── */}
          <div>
            <motion.span
              className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
              initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5 }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
                animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
              Trust & Compliance
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-[1.1]"
              initial={{ opacity:0, y:16 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.1 }}>
              Enterprise-grade reliability,{" "}
              <span style={{
                backgroundImage: `linear-gradient(135deg, ${EMERALD}, ${SKY})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>clinically certified.</span>
            </motion.h2>

            <motion.p className="text-slate-500 text-lg leading-relaxed mb-8"
              initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.15 }}>
              We adhere to the highest international standards for medical devices and data security —
              ensuring your patient data stays secure and your hospital stays compliant.
            </motion.p>

            {/* Checklist */}
            <div className="space-y-3 mb-10">
              {checkItems.map((item, i) => (
                <motion.div key={i} className="flex items-center gap-3"
                  initial={{ opacity:0, x:-16 }} animate={active ? { opacity:1, x:0 } : {}}
                  transition={{ delay:0.25+i*0.1, type:"spring", stiffness:90, damping:18 }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background:`${EMERALD}12`, border:`1px solid ${EMERALD}28` }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Encryption graphic */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: `${EMERALD}04`, border: `1px solid ${EMERALD}12` }}>
              <EncryptionGraphic />
            </div>
          </div>

          {/* ── RIGHT: cert cards grid ── */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <CertCard key={i} cert={cert} index={i} active={active} />
              ))}
            </div>
            <DataSovereigntyStrip active={active} />

            {/* Mini trust bar */}
            <motion.div
              className="rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4"
              style={{ background: "#f0fdf8", border: `1px solid ${EMERALD}15` }}
              initial={{ opacity:0, y:14 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.75, duration:0.5 }}>
              <div className="flex items-center gap-2 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" style={{ color: EMERALD }} />
                <span className="text-xs font-bold text-slate-700">Audit-Ready Reports</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2 flex-shrink-0">
                <Lock className="w-4 h-4" style={{ color: SKY }} />
                <span className="text-xs font-bold text-slate-700">Zero-Trust Architecture</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2 flex-shrink-0">
                <Globe className="w-4 h-4" style={{ color: INDIGO }} />
                <span className="text-xs font-bold text-slate-700">Multi-region Hosting</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}