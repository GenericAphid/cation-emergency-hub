import {useEffect} from 'react'
import {atom, useAtom} from 'jotai'

type Theme = 'light' | 'dark' | 'system'

// Theme atom with system preference detection
const themeAtom = atom<Theme>('system')

export function useTheme() {
 const [theme, setTheme] = useAtom(themeAtom)

 // Get the effective theme (resolving 'system' to actual preference)
 const getEffectiveTheme = (): 'light' | 'dark' => {
  if (theme === 'system') {
   if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
   }
   return 'light'
  }
  return theme
 }

 const effectiveTheme = getEffectiveTheme()

 // Load theme from localStorage and system preference on mount
 useEffect(() => {
  const stored = localStorage.getItem('emergency-app-theme') as Theme
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
   setTheme(stored)
  } else {
   // Default to system preference
   setTheme('system')
  }
 }, [setTheme])

 // Update localStorage when theme changes
 useEffect(() => {
  localStorage.setItem('emergency-app-theme', theme)
 }, [theme])

 // Listen for system theme changes
 useEffect(() => {
  if (theme === 'system') {
   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
   const handleChange = () => {
    // Trigger re-render when system theme changes
    setTheme('system')
   }

   mediaQuery.addEventListener('change', handleChange)
   return () => mediaQuery.removeEventListener('change', handleChange)
  }
 }, [theme, setTheme])

 const toggleTheme = () => {
  setTheme(current => {
   if (current === 'light') return 'dark'
   if (current === 'dark') return 'system'
   return 'light'
  })
 }

 const setSpecificTheme = (newTheme: Theme) => {
  setTheme(newTheme)
 }

 return {
  theme: effectiveTheme,
  rawTheme: theme,
  toggleTheme,
  setTheme: setSpecificTheme,
  isDark: effectiveTheme === 'dark'
 }
}