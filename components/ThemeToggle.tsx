import {Button} from '@/components/ui/button'
import {Sun, Moon} from 'lucide-react'
import {useTheme} from '@/hooks/useTheme'

export function ThemeToggle() {
 const {theme, toggleTheme} = useTheme()
 const isDark = theme === 'dark'

 return (
  <Button
   variant="ghost"
   size="sm"
   onClick={toggleTheme}
   className={`backdrop-blur-sm rounded-full p-2 transition-all duration-300 ${
    isDark 
     ? 'bg-white/10 hover:bg-white/20 text-yellow-300' 
     : 'bg-white/20 hover:bg-white/30 text-blue-200'
   }`}
  >
   {isDark ? <Sun size={18} /> : <Moon size={18} />}
  </Button>
 )
}