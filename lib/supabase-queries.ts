import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// ── Profiles ────────────────────────────────────────────
export async function getProfile(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

export async function getAllProfiles() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function updateProfile(userId: string, updates: Record<string, any>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();
  return { data, error };
}

// ── Attendance ──────────────────────────────────────────
export async function getAttendance(studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId)
    .order("date", { ascending: false });
  return { data: data || [], error };
}

export async function getAttendanceSummary(studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("attendance")
    .select("subject, status")
    .eq("student_id", studentId);

  if (error || !data) return { data: [], error };

  const subjects: Record<string, { total: number; present: number }> = {};
  data.forEach((row) => {
    if (!subjects[row.subject]) subjects[row.subject] = { total: 0, present: 0 };
    subjects[row.subject].total++;
    if (row.status === "present" || row.status === "late") subjects[row.subject].present++;
  });

  const summary = Object.entries(subjects).map(([subject, counts]) => ({
    subject,
    total: counts.total,
    present: counts.present,
    percentage: counts.total > 0 ? Math.round((counts.present / counts.total) * 100) : 0,
  }));

  return { data: summary, error: null };
}

export async function markAttendance(records: { student_id: string; subject: string; status: string; marked_by: string }[]) {
  const supabase = createClient();
  const { data, error } = await supabase.from("attendance").insert(records).select();
  return { data, error };
}

// ── Timetable ───────────────────────────────────────────
export async function getTimetable(department: string, yearOfStudy: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("timetable")
    .select("*, faculty:faculty_id(full_name)")
    .eq("department", department)
    .eq("year_of_study", yearOfStudy)
    .order("day_of_week")
    .order("start_time");
  return { data: data || [], error };
}

// ── Complaints ──────────────────────────────────────────
export async function getComplaints(userId: string, role: string) {
  const supabase = createClient();
  let query = supabase.from("complaints").select("*, submitter:submitted_by(full_name, role, department)");

  if (role === "student") {
    query = query.eq("submitted_by", userId);
  } else if (role === "employee") {
    query = query.eq("assigned_to", userId);
  }
  // admin gets all

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function submitComplaint(complaint: {
  submitted_by: string;
  category: string;
  subject: string;
  description: string;
  is_anonymous?: boolean;
}) {
  const { data, error } = await supabase.from("complaints").insert(complaint).select().single();
  return { data, error };
}

export async function updateComplaintStatus(id: string, status: string, notes?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("complaints")
    .update({ status, resolution_notes: notes, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

// ── Transport ───────────────────────────────────────────
export async function getTransportRoutes() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("transport_routes")
    .select("*")
    .eq("is_active", true)
    .order("route_name");
  return { data: data || [], error };
}

// ── Hostel ──────────────────────────────────────────────
export async function getHostelAllocation(studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hostel_allocations")
    .select("*, room:room_id(hostel_block, room_number, floor, room_type)")
    .eq("student_id", studentId)
    .eq("status", "active")
    .single();
  return { data, error };
}

export async function getHostelComplaints(studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hostel_complaints")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function getAllHostelData() {
  const supabase = createClient();
  const { data: rooms } = await supabase.from("hostel_rooms").select("*");
  const { data: allocations } = await supabase
    .from("hostel_allocations")
    .select("*, student:student_id(full_name, department), room:room_id(hostel_block, room_number)")
    .eq("status", "active");
  const { data: complaints } = await supabase
    .from("hostel_complaints")
    .select("*, student:student_id(full_name), room:room_id(hostel_block, room_number)")
    .order("created_at", { ascending: false });
  return { rooms: rooms || [], allocations: allocations || [], complaints: complaints || [] };
}

// ── Placements ──────────────────────────────────────────
export async function getPlacementDrives() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("placement_drives")
    .select("*")
    .order("drive_date", { ascending: true });
  return { data: data || [], error };
}

export async function getMyApplications(studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("placement_applications")
    .select("*, drive:drive_id(*)")
    .eq("student_id", studentId);
  return { data: data || [], error };
}

export async function applyToDrive(driveId: string, studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("placement_applications")
    .insert({ drive_id: driveId, student_id: studentId })
    .select()
    .single();
  return { data, error };
}

// ── Visitors ────────────────────────────────────────────
export async function getVisitors(status?: string) {
  const supabase = createClient();
  let query = supabase.from("visitors").select("*, approver:approved_by(full_name)");
  if (status) query = query.eq("status", status);
  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function checkInVisitor(visitor: {
  visitor_name: string;
  visitor_phone?: string;
  purpose: string;
  visiting_whom?: string;
  department?: string;
}) {
  const { data, error } = await supabase.from("visitors").insert(visitor).select().single();
  return { data, error };
}

export async function checkOutVisitor(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("visitors")
    .update({ status: "checked_out", check_out: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

// ── SOS Alerts ──────────────────────────────────────────
export async function triggerSOS(alert: {
  triggered_by: string;
  alert_type?: string;
  location?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
}) {
  const { data, error } = await supabase.from("sos_alerts").insert(alert).select().single();
  return { data, error };
}

export async function getSOSAlerts(status?: string) {
  const supabase = createClient();
  let query = supabase.from("sos_alerts").select("*, triggered_user:triggered_by(full_name, department, phone_number)");
  if (status) query = query.eq("status", status);
  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data || [], error };
}

// ── Safety Incidents ────────────────────────────────────
export async function reportIncident(incident: {
  reporter_id: string;
  incident_type: string;
  description?: string;
  location?: string;
  severity?: string;
  is_anonymous?: boolean;
}) {
  const { data, error } = await supabase.from("safety_incidents").insert(incident).select().single();
  return { data, error };
}

export async function getSafetyIncidents(role: string, userId?: string) {
  const supabase = createClient();
  let query = supabase.from("safety_incidents").select("*, reporter:reporter_id(full_name, department)");
  if (role === "student" && userId) query = query.eq("reporter_id", userId);
  const { data, error } = await query.order("reported_at", { ascending: false });
  return { data: data || [], error };
}

// ── Leave Requests ──────────────────────────────────────
export async function getLeaveRequests(role: string, userId: string) {
  const supabase = createClient();
  let query = supabase.from("leave_requests").select("*, student:student_id(full_name, department, year_of_study), reviewer:reviewed_by(full_name)");
  if (role === "student") query = query.eq("student_id", userId);
  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function submitLeaveRequest(leave: {
  student_id: string;
  reason: string;
  leave_type: string;
  start_date: string;
  end_date: string;
}) {
  const { data, error } = await supabase.from("leave_requests").insert(leave).select().single();
  return { data, error };
}

export async function reviewLeaveRequest(id: string, status: "approved" | "rejected", reviewedBy: string, notes?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("leave_requests")
    .update({ status, reviewed_by: reviewedBy, review_notes: notes })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

// ── Fees ────────────────────────────────────────────────
export async function getStudentFees(studentId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("fees")
    .select("*")
    .eq("student_id", studentId)
    .order("due_date", { ascending: true });
  return { data: data || [], error };
}

// ── Clubs ───────────────────────────────────────────────
export async function getClubs(recruitingOnly?: boolean) {
  const supabase = createClient();
  let query = supabase.from("clubs").select("*");
  if (recruitingOnly) query = query.eq("is_recruiting", true);
  const { data, error } = await query.order("name");
  return { data: data || [], error };
}

// ── Exam Schedule ───────────────────────────────────────
export async function getExamSchedule(department: string, yearOfStudy: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_schedule")
    .select("*")
    .eq("department", department)
    .eq("year_of_study", yearOfStudy)
    .order("exam_date")
    .order("start_time");
  return { data: data || [], error };
}

// ── Announcements ───────────────────────────────────────
export async function getAnnouncements(role?: string) {
  const supabase = createClient();
  let query = supabase.from("announcements").select("*, author:author_id(full_name, role)");
  if (role) {
    query = query.or(`target_role.eq.all,target_role.eq.${role}`);
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function createAnnouncement(announcement: {
  title: string;
  content?: string;
  author_id: string;
  target_role?: string;
  priority?: string;
}) {
  const { data, error } = await supabase.from("announcements").insert(announcement).select().single();
  return { data, error };
}

// ── Dashboard Stats ─────────────────────────────────────
export async function getAdminDashboardStats() {
  const supabase = createClient();
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
