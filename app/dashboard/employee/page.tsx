"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, FileText, Bell, Clock, Building2, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sora text-slate-900 dark:text-white tracking-tight">Faculty Portal</h1>
          <p className="text-muted-foreground mt-1">Manage your schedule, approvals, and students.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students, IDs..." className="pl-9" />
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">First class at 9:00 AM</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <FileText className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">Leave requests and permissions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <Bell className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">From HOD and Administration</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Column */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#273E57]" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes and meetings for today.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-right text-slate-500 pt-1">09:00</div>
              <div className="flex-1 p-3 rounded-lg border border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/20">
                <h4 className="font-semibold">Data Structures (CS-A)</h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Room 402</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 60 Students</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-right text-slate-500 pt-1">11:30</div>
              <div className="flex-1 p-3 rounded-lg border border-l-4 border-l-purple-500 bg-purple-50/30 dark:bg-purple-950/20">
                <h4 className="font-semibold">Department Meeting</h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> Block A, Conference Room</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-right text-slate-500 pt-1">14:00</div>
              <div className="flex-1 p-3 rounded-lg border border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/20">
                <h4 className="font-semibold">DBMS Lab (CS-B)</h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Lab 3</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 30 Students</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approvals Column */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#273E57]" />
              Action Required
            </CardTitle>
            <CardDescription>Pending requests from your assigned students.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border">
              <div>
                <h4 className="font-medium text-sm">Medical Leave Request</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Rahul Kumar (CS-A) • 2 days</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border">
              <div>
                <h4 className="font-medium text-sm">Event Permission</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Tech Club • Workshop Organization</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>

            <Button variant="ghost" className="w-full text-sm text-[#273E57]">View All 12 Requests</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
