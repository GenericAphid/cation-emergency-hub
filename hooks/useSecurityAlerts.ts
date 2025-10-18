import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SecurityAlert } from "@/types/SecurityAlert";

export function useSecurityAlerts() {
  const queryClient = useQueryClient();

  // Mock data for security alerts
  const mockAlerts: SecurityAlert[] = [
    {
      id: "1",
      title: "Break-in Alert",
      description: "Attempted break-in reported on Maple Street. Suspect fled the scene when alarm activated. Police have been notified.",
      severity: "critical",
      timestamp: "15 minutes ago",
      location: "Maple Street", 
      source: "Eagle Security",
      read: false,
      actionRequired: "Check your security systems and ensure all doors/windows are locked"
    },
    {
      id: "2",
      title: "Suspicious Vehicle",
      description: "White sedan with no license plates spotted circling the neighborhood. Vehicle last seen heading towards Valley Road.",
      severity: "high", 
      timestamp: "1 hour ago",
      location: "Pine Avenue",
      source: "Community Watch",
      read: false,
      actionRequired: "Report if vehicle is spotted again"
    },
    {
      id: "3",
      title: "Power Outage Alert",
      description: "Planned electricity maintenance will affect blocks 5-8 tomorrow from 9 AM to 2 PM. Ensure backup security systems are functioning.",
      severity: "medium",
      timestamp: "3 hours ago", 
      location: "Blocks 5-8",
      source: "City Power",
      read: true,
      actionRequired: null
    },
    {
      id: "4",
      title: "Security Patrol Update",
      description: "Additional security patrols have been deployed in response to recent incidents. Expect increased visibility over the weekend.",
      severity: "low",
      timestamp: "5 hours ago",
      location: "Mondeor Area",
      source: "Eagle Security", 
      read: true,
      actionRequired: null
    }
  ];

  const { data: alerts, isLoading } = useQuery({
    queryKey: ["security-alerts"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockAlerts;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 45000 // Refetch every 45 seconds for alerts
  });

  const markAsRead = (alertId: string) => {
    queryClient.setQueryData(["security-alerts"], (oldData: SecurityAlert[] | undefined) => {
      if (!oldData) return oldData;
      return oldData.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      );
    });
  };

  return {
    alerts: alerts || [],
    isLoading,
    markAsRead
  };
}