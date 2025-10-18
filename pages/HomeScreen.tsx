import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Clock, MapPin } from "lucide-react";
import { useSecurityMessages } from "@/hooks/useSecurityMessages";
import { MessageCard } from "@/components/MessageCard";

export function HomeScreen() {
  const { messages, isLoading } = useSecurityMessages();

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="text-primary" size={24} />
          <h1 className="text-2xl font-bold">Security Feed</h1>
        </div>
        <p className="text-muted-foreground">Latest updates from security companies in Mondeor</p>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Mondeor Active
          </Badge>
          <Badge variant="outline">
            <MapPin size={12} className="mr-1" />
            Johannesburg South
          </Badge>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))
        )}
      </div>

      {/* Quick Stats */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-xs text-muted-foreground">Patrols Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-xs text-muted-foreground">Incidents</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-xs text-muted-foreground">Alerts Sent</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}