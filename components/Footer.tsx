"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-slate-50 text-black px-5 sm:px-8 md:px-12 pt-16 pb-36 md:pt-24 md:pb-48 font-semibold uppercase tracking-widest text-xs sm:text-sm border-t border-black/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

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

          <div className="flex gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#273E57] hover:text-white transition-all" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#273E57] hover:text-white transition-all" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#273E57] hover:text-white transition-all" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="mailto:contact@orbyt.campus" className="w-9 h-9 flex items-center justify-center bg-black/5 rounded-full hover:bg-[#273E57] hover:text-white transition-all" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <span className="opacity-60 text-[10px] font-bold tracking-widest text-slate-700">
              {t("footer.roles")}
            </span>
            <span className="opacity-50 text-[10px] font-bold tracking-widest text-slate-500">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </span>
          </div>
        </div>

        {/* Modules Column */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">{t("footer.modules")}</span>
          <Link href="/#about" className="hover:text-[#273E57] transition-colors">{t("footer.modules.1")}</Link>
          <Link href="/#process" className="hover:text-[#273E57] transition-colors">{t("footer.modules.2")}</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">{t("footer.modules.3")}</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">{t("footer.modules.4")}</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">{t("footer.modules.5")}</Link>
        </div>

        {/* Systems Column */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">{t("footer.inst")}</span>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">{t("footer.inst.1")}</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">{t("footer.inst.2")}</Link>
          <Link href="/#process" className="hover:text-[#273E57] transition-colors">{t("footer.inst.3")}</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">{t("footer.inst.4")}</Link>
          <Link href="/#faq" className="hover:text-[#273E57] transition-colors">{t("footer.inst.5")}</Link>
        </div>

        {/* Dashboards */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">{t("footer.dashboards")}</span>
          <Link href="/dashboard/student" className="hover:text-[#273E57] transition-colors">{t("footer.dash.1")}</Link>
          <Link href="/dashboard/employee" className="hover:text-[#273E57] transition-colors">{t("footer.dash.2")}</Link>
          <Link href="/dashboard/admin" className="hover:text-[#273E57] transition-colors">{t("footer.dash.3")}</Link>
          <Link href="/dashboard/admin/safety" className="hover:text-[#273E57] transition-colors">{t("footer.dash.4")}</Link>
          <Link href="/dashboard/admin/visitors" className="hover:text-[#273E57] transition-colors">{t("footer.dash.5")}</Link>
        </div>
      </div>

      {/* Giant Watermark Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[22%] text-[24vw] font-black text-black/[0.03] leading-none pointer-events-none select-none w-full text-center whitespace-nowrap z-0">
        ORBYT
      </div>
    </footer>
  );
}
