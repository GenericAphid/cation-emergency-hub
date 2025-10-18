import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, AlertTriangle } from "lucide-react";

interface CrimeHotspot {
  id: string;
  lat: number;
  lng: number;
  type: string;
  severity: string;
  incidents: number;
  description: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

interface CrimeHotspotMapProps {
  hotspots: CrimeHotspot[];
  userLocation?: UserLocation | null;
  onHotspotSelect: (id: string) => void;
}

export function CrimeHotspotMap({ hotspots, userLocation, onHotspotSelect }: CrimeHotspotMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Since we can't use Google Maps directly, we'll create a visual representation
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "#ef4444";
      case "medium": return "#f97316"; 
      case "low": return "#eab308";
      default: return "#6b7280";
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Grid overlay to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Roads simulation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-40"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-400 opacity-40"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-300 opacity-60"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-400 opacity-40"></div>
        </div>

        {/* User Location */}
        {userLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ 
              left: '50%', 
              top: '50%'
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>
        )}

        {/* Crime Hotspots */}
        {hotspots.map((hotspot, index) => (
          <div
            key={hotspot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{
              left: `${30 + (index * 15)}%`,
              top: `${25 + (index * 20)}%`
            }}
            onClick={() => onHotspotSelect(hotspot.id)}
          >
            <div className="relative group">
              {/* Hotspot marker */}
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: getSeverityColor(hotspot.severity) }}
              >
                <AlertTriangle size={12} className="text-white" />
              </div>
              
              {/* Radius circle */}
              <div 
                className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                style={{ 
                  backgroundColor: getSeverityColor(hotspot.severity),
                  width: '40px',
                  height: '40px',
                  left: '-7px',
                  top: '-7px'
                }}
              ></div>

              {/* Tooltip */}
              <Card className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                <CardContent className="p-2">
                  <div className="text-xs">
                    <div className="font-semibold capitalize">{hotspot.type.replace('_', ' ')}</div>
                    <div className="text-muted-foreground">{hotspot.description}</div>
                    <div className="text-orange-600 font-medium">{hotspot.incidents} incidents</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {/* Area Label */}
        <div className="absolute top-4 left-4 z-10">
          <Card className="bg-amber-50/90 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary" size={16} />
                <div>
                  <div className="font-semibold text-sm">Mondeor</div>
                  <div className="text-xs text-muted-foreground">Johannesburg South</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}