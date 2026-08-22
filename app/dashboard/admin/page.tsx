import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquareWarning, Siren, UserCheck, FileText, ShieldAlert } from "lucide-react";
import { getAdminDashboardStats } from "@/lib/actions";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getAdminDashboardStats();

  const cards = [
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30", href: "/dashboard/admin/users" },
    { label: "Total Employees", value: stats.totalEmployees, icon: Users, color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30", href: "/dashboard/admin/users" },
    { label: "Open Complaints", value: stats.openComplaints, icon: MessageSquareWarning, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30", href: "/dashboard/complaints" },
    { label: "Active SOS Alerts", value: stats.activeAlerts, icon: Siren, color: stats.activeAlerts > 0 ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" : "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30", href: "/dashboard/admin/safety" },
    { label: "Visitors Today", value: stats.todayVisitors, icon: UserCheck, color: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30", href: "/dashboard/admin/visitors" },
    { label: "Pending Leaves", value: stats.pendingLeaves, icon: FileText, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30", href: "/dashboard/admin/users" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Admin Command Center</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time campus overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-red-500" />Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/admin/safety" className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition text-center">Safety Monitor</Link>
              <Link href="/dashboard/admin/visitors" className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition text-center">Visitor Mgmt</Link>
              <Link href="/dashboard/announcements" className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition text-center">Announcements</Link>
              <Link href="/dashboard/admin/knowledge" className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/50 transition text-center">Knowledge Base</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              {[
                { name: "Supabase Database", status: "Operational" },
                { name: "ORBYT AI Agent", status: "Operational" },
                { name: "Auth Service", status: "Operational" },
                { name: "File Storage", status: "Operational" },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><span className="h-2 w-2 rounded-full bg-emerald-500" />{s.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
