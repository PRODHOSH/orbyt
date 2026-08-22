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
import { ShieldAlert, AlertTriangle, Plus, MapPin, Clock, Loader2, Siren } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { triggerSOS, reportIncident, getSafetyIncidents, getSOSAlerts } from "@/lib/supabase-queries";
import { toast } from "sonner";

export default function SafetyPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const r = user.user_metadata?.role || "student";
    setRole(r);
    setUserId(user.id);
    const { data } = await getSafetyIncidents(r, user.id);
    setIncidents(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSOS = async () => {
    setSosTriggered(true);
    const { error } = await triggerSOS({ triggered_by: userId, alert_type: "emergency", location: "Auto-detected" });
    if (error) { toast.error("Failed to trigger SOS"); setSosTriggered(false); return; }
    toast.success("🚨 SOS Alert Sent! Help is on the way.");
    setTimeout(() => setSosTriggered(false), 5000);
  };

  const handleReport = async () => {
    if (!incidentType || !description.trim()) { toast.error("Fill required fields"); return; }
    const { error } = await reportIncident({ reporter_id: userId, incident_type: incidentType, description, location });
    if (error) { toast.error("Failed to report"); return; }
    toast.success("Incident reported successfully");
    setReportOpen(false);
    setIncidentType(""); setDescription(""); setLocation("");
    load();
  };

  const severityColors: Record<string, string> = { low: "bg-slate-100 text-slate-600", medium: "bg-yellow-100 text-yellow-700", high: "bg-orange-100 text-orange-700", critical: "bg-red-100 text-red-700" };
  const statusColors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-700", investigating: "bg-blue-100 text-blue-700", resolved: "bg-emerald-100 text-emerald-700" };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight">Campus Safety</h1>
          <p className="text-muted-foreground text-sm mt-1">Report incidents and trigger emergency alerts.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={reportOpen} onOpenChange={setReportOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Plus className="h-4 w-4 mr-2" />Report Incident
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Report Safety Incident</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <Select value={incidentType} onValueChange={(val) => setIncidentType(val || "")}>
                  <SelectTrigger><SelectValue placeholder="Incident Type" /></SelectTrigger>
                  <SelectContent>
                    {["harassment","theft","vandalism","accident","fire","medical","suspicious_activity","infrastructure","other"].map(t => (
                      <SelectItem key={t} value={t}>{t.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Location (optional)" value={location} onChange={(e) => setLocation(e.target.value)} />
                <Textarea placeholder="Describe what happened..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                <Button onClick={handleReport} className="w-full bg-[#273E57]">Submit Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* SOS Button */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Siren className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Emergency SOS</h3>
                <p className="text-sm text-red-600/70 dark:text-red-400/60">Immediately alerts campus security and administration.</p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="lg" 
              onClick={handleSOS} 
              disabled={sosTriggered}
              className="font-bold px-8 shadow-lg shadow-red-500/30 text-base"
            >
              {sosTriggered ? "ALERT SENT ✓" : "TRIGGER SOS"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Incidents List */}
      <div>
        <h2 className="text-lg font-semibold mb-3">{role === "student" ? "My Reports" : "All Incidents"}</h2>
        {loading ? (
          <div className="text-center py-20"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>
        ) : incidents.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No incidents reported.</CardContent></Card>
        ) : (
          <div className="space-y-3">
            {incidents.map((inc, i) => (
              <motion.div key={inc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="font-semibold text-sm capitalize">{inc.incident_type.replace("_", " ")}</span>
                          <Badge variant="outline" className={severityColors[inc.severity]}>{inc.severity}</Badge>
                          <Badge variant="outline" className={statusColors[inc.status]}>{inc.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{inc.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          {inc.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{inc.location}</span>}
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(inc.reported_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
