"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarNav } from "./sidebar-nav";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Menu, Settings, ShieldCheck, LogOut, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface SidebarClientProps {
  profile: { full_name: string; role: string; avatar_url?: string; accessible_modules?: string[]; position?: string; is_elevated?: boolean };
  email: string | undefined;
  initials: string;
}

// Desktop-only rail — mobile navigation (including Settings/Log Out) lives
// entirely in MobileNav's bottom bar + "More" sheet.
export function SidebarClient({ profile, email, initials }: SidebarClientProps) {
  const { isOpen, toggle } = useSidebar();
  const router = useRouter();
  const isElevated = !!profile.is_elevated;
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
      return;
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <div
      className={cn(
        "hidden md:flex flex-col h-full bg-background/80 backdrop-blur-xl border-r border-border transition-all duration-300 z-40 supports-backdrop-filter:bg-background/60",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className={cn("flex h-14 shrink-0 items-center border-b border-border", isOpen ? "px-4 justify-between" : "px-0 justify-center")}>
        {isOpen && (
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="relative h-7 w-7 rounded-md overflow-hidden shrink-0">
              <Image src="/logo.jpg" alt="Orbyt Logo" fill sizes="40px" className="object-cover" />
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-foreground truncate mt-0.5">Orbyt</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          data-mobile-tap-target
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="h-8 w-8 text-sidebar-foreground shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto py-4 flex flex-col gap-1">
        <SidebarNav userRole={profile.role} />
        
        <div className="px-2 flex flex-col gap-1 pt-1">
          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
              "flex w-full items-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
              isOpen ? "gap-3 px-3 py-2.5 text-sm font-medium" : "justify-center p-3"
            )}
            title="Toggle Theme"
          >
            <div className="relative h-[18px] w-[18px] shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </div>
            {isOpen && <span>Toggle Theme</span>}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center rounded-md text-destructive hover:bg-destructive/10 transition-colors",
              isOpen ? "gap-3 px-3 py-2.5 text-sm font-medium" : "justify-center p-3"
            )}
            title="Log Out"
          >
            <LogOut className={cn("shrink-0", isOpen ? "h-[18px] w-[18px]" : "h-5 w-5")} />
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </div>
      <div className="border-t border-border p-4 shrink-0">
        <div
          title={email}
          className={cn(
            "flex w-full items-center rounded-md",
            isOpen ? "gap-3 px-3 py-2" : "justify-center py-2 px-0"
          )}
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={profile.avatar_url || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex flex-col truncate text-left flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{profile?.full_name}</span>
              <span className="text-xs text-muted-foreground truncate">{profile?.position || email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
