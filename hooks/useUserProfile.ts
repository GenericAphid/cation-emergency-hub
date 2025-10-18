import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  location?: string;
  securityProvider?: string;
}

export function useUserProfile() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      // Mock profile data
      const profile: UserProfile = {
        id: "user-1",
        fullName: "Tiisetso Lawrence Ndhlovu",
        email: "ndhlovulawrence7@gmail.com",
        location: "Mondeor, Johannesburg",
        securityProvider: "Eagle Security Services"
      };
      
      return profile;
    },
    staleTime: 300000 // 5 minutes
  });

  return {
    profile,
    isLoading
  };
}