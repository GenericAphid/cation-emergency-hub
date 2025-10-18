import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, AlertTriangle, Shield, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CrimeHotspotMap } from "@/components/CrimeHotspotMap";
import { useLocation } from "@/hooks/useLocation";

export function MapsScreen() {
  const { userLocation, isLoading } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  // Mock crime hotspots data for Mondeor area
  const crimeHotspots = [
    {
      id: "1",
      lat: -26.2785,
      lng: 27.9867,
      type: "burglary",
      severity: "high",
      incidents: 15,
      description: "Residential burglaries"
    },
    {
      id: "2", 
      lat: -26.2695,
      lng: 27.9920,
      type: "vehicle_theft",
      severity: "medium",
      incidents: 8,
      description: "Vehicle break-ins"
    },
    {
      id: "3",
      lat: -26.2850,
      lng: 27.9780,
      type: "robbery",
      severity: "high",
      incidents: 12,
      description: "Street robberies"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={24} />
              <h1 className="text-xl font-bold">Crime Hotspots</h1>
            </div>
            <Badge variant="secondary">
              <Navigation size={12} className="mr-1" />
              Mondeor
            </Badge>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search area or incident type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <CrimeHotspotMap 
          hotspots={crimeHotspots}
          userLocation={userLocation}
          onHotspotSelect={setSelectedIncident}
        />
        
        {/* Legend */}
        <Card className="absolute top-4 right-4 w-48 z-10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Crime Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Low Risk</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Panel - Hotspot Details */}
      <div className="p-4 bg-card border-t">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Recent Incidents in Area</h3>
          <div className="grid gap-2">
            {crimeHotspots.map((hotspot) => (
              <Card 
                key={hotspot.id} 
                className={`cursor-pointer transition-colors ${
                  selectedIncident === hotspot.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedIncident(hotspot.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle 
                        className={hotspot.severity === 'high' ? 'text-red-500' : 
                                  hotspot.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'} 
                        size={16} 
                      />
                      <div>
                        <div className="font-medium text-sm capitalize">
                          {hotspot.type.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {hotspot.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getSeverityColor(hotspot.severity)}>
                        {hotspot.incidents} incidents
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}