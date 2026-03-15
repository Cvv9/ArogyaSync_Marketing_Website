"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Linkedin, Mail, Cpu, Activity, Star, Award, Users } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";
const SKY     = "#0ea5e9";
const INDIGO  = "#6366f1";
const AMBER   = "#d97706";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Leader {
  name:    string;
  role:    string;
  bio:     string;
  image:   string;
  color:   string;
  icon:    React.ElementType;
  tags:    string[];
}

interface Advisor {
  name:  string;
  role:  string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const leadership: Leader[] = [
  {
    name:  "Dr. Arjun Chandan",
    role:  "CEO & Co-founder",
    bio:   "Visionary leader focused on Product Strategy and clinical partnerships. Driving the mission of affordable healthcare for the next billion patients.",
    image: "/images/arjun.png",
    color: EMERALD,
    icon:  Activity,
    tags:  ["Product Strategy", "Clinical Partnerships", "Healthcare Policy"],
  },
  {
    name:  "Varun Cumbamangalam",
    role:  "CTO & Co-founder",
    bio:   "Expert in Hardware & Edge AI Architecture. Leading the development of our high-precision OCR and IoT ecosystem from silicon to cloud.",
    image: "/images/varun.png",
    color: SKY,
    icon:  Cpu,
    tags:  ["Edge AI", "IoT Architecture", "OCR Systems"],
  },
];

const advisors: Advisor[] = [
  { name: "Mr. Senthil Kumar Balasubramanian", role: "Founder and Managing Director, Renovation Systems" },
  { name: "Dr. Shazina Saeed",                 role: "Senior Academician and Researcher"                },
  { name: "Malaiswamy Kanna",                  role: "Software Architect at Scanian"                    },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED ROLE GRAPHIC — small SVG per leader
// ─────────────────────────────────────────────────────────────────────────────
const CEOGraphic: React.FC<{ active: boolean; color: string }> = ({ active, color }) => (
  <svg width="72" height="52" viewBox="0 0 72 52">
    {/* Strategy nodes */}
    {[{x:10,y:26},{x:36,y:10},{x:62,y:26},{x:36,y:42}].map((n,i) => (
      <g key={i}>
        <line x1={n.x} y1={n.y} x2={36} y2={26}
          stroke={`${color}20`} strokeWidth="1" strokeDasharray="3 2" />
        <motion.circle cx={n.x} cy={n.y} r="5"
          fill={`${color}12`} stroke={`${color}40`} strokeWidth="1"
          initial={{ scale:0 }} animate={active ? { scale:1 } : {}}
          transition={{ delay:0.2+i*0.1, type:"spring", stiffness:200 }} />
        <motion.circle cx={n.x} cy={n.y} r="5"
          fill="none" stroke={color}
          animate={active ? { r:[5,9], opacity:[0.4,0] } : {}}
          transition={{ duration:2, delay:i*0.4, repeat:Infinity, ease:"easeOut" }} />
      </g>
    ))}
    {/* Center */}
    <circle cx="36" cy="26" r="10" fill={`${color}12`} stroke={`${color}35`} strokeWidth="1.2" />
    <motion.circle cx="36" cy="26" r="10" fill="none" stroke={color}
      animate={active ? { r:[10,16], opacity:[0.5,0] } : {}}
      transition={{ duration:2, repeat:Infinity, ease:"easeOut" }} />
    <text x="36" y="30" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">CEO</text>
  </svg>
);

const CTOGraphic: React.FC<{ active: boolean; color: string }> = ({ active, color }) => {
  const layers = [[{x:10,y:26},{x:20,y:16},{x:20,y:36}],[{x:38,y:20},{x:38,y:32}],[{x:58,y:26}]];
  const edges: [number,number,number,number][] = [
    [10,26,38,20],[10,26,38,32],[20,16,38,20],[20,36,38,32],[38,20,58,26],[38,32,58,26]
  ];
  return (
    <svg width="72" height="52" viewBox="0 0 72 52">
      {edges.map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${color}20`} strokeWidth="0.8"
          initial={{ pathLength:0 }} animate={active ? { pathLength:1 } : {}}
          transition={{ delay:0.2+i*0.08, duration:0.4 }} />
      ))}
      {layers.flat().map((n,i) => (
        <motion.g key={i}
          initial={{ scale:0 }} animate={active ? { scale:1 } : {}}
          transition={{ delay:0.1+i*0.08, type:"spring", stiffness:250 }}
          style={{ transformOrigin:`${n.x}px ${n.y}px` }}>
          <circle cx={n.x} cy={n.y} r="5" fill={`${color}12`} stroke={`${color}40`} strokeWidth="1" />
          <motion.circle cx={n.x} cy={n.y} r="2" fill={color}
            animate={{ scale:[1,1.4,1], opacity:[0.7,1,0.7] }}
            transition={{ duration:1.6, delay:i*0.2, repeat:Infinity }} />
        </motion.g>
      ))}
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INITIALS AVATAR
// ─────────────────────────────────────────────────────────────────────────────
const InitialsAvatar: React.FC<{ name: string; color: string; size?: number }> = ({ name, color, size = 120 }) => {
  const initials = name.trim().split(/\s+/).filter(Boolean).map(n => n[0]).slice(0, 2).join("");
  return (
    <div className="relative flex-shrink-0 rounded-[24px] overflow-hidden flex items-center justify-center"
      style={{ width: size, height: size,
        background: `linear-gradient(135deg, ${color}10, ${color}1a)`,
        border: `2px solid ${color}28` }}>
      {/* subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
        <defs>
          <pattern id={`avdots-${color}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill={`${color}25`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#avdots-${color})`} />
      </svg>
      {/* pulse ring */}
      <motion.div className="absolute rounded-[24px] inset-0"
        style={{ border: `1px solid ${color}30` }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <span className="relative z-10 text-3xl font-bold font-display"
        style={{ color }}>{initials}</span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LEADER CARD
// ─────────────────────────────────────────────────────────────────────────────
const LeaderCard: React.FC<{ member: Leader; index: number; active: boolean }> = ({ member, index, active }) => {
  const c = member.color;
  const Icon = member.icon;
  const Graphic = index === 0 ? CEOGraphic : CTOGraphic;

  return (
    <motion.div
      className="relative rounded-[32px] overflow-hidden flex flex-col md:flex-row gap-6 p-6 md:p-8"
      style={{ background: "#ffffff", border: `1.5px solid ${c}18`,
        boxShadow: `0 8px 40px ${c}0a, 0 2px 10px rgba(0,0,0,0.04)` }}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 80, damping: 18 }}
      whileHover={{ y: -4, boxShadow: `0 16px 56px ${c}12, 0 4px 16px rgba(0,0,0,0.06)` }}
    >
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[32px]"
        style={{ background: `linear-gradient(90deg, ${c}, ${c}55, transparent)` }} />
      {/* dot grid bg */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" aria-hidden>
        <defs>
          <pattern id={`ldots-${index}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill={`${c}10`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ldots-${index})`} />
      </svg>

      {/* Photo / avatar */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-3">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role} at ArogyaSync`}
          width={120}
          height={120}
          className="object-cover rounded-[24px]"
        />
        {/* Social links */}
        <div className="flex gap-2">
          {[Linkedin, Mail].map((SIcon, si) => (
            <motion.a key={si} href="#"
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: `${c}0e`, border: `1px solid ${c}20` }}
              whileHover={{ scale: 1.12, background: c }}
              whileTap={{ scale: 0.95 }}>
              {React.createElement(SIcon, { className: "w-3.5 h-3.5", style: { color: c } })}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Name + graphic row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="text-xl font-display font-bold text-slate-900 leading-tight">{member.name}</h4>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background:`${c}10` }}>
                  <Icon className="w-3 h-3" style={{ color: c }} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: c }}>{member.role}</p>
              </div>
            </div>
            <div className="flex-shrink-0 hidden sm:block">
              <Graphic active={active} color={c} />
            </div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-4">{member.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {member.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                style={{ background:`${c}0c`, border:`1px solid ${c}18`, color: c }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ADVISOR CARD
// ─────────────────────────────────────────────────────────────────────────────
const AdvisorCard: React.FC<{ advisor: Advisor; index: number; active: boolean }> = ({ advisor, index, active }) => {
  const colors = [EMERALD, INDIGO, AMBER];
  const c = colors[index % colors.length];
  const initials = advisor.name.trim().split(/\s+/).filter(Boolean).map(n => n[0]).slice(0, 2).join("");

  return (
    <motion.div
      className="relative rounded-[24px] overflow-hidden p-5 flex items-start gap-4"
      style={{ background: "#ffffff", border: `1.5px solid ${c}14`,
        boxShadow: `0 2px 12px ${c}07` }}
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 90, damping: 18 }}
      whileHover={{ y: -3, boxShadow: `0 8px 28px ${c}10`, borderColor: `${c}28` }}
    >
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[24px]"
        style={{ background: `linear-gradient(90deg, ${c}, ${c}44, transparent)` }} />

      {/* Avatar */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
        style={{ background:`${c}0e`, border:`1px solid ${c}20`, color: c }}>
        {initials}
      </div>

      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-800 leading-snug mb-0.5">{advisor.name}</h4>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-snug">{advisor.role}</p>
      </div>

      {/* Star badge */}
      <motion.div className="ml-auto flex-shrink-0"
        animate={{ rotate:[0,10,0,-10,0] }}
        transition={{ duration:3, delay:index*0.5, repeat:Infinity, ease:"easeInOut" }}>
        <Star className="w-3.5 h-3.5" style={{ color: `${c}60` }} />
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function TeamSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" className="opacity-40">
          <defs>
            <pattern id="teamdots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(5,150,105,0.10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#teamdots)" />
        </svg>
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:500, height:500, background:`${EMERALD}05`, top:"-10%", left:"-5%" }}
          animate={{ scale:[1,1.08,1], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div className="absolute rounded-full blur-3xl"
          style={{ width:400, height:400, background:`${INDIGO}04`, bottom:"-8%", right:"-4%" }}
          animate={{ scale:[1,1.12,1], opacity:[0.4,0.8,0.4] }}
          transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:2 }} />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>

        {/* ── LEADERSHIP ── */}
        <div className="mb-8">
          <motion.span
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background:`${EMERALD}0c`, border:`1px solid ${EMERALD}20`, color:EMERALD }}
            initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:EMERALD }}
              animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.5, repeat:Infinity }} />
            Leadership
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-10 leading-[1.1]"
            initial={{ opacity:0, y:16 }} animate={active ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.1 }}>
            Meet the{" "}
            <span style={{
              backgroundImage:`linear-gradient(135deg, ${EMERALD}, ${SKY})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>Visionaries.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((member, i) => (
              <LeaderCard key={i} member={member} index={i} active={active} />
            ))}
          </div>
        </div>

        {/* ── ADVISORY BOARD ── */}
        <div className="pt-16" style={{ borderTop:`1px solid ${EMERALD}0c` }}>
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <motion.span
                className="inline-flex items-center gap-2 py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
                style={{ background:`${INDIGO}0c`, border:`1px solid ${INDIGO}20`, color:INDIGO }}
                initial={{ opacity:0, y:10 }} animate={active ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay:0.3 }}>
                <Award className="w-3 h-3" />
                Advisory Board
              </motion.span>
              <motion.h3
                className="text-2xl font-display font-bold text-slate-900"
                initial={{ opacity:0, y:12 }} animate={active ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay:0.35 }}>
                Guided by industry experts.
              </motion.h3>
            </div>
            {/* Advisor count badge */}
            <motion.div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
              style={{ background:`${INDIGO}07`, border:`1px solid ${INDIGO}14` }}
              initial={{ opacity:0, scale:0.8 }} animate={active ? { opacity:1, scale:1 } : {}}
              transition={{ delay:0.4, type:"spring" }}>
              <Users className="w-4 h-4" style={{ color:INDIGO }} />
              <span className="text-sm font-bold" style={{ color:INDIGO }}>{advisors.length} Advisors</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisors.map((advisor, i) => (
              <AdvisorCard key={i} advisor={advisor} index={i} active={active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}