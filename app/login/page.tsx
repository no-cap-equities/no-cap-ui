"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletConnectDialog } from "@/components/auth/wallet-connect-dialog"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginPage() {
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const router = useRouter()
  const { isAuthenticated, role } = useAuth()
  
  // Redirect if already authenticated
  if (isAuthenticated && role) {
    // Redirect based on role
    if (role === "founder") router.push("/founder/dashboard")
    else if (role === "investor") router.push("/investor/portfolio")
    else if (role === "employee") router.push("/employee/dashboard")
    return null
  }
  
  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to No Cap</CardTitle>
          <CardDescription>
            Sign in to manage your equity and cap table
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" onClick={() => setShowConnectDialog(true)}>
              <div className="flex items-center justify-center">
                <span className="mr-2">🦊</span>
                <span>Connect Wallet</span>
              </div>
            </Button>
            <Button variant="outline" onClick={() => setShowConnectDialog(true)}>
              <div className="flex items-center justify-center">
                <span className="mr-2">📧</span>
                <span>Email Sign In</span>
              </div>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            This is a demo application. No real authentication is performed.
          </div>
        </CardFooter>
      </Card>
      
      <WalletConnectDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
      />
    </div>
  )
}