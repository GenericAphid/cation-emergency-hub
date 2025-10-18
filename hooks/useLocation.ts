import { useState, useEffect } from "react";

interface UserLocation {
  lat: number;
  lng: number;
}

export function useLocation() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          // Fallback to Mondeor coordinates if location access denied
          setUserLocation({
            lat: -26.2785,
            lng: 27.9867
          });
          setError("Location access denied, using default Mondeor location");
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000 // 10 minutes
        }
      );
    } else {
      // Fallback for browsers without geolocation
      setUserLocation({
        lat: -26.2785,
        lng: 27.9867
      });
      setError("Geolocation not supported");
      setIsLoading(false);
    }
  }, []);

  return {
    userLocation,
    isLoading,
    error
  };
}