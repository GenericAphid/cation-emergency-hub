import { useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'

interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

const emergencyContactsAtom = atom<EmergencyContact[]>([])

export function useEmergencyContacts() {
  const [contacts, setContacts] = useAtom(emergencyContactsAtom)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('emergency-contacts')
    if (saved) {
      try {
        setContacts(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load emergency contacts:', error)
      }
    }
  }, [setContacts])

  const addContact = (contact: EmergencyContact) => {
    const updatedContacts = [...contacts, contact]
    setContacts(updatedContacts)
    localStorage.setItem('emergency-contacts', JSON.stringify(updatedContacts))
  }

  const removeContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index)
    setContacts(updatedContacts)
    localStorage.setItem('emergency-contacts', JSON.stringify(updatedContacts))
  }

  const notifyContacts = async () => {
    // In a real app, this would send actual notifications
    // For now, we'll simulate the notification process
    console.log('Notifying emergency contacts:', contacts)
    
    const location = 'Mondeor, Johannesburg' // From location hook
    const timestamp = new Date().toLocaleString()
    
    contacts.forEach(contact => {
      const message = `EMERGENCY ALERT - ${timestamp}. I need help! My location: ${location}. Contact emergency services if you cannot reach me.`
      
      // This would trigger actual SMS/call in a production app
      console.log(`Sending to ${contact.name} (${contact.phone}):`, message)
      
      // For demo purposes, we can open SMS intent
      // window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`, '_self')
    })
    
    return Promise.resolve()
  }

  return {
    contacts,
    addContact,
    removeContact,
    notifyContacts
  }
}