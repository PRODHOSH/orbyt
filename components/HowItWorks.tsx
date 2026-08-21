"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  const STEPS = [
    { num: "01", title: t("process.step1"), desc: "Ask in plain natural language about attendance, rules, or clubs", active: true },
    { num: "02", title: t("process.step2"), desc: "ORBYT searches live institutional data & official handbooks", active: false },
    { num: "03", title: t("process.step3"), desc: "Transparent answers with official institutional citations", active: false },
    { num: "04", title: t("process.step4"), desc: "Explains actual impact on eligibility, marks & deadlines", active: false },
    { num: "05", title: t("process.step5"), desc: "Executes direct workflows, builds resumes & files alerts", active: false },
  ];

  return (
    <section id="process" className="py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex items-center gap-4 text-[#273E57] tracking-widest text-[10px] sm:text-xs font-bold mb-6">
            {t("process.label")}
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-20 leading-tight font-extrabold">
            {(() => {
              const text = t("process.title") as string;
              const words = text.split(" ");
              const mid = Math.ceil(words.length / 2);
              return (
                <>
                  <span className="text-black">{words.slice(0, mid).join(" ")}</span>
                  {words.length > 1 && <br />}
                  <span className="text-[#273E57]">{words.slice(mid).join(" ")}</span>
                </>
              );
            })()}
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[850px] flex items-start justify-between relative px-2">
            
            {/* Continuous Background Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-[32px] sm:top-[36px] left-0 right-0 h-[2px] bg-slate-200 z-0 origin-left" 
            />
            
            {STEPS.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center sm:items-start gap-4 group cursor-default max-w-[160px]"
              >
                {/* The Number */}
                <div className={`text-6xl sm:text-7xl font-black tracking-tighter bg-white px-4 -ml-4 transition-colors duration-300 ${step.active ? "text-[#273E57]" : "text-slate-300 group-hover:text-[#273E57]"}`}>
                  {step.num}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 normal-case sm:ml-2 text-center sm:text-left transition-colors duration-300 group-hover:text-[#273E57]">
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-500 font-medium normal-case sm:ml-2 text-center sm:text-left leading-relaxed">
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
