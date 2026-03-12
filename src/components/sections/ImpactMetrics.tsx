"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, Target, Zap, Users, BadgeDollarSign, Clock } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";
const ROSE    = "#e11d48";
const TEAL    = "#0d9488";

// ─────────────────────────────────────────────────────────────────────────────
// MICRO GRAPHICS  (one per card)
// ─────────────────────────────────────────────────────────────────────────────

/** Savings: stacked coin bars growing upward */
type GraphicProps = {
  active: boolean;
};
const SavingsGraphic = ({ active }:GraphicProps) => (
  <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible">
    {[
      { x:4,  h:18, color:EMERALD },
      { x:18, h:26, color:EMERALD },
      { x:32, h:34, color:EMERALD },
      { x:46, h:42, color:EMERALD },
      { x:60, h:48, color:EMERALD },
    ].map((b,i) => (
      <g key={i}>
        <rect x={b.x} y={48-b.h} width="10" height={b.h} rx="2"
          fill={`${b.color}12`} stroke={`${b.color}25`} strokeWidth="1" />
        <motion.rect x={b.x} y={48} width="10" height={0} rx="2"
          fill={b.color} style={{ filter:`drop-shadow(0 0 3px ${b.color}44)` }}
          animate={active ? { y: 48 - b.h, height: b.h } : { y: 48, height: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeOut" }}
        />
      </g>
    ))}
    {/* trend arrow */}
    <motion.path d="M4,44 L14,36 L28,32 L42,22 L56,14 L70,6"
      fill="none" stroke={EMERALD} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"
      initial={{ pathLength:0 }} animate={active ? { pathLength:1 } : { pathLength:0 }}
      transition={{ delay:0.8, duration:0.7 }} />
    <motion.circle cx="70" cy="6" r="3" fill={EMERALD}
      initial={{ scale:0 }} animate={active ? { scale:1 } : { scale:0 }}
      transition={{ delay:1.5, type:"spring" }} />
  </svg>
);

/** Accuracy: circular gauge arc */
const AccuracyGraphic = ({ active }:GraphicProps) => {
  const r = 22, cx = 40, cy = 28;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible">
      {/* track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${SKY}18`} strokeWidth="4" />
      {/* animated arc */}
      <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={SKY} strokeWidth="4"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ}
        style={{ rotate: -90, transformOrigin: `${cx}px ${cy}px`,
          filter:`drop-shadow(0 0 4px ${SKY}66)` }}
        animate={active ? { strokeDashoffset: circ * (1 - 0.998) } : { strokeDashoffset: circ }}
        transition={{ delay:0.3, duration:1.4, ease:"easeOut" }}
      />
      {/* tick marks */}
      {Array.from({length:8},(_,i)=>{
        const a = (i/8)*Math.PI*2 - Math.PI/2;
        return <line key={i}
          x1={cx + (r-5)*Math.cos(a)} y1={cy + (r-5)*Math.sin(a)}
          x2={cx + (r-2)*Math.cos(a)} y2={cy + (r-2)*Math.sin(a)}
          stroke={`${SKY}30`} strokeWidth="1" />;
      })}
      <motion.text x={cx} y={cy+4} textAnchor="middle" fill={SKY}
        fontSize="8" fontFamily="monospace" fontWeight="bold"
        initial={{ opacity:0 }} animate={active ? { opacity:1 } : { opacity:0 }}
        transition={{ delay:1 }}>
        95%
      </motion.text>
    </svg>
  );
};

/** Latency: horizontal fast pulse */
const LatencyGraphic = ({ active }:GraphicProps) => (
  <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible">
    {/* baseline */}
    <line x1="4" y1="30" x2="76" y2="30" stroke={`${AMBER}20`} strokeWidth="1" />
    {/* ECG-style fast pulse */}
    <motion.polyline
      points="4,30 16,30 20,18 24,42 28,30 52,30 56,22 60,38 64,30 76,30"
      fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round"
      style={{ filter:`drop-shadow(0 0 4px ${AMBER}88)` }}
      initial={{ pathLength:0 }} animate={active ? { pathLength:1 } : { pathLength:0 }}
      transition={{ delay:0.3, duration:0.8 }}
    />
    {/* speed dots */}
    {[0,1,2].map(i => (
      <motion.circle key={i} r="2.5" cy="30" fill={AMBER}
        style={{ filter:`drop-shadow(0 0 3px ${AMBER}88)` }}
        initial={{ cx:4, opacity:0 }}
        animate={active ? { cx:[4,76], opacity:[0,1,1,0] } : { cx:4, opacity:0 }}
        transition={{ delay:1+i*0.3, duration:0.9, repeat:Infinity, repeatDelay:0.8 }}
      />
    ))}
    {/* <500ms label */}
    <motion.text x="40" y="14" textAnchor="middle" fill={AMBER}
      fontSize="7" fontFamily="monospace" fontWeight="bold"
      initial={{ opacity:0 }} animate={active ? { opacity:1 } : { opacity:0 }}
      transition={{ delay:1.0 }}>
      &lt;500ms
    </motion.text>
  </svg>
);

/** Lives: growing person cluster */
const LivesGraphic = ({ active }:GraphicProps) => {
  const positions = [
    {x:8,y:30},{x:22,y:30},{x:36,y:30},{x:50,y:30},{x:64,y:30},
    {x:15,y:16},{x:29,y:16},{x:43,y:16},{x:57,y:16},
    {x:22,y:4},{x:36,y:4},{x:50,y:4},
  ];
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible">
      {positions.map((p,i) => (
        <motion.g key={i}
          initial={{ opacity:0, scale:0 }} animate={active ? { opacity:1, scale:1 } : { opacity:0, scale:0 }}
          transition={{ delay:0.1+i*0.06, type:"spring", stiffness:200 }}
          style={{ transformOrigin:`${p.x}px ${p.y}px` }}>
          <circle cx={p.x} cy={p.y-3} r="3.5" fill={`${ROSE}15`} stroke={`${ROSE}35`} strokeWidth="0.8" />
          <line x1={p.x} y1={p.y+0.5} x2={p.x} y2={p.y+8} stroke={`${ROSE}35`} strokeWidth="1" />
        </motion.g>
      ))}
      {/* heart pulse */}
      <motion.path d="M68,36 Q70,32 72,36 Q74,40 68,44 Q62,40 64,36 Q66,32 68,36Z"
        fill={`${ROSE}20`} stroke={ROSE} strokeWidth="1"
        animate={active ? { scale:[1,1.3,1] } : {}}
        transition={{ duration:0.8, repeat:Infinity, delay:1.2 }}
        style={{ transformOrigin:"68px 38px" }} />
    </svg>
  );
};

/** Cost reduction: before/after bar comparison */
const CostGraphic = ({ active }:GraphicProps) => (
  <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible">
    {/* Before bar */}
    <rect x="8" y="8" width="14" height="36" rx="3" fill={`${ROSE}10`} stroke={`${ROSE}25`} strokeWidth="1" />
    <motion.rect x="8" y="8" width="14" height="0" rx="3" fill={`${ROSE}50`}
      animate={active ? { height:36, y:8 } : { height:0, y:44 }}
      transition={{ delay:0.2, duration:0.7, ease:"easeOut" }} />
    <text x="15" y="52" textAnchor="middle" fill={`${ROSE}70`} fontSize="5.5" fontFamily="monospace">OLD</text>
    {/* After bar */}
    <rect x="30" y="8" width="14" height="36" rx="3" fill={`${TEAL}10`} stroke={`${TEAL}25`} strokeWidth="1" />
    <motion.rect x="30" y={44-36*0.15} width="14" height={0} rx="3" fill={TEAL}
      style={{ filter:`drop-shadow(0 0 3px ${TEAL}44)` }}
      animate={active ? { height:36*0.15, y:44-36*0.15 } : { height:0, y:44 }}
      transition={{ delay:0.5, duration:0.7, ease:"easeOut" }} />
    <text x="37" y="52" textAnchor="middle" fill={`${TEAL}70`} fontSize="5.5" fontFamily="monospace">NEW</text>
    {/* Arrow */}
    <motion.path d="M24,24 L30,24" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round"
      markerEnd="url(#arr)"
      initial={{ pathLength:0 }} animate={active ? { pathLength:1 } : { pathLength:0 }}
      transition={{ delay:0.9, duration:0.3 }} />
    {/* -85% badge */}
    <motion.g initial={{ opacity:0, scale:0 }} animate={active ? { opacity:1, scale:1 } : { opacity:0, scale:0 }}
      transition={{ delay:1.1, type:"spring" }} style={{ transformOrigin:"58px 24px" }}>
      <rect x="48" y="16" width="26" height="14" rx="4"
        fill={`${TEAL}12`} stroke={`${TEAL}35`} strokeWidth="1" />
      <text x="61" y="26" textAnchor="middle" fill={TEAL} fontSize="8" fontFamily="monospace" fontWeight="bold">-85%</text>
    </motion.g>
  </svg>
);

/** Staff: clock with hours freed */
const StaffGraphic = ({ active }:GraphicProps) => (
  <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible">
    {/* Clock face */}
    <circle cx="28" cy="26" r="20" fill={`${INDIGO}06`} stroke={`${INDIGO}25`} strokeWidth="1.2" />
    {/* Hour ticks */}
    {Array.from({length:12},(_,i)=>{
      const a = (i/12)*Math.PI*2 - Math.PI/2;
      return <line key={i}
        x1={28+(i%3===0?14:16)*Math.cos(a)} y1={26+(i%3===0?14:16)*Math.sin(a)}
        x2={28+18*Math.cos(a)} y2={26+18*Math.sin(a)}
        stroke={`${INDIGO}${i%3===0?"45":"25"}`} strokeWidth={i%3===0?"1.2":"0.8"} />;
    })}
    {/* Hour hand */}
    <motion.line x1="28" y1="26" x2="28" y2="14" stroke={INDIGO} strokeWidth="2" strokeLinecap="round"
      animate={active ? { rotate:[0,360] } : {}}
      transition={{ duration:4, repeat:Infinity, ease:"linear" }}
      style={{ transformOrigin:"28px 26px" }} />
    {/* Minute hand */}
    <motion.line x1="28" y1="26" x2="38" y2="26" stroke={INDIGO} strokeWidth="1.5" strokeLinecap="round"
      animate={active ? { rotate:[0,360] } : {}}
      transition={{ duration:1.2, repeat:Infinity, ease:"linear" }}
      style={{ transformOrigin:"28px 26px" }} />
    <circle cx="28" cy="26" r="2" fill={INDIGO} />
    {/* Freed hours badge */}
    <motion.g initial={{ opacity:0, x:8 }} animate={active ? { opacity:1, x:0 } : { opacity:0, x:8 }}
      transition={{ delay:0.8 }}>
      <rect x="54" y="12" width="24" height="26" rx="6"
        fill={`${INDIGO}0e`} stroke={`${INDIGO}28`} strokeWidth="1" />
      <text x="66" y="24" textAnchor="middle" fill={INDIGO} fontSize="11" fontFamily="monospace" fontWeight="bold">4h</text>
      <text x="66" y="34" textAnchor="middle" fill={`${INDIGO}60`} fontSize="5.5" fontFamily="monospace">freed</text>
    </motion.g>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const metrics = [
  {
    icon: BadgeDollarSign,
    label: "5-Year Savings",
    value: 28.5, prefix: "₹", suffix: "L",
    sub: "per 10 beds",
    color: EMERALD,
    Graphic: SavingsGraphic,
    barWidth: 100,
  },
  {
    icon: Target,
    label: "Accuracy",
    value: 95, suffix: "%",
    sub: "Clinical grade",
    color: SKY,
    Graphic: AccuracyGraphic,
    barWidth: 99.8,
  },
  {
    icon: Zap,
    label: "Data Latency",
    value: 500, prefix: "<", suffix: "ms",
    sub: "Real-time sync",
    color: AMBER,
    Graphic: LatencyGraphic,
    barWidth: 92,
  },
  {
    icon: Users,
    label: "Potentially Impacting",
    value: 250, suffix: "K+",
    sub: "Projected 2027-8",
    color: ROSE,
    Graphic: LivesGraphic,
    barWidth: 85,
  },
  {
    icon: TrendingDown,
    label: "Cost Reduction",
    value: 85, suffix: "%",
    sub: "vs Replacement",
    color: TEAL,
    Graphic: CostGraphic,
    barWidth: 85,
  },
  {
    icon: Clock,
    label: "Staff Efficiency",
    value: 4, suffix: "hrs",
    sub: "Daily saving",
    color: INDIGO,
    Graphic: StaffGraphic,
    barWidth: 75,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COUNTER HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useCounter(target:number, active:boolean, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
}

// ─────────────────────────────────────────────────────────────────────────────
// METRIC CARD — fully light
// ─────────────────────────────────────────────────────────────────────────────
type Metric = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  sub: string;
  color: string;
  Graphic: React.ComponentType<{ active: boolean }>;
  barWidth: number;
};

type MetricCardProps = {
  metric: Metric;
  index: number;
};
const MetricCard = ({ metric, index }:MetricCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);
  const decimals = metric.value % 1 !== 0 ? 1 : 0;
  const count = useCounter(metric.value, isInView, decimals);
  const c = metric.color;
  const Graphic = metric.Graphic;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 80, damping: 18 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{
        background: "#ffffff",
        border: `1.5px solid ${hov ? c + "35" : c + "14"}`,
        boxShadow: hov
          ? `0 12px 40px ${c}10, 0 2px 8px rgba(0,0,0,0.04)`
          : `0 2px 14px ${c}07, 0 1px 3px rgba(0,0,0,0.03)`,
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }} />

      {/* Graphic zone */}
      <div className="relative px-6 pt-5 pb-2 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${c}0c` }}>
        {/* background tint + dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-100" aria-hidden>
          <defs>
            <pattern id={`mg-${index}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill={`${c}14`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#mg-${index})`} />
        </svg>
        {/* faint radial */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 80% 50%, ${c}07, transparent 70%)` }} />

        {/* Icon */}
        <motion.div className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${c}0e`, border: `1.5px solid ${c}20` }}
          animate={hov ? { scale: 1.08, rotate: -5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}>
          <metric.icon className="w-5 h-5" style={{ color: c }} />
        </motion.div>

        {/* Graphic */}
        <div className="relative z-10 flex-shrink-0">
          <Graphic active={isInView} />
        </div>
      </div>

      {/* Text content */}
      <div className="px-6 py-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
          {metric.label}
        </span>
        <div className="flex items-baseline gap-1 mb-1">
          {metric.prefix && (
            <span className="text-xl font-display font-bold" style={{ color: c + "80" }}>
              {metric.prefix}
            </span>
          )}
          <motion.span
            className="text-5xl font-mono font-extrabold tracking-tighter"
            style={{ color: c }}
            animate={hov ? { scale: 1.03 } : { scale: 1 }}
            transition={{ duration: 0.2 }}>
            {count}
          </motion.span>
          <span className="text-2xl font-display font-bold" style={{ color: c }}>
            {metric.suffix}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-400">{metric.sub}</p>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 rounded-full overflow-hidden" style={{ background: `${c}10` }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${c}, ${c}88)` }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: `${metric.barWidth}%` } : { width: "0%" }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.05, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER decorative pulse
// ─────────────────────────────────────────────────────────────────────────────
const HeaderPulse = () => (
  <div className="relative flex items-center justify-center mx-auto mb-8" style={{ width:64, height:64 }}>
    {[0,1,2].map(i => (
      <motion.div key={i} className="absolute rounded-full"
        style={{ width:64, height:64, border:`1px solid ${EMERALD}${["35","22","12"][i]}` }}
        animate={{ scale:[1, 1.9+i*0.3], opacity:[0.6,0] }}
        transition={{ duration:2.2, delay:i*0.6, repeat:Infinity, ease:"easeOut" }} />
    ))}
    <div className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
      style={{ background:`${EMERALD}10`, border:`1.5px solid ${EMERALD}30` }}>
      <TrendingDown className="w-5 h-5" style={{ color:EMERALD }} />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function ImpactMetrics() {
  return (
    <section id="impact" className="py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="impactdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.12)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#impactdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:500, height:500, background:"rgba(5,150,105,0.05)", top:"-10%", right:"-5%" }}
          animate={{ scale:[1,1.1,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:400, height:400, background:"rgba(99,102,241,0.04)", bottom:"-8%", left:"-4%" }}
          animate={{ scale:[1,1.15,1], opacity:[0.4,0.8,0.4] }}
          transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <HeaderPulse />
          <motion.span
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }} viewport={{ once:true }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            Proven Results
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 leading-[1.1]"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.1 }} viewport={{ once:true }}>
            Quantifying the{" "}
            <span style={{
              backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>ArogyaSync</span>{" "}
            advantage.
          </motion.h2>
          <motion.p className="text-slate-500 text-lg leading-relaxed"
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }} viewport={{ once:true }}>
            Real numbers from real deployments — measured impact across every dimension of care.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} metric={metric} index={idx} />
          ))}
        </div>

        {/* Bottom callout strip */}
        {/* <motion.div
          className="mt-12 rounded-2xl px-8 py-6 flex flex-wrap items-center justify-between gap-4"
          style={{ background:"#f0fdf8", border:`1px solid ${EMERALD}18`,
            boxShadow:`0 2px 12px ${EMERALD}06` }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          transition={{ delay:0.4, duration:0.6 }} viewport={{ once:true }}>
          <div>
            <p className="text-sm font-bold text-slate-700">
              Trusted by early adopters across{" "}
              <span style={{ color:EMERALD }}>12 hospitals</span> — and growing.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              IIT Patna incubated · Equity-free grant recipient · HIPAA-aligned architecture
            </p>
          </div>
          <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer"
            style={{ background:`${EMERALD}10`, border:`1.5px solid ${EMERALD}30`, color:EMERALD }}
            whileHover={{ scale:1.04, background:`${EMERALD}18` }}
            whileTap={{ scale:0.97 }}>
            <motion.span className="w-2 h-2 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.5,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.4, repeat:Infinity }} />
            View Full Impact Report
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}