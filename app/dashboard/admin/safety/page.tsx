"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle, Siren, MapPin, Clock, Loader2 } from "lucide-react";
import { getSafetyIncidents, getSOSAlerts } from "@/lib/supabase-queries";
import { createClient } from "@/utils/supabase/client";

export default function SafetyMonitorPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: inc }, { data: sos }] = await Promise.all([
        getSafetyIncidents("admin"),
        getSOSAlerts(),
      ]);
      setIncidents(inc);
      setAlerts(sos);
      setLoading(false);
    };
    load();
  }, []);

  const severityColors: Record<string, string> = { low: "bg-slate-100 text-slate-600", medium: "bg-yellow-100 text-yellow-700", high: "bg-orange-100 text-orange-700", critical: "bg-red-100 text-red-700" };
  const statusColors: Record<string, string> = { active: "bg-red-100 text-red-700", responding: "bg-blue-100 text-blue-700", resolved: "bg-emerald-100 text-emerald-700", pending: "bg-yellow-100 text-yellow-700", investigating: "bg-blue-100 text-blue-700" };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  const activeAlerts = alerts.filter(a => a.status === "active");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Safety Monitor</h1>
        <p className="text-muted-foreground text-sm mt-1">Campus-wide safety incidents and SOS alerts.</p>
      </div>

      {/* Active SOS Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-red-600 flex items-center gap-2"><Siren className="h-5 w-5" />Active SOS Alerts ({activeAlerts.length})</h2>
          {activeAlerts.map(a => (
            <Card key={a.id} className="border-red-200 bg-red-50/50 dark:bg-red-950/10">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Siren className="h-4 w-4 text-red-600" />
                      <span className="font-bold text-red-700 text-sm capitalize">{a.alert_type} Alert</span>
                      <Badge variant="outline" className={statusColors[a.status]}>{a.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{a.triggered_user?.full_name} — {a.triggered_user?.department}</p>
                    {a.triggered_user?.phone_number && <p className="text-xs text-muted-foreground mt-1">📞 {a.triggered_user.phone_number}</p>}
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {a.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.location}</span>}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(a.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">Respond</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* All Incidents */}
      <div>
        <h2 className="text-lg font-semibold mb-3">All Incidents ({incidents.length})</h2>
        {incidents.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No incidents reported.</CardContent></Card>
        ) : (
          <div className="space-y-3">
            {incidents.map(inc => (
              <Card key={inc.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-sm capitalize">{inc.incident_type.replace("_", " ")}</span>
                        <Badge variant="outline" className={severityColors[inc.severity]}>{inc.severity}</Badge>
                        <Badge variant="outline" className={statusColors[inc.status]}>{inc.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{inc.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{inc.is_anonymous ? "Anonymous" : inc.reporter?.full_name}</span>
                        {inc.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{inc.location}</span>}
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(inc.reported_at).toLocaleString()}</span>
                      </div>
                    </div>
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
