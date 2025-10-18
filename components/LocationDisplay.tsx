import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Skeleton} from '@/components/ui/skeleton'
import {MapPin, Navigation} from 'lucide-react'
import {useCurrentLocation} from '@/hooks/useCurrentLocation'
import {useTheme} from '@/hooks/useTheme'

export function LocationDisplay() {
 const {location, locationString, isLoading, error} = useCurrentLocation()
 const {isDark} = useTheme()

 return (
  <Card className={`backdrop-blur-xl shadow-2xl transition-all duration-300 ${
   isDark 
    ? 'bg-black/60 border-gray-800' 
    : 'bg-amber-50/60 border-amber-200'
  }`}>
   <CardHeader className="pb-3">
    <CardTitle className={`text-lg flex items-center gap-2 ${
     isDark ? 'text-white' : 'text-black'
    }`}>
     <div className={`p-1 rounded-full transition-colors duration-300 ${
      isDark ? 'bg-green-400/40' : 'bg-green-400/30'
     }`}>
      <Navigation className="text-green-300" size={18} />
     </div>
     Your Current Location
    </CardTitle>
   </CardHeader>
   <CardContent>
    {isLoading ? (
     <div className="space-y-2">
      <Skeleton className={`h-4 w-full transition-colors duration-300 ${
       isDark ? 'bg-white/10' : 'bg-white/20'
      }`} />
      <Skeleton className={`h-4 w-3/4 transition-colors duration-300 ${
       isDark ? 'bg-white/10' : 'bg-white/20'
      }`} />
     </div>
    ) : error ? (
     <div className={`text-sm ${
      isDark ? 'text-orange-300' : 'text-orange-600'
     }`}>
      <p>{error}</p>
      <p className={`text-xs mt-1 transition-colors duration-300 ${
       isDark ? 'text-orange-200/80' : 'text-orange-500'
      }`}>Using default Mondeor location for emergency services</p>
     </div>
    ) : (
     <div className="space-y-3">
      <div className="flex items-start gap-2">
       <div className={`p-1 rounded-full mt-0.5 transition-colors duration-300 ${
        isDark ? 'bg-red-400/40' : 'bg-red-400/30'
       }`}>
        <MapPin className="text-red-300" size={14} />
       </div>
       <div>
        <p className={`text-sm font-medium ${
         isDark ? 'text-white' : 'text-black'
        }`}>{locationString}</p>
        {location && (
         <p className={`text-xs transition-colors duration-300 ${
          isDark ? 'text-purple-200/80' : 'text-gray-600'
         }`}>
          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
         </p>
        )}
       </div>
      </div>
      <Badge variant="secondary" className={`backdrop-blur-sm transition-all duration-300 ${
       isDark 
        ? 'bg-green-400/40 text-green-200 border-green-400/50' 
        : 'bg-green-100 text-green-700 border-green-300'
      }`}>
       Location will be shared automatically with emergency services
      </Badge>
     </div>
    )}
   </CardContent>
  </Card>
 )
}