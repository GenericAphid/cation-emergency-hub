export interface SecurityMessage {
  id: string;
  company: string;
  content: string;
  timestamp: string;
  location: string;
  priority: "low" | "medium" | "high";
  actionRequired: boolean;
}