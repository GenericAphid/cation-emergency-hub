import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Shield } from "lucide-react";
import type { SecurityMessage } from "@/types/SecurityMessage";

interface MessageCardProps {
  message: SecurityMessage;
}

export function MessageCard({ message }: MessageCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCompanyLogo = (company: string) => {
    return company.charAt(0).toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">
                {getCompanyLogo(message.company)}
              </span>
            </div>
            <div>
              <div className="font-semibold text-sm">{message.company}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                {message.timestamp}
                <MapPin size={12} />
                {message.location}
              </div>
            </div>
          </div>
          <Badge className={getPriorityColor(message.priority)}>
            {message.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{message.content}</p>
        {message.actionRequired && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-yellow-600" />
              <span className="font-medium text-yellow-800">Action Required</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}