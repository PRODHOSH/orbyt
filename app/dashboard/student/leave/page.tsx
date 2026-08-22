"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Plus, Calendar, Clock, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getLeaveRequests, submitLeaveRequest } from "@/lib/supabase-queries";
import { toast } from "sonner";

export default function LeavePage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);
    const { data } = await getLeaveRequests("student", user.id);
    setLeaves(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!reason.trim() || !leaveType || !startDate || !endDate) { toast.error("Fill all fields"); return; }
    const { error } = await submitLeaveRequest({ student_id: userId, reason, leave_type: leaveType, start_date: startDate, end_date: endDate });
    if (error) { toast.error("Failed to submit"); return; }
    toast.success("Leave request submitted");
    setOpen(false);
    setReason(""); setLeaveType(""); setStartDate(""); setEndDate("");
    load();
  };

  const statusColors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-700", approved: "bg-emerald-100 text-emerald-700", rejected: "bg-red-100 text-red-700" };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">Submit and track your leave applications.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-[#273E57] hover:bg-[#1a2939]" />}>
            <Plus className="h-4 w-4 mr-2" />Apply Leave
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Leave Application</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Select value={leaveType} onValueChange={(val) => setLeaveType(val || "")}>
                <SelectTrigger><SelectValue placeholder="Leave Type" /></SelectTrigger>
                <SelectContent>
                  {["sick","personal","family","event","other"].map(t => (
                    <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Start Date</label>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">End Date</label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <Textarea placeholder="Reason for leave..." value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />
              <Button onClick={handleSubmit} className="w-full bg-[#273E57]">Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {leaves.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">No leave requests.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {leaves.map(l => (
            <Card key={l.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="capitalize">{l.leave_type}</Badge>
                      <Badge variant="outline" className={statusColors[l.status]}>{l.status}</Badge>
                    </div>
                    <p className="text-sm mt-1">{l.reason}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{l.start_date} → {l.end_date}</span>
                      {l.reviewer?.full_name && <span>Reviewed by: {l.reviewer.full_name}</span>}
                    </div>
                    {l.review_notes && <p className="text-xs text-muted-foreground mt-1 italic">Note: {l.review_notes}</p>}
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
