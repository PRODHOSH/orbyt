"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Benefits() {
  const { t } = useLanguage();

  const PERKS = [
    {
      num: "01",
      title: t("benefits.item1.title"),
      description: t("benefits.item1.desc"),
    },
    {
      num: "02",
      title: t("benefits.item2.title"),
      description: t("benefits.item2.desc"),
    },
    {
      num: "03",
      title: t("benefits.item3.title"),
      description: t("benefits.item3.desc"),
    },
    {
      num: "04",
      title: t("benefits.item4.title"),
      description: t("benefits.item4.desc"),
    }
  ];

  return (
    <section id="benefits" className="text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 relative bg-slate-50/40">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left Side (Sticky header) */}
        <div className="lg:w-2/5 relative">
          <div className="lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="flex items-center gap-4 text-[#273E57] uppercase tracking-widest text-[10px] sm:text-xs font-extrabold">
              {t("benefits.label")}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] font-extrabold">
              {(() => {
                const text = t("benefits.title") as string;
                const [first, ...rest] = text.split("\n");
                return (
                  <>
                    <span className="text-black">{first}</span>
                    {rest.length > 0 && <br />}
                    <span className="text-[#273E57]">{rest.join("\n")}</span>
                  </>
                );
              })()}
            </h2>
            <p className="text-sm sm:text-base opacity-75 font-medium leading-relaxed max-w-sm text-slate-700 normal-case">
              {t("benefits.desc")}
            </p>
          </div>
        </div>

        {/* Right Side (List of Pillars) */}
        <div className="lg:w-3/5 flex flex-col gap-10 sm:gap-14 pt-4">
          {PERKS.map((perk, i) => (
            <motion.div 
              key={perk.num} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-10 group border-b border-black/5 pb-10 sm:pb-14 last:border-0 last:pb-0"
            >
              <div className="text-[#273E57] font-mono text-2xl sm:text-3xl font-extrabold shrink-0 pt-1">
                {perk.num}
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {perk.title}
                </h3>
                <p className="text-sm sm:text-base opacity-75 leading-relaxed font-medium max-w-xl text-slate-600 normal-case">
                  {perk.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
