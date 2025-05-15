'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { WalletConnectDialog } from '@/components/auth/wallet-connect-dialog'
import { useAuth } from '@/components/auth/auth-provider'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/store'

export default function Home() {
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const { isAuthenticated, role } = useAuth()
  const router = useRouter()
  return (
    <main className="min-h-screen flex flex-col">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧢</span>
          <h1 className="text-xl font-bold">No Cap</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Powered by Forte
          </div>
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm" 
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
              size="sm" 
              onClick={() => setShowConnectDialog(true)}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Equity management for the digital age</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl">
          Streamlined cap table management, compliance automation, and on-chain actions
          in one unified platform.
        </p>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Founder Card */}
          <div 
            onClick={() => {
              if (isAuthenticated) {
                // If already logged in, switch role and navigate
                useUserStore.setState({ role: 'founder' })
                router.push("/founder/dashboard")
              } else {
                // If not logged in, set role and show wallet dialog
                useUserStore.setState({ role: 'founder' })
                setShowConnectDialog(true)
              }
            }}
            className="flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Founder / Admin</h3>
            <p className="text-muted-foreground text-center text-sm">
              Manage your cap table, issue equity, and monitor compliance
            </p>
            <div className="mt-6 text-primary font-medium">
              Enter as Founder
            </div>
          </div>

          {/* Investor Card */}
          <div 
            onClick={() => {
              if (isAuthenticated) {
                // If already logged in, switch role and navigate
                useUserStore.setState({ role: 'investor' })
                router.push("/investor/portfolio")
              } else {
                // If not logged in, set role and show wallet dialog
                useUserStore.setState({ role: 'investor' })
                setShowConnectDialog(true)
              }
            }}
            className="flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Investor</h3>
            <p className="text-muted-foreground text-center text-sm">
              Track your investments, monitor performance, and participate in governance
            </p>
            <div className="mt-6 text-primary font-medium">
              Enter as Investor
            </div>
          </div>

          {/* Employee Card */}
          <div 
            onClick={() => {
              if (isAuthenticated) {
                // If already logged in, switch role and navigate
                useUserStore.setState({ role: 'employee' })
                router.push("/employee/dashboard")
              } else {
                // If not logged in, set role and show wallet dialog
                useUserStore.setState({ role: 'employee' })
                setShowConnectDialog(true)
              }
            }}
            className="flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Employee</h3>
            <p className="text-muted-foreground text-center text-sm">
              View your equity, understand vesting, and exercise options
            </p>
            <div className="mt-6 text-primary font-medium">
              Enter as Employee
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-16">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Seamless Compliance</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span>Real-Time Cap Table</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>On-Chain Actions</span>
          </div>
        </div>
      </div>

      <footer className="container mx-auto p-6 border-t border-border">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Docs</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
          <div className="flex gap-4">
            <div className="text-xs text-muted-foreground">SOC 2 Type II</div>
            <div className="text-xs text-muted-foreground">ISO 27001</div>
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