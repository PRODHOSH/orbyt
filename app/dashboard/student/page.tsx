"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, AlertTriangle, CheckCircle2, Clock, BookOpen, ShieldAlert, Sparkles, Target, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getAttendanceSummary, getTimetable, getLeaveRequests, getStudentFees, getSOSAlerts, getAnnouncements, getClubs } from "@/lib/supabase-queries";
import Link from "next/link";
import { format } from "date-fns";

export default function StudentDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      
      const [
        { data: attendanceData },
        { data: timetableData },
        { data: leaves },
        { data: fees },
        { data: sos },
        { data: announcements },
        { data: clubs }
      ] = await Promise.all([
        getAttendanceSummary(user.id),
        getTimetable(profile?.department || 'Computer Science', profile?.year_of_study || 3),
        getLeaveRequests('student', user.id),
        getStudentFees(user.id),
        getSOSAlerts('active'),
        getAnnouncements('student'),
        getClubs(true)
      ]);

      const overallAttendance = attendanceData && attendanceData.length > 0
        ? Math.round(attendanceData.reduce((a, s) => a + s.percentage, 0) / attendanceData.length)
        : 0;

      // Find next class today
      const today = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Mon in our DB
      const nextClass = timetableData?.find(c => c.day_of_week === today && c.start_time > new Date().toTimeString().slice(0,8)) || timetableData?.[0];

      const pendingTasks = (leaves?.filter(l => l.status === 'pending').length || 0) + (fees?.filter(f => f.status === 'pending').length || 0);

      setData({
        overallAttendance,
        nextClass,
        pendingTasks,
        pendingLeaves: leaves?.filter(l => l.status === 'pending').length || 0,
        pendingFees: fees?.filter(f => f.status === 'pending').length || 0,
        sos: sos?.slice(0, 1), // Get top 1 active alert
        announcements: announcements?.slice(0, 3), // Top 3
        clubs: clubs?.slice(0, 2)
      });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sora text-slate-900 dark:text-white tracking-tight">Student Overview</h1>
        <p className="text-muted-foreground mt-1">Here is what is happening across your campus today.</p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className={data?.overallAttendance >= 75 ? "border-l-4 border-l-blue-500" : "border-l-4 border-l-red-500"}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              {data?.overallAttendance >= 75 ? <CheckCircle2 className="h-4 w-4 text-blue-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.overallAttendance}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {data?.overallAttendance >= 75 ? "You are safely above the 75% threshold." : "Warning: Below 75% threshold."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Class</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{data?.nextClass?.subject || "No more classes"}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {data?.nextClass ? `${data.nextClass.start_time.slice(0,5)} • ${data.nextClass.room}, ${data.nextClass.building}` : "Free for the day"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.pendingTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {data?.pendingLeaves} leaves pending, {data?.pendingFees} fee dues
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-red-50 dark:bg-red-950/20 border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">Campus Safety</CardTitle>
              <ShieldAlert className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/student/safety">
                <Button variant="destructive" className="w-full mt-2 font-bold shadow-lg shadow-red-500/20">
                  Trigger SOS Alert
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Opportunities & Clubs
              </CardTitle>
              <CardDescription>Clubs currently recruiting across the campus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.clubs?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No clubs are actively recruiting right now.</p>
              ) : (
                data?.clubs?.map((club: any) => (
                  <div key={club.id} className="flex items-start justify-between p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{club.name}</h3>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Actively Recruiting</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{club.recruitment_description || club.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        {club.recruitment_deadline && <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> Closes {format(new Date(club.recruitment_deadline), "MMM d")}</span>}
                        <span className="flex items-center gap-1"><Target className="h-3 w-3"/> {club.category || 'General'}</span>
                      </div>
                    </div>
                    <Button size="sm">Apply Now</Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.announcements?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No new announcements.</p>
              ) : (
                data?.announcements?.map((announcement: any) => (
                  <div key={announcement.id} className="border-l-2 border-[#273E57] pl-3 py-1">
                    <p className="text-sm font-medium">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{format(new Date(announcement.created_at), "MMM d, h:mm a")} • {announcement.author?.full_name || 'Admin'}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          
          {data?.sos?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Active Safety Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                  <strong>Caution ({data.sos[0].alert_type}):</strong> {data.sos[0].location || data.sos[0].description || "An emergency was reported nearby."}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
