"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, AlertTriangle, CheckCircle2, Clock, BookOpen, ShieldAlert, Sparkles, Target } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sora text-slate-900 dark:text-white tracking-tight">Student Overview</h1>
        <p className="text-muted-foreground mt-1">Here is what is happening across your campus today.</p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84.5%</div>
              <p className="text-xs text-muted-foreground mt-1">You are safely above the 75% threshold.</p>
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
              <div className="text-xl font-bold">Data Structures</div>
              <p className="text-xs text-muted-foreground mt-1">In 15 mins • Room 402, Block B</p>
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
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 assignments, 1 fee payment</p>
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
              <Button variant="destructive" className="w-full mt-2 font-bold shadow-lg shadow-red-500/20">
                Trigger SOS Alert
              </Button>
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
                AI-Curated Opportunities
              </CardTitle>
              <CardDescription>Based on your Python and ML skills, ORBYT found these for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">AI/ML Internship Recruitment</h3>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">94% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Microsoft Innovations Club is looking for ML engineers.</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> Closes in 2 days</span>
                    <span className="flex items-center gap-1"><Target className="h-3 w-3"/> Technical Dept</span>
                  </div>
                </div>
                <Button size="sm">Apply Now</Button>
              </div>

              <div className="flex items-start justify-between p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Campus Hackathon 2026</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">82% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Build innovative campus solutions over 48 hours.</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> Oct 15-17</span>
                    <span className="flex items-center gap-1"><Target className="h-3 w-3"/> Open to All</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">Learn More</Button>
              </div>
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
              <div className="border-l-2 border-[#273E57] pl-3 py-1">
                <p className="text-sm font-medium">Hostel fee payment deadline extended</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago • Administration</p>
              </div>
              <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-3 py-1">
                <p className="text-sm font-medium">Library operating hours updated for exams</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday • Chief Librarian</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Active Safety Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                <strong>Caution:</strong> Maintenance work near Block C entrance. Please use the alternative route via Block B.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
