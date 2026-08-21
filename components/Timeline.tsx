"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
import { AlertTriangle, Cpu, ShieldAlert, Radio, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const JOURNEY_STEPS = [
    {
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      date: t("timeline.date1"),
      title: t("timeline.step1.title"),
      description: t("timeline.step1.desc"),
    },
    {
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      date: t("timeline.date2"),
      title: t("timeline.step2.title"),
      description: t("timeline.step2.desc"),
    },
    {
      icon: <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      date: t("timeline.date3"),
      title: t("timeline.step3.title"),
      description: t("timeline.step3.desc"),
    },
    {
      icon: <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      date: t("timeline.date4"),
      title: t("timeline.step4.title"),
      description: t("timeline.step4.desc"),
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      date: t("timeline.date5"),
      title: t("timeline.step5.title"),
      description: t("timeline.step5.desc"),
    }
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end 80%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase tracking-widest bg-slate-50/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <div className="text-[#273E57] text-[10px] sm:text-xs font-bold mb-4">
            FROM REPORT TO RESPONSE
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4 font-extrabold">
            <span className="text-black">{t("timeline.title1")}</span> <span className="text-[#273E57]">{t("timeline.title2")}</span>
          </h2>
          <p className="text-xs sm:text-sm opacity-60 normal-case font-medium">{t("timeline.subtitle")}</p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto pb-12">
          {/* Faded Background Line */}
          <div className="absolute left-[23px] sm:left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-black/5" />
          
          {/* Animated Fill Line */}
          <motion.div 
            style={{ height }}
            className="absolute left-[23px] sm:left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-[#273E57] origin-top" 
          />

          <div className="flex flex-col gap-12 sm:gap-20 relative z-10">
            {JOURNEY_STEPS.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <div key={i} className="flex flex-row md:justify-between items-start md:items-center w-full group relative">
                  
                  {/* Left Text Block (Desktop Only) */}
                  <div className={`hidden md:block w-[45%] ${isEven ? "text-right pr-12" : "invisible"}`}>
                    <div className="pt-2 flex flex-col items-end">
                      <div className="text-[#273E57] text-xs font-bold mb-2 tracking-widest">{step.date}</div>
                      <h3 className="text-2xl tracking-tight mb-3 text-slate-900 font-bold">{step.title}</h3>
                      <div className="bg-white p-6 rounded-2xl border border-black/5 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow text-left w-full max-w-sm">
                        <p className="text-sm normal-case font-medium opacity-75 leading-relaxed text-slate-700">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center/Left Icon Container */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-white rounded-2xl border-2 border-black/5 group-hover:border-[#273E57]/30 transition-colors duration-500 z-10 shadow-sm">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-[#273E57] flex items-center justify-center scale-90 transition-transform duration-500 group-hover:scale-110 shadow-[0_4px_20px_rgba(39,62,87,0.3)]">
                      {step.icon}
                    </div>
                  </div>

                  {/* Right Text Block (Mobile & Odd Desktop) */}
                  <div className={`pl-[4rem] sm:pl-[7rem] md:pl-0 w-full md:w-[45%] ${isEven ? "md:hidden" : "md:block md:pl-12"}`}>
                    <div className="pt-2 flex flex-col items-start">
                      <div className="text-[#273E57] text-[10px] sm:text-xs font-bold mb-2 tracking-widest">{step.date}</div>
                      <h3 className="text-xl sm:text-2xl tracking-tight mb-3 text-slate-900 font-bold">{step.title}</h3>
                      <div className="bg-white p-6 rounded-2xl border border-black/5 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow text-left w-full max-w-sm">
                        <p className="text-sm normal-case font-medium opacity-75 leading-relaxed text-slate-700">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
