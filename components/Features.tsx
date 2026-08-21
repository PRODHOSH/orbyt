"use client";

import { motion } from "framer-motion";
import { BookOpen, UserCheck, Compass, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  const { t } = useLanguage();

  const FEATURES = [
    {
      icon: <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#273E57]" />,
      title: t("features.item1.title"),
      description: t("features.item1.desc"),
    },
    {
      icon: <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#273E57]" />,
      title: t("features.item2.title"),
      description: t("features.item2.desc"),
    },
    {
      icon: <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#273E57]" />,
      title: t("features.item3.title"),
      description: t("features.item3.desc"),
    },
  ];

  return (
    <section id="features" className="text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* Top 2-Column: Info & unDraw Illustration */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">

          {/* Left: Text & CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="flex-1 w-full"
          >
            <div className="text-[10px] sm:text-xs font-bold text-[#273E57] tracking-widest mb-4">
              CAMPUS KNOWLEDGE BASE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6 leading-tight font-extrabold">
              <span className="text-black">{t("features.title1")}</span><br />
              <span className="text-[#273E57]">{t("features.title2")}</span>
            </h2>
            <div className="max-w-xl mb-10">
              <p className="text-sm sm:text-base font-medium opacity-75 normal-case leading-relaxed text-slate-700">
                {t("features.desc")}
              </p>
            </div>

            <Link
              href="/#elite-perks"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base text-white bg-[#273E57] px-8 py-4 rounded-full whitespace-nowrap group hover:bg-slate-900 transition-all shadow-[0_8px_30px_rgb(39,62,87,0.2)] hover:shadow-[0_8px_30px_rgb(39,62,87,0.3)] w-fit tracking-widest font-bold"
            >
              {t("features.cta")}
              <ArrowUpRight className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: unDraw AI Research Assistant Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full max-w-lg relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
              <Image 
                src="/undraw_ai-research-assistant_cxx0.svg" 
                alt="AI Campus Knowledge Layer" 
                fill 
                className="object-contain drop-shadow-sm" 
              />
            </div>
          </motion.div>

        </div>

        {/* Bottom: 3 Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 pt-6"
        >
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants} 
              className="flex flex-col items-center text-center p-8 sm:p-10 bg-slate-50/70 rounded-3xl border border-black/5 hover:border-[#273E57]/20 hover:shadow-lg transition-all"
            >
              {/* Icon Container */}
              <div className="p-5 bg-white rounded-2xl shadow-sm ring-1 ring-black/5">
                {feature.icon}
              </div>
              
              {/* Text Content */}
              <div className="mt-6 mb-2 flex flex-col flex-grow relative z-10">
                <h3 className="text-lg sm:text-xl mb-3 tracking-wider text-slate-900 font-extrabold uppercase">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm tracking-wide opacity-75 leading-relaxed normal-case font-medium text-slate-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
