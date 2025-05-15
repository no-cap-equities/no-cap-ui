"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useUserStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function RoleSwitcher() {
  const { role } = useAuth()
  const { setRole, login } = useUserStore()
  const router = useRouter()

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as any)
    login() // Keep the user logged in
    
    // Redirect to the appropriate dashboard
    if (newRole === "founder") router.push("/founder/dashboard")
    else if (newRole === "investor") router.push("/investor/portfolio")
    else if (newRole === "employee") router.push("/employee/dashboard")
  }

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/20 px-3 py-1 rounded-md">
      <span className="text-sm font-medium">Dev Mode:</span>
      <Select value={role || ""} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[120px] h-7">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="founder">Founder</SelectItem>
          <SelectItem value="investor">Investor</SelectItem>
          <SelectItem value="employee">Employee</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}