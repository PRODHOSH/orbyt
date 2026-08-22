"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, MapPin, Phone, Loader2, Navigation } from "lucide-react";
import { getTransportRoutes } from "@/lib/supabase-queries";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import dynamic from "next/dynamic";

const TransportMap = dynamic(() => import("@/components/TransportMap"), { 
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
});

export default function TransportPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await getTransportRoutes();
      setRoutes(data);
      if (data && data.length > 0) {
        setSelectedRoute(data[0].id);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  const currentRouteData = routes.find(r => r.id === selectedRoute);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-sora tracking-tight">Transport & Live Tracking</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your campus bus routes in real-time.</p>
      </div>

      {routes.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground"><Bus className="h-8 w-8 mx-auto mb-2 opacity-40" />No transport routes configured yet.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {routes.map(route => (
              <Card 
                key={route.id} 
                className={cn(
                  "hover:shadow-md transition-all cursor-pointer border-2",
                  selectedRoute === route.id ? "border-blue-500 shadow-blue-500/10" : "border-transparent"
                )}
                onClick={() => setSelectedRoute(route.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", selectedRoute === route.id ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400")}>
                          <Bus className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm leading-tight">{route.route_name}</h3>
                          <p className="text-xs text-muted-foreground">{route.vehicle_number || `Bus #${route.bus_number}`}</p>
                        </div>
                      </div>
                    </div>
                    {route.driver_name && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 border-t pt-2">
                        <Phone className="h-3 w-3" />
                        {route.driver_name} {route.driver_phone && `(${route.driver_phone})`}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-2">
            <Card className="overflow-hidden h-[500px] flex flex-col relative border-2 border-slate-200 dark:border-slate-800">
              <CardHeader className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b z-20 absolute top-0 w-full">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2"><Navigation className="h-4 w-4 text-blue-500" /> Live GPS Tracker</span>
                  <div className="flex items-center gap-2 text-xs font-normal">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Data
                  </div>
                </CardTitle>
              </CardHeader>

              <div className="flex-1 relative bg-slate-100 dark:bg-slate-950 w-full h-full overflow-hidden pt-[60px]">
                <TransportMap route={currentRouteData} />
                
                {/* Traffic overlay indicator */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border text-xs space-y-2 pointer-events-none">
                  <div className="font-semibold mb-1">Route Status</div>
                  <div className="flex items-center gap-2"><span className="w-8 h-1.5 rounded-full bg-emerald-500"></span> Normal Traffic</div>
                  <div className="flex items-center gap-2"><span className="w-8 h-1.5 rounded-full bg-amber-500"></span> Moderate Delay</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
