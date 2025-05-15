"use client"

import { useState } from "react"
import { useUserStore, UserRole } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface WalletConnectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectDialog({ open, onOpenChange }: WalletConnectDialogProps) {
  const { connectWallet, login, setRole } = useUserStore()
  const [connecting, setConnecting] = useState(false)
  const [email, setEmail] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("founder")
  
  // Mock wallet providers
  const walletProviders = [
    { id: "metamask", name: "MetaMask", icon: "🦊" },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
    { id: "coinbase", name: "Coinbase", icon: "📱" },
  ]
  
  async function handleWalletConnect(providerId: string) {
    try {
      setConnecting(true)
      await connectWallet(providerId)
      
      // Auto-assign role based on wallet (in a real app this would come from the backend)
      setRole(selectedRole)
      
      // Complete login
      login()
      
      // Close dialog after successful connection
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setConnecting(false)
    }
  }
  
  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setConnecting(true)
    
    // Simulate network request delay
    setTimeout(() => {
      // Set role and login
      setRole(selectedRole)
      login()
      
      // Close dialog
      onOpenChange(false)
      setConnecting(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to No Cap</DialogTitle>
          <DialogDescription>
            Connect your wallet or sign in with email to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role (Demo)</Label>
              <select 
                id="role"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedRole || ""}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                <option value="founder">Founder</option>
                <option value="investor">Investor</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            
            <div className="space-y-4 mt-4">
              {walletProviders.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={connecting}
                  onClick={() => handleWalletConnect(provider.id)}
                >
                  <span className="mr-2 text-lg">{provider.icon}</span>
                  <span>Connect with {provider.name}</span>
                  {connecting && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="email">
            <form onSubmit={handleEmailLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-role">Select Role (Demo)</Label>
                <select 
                  id="email-role"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedRole || ""}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                >
                  <option value="founder">Founder</option>
                  <option value="investor">Investor</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              
              <Button type="submit" className="w-full" disabled={connecting}>
                {connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In with Email"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col space-y-2">
          <div className="text-xs text-muted-foreground text-center">
            This is a demo authentication flow. No real authentication is performed.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}