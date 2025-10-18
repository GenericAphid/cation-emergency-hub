import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Mic, MicOff, Phone} from 'lucide-react'
import {useVoiceEmergencyRecognition} from '@/hooks/useVoiceEmergencyRecognition'
import {useCurrentLocation} from '@/hooks/useCurrentLocation'
import {useTheme} from '@/hooks/useTheme'

interface VoiceEmergencyCommandsProps {
 isListening: boolean
 onToggleListening: (listening: boolean) => void
 onEmergencyTriggered: () => void
}

export function VoiceEmergencyCommands({isListening, onToggleListening, onEmergencyTriggered}: VoiceEmergencyCommandsProps) {
 const {transcript, isSupported, startListening, stopListening} = useVoiceEmergencyRecognition()
 const {location, locationString} = useCurrentLocation()
 const {isDark} = useTheme()
 const [lastCommand, setLastCommand] = useState<string | null>(null)

 const emergencyCommands = {
  'call police': {number: '10111', service: 'Police'},
  police: {number: '10111', service: 'Police'},
  'call ambulance': {number: '10177', service: 'Ambulance'},
  ambulance: {number: '10177', service: 'Ambulance'},
  'call fire': {number: '10177', service: 'Fire Department'},
  'fire department': {number: '10177', service: 'Fire Department'},
  emergency: {number: '112', service: 'Emergency Services'},
  help: {number: '112', service: 'Emergency Services'}
 }

 const handleToggleListening = () => {
  if (isListening) {
   stopListening()
   onToggleListening(false)
  } else {
   startListening()
   onToggleListening(true)
  }
 }

 const executeEmergencyCommand = (command: string) => {
  const lowerCommand = command.toLowerCase()

  for (const [phrase, contact] of Object.entries(emergencyCommands)) {
   if (lowerCommand.includes(phrase)) {
    setLastCommand(contact.service)
    onEmergencyTriggered()

    // Create location-aware emergency call
    const emergencyData = {
     service: contact.service,
     location: locationString || 'Location unavailable',
     coordinates: location ? `${location.lat},${location.lng}` : null
    }

    console.log('Emergency call triggered:', emergencyData)

    // Make the emergency call
    window.open(`tel:${contact.number}`, '_self')

    return true
   }
  }
  return false
 }

 useEffect(() => {
  if (transcript) {
   executeEmergencyCommand(transcript)
  }
 }, [transcript])

 if (!isSupported) {
  return (
   <Card className="backdrop-blur-xl border border-gray-400/30 bg-gray-500/20">
    <CardContent className="p-4 text-center">
     <p className="text-sm text-gray-200">Voice commands not supported in this browser</p>
    </CardContent>
   </Card>
  )
 }

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
      isDark ? 'bg-blue-400/30' : 'bg-blue-400/20'
     }`}>
      <Mic className="text-blue-300" size={18} />
     </div>
     Voice Emergency Commands
    </CardTitle>
   </CardHeader>
   <CardContent className="space-y-4">
    {/* Voice Commands List */}
    <div className="grid grid-cols-2 gap-2 text-xs">
     <div className={`p-2 rounded-lg border backdrop-blur-sm text-center transition-colors duration-300 ${
      isDark 
       ? 'bg-blue-400/20 border-blue-400/30 text-blue-200' 
       : 'bg-blue-400/10 border-blue-400/20 text-blue-800'
     }`}>"Call police"</div>
     <div className={`p-2 rounded-lg border backdrop-blur-sm text-center transition-colors duration-300 ${
      isDark 
       ? 'bg-blue-400/20 border-blue-400/30 text-blue-200' 
       : 'bg-blue-400/10 border-blue-400/20 text-blue-800'
     }`}>"Call ambulance"</div>
     <div className={`p-2 rounded-lg border backdrop-blur-sm text-center transition-colors duration-300 ${
      isDark 
       ? 'bg-blue-400/20 border-blue-400/30 text-blue-200' 
       : 'bg-blue-400/10 border-blue-400/20 text-blue-800'
     }`}>"Call fire"</div>
     <div className={`p-2 rounded-lg border backdrop-blur-sm text-center transition-colors duration-300 ${
      isDark 
       ? 'bg-blue-400/20 border-blue-400/30 text-blue-200' 
       : 'bg-blue-400/10 border-blue-400/20 text-blue-800'
     }`}>"Emergency"</div>
    </div>

    {/* Voice Control Button */}
    <div className="text-center">
     <Button 
      size="lg" 
      variant={isListening ? 'destructive' : 'default'} 
      onClick={handleToggleListening} 
      className={`w-20 h-20 rounded-full shadow-2xl transition-all duration-300 ${
       isListening 
        ? 'animate-pulse bg-red-500/90 hover:bg-red-400/90 border-2 border-red-400/50' 
        : 'bg-blue-500/90 hover:bg-blue-400/90 border-2 border-blue-400/50 backdrop-blur-sm'
      }`}
     >
      {isListening ? <MicOff size={28} /> : <Mic size={28} />}
     </Button>
    </div>

    {/* Status Indicators */}
    {isListening && (
     <div className="text-center">
      <Badge variant="secondary" className={`animate-pulse backdrop-blur-sm transition-colors duration-300 ${
       isDark 
        ? 'bg-red-400/30 text-red-200 border-red-400/40' 
        : 'bg-red-400/20 text-red-800 border-red-400/30'
      }`}>
       Listening for emergency commands...
      </Badge>
     </div>
    )}

    {transcript && (
     <div className={`text-center p-3 rounded-lg border backdrop-blur-sm transition-colors duration-300 ${
      isDark 
       ? 'bg-green-400/20 border-green-400/30' 
       : 'bg-green-400/10 border-green-400/20'
     }`}>
      <p className={`text-sm transition-colors duration-300 ${
       isDark ? 'text-green-200' : 'text-green-800'
      }`}>
       <span className="font-medium">Heard:</span> "{transcript}"
      </p>
     </div>
    )}

    {lastCommand && (
     <div className={`text-center p-3 rounded-lg border backdrop-blur-sm transition-colors duration-300 ${
      isDark 
       ? 'bg-orange-400/20 border-orange-400/30' 
       : 'bg-orange-400/10 border-orange-400/20'
     }`}>
      <p className={`text-sm flex items-center justify-center gap-1 transition-colors duration-300 ${
       isDark ? 'text-orange-200' : 'text-orange-800'
      }`}>
       <Phone size={16} />
       Calling {lastCommand} with your location
      </p>
     </div>
    )}
   </CardContent>
  </Card>
 )
}