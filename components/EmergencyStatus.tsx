import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {AlertTriangle, CheckCircle, Clock} from 'lucide-react'
import {useTheme} from '@/hooks/useTheme'

interface EmergencyStatusProps {
 isActive: boolean
}

export function EmergencyStatus({isActive}: EmergencyStatusProps) {
 const {isDark} = useTheme()

 if (!isActive) {
  return (
   <Card className={`backdrop-blur-xl shadow-2xl transition-all duration-300 ${
    isDark 
     ? 'bg-green-400/30 border-green-400/40' 
     : 'bg-green-100 border-green-300'
   }`}>
    <CardContent className="p-4 text-center">
     <div className="flex items-center justify-center gap-2 mb-2">
      <div className={`p-1 rounded-full transition-colors duration-300 ${
       isDark ? 'bg-green-400/40' : 'bg-green-400/30'
      }`}>
       <CheckCircle className="text-green-300" size={20} />
      </div>
      <Badge variant="secondary" className={`backdrop-blur-sm transition-all duration-300 ${
       isDark 
        ? 'bg-green-400/40 text-green-200 border-green-400/50' 
        : 'bg-green-200 text-green-700 border-green-400'
      }`}>
       Ready for Emergency
      </Badge>
     </div>
     <p className={`text-sm transition-colors duration-300 ${
      isDark ? 'text-green-200/90' : 'text-green-700'
     }`}>Emergency services ready • Location services active</p>
    </CardContent>
   </Card>
  )
 }

 return (
  <Card className={`backdrop-blur-xl animate-pulse shadow-2xl transition-all duration-300 ${
   isDark 
    ? 'bg-red-400/40 border-red-400/50' 
    : 'bg-red-100 border-red-300'
  }`}>
   <CardContent className="p-4 text-center">
    <div className="flex items-center justify-center gap-2 mb-2">
     <div className={`p-1 rounded-full animate-pulse transition-colors duration-300 ${
      isDark ? 'bg-red-400/50' : 'bg-red-400/40'
     }`}>
      <AlertTriangle className="text-red-300" size={20} />
     </div>
     <Badge variant="destructive" className={`animate-pulse backdrop-blur-sm transition-all duration-300 ${
      isDark 
       ? 'bg-red-500/50 text-red-200 border-red-400/60' 
       : 'bg-red-500 text-white border-red-600'
     }`}>
      EMERGENCY ACTIVE
     </Badge>
    </div>
    <div className={`flex items-center justify-center gap-1 text-sm transition-colors duration-300 ${
     isDark ? 'text-red-200' : 'text-red-700'
    }`}>
     <Clock size={16} />
     Emergency services have been notified
    </div>
   </CardContent>
  </Card>
 )
}