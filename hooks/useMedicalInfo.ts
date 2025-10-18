import { useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'

interface MedicalInfo {
  bloodType: string
  allergies: string
  conditions: string
  medications: string
  emergencyMedicalContact: string
}

const medicalInfoAtom = atom<MedicalInfo>({
  bloodType: '',
  allergies: '',
  conditions: '',
  medications: '',
  emergencyMedicalContact: ''
})

export function useMedicalInfo() {
  const [medicalInfo, setMedicalInfo] = useAtom(medicalInfoAtom)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('emergency-medical-info')
    if (saved) {
      try {
        setMedicalInfo(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load medical info:', error)
      }
    }
  }, [setMedicalInfo])

  const updateMedicalInfo = (newInfo: MedicalInfo) => {
    setMedicalInfo(newInfo)
    localStorage.setItem('emergency-medical-info', JSON.stringify(newInfo))
  }

  return {
    medicalInfo,
    updateMedicalInfo
  }
}