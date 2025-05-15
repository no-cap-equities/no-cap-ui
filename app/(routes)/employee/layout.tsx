'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ReactNode } from 'react'

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout role="employee">{children}</DashboardLayout>
}