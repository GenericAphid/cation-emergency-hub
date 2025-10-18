import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, Shield, MapPin, Clock } from 'lucide-react'
import { useSecurityCompanies } from '@/hooks/useSecurityCompanies'
import { useTheme } from '@/hooks/useTheme'

export function SecurityCompanies() {
  const { companies, callSecurityCompany } = useSecurityCompanies()
  const { isDark } = useTheme()

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
          <Shield className="text-blue-600" size={20} />
          Local Security Companies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className={`font-medium text-sm ${
                  isDark ? 'text-white' : 'text-black'
                }`}>{company.name}</h4>
                <Badge variant="secondary" className={`text-xs ${
                  isDark ? 'bg-blue-600/30 text-blue-200' : 'bg-blue-100 text-blue-700'
                }`}>
                  {company.area}
                </Badge>
              </div>
              <div className={`flex items-center gap-4 text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span className="truncate">{company.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={10} />
                  <span className="truncate">{company.distance}</span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => callSecurityCompany(company)}
              className={`shrink-0 ml-2 ${
                isDark 
                  ? 'border-blue-600 text-blue-400 hover:bg-blue-600/20' 
                  : 'border-blue-300 text-blue-700 hover:bg-blue-50'
              }`}
            >
              <Phone size={14} className="mr-1" />
              Call
            </Button>
          </div>
        ))}
        
        <div className="text-center pt-2">
          <p className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Security companies will receive your location automatically when called during an emergency
          </p>
        </div>
      </CardContent>
    </Card>
  )
}