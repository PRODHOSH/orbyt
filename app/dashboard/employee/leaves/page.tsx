"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Calendar, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getLeaveRequests, reviewLeaveRequest } from "@/lib/supabase-queries";
import { toast } from "sonner";

export default function LeaveApprovalsPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);
    const { data } = await getLeaveRequests("employee", user.id);
    setLeaves(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleReview = async (id: string, status: "approved" | "rejected") => {
    await reviewLeaveRequest(id, status, userId);
    toast.success(`Leave ${status}`);
    load();
  };

  const statusColors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-700", approved: "bg-emerald-100 text-emerald-700", rejected: "bg-red-100 text-red-700" };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Leave Approvals</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage student leave requests.</p>
      </div>

      {leaves.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-40" />No pending leave requests.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {leaves.map(l => (
            <Card key={l.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{l.student?.full_name || "Student"}</h3>
                      <Badge variant="outline" className="capitalize text-[10px]">{l.leave_type}</Badge>
                      <Badge variant="outline" className={statusColors[l.status]}>{l.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{l.reason}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{l.start_date} → {l.end_date}</span>
                      {l.student?.department && <span>{l.student.department} — Year {l.student.year_of_study}</span>}
                    </div>
                  </div>
                  {l.status === "pending" && (
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" onClick={() => handleReview(l.id, "approved")} className="bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle2 className="h-4 w-4 mr-1" />Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleReview(l.id, "rejected")} className="text-red-600 border-red-200 hover:bg-red-50">
                        <XCircle className="h-4 w-4 mr-1" />Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
