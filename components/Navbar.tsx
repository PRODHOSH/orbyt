"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, X, Globe, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const NAV_LINKS = [
  { key: "nav.about", href: "/#about" },
  { key: "nav.workflow", href: "/#process" },
  { key: "nav.modules", href: "/#elite-perks" },
  { key: "nav.faq", href: "/#faq" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsTop(latest < 50);
  });

  // Hide entirely on dashboard and onboarding routes
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin") || pathname?.startsWith("/onboarding")) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)", backdropFilter: "blur(0px)" }}
        animate={{ 
          backgroundColor: isTop ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: isTop ? "blur(0px)" : "blur(16px)",
          borderBottomColor: isTop ? "rgba(0,0,0,0)" : "rgba(0, 0, 0, 0.06)"
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 py-5 font-semibold uppercase text-black border-b"
      >
        <Link href="/">
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
              <Image src="/logo.jpg" alt="Orbyt Logo" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl tracking-tighter font-extrabold text-slate-900 leading-none">
                ORBYT
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest text-[#273E57] font-bold mt-0.5">
                CAMPUS OS
              </span>
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-[13px] tracking-widest text-slate-700 hover:text-[#273E57] transition-colors font-bold"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Language Switcher */}
          <div 
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setIsLangMenuOpen(true)}
            onMouseLeave={() => setIsLangMenuOpen(false)}
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black/70 hover:text-[#273E57] transition-colors px-2 py-1 rounded-md hover:bg-slate-100/60">
              <Globe size={15} />
              <span>{language.toUpperCase()}</span>
            </div>
            
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-1 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl border border-black/5 flex flex-col min-w-[130px] overflow-hidden py-1 z-50 origin-top-right"
                >
                  <button onClick={() => { setLanguage("en"); setIsLangMenuOpen(false); }} className={`px-4 py-2.5 text-left text-xs tracking-widest hover:bg-slate-50 transition-colors ${language === "en" ? "text-[#273E57] font-bold" : "text-black/60 font-medium"}`}>ENGLISH</button>
                  <button onClick={() => { setLanguage("hi"); setIsLangMenuOpen(false); }} className={`px-4 py-2.5 text-left text-xs tracking-widest hover:bg-slate-50 transition-colors ${language === "hi" ? "text-[#273E57] font-bold" : "text-black/60 font-medium"}`}>HINDI (हिंदी)</button>
                  <button onClick={() => { setLanguage("ta"); setIsLangMenuOpen(false); }} className={`px-4 py-2.5 text-left text-xs tracking-widest hover:bg-slate-50 transition-colors ${language === "ta" ? "text-[#273E57] font-bold" : "text-black/60 font-medium"}`}>TAMIL (தமிழ்)</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center text-xs tracking-wider text-slate-700 hover:text-[#273E57] font-bold px-2 sm:px-4 transition-colors"
          >
            LOGIN
          </Link>

          {/* Quick CTA */}
          <Link
            href="/#about"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs tracking-wider bg-[#273E57] text-white px-5 py-2.5 rounded-full hover:bg-slate-900 transition-all font-bold shadow-sm hover:shadow"
          >
            {t("nav.ask")}
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1 shrink-0 group hover:bg-[#273E57] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <span className="w-4 h-[2px] bg-white group-hover:scale-x-90 transition-transform origin-center" />
            <span className="w-4 h-[2px] bg-white group-hover:scale-x-110 transition-transform origin-center" />
            <span className="w-4 h-[2px] bg-white group-hover:scale-x-90 transition-transform origin-center" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-6 sm:p-8 font-semibold uppercase tracking-widest overflow-y-auto"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-md">
                  <Image src="/logo.jpg" alt="Orbyt Logo" fill sizes="40px" className="object-cover" />
                </div>
                <span className="text-xl sm:text-2xl tracking-tighter font-extrabold text-black">ORBYT</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#273E57] transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-6 mt-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-slate-900 hover:text-[#273E57] transition-colors font-bold tracking-tight"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-base text-[#273E57] bg-white border border-[#273E57] py-3.5 rounded-full hover:bg-slate-50 transition-colors font-bold"
              >
                LOGIN
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-base text-white bg-[#273E57] py-4 rounded-full hover:bg-slate-900 transition-colors font-bold"
              >
                {t("nav.ask")}
                <ArrowUpRight className="w-[18px] h-[18px]" />
              </Link>
              <div className="text-center text-[10px] opacity-60 tracking-widest">
                The Intelligent Campus OS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
