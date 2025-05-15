import { create } from 'zustand'

export type UserRole = 'founder' | 'investor' | 'employee' | null

export interface Wallet {
  address: string
  shortAddress: string
  provider: string
}

export interface UserState {
  role: UserRole
  isAuthenticated: boolean
  wallet: Wallet | null
  setRole: (role: UserRole) => void
  login: (wallet?: Wallet) => void
  logout: () => void
  connectWallet: (provider: string) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  role: null,
  isAuthenticated: false,
  wallet: null,
  setRole: (role) => set({ role }),
  login: (wallet) => set({ isAuthenticated: true, wallet: wallet || get().wallet }),
  logout: () => {
    // Clear localStorage to ensure clean state
    localStorage.removeItem('no-cap-auth')
    set({ isAuthenticated: false, role: null, wallet: null })
  },
  connectWallet: async (provider) => {
    // Mock wallet connection
    const randomAddress = `0x${Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`
    
    const wallet = {
      address: randomAddress,
      shortAddress: `${randomAddress.slice(0, 6)}...${randomAddress.slice(-4)}`,
      provider
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    set({ wallet })
    return
  }
}))

interface CompanyState {
  selectedCompany: string | null
  setSelectedCompany: (companyId: string) => void
}

export const useCompanyStore = create<CompanyState>((set) => ({
  selectedCompany: null,
  setSelectedCompany: (companyId) => set({ selectedCompany: companyId }),
}))