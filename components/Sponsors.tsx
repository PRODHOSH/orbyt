"use client";

import { motion } from "framer-motion";
import { Database, ShieldAlert, GraduationCap, Users2, Briefcase, FileCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const ECOSYSTEM_MODULES = [
  { name: "ATTENDANCE ERP", icon: <Database className="w-6 h-6 text-[#273E57]" />, desc: "Official Student Information Systems" },
  { name: "ACADEMIC HANDBOOKS", icon: <GraduationCap className="w-6 h-6 text-[#273E57]" />, desc: "Regulations & Debarment Rules" },
  { name: "CLUBS & SOCIETIES", icon: <Users2 className="w-6 h-6 text-[#273E57]" />, desc: "Active Recruitments & Events" },
  { name: "CAREER & RESUME", icon: <Briefcase className="w-6 h-6 text-[#273E57]" />, desc: "Targeted Internship Builder" },
  { name: "CAMPUS SAFETY", icon: <ShieldAlert className="w-6 h-6 text-[#273E57]" />, desc: "Instant Incident Triage & Alerts" },
  { name: "EXAM CONTROLLER", icon: <FileCheck className="w-6 h-6 text-[#273E57]" />, desc: "Marks, Schedules & Deadlines" },
];

export default function Sponsors() {
  const { t } = useLanguage();

  return (
    <section className="text-black py-20 sm:py-24 px-5 overflow-hidden font-semibold uppercase tracking-widest bg-slate-50/60 border-b border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl tracking-tight text-center mb-3 font-extrabold text-slate-900">
          {t("sponsors.title")}
        </h2>
        <p className="text-[10px] sm:text-xs opacity-60 mb-14 text-center max-w-xl font-bold">
          {t("sponsors.subtitle")}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch mb-12 w-full">
          {ECOSYSTEM_MODULES.map((module, i) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm hover:shadow-md hover:border-[#273E57]/30 transition-all flex flex-col items-center text-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {module.icon}
              </div>
              <div className="text-xs font-bold text-slate-900 tracking-wider">
                {module.name}
              </div>
              <div className="text-[9px] text-slate-500 font-medium normal-case leading-tight">
                {module.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <Link 
          href="/#elite-perks" 
          className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest text-white bg-slate-900 px-7 py-3.5 rounded-full hover:bg-[#273E57] transition-all shadow-md hover:shadow-lg font-bold"
        >
          {t("sponsors.cta")} <span className="text-base leading-none">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
