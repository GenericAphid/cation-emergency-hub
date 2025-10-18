import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Mic, MicOff, Shield, MapPin } from "lucide-react";
import { VoiceCommands } from "@/components/VoiceCommands";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { useUserProfile } from "@/hooks/useUserProfile";

export function ProfileScreen() {
  const { profile, isLoading } = useUserProfile();
  const [isListening, setIsListening] = useState(false);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <Avatar className="w-20 h-20 mx-auto">
          <AvatarImage src={profile?.avatar} />
          <AvatarFallback className="text-lg">
            {profile?.fullName?.split(' ').map(n => n[0]).join('') || 'TL'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{profile?.fullName || 'Tiisetso Lawrence Ndhlovu'}</h1>
          <p className="text-muted-foreground">{profile?.email || 'ndhlovulawrence7@gmail.com'}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary">
              <MapPin size={12} className="mr-1" />
              Mondeor Resident
            </Badge>
            <Badge variant="outline">
              <Shield size={12} className="mr-1" />
              Verified
            </Badge>
          </div>
        </div>
      </div>

      {/* Voice Commands Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Mic size={20} />
            Voice Emergency Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-blue-700">
              Press and hold the microphone button, then say commands like:
            </p>
            <div className="grid gap-2 text-sm">
              <div className="bg-white p-2 rounded border">
                "Call the police"
              </div>
              <div className="bg-white p-2 rounded border">
                "Call the ambulance"
              </div>
              <div className="bg-white p-2 rounded border">
                "Call the fire station"
              </div>
            </div>
            
            <VoiceCommands 
              isListening={isListening}
              onToggleListening={setIsListening}
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <EmergencyContacts emergencyActive={false} />

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Push Notifications</span>
            <Badge variant="secondary">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Location Sharing</span>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Emergency Contacts</span>
            <Badge variant="secondary">3 Contacts</Badge>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Manage Security Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Security Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Eagle Security Services</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              24/7 Armed Response • Mondeor Sector
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1">
                <Phone size={14} className="mr-1" />
                Contact
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                View Coverage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}