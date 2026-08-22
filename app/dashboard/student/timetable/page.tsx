"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, User, Loader2, Calendar as CalendarIcon, List } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getTimetable } from "@/lib/supabase-queries";
import { motion } from "framer-motion";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 0 : new Date().getDay() - 1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data: profile } = await supabase.from("profiles").select("department, year_of_study").eq("id", user.id).single();
      const dept = profile?.department || user.user_metadata?.department || "Computer Science";
      const year = profile?.year_of_study || user.user_metadata?.year_of_study || 3;
      
      const { data } = await getTimetable(dept, year);
      setTimetable(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const dayClasses = timetable.filter(t => t.day_of_week === selectedDay).sort((a, b) => a.start_time?.localeCompare(b.start_time));

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-[#273E57]" /></div>;

  const renderGridView = () => {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[900px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="p-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 dark:border-slate-800">Time</div>
            {DAYS.map((day) => (
              <div key={day} className="p-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-r border-slate-200 dark:border-slate-800 last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Time Slots */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {TIME_SLOTS.map((time) => (
              <div key={time} className="grid grid-cols-7 group">
                <div className="p-3 text-center text-xs font-medium text-slate-500 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center">
                  {time}
                </div>
                {DAYS.map((day, dayIndex) => {
                  const hour = parseInt(time.split(":")[0]);
                  const classesInSlot = timetable.filter(t => {
                    if (t.day_of_week !== dayIndex || !t.start_time) return false;
                    const tHour = parseInt(t.start_time.split(":")[0]);
                    return tHour === hour;
                  });

                  return (
                    <div key={`${day}-${time}`} className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-r-0 min-h-[100px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors relative">
                      {classesInSlot.map((cls, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          key={idx} 
                          className={`mb-2 p-2 rounded-lg text-xs shadow-sm border ${cls.type === 'Lab' ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' : 'bg-slate-100 border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                        >
                          <div className="font-bold truncate" title={cls.subject}>{cls.subject}</div>
                          <div className="mt-1 opacity-80 flex items-center gap-1 text-[10px]">
                            <MapPin className="h-3 w-3" /> {cls.room}
                          </div>
                          <div className="mt-0.5 opacity-80 text-[10px]">
                            {cls.start_time?.slice(0,5)} - {cls.end_time?.slice(0,5)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="space-y-4">
        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedDay === i ? "bg-[#273E57] text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {dayClasses.length === 0 ? (
          <Card className="border-dashed bg-transparent shadow-none"><CardContent className="py-20 flex flex-col items-center justify-center text-slate-400"><CalendarIcon className="h-10 w-10 mb-3 opacity-20" /><p>No classes scheduled for {DAYS[selectedDay]}.</p></CardContent></Card>
        ) : (
          <div className="grid gap-3">
            {dayClasses.map((cls, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={cls.id}
              >
                <Card className="hover:shadow-md transition-all border-slate-200 dark:border-slate-800 overflow-hidden group">
                  <div className={`h-1 w-full ${cls.type === 'Lab' ? 'bg-blue-500' : 'bg-[#273E57]'}`} />
                  <CardContent className="p-0 flex">
                    <div className="p-5 flex flex-col items-center justify-center min-w-[100px] border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                      <p className="text-lg font-bold text-[#273E57] dark:text-white">{cls.start_time?.slice(0, 5)}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">{cls.end_time?.slice(0, 5)}</p>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-base">{cls.subject}</h3>
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {cls.type || 'Lecture'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {cls.room && <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" />{cls.room}{cls.building ? `, ${cls.building}` : ""}</span>}
                        {cls.faculty?.full_name && <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-slate-400" />{cls.faculty.full_name}</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight text-slate-900 dark:text-white">Timetable</h1>
          <p className="text-slate-500 text-sm mt-1">Your weekly class and lab schedule.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
          <button 
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <CalendarIcon className="h-4 w-4" /> Grid
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <List className="h-4 w-4" /> List
          </button>
        </div>
      </div>

      {viewMode === "grid" ? renderGridView() : renderListView()}
    </div>
  );
}
