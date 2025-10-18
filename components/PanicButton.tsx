import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {AlertTriangle, Phone} from 'lucide-react'
import {useCurrentLocation} from '@/hooks/useCurrentLocation'
import {useTheme} from '@/hooks/useTheme'

interface PanicButtonProps {
 onPanic: () => void
 isActive: boolean
}

export function PanicButton({onPanic, isActive}: PanicButtonProps) {
 const [isPressing, setIsPressing] = useState(false)
 const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)
 const {location, locationString} = useCurrentLocation()
 const {isDark} = useTheme()

 const handlePanicPress = () => {
  if (isActive) return

  setIsPressing(true)
  const timer = setTimeout(() => {
   triggerPanicAlert()
  }, 3000) // 3 second hold

  setPressTimer(timer)
 }

 const handlePanicRelease = () => {
  setIsPressing(false)
  if (pressTimer) {
   clearTimeout(pressTimer)
   setPressTimer(null)
  }
 }

 const triggerPanicAlert = () => {
  setIsPressing(false)
  onPanic()

  // Create emergency message with location
  const emergencyMessage = `EMERGENCY ALERT - Location: ${locationString || 'Location unavailable'}`

  // In a real app, this would send to emergency services
  console.log('PANIC ALERT TRIGGERED:', emergencyMessage)

  // Simulate emergency broadcast
  if (navigator.share) {
   navigator.share({
    title: 'EMERGENCY ALERT',
    text: emergencyMessage,
    url: location ? `https://maps.google.com/?q=${location.lat},${location.lng}` : undefined
   })
  }
 }

 return (
  <Card className={`backdrop-blur-xl shadow-2xl transition-all duration-300 ${
   isActive 
    ? isDark ? 'bg-red-400/40 border-red-400/50' : 'bg-red-100 border-red-300'
    : isDark ? 'bg-black/60 border-gray-800' : 'bg-amber-50/60 border-amber-200'
  }`}>
   <CardContent className="p-8 text-center">
    <div className="space-y-6">
     <div className="space-y-2">
      <h2 className={`text-xl font-bold ${
       isDark ? 'text-white' : 'text-black'
      }`}>Emergency Panic Button</h2>
      <p className={`text-sm transition-colors duration-300 ${
       isDark ? 'text-purple-200/80' : 'text-gray-600'
      }`}>Hold for 3 seconds to trigger emergency alert</p>
     </div>

     <div className="relative flex justify-center">
      <Button
       size="lg"
       variant={isActive ? 'secondary' : 'destructive'}
       disabled={isActive}
       className={`w-36 h-36 rounded-full text-2xl font-bold transition-all duration-300 shadow-2xl ${
        isPressing 
         ? 'scale-110 bg-red-600/90 shadow-red-500/50' 
         : isActive 
          ? isDark ? 'opacity-50 bg-white/10' : 'opacity-50 bg-white/20'
          : isDark 
           ? 'bg-red-500/95 hover:bg-red-400/95 border-2 border-red-400/60 backdrop-blur-sm' 
           : 'bg-red-500/90 hover:bg-red-400/90 border-2 border-red-400/50 backdrop-blur-sm'
       }`}
       onMouseDown={handlePanicPress}
       onMouseUp={handlePanicRelease}
       onMouseLeave={handlePanicRelease}
       onTouchStart={handlePanicPress}
       onTouchEnd={handlePanicRelease}
      >
       {isActive ? (
        <div className="flex flex-col items-center">
         <Phone size={36} />
         <span className="text-sm">Active</span>
        </div>
       ) : (
        <div className="flex flex-col items-center">
         <AlertTriangle size={36} />
         <span className="text-sm">PANIC</span>
        </div>
       )}
      </Button>

      {isPressing && (
       <div className="absolute inset-0 border-4 border-red-400 rounded-full animate-ping shadow-lg">
        <div className="absolute inset-2 border-2 border-red-300 rounded-full animate-ping delay-150" />
       </div>
      )}
     </div>

     {isPressing && <div className={`font-semibold animate-pulse ${
      isDark ? 'text-red-200' : 'text-red-600'
     }`}>Hold to activate emergency alert...</div>}

     {isActive && <div className={`font-semibold p-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${
      isDark 
       ? 'text-green-200 bg-green-400/30 border border-green-400/40' 
       : 'text-green-700 bg-green-100 border border-green-300'
     }`}>Emergency alert sent! Location shared with emergency services.</div>}
    </div>
   </CardContent>
  </Card>
 )
}