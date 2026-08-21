"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();
  const TESTIMONIALS = (t("testimonials.list") || []) as { name: string; role: string; quote: string; avatar: string }[];

  return (
    <section className="py-24 sm:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 leading-tight uppercase font-extrabold">
          <span className="text-black">{t("testimonials.title1")}</span><br />
          <span className="text-[#273E57]">{t("testimonials.title2")}</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          {t("testimonials.subtitle")}
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex items-stretch gap-6 sm:gap-8 px-4 hover:[animation-play-state:paused]"
        >
          {/* Triple the array for seamless looping */}
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
            <div 
              key={i}
              className="w-[300px] sm:w-[420px] shrink-0 bg-white border border-[#273E57]/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between whitespace-normal shadow-[0_8px_30px_rgba(39,62,87,0.06)] hover:shadow-[0_15px_40px_rgba(39,62,87,0.12)] hover:border-[#273E57]/40 hover:-translate-y-1 transition-all duration-300 cursor-default group relative overflow-hidden"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#273E57]/5 rounded-bl-[2.5rem] -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="mb-6">
                {/* Quote Icon */}
                <svg className="w-8 h-8 text-[#273E57]/20 mb-4 group-hover:text-[#273E57]/40 transition-colors" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-slate-700 font-medium leading-relaxed text-sm sm:text-base">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/5">
                <div className="w-10 h-10 rounded-full bg-[#273E57] flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-inner">
                  {testimonial.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-sm">{testimonial.name}</span>
                  <span className="text-xs text-slate-500 font-medium">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
