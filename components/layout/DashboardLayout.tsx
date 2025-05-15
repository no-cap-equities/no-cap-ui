'use client'

import { ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { TopBar } from './TopBar'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'founder' | 'investor' | 'employee'
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <SidebarNav role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}