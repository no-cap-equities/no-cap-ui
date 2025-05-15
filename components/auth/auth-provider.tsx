"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useUserStore, Wallet, UserRole } from "@/lib/store"
import { usePathname, useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  wallet: Wallet | null
  role: UserRole
  login: (wallet?: Wallet) => void
  logout: () => void
  connectWallet: (provider: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const protectedRoutesByRole = {
  founder: ["/founder"],
  investor: ["/investor"],
  employee: ["/employee"],
}

const publicRoutes = ["/", "/login"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, wallet, role, login, logout, connectWallet, setRole } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Check for stored authentication on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("no-cap-auth")
      if (storedAuth) {
        const { isAuthenticated: stored, wallet, role } = JSON.parse(storedAuth)
        if (stored && role) {
          setRole(role)
          login(wallet)
        }
      }
    } catch (error) {
      console.error("Failed to restore authentication:", error)
    } finally {
      setIsLoading(false)
    }
  }, [login, setRole])

  // Store authentication state
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(
          "no-cap-auth",
          JSON.stringify({ isAuthenticated, wallet, role })
        )
      } catch (error) {
        console.error("Failed to store authentication:", error)
      }
    }
  }, [isAuthenticated, wallet, role, isLoading])

  // Handle route protection
  useEffect(() => {
    if (isLoading) return

    console.log("Route protection check:", { pathname, isAuthenticated, role })

    // Skip route protection in development if DISABLE_AUTH env var is set
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true') {
      console.log("Route protection disabled in development")
      return
    }

    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && pathname && !publicRoutes.includes(pathname)) {
      console.log("Not authenticated, redirecting to home")
      router.push("/")
      return
    }

    // If authenticated but trying to access a route not allowed for their role
    if (isAuthenticated && role) {
      const allowedRoutes = protectedRoutesByRole[role as keyof typeof protectedRoutesByRole] || []
      
      // Check if the current path starts with any of the allowed route prefixes
      const hasAccess = allowedRoutes.some(route => pathname.startsWith(route))
      
      console.log("Access check:", { allowedRoutes, hasAccess })
      
      if (!hasAccess && !publicRoutes.includes(pathname)) {
        // Redirect to the appropriate dashboard based on role
        console.log("No access, redirecting based on role:", role)
        if (role === "founder") router.push("/founder/dashboard")
        else if (role === "investor") router.push("/investor/portfolio")
        else if (role === "employee") router.push("/employee/dashboard")
      }
    }
  }, [isAuthenticated, pathname, role, router, isLoading])

  const value = {
    isAuthenticated,
    wallet,
    role,
    login,
    logout,
    connectWallet,
  }

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Loading authentication...</div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}