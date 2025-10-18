import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Phone, MapPin, Shield, Heart, Users, Navigation, LogOut} from 'lucide-react'
import {PanicButton} from '@/components/PanicButton'
import {VoiceEmergencyCommands} from '@/components/VoiceEmergencyCommands'
import {LocationDisplay} from '@/components/LocationDisplay'
import {EmergencyStatus} from '@/components/EmergencyStatus'
import {MedicalInformation} from '@/components/MedicalInformation'
import {EmergencyContacts} from '@/components/EmergencyContacts'
import {BreadcrumbTracker} from '@/components/BreadcrumbTracker'
import {SecurityCompanies} from '@/components/SecurityCompanies'
import {ThemeToggle} from '@/components/ThemeToggle'
import {AuthScreen} from '@/components/AuthScreen'
import {useTheme} from '@/hooks/useTheme'
import {useAuth} from '@/hooks/useAuth'

export default function App() {
 const {isAuthenticated, isLoading, login, logout} = useAuth()
 const [emergencyActive, setEmergencyActive] = useState(false)
 const [isListening, setIsListening] = useState(false)
 const [activeTab, setActiveTab] = useState('emergency')
 const {theme} = useTheme()

 // Show loading or auth screen
 if (isLoading) {
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
   </div>
  )
 }

 if (!isAuthenticated) {
  return <AuthScreen onLogin={login} />
 }

 const handleEmergencyTrigger = () => {
  setEmergencyActive(true)
  // This will trigger all emergency protocols including:
  // - Location sharing
  // - Medical info broadcast
  // - Contact notifications
  // - Breadcrumb trail activation
 }

 const isDark = theme === 'dark'

 return (
  <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
   isDark 
    ? 'bg-black' 
    : 'bg-amber-50'
  }`}>
   {/* Subtle background elements */}
   <div className={`absolute inset-0 transition-all duration-500 ${
    isDark 
     ? 'bg-gradient-to-br from-gray-900/20 to-black' 
     : 'bg-gradient-to-br from-amber-100/30 to-amber-50'
   }`} />

   <div className="relative z-10 min-h-screen pb-32" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom))' }}>
    {/* Glassmorphic Header */}
    <div className={`backdrop-blur-xl border-b sticky top-0 z-20 transition-all duration-300 ${
     isDark 
      ? 'bg-black/80 border-gray-800' 
      : 'bg-amber-50/80 border-amber-200'
    }`}>
     <div className="max-w-md mx-auto p-6">
      <div className="text-center space-y-3">
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
         <img 
          src="/logo.png" 
          alt="South African Security Logo" 
          className="w-7 h-7"
          onError={(e) => {
           // Fallback to shield if logo doesn't load
           e.currentTarget.style.display = 'none';
           const sibling = e.currentTarget.nextElementSibling as HTMLElement;
           if (sibling) sibling.style.display = 'block';
          }}
         />
         <Shield className="text-red-400 hidden" size={28} />
         <h1 className={`text-2xl font-bold ${
          isDark ? 'text-white' : 'text-black'
         }`}>Emergency Hub</h1>
        </div>
        <div className="flex items-center gap-2">
         <ThemeToggle />
         <Button 
          variant="outline" 
          size="sm"
          onClick={logout}
          className={`backdrop-blur-sm transition-colors duration-300 ${
           isDark 
            ? 'border-red-400/40 text-red-200 hover:bg-red-400/20' 
            : 'border-red-600 text-red-600 hover:bg-red-50'
          }`}
         >
          <LogOut size={16} className="mr-1" />
          Logout
         </Button>
        </div>
       </div>
       <p className={`text-sm transition-colors duration-300 ${
        isDark ? 'text-gray-300' : 'text-black'
       }`}>Complete emergency response system</p>
       <Badge variant="outline" className={`backdrop-blur-sm transition-all duration-300 ${
        isDark 
         ? 'bg-green-600/20 text-green-400 border-green-500/40' 
         : 'bg-green-100 text-green-700 border-green-300'
       }`}>
        <MapPin size={12} className="mr-1" />
        Mondeor, Johannesburg
       </Badge>
      </div>
     </div>
    </div>

    {/* Emergency Status */}
    <div className="max-w-md mx-auto px-4 pt-6">
     <EmergencyStatus isActive={emergencyActive} />
    </div>

      {/* Main Content with Glass Container */}
      <div className="max-w-md mx-auto p-4">
       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Content */}
        <div className="mb-6">
         {/* Emergency Tab */}
         <TabsContent value="emergency" className="space-y-6 mt-0">
          <LocationDisplay />
          <PanicButton onPanic={handleEmergencyTrigger} isActive={emergencyActive} />
          <VoiceEmergencyCommands isListening={isListening} onToggleListening={setIsListening} onEmergencyTriggered={handleEmergencyTrigger} />
          <SecurityCompanies />
         </TabsContent>

         {/* Medical Information Tab */}
         <TabsContent value="medical" className="space-y-6 mt-0">
          <MedicalInformation />
         </TabsContent>

         {/* Emergency Contacts Tab */}
         <TabsContent value="contacts" className="space-y-6 mt-0">
          <EmergencyContacts emergencyActive={emergencyActive} />
         </TabsContent>

         {/* Location Tracking Tab */}
         <TabsContent value="track" className="space-y-6 mt-0">
          <BreadcrumbTracker isActive={emergencyActive} />
         </TabsContent>
        </div>

        {/* Quick Emergency Services Access */}
        <Card className={`backdrop-blur-xl shadow-2xl transition-all duration-300 ${
         isDark 
          ? 'bg-black/60 border-gray-800' 
          : 'bg-amber-50/60 border-amber-200'
        }`}>
       <CardHeader className="pb-3">
        <CardTitle className={`text-lg flex items-center gap-2 ${
         isDark ? 'text-white' : 'text-black'
        }`}>
         <Phone className="text-red-500" size={20} />
         Quick Emergency Dial
        </CardTitle>
       </CardHeader>
       <CardContent className="grid grid-cols-3 gap-3">
        <Button
         variant="destructive"
         className="h-14 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white border-0"
         onClick={() => {
          handleEmergencyTrigger()
          window.open('tel:10111', '_self')
         }}
        >
         <Phone size={16} className="mr-1" />
         Police
        </Button>
        <Button
         variant="destructive"
         className="h-14 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white border-0"
         onClick={() => {
          handleEmergencyTrigger()
          window.open('tel:10177', '_self')
         }}
        >
         <Phone size={16} className="mr-1" />
         Medical
        </Button>
        <Button
         variant="destructive"
         className="h-14 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white border-0"
         onClick={() => {
          handleEmergencyTrigger()
          window.open('tel:10177', '_self')
         }}
        >
         <Phone size={16} className="mr-1" />
         Fire
        </Button>
       </CardContent>
      </Card>

      {/* Reset Emergency Status */}
      {emergencyActive && (
       <Card className={`backdrop-blur-xl mt-6 transition-all duration-300 ${
        isDark 
         ? 'bg-orange-600/20 border-orange-500/40' 
         : 'bg-orange-100 border-orange-300'
       }`}>
        <CardContent className="p-4 text-center">
         <p className={`mb-3 ${
          isDark ? 'text-orange-200' : 'text-orange-800'
         }`}>Emergency protocols active - All contacts notified</p>
         <Button variant="outline" onClick={() => setEmergencyActive(false)} className={`${
          isDark 
           ? 'border-orange-500/50 text-orange-200 hover:bg-orange-500/20' 
           : 'border-orange-500 text-orange-700 hover:bg-orange-100'
         }`}>
          Reset Emergency Status
         </Button>
        </CardContent>
       </Card>
      )}
     </Tabs>
     
     {/* Footer */}
     <div className={`mt-6 mb-4 text-center transition-colors duration-300 ${
      isDark ? 'text-gray-400' : 'text-black'
     }`}>
      <p className="text-sm">
       Built by <span className={`font-semibold ${
        isDark ? 'text-white' : 'text-black'
       }`}>Maagric Tech</span> and <span className={`font-semibold ${
        isDark ? 'text-white' : 'text-black'
       }`}>Teeza Robotics</span>
      </p>
     </div>
    </div>
   </div>

   {/* Bottom Navigation - Liquid Glass Style */}
   <div className="fixed bottom-0 left-0 right-0 z-30 pb-safe">
    <div className={`backdrop-blur-xl border-t shadow-2xl transition-all duration-300 ${
     isDark 
      ? 'bg-black/80 border-gray-800' 
      : 'bg-amber-50/80 border-amber-200'
    }`} style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
     <div className="max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
       <TabsList className="w-full h-16 bg-transparent grid grid-cols-4 p-2">
        <TabsTrigger value="emergency" className={`flex flex-col gap-1 h-12 backdrop-blur-sm rounded-xl transition-all duration-300 ${
         activeTab === 'emergency' 
          ? 'bg-red-600 text-white' 
          : isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-black hover:text-black hover:bg-gray-100'
        }`}>
         <Shield size={18} />
         <span className="text-xs font-medium">Emergency</span>
        </TabsTrigger>
        <TabsTrigger value="medical" className={`flex flex-col gap-1 h-12 backdrop-blur-sm rounded-xl transition-all duration-300 ${
         activeTab === 'medical' 
          ? 'bg-red-600 text-white' 
          : isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-black hover:text-black hover:bg-gray-100'
        }`}>
         <Heart size={18} />
         <span className="text-xs font-medium">Medical</span>
        </TabsTrigger>
        <TabsTrigger value="contacts" className={`flex flex-col gap-1 h-12 backdrop-blur-sm rounded-xl transition-all duration-300 ${
         activeTab === 'contacts' 
          ? 'bg-red-600 text-white' 
          : isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-black hover:text-black hover:bg-gray-100'
        }`}>
         <Users size={18} />
         <span className="text-xs font-medium">Contacts</span>
        </TabsTrigger>
        <TabsTrigger value="track" className={`flex flex-col gap-1 h-12 backdrop-blur-sm rounded-xl transition-all duration-300 ${
         activeTab === 'track' 
          ? 'bg-red-600 text-white' 
          : isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-black hover:text-black hover:bg-gray-100'
        }`}>
         <Navigation size={18} />
         <span className="text-xs font-medium">Track</span>
        </TabsTrigger>
       </TabsList>
      </Tabs>
     </div>
    </div>
   </div>
  </div>
 )
}