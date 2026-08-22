"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Bus } from "lucide-react";

// Fix Leaflet's default icon path issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// A custom bus icon using raw HTML
const busIcon = new L.DivIcon({
  html: `<div style="background-color: #2563eb; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(37,99,235,0.6); border: 2px solid white;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  className: "custom-bus-icon bg-transparent border-none",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

export default function TransportMap({ route }: { route: any }) {
  // Simulated campus bounds for the map
  const position: [number, number] = [13.011, 80.235]; // IIT Madras roughly

  // Simulated path points for the route
  const pathCoordinates: [number, number][] = [
    [13.012, 80.234], // Campus North
    [13.008, 80.236], // City Center
    [13.009, 80.240], // Metro Station
    [13.015, 80.245], // Tech Park
  ];

  // Simulated bus location moving along the path (hardcoded for demo)
  const currentBusLocation: [number, number] = [13.0085, 80.238];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Draw the route path */}
        <Polyline positions={pathCoordinates} color="#3b82f6" weight={5} opacity={0.7} dashArray="10, 10" />
        
        {/* Draw stops */}
        <Marker position={pathCoordinates[0]}>
          <Popup><strong>Campus North</strong><br/>Stop 1</Popup>
        </Marker>
        <Marker position={pathCoordinates[1]}>
          <Popup><strong>City Center</strong><br/>Stop 2</Popup>
        </Marker>
        <Marker position={pathCoordinates[2]}>
          <Popup><strong>Metro Station</strong><br/>Stop 3</Popup>
        </Marker>
        <Marker position={pathCoordinates[3]}>
          <Popup><strong>Tech Park</strong><br/>Stop 4</Popup>
        </Marker>

        {/* Draw the bus */}
        <Marker position={currentBusLocation} icon={busIcon}>
          <Popup>
            <div className="font-bold">{route?.route_name || "Bus Route"}</div>
            <div className="text-xs text-muted-foreground">{route?.vehicle_number || "Live Tracking"}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
