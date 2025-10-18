import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, AlertTriangle, Shield, Clock, MapPin, ExternalLink } from "lucide-react";
import { useSecurityAlerts } from "@/hooks/useSecurityAlerts";
import { AlertCard } from "@/components/AlertCard";

export function AlertsScreen() {
  const { alerts, isLoading, markAsRead } = useSecurityAlerts();

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="text-primary" size={24} />
            <h1 className="text-2xl font-bold">Security Alerts</h1>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Emergency notifications and security updates for Mondeor
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-red-800 flex items-center gap-2">
            <AlertTriangle size={20} />
            Emergency Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="destructive" size="sm" className="h-12">
              <div className="text-center">
                <div className="font-semibold">Panic Button</div>
                <div className="text-xs">Emergency Alert</div>
              </div>
            </Button>
            <Button variant="outline" size="sm" className="h-12 border-orange-300">
              <div className="text-center">
                <div className="font-semibold">Report Incident</div>
                <div className="text-xs">Send to Security</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Alerts</h3>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>

        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          alerts.map((alert) => (
            <AlertCard 
              key={alert.id} 
              alert={alert} 
              onMarkAsRead={() => markAsRead(alert.id)}
            />
          ))
        )}
      </div>

      {/* Safety Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="text-green-600" size={20} />
            Safety Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>Always lock your vehicle and avoid leaving valuables visible</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>Activate your alarm system when leaving home</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>Report suspicious activity immediately to security</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}