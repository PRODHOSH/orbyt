"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserCheck, Plus, Clock, LogIn, LogOut, Loader2 } from "lucide-react";
import { getVisitors, checkInVisitor, checkOutVisitor } from "@/lib/supabase-queries";
import { toast } from "sonner";

export default function VisitorManagementPage() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visiting, setVisiting] = useState("");

  const load = async () => {
    const { data } = await getVisitors();
    setVisitors(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCheckIn = async () => {
    if (!name.trim() || !purpose.trim()) { toast.error("Name and purpose required"); return; }
    const { error } = await checkInVisitor({ visitor_name: name, visitor_phone: phone, purpose, visiting_whom: visiting });
    if (error) { toast.error("Failed to check in"); return; }
    toast.success("Visitor checked in");
    setOpen(false);
    setName(""); setPhone(""); setPurpose(""); setVisiting("");
    load();
  };

  const handleCheckOut = async (id: string) => {
    await checkOutVisitor(id);
    toast.success("Visitor checked out");
    load();
  };

  const statusColors: Record<string, string> = { checked_in: "bg-emerald-100 text-emerald-700", checked_out: "bg-slate-100 text-slate-600", pending: "bg-yellow-100 text-yellow-700" };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight">Visitor Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Track campus visitor check-in/out.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-[#273E57] hover:bg-[#1a2939]" />}>
            <Plus className="h-4 w-4 mr-2" />Check In Visitor
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Visitor Check-In</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Visitor Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Purpose of Visit" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
              <Input placeholder="Visiting Whom" value={visiting} onChange={(e) => setVisiting(e.target.value)} />
              <Button onClick={handleCheckIn} className="w-full bg-[#273E57]">Check In</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {visitors.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><UserCheck className="h-8 w-8 mx-auto mb-2 opacity-40" />No visitors logged.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {visitors.map(v => (
            <Card key={v.id}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{v.visitor_name}</h3>
                      <Badge variant="outline" className={statusColors[v.status]}>{v.status.replace("_", " ")}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{v.purpose}</span>
                      {v.visiting_whom && <span>→ {v.visiting_whom}</span>}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(v.check_in).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                {v.status === "checked_in" && (
                  <Button size="sm" variant="outline" onClick={() => handleCheckOut(v.id)}>
                    <LogOut className="h-4 w-4 mr-1" />Check Out
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
