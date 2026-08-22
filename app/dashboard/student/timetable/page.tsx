"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getTimetable } from "@/lib/supabase-queries";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 0 : new Date().getDay() - 1);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const dept = user.user_metadata?.department || "Computer Science";
      const year = user.user_metadata?.year_of_study || 1;
      // Also check profile table
      const { data: profile } = await supabase.from("profiles").select("department, year_of_study").eq("id", user.id).single();
      const { data } = await getTimetable(profile?.department || dept, profile?.year_of_study || year);
      setTimetable(data);
      setLoading(false);
    };
    load();
  }, []);

  const dayClasses = timetable.filter(t => t.day_of_week === selectedDay);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Timetable</h1>
        <p className="text-muted-foreground text-sm mt-1">Your weekly class schedule.</p>
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedDay === i ? "bg-[#273E57] text-white shadow" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {dayClasses.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">No classes scheduled for {DAYS[selectedDay]}.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {dayClasses.map((cls, i) => (
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
                    {cls.room && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{cls.room}{cls.building ? `, ${cls.building}` : ""}</span>}
                    {cls.faculty?.full_name && <span className="flex items-center gap-1"><User className="h-3 w-3" />{cls.faculty.full_name}</span>}
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
