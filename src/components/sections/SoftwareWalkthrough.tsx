"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Activity, Wifi, Shield, BarChart3, Bell, Users, Monitor, Smartphone, Globe } from "lucide-react";

const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";
const ROSE    = "#e11d48";

// ─── Patient data with individual vitals ─────────────────────────────────────
const PATIENTS = [
  { id:"Patient-01", name:"Raj Kumar",    status:"stable",   color:EMERALD,
    spo2:"98.4", hr:"72",  bp:"118/76", temp:"36.6",
    ecg:[14,14,14,3,25,14,14,14,8,20,14,14,14] },
  { id:"Patient-02", name:"Priya Nair",   status:"stable",   color:EMERALD,
    spo2:"97.8", hr:"68",  bp:"112/72", temp:"36.8",
    ecg:[14,14,14,5,23,14,14,14,9,19,14,14,14] },
  { id:"Patient-03", name:"Arjun Singh",  status:"watch",    color:AMBER,
    spo2:"95.1", hr:"88",  bp:"136/88", temp:"37.4",
    ecg:[14,14,11,2,26,14,14,13,7,21,14,14,14] },
  { id:"Patient-04", name:"Meena Pillai", status:"stable",   color:EMERALD,
    spo2:"99.0", hr:"65",  bp:"108/68", temp:"36.5",
    ecg:[14,14,14,4,24,14,14,14,10,18,14,14,14] },
  { id:"Patient-05", name:"Suresh Babu",  status:"critical", color:ROSE,
    spo2:"91.2", hr:"104", bp:"158/98", temp:"38.6",
    ecg:[14,14,9,1,27,15,13,14,6,22,14,14,14] },
  { id:"Patient-06", name:"Kavitha Rao",  status:"stable",   color:EMERALD,
    spo2:"98.1", hr:"70",  bp:"116/74", temp:"36.7",
    ecg:[14,14,14,4,24,14,14,14,9,19,14,14,14] },
];

// ─── Tiny per-patient ECG ─────────────────────────────────────────────────────
const TinyECG: React.FC<{ pts: number[]; color: string; active: boolean; delay: number }> = ({ pts, color, active, delay }) => {
  const W = 56, H = 14;
  const points = pts.map((y, i) => `${(i / (pts.length - 1)) * W},${y * (H / 28)}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
      <polyline points={points} fill="none" stroke={`${color}18`} strokeWidth="0.8" strokeLinecap="round" />
      <motion.polyline points={points} fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round"
        style={{ filter:`drop-shadow(0 0 2px ${color}55)` }}
        initial={{ pathLength:0 }} animate={active ? { pathLength:1 } : { pathLength:0 }}
        transition={{ delay, duration:0.7, ease:"easeOut" }}
      />
    </svg>
  );
};

// ─── Patient card with 2×2 vitals + ECG ──────────────────────────────────────
const PatientCard: React.FC<{ p: typeof PATIENTS[0]; index: number; active: boolean }> = ({ p, index, active }) => {
  const c = p.color;
  const isCritical = p.status === "critical";
  const isWatch    = p.status === "watch";
  return (
    <motion.div
      className="rounded-xl p-2 flex flex-col gap-1.5"
      style={{
        background: isCritical ? `${ROSE}07` : isWatch ? `${AMBER}05` : "rgba(255,255,255,0.93)",
        border: `1px solid ${c}${isCritical ? "38" : "1c"}`,
        boxShadow: isCritical ? `0 0 10px ${ROSE}18` : "none",
      }}
      initial={{ opacity:0, y:10 }}
      animate={active ? { opacity:1, y:0 } : {}}
      transition={{ delay:0.28 + index*0.07, type:"spring", stiffness:180 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:c }}
            animate={isCritical ? { scale:[1,1.8,1], opacity:[0.5,1,0.5] } : {}}
            transition={{ duration:0.7, repeat:Infinity }} />
          <span className="text-[7.5px] font-bold leading-none" style={{ color:c }}>{p.id}</span>
        </div>
        <span className="text-[5.5px] font-bold uppercase tracking-wide px-1 py-0.5 rounded"
          style={{ background:`${c}12`, color:c }}>{p.status}</span>
      </div>

      {/* Name */}
      <div className="text-[6.5px] font-semibold text-slate-400 truncate">{p.name}</div>

      {/* 2×2 vitals */}
      <div className="grid grid-cols-2 gap-1">
        {[
          { lbl:"SpO₂", val:p.spo2+"%",  col:SKY    },
          { lbl:"HR",   val:p.hr+" bpm", col:ROSE   },
          { lbl:"BP",   val:p.bp,         col:INDIGO },
          { lbl:"Temp", val:p.temp+"°",   col:AMBER  },
        ].map((v, vi) => (
          <motion.div key={vi} className="rounded px-1 py-0.5"
            style={{ background:`${v.col}08`, border:`1px solid ${v.col}15` }}
            initial={{ opacity:0, scale:0.8 }}
            animate={active ? { opacity:1, scale:1 } : {}}
            transition={{ delay:0.38 + index*0.07 + vi*0.04, type:"spring" }}>
            <div className="text-[5px] font-bold uppercase tracking-wide leading-none mb-0.5"
              style={{ color:`${v.col}80` }}>{v.lbl}</div>
            <div className="text-[7px] font-bold font-mono leading-none" style={{ color:v.col }}>{v.val}</div>
          </motion.div>
        ))}
      </div>

      {/* Inline ECG */}
      <div className="rounded px-1 pt-0.5 pb-1" style={{ background:`${c}06`, border:`1px solid ${c}12` }}>
        <div className="text-[5px] font-bold uppercase tracking-wide mb-0.5" style={{ color:`${c}55` }}>ECG</div>
        <TinyECG pts={p.ecg} color={c} active={active} delay={0.5 + index*0.09} />
      </div>
    </motion.div>
  );
};

// ─── Floating vital chip (outside frame) ─────────────────────────────────────
const VitalChip: React.FC<{
  label:string; value:string; color:string; x:string; y:string; delay:number; active:boolean;
}> = ({ label, value, color, x, y, delay, active }) => (
  <motion.div className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl"
    style={{ left:x, top:y, background:"rgba(255,255,255,0.96)",
      border:`1.5px solid ${color}25`, boxShadow:`0 4px 16px ${color}14, 0 1px 4px rgba(0,0,0,0.06)` }}
    initial={{ opacity:0, scale:0.7, y:12 }}
    animate={active ? { opacity:1, scale:1, y:0 } : {}}
    transition={{ delay, type:"spring", stiffness:180, damping:18 }}>
    <motion.div className="w-2 h-2 rounded-full" style={{ background:color }}
      animate={{ scale:[1,1.5,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.4, repeat:Infinity }} />
    <div>
      <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color:color+"99" }}>{label}</div>
      <div className="text-xs font-bold font-mono" style={{ color }}>{value}</div>
    </div>
  </motion.div>
);

// ─── Dashboard mock ───────────────────────────────────────────────────────────
const DashboardMock: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="absolute inset-0 flex overflow-hidden">
    {/* Sidebar */}
    <div className="w-11 flex-shrink-0 h-full flex flex-col items-center gap-3 pt-4 pb-3"
      style={{ background:"rgba(255,255,255,0.97)", borderRight:`1px solid ${EMERALD}10` }}>
      <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background:`${EMERALD}10` }}>
        <Activity className="w-3.5 h-3.5" style={{ color:EMERALD }} />
      </div>
      {[Monitor, Users, BarChart3, Bell, Shield].map((Icon, i) => (
        <motion.div key={i} className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background:i===0?`${EMERALD}10`:"transparent", border:i===0?`1px solid ${EMERALD}20`:"none" }}
          initial={{ opacity:0, x:-6 }} animate={active ? { opacity:1, x:0 } : {}}
          transition={{ delay:0.1+i*0.06, type:"spring" }}>
          <Icon className="w-3 h-3" style={{ color:i===0?EMERALD:"#94a3b8" }} />
        </motion.div>
      ))}
    </div>

    {/* Main — patient grid */}
    <div className="flex-1 flex flex-col gap-2 p-2.5 overflow-hidden"
      style={{ background:"linear-gradient(135deg, #f8fffe, #f0f9ff)" }}>

      {/* Topbar */}
      <motion.div className="flex items-center justify-between flex-shrink-0"
        initial={{ opacity:0, y:-6 }} animate={active ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }}>
        <div>
          <div className="text-[10px] font-bold text-slate-800">ICU Monitor · Ward 3</div>
          <div className="text-[7px] text-slate-400 font-medium">Apex Multispeciality · 6 active patients</div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7px] font-bold"
            style={{ background:`${EMERALD}10`, color:EMERALD, border:`1px solid ${EMERALD}20` }}
            animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:1.6, repeat:Infinity }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background:EMERALD }} />
            LIVE
          </motion.div>
          <motion.div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[7px] font-bold"
            style={{ background:`${ROSE}10`, color:ROSE, border:`1px solid ${ROSE}25` }}
            animate={{ scale:[1,1.06,1] }} transition={{ duration:1.2, repeat:Infinity }}>
            <Bell className="w-2 h-2" /> 1
          </motion.div>
        </div>
      </motion.div>

      {/* 2×3 patient cards grid */}
      <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
        {PATIENTS.map((p, i) => <PatientCard key={p.id} p={p} index={i} active={active} />)}
      </div>
    </div>

    {/* Right — mobile summary panel */}
    <div className="w-24 flex-shrink-0 flex flex-col gap-1.5 p-2"
      style={{ background:"rgba(255,255,255,0.97)", borderLeft:`1px solid ${SKY}10` }}>
      <div className="text-[6.5px] font-bold uppercase tracking-widest text-slate-400">Mobile</div>

      <div className="rounded-xl overflow-hidden" style={{ border:`1px solid ${SKY}18` }}>
        <div className="h-1" style={{ background:`linear-gradient(90deg, ${EMERALD}, ${SKY})` }} />
        <div className="p-1.5" style={{ background:"#f8fffe" }}>
          <div className="text-[6.5px] font-bold text-slate-500 mb-1">All Patients</div>
          {PATIENTS.map((p, i) => (
            <motion.div key={p.id} className="flex items-center justify-between py-0.5"
              style={{ borderBottom:i<PATIENTS.length-1?`1px solid ${p.color}08`:"none" }}
              initial={{ opacity:0, x:5 }} animate={active ? { opacity:1, x:0 } : {}}
              transition={{ delay:0.45+i*0.07 }}>
              <div className="flex items-center gap-0.5">
                <motion.div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:p.color }}
                  animate={p.status==="critical"?{ scale:[1,1.6,1] }:{}} transition={{ duration:0.7, repeat:Infinity }} />
                <span className="text-[6px] font-bold" style={{ color:p.color }}>{p.id}</span>
              </div>
              <div className="text-right">
                <div className="text-[6px] font-mono font-bold" style={{ color:p.color }}>{p.spo2}%</div>
                <div className="text-[5.5px] text-slate-300 font-mono">{p.hr}bpm</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="rounded-lg p-1.5"
        style={{ background:`${ROSE}08`, border:`1px solid ${ROSE}25` }}
        initial={{ opacity:0, scale:0.85 }} animate={active ? { opacity:1, scale:1 } : {}}
        transition={{ delay:1.0, type:"spring" }}>
        <div className="flex items-center gap-0.5 mb-0.5">
          <Bell className="w-2 h-2" style={{ color:ROSE }} />
          <span className="text-[6.5px] font-bold" style={{ color:ROSE }}>CRITICAL</span>
        </div>
        <div className="text-[6px] text-slate-600 font-semibold">P-05 · SpO₂ 91.2%</div>
        <div className="text-[5.5px] text-slate-400 mt-0.5">HR 104 · BP 158/98</div>
      </motion.div>

      <motion.div className="rounded-lg p-1.5 mt-auto"
        style={{ background:`${EMERALD}08`, border:`1px solid ${EMERALD}15` }}
        initial={{ opacity:0 }} animate={active ? { opacity:1 } : {}} transition={{ delay:1.2 }}>
        <div className="flex items-center gap-0.5">
          <Wifi className="w-2 h-2" style={{ color:EMERALD }} />
          <span className="text-[6.5px] font-bold" style={{ color:EMERALD }}>Synced</span>
        </div>
        <div className="text-[5.5px] text-slate-400 mt-0.5">99.9% uptime</div>
      </motion.div>
    </div>
  </div>
);

// ─── Platform tags ────────────────────────────────────────────────────────────
const platforms = [
  { icon: Monitor,    label: "Web Dashboard",  color: EMERALD },
  { icon: Smartphone, label: "Mobile App",     color: SKY     },
  { icon: Globe,      label: "Remote Access",  color: INDIGO  },
  { icon: Bell,       label: "Alert System",   color: ROSE    },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SoftwareWalkthrough() {
  const [playing, setPlaying] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="swdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#swdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:600, height:600, background:`${EMERALD}05`, top:"-15%", left:"50%", transform:"translateX(-50%)" }}
          animate={{ scale:[1,1.08,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
            initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            Platform Walkthrough
          </motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-[1.1]"
            initial={{ opacity:0, y:16 }} animate={active ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1 }}>
            Real-Time Validation{" "}
            <span style={{ backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              &amp; Connectivity.
            </span>
          </motion.h2>
          <motion.p className="text-slate-500 text-lg leading-relaxed"
            initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.15 }}>
            Watch how ArogyaSync translates visual data into actionable medical insights across mobile and web platforms.
          </motion.p>
          <motion.div className="flex flex-wrap items-center justify-center gap-3 mt-6"
            initial={{ opacity:0, y:8 }} animate={active ? { opacity:1, y:0 } : {}} transition={{ delay:0.3 }}>
            {platforms.map(({ icon: Icon, label, color }, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background:`${color}08`, border:`1px solid ${color}18`, color }}>
                <Icon className="w-3 h-3" />{label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Frame */}
        <motion.div className="relative max-w-5xl mx-auto"
          initial={{ opacity:0, y:36 }} animate={active ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.25, type:"spring", stiffness:70, damping:18 }}>

          <div className="absolute -inset-3 rounded-[44px] pointer-events-none"
            style={{ background:`radial-gradient(ellipse at 50% 0%, ${EMERALD}08, transparent 70%)` }} />

          <div className="relative aspect-video rounded-[36px] overflow-hidden"
            style={{ border:`1.5px solid ${EMERALD}18`, boxShadow:`0 24px 80px ${EMERALD}0e, 0 8px 32px rgba(0,0,0,0.06)` }}>

            <DashboardMock active={active} />

            <AnimatePresence>
              {!playing && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-20"
                  style={{ background:"rgba(255,255,255,0.52)", backdropFilter:"blur(3px)" }}
                  onClick={() => setPlaying(true)}
                  initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="absolute rounded-full"
                      style={{ width:80, height:80, border:`1px solid ${EMERALD}${["40","28","18"][i]}` }}
                      animate={{ scale:[1,1.8+i*0.4], opacity:[0.5,0] }}
                      transition={{ duration:2.2, delay:i*0.5, repeat:Infinity, ease:"easeOut" }} />
                  ))}
                  <motion.div className="relative w-16 h-16 rounded-full flex items-center justify-center z-10"
                    style={{ background:`linear-gradient(135deg, ${EMERALD}, #10b981)`, boxShadow:`0 8px 32px ${EMERALD}40` }}
                    whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}>
                    <Play className="w-7 h-7 fill-current ml-1" style={{ color:"#ffffff" }} />
                  </motion.div>
                  <motion.div className="mt-5 text-center"
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:EMERALD }}>Live Demo</p>
                    <p className="text-base font-bold text-slate-800">Platform Walkthrough Video</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">03:45</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating chips */}
          {/* <VitalChip label="SpO₂" value="98.4%" color={SKY}     x="-2%"  y="12%"  delay={0.9}  active={active} />
          <VitalChip label="HR"   value="72 bpm" color={ROSE}    x="-2%"  y="52%"  delay={1.1}  active={active} />
          <VitalChip label="Sync" value="Live ✓" color={EMERALD} x="96%" y="18%"  delay={1.3}  active={active} />
          <VitalChip label="Alert" value="P-05 ⚠" color={AMBER}  x="96%" y="56%"  delay={1.5}  active={active} /> */}
        </motion.div>

        {/* Bottom strip */}
        <motion.div className="mt-10 max-w-5xl mx-auto rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4"
          style={{ background:"#f0fdf8", border:`1px solid ${EMERALD}15`, boxShadow:`0 2px 12px ${EMERALD}06` }}
          initial={{ opacity:0, y:14 }} animate={active ? { opacity:1, y:0 } : {}} transition={{ delay:0.65, duration:0.5 }}>
          {[
            { label:"Per-patient vitals",    color:EMERALD },
            { label:"Instant alert system",  color:ROSE    },
            { label:"Web + Mobile access",   color:SKY     },
            { label:"AI anomaly detection",  color:INDIGO  },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background:b.color }} />
              <span className="text-xs font-semibold text-slate-500">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}