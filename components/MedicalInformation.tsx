import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Heart, AlertTriangle, Pill, Phone, Edit } from 'lucide-react'
import { useMedicalInfo } from '@/hooks/useMedicalInfo'

export function MedicalInformation() {
  const { medicalInfo, updateMedicalInfo } = useMedicalInfo()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(medicalInfo)

  const handleSave = () => {
    updateMedicalInfo(editForm)
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      {/* Medical Overview Card */}
      <Card className="bg-amber-50/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="text-red-600" size={20} />
              Medical Information
            </CardTitle>
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Medical Information</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input
                      id="bloodType"
                      value={editForm.bloodType}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bloodType: e.target.value }))}
                      placeholder="e.g., O+, A-, B+"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={editForm.allergies}
                      onChange={(e) => setEditForm(prev => ({ ...prev, allergies: e.target.value }))}
                      placeholder="List any allergies..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conditions">Medical Conditions</Label>
                    <Textarea
                      id="conditions"
                      value={editForm.conditions}
                      onChange={(e) => setEditForm(prev => ({ ...prev, conditions: e.target.value }))}
                      placeholder="List medical conditions..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={editForm.medications}
                      onChange={(e) => setEditForm(prev => ({ ...prev, medications: e.target.value }))}
                      placeholder="List current medications..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyMedical">Emergency Medical Contact</Label>
                    <Input
                      id="emergencyMedical"
                      value={editForm.emergencyMedicalContact}
                      onChange={(e) => setEditForm(prev => ({ ...prev, emergencyMedicalContact: e.target.value }))}
                      placeholder="Doctor or medical contact number"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Blood Type */}
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
            <div className="flex items-center gap-2">
              <Heart className="text-red-600" size={18} />
              <span className="font-medium">Blood Type</span>
            </div>
            <Badge variant="destructive" className="text-lg font-bold">
              {medicalInfo.bloodType || 'Not Set'}
            </Badge>
          </div>

          {/* Allergies */}
          {medicalInfo.allergies && (
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-orange-600" size={18} />
                <span className="font-medium text-orange-800">Critical Allergies</span>
              </div>
              <p className="text-sm text-orange-700">{medicalInfo.allergies}</p>
            </div>
          )}

          {/* Medical Conditions */}
          {medicalInfo.conditions && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="text-blue-600" size={18} />
                <span className="font-medium text-blue-800">Medical Conditions</span>
              </div>
              <p className="text-sm text-blue-700">{medicalInfo.conditions}</p>
            </div>
          )}

          {/* Current Medications */}
          {medicalInfo.medications && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="text-green-600" size={18} />
                <span className="font-medium text-green-800">Current Medications</span>
              </div>
              <p className="text-sm text-green-700">{medicalInfo.medications}</p>
            </div>
          )}

          {/* Emergency Medical Contact */}
          {medicalInfo.emergencyMedicalContact && (
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="text-purple-600" size={18} />
                  <span className="font-medium text-purple-800">Emergency Doctor</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${medicalInfo.emergencyMedicalContact}`, '_self')}
                  className="border-purple-300 text-purple-700"
                >
                  <Phone size={14} className="mr-1" />
                  Call
                </Button>
              </div>
              <p className="text-sm text-purple-700 mt-1">{medicalInfo.emergencyMedicalContact}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Medical Instructions */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-yellow-600" size={18} />
            <span className="font-medium text-yellow-800">Emergency Protocol</span>
          </div>
          <p className="text-sm text-yellow-700">
            This medical information will be automatically shared with emergency services when you activate the panic button or voice emergency commands.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}