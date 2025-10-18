import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, User, AlertCircle } from 'lucide-react'

interface AuthScreenProps {
  onLogin: () => void
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Demo credentials
  const DEMO_USERNAME = 'demo'
  const DEMO_PASSWORD = 'demo123'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        onLogin()
      } else {
        setError('Invalid credentials. Use demo/demo123')
        setIsLoading(false)
      }
    }, 800)
  }

  const handleDemoLogin = () => {
    setUsername(DEMO_USERNAME)
    setPassword(DEMO_PASSWORD)
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      onLogin()
    }, 800)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <img 
               src="/logo.png" 
               alt="South African Security Logo" 
               className="w-16 h-16 mx-auto"
               onError={(e) => {
                // Fallback to shield if logo doesn't load
                e.currentTarget.style.display = 'none';
                const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                if (sibling) sibling.style.display = 'block';
               }}
              />
              <Shield className="text-red-400 hidden mx-auto" size={64} />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Emergency Hub</h1>
            <p className="text-gray-300">Your Safety, Our Priority</p>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-xl bg-black/60 border-gray-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                Sign In
              </CardTitle>
              <p className="text-center text-gray-400 text-sm mt-2">
                Access your emergency response system
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="pl-10 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pl-10 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/40 rounded-md">
                    <AlertCircle className="text-red-400" size={18} />
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11"
                  disabled={isLoading || !username || !password}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Demo Login Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDemoLogin}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 backdrop-blur-sm"
                  disabled={isLoading}
                >
                  Use Demo Account
                </Button>

                {/* Demo Credentials Info */}
                <div className="mt-4 p-3 bg-gray-800/30 border border-gray-600 rounded-md">
                  <p className="text-gray-300 text-xs text-center">
                    <strong>Demo Credentials:</strong><br />
                    Username: <code className="bg-black/30 px-1 rounded">demo</code> | 
                    Password: <code className="bg-black/30 px-1 rounded">demo123</code>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            <p>
              Built by <span className="font-semibold text-white">Maagric Tech</span> and{' '}
              <span className="font-semibold text-white">Teeza Robotics</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

