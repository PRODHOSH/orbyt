"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, TrendingUp, TrendingDown, AlertTriangle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getAttendanceSummary } from "@/lib/supabase-queries";

export default function AttendancePage() {
  const [summary, setSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await getAttendanceSummary(user.id);
      setSummary(data);
      setLoading(false);
    };
    load();
  }, []);

  const overall = summary.length > 0
    ? Math.round(summary.reduce((a, s) => a + s.percentage, 0) / summary.length)
    : 0;

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Attendance</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your subject-wise attendance.</p>
      </div>

      {/* Overall Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Overall Attendance</p>
            <p className="text-4xl font-bold mt-1">{overall}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {overall >= 75 ? "✓ Above minimum threshold" : "⚠ Below 75% — risk of debarment"}
            </p>
          </div>
          <div className="h-20 w-20 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise */}
      {summary.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">No attendance records found. Your institution may not have synced data yet.</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {summary.map((s) => (
            <Card key={s.subject}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-sm">{s.subject}</h3>
                    {s.percentage < 75 && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-[10px]"><AlertTriangle className="h-3 w-3 mr-1" />At Risk</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{s.percentage}%</span>
                    {s.percentage >= 75 ? <TrendingUp className="h-4 w-4 text-emerald-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
                <Progress value={s.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{s.present} / {s.total} classes attended</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
