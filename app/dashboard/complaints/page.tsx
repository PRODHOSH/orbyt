"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquareWarning, Plus, Clock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getComplaints, submitComplaint, updateComplaintStatus } from "@/lib/supabase-queries";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-emerald-100 text-emerald-700",
  dismissed: "bg-slate-100 text-slate-500",
};

const priorityColors: Record<string, string> = {
  low: "border-slate-200",
  medium: "border-yellow-300",
  high: "border-orange-400",
  critical: "border-red-500",
};

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const load = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const r = user.user_metadata?.role || "student";
    setRole(r);
    setUserId(user.id);
    const { data } = await getComplaints(user.id, r);
    setComplaints(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!category || !subject.trim() || !description.trim()) { toast.error("Fill all fields"); return; }
    const { error } = await submitComplaint({ submitted_by: userId, category, subject, description, is_anonymous: isAnonymous });
    if (error) { toast.error("Failed to submit"); return; }
    toast.success("Complaint submitted");
    setOpen(false);
    setCategory(""); setSubject(""); setDescription("");
    load();
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateComplaintStatus(id, status);
    toast.success(`Complaint ${status}`);
    load();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight">Complaints</h1>
          <p className="text-muted-foreground text-sm mt-1">Submit and track your campus complaints.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-[#273E57] hover:bg-[#1a2939]" />}>
            <Plus className="h-4 w-4 mr-2" />File Complaint
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Complaint</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Select value={category} onValueChange={(val) => setCategory(val || "")}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {["academic","hostel","transport","infrastructure","harassment","ragging","faculty","other"].map(c => (
                    <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <Textarea placeholder="Describe the issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="rounded" />
                Submit anonymously
              </label>
              <Button onClick={handleSubmit} className="w-full bg-[#273E57]">Submit Complaint</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
      ) : complaints.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">No complaints found. That&apos;s good news!</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {complaints.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className={`border-l-4 ${priorityColors[c.priority] || ""}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{c.subject}</h3>
                        <Badge variant="outline" className={statusColors[c.status]}>{c.status.replace("_", " ")}</Badge>
                        <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        {c.submitter && <span>{c.is_anonymous ? "Anonymous" : c.submitter.full_name}</span>}
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {role === "admin" && c.status === "open" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(c.id, "in_progress")}>Investigate</Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(c.id, "resolved")}>Resolve</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
