import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNavLoader } from "@/components/layout/mobile-nav-loader";
import { CommandMenuLoader } from "@/components/layout/command-menu-loader";
import { ShortcutsDialog } from "@/components/layout/shortcuts-dialog";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0 relative z-0">
        {/* Ambient mobile background gradient */}
        <div className="md:hidden fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background z-[-1]" />
        
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 pb-28 md:p-8 md:pb-16 lg:p-10 lg:pb-16 relative z-10">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNavLoader />

      <CommandMenuLoader />
      <ShortcutsDialog />
    </div>
  );
}
