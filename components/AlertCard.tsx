import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import type { SecurityAlert } from "@/types/SecurityAlert";

interface AlertCardProps {
  alert: SecurityAlert;
  onMarkAsRead: () => void;
}

export function AlertCard({ alert, onMarkAsRead }: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="text-red-600" size={16} />;
      case "high": return <AlertTriangle className="text-orange-600" size={16} />;
      case "medium": return <Shield className="text-yellow-600" size={16} />;
      case "low": return <Shield className="text-blue-600" size={16} />;
      default: return <Shield className="text-gray-600" size={16} />;
    }
  };

  return (
    <Card className={`${!alert.read ? 'bg-blue-50 border-blue-200' : ''} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSeverityIcon(alert.severity)}
            <div>
              <div className="font-semibold text-sm">{alert.title}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                {alert.timestamp}
                <MapPin size={12} />
                {alert.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!alert.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
            <Badge className={getSeverityColor(alert.severity)}>
              {alert.severity}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed mb-3">{alert.description}</p>
        
        {alert.actionRequired && (
          <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
            <div className="flex items-center gap-1">
              <AlertTriangle size={12} className="text-orange-600" />
              <span className="font-medium text-orange-800">
                Immediate Action Required: {alert.actionRequired}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            From: {alert.source}
          </div>
          {!alert.read && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onMarkAsRead}
              className="h-7 text-xs"
            >
              <CheckCircle size={12} className="mr-1" />
              Mark as Read
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}