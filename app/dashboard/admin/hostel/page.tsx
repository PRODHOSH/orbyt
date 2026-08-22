"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Wrench, Loader2 } from "lucide-react";
import { getAllHostelData } from "@/lib/supabase-queries";

export default function HostelMgmtPage() {
  const [data, setData] = useState<{ rooms: any[]; allocations: any[]; complaints: any[] }>({ rooms: [], allocations: [], complaints: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await getAllHostelData();
      setData(result);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  const occupiedRooms = data.allocations.length;
  const totalCapacity = data.rooms.reduce((a, r) => a + (r.capacity || 2), 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Hostel Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Room allocations, capacity, and maintenance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center"><Building2 className="h-5 w-5 text-blue-600" /></div>
          <div><p className="text-xs text-muted-foreground">Total Rooms</p><p className="text-xl font-bold">{data.rooms.length}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center"><Users className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-xs text-muted-foreground">Occupied</p><p className="text-xl font-bold">{occupiedRooms} / {totalCapacity}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center"><Wrench className="h-5 w-5 text-orange-600" /></div>
          <div><p className="text-xs text-muted-foreground">Open Complaints</p><p className="text-xl font-bold">{data.complaints.filter(c => c.status !== "resolved").length}</p></div>
        </CardContent></Card>
      </div>

      {/* Allocations */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Current Allocations</h2>
        {data.allocations.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No allocations found.</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {data.allocations.map(a => (
              <Card key={a.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{a.student?.full_name}</span>
                    <span className="text-xs text-muted-foreground">{a.student?.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{a.room?.hostel_block} — {a.room?.room_number}</Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600">{a.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Complaints */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Hostel Complaints</h2>
        {data.complaints.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No hostel complaints.</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {data.complaints.map(c => (
              <Card key={c.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm capitalize">{c.issue_type}</span>
                      <Badge variant="outline" className={c.status === "resolved" ? "bg-emerald-50 text-emerald-600" : "bg-yellow-50 text-yellow-600"}>{c.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{c.student?.full_name} — {c.room?.hostel_block} {c.room?.room_number}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
