"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bus, Plus, Phone, MapPin, Loader2 } from "lucide-react";
import { getTransportRoutes } from "@/lib/supabase-queries";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function TransportMgmtPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");

  const load = async () => {
    const { data } = await getTransportRoutes();
    setRoutes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!routeName.trim() || !busNumber.trim()) { toast.error("Route name and bus number required"); return; }
    const supabase = createClient();
    const { error } = await supabase.from("transport_routes").insert({
      route_name: routeName, bus_number: busNumber, driver_name: driverName, driver_phone: driverPhone, stops: [],
    });
    if (error) { toast.error("Failed to add route"); return; }
    toast.success("Route added");
    setOpen(false);
    setRouteName(""); setBusNumber(""); setDriverName(""); setDriverPhone("");
    load();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight">Transport Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage campus bus routes.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-[#273E57] hover:bg-[#1a2939]" />}>
            <Plus className="h-4 w-4 mr-2" />Add Route
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Route</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Route Name" value={routeName} onChange={(e) => setRouteName(e.target.value)} />
              <Input placeholder="Bus Number" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} />
              <Input placeholder="Driver Name" value={driverName} onChange={(e) => setDriverName(e.target.value)} />
              <Input placeholder="Driver Phone" value={driverPhone} onChange={(e) => setDriverPhone(e.target.value)} />
              <Button onClick={handleAdd} className="w-full bg-[#273E57]">Add Route</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {routes.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><Bus className="h-8 w-8 mx-auto mb-2 opacity-40" />No routes configured.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {routes.map(r => (
            <Card key={r.id}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#273E57]/10 flex items-center justify-center"><Bus className="h-5 w-5 text-[#273E57]" /></div>
                  <div>
                    <h3 className="font-semibold text-sm">{r.route_name}</h3>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span>Bus #{r.bus_number}</span>
                      {r.driver_name && <span>{r.driver_name}</span>}
                      {r.driver_phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{r.driver_phone}</span>}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={r.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"}>
                  {r.is_active ? "Active" : "Inactive"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
