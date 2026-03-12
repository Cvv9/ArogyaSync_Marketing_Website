"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, TrendingUp, Clock, ArrowRight, Zap } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const ROSE    = "#e11d48";
const AMBER   = "#d97706";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER — smooth eased number transitions
// ─────────────────────────────────────────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 700) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current;
    const diff  = target - start;
    const t0    = performance.now();
    const frame = (now: number) => {
      const t    = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(start + diff * ease);
      if (t < 1) requestAnimationFrame(frame);
      else prev.current = target;
    };
    requestAnimationFrame(frame);
  }, [target, duration]);
  return display;
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVINGS BAR GRAPHIC — CSS div bars with scaleY (reliable in Framer Motion)
// SVG height/y attributes are NOT animatable by Framer Motion — using CSS
// transforms on divs is the correct approach.
// ─────────────────────────────────────────────────────────────────────────────
const SavingsBarGraphic: React.FC<{
  traditional: number;
  arogya: number;
  active: boolean;
}> = ({ traditional, arogya, active }) => {
  const saving   = 100 - Math.round((arogya / traditional) * 100);
  const aroRatio = arogya / traditional; // ~0.143

  return (
    <div className="w-full select-none" style={{ height: 200 }}>
      {/* bar area */}
      <div className="flex items-end justify-center gap-16 mb-4" style={{ height: 150 }}>

        {/* Traditional — full height, animates in once */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.span className="text-[9px] font-bold font-mono mb-1"
            style={{ color: ROSE }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.55 }}>
            ₹{(traditional / 10000000).toFixed(1)}Cr
          </motion.span>
          <div className="relative w-14 rounded-xl overflow-hidden"
            style={{ height: 130, background: `${ROSE}0a`, border: `1px solid ${ROSE}18` }}>
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-xl"
              style={{
                background: `linear-gradient(180deg, ${ROSE}cc, ${ROSE}55)`,
                boxShadow: `0 -2px 12px ${ROSE}30`,
              }}
              key={`trad-${active}`}
              initial={{ height: "0%" }}
              animate={{ height: active ? "100%" : "0%" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* ArogyaSync — height = aroRatio%, remounts on every change */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.span
            key={`aro-lbl-${Math.round(aroRatio * 1000)}`}
            className="text-[9px] font-bold font-mono mb-1"
            style={{ color: EMERALD }}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}>
            ₹{(arogya / 100000).toFixed(0)}L
          </motion.span>
          <div className="relative w-14 rounded-xl overflow-hidden"
            style={{ height: 130, background: `${EMERALD}0a`, border: `1px solid ${EMERALD}18` }}>
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-xl"
              style={{
                background: `linear-gradient(180deg, ${EMERALD}ee, ${EMERALD}66)`,
                boxShadow: `0 -2px 12px ${EMERALD}30`,
              }}
              key={`aro-${Math.round(aroRatio * 1000)}`}
              initial={{ height: "0%" }}
              animate={{ height: active ? `${aroRatio * 100}%` : "0%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>

      {/* labels + badge */}
      <div className="flex items-center justify-center gap-4">
        <span className="text-[8px] font-bold font-mono w-14 text-center"
          style={{ color: `${ROSE}80` }}>REPLACE</span>
        <motion.div
          key={`badge-${saving}`}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{ background: `${EMERALD}10`, border: `1px solid ${EMERALD}28`, color: EMERALD }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}>
          -{saving}% saved
        </motion.div>
        <span className="text-[8px] font-bold font-mono w-14 text-center"
          style={{ color: EMERALD }}>AROGYA</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SAVINGS RING
// key={percent} on the arc forces strokeDashoffset to re-animate from circ
// every time the percent value changes.
// ─────────────────────────────────────────────────────────────────────────────
const SavingsRing: React.FC<{ percent: number; active: boolean }> = ({ percent, active }) => {
  const r    = 36;
  const cx   = 44;
  const cy   = 44;
  const circ = 2 * Math.PI * r;
  const targetOffset = circ * (1 - percent / 100);

  return (
    <div className="relative flex items-center justify-center" style={{ width:88, height:88 }}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${EMERALD}12`} strokeWidth="6" />
        <motion.circle
          key={`arc-${percent}`}
          cx={cx} cy={cy} r={r}
          fill="none" stroke={EMERALD} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ}
          style={{ rotate:-90, transformOrigin:`${cx}px ${cy}px`,
            filter:`drop-shadow(0 0 4px ${EMERALD}60)` }}
          initial={{ strokeDashoffset: circ }}
          animate={active ? { strokeDashoffset: targetOffset } : { strokeDashoffset: circ }}
          transition={{ duration:0.65, ease:"easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-extrabold font-mono leading-none" style={{ color:EMERALD }}>
          {percent}%
        </div>
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">saved</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROI TIMELINE (static 6-month graphic)
// ─────────────────────────────────────────────────────────────────────────────
const ROITimelineGraphic: React.FC<{ active: boolean }> = ({ active }) => {
  const months = ["M1","M2","M3","M4","M5","M6"];
  return (
    <div className="w-full pt-2 pb-1">
      <div className="relative flex items-center">
        <div className="absolute left-0 right-0 h-0.5 rounded-full" style={{ background:`${EMERALD}15` }} />
        <motion.div className="absolute left-0 h-0.5 rounded-full"
          style={{ background:`linear-gradient(90deg, ${EMERALD}, ${SKY})` }}
          initial={{ width:"0%" }}
          animate={active ? { width:"100%" } : { width:"0%" }}
          transition={{ delay:0.3, duration:1.2, ease:"easeOut" }}
        />
        <div className="relative w-full flex justify-between">
          {months.map((m,i) => (
            <div key={m} className="flex flex-col items-center gap-1.5">
              <motion.div className="w-3 h-3 rounded-full border-2"
                style={{
                  background: i===5 ? EMERALD : "#ffffff",
                  borderColor: EMERALD,
                  boxShadow: i===5 ? `0 0 8px ${EMERALD}60` : "none",
                }}
                initial={{ scale:0 }}
                animate={active ? { scale:1 } : { scale:0 }}
                transition={{ delay:0.4+i*0.15, type:"spring", stiffness:300 }}
              />
              <span className="text-[8px] font-bold"
                style={{ color: i===5 ? EMERALD : "#94a3b8" }}>{m}</span>
            </div>
          ))}
        </div>
      </div>
      <motion.div className="flex items-center justify-end gap-1 mt-2"
        initial={{ opacity:0 }} animate={active ? { opacity:1 } : { opacity:0 }}
        transition={{ delay:1.4 }}>
        <Zap className="w-3 h-3" style={{ color:EMERALD }} />
        <span className="text-[9px] font-bold" style={{ color:EMERALD }}>Break-even at Month 6</span>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function ROICalculator() {
  const [beds, setBeds]             = useState<number>(20);
  const [monitorAge, setMonitorAge] = useState<string>("5-10 Years");
  const ref    = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once:true, margin:"-60px" });

  const results = useMemo(() => {
    const replacementCostPerBed = 1750000;
    const arogyaSyncCostPerBed  = 250000;
    const traditional = beds * replacementCostPerBed;
    const arogya      = beds * arogyaSyncCostPerBed;
    const savings     = traditional - arogya;
    const percent     = Math.round((savings / traditional) * 100);
    return { traditional, arogya, savings, percent };
  }, [beds]);

  const animSavings = useAnimatedNumber(results.savings);
  const animPercent = useAnimatedNumber(results.percent);

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="roidots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.11)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roidots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:600, height:600, background:`${EMERALD}05`, top:"-15%", right:"-8%" }}
          animate={{ scale:[1,1.08,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:400, height:400, background:`${INDIGO}04`, bottom:"-10%", left:"-6%" }}
          animate={{ scale:[1,1.12,1], opacity:[0.4,0.8,0.4] }}
          transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT ── */}
          <div ref={ref}>
            <motion.span
              className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
              initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5 }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
                animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
              ROI Calculator
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-[1.1]"
              initial={{ opacity:0, y:16 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.1 }}>
              See the impact on your{" "}
              <span style={{
                backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>balance sheet.</span>
            </motion.h2>

            <motion.p className="text-slate-500 text-lg leading-relaxed mb-10"
              initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.15 }}>
              Calculate how much your hospital can save by choosing our retrofit solution over traditional hardware replacement.
            </motion.p>

            {/* Slider */}
            <motion.div className="space-y-4 mb-8"
              initial={{ opacity:0, y:14 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.25 }}>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Number of Beds
                </label>
                <motion.span className="text-2xl font-mono font-bold tabular-nums"
                  style={{ color:EMERALD }}
                  key={beds}
                  initial={{ scale:1.3, opacity:0.6 }}
                  animate={{ scale:1, opacity:1 }}
                  transition={{ type:"spring", stiffness:300, damping:18 }}>
                  {beds}
                </motion.span>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-2 rounded-full -translate-y-1/2 overflow-hidden"
                  style={{ background:`${EMERALD}12` }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background:`linear-gradient(90deg, ${EMERALD}, ${SKY})` }}
                    animate={{ width:`${((beds-10)/190)*100}%` }}
                    transition={{ type:"spring", stiffness:200, damping:28 }}
                  />
                </div>
                <input type="range" min="10" max="200" step="10" value={beds}
                  onChange={e => setBeds(parseInt(e.target.value))}
                  className="relative w-full h-5 bg-transparent appearance-none cursor-pointer z-10"
                  style={{ accentColor:EMERALD }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                <span>10</span><span>50</span><span>100</span><span>150</span><span>200</span>
              </div>
            </motion.div>

            {/* Monitor age */}
            <motion.div className="space-y-3 mb-10"
              initial={{ opacity:0, y:14 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.35 }}>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                Current Monitor Age
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["<5 Years","5-10 Years","10+ Years"].map(opt => (
                  <motion.button key={opt} onClick={() => setMonitorAge(opt)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold"
                    style={{
                      background: monitorAge===opt ? EMERALD : "#ffffff",
                      border:`1.5px solid ${monitorAge===opt ? EMERALD : EMERALD+"18"}`,
                      color: monitorAge===opt ? "#ffffff" : "#64748b",
                      boxShadow: monitorAge===opt ? `0 4px 14px ${EMERALD}28` : "none",
                      transition:"all 0.2s",
                    }}
                    whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Bar graphic */}
            <motion.div className="rounded-2xl p-5 overflow-hidden"
              style={{ background:`${EMERALD}04`, border:`1px solid ${EMERALD}12` }}
              initial={{ opacity:0, y:14 }} animate={active ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.45 }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color:`${EMERALD}80` }}>
                Cost Comparison
              </p>
              <SavingsBarGraphic
                traditional={results.traditional}
                arogya={results.arogya}
                active={active}
              />
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <motion.div className="relative"
            initial={{ opacity:0, y:24 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.3, type:"spring", stiffness:80, damping:18 }}>

            <div className="absolute -inset-2 rounded-[44px] pointer-events-none"
              style={{ background:`radial-gradient(ellipse at 50% 30%, ${EMERALD}0a, transparent 70%)` }} />

            <div className="relative rounded-[36px] overflow-hidden"
              style={{ background:"#ffffff", border:`1.5px solid ${EMERALD}18`,
                boxShadow:`0 16px 56px ${EMERALD}0e, 0 4px 16px rgba(0,0,0,0.04)` }}>
              <div className="h-1" style={{ background:`linear-gradient(90deg, ${EMERALD}, ${SKY}, ${INDIGO})` }} />
              <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" aria-hidden>
                <defs>
                  <pattern id="rcardots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.7" fill={`${EMERALD}12`} />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rcardots)" />
              </svg>

              <div className="relative z-10 p-8 md:p-10 space-y-7">

                {/* Savings hero */}
                <div className="rounded-2xl p-5 flex items-center gap-4"
                  style={{ background:`${EMERALD}07`, border:`1.5px solid ${EMERALD}18` }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${EMERALD}12`, border:`1.5px solid ${EMERALD}25` }}>
                    <Calculator className="w-6 h-6" style={{ color:EMERALD }} />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Projected Total Savings
                    </span>
                    <span className="text-3xl font-mono font-black tabular-nums" style={{ color:EMERALD }}>
                      ₹ {(animSavings / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                </div>

                {/* Ring + timeline */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl p-4 flex flex-col items-center gap-2"
                    style={{ background:"#f8fffe", border:`1px solid ${EMERALD}14` }}>
                    {/* key on results.percent forces ring remount on every change */}
                    <SavingsRing
                      key={`ring-${results.percent}`}
                      percent={Math.round(animPercent)}
                      active={active}
                    />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Cost Reduction
                    </span>
                  </div>
                  <div className="rounded-2xl p-4 flex flex-col justify-between"
                    style={{ background:`${SKY}05`, border:`1px solid ${SKY}14` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background:`${SKY}10` }}>
                        <Clock className="w-3.5 h-3.5" style={{ color:SKY }} />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        ROI Timeline
                      </span>
                    </div>
                    <div className="text-2xl font-mono font-bold" style={{ color:SKY }}>6 Months</div>
                    <ROITimelineGraphic active={active} />
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 pt-2" style={{ borderTop:`1px solid ${EMERALD}10` }}>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Breakdown</p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:ROSE }} />
                      <span className="text-sm text-slate-500 font-medium truncate">Traditional Replacement</span>
                    </div>
                    <span className="text-sm font-mono text-slate-400 line-through flex-shrink-0">
                      ₹ {(results.traditional / 10000000).toFixed(2)} Cr
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2"
                    style={{ background:`${EMERALD}07`, border:`1px solid ${EMERALD}15` }}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:EMERALD }} />
                      <span className="text-sm text-slate-700 font-bold truncate">ArogyaSync Solution</span>
                    </div>
                    <motion.span className="text-sm font-mono font-bold flex-shrink-0"
                      style={{ color:EMERALD }}
                      key={results.arogya}
                      initial={{ scale:1.1, opacity:0.6 }}
                      animate={{ scale:1, opacity:1 }}
                      transition={{ type:"spring", stiffness:300 }}>
                      ₹ {(results.arogya / 100000).toFixed(1)} L
                    </motion.span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2"
                    style={{ background:`${AMBER}07`, border:`1px solid ${AMBER}15` }}>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color:AMBER }} />
                      <span className="text-xs font-bold text-slate-600">You Save</span>
                    </div>
                    <motion.span className="text-sm font-mono font-bold"
                      style={{ color:AMBER }}
                      key={results.savings}
                      initial={{ scale:1.1, opacity:0.6 }}
                      animate={{ scale:1, opacity:1 }}
                      transition={{ type:"spring", stiffness:300 }}>
                      ₹ {(results.savings / 10000000).toFixed(2)} Cr
                    </motion.span>
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white"
                  style={{ background:`linear-gradient(135deg, ${EMERALD}, #10b981)`,
                    boxShadow:`0 6px 20px ${EMERALD}30` }}
                  whileHover={{ scale:1.02, boxShadow:`0 8px 28px ${EMERALD}40` }}
                  whileTap={{ scale:0.98 }}>
                  Get Detailed Cost Audit
                  <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.4, repeat:Infinity }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}