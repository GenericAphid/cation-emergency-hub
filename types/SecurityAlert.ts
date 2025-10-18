export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  location: string;
  source: string;
  read: boolean;
  actionRequired: string | null;
}