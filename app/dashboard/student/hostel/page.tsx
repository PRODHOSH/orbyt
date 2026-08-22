"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Bed, Wrench, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getHostelAllocation, getHostelComplaints } from "@/lib/supabase-queries";

export default function HostelPage() {
  const [allocation, setAllocation] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: alloc } = await getHostelAllocation(user.id);
      const { data: comp } = await getHostelComplaints(user.id);
      setAllocation(alloc);
      setComplaints(comp);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Hostel</h1>
        <p className="text-muted-foreground text-sm mt-1">Your room allocation and hostel services.</p>
      </div>

      {allocation ? (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your Room</h3>
                <p className="text-sm text-muted-foreground">Academic Year {allocation.academic_year}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-xs text-muted-foreground">Block</p><p className="font-semibold">{allocation.room?.hostel_block}</p></div>
              <div><p className="text-xs text-muted-foreground">Room</p><p className="font-semibold">{allocation.room?.room_number}</p></div>
              <div><p className="text-xs text-muted-foreground">Floor</p><p className="font-semibold">{allocation.room?.floor}</p></div>
              <div><p className="text-xs text-muted-foreground">Type</p><p className="font-semibold capitalize">{allocation.room?.room_type}</p></div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card><CardContent className="py-12 text-center text-muted-foreground"><Bed className="h-8 w-8 mx-auto mb-2 opacity-40" />No hostel allocation found.</CardContent></Card>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3">Hostel Complaints</h2>
        {complaints.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No hostel complaints.</CardContent></Card>
        ) : (
          <div className="space-y-3">
            {complaints.map(c => (
              <Card key={c.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm capitalize">{c.issue_type}</p>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={c.status === "resolved" ? "bg-emerald-50 text-emerald-600" : "bg-yellow-50 text-yellow-600"}>{c.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
