import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('emergency-hub-auth')
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = () => {
    localStorage.setItem('emergency-hub-auth', 'authenticated')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('emergency-hub-auth')
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  }
}

