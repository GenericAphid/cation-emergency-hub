import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navigation, MapPin, Clock, ExternalLink, Share } from 'lucide-react'
import { useBreadcrumbTracker } from '@/hooks/useBreadcrumbTracker'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'

interface BreadcrumbTrackerProps {
  isActive: boolean
}

export function BreadcrumbTracker({ isActive }: BreadcrumbTrackerProps) {
  const { breadcrumbs, startTracking, stopTracking, clearTrail, shareTrail } = useBreadcrumbTracker()
  const { location } = useCurrentLocation()
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    if (isActive && !isTracking) {
      startTracking()
      setIsTracking(true)
    }
  }, [isActive, isTracking, startTracking])

  const handleToggleTracking = () => {
    if (isTracking) {
      stopTracking()
      setIsTracking(false)
    } else {
      startTracking()
      setIsTracking(true)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleShareTrail = () => {
    const trailData = shareTrail()
    const shareText = `Emergency GPS Trail - Follow my location: ${trailData.googleMapsUrl}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Emergency GPS Trail',
        text: shareText,
        url: trailData.googleMapsUrl
      })
    } else {
      // Fallback to SMS
      window.open(`sms:?body=${encodeURIComponent(shareText)}`, '_self')
    }
  }

  return (
    <div className="space-y-4">
      {/* Tracker Control */}
      <Card className="bg-amber-50/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="text-purple-600" size={20} />
            GPS Breadcrumb Trail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant={isTracking ? 'default' : 'secondary'} className={isTracking ? 'bg-green-600' : ''}>
                {isTracking ? 'Tracking Active' : 'Tracking Disabled'}
              </Badge>
              <span className="text-sm text-gray-600">
                {breadcrumbs.length} location points recorded
              </span>
            </div>
            <Button
              size="sm"
              variant={isTracking ? 'destructive' : 'default'}
              onClick={handleToggleTracking}
            >
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </Button>
          </div>

          {/* Trail Actions */}
          {breadcrumbs.length > 0 && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleShareTrail}
                className="flex-1"
              >
                <Share size={14} className="mr-1" />
                Share Trail
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const lastLocation = breadcrumbs[breadcrumbs.length - 1]
                  if (lastLocation) {
                    window.open(
                      `https://maps.google.com/?q=${lastLocation.lat},${lastLocation.lng}`,
                      '_blank'
                    )
                  }
                }}
                className="flex-1"
              >
                <ExternalLink size={14} className="mr-1" />
                View Map
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearTrail}
              >
                Clear
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Trail */}
      <Card className="bg-amber-50/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center gap-2">
            <MapPin className="text-green-600" size={18} />
            Location History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {breadcrumbs.length === 0 ? (
            <div className="text-center p-4 text-gray-500">
              <Navigation size={32} className="mx-auto mb-2 opacity-50" />
              <p>No location trail recorded</p>
              <p className="text-sm">Start tracking to create a GPS breadcrumb trail</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {breadcrumbs.slice().reverse().map((point, index) => (
                <div key={point.timestamp} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? 'default' : 'secondary'} className="text-xs">
                        {index === 0 ? 'Current' : `${index}m ago`}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock size={12} />
                        {formatTime(point.timestamp)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {point.address || `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(`https://maps.google.com/?q=${point.lat},${point.lng}`, '_blank')}
                  >
                    <ExternalLink size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Trail Info */}
      {isActive && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="text-red-600" size={18} />
              <span className="font-medium text-red-800">Emergency Trail Active</span>
            </div>
            <p className="text-sm text-red-700">
              Your location is being tracked and will be automatically shared with emergency contacts and services. 
              This trail helps responders locate you even if you're moving.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}