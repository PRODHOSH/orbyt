"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Marquee() {
  const { t } = useLanguage();
  
  const orbytWords = (t("marquee.words") || []) as string[];

  return (
    <div className="w-full overflow-hidden py-5 font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase text-[#273E57] border-y border-black/5 bg-slate-50/50">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
          className="flex items-center gap-12 sm:gap-16"
        >
          {/* Double the array for seamless looping */}
          {[...orbytWords, ...orbytWords, ...orbytWords, ...orbytWords].map((word, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-16 shrink-0 font-bold">
              <span>{word}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#273E57]/40" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
