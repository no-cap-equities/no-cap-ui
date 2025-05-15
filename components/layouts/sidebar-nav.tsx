"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  PieChart, 
  FileText, 
  UserCircle, 
  Shield, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const founderNavItems: NavItem[] = [
    {
      href: '/founder/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      href: '/founder/cap-table',
      label: 'Cap Table',
      icon: <PieChart className="h-5 w-5" />
    },
    {
      href: '/founder/issue-equity',
      label: 'Issue Equity',
      icon: <FileText className="h-5 w-5" />
    },
    {
      href: '/founder/stakeholders',
      label: 'Stakeholders',
      icon: <UserCircle className="h-5 w-5" />
    },
    {
      href: '/founder/compliance',
      label: 'Compliance',
      icon: <Shield className="h-5 w-5" />
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className={cn(
      "h-screen border-r flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className={cn("flex items-center gap-2", collapsed && "hidden")}>
          <span className="text-2xl">🧢</span>
          <span className="font-bold text-lg">No Cap</span>
        </div>
        <span className={cn("text-2xl", !collapsed && "hidden")}>🧢</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapsed}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="p-2 flex-grow">
        <ul className="space-y-1">
          {founderNavItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md hover:bg-muted/80 transition-colors",
                  collapsed ? "justify-center" : "px-3"
                )}
              >
                {item.icon}
                <span className={cn("text-sm", collapsed && "hidden")}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center gap-2",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCircle className="h-5 w-5 text-primary" />
          </div>
          <div className={cn("text-sm", collapsed && "hidden")}>
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@nocap.dev</p>
          </div>
        </div>
      </div>
    </div>
  );
}