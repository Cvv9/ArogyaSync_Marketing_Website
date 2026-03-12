"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ScanEye, CloudLightning, ShieldCheck, BrainCircuit, ArrowUpRight } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";

// ─────────────────────────────────────────────────────────────────────────────
// GRAPHIC 1 — OCR scan line over monitor readout
// ─────────────────────────────────────────────────────────────────────────────
type Capability = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  detail: string;
  description: string;
  accentColor: string;
  graphic: React.ComponentType;
  metric: {
    value: string;
    label: string;
  };
};
const OCRGraphic = () => {
  const lines = [
    { label: "SpO₂", value: "98.4%", y: 28 },
    { label: "HR",   value: "76 bpm", y: 52 },
    { label: "BP",   value: "118/76", y: 76 },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative rounded-xl overflow-hidden"
        style={{ width: 140, height: 100,
          background: `${EMERALD}06`,
          border: `1px solid ${EMERALD}22` }}>
        <svg width="140" height="100" viewBox="0 0 140 100">
          {lines.map((l, i) => (
            <g key={i}>
              <motion.text x={12} y={l.y} fill={`${EMERALD}60`}
                fontSize="8" fontFamily="monospace" fontWeight="bold"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.2 }}>{l.label}</motion.text>
              <motion.text x={68} y={l.y} fill={EMERALD}
                fontSize="9" fontFamily="monospace" fontWeight="bold"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.2 }}>{l.value}</motion.text>
              <line x1="8" y1={l.y + 4} x2="132" y2={l.y + 4}
                stroke={`${EMERALD}10`} strokeWidth="0.5" />
            </g>
          ))}
        </svg>
        {/* Scan line */}
        <motion.div className="absolute left-0 right-0 pointer-events-none"
          style={{ height: 2,
            background: `linear-gradient(90deg, transparent, ${EMERALD}bb, transparent)`,
            boxShadow: `0 0 6px ${EMERALD}88` }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Corner brackets */}
        {[["0%","0%","0,0"],["100%","0%","-8,0"],["100%","100%","-8,-8"],["0%","100%","0,-8"]].map(([x,y,t],i)=>(
          <div key={i} className="absolute w-3 h-3 pointer-events-none"
           style={{
  left: x,
  top: y,
  transform: `translate(${t.split(",")[0]}px,${t.split(",")[1]}px)`,
  borderTop: `2px solid ${EMERALD}`,
  borderLeft: i === 0 || i === 3 ? `2px solid ${EMERALD}` : undefined,
  borderRight: i === 1 || i === 2 ? `2px solid ${EMERALD}` : undefined,
}} />
        ))}
      </div>
      <motion.div className="absolute top-1 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
        style={{ background: `${EMERALD}10`, border:`1px solid ${EMERALD}25`, color: EMERALD }}
        animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}>
        <span className="w-1 h-1 rounded-full inline-block" style={{ background: EMERALD }} />
        OCR ACTIVE
      </motion.div>
      <motion.div className="absolute bottom-1 left-2 text-[10px] font-bold tabular-nums"
        style={{ color: EMERALD }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        95.0% ✓
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GRAPHIC 2 — Cloud topology with travelling packets
// ─────────────────────────────────────────────────────────────────────────────
const CloudSyncGraphic = () => {
  const nodes = [
    { cx:70, cy:50, r:14, label:"HUB" },
    { cx:20, cy:20, r:7,  label:"A"   },
    { cx:120,cy:20, r:7,  label:"B"   },
    { cx:20, cy:80, r:7,  label:"C"   },
    { cx:120,cy:80, r:7,  label:"D"   },
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4]];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg width="140" height="100" viewBox="0 0 140 100">
        <defs>
          <radialGradient id="hubglow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={SKY} stopOpacity="0.18" />
            <stop offset="100%" stopColor={SKY} stopOpacity="0" />
          </radialGradient>
        </defs>
        {edges.map(([a,b],i) => (
          <g key={i}>
            <line x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
              stroke={`${SKY}30`} strokeWidth="1" strokeDasharray="3 3" />
            <motion.circle r="2.5" fill={SKY}
              style={{ filter:`drop-shadow(0 0 3px ${SKY}88)` }}
              initial={{ cx:nodes[a].cx, cy:nodes[a].cy, opacity:0 }}
              animate={{ cx:[nodes[a].cx,nodes[b].cx,nodes[a].cx], cy:[nodes[a].cy,nodes[b].cy,nodes[a].cy], opacity:[0,1,1,0] }}
              transition={{ duration:2, delay:i*0.5, repeat:Infinity, repeatDelay:0.5, ease:"easeInOut", times:[0,0.45,0.9,1] }}
            />
          </g>
        ))}
        {nodes.slice(1).map((n,i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={`${SKY}10`} stroke={`${SKY}35`} strokeWidth="1" />
            <motion.circle cx={n.cx} cy={n.cy} r={n.r} fill="none" stroke={SKY} strokeWidth="0.7"
              animate={{ r:[n.r,n.r+5], opacity:[0.5,0] }}
              transition={{ duration:2, delay:i*0.4, repeat:Infinity, ease:"easeOut" }} />
            <text x={n.cx} y={n.cy+3} textAnchor="middle" fill={SKY} fontSize="5" fontFamily="monospace" fontWeight="bold">{n.label}</text>
          </g>
        ))}
        <circle cx="70" cy="50" r="22" fill="url(#hubglow2)" />
        <circle cx="70" cy="50" r="14" fill={`${SKY}12`} stroke={`${SKY}40`} strokeWidth="1.5" />
        <motion.circle cx="70" cy="50" r="14" fill="none" stroke={SKY} strokeWidth="1"
          animate={{ r:[14,22], opacity:[0.5,0] }}
          transition={{ duration:1.8, repeat:Infinity, ease:"easeOut" }} />
        <text x="70" y="53" textAnchor="middle" fill={SKY} fontSize="7" fontFamily="monospace" fontWeight="bold">CLOUD</text>
      </svg>
      <motion.div className="absolute top-1 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
        style={{ background:`${SKY}10`, border:`1px solid ${SKY}28`, color:SKY }}
        animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:1.8, repeat:Infinity }}>
        ● LIVE SYNC
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GRAPHIC 3 — Blockchain hash chain
// ─────────────────────────────────────────────────────────────────────────────
const BlockchainGraphic = () => {
  const blocks = [
    { id:"#4F2A", hash:"a3f9…", x:8  },
    { id:"#4F2B", hash:"b81c…", x:52 },
    { id:"#4F2C", hash:"d02e…", x:96 },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg width="140" height="100" viewBox="0 0 140 100">
        {[0,1].map(i => (
          <g key={i}>
            <motion.line x1={blocks[i].x+36} y1={50} x2={blocks[i+1].x} y2={50}
              stroke={`${INDIGO}40`} strokeWidth="1.5" strokeDasharray="3 2"
              initial={{ pathLength:0 }} animate={{ pathLength:1 }}
              transition={{ delay:0.5+i*0.3, duration:0.6 }} />
            <motion.circle r="2" fill={INDIGO}
              style={{ filter:`drop-shadow(0 0 3px ${INDIGO}88)` }}
              initial={{ cx:blocks[i].x+36, cy:50, opacity:0 }}
              animate={{ cx:[blocks[i].x+36,blocks[i+1].x], cy:[50,50], opacity:[0,1,0] }}
              transition={{ duration:1.2, delay:1+i*0.6, repeat:Infinity, repeatDelay:1.5 }} />
          </g>
        ))}
        {blocks.map((b,i) => (
          <motion.g key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.2+i*0.15, type:"spring", stiffness:120, damping:16 }}>
            <rect x={b.x} y={30} width={36} height={40} rx="5"
              fill={`${INDIGO}08`} stroke={`${INDIGO}30`} strokeWidth="1" />
            <rect x={b.x+13} y={38} width={10} height={8} rx="1"
              fill="none" stroke={`${INDIGO}70`} strokeWidth="1" />
            <path d={`M ${b.x+16} 38 Q ${b.x+18} 34 ${b.x+20} 38`}
              fill="none" stroke={`${INDIGO}70`} strokeWidth="1" />
            <text x={b.x+18} y={57} textAnchor="middle" fill={`${INDIGO}55`} fontSize="4.5" fontFamily="monospace">{b.id}</text>
            <text x={b.x+18} y={64} textAnchor="middle" fill={`${INDIGO}40`} fontSize="4" fontFamily="monospace">{b.hash}</text>
            {i < 2 && (
              <motion.circle cx={b.x+30} cy={34} r="5"
                fill={`${INDIGO}12`} stroke={`${INDIGO}40`} strokeWidth="0.8"
                initial={{ scale:0 }} animate={{ scale:1 }}
                transition={{ delay:0.8+i*0.2, type:"spring" }} />
            )}
          </motion.g>
        ))}
        <motion.text x="70" y="88" textAnchor="middle" fill={`${INDIGO}45`}
          fontSize="6" fontFamily="monospace" letterSpacing="0.08em"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}>
          IMMUTABLE · TAMPER-PROOF
        </motion.text>
      </svg>
      <motion.div className="absolute top-1 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
        style={{ background:`${INDIGO}0e`, border:`1px solid ${INDIGO}28`, color:INDIGO }}
        animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:2.5, repeat:Infinity }}>
        ✓ VERIFIED
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GRAPHIC 4 — Neural net signal propagation
// ─────────────────────────────────────────────────────────────────────────────
const MLGraphic = () => {
  const layers = [
    [{x:18,y:25},{x:18,y:50},{x:18,y:75}],
    [{x:55,y:20},{x:55,y:40},{x:55,y:60},{x:55,y:80}],
    [{x:92,y:30},{x:92,y:55},{x:92,y:75}],
    [{x:125,y:50}],
  ];
  const colors = [AMBER, EMERALD, SKY, INDIGO];
  type Node = { x: number; y: number };
type Edge = [Node, Node, number];

const edges: Edge[] = [];
  for (let l=0;l<layers.length-1;l++)
    for (const a of layers[l]) for (const b of layers[l+1])
      edges.push([a,b,l]);
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg width="140" height="100" viewBox="0 0 140 100">
        {edges.map(([a,b,l],i) => (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={`${colors[l]}18`} strokeWidth="0.8" />
            <motion.circle r="1.8" fill={colors[l]}
              style={{ filter:`drop-shadow(0 0 2px ${colors[l]}88)` }}
              initial={{ cx:a.x, cy:a.y, opacity:0 }}
              animate={{ cx:[a.x,b.x], cy:[a.y,b.y], opacity:[0,0.9,0] }}
              transition={{ duration:1.0, delay:(i*0.07)%1.8, repeat:Infinity, repeatDelay:0.6, ease:"easeInOut" }}
            />
          </g>
        ))}
        {layers.map((layer,l) => layer.map((n,ni) => (
          <g key={`${l}-${ni}`}>
            <circle cx={n.x} cy={n.y} r="6" fill={`${colors[l]}12`} stroke={`${colors[l]}40`} strokeWidth="1" />
            <motion.circle cx={n.x} cy={n.y} r="6" fill="none" stroke={colors[l]} strokeWidth="0.7"
              animate={{ r:[6,10], opacity:[0.5,0] }}
              transition={{ duration:2, delay:l*0.4+ni*0.2, repeat:Infinity, ease:"easeOut" }} />
          </g>
        )))}
        <motion.text x="125" y="65" textAnchor="middle" fill={`${INDIGO}55`}
          fontSize="5" fontFamily="monospace"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}>
          ALERT
        </motion.text>
      </svg>
      <motion.div className="absolute top-1 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
        style={{ background:`${AMBER}0e`, border:`1px solid ${AMBER}30`, color:AMBER }}
        animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:2, repeat:Infinity }}>
        ⚡ PREDICTING
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const capabilities = [
  {
    icon: ScanEye,
    title: "Ai - Powered Data Logging",
    detail: "95% Accuracy Rate",
    description: "Our technology is universally adaptable to almost all brands and models of hospital multipara monitors.",
    accentColor: EMERALD,
    graphic: OCRGraphic,
    metric: { value: "95%", label: "OCR Accuracy" },
  },
  {
    icon: CloudLightning,
    title: "Secure Cloud Sync",
    detail: "Anywhere Access",
    description: "Continuous remote access to patient vitals via encrypted IoT uplink — live across every device, everywhere.",
    accentColor: SKY,
    graphic: CloudSyncGraphic,
    metric: { value: "99.9%", label: "Uptime SLA" },
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Security",
    detail: "Immutable Records",
    description: "Tamper-proof data records eliminate insurance fraud and billing errors with cryptographic certainty.",
    accentColor: INDIGO,
    graphic: BlockchainGraphic,
    metric: { value: "0", label: "Breach Events" },
  },
  {
    icon: BrainCircuit,
    title: "Predictive ML",
    detail: "Early Intervention",
    description: "Analyzes the health pattern and helps to make quick decision.",
    accentColor: AMBER,
    graphic: MLGraphic,
    metric: { value: "", label: "Avg Lead Time" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CARD — fully light
// ─────────────────────────────────────────────────────────────────────────────
type CapabilityCardProps = {
  item: Capability;
  index: number;
};
const CapabilityCard = ({ item, index }:CapabilityCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);
  const Graphic = item.graphic;
  const c = item.accentColor;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 80, damping: 18 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-[28px] overflow-hidden cursor-default flex flex-col"
      style={{
        background: "#ffffff",
        border: `1.5px solid ${hov ? c + "35" : c + "15"}`,
        boxShadow: hov
          ? `0 16px 48px ${c}12, 0 2px 8px rgba(0,0,0,0.04)`
          : `0 2px 16px ${c}08, 0 1px 4px rgba(0,0,0,0.03)`,
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Top accent bar */}
      <motion.div className="h-1 w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }}
        animate={hov ? { opacity: 1 } : { opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover glow blob */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[28px]">
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width: 200, height: 200, background: c + "09", top: "-20%", left: "-10%" }}
          animate={hov ? { scale: 1.5, opacity: 1 } : { scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Graphic zone */}
      <div className="relative h-[110px] w-full overflow-hidden"
        style={{ background: `${c}04`, borderBottom: `1px solid ${c}10` }}>
        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden>
          <defs>
            <pattern id={`lgrid-${index}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill={`${c}18`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#lgrid-${index})`} />
        </svg>
        {/* radial glow at bottom */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 110%, ${c}0a, transparent 65%)` }} />
        {inView && <Graphic />}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${c}0e`, border: `1.5px solid ${c}22` }}
            animate={hov ? { scale: 1.1, rotate: -6 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <item.icon className="w-5 h-5" style={{ color: c }} />
          </motion.div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: c + "90" }}>
              {item.detail}
            </div>
            <motion.div className="text-xl font-extrabold font-mono tabular-nums"
              style={{ color: c }}
              animate={hov ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}>
              {item.metric.value}
            </motion.div>
            <div className="text-[9px] text-slate-400 font-medium">{item.metric.label}</div>
          </div>
        </div>

        <h3 className="text-[15px] font-bold text-slate-800 mb-2 leading-tight">{item.title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm flex-1">{item.description}</p>

        <motion.div
          className="flex items-center gap-2 mt-5 pt-4 text-xs font-semibold"
          style={{ borderTop: `1px solid ${c}12`, color: c }}
          animate={hov ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}>
          <span>Learn more</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER — pulse ring cluster
// ─────────────────────────────────────────────────────────────────────────────
const HeaderGraphic = () => (
  <div className="relative flex items-center justify-center mx-auto mb-10" style={{ width: 80, height: 80 }}>
    {[0,1,2].map(i => (
      <motion.div key={i} className="absolute rounded-full"
        style={{ width: 80, height: 80, border: `1px solid ${EMERALD}${["35","22","12"][i]}` }}
        animate={{ scale:[1, 1.8+i*0.3], opacity:[0.6, 0] }}
        transition={{ duration: 2.2, delay: i*0.55, repeat: Infinity, ease: "easeOut" }}
      />
    ))}
    <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
      style={{ background: `${EMERALD}10`, border:`1.5px solid ${EMERALD}30` }}>
      <BrainCircuit className="w-6 h-6" style={{ color: EMERALD }} />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function KeyCapabilitiesGrid() {
  return (
    <section className="relative py-14 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="capgrid2" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.12)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#capgrid2)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:500, height:500, background:"rgba(5,150,105,0.05)", top:"-10%", left:"-5%" }}
          animate={{ scale:[1,1.1,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:400, height:400, background:"rgba(99,102,241,0.04)", bottom:"-5%", right:"-5%" }}
          animate={{ scale:[1,1.15,1], opacity:[0.4,0.8,0.4] }}
          transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <HeaderGraphic />
          <motion.span
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color: EMERALD }}
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }} viewport={{ once:true }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            Core Technology
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 leading-[1.1]"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.1 }} viewport={{ once:true }}>
            Powerful Features,{" "}
            <span style={{
              backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"
            }}>Plug-and-Play</span>{" "}
            Simplicity.
          </motion.h2>
          <motion.p
            className="text-slate-500 text-lg leading-relaxed"
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }} viewport={{ once:true }}>
            Everything you need to modernize your critical care units — instantly.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((item, i) => (
            <CapabilityCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Stats bar — light */}
        <motion.div
          className="mt-12 rounded-2xl px-8 py-5 flex flex-wrap items-center justify-between gap-6"
          style={{ background:"#f8fffe", border:"1px solid rgba(5,150,105,0.14)",
            boxShadow:"0 2px 12px rgba(5,150,105,0.06)" }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          transition={{ delay:0.4, duration:0.6 }} viewport={{ once:true }}>
          {[
            // { label: "Hospitals Onboarded",  value: "12+",   color: EMERALD },
            // { label: "Monitors Retrofitted",  value: "340+",  color: SKY    },
            { label: "Vitals Captured Daily", value: "86K+",  color: INDIGO },
            { label: "Avg Setup Time",        value: "< 30Min",  color: AMBER  },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div className="text-2xl font-extrabold font-mono tabular-nums"
                style={{ color: s.color }}
                initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
                transition={{ delay:0.5+i*0.1 }} viewport={{ once:true }}>
                {s.value}
              </motion.div>
              <div className="text-[11px] font-semibold text-slate-500 max-w-[80px] leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}