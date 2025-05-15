'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ReactNode } from 'react'

export default function FounderLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout role="founder">{children}</DashboardLayout>
}