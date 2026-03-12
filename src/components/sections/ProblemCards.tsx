"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Clipboard, MonitorOff, Users, ShieldAlert, ArrowRight,
  CheckCircle, Zap, TrendingDown, Lock,
} from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const ROSE    = "#e11d48";
const AMBER   = "#d97706";

// ─────────────────────────────────────────────────────────────────────────────
// MICRO GRAPHICS  (light-mode SVGs per card)
// ─────────────────────────────────────────────────────────────────────────────

/** Card 1 FRONT — paper stack with error marks + clock */
const ManualLoggingFrontGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      {/* Paper stack */}
      {[8, 5, 2].map((o, i) => (
        <rect key={i} x={14 + o} y={6 + o * 2} width={66} height={48} rx="5"
          fill={`rgba(5,150,105,${0.03 + i * 0.02})`}
          stroke={`rgba(5,150,105,${0.12 + i * 0.06})`} strokeWidth="1.2" />
      ))}
      {/* Lines on top page */}
      {[0, 1, 2, 3].map(i => (
        <motion.line key={i} x1={24} y1={20 + i * 8} x2={i === 2 ? 52 : 68} y2={20 + i * 8}
          stroke="rgba(5,150,105,0.2)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }} />
      ))}
      {/* Error marks */}
      {[[76, 18], [80, 34]].map(([x, y], i) => (
        <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.2, type: "spring" }}
          style={{ transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r="7" fill={`${ROSE}12`} stroke={`${ROSE}40`} strokeWidth="1.2" />
          <text x={x} y={y + 4} textAnchor="middle" fill={ROSE} fontSize="9" fontWeight="bold">✕</text>
        </motion.g>
      ))}
      {/* Clock */}
      <circle cx="102" cy="16" r="12" fill={`${AMBER}10`} stroke={`${AMBER}40`} strokeWidth="1.2" />
      <motion.line x1="102" y1="16" x2="102" y2="8" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round"
        animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "102px 16px" }} />
      <line x1="102" y1="16" x2="110" y2="16" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

/** Card 1 BACK — OCR scan beam over monitor */
const OCRSolutionGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      <rect x="14" y="4" width="78" height="52" rx="6"
        fill={`${EMERALD}06`} stroke={`${EMERALD}30`} strokeWidth="1.4" />
      {[["SpO₂", "98%", 18], ["HR", "76 bpm", 32], ["BP", "118/76", 46]].map(([k, v, y]) => (
        <g key={k}>
          <text x="22" y={y} fill={`${EMERALD}55`} fontSize="7" fontFamily="monospace">{k}</text>
          <motion.text x="62" y={y} fill={EMERALD} fontSize="8" fontFamily="monospace" fontWeight="bold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {v}
          </motion.text>
        </g>
      ))}
      <motion.rect x="14" y="4" width="78" height="3" rx="1"
        fill={`${EMERALD}70`} style={{ filter: `drop-shadow(0 0 5px ${EMERALD}99)` }}
        animate={{ y: ["4px", "52px", "4px"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {[[14,4],[92,4],[92,56],[14,56]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`}>
          <path d={i===0?"M0,10 L0,0 L10,0":i===1?"M0,0 L10,0 L10,10":i===2?"M10,0 L10,10 L0,10":"M10,10 L0,10 L0,0"}
            fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <rect x="78" y="58" width="36" height="12" rx="6"
          fill={`${EMERALD}12`} stroke={`${EMERALD}35`} strokeWidth="1" />
        <text x="96" y="67" textAnchor="middle" fill={EMERALD} fontSize="7" fontWeight="bold" fontFamily="monospace">
          95% ✓
        </text>
      </motion.g>
    </svg>
  </div>
);

/** Card 2 FRONT — staff overload */
const StaffFrontGraphic = () => {
  const pts = Array.from({ length: 8 }, (_, i) => ({ x: 10 + i * 13, y: i % 2 === 0 ? 10 : 22 }));
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
      <svg width="120" height="72" viewBox="0 0 120 72">
        {pts.map((p, i) => (
          <motion.g key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}>
            <circle cx={p.x} cy={p.y} r="5"
              fill={`${SKY}10`} stroke={`${SKY}${i > 5 ? "55" : "25"}`} strokeWidth="1" />
            <line x1={p.x} y1={p.y + 5} x2={p.x} y2={p.y + 14}
              stroke={`${SKY}${i > 5 ? "55" : "22"}`} strokeWidth="1.2" />
          </motion.g>
        ))}
        {/* Nurse */}
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: "60px 52px" }}>
          <circle cx="60" cy="48" r="10" fill={`${ROSE}10`} stroke={`${ROSE}40`} strokeWidth="1.5" />
          <line x1="60" y1="58" x2="60" y2="68" stroke={`${ROSE}40`} strokeWidth="1.5" />
          <text x="60" y="52" textAnchor="middle" fill={ROSE} fontSize="9" fontWeight="bold">+</text>
        </motion.g>
        {/* Stress arcs */}
        {[0, 1].map(i => (
          <motion.path key={i}
            d={`M ${46 - i * 4} ${38 + i * 3} Q 60 ${30 - i * 4} ${74 + i * 4} ${38 + i * 3}`}
            fill="none" stroke={`${ROSE}${30 - i * 10}`} strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }} />
        ))}
        <text x="104" y="62" fill={`${ROSE}70`} fontSize="9" fontFamily="monospace" fontWeight="bold">1:8</text>
      </svg>
    </div>
  );
};

/** Card 2 BACK — cloud sync topology */
const CloudSolutionGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      <path d="M32,50 Q20,50 20,40 Q20,31 28,30 Q26,18 38,16 Q44,9 55,16 Q66,9 72,18 Q84,18 84,30 Q92,32 90,42 Q88,52 78,52 Z"
        fill={`${SKY}10`} stroke={`${SKY}35`} strokeWidth="1.2" />
      {[{ x: 16, y: 62 }, { x: 48, y: 66 }, { x: 80, y: 62 }].map((d, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.2 }}>
          <rect x={d.x} y={d.y - 8} width={16} height={10} rx="2"
            fill={`${SKY}12`} stroke={`${SKY}30`} strokeWidth="1" />
          <motion.line x1={d.x + 8} y1={d.y - 8} x2={55} y2={50}
            stroke={`${SKY}25`} strokeWidth="1" strokeDasharray="3 2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.2, duration: 0.5 }} />
          <motion.circle r="2.5" fill={SKY}
            style={{ filter: `drop-shadow(0 0 3px ${SKY}88)` }}
            initial={{ cx: d.x + 8, cy: d.y - 8, opacity: 0 }}
            animate={{ cx: [d.x + 8, 55], cy: [d.y - 8, 50], opacity: [0, 1, 0] }}
            transition={{ delay: 1 + i * 0.4, duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
          />
        </motion.g>
      ))}
      <rect x="14" y="68" width="92" height="4" rx="2" fill={`${SKY}12`} />
      <motion.rect x="14" y="68" width="0" height="4" rx="2"
        fill={SKY} style={{ filter: `drop-shadow(0 0 3px ${SKY}88)` }}
        animate={{ width: 92 }} transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }} />
    </svg>
  </div>
);

/** Card 3 FRONT — legacy monitor with price tag */
const LegacyFrontGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      <rect x="10" y="6" width="68" height="48" rx="5"
        fill={`${AMBER}06`} stroke={`${AMBER}25`} strokeWidth="1.4" />
      <rect x="16" y="12" width="56" height="30" rx="3"
        fill={`${AMBER}06`} stroke={`${AMBER}15`} strokeWidth="1" />
      {[0,1,2,3,4].map(i => (
        <motion.line key={i} x1={18} y1={16 + i * 6} x2={18 + 10 + i * 8} y2={16 + i * 6}
          stroke={`${AMBER}20`} strokeWidth="1" strokeLinecap="round"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, delay: i * 0.15 }} />
      ))}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }} style={{ transformOrigin: "44px 28px" }}>
        <circle cx="44" cy="28" r="10" fill={`${ROSE}10`} stroke={`${ROSE}35`} strokeWidth="1.5" />
        <text x="44" y="33" textAnchor="middle" fill={ROSE} fontSize="14" fontWeight="bold">✕</text>
      </motion.g>
      <rect x="24" y="54" width="20" height="7" rx="2"
        fill={`${AMBER}10`} stroke={`${AMBER}20`} strokeWidth="1" />
      <rect x="18" y="61" width="32" height="4" rx="2"
        fill={`${AMBER}10`} stroke={`${AMBER}20`} strokeWidth="1" />
      {/* Cost tag */}
      <motion.g initial={{ x: 16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
        <rect x="82" y="10" width="34" height="22" rx="6"
          fill={`${AMBER}12`} stroke={`${AMBER}35`} strokeWidth="1.2" />
        <text x="99" y="21" textAnchor="middle" fill={AMBER} fontSize="6.5" fontFamily="monospace" fontWeight="bold">₹15-20L</text>
        <text x="99" y="29" textAnchor="middle" fill={`${AMBER}80`} fontSize="5.5" fontFamily="monospace">per unit</text>
      </motion.g>
    </svg>
  </div>
);

/** Card 3 BACK — retrofit snap-on with savings badge */
const RetrofitSolutionGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      <rect x="6" y="10" width="54" height="40" rx="5"
        fill={`${EMERALD}06`} stroke={`${EMERALD}25`} strokeWidth="1.2" />
      <motion.polyline
        points="12,30 18,30 22,22 26,38 30,30 36,30 40,25 44,35 48,30 54,30"
        fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 3px ${EMERALD}88)` }}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.9 }}
      />
      {/* Device */}
      <motion.g initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 16 }}>
        <rect x="64" y="16" width="32" height="28" rx="6"
          fill={`${EMERALD}10`} stroke={`${EMERALD}40`} strokeWidth="1.5" />
        <text x="80" y="28" textAnchor="middle" fill={EMERALD} fontSize="7" fontFamily="monospace" fontWeight="bold">SYNC</text>
        <motion.circle cx="80" cy="37" r="4"
          fill={`${EMERALD}25`} stroke={`${EMERALD}60`} strokeWidth="1"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.circle cx="80" cy="37" r="4"
          fill="none" stroke={EMERALD}
          animate={{ r: [4, 8], opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }} />
      </motion.g>
      {/* Arrow */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <line x1="60" y1="30" x2="64" y2="30" stroke={EMERALD} strokeWidth="2" strokeLinecap="round" />
        <path d="M62,27 L66,30 L62,33" fill="none" stroke={EMERALD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      {/* Savings badge */}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 200, damping: 14 }}
        style={{ transformOrigin: "100px 58px" }}>
        <rect x="84" y="50" width="32" height="18" rx="5"
          fill={`${EMERALD}12`} stroke={`${EMERALD}40`} strokeWidth="1.2" />
        <text x="100" y="60" textAnchor="middle" fill={EMERALD} fontSize="8" fontFamily="monospace" fontWeight="bold">-85%</text>
        <text x="100" y="65" textAnchor="middle" fill={`${EMERALD}70`} fontSize="4.5" fontFamily="monospace">cost saved</text>
      </motion.g>
    </svg>
  </div>
);

/** Card 4 FRONT — delayed response timeline */
const SafetyFrontGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      <rect x="8" y="32" width="104" height="5" rx="2.5" fill={`${ROSE}10`} />
      <motion.rect x="8" y="32" width="0" height="5" rx="2.5"
        fill={`${ROSE}50`} style={{ filter: `drop-shadow(0 0 4px ${ROSE}66)` }}
        animate={{ width: 80 }} transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }} />
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring" }} style={{ transformOrigin: "100px 16px" }}>
        <path d="M100,6 L110,24 L90,24 Z" fill={`${AMBER}15`} stroke={`${AMBER}60`} strokeWidth="1.5" />
        <text x="100" y="22" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="bold">!</text>
      </motion.g>
      <motion.text x="54" y="27" textAnchor="middle" fill={`${ROSE}70`}
        fontSize="7" fontFamily="monospace" fontWeight="bold"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        DELAYED RESPONSE
      </motion.text>
      {["0m", "15m", "30m", "45m", "60m"].map((t, i) => (
        <g key={t}>
          <line x1={8 + i * 26} y1={37} x2={8 + i * 26} y2={42}
            stroke={`${ROSE}25`} strokeWidth="1" />
          <text x={8 + i * 26} y={50} textAnchor="middle" fill={`${ROSE}50`}
            fontSize="6" fontFamily="monospace">{t}</text>
        </g>
      ))}
      <motion.polyline
        points="8,64 36,64 38,57 40,71 42,64 90,64 95,56 100,64 112,64"
        fill="none" stroke={`${ROSE}50`} strokeWidth="1.6" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1.4 }} />
    </svg>
  </div>
);

/** Card 4 BACK — blockchain chain with shield */
const BlockchainSolutionGraphic = () => (
  <div className="w-full flex items-center justify-center" style={{ height: 88 }}>
    <svg width="120" height="72" viewBox="0 0 120 72">
      {[{ x: 4 }, { x: 42 }, { x: 80 }].map((b, i) => (
        <motion.g key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.15, type: "spring" }}>
          <rect x={b.x} y={14} width={34} height={36} rx="6"
            fill={`${INDIGO}08`} stroke={`${INDIGO}30`} strokeWidth="1.2" />
          <rect x={b.x + 10} y={22} width={14} height={10} rx="2"
            fill="none" stroke={`${INDIGO}50`} strokeWidth="1.2" />
          <path d={`M${b.x + 13},22 Q${b.x + 17},16 ${b.x + 21},22`}
            fill="none" stroke={`${INDIGO}50`} strokeWidth="1.2" />
          <text x={b.x + 17} y={42} textAnchor="middle" fill={`${INDIGO}40`}
            fontSize="5" fontFamily="monospace">#{i + 1}</text>
        </motion.g>
      ))}
      {[0, 1].map(i => (
        <g key={i}>
          <motion.line x1={38 + i * 38} y1={32} x2={42 + i * 38} y2={32}
            stroke={`${INDIGO}40`} strokeWidth="1.5" strokeDasharray="2 1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }} />
          <motion.circle r="2.5" fill={INDIGO}
            style={{ filter: `drop-shadow(0 0 3px ${INDIGO}88)` }}
            initial={{ cx: 38 + i * 38, cy: 32, opacity: 0 }}
            animate={{ cx: [38 + i * 38, 42 + i * 38], cy: [32, 32], opacity: [0, 1, 0] }}
            transition={{ delay: 1 + i * 0.5, duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }} />
        </g>
      ))}
      {/* Shield */}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        style={{ transformOrigin: "108px 32px" }}>
        <path d="M108,18 L118,22 L118,36 Q118,46 108,50 Q98,46 98,36 L98,22 Z"
          fill={`${INDIGO}10`} stroke={`${INDIGO}40`} strokeWidth="1.4" />
        <text x="108" y="38" textAnchor="middle" fill={INDIGO} fontSize="14" fontWeight="bold">✓</text>
      </motion.g>
      <motion.text x="60" y="64" textAnchor="middle" fill={`${INDIGO}50`}
        fontSize="5.5" fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        IMMUTABLE · TAMPER-PROOF
      </motion.text>
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
type Problem = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  front: string;
  back: string;
  solution: string;
  description: string;
  accentColor: string;
  solutionIcon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  FrontGraphic: React.ComponentType;
  BackGraphic: React.ComponentType;
  stat: {
    value: string;
    label: string;
  };
};
const problems: Problem[] = [
  {
    icon: Clipboard, title: "Manual Data Logging",
    front: "4+ hours/day wasted per nurse on manual record keeping.",
    back: "AI-Powered OCR", solution: "95% Accuracy",
    description: "Universal OCR capture eliminates manual entry and human error entirely.",
    accentColor: EMERALD, solutionIcon: CheckCircle,
    FrontGraphic: ManualLoggingFrontGraphic, BackGraphic: OCRSolutionGraphic,
    stat: { value: "4h", label: "Saved Daily" },
  },
  {
    icon: Users, title: "Overburdened Staff",
    front: "Hospital staff work long hours and manage more patients than their capacity everyday",
    back: "Auto Record keeping and constant digital monitoring", solution: "",
    description: "Minimize error due to overworked staff,reduce staff work hours on record keeping and patient monitoring hospitals will be able to run smoothly with staff optimized with ArogyaSync",
    accentColor: SKY, solutionIcon: Zap,
    FrontGraphic: StaffFrontGraphic, BackGraphic: CloudSolutionGraphic,
    stat: { value: "99.9%", label: "Uptime SLA" },
  },
  {
    icon: MonitorOff, title: "Legacy Infrastructure",
    front: "Current Technology replacement unit systems costs 1.5L - 2L+ per bed with restrictions by the brand of the monitor system.",
    back: "Universal Retrofit", solution: "85% Cost Savings",
    description: "Transform 'dumb' monitors into smart systems at a fraction of the cost.",
    accentColor: AMBER, solutionIcon: TrendingDown,
    FrontGraphic: LegacyFrontGraphic, BackGraphic: RetrofitSolutionGraphic,
    stat: { value: "85%", label: "Cost Saved" },
  },
  {
    icon: ShieldAlert, title: "Patient Risks",
    front: "Overworked staff can lead to human errors,limited nurse to patient ratio may lead to delayed detection and response from staff.",
    back: "24x7* Digital Monitoring", solution: "Fast Alerts and Tamper-Proof Records.",
    description: "Whenever a patient's vitals get affected the device sends alerts for quick response time by nurse and doctors",
    accentColor: INDIGO, solutionIcon: Lock,
    FrontGraphic: SafetyFrontGraphic, BackGraphic: BlockchainSolutionGraphic,
    stat: { value: "0", label: "Breach Events" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLIP CARD (fully light)
// ─────────────────────────────────────────────────────────────────────────────
type ProblemCardProps = {
  problem: Problem;
  index: number;
};

const ProblemCard = ({ problem, index }: ProblemCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [flipped, setFlipped] = useState(false);
  const c = problem.accentColor;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 75, damping: 18 }}
      className="h-[440px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ── FRONT ── */}
        <div className="absolute inset-0 rounded-[28px] overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            background: "#ffffff",
            border: `1.5px solid ${c}20`,
            boxShadow: `0 4px 24px ${c}0c, 0 1px 4px rgba(0,0,0,0.04)`,
          }}>
          {/* top accent bar */}
          <div className="h-1 w-full flex-shrink-0"
            style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }} />

          {/* graphic zone */}
          <div className="relative flex-shrink-0 overflow-hidden"
            style={{ height: 96, background: `${c}05`,
              borderBottom: `1px solid ${c}12` }}>
            {/* subtle dot grid */}
            <svg className="absolute inset-0 w-full h-full" aria-hidden>
              <defs>
                <pattern id={`fg-${index}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill={`${c}20`} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#fg-${index})`} />
            </svg>
            {/* radial glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 100%, ${c}0a, transparent 70%)` }} />
            {inView && <problem.FrontGraphic />}
          </div>

          {/* content */}
          <div className="flex flex-col flex-1 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${c}10`, border: `1.5px solid ${c}22` }}>
                <problem.icon className="w-5 h-5" style={{ color: c }} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-800 leading-tight">{problem.title}</h4>
                <div className="text-[10px] uppercase tracking-widest font-bold mt-0.5"
                  style={{ color: c + "80" }}>Problem</div>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed flex-1">{problem.front}</p>

            {/* stat */}
            <div className="mt-4 flex items-center justify-between rounded-xl px-3 py-2"
              style={{ background: `${c}07`, border: `1px solid ${c}15` }}>
              <span className="text-xs text-slate-400 font-medium">Impact</span>
              <span className="text-xs font-bold" style={{ color: c }}>
                {problem.stat.value} {problem.stat.label}
              </span>
            </div>

            {/* flip hint */}
            <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold"
              style={{ color: c }}>
              <span>See Solution</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="absolute inset-0 rounded-[28px] overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, ${c}08, #f8faff 55%, #ffffff)`,
            border: `1.5px solid ${c}30`,
            boxShadow: `0 8px 32px ${c}12, 0 1px 4px rgba(0,0,0,0.04)`,
          }}>
          {/* top accent */}
          <div className="h-1 w-full flex-shrink-0"
            style={{ background: `linear-gradient(90deg, ${c}, ${c}66, transparent)` }} />

          {/* graphic zone */}
          <div className="relative flex-shrink-0 overflow-hidden"
            style={{ height: 96, background: `${c}04`,
              borderBottom: `1px solid ${c}15` }}>
            <svg className="absolute inset-0 w-full h-full" aria-hidden>
              <defs>
                <pattern id={`bg-${index}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill={`${c}25`} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#bg-${index})`} />
            </svg>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 100%, ${c}0d, transparent 70%)` }} />
            {flipped && <problem.BackGraphic />}
          </div>

          {/* content */}
          <div className="flex flex-col flex-1 p-6">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: c + "80" }}>The ArogyaSync Solution</div>
            <div className="text-lg font-mono font-bold mb-3 text-slate-800">{problem.back}</div>

            <div className="h-px w-full mb-3" style={{ background: `${c}18` }} />

            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${c}12`, border: `1px solid ${c}25` }}>
                <problem.solutionIcon className="w-4 h-4" style={{ color: c }} />
              </div>
              <span className="text-sm font-bold" style={{ color: c }}>{problem.solution}</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed flex-1">{problem.description}</p>

            {/* progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] font-medium mb-1.5"
                style={{ color: c + "90" }}>
                <span>Effectiveness</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${c}15` }}>
                <motion.div className="h-full rounded-full" style={{ background: c }}
                  initial={{ width: "0%" }}
                  animate={flipped ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }} />
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3 text-[11px] font-medium"
              style={{ color: c + "70" }}>
              <ArrowRight className="w-3 h-3 rotate-180" />
              <span>Back to problem</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function ProblemCards() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-50">
          <defs>
            <pattern id="probdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.12)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#probdots)" />
        </svg>
        <motion.div className="absolute top-[-8%] right-[-4%] rounded-full blur-[100px]"
          style={{ width: 500, height: 500, background: "rgba(5,150,105,0.05)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-[-6%] left-[-4%] rounded-full blur-[100px]"
          style={{ width: 400, height: 400, background: "rgba(99,102,241,0.04)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          {/* Problem → Solution pill pair */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${ROSE}0a`, border: `1px solid ${ROSE}20`, color: ROSE }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ROSE }}
                animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              The Problem
            </div>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </motion.div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${EMERALD}0a`, border: `1px solid ${EMERALD}22`, color: EMERALD }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: EMERALD }}
                animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} />
              The Solution
            </div>
          </div>

          <motion.h3
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Bridging the gap between{" "}
            <span style={{
              backgroundImage: `linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>legacy hardware</span>{" "}
            and modern data.
          </motion.h3>
          <motion.p className="text-slate-500 text-lg leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            Hospitals face a multi-billion dollar dilemma: replace perfectly functional monitors or stay
            disconnected. ArogyaSync offers a third way.{" "}
            <span className="font-semibold" style={{ color: EMERALD }}>Click any card to reveal our solution.</span>
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {problems.map((problem, idx) => (
            <ProblemCard key={idx} problem={problem} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}