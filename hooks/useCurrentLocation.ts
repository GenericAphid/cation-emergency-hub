import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { radarGetContextForLocation } from '@/lib/radar'

interface LocationData {
  lat: number
  lng: number
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get location context from Radar
  const { data: locationContext } = useQuery({
    queryKey: ['location-context', location],
    queryFn: () => location ? radarGetContextForLocation({ 
      lat: location.lat, 
      lng: location.lng 
    }) : null,
    enabled: !!location,
    staleTime: 300000 // 5 minutes
  })

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsLoading(false)
        },
        (error) => {
          // Fallback to Mondeor coordinates
          setLocation({
            lat: -26.2785,
            lng: 27.9867
          })
          setError('Location access denied - using Mondeor default location')
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    } else {
      // Fallback for browsers without geolocation
      setLocation({
        lat: -26.2785,
        lng: 27.9867
      })
      setError('Geolocation not supported - using Mondeor default location')
      setIsLoading(false)
    }
  }, [])

  // Generate location string
  const locationString = location 
    ? locationContext?.context 
      ? `${locationContext.context.address?.formattedAddress || 'Mondeor, Johannesburg'}`
      : 'Mondeor, Johannesburg'
    : 'Location unavailable'

  return {
    location,
    locationString,
    isLoading,
    error,
    locationContext
  }
}