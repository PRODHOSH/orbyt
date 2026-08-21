"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const customEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: customEase,
    },
  }),
};

export default function Hero() {
  const { t } = useLanguage();

  const STATS = [
    { value: "100%", label: "Verified Data" },
    { value: "24/7", label: "AI Campus Agent" },
    { value: "1", label: "Unified OS" },
  ];

  return (
    <div className="relative z-0 min-h-[100dvh] lg:h-[100dvh] w-full flex flex-col justify-between font-semibold uppercase text-black selection:bg-[#273E57] selection:text-white overflow-hidden">
      
      {/* Background Video & Subtle Mesh Gradient */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover blur-[14px] scale-110 opacity-35"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/95" />
      </div>

      {/* Main Center Content (fits neatly inside 1 viewport) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-24 pb-4 w-full max-w-5xl mx-auto">
        
        {/* Top Eyebrow Pill */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-[#273E57]/20 bg-white/80 backdrop-blur-md shadow-sm text-[10px] sm:text-xs tracking-widest text-[#273E57] mb-4 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("hero.textA")}</span>
        </motion.div>

        {/* Clean 2-Line Headline */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.02] tracking-tight text-center text-slate-900 font-extrabold mb-3">
            <span>YOUR ENTIRE CAMPUS,</span><br />
            <span className="text-[#273E57]">FINALLY IN ONE PLACE.</span>
          </h1>
        </motion.div>

        {/* Crisp Supporting Copy */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-2xl mx-auto text-slate-600 font-medium normal-case text-xs sm:text-sm md:text-base leading-relaxed mb-6 px-2"
        >
          From attendance and academic regulations to club recruitments, campus safety alerts, resumes, and deadlines &mdash; ORBYT brings it all into one intelligent agent.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto mb-6"
        >
          <Link
            href="/#about"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white bg-[#273E57] w-full sm:w-auto px-7 py-3.5 rounded-full group hover:bg-slate-900 transition-all duration-300 shadow-[0_8px_30px_rgba(39,62,87,0.25)] hover:shadow-[0_12px_40px_rgba(39,62,87,0.35)] hover:-translate-y-0.5 font-bold"
          >
            <span className="tracking-widest">{t("hero.applyNow")}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="/#features"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-800 bg-white/90 border border-black/10 w-full sm:w-auto px-7 py-3.5 rounded-full group hover:bg-slate-50 transition-all duration-300 font-bold tracking-widest hover:border-black/20 shadow-sm"
          >
            <Compass className="w-4 h-4 text-[#273E57]" />
            <span>{t("hero.secondaryCta")}</span>
          </Link>
        </motion.div>

        {/* Mini Pill */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-black/5 bg-slate-100/90 text-[9px] sm:text-[10px] tracking-widest text-slate-600 text-center font-bold"
        >
          {t("hero.textB")}
        </motion.div>

      </div>

      {/* Bottom Compact Stats Bar (Anchored cleanly at bottom of viewport) */}
      <motion.div
        custom={6}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full border-t border-black/5 bg-white/70 backdrop-blur-md py-3 px-4 sm:px-8"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-center sm:gap-16 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-none">{stat.value}</span>
              <span className="text-[9px] sm:text-[10px] tracking-wider text-slate-500 font-bold uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
