import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

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
  return (
    <footer className="relative bg-slate-50 text-black px-5 sm:px-8 md:px-12 pt-16 pb-36 md:pt-24 md:pb-48 font-semibold uppercase tracking-widest text-xs sm:text-sm border-t border-black/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

        {/* Brand Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#273E57] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl text-slate-900 tracking-tight font-extrabold leading-none">ORBYT</span>
              <span className="text-[9px] text-[#273E57] font-bold tracking-widest mt-0.5">THE INTELLIGENT CAMPUS OS</span>
            </div>
          </div>

          <p className="normal-case font-medium text-xs text-slate-600 max-w-sm leading-relaxed">
            One campus. One intelligence layer. Bringing student academics, campus services, club recruitments, and institutional safety into a unified operating system.
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
              Students &bull; Faculty &bull; Administration &bull; Clubs &bull; Campus Safety
            </span>
            <span className="opacity-50 text-[10px] font-bold tracking-widest text-slate-500">
              &copy; {new Date().getFullYear()} ORBYT. Built for smarter campuses.
            </span>
          </div>
        </div>

        {/* Modules Column */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">Campus Modules</span>
          <Link href="/#about" className="hover:text-[#273E57] transition-colors">Core Message</Link>
          <Link href="/#process" className="hover:text-[#273E57] transition-colors">Beyond Chat</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">Academic Intelligence</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">Club & Opportunities</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">AI Resume Studio</Link>
        </div>

        {/* Systems Column */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">Institutional</span>
          <Link href="/#timeline" className="hover:text-[#273E57] transition-colors">Campus Safety Layer</Link>
          <Link href="/#features" className="hover:text-[#273E57] transition-colors">Regulations & Handbooks</Link>
          <Link href="/#benefits" className="hover:text-[#273E57] transition-colors">The 4 Pillars</Link>
          <Link href="/#elite-perks" className="hover:text-[#273E57] transition-colors">Macro Analytics</Link>
          <Link href="/#faq" className="hover:text-[#273E57] transition-colors">Security & Privacy</Link>
        </div>

        {/* Legal & Standards */}
        <div className="flex flex-col gap-4 text-black/70">
          <span className="opacity-40 mb-2 text-black text-[10px] font-bold">Trust & Governance</span>
          <a href="#" className="hover:text-[#273E57] transition-colors">Institutional Privacy</a>
          <a href="#" className="hover:text-[#273E57] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#273E57] transition-colors">Data Encryption</a>
          <a href="#" className="hover:text-[#273E57] transition-colors">Source Verification</a>
          <a href="#" className="hover:text-[#273E57] transition-colors">Incident Protocols</a>
        </div>
      </div>

      {/* Giant Watermark Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[22%] text-[24vw] font-black text-black/[0.03] leading-none pointer-events-none select-none w-full text-center whitespace-nowrap z-0">
        ORBYT
      </div>
    </footer>
  );
}
