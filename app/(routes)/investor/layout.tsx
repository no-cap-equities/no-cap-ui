'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ReactNode } from 'react'

export default function InvestorLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout role="investor">{children}</DashboardLayout>
}