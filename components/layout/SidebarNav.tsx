'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface SidebarNavProps {
  role: 'founder' | 'investor' | 'employee'
}

const navItems = {
  founder: [
    { href: '/founder/dashboard', label: 'Dashboard' },
    { href: '/founder/cap-table', label: 'Cap Table' },
    { href: '/founder/issue-equity', label: 'Issue Equity' },
    { href: '/founder/compliance', label: 'Compliance' },
    { href: '/founder/transactions', label: 'Transactions' },
    { href: '/founder/modeling', label: 'Modeling' },
    { href: '/founder/governance', label: 'Governance' },
  ],
  investor: [
    { href: '/investor/portfolio', label: 'Portfolio' },
    { href: '/investor/companies', label: 'Companies' },
    { href: '/investor/voting', label: 'Voting' },
    { href: '/investor/documents', label: 'Documents' }
  ],
  employee: [
    { href: '/employee/dashboard', label: 'Dashboard' },
    { href: '/employee/grants', label: 'My Grants' },
    { href: '/employee/exercise', label: 'Exercise Options' },
    { href: '/employee/learn', label: 'Learn' }
  ]
}

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const items = navItems[role]

  return (
    <div className={cn(
      "flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground", 
      isCollapsed ? "w-16" : "w-64",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🧢</span>
          {!isCollapsed && <span className="font-semibold">No Cap</span>}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-sidebar-foreground hover:text-sidebar-primary"
        >
          {isCollapsed ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md mx-2",
                  pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" : "",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                {item.label === 'Dashboard' && (
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <Link 
          href="/"
          className={cn(
            "flex items-center text-sm font-medium",
            "hover:text-sidebar-primary",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && "Exit to Landing"}
        </Link>
      </div>
    </div>
  )
}