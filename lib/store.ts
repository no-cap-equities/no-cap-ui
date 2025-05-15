import { create } from 'zustand'

type UserRole = 'founder' | 'investor' | 'employee' | null

interface UserState {
  role: UserRole
  isAuthenticated: boolean
  setRole: (role: UserRole) => void
  login: () => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  role: null,
  isAuthenticated: false,
  setRole: (role) => set({ role }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, role: null }),
}))

interface CompanyState {
  selectedCompany: string | null
  setSelectedCompany: (companyId: string) => void
}

export const useCompanyStore = create<CompanyState>((set) => ({
  selectedCompany: null,
  setSelectedCompany: (companyId) => set({ selectedCompany: companyId }),
}))