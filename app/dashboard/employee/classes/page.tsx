"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, MapPin, Users, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function MyClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const today = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
      const { data } = await supabase
        .from("timetable")
        .select("*")
        .eq("faculty_id", user.id)
        .eq("day_of_week", today)
        .order("start_time");
      setClasses(data || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">My Classes</h1>
        <p className="text-muted-foreground text-sm mt-1">Today&apos;s teaching schedule.</p>
      </div>

      {classes.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><GraduationCap className="h-8 w-8 mx-auto mb-2 opacity-40" />No classes scheduled today.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {classes.map(cls => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center gap-5">
                <div className="text-center min-w-[80px]">
                  <p className="text-lg font-bold text-[#273E57]">{cls.start_time?.slice(0, 5)}</p>
                  <p className="text-xs text-muted-foreground">{cls.end_time?.slice(0, 5)}</p>
                </div>
                <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1">
                  <h3 className="font-semibold">{cls.subject}</h3>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                    <span>{cls.department} — Year {cls.year_of_study}</span>
                    {cls.room && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{cls.room}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
