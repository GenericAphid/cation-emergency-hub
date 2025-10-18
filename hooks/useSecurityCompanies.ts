import { useState } from 'react'

interface SecurityCompany {
  name: string
  phone: string
  area: string
  responseTime: string
  distance: string
}

export function useSecurityCompanies() {
  const [companies] = useState<SecurityCompany[]>([
    {
      name: 'Mondeor Security',
      phone: '+27118349555',
      area: 'Mondeor',
      responseTime: '5-8 min',
      distance: '1.2 km'
    },
    {
      name: 'Southdale Patrol',
      phone: '+27119424700',
      area: 'Southdale',
      responseTime: '8-12 min',
      distance: '2.5 km'
    },
    {
      name: 'ADT Johannesburg South',
      phone: '+27860238238',
      area: 'Johannesburg South',
      responseTime: '10-15 min',
      distance: '3.8 km'
    }
  ])

  const callSecurityCompany = (company: SecurityCompany) => {
    // In a real app, this would also send location data
    console.log(`Calling ${company.name} with location data`)
    window.open(`tel:${company.phone}`, '_self')
  }

  return {
    companies,
    callSecurityCompany
  }
}