"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, DollarSign, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getPlacementDrives, getMyApplications, applyToDrive } from "@/lib/supabase-queries";
import { toast } from "sonner";

export default function PlacementsPage() {
  const [drives, setDrives] = useState<any[]>([]);
  const [myApps, setMyApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);
    const [{ data: d }, { data: a }] = await Promise.all([getPlacementDrives(), getMyApplications(user.id)]);
    setDrives(d);
    setMyApps(a);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const hasApplied = (driveId: string) => myApps.some(a => a.drive_id === driveId);

  const handleApply = async (driveId: string) => {
    const { error } = await applyToDrive(driveId, userId);
    if (error) { toast.error("Failed to apply"); return; }
    toast.success("Application submitted!");
    load();
  };

  const statusColors: Record<string, string> = { upcoming: "bg-blue-100 text-blue-700", ongoing: "bg-emerald-100 text-emerald-700", completed: "bg-slate-100 text-slate-600" };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Placements</h1>
        <p className="text-muted-foreground text-sm mt-1">Upcoming placement drives and your applications.</p>
      </div>

      {drives.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><Briefcase className="h-8 w-8 mx-auto mb-2 opacity-40" />No placement drives scheduled.</CardContent></Card>
      ) : (
        <div className="space-y-4">
          {drives.map(drive => (
            <Card key={drive.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{drive.company_name}</h3>
                      <Badge variant="outline" className={statusColors[drive.status]}>{drive.status}</Badge>
                    </div>
                    <p className="text-sm font-medium text-[#273E57]">{drive.role_title}</p>
                    {drive.description && <p className="text-sm text-muted-foreground mt-1">{drive.description}</p>}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      {drive.package_lpa && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{drive.package_lpa} LPA</span>}
                      {drive.drive_date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(drive.drive_date).toLocaleDateString()}</span>}
                      {drive.registration_deadline && <span>Deadline: {new Date(drive.registration_deadline).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div>
                    {hasApplied(drive.id) ? (
                      <Badge className="bg-emerald-100 text-emerald-700"><CheckCircle2 className="h-3 w-3 mr-1" />Applied</Badge>
                    ) : drive.status === "upcoming" ? (
                      <Button size="sm" onClick={() => handleApply(drive.id)} className="bg-[#273E57]">Apply</Button>
                    ) : null}
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
