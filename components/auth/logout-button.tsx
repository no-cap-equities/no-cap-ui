"use client"

import { useRouter } from "next/navigation"
import { Button, ButtonProps } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { LogOut } from "lucide-react"

interface LogoutButtonProps extends ButtonProps {}

export function LogoutButton({ className, ...props }: LogoutButtonProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className={className}
      {...props}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  )
}