"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareWarning, Clock, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getComplaints, updateComplaintStatus } from "@/lib/supabase-queries";
import { toast } from "sonner";

export default function EmployeeComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await getComplaints(user.id, "employee");
    setComplaints(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id: string, status: string) => {
    await updateComplaintStatus(id, status);
    toast.success(`Complaint ${status}`);
    load();
  };

  const statusColors: Record<string, string> = { open: "bg-yellow-100 text-yellow-700", in_progress: "bg-blue-100 text-blue-700", resolved: "bg-emerald-100 text-emerald-700" };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Assigned Complaints</h1>
        <p className="text-muted-foreground text-sm mt-1">Complaints routed to you for resolution.</p>
      </div>

      {complaints.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><MessageSquareWarning className="h-8 w-8 mx-auto mb-2 opacity-40" />No complaints assigned to you.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {complaints.map(c => (
            <Card key={c.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{c.subject}</h3>
                      <Badge variant="outline" className={statusColors[c.status]}>{c.status.replace("_", " ")}</Badge>
                      <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{c.is_anonymous ? "Anonymous" : c.submitter?.full_name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {c.status !== "resolved" && (
                    <div className="flex gap-2 ml-4">
                      {c.status === "open" && <Button size="sm" variant="outline" onClick={() => handleStatus(c.id, "in_progress")}>Investigate</Button>}
                      <Button size="sm" onClick={() => handleStatus(c.id, "resolved")} className="bg-emerald-600 hover:bg-emerald-700">Resolve</Button>
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
