import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Phone, Users, UserPlus, MessageSquare, Check, AlertTriangle } from 'lucide-react'
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts'

interface EmergencyContactsProps {
  emergencyActive: boolean
}

export function EmergencyContacts({ emergencyActive }: EmergencyContactsProps) {
  const { contacts, addContact, removeContact, notifyContacts } = useEmergencyContacts()
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' })
  const [notificationsSent, setNotificationsSent] = useState(false)

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      addContact(newContact)
      setNewContact({ name: '', phone: '', relationship: '' })
      setIsAddingContact(false)
    }
  }

  const handleNotifyAll = async () => {
    await notifyContacts()
    setNotificationsSent(true)
    setTimeout(() => setNotificationsSent(false), 3000)
  }

  return (
    <div className="space-y-4">
      {/* Emergency Contacts Header */}
      <Card className="bg-amber-50/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Emergency Contacts
            </CardTitle>
            <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserPlus size={16} className="mr-1" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Emergency Contact</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactName">Name</Label>
                    <Input
                      id="contactName"
                      value={newContact.name}
                      onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactRelationship">Relationship</Label>
                    <Input
                      id="contactRelationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                      placeholder="e.g., Spouse, Parent, Friend"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddContact} className="flex-1">Add Contact</Button>
                    <Button variant="outline" onClick={() => setIsAddingContact(false)} className="flex-1">Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Notification Status */}
          {emergencyActive && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-600" size={18} />
                  <span className="font-medium text-red-800">Emergency Active</span>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleNotifyAll}
                  disabled={notificationsSent}
                  className={notificationsSent ? 'bg-green-600' : ''}
                >
                  {notificationsSent ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Sent
                    </>
                  ) : (
                    <>
                      <MessageSquare size={14} className="mr-1" />
                      Notify All
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-red-700 mt-1">
                All emergency contacts will receive your location and emergency status
              </p>
            </div>
          )}

          {/* Contact List */}
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="text-center p-4 text-gray-500">
                <Users size={32} className="mx-auto mb-2 opacity-50" />
                <p>No emergency contacts added yet</p>
                <p className="text-sm">Add contacts who should be notified during emergencies</p>
              </div>
            ) : (
              contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{contact.name}</h4>
                      {contact.relationship && (
                        <Badge variant="secondary" className="text-xs">
                          {contact.relationship}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                    >
                      <Phone size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`sms:${contact.phone}?body=Emergency Alert - I need help. My location: Mondeor, Johannesburg`, '_self')}
                    >
                      <MessageSquare size={14} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Auto-Notification Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-blue-600" size={18} />
            <span className="font-medium text-blue-800">Auto-Notification</span>
          </div>
          <p className="text-sm text-blue-700">
            When you activate emergency mode, all contacts above will automatically receive:
          </p>
          <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
            <li>Your exact location with map link</li>
            <li>Emergency type and time</li>
            <li>Your medical information (if configured)</li>
            <li>Live tracking link if GPS trail is active</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}