'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { WalletConnectDialog } from '@/components/auth/wallet-connect-dialog'
import { useAuth } from '@/components/auth/auth-provider'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartPieIcon, CurrencyDollarIcon, UserGroupIcon, ShieldCheckIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { isAuthenticated, role } = useAuth()
  const router = useRouter()

  const handleRoleSelect = (selectedRole: 'founder' | 'investor' | 'employee') => {
    if (isAuthenticated) {
      // If already logged in, switch role and navigate
      useUserStore.setState({ role: selectedRole })
      if (selectedRole === "founder") router.push("/founder/dashboard")
      else if (selectedRole === "investor") router.push("/investor/portfolio") 
      else if (selectedRole === "employee") router.push("/employee/dashboard")
    } else {
      // If not logged in, set role and show wallet dialog
      useUserStore.setState({ role: selectedRole })
      setShowConnectDialog(true)
    }
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated blockchain background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
        <svg 
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="blockchain-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="#8b5cf6" fillOpacity="0.2">
                <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
              </circle>
              <line x1="50" y1="50" x2="100" y2="50" stroke="#8b5cf6" strokeOpacity="0.1" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="50" x2="0" y2="50" stroke="#8b5cf6" strokeOpacity="0.1" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="50" x2="50" y2="100" stroke="#8b5cf6" strokeOpacity="0.1" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="50" x2="50" y2="0" stroke="#8b5cf6" strokeOpacity="0.1" strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
              </line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blockchain-pattern)" />
        </svg>
      </div>

      {/* Header */}
      <header className="container mx-auto p-6 flex justify-between items-center relative z-10 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧢</span>
          <div>
            <h1 className="text-2xl font-bold">No Cap</h1>
            <p className="text-xs text-muted-foreground">Equity management for the digital age</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold">Forte</span>
          </div>
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={() => {
                if (role === "founder") router.push("/founder/dashboard")
                else if (role === "investor") router.push("/investor/portfolio")
                else if (role === "employee") router.push("/employee/dashboard")
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={() => setShowConnectDialog(true)}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in-up">
          Choose Your Role
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl text-lg animate-fade-in-up animate-delay-100">
          Experience equity management tailored to your needs. Select your primary role to get started.
        </p>

        {/* Role cards */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Founder Card */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 animate-scale-in animate-delay-200 ${
              hoveredCard === 'founder' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleRoleSelect('founder')}
            onMouseEnter={() => setHoveredCard('founder')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            <CardHeader className="pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                <ChartPieIcon className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Founder / Admin</CardTitle>
              <CardDescription className="text-base">
                Take control of your company's equity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Manage cap table & ownership
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Issue equity & handle compliance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Model dilution scenarios
                </li>
              </ul>
              <Button 
                className="w-full mt-6" 
                variant={hoveredCard === 'founder' ? 'default' : 'outline'}
              >
                Enter as Founder
              </Button>
            </CardContent>
          </Card>

          {/* Investor Card */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 animate-scale-in animate-delay-300 ${
              hoveredCard === 'investor' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleRoleSelect('investor')}
            onMouseEnter={() => setHoveredCard('investor')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            <CardHeader className="pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                <CurrencyDollarIcon className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Investor</CardTitle>
              <CardDescription className="text-base">
                Monitor and manage your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Track portfolio performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Participate in governance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Access real-time valuations
                </li>
              </ul>
              <Button 
                className="w-full mt-6" 
                variant={hoveredCard === 'investor' ? 'default' : 'outline'}
              >
                Enter as Investor
              </Button>
            </CardContent>
          </Card>

          {/* Employee Card */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 animate-scale-in animate-delay-400 ${
              hoveredCard === 'employee' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleRoleSelect('employee')}
            onMouseEnter={() => setHoveredCard('employee')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            <CardHeader className="pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                <UserGroupIcon className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Employee</CardTitle>
              <CardDescription className="text-base">
                Understand and manage your equity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  View vesting schedules
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Exercise options seamlessly
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Understand your ownership
                </li>
              </ul>
              <Button 
                className="w-full mt-6" 
                variant={hoveredCard === 'employee' ? 'default' : 'outline'}
              >
                Enter as Employee
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-4 mt-16 justify-center animate-fade-in-up animate-delay-500">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            Seamless Compliance
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Real-Time Cap Table
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <BoltIcon className="w-4 h-4 mr-2" />
            On-Chain Actions
          </Badge>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto p-6 border-t border-border relative z-10 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="text-xs">
              <ShieldCheckIcon className="w-3 h-3 mr-1" />
              SOC 2 Type II
            </Badge>
            <Badge variant="outline" className="text-xs">
              <ShieldCheckIcon className="w-3 h-3 mr-1" />
              ISO 27001
            </Badge>
            <Badge variant="outline" className="text-xs">
              <ShieldCheckIcon className="w-3 h-3 mr-1" />
              SEC Compliant
            </Badge>
          </div>
        </div>
      </footer>
      
      <WalletConnectDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
      />
    </main>
  );
}