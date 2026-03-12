"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Activity, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const EMERALD = "#059669";

const navLinks = [
  { name: "Product & Tech", href: "/product" },
  { name: "Ecosystem View", href: "/gallery"  },
  { name: "ROI & Impact",   href: "/roi"      },
  { name: "About Us",       href: "/about"    },
  { name: "Pricing",        href: "/contact"  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOGO MARK — image logo with live badge
// ─────────────────────────────────────────────────────────────────────────────
type LogoMarkProps = {
  scrolled: boolean;
};

const LogoMark = ({ scrolled }:LogoMarkProps) => (
  <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
    {/* Image logo */}
    <motion.img
      src="/images/Gemini_Generated_Image_t3awcgt3awcgt3aw-removebg-preview.png"
      alt="ArogyaSync"
      className="h-8 w-auto object-contain transition-all duration-300"
      style={{ filter: scrolled ? "none" : "none" }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />

    {/* Live dot */}
    <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{ background: `${EMERALD}0e`, border: `1px solid ${EMERALD}20` }}>
      <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: EMERALD }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity }} />
      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: EMERALD }}>
        Live
      </span>
    </div>
  </Link>
);

// ─────────────────────────────────────────────────────────────────────────────
// NAV LINK
// ─────────────────────────────────────────────────────────────────────────────
type NavLinkProps = {
  link: {
    name: string;
    href: string;
  };
  scrolled: boolean;
};
const NavLink = ({ link, scrolled }:NavLinkProps) => {
  const [hov, setHov] = useState(false);
  return (
    <Link href={link.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative text-sm font-semibold transition-colors duration-200 py-1"
      style={{ color: hov ? "#0f172a" : scrolled ? "#475569" : "#334155" }}>
      {link.name}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${EMERALD}, ${EMERALD}88)` }}
        animate={{ width: hov ? "100%" : "0%" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </Link>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE MENU LINK
// ─────────────────────────────────────────────────────────────────────────────
type MobileNavLinkProps = {
  link: {
    name: string;
    href: string;
  };
  onClick: () => void;
  index: number;
};
const MobileNavLink = ({ link, onClick, index }:MobileNavLinkProps) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.06, type: "spring", stiffness: 200, damping: 22 }}>
    <Link href={link.href} onClick={onClick}
      className="flex items-center justify-between py-3 px-1 group"
      style={{ borderBottom: "1px solid rgba(5,150,105,0.08)" }}>
      <span className="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
        {link.name}
      </span>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald transition-all group-hover:translate-x-1 duration-200"
        style={{ color: undefined }} />
    </Link>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/85 backdrop-blur-md border-b border-slate-100 py-3 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between gap-6">

        {/* Logo */}
        <LogoMark scrolled={scrolled} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <NavLink key={link.name} link={link} scrolled={scrolled} />
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
            Log In
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
  <Link
    href="mailto:cs@arogyasync.com"
    className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl text-white group transition-all duration-200"
    style={{
      background: `linear-gradient(135deg, ${EMERALD}, #10b981)`,
      boxShadow: `0 4px 14px ${EMERALD}30`,
    }}
  >
    Schedule Demo
    <motion.span
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <ArrowRight className="w-4 h-4" />
    </motion.span>
  </Link>
</motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0"
          style={{ background: isOpen ? `${EMERALD}10` : "transparent",
            border: `1.5px solid ${isOpen ? EMERALD + "30" : "transparent"}` }}
          onClick={() => setIsOpen(o => !o)}
          whileTap={{ scale: 0.9 }}>
          <AnimatePresence mode="wait" initial={false}>
            {isOpen
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" style={{ color: EMERALD }} />
                </motion.div>
              : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5 text-slate-700" />
                </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${EMERALD}, #10b981aa)` }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 md:hidden shadow-xl"
            style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
              borderBottom: `1px solid ${EMERALD}12` }}>
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col">
                {navLinks.map((link, i) => (
                  <MobileNavLink key={link.name} link={link} index={i} onClick={() => setIsOpen(false)} />
                ))}
              </div>
              <div className="pt-4 pb-2 flex flex-col gap-3">
                <Link href="/login"
                  className="text-center py-3 rounded-xl text-sm font-semibold text-slate-600 transition-colors"
                  style={{ background: "rgba(5,150,105,0.04)", border: `1px solid ${EMERALD}15` }}>
                  Log In
                </Link>
                <Link href="mailto:cs@arogyasync.com"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${EMERALD}, #10b981)`,
                    boxShadow: `0 4px 14px ${EMERALD}30` }}>
                  Schedule Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}