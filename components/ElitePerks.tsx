"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users2, Briefcase, ShieldAlert, BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ElitePerks() {
  const { t } = useLanguage();

  const PERKS = [
    {
      num: "01",
      category: "ACADEMICS",
      title: t("perks.item1.title"),
      icon: <GraduationCap className="w-16 h-16 text-[#273E57]" />,
      description: t("perks.item1.desc"),
      pill: t("perks.item1.pill")
    },
    {
      num: "02",
      category: "COMMUNITY",
      title: t("perks.item2.title"),
      icon: <Users2 className="w-16 h-16 text-[#273E57]" />,
      description: t("perks.item2.desc"),
      pill: t("perks.item2.pill")
    },
    {
      num: "03",
      category: "CAREER",
      title: t("perks.item3.title"),
      icon: <Briefcase className="w-16 h-16 text-[#273E57]" />,
      description: t("perks.item3.desc"),
      pill: t("perks.item3.pill")
    },
    {
      num: "04",
      category: "SECURITY",
      title: t("perks.item4.title"),
      icon: <ShieldAlert className="w-16 h-16 text-[#273E57]" />,
      description: t("perks.item4.desc"),
      pill: t("perks.item4.pill")
    },
    {
      num: "05",
      category: "ANALYTICS",
      title: t("perks.item5.title"),
      icon: <BarChart3 className="w-16 h-16 text-[#273E57]" />,
      description: t("perks.item5.desc"),
      pill: t("perks.item5.pill"),
    }
  ];

  return (
    <section id="elite-perks" className="text-black font-semibold uppercase tracking-widest relative bg-white">
      <div className="pt-20 sm:pt-32 pb-4 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-4 text-[#273E57] uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-6">
            {t("perks.label")}
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4 leading-tight font-extrabold">
            {(() => {
              const text = t("perks.title") as string;
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
          <p className="text-sm sm:text-base opacity-70 font-medium normal-case max-w-2xl mt-4 text-slate-700">
            {t("perks.desc")}
          </p>
        </motion.div>
      </div>

      <div className="relative pb-32">
        {PERKS.map((perk, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div 
              key={perk.num} 
              className="sticky top-0 w-full min-h-screen flex items-center justify-center overflow-hidden"
              style={{
                top: "0px",
                paddingTop: "70px", 
              }}
            >
              <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 h-auto lg:h-[75vh] min-h-[550px] lg:min-h-[480px] flex flex-col lg:flex-row shadow-[0_-10px_40px_rgb(0,0,0,0.06)] rounded-t-[2.5rem] overflow-hidden bg-white border-t border-black/5">
                
                {/* Text Content */}
                <div className={`w-full lg:w-3/5 flex flex-col justify-center p-8 sm:p-12 lg:p-20 relative order-2 ${isEven ? "lg:order-2 bg-slate-50/80" : "lg:order-1 bg-white"}`}>
                  <div className="flex flex-col gap-4 lg:gap-6 relative z-10">
                    <div className="flex items-center gap-3 lg:gap-4 text-[#273E57] uppercase tracking-widest text-[10px] sm:text-xs font-extrabold">
                      <span className="w-4 lg:w-6 h-[1.5px] bg-[#273E57]" />
                      MODULE {perk.num} &bull; {perk.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 normal-case leading-[1.15]">
                      {perk.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-75 font-medium leading-relaxed text-slate-700 normal-case mt-1 max-w-xl">
                      {perk.description}
                    </p>
                  </div>
                </div>

                {/* Visual Content */}
                <div className={`w-full lg:w-2/5 flex flex-col items-center justify-center p-10 lg:p-16 relative overflow-hidden order-1 ${isEven ? "lg:order-1 bg-white" : "lg:order-2 bg-slate-50/80"}`}>
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white shadow-md border border-black/5 flex items-center justify-center mb-6 z-10">
                    {perk.icon}
                  </div>
                  <div className="inline-flex items-center justify-center bg-white border border-[#273E57]/20 text-[#273E57] px-5 py-2 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-sm z-10">
                    {perk.pill}
                  </div>
                  {/* Big Background Number */}
                  <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 lg:-bottom-12 lg:-right-8 text-[12rem] sm:text-[15rem] lg:text-[18rem] font-black text-black/[0.03] leading-none pointer-events-none select-none">
                    {perk.num}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
