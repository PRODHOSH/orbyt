"use server";

import { createClient } from "@supabase/supabase-js";

export async function getAdminDashboardStats() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE_KEY!
  );

  const [
    { count: totalStudents },
    { count: totalEmployees },
    { count: openComplaints },
    { count: activeAlerts },
    { count: todayVisitors },
    { count: pendingLeaves },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "employee"),
    supabase.from("complaints").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
    supabase.from("sos_alerts").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("visitors").select("*", { count: "exact", head: true }).eq("status", "checked_in"),
    supabase.from("leave_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  return {
    totalStudents: totalStudents || 0,
    totalEmployees: totalEmployees || 0,
    openComplaints: openComplaints || 0,
    activeAlerts: activeAlerts || 0,
    todayVisitors: todayVisitors || 0,
    pendingLeaves: pendingLeaves || 0,
  };
}
