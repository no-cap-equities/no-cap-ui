"use client";

import React, { ReactNode } from 'react';
import { SidebarNav } from './sidebar-nav';
import { TopBar } from './top-bar';

interface DashboardLayoutProps {
  company: {
    id: string;
    name: string;
    logo: string;
  };
  children: ReactNode;
  notificationCount?: number;
  onCompanyChange?: (companyId: string) => void;
}

export function DashboardLayout({
  company,
  children,
  notificationCount,
  onCompanyChange
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <SidebarNav />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          company={company} 
          notificationCount={notificationCount}
          onCompanyChange={onCompanyChange}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}