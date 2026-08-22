"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Clock, MessageSquareWarning, Bus,
  Building2, Briefcase, ShieldAlert, Sparkles, CalendarDays,
  Users, UserCheck, ClipboardList, Megaphone, FileText,
  Brain, GraduationCap, AlertTriangle, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: ("student" | "employee" | "admin")[];
  badge?: string;
};

const navigation: NavItem[] = [
  // ── Student ────────────────────────────────────────
  { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard, roles: ["student"] },
  { name: "Attendance", href: "/dashboard/student/attendance", icon: BookOpen, roles: ["student"] },
  { name: "Timetable", href: "/dashboard/student/timetable", icon: CalendarDays, roles: ["student"] },
  { name: "Leave Request", href: "/dashboard/student/leave", icon: FileText, roles: ["student"] },
  { name: "Hostel", href: "/dashboard/student/hostel", icon: Building2, roles: ["student"] },
  { name: "Transport", href: "/dashboard/student/transport", icon: Bus, roles: ["student"] },
  { name: "Placements", href: "/dashboard/student/placements", icon: Briefcase, roles: ["student"] },

  // ── Employee ───────────────────────────────────────
  { name: "Dashboard", href: "/dashboard/employee", icon: LayoutDashboard, roles: ["employee"] },
  { name: "My Classes", href: "/dashboard/employee/classes", icon: GraduationCap, roles: ["employee"] },
  { name: "Leave Approvals", href: "/dashboard/employee/leaves", icon: ClipboardList, roles: ["employee"] },
  { name: "Complaints", href: "/dashboard/employee/complaints", icon: MessageSquareWarning, roles: ["employee"] },

  // ── Admin ──────────────────────────────────────────
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard, roles: ["admin"] },
  { name: "User Management", href: "/dashboard/admin/users", icon: Users, roles: ["admin"] },
  { name: "Visitor Mgmt", href: "/dashboard/admin/visitors", icon: UserCheck, roles: ["admin"] },
  { name: "Safety Monitor", href: "/dashboard/admin/safety", icon: Eye, roles: ["admin"] },
  { name: "Transport Mgmt", href: "/dashboard/admin/transport", icon: Bus, roles: ["admin"] },
  { name: "Hostel Mgmt", href: "/dashboard/admin/hostel", icon: Building2, roles: ["admin"] },
  { name: "Knowledge Base", href: "/dashboard/admin/knowledge", icon: Brain, roles: ["admin"] },

  // ── Shared ─────────────────────────────────────────
  { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone, roles: ["student", "employee", "admin"] },
  { name: "Complaints", href: "/dashboard/complaints", icon: MessageSquareWarning, roles: ["student", "admin"] },
  { name: "Safety / SOS", href: "/dashboard/safety", icon: ShieldAlert, roles: ["student", "employee", "admin"] },
  { name: "Ask ORBYT", href: "/dashboard/orbyt-ai", icon: Sparkles, roles: ["student", "employee", "admin"] },
];

export function SidebarNav({ userRole = "student" }: { userRole?: string; accessibleModules?: string[]; isElevated?: boolean }) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  let activeRole = userRole as "student" | "employee" | "admin";
  if (pathname.startsWith("/dashboard/student")) activeRole = "student";
  else if (pathname.startsWith("/dashboard/employee")) activeRole = "employee";
  else if (pathname.startsWith("/dashboard/admin")) activeRole = "admin";

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(activeRole)
  );

  const roleItems = filteredNavigation.filter((item) => item.roles.length < 3);
  const sharedItems = filteredNavigation.filter((item) => item.roles.length >= 3);

  const renderItem = (item: NavItem) => {
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
    const linkEl = (
      <Link
        key={item.name + item.href}
        href={item.href}
        className={cn(
          "flex items-center rounded-md transition-all duration-200",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isOpen ? "gap-3 px-3 py-2.5 text-sm font-medium" : "justify-center p-3",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
            : "text-sidebar-foreground"
        )}
      >
        <item.icon className={cn("shrink-0", isOpen ? "h-[18px] w-[18px]" : "h-5 w-5")} />
        {isOpen && <span className="truncate">{item.name}</span>}
      </Link>
    );

    if (!isOpen) {
      return (
        <Tooltip key={item.name + item.href}>
          <TooltipTrigger render={linkEl} />
          <TooltipContent side="right" className="ml-2">{item.name}</TooltipContent>
        </Tooltip>
      );
    }
    return linkEl;
  };

  return (
    <TooltipProvider delay={0}>
      <nav className="flex flex-col gap-1 px-2">
        {/* Role-specific items */}
        <div className="flex flex-col gap-0.5">
          {roleItems.map(renderItem)}
        </div>

        {/* Divider */}
        {sharedItems.length > 0 && (
          <div className="my-2 px-3">
            <div className="h-px bg-sidebar-border" />
            {isOpen && (
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 font-bold mt-2 block">
                Campus
              </span>
            )}
          </div>
        )}

        {/* Shared items */}
        <div className="flex flex-col gap-0.5">
          {sharedItems.map(renderItem)}
        </div>
      </nav>
    </TooltipProvider>
  );
}
