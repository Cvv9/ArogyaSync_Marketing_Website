"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, Clock, Rocket, CheckCircle2, X, Minus, IndianRupee, Zap, Shield } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const ROSE    = "#e11d48";
const AMBER   = "#d97706";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ComparisonRow {
  feature:   string;
  sub:       string;
  ge:        string;
  bpl:       string;
  arogya:    string;
  isWinner:  boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const comparisonData: ComparisonRow[] = [
  {
    feature:  "Total Cost (per 10 beds)",
    sub:      "Upfront capital expenditure",
    ge:       "₹15 – 20 Lakhs",
    bpl:      "₹7 – 12 Lakhs",
    arogya:   "₹2.5 Lakhs",
    isWinner: true,
  },
  {
    feature:  "Installation Time",
    sub:      "From unboxing to live",
    ge:       "2 – 4 Weeks",
    bpl:      "3 – 5 Days",
    arogya:   "<30 Minutes",
    isWinner: true,
  },
  {
    feature:  "Infrastructure Downtime",
    sub:      "During deployment",
    ge:       "Significant",
    bpl:      "Moderate",
    arogya:   "Zero",
    isWinner: true,
  },
  {
    feature:  "Connectivity",
    sub:      "Integration capability",
    ge:       "Proprietary",
    bpl:      "Limited",
    arogya:   "Universal IoT",
    isWinner: true,
  },
];

// ─── Verdict helpers ─────────────────────────────────────────────────────────
const geVerdict   = (row: ComparisonRow) => ({ icon: X,      color: ROSE,  bg: `${ROSE}08`   });
const bplVerdict  = (row: ComparisonRow) => ({ icon: Minus,  color: AMBER, bg: `${AMBER}08`  });
const aroVerdict  = (row: ComparisonRow) => ({ icon: CheckCircle2, color: EMERALD, bg: `${EMERALD}10` });

// ─────────────────────────────────────────────────────────────────────────────
// TABLE ROW
// ─────────────────────────────────────────────────────────────────────────────
const TableRow: React.FC<{ row: ComparisonRow; index: number; active: boolean }> = ({ row, index, active }) => {
  const gv = geVerdict(row);
  const bv = bplVerdict(row);
  const av = aroVerdict(row);
  const GIcon = gv.icon;
  const BIcon = bv.icon;
  const AIcon = av.icon;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -16 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.1, type: "spring", stiffness: 90, damping: 18 }}
      className="group"
      style={{ borderBottom: `1px solid ${EMERALD}0c` }}
    >
      {/* Feature label */}
      <td className="p-5 md:p-6 align-middle">
        <div className="font-bold text-slate-800 text-sm leading-tight">{row.feature}</div>
        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{row.sub}</div>
      </td>

      {/* GE / Philips — red */}
      <td className="p-5 md:p-6 align-middle">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: gv.bg }}>
            <GIcon className="w-3 h-3" style={{ color: gv.color }} />
          </div>
          <span className="text-sm text-slate-400 font-medium">{row.ge}</span>
        </div>
      </td>

      {/* BPL — amber */}
      <td className="p-5 md:p-6 align-middle">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: bv.bg }}>
            <BIcon className="w-3 h-3" style={{ color: bv.color }} />
          </div>
          <span className="text-sm text-slate-400 font-medium">{row.bpl}</span>
        </div>
      </td>

      {/* ArogyaSync — emerald highlight */}
      <td className="p-5 md:p-6 align-middle">
        <motion.div
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: `${EMERALD}09`, border: `1px solid ${EMERALD}20` }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, delay: index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${EMERALD}18` }}>
            <AIcon className="w-3 h-3" style={{ color: EMERALD }} />
          </div>
          <span className="text-sm font-bold" style={{ color: EMERALD }}>{row.arogya}</span>
          {row.isWinner && (
            <motion.div
              className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold"
              style={{ background: `${EMERALD}12`, color: EMERALD }}
              initial={{ scale: 0 }} animate={active ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}>
              <Rocket className="w-2.5 h-2.5" />
              BEST
            </motion.div>
          )}
        </motion.div>
      </td>
    </motion.tr>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD GRAPHICS
// ─────────────────────────────────────────────────────────────────────────────

/** Card 1: 88% savings — animated bar drop */
const SavingsGraphic: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="80" height="52" viewBox="0 0 80 52">
    {[{ x:6, h:44, c:ROSE }, { x:24, h:30, c:AMBER }, { x:42, h:8, c:EMERALD }].map((b,i) => (
      <g key={i}>
        <rect x={b.x} y={8} width="14" height={44} rx="3"
          fill={`${b.c}10`} stroke={`${b.c}20`} strokeWidth="1" />
        <motion.rect x={b.x} y={52-b.h} width="14" height={0} rx="3"
          fill={b.c} style={{ filter:`drop-shadow(0 2px 4px ${b.c}40)` }}
          animate={active ? { height: b.h, y: 52-b.h } : { height: 0, y: 52 }}
          transition={{ delay: 0.2 + i*0.15, duration: 0.7, ease: "easeOut" }}
        />
      </g>
    ))}
    {/* -88% badge */}
    <motion.g initial={{ opacity:0, scale:0 }} animate={active ? { opacity:1, scale:1 } : {}}
      transition={{ delay:0.9, type:"spring" }} style={{ transformOrigin:"67px 14px" }}>
      <rect x="58" y="6" width="20" height="14" rx="4"
        fill={`${EMERALD}12`} stroke={`${EMERALD}30`} strokeWidth="1" />
      <text x="68" y="16" textAnchor="middle" fill={EMERALD} fontSize="7" fontFamily="monospace" fontWeight="bold">-88%</text>
    </motion.g>
  </svg>
);

/** Card 2: Zero downtime — clock with no interruption */
const ZeroDowntimeGraphic: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="80" height="52" viewBox="0 0 80 52">
    <circle cx="28" cy="26" r="20" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
    {Array.from({length:12},(_,i)=>{
      const a=(i/12)*Math.PI*2-Math.PI/2;
      return <line key={i} x1={28+14*Math.cos(a)} y1={26+14*Math.sin(a)}
        x2={28+18*Math.cos(a)} y2={26+18*Math.sin(a)}
        stroke="rgba(255,255,255,0.3)" strokeWidth={i%3===0?"1.2":"0.8"} />;
    })}
    <motion.line x1="28" y1="26" x2="28" y2="14"
      stroke="white" strokeWidth="2" strokeLinecap="round"
      animate={active ? { rotate:[0,360] } : {}}
      transition={{ duration:3, repeat:Infinity, ease:"linear" }}
      style={{ transformOrigin:"28px 26px" }} />
    <motion.line x1="28" y1="26" x2="38" y2="26"
      stroke="white" strokeWidth="1.5" strokeLinecap="round"
      animate={active ? { rotate:[0,360] } : {}}
      transition={{ duration:0.8, repeat:Infinity, ease:"linear" }}
      style={{ transformOrigin:"28px 26px" }} />
    <circle cx="28" cy="26" r="2" fill="white" />
    {/* LIVE badge */}
    <motion.g initial={{ opacity:0, x:8 }} animate={active ? { opacity:1, x:0 } : {}}
      transition={{ delay:0.6 }}>
      <rect x="52" y="16" width="26" height="20" rx="5"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="65" y="25" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" fontWeight="bold">99.9%</text>
      <text x="65" y="33" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">downtime</text>
    </motion.g>
  </svg>
);

/** Card 3: 100% Fit — grid of monitor shapes */
const FitGraphic: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="80" height="52" viewBox="0 0 80 52">
    {[[4,6],[24,6],[44,6],[4,28],[24,28],[44,28]].map(([x,y],i) => (
      <motion.g key={i} initial={{ opacity:0, scale:0 }}
        animate={active ? { opacity:1, scale:1 } : {}}
        transition={{ delay:0.1+i*0.08, type:"spring", stiffness:250 }}
        style={{ transformOrigin:`${x+8}px ${y+8}px` }}>
        <rect x={x} y={y} width="16" height="12" rx="2"
          fill={`${INDIGO}12`} stroke={`${INDIGO}35`} strokeWidth="1" />
        <motion.circle cx={x+8} cy={y+6} r="2"
          fill={INDIGO} style={{ filter:`drop-shadow(0 0 3px ${INDIGO}66)` }}
          animate={{ scale:[1,1.4,1], opacity:[0.7,1,0.7] }}
          transition={{ duration:1.5, delay:i*0.15, repeat:Infinity }} />
      </motion.g>
    ))}
    <motion.g initial={{ opacity:0, scale:0 }}
      animate={active ? { opacity:1, scale:1 } : {}}
      transition={{ delay:0.8, type:"spring" }}
      style={{ transformOrigin:"67px 26px" }}>
      <rect x="58" y="16" width="18" height="18" rx="5"
        fill={`${INDIGO}12`} stroke={`${INDIGO}40`} strokeWidth="1.2" />
      <text x="67" y="29" textAnchor="middle" fill={INDIGO} fontSize="12" fontWeight="bold">✓</text>
    </motion.g>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM STAT CARDS
// ─────────────────────────────────────────────────────────────────────────────
const StatCard: React.FC<{
  icon: React.ElementType;
  value: string;
  label: string;
  sub: string;
  color: string;
  bg: string;
  Graphic: React.FC<{ active: boolean }>;
  active: boolean;
  delay: number;
}> = ({ icon: Icon, value, label, sub, color, bg, Graphic, active, delay }) => (
  <motion.div
    className="relative rounded-[28px] overflow-hidden flex flex-col p-6"
    style={{ background: bg, border: `1.5px solid ${color}25`,
      boxShadow: `0 8px 32px ${color}12` }}
    initial={{ opacity:0, y:20 }}
    animate={active ? { opacity:1, y:0 } : {}}
    transition={{ delay, type:"spring", stiffness:80, damping:18 }}
    whileHover={{ scale: 1.02, y: -3 }}
  >
    {/* top accent */}
    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px]"
      style={{ background:`linear-gradient(90deg, ${color}, ${color}55, transparent)` }} />

    {/* graphic zone */}
    <div className="relative mb-4 flex items-center justify-between">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background:`${color}12`, border:`1.5px solid ${color}22` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-shrink-0">
        <Graphic active={active} />
      </div>
    </div>

    <div className="text-3xl font-bold font-mono mb-1 leading-none"
      style={{ color }}>
      {value}
    </div>
    <div className="text-sm font-bold text-slate-700 mb-1">{label}</div>
    <div className="text-xs text-slate-400 font-medium leading-snug">{sub}</div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// COLUMN HEADER
// ─────────────────────────────────────────────────────────────────────────────
const ColHeader: React.FC<{
  label: string; sub?: string; highlight?: boolean; color?: string;
}> = ({ label, sub, highlight, color }) => (
  <th className="p-5 md:p-6 text-left align-bottom">
    <div className={`text-xs font-bold uppercase tracking-widest leading-tight ${highlight ? "" : "text-slate-400"}`}
      style={highlight ? { color } : {}}>
      {label}
    </div>
    {sub && <div className="text-[9px] font-medium text-slate-300 mt-0.5">{sub}</div>}
    {highlight && (
      <motion.div className="mt-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold w-fit"
        style={{ background:`${color}12`, color, border:`1px solid ${color}25` }}
        animate={{ scale:[1,1.05,1] }} transition={{ duration:2, repeat:Infinity }}>
        <Rocket className="w-2.5 h-2.5" /> Recommended
      </motion.div>
    )}
  </th>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function ROIComparisonTable() {
  const ref   = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-18 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="cmpdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cmpdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:500, height:500, background:`${EMERALD}05`, top:"-8%", right:"-5%" }}
          animate={{ scale:[1,1.08,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
            initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            Economics
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-[1.1]"
            initial={{ opacity:0, y:16 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.1 }}>
            Unbeatable ROI for{" "}
            <span style={{
              backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>Your Hospital.</span>
          </motion.h2>
          <motion.p className="text-slate-500 text-lg"
            initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.15 }}>
            Modernize your facility at 15% of the cost of traditional replacements.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto rounded-[32px] mb-12"
          style={{ border:`1.5px solid ${EMERALD}14`,
            boxShadow:`0 8px 40px ${EMERALD}08, 0 2px 12px rgba(0,0,0,0.04)` }}
          initial={{ opacity:0, y:20 }} animate={active ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.2, duration:0.6 }}>
          <table className="w-full text-left border-collapse bg-white rounded-[32px] overflow-hidden">
            <thead>
              <tr style={{ background:"linear-gradient(135deg, #f8fffe, #f0fdf8)" }}>
                <th className="p-5 md:p-6 text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Metric</span>
                </th>
                <ColHeader label="GE / Philips" sub="Traditional hardware" />
                <ColHeader label="Standard BPL" sub="Budget upgrade" />
                <ColHeader label="ArogyaSync" sub="Retrofit solution"
                  highlight color={EMERALD} />
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <TableRow key={i} row={row} index={i} active={active} />
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={TrendingDown} value="88%" label="Cost Savings"
            sub="Versus traditional equipment replacement."
            color={EMERALD} bg="#f0fdf8"
            Graphic={SavingsGraphic} active={active} delay={0.4}
          />
          <StatCard
            icon={Clock} value="Zero" label="Downtime"
            sub="Retrofit in minutes during active clinical shifts."
            color={SKY} bg={`${SKY}08`}
            Graphic={ZeroDowntimeGraphic} active={active} delay={0.5}
          />
          <StatCard
            icon={Rocket} value="100%" label="Universal Fit"
            sub="Compatible with any monitor brand, any age."
            color={INDIGO} bg={`${INDIGO}06`}
            Graphic={FitGraphic} active={active} delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}