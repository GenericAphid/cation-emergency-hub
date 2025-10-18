import { useState, useEffect, useCallback } from 'react'
import { atom, useAtom } from 'jotai'

interface BreadcrumbPoint {
  lat: number
  lng: number
  timestamp: string
  address?: string
}

const breadcrumbsAtom = atom<BreadcrumbPoint[]>([])
const isTrackingAtom = atom<boolean>(false)

export function useBreadcrumbTracker() {
  const [breadcrumbs, setBreadcrumbs] = useAtom(breadcrumbsAtom)
  const [isTracking, setIsTracking] = useAtom(isTrackingAtom)
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null)

  const addBreadcrumb = useCallback(async (location: { lat: number; lng: number }) => {
    try {
      // Get location context from Radar
      const { radarGetContextForLocation } = await import('@/lib/radar')
      const context = await radarGetContextForLocation(location)
      
      const newPoint: BreadcrumbPoint = {
        ...location,
        timestamp: new Date().toISOString(),
        address: context.context?.address?.formattedAddress || 'Mondeor area'
      }
      
      setBreadcrumbs(prev => [...prev, newPoint])
    } catch (error) {
      // Fallback without address context
      const newPoint: BreadcrumbPoint = {
        ...location,
        timestamp: new Date().toISOString(),
        address: 'Location recorded'
      }
      setBreadcrumbs(prev => [...prev, newPoint])
    }
  }, [setBreadcrumbs])

  const getCurrentLocation = useCallback(() => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        // Fallback to Mondeor coordinates
        resolve({ lat: -26.2785, lng: 27.9867 })
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          // Fallback to Mondeor coordinates
          resolve({ lat: -26.2785, lng: 27.9867 })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      )
    })
  }, [])

  const startTracking = useCallback(() => {
    if (isTracking) return

    setIsTracking(true)
    
    // Record initial location
    getCurrentLocation().then(addBreadcrumb)
    
    // Set up interval to record location every 30 seconds
    const interval = setInterval(async () => {
      const location = await getCurrentLocation()
      addBreadcrumb(location)
    }, 30000) // 30 seconds
    
    setTrackingInterval(interval)
  }, [isTracking, getCurrentLocation, addBreadcrumb])

  const stopTracking = useCallback(() => {
    setIsTracking(false)
    if (trackingInterval) {
      clearInterval(trackingInterval)
      setTrackingInterval(null)
    }
  }, [trackingInterval])

  const clearTrail = useCallback(() => {
    setBreadcrumbs([])
  }, [setBreadcrumbs])

  const shareTrail = useCallback(() => {
    if (breadcrumbs.length === 0) return { googleMapsUrl: '', trailData: [] }
    
    // Create Google Maps URL with multiple waypoints
    const points = breadcrumbs.slice(-10) // Last 10 points to avoid URL length limits
    const waypoints = points.map(p => `${p.lat},${p.lng}`).join('|')
    const lastPoint = breadcrumbs[breadcrumbs.length - 1]
    
    const googleMapsUrl = `https://maps.google.com/maps/dir/${waypoints}/@${lastPoint.lat},${lastPoint.lng},15z`
    
    return {
      googleMapsUrl,
      trailData: breadcrumbs,
      lastLocation: lastPoint
    }
  }, [breadcrumbs])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval)
      }
    }
  }, [trackingInterval])

  return {
    breadcrumbs,
    isTracking,
    startTracking,
    stopTracking,
    clearTrail,
    shareTrail
  }
}