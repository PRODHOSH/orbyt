"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Cta() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-36 px-5 sm:px-8 md:px-12 text-black overflow-hidden flex flex-col items-center justify-center text-center bg-white">
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#273E57] rounded-full blur-[140px]" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-extrabold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#273E57]" />
          <span>ONE CAMPUS. ONE INTELLIGENCE LAYER.</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-tight text-slate-900">
          {t("cta.title1")} <br />
          <span className="text-[#273E57]">{t("cta.title2")}</span>
        </h2>
        
        <p className="text-sm md:text-base opacity-75 max-w-2xl font-medium tracking-wide normal-case text-slate-700 leading-relaxed">
          {t("cta.desc")}
        </p>
        
        <div className="flex flex-col items-center gap-3 mt-4 w-full sm:w-auto">
          <Link
            href="/#about"
            className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-white bg-[#273E57] px-10 py-5 rounded-full whitespace-nowrap group hover:bg-slate-900 transition-all hover:scale-105 shadow-[0_10px_40px_rgba(39,62,87,0.25)] tracking-widest uppercase"
          >
            {t("cta.btn")}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <span className="text-[10px] tracking-widest opacity-60 uppercase font-bold mt-2">
            {t("cta.sub")}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
