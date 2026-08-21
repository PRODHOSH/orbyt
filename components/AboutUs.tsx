"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#273E57]" />
              <span>{t("about.pill")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6 leading-tight uppercase font-extrabold">
              <span className="text-black">{t("about.title1")}</span><br />
              <span className="text-[#273E57]">{t("about.title2")}</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 normal-case font-medium">
              {t("about.desc")}
            </p>

            <Link
              href="/#process"
              className="group flex items-center gap-2 bg-[#273E57] text-white px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-black transition-all shadow-[0_8px_30px_rgba(39,62,87,0.2)] hover:shadow-[0_15px_40px_rgba(39,62,87,0.3)] hover:-translate-y-0.5"
            >
              {t("about.btn")}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right unDraw Illustration */}
          <div className="flex-1 w-full relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center p-4">
              <Image 
                src="/undraw_ask-me-anything_v09d.svg" 
                alt="Ask ORBYT Campus Intelligence" 
                fill 
                priority
                className="object-contain drop-shadow-sm" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
