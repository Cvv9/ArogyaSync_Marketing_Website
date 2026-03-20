"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Activity, Mail, Globe, MapPin, Linkedin, Twitter, Github, CheckCircle, AlertCircle, Wifi } from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#10b981";
const SKY     = "#38bdf8";
const INDIGO  = "#818cf8";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED ECG LOGO MARK
// ─────────────────────────────────────────────────────────────────────────────
const LogoECG = () => (
  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
    style={{ background: `${EMERALD}18`, border: `1.5px solid ${EMERALD}35` }}>
    <Activity className="w-5 h-5 relative z-10" style={{ color: EMERALD }} />
    <motion.div className="absolute inset-0 -skew-x-12"
      style={{ background: `linear-gradient(90deg, transparent, ${EMERALD}15, transparent)` }}
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED STATUS INDICATOR
// ─────────────────────────────────────────────────────────────────────────────
type StatusRowProps = {
  label: string;
  status?: string;
};

const StatusRow = ({ label, status = "operational" }: StatusRowProps) => (
  <div
    className="flex items-center justify-between py-2.5"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
  >
    <span className="text-sm font-medium text-white/60">{label}</span>

    <div className="flex items-center gap-1.5">
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ background: EMERALD }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <span
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{ color: EMERALD }}
      >
        {status}
      </span>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LIVE UPTIME BAR
// ─────────────────────────────────────────────────────────────────────────────
const UptimeBar = () => {
  const ref = useRef(null);
  const active = useInView(ref, { once: true });
  // 30 segments, all green except one amber
  const segments = Array.from({ length: 30 }, (_, i) => i === 11 ? "warn" : "ok");
  return (
    <div ref={ref} className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Uptime — 30 days</span>
        <span className="text-[9px] font-bold" style={{ color: EMERALD }}>99.9%</span>
      </div>
      <div className="flex gap-0.5">
        {segments.map((s, i) => (
          <motion.div key={i}
            className="flex-1 rounded-sm"
            style={{ height: 14,
              background: s === "warn" ? "#d97706" : EMERALD,
              opacity: s === "warn" ? 0.7 : 0.85 }}
            initial={{ scaleY: 0 }}
            animate={active ? { scaleY: 1 } : {}}
            transition={{ delay: i * 0.025, duration: 0.3, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SUBTLE DOT GRID BACKGROUND (dark variant)
// ─────────────────────────────────────────────────────────────────────────────
const DotGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
    <defs>
      <pattern id="footerdots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.9" fill="rgba(16,185,129,0.15)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#footerdots)" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const explore = [
  { label: "Home",                 href: "/"        },
  { label: "Product & Technology", href: "/product" },
  { label: "Ecosystem View",       href: "/gallery" },
  { label: "ROI & Impact",         href: "/roi"     },
  { label: "About Us",             href: "/about"   },
  { label: "Pricing",              href: "/contact" },
];

const contact = [
  { icon: Mail,   text: "cs@arogyasync.com"                     },
  { icon: Globe,  text: "arogyasync.com"                         },
  { icon: MapPin, text: "IIT Patna Incubation Center, Bihar"     },
];

// CR6-162: Replace placeholder "#" links with actual social media URLs
const social = [
  { Icon: Linkedin, href: "https://linkedin.com/company/arogyasync" },
  { Icon: Twitter,  href: "https://twitter.com/arogyasync" },
  { Icon: Github,   href: "https://github.com/arogyasync" },
];

const statusItems = [
  { label: "Cloud Dashboard" },
  { label: "IoT Edge Sync"   },
  { label: "OCR Pipeline"    },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function Footer() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer ref={ref} className="relative overflow-hidden pt-20 pb-10"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0a1020 100%)",
        borderTop: `1px solid rgba(16,185,129,0.15)`,
      }}>
      <DotGrid />

      {/* Top emerald glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${EMERALD}0c, transparent 70%)` }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* ── BRAND ── */}
          <motion.div className="space-y-5"
            initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 18 }}>
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
             <motion.img
                  src="/images/Gemini_Generated_Image_t3awcgt3awcgt3aw-removebg-preview.png"
                  alt="ArogyaSync"
                  className="h-8 w-auto object-contain transition-all duration-300"
                //   style={{ filter: scrolled ? "none" : "none" }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Building the future of affordable, connected healthcare infrastructure for the next billion patients.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {social.map(({ Icon, href }, i) => (
                <motion.a key={i} href={href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  whileHover={{ scale: 1.1, background: `${EMERALD}20`, borderColor: `${EMERALD}40`, color: EMERALD }}
                  whileTap={{ scale: 0.95 }}>
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            {/* IIT badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
              style={{ background: `${EMERALD}08`, border: `1px solid ${EMERALD}18` }}>
              <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: EMERALD }}
                animate={{ scale: [1,1.5,1], opacity:[0.6,1,0.6] }}
                transition={{ duration:1.8, repeat:Infinity }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: EMERALD }}>
                IIT Patna Incubated
              </span>
            </div>
          </motion.div>

          {/* ── EXPLORE ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 18 }}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-3">
              {explore.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-sm text-white/45 font-medium flex items-center gap-2 group transition-colors duration-200 hover:text-white w-fit"
                    style={{}}>
                    <span className="w-0 h-px transition-all duration-200 group-hover:w-3"
                      style={{ background: EMERALD }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── CONTACT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 18 }}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {contact.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${EMERALD}10`, border: `1px solid ${EMERALD}20` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                  </div>
                  <span className="text-sm text-white/45 font-medium leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── SYSTEM STATUS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 18 }}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">System Status</h4>
            <div className="rounded-2xl overflow-hidden p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {statusItems.map(s => <StatusRow key={s.label} label={s.label} />)}
              <div className="pt-1" />
              <UptimeBar />
            </div>
            {/* Network live badge */}
            {/* <motion.div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
              style={{ background: `${SKY}08`, border: `1px solid ${SKY}18` }}
              animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:2.5, repeat:Infinity }}>
              <Wifi className="w-3.5 h-3.5" style={{ color: SKY }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: SKY }}>
                1,240 patients live
              </span>
            </motion.div> */}
          </motion.div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}>
          <p className="text-xs text-white/25 font-medium">
            © 2026 ArogyaSync. Patent Pending Technology. Made with precision in Patna.
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-white/25 uppercase tracking-widest">
            {["Privacy Policy", "Terms", "HIPAA"].map(t => (
              <a key={t} href="#"
                className="transition-colors duration-200 hover:text-white"
                style={{}}>
                {t}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}