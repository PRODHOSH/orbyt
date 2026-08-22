"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-slate-50 text-black px-5 sm:px-8 md:px-12 pt-16 pb-36 md:pt-24 md:pb-48 font-semibold uppercase tracking-widest text-xs sm:text-sm border-t border-black/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">

        {/* Brand Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm">
              <Image src="/logo.jpg" alt="Orbyt Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl text-slate-900 tracking-tight font-extrabold leading-none">ORBYT</span>
              <span className="text-[9px] text-[#273E57] font-bold tracking-widest mt-0.5">{t("footer.subtitle")}</span>
            </div>
          </div>

          <p className="normal-case font-medium text-xs text-slate-600 max-w-sm leading-relaxed">
            {t("footer.desc")}
          </p>

          <div className="mt-2 flex flex-col gap-2">
            <span className="opacity-60 text-[10px] font-bold tracking-widest text-slate-700">
              {t("footer.roles")}
            </span>
            <span className="opacity-50 text-[10px] font-bold tracking-widest text-slate-500">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </span>
          </div>
        </div>

        {/* Dashboards */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">{t("footer.dashboards")}</span>
          <Link href="/dashboard/student" className="hover:text-[#273E57] transition-colors">{t("footer.dash.1")}</Link>
          <Link href="/dashboard/employee" className="hover:text-[#273E57] transition-colors">{t("footer.dash.2")}</Link>
          <Link href="/dashboard/admin" className="hover:text-[#273E57] transition-colors">{t("footer.dash.3")}</Link>
        </div>
      </div>

      {/* Giant Watermark Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[22%] text-[24vw] font-black text-black/[0.03] leading-none pointer-events-none select-none w-full text-center whitespace-nowrap z-0">
        ORBYT
      </div>
    </footer>
  );
}
