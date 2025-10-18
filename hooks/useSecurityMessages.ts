import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SecurityMessage } from "@/types/SecurityMessage";

export function useSecurityMessages() {
  // Mock data for security messages
  const mockMessages: SecurityMessage[] = [
    {
      id: "1",
      company: "Eagle Security Services",
      content: "Increased patrols in the Mondeor area following recent incidents. All residents advised to ensure gates and security systems are activated.",
      timestamp: "2 hours ago",
      location: "Mondeor Central",
      priority: "high",
      actionRequired: true
    },
    {
      id: "2", 
      company: "Guardian Protection",
      content: "Weekly security update: 3 suspicious vehicle incidents reported on Main Road. Please report any unusual activity immediately.",
      timestamp: "4 hours ago",
      location: "Main Road",
      priority: "medium",
      actionRequired: false
    },
    {
      id: "3",
      company: "Metro Police",
      content: "Road closure on Klip River Drive due to ongoing investigation. Alternative routes via Valley Road recommended.",
      timestamp: "6 hours ago", 
      location: "Klip River Drive",
      priority: "medium",
      actionRequired: false
    },
    {
      id: "4",
      company: "Eagle Security Services",
      content: "All clear: Earlier security alert has been resolved. Thank you for your cooperation and vigilance.",
      timestamp: "8 hours ago",
      location: "Mondeor South",
      priority: "low",
      actionRequired: false
    },
    {
      id: "5",
      company: "Community Watch",
      content: "Monthly community meeting scheduled for this Saturday 10 AM at the community center. Security updates and safety tips will be discussed.",
      timestamp: "12 hours ago",
      location: "Community Center", 
      priority: "low",
      actionRequired: false
    }
  ];

  const { data: messages, isLoading } = useQuery({
    queryKey: ["security-messages"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockMessages;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000 // Refetch every minute
  });

  return {
    messages: messages || [],
    isLoading
  };
}