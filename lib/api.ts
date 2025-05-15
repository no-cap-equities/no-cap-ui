import { QueryClient } from '@tanstack/react-query'

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

// API base URL
const API_BASE = '/api/mock'

// Generic fetch function
export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return response.json()
}

// API endpoints
export const api = {
  // Landing page
  getLanding: () => fetchApi('/landing'),
  
  // Founder dashboard
  getFounderDashboard: () => fetchApi('/founder-dashboard'),
  
  // Cap table
  getCapTable: (date?: string) => 
    fetchApi<CapTableData>(`/cap-table${date ? `?date=${date}` : ''}`),
  
  // Employee data
  getEmployeeGrants: (userId: string) => 
    fetchApi<EmployeeGrantsData>(`/employee-grants?user=${userId}`),
  
  // Investor data
  getInvestorHoldings: (investorId: string) => 
    fetchApi<InvestorHoldingsData>(`/investor-holdings?investor=${investorId}`),
  
  // More endpoints will be added as needed
}

// Types for API responses
interface CapTableData {
  history: Array<{
    date: string
    shares: number
    founders: number
    employees: number
    investors: number
    optionPool?: number
  }>
}

interface EmployeeGrantsData {
  user: string
  priceUSD: number // 409A price
  grants: Array<{
    grantId: string
    instrument: string
    qty: number
    strikePrice: number
    vestStart: string
    cliff: string
    vestEnd: string
    vestedQty: number
    status: string
  }>
  upcoming: Array<{
    date: string
    event: string
    qty?: number
    title?: string
  }>
}

interface InvestorHoldingsData {
  investor: string
  summary: {
    totalInvestedUsd: number
    currentValueUsd: number
    roiPct: number
  }
  holdings: Array<{
    companyId: string
    companyName: string
    logo: string
    security: string
    shares: number
    ownershipPct: number
    costBasis: number
    currentValue: number
    lastValuationDate?: string
  }>
  alerts: Array<{
    type: string
    companyId: string
    msg: string
    proposalId?: string
  }>
}