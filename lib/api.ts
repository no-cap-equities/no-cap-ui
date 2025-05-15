// API client interface and implementation for No Cap platform

import type {
  Company,
  Stakeholder,
  Security,
  Grant,
  Transaction,
  Approval,
  CapTable,
  Compliance,
  Filing,
  Treasury,
  Activity,
  ApiResponse,
  ApiError,
  EquityIssuanceFormData,
  TransferFormData,
  RuleCheckRequest,
  RuleFlow,
  FounderDashboardData,
  EmployeeDashboardData,
  InvestorDashboardData,
  VestingSchedule,
} from "@/types";

// API configuration
export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  mockDelay?: number; // For simulating network delay in development
}

// Request options
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  signal?: AbortSignal;
}

// Pagination options
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Filter options
export interface FilterOptions {
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// API Client Interface
export interface ApiClient {
  // Company methods
  getCompany(id: string, options?: RequestOptions): Promise<ApiResponse<Company>>;
  updateCompany(id: string, data: Partial<Company>, options?: RequestOptions): Promise<ApiResponse<Company>>;

  // Stakeholder methods
  getStakeholders(filters?: FilterOptions & PaginationOptions, options?: RequestOptions): Promise<ApiResponse<Stakeholder[]>>;
  getStakeholder(id: string, options?: RequestOptions): Promise<ApiResponse<Stakeholder>>;
  createStakeholder(data: Omit<Stakeholder, "id">, options?: RequestOptions): Promise<ApiResponse<Stakeholder>>;
  updateStakeholder(id: string, data: Partial<Stakeholder>, options?: RequestOptions): Promise<ApiResponse<Stakeholder>>;
  deleteStakeholder(id: string, options?: RequestOptions): Promise<ApiResponse<void>>;

  // Security methods
  getSecurities(filters?: FilterOptions & PaginationOptions, options?: RequestOptions): Promise<ApiResponse<Security[]>>;
  getSecurity(id: string, options?: RequestOptions): Promise<ApiResponse<Security>>;
  createSecurity(data: Omit<Security, "id">, options?: RequestOptions): Promise<ApiResponse<Security>>;
  updateSecurity(id: string, data: Partial<Security>, options?: RequestOptions): Promise<ApiResponse<Security>>;

  // Grant methods
  getGrants(filters?: FilterOptions & PaginationOptions, options?: RequestOptions): Promise<ApiResponse<Grant[]>>;
  getGrant(id: string, options?: RequestOptions): Promise<ApiResponse<Grant>>;
  getGrantsByStakeholder(stakeholderId: string, options?: RequestOptions): Promise<ApiResponse<Grant[]>>;
  createGrant(data: Omit<Grant, "id">, options?: RequestOptions): Promise<ApiResponse<Grant>>;
  updateGrant(id: string, data: Partial<Grant>, options?: RequestOptions): Promise<ApiResponse<Grant>>;
  exerciseGrant(id: string, quantity: number, options?: RequestOptions): Promise<ApiResponse<Transaction>>;
  cancelGrant(id: string, reason?: string, options?: RequestOptions): Promise<ApiResponse<Grant>>;

  // Transaction methods
  getTransactions(filters?: FilterOptions & PaginationOptions, options?: RequestOptions): Promise<ApiResponse<Transaction[]>>;
  getTransaction(id: string, options?: RequestOptions): Promise<ApiResponse<Transaction>>;
  createTransaction(data: Omit<Transaction, "id">, options?: RequestOptions): Promise<ApiResponse<Transaction>>;
  previewTransaction(data: TransferFormData, options?: RequestOptions): Promise<ApiResponse<RuleFlow>>;

  // Approval methods
  getApprovals(filters?: FilterOptions & PaginationOptions, options?: RequestOptions): Promise<ApiResponse<Approval[]>>;
  getApproval(id: string, options?: RequestOptions): Promise<ApiResponse<Approval>>;
  createApproval(data: Omit<Approval, "id">, options?: RequestOptions): Promise<ApiResponse<Approval>>;
  approveRequest(id: string, comments?: string, options?: RequestOptions): Promise<ApiResponse<Approval>>;
  rejectRequest(id: string, reason: string, options?: RequestOptions): Promise<ApiResponse<Approval>>;
  delegateApproval(id: string, delegateTo: string, options?: RequestOptions): Promise<ApiResponse<Approval>>;

  // Cap table methods
  getCapTable(companyId: string, asOfDate?: string, options?: RequestOptions): Promise<ApiResponse<CapTable>>;
  getCapTableHistory(companyId: string, startDate: string, endDate: string, options?: RequestOptions): Promise<ApiResponse<CapTable[]>>;
  simulateDilution(companyId: string, params: any, options?: RequestOptions): Promise<ApiResponse<CapTable>>;

  // Compliance methods
  getCompliance(companyId: string, options?: RequestOptions): Promise<ApiResponse<Compliance>>;
  getFilings(companyId: string, filters?: FilterOptions, options?: RequestOptions): Promise<ApiResponse<Filing[]>>;
  createFiling(data: Omit<Filing, "id">, options?: RequestOptions): Promise<ApiResponse<Filing>>;
  updateFilingStatus(id: string, status: string, options?: RequestOptions): Promise<ApiResponse<Filing>>;
  checkRules(request: RuleCheckRequest, options?: RequestOptions): Promise<ApiResponse<RuleFlow>>;

  // Treasury methods
  getTreasury(companyId: string, options?: RequestOptions): Promise<ApiResponse<Treasury>>;
  updateTreasury(companyId: string, data: Partial<Treasury>, options?: RequestOptions): Promise<ApiResponse<Treasury>>;

  // Activity methods
  getActivities(companyId: string, filters?: FilterOptions & PaginationOptions, options?: RequestOptions): Promise<ApiResponse<Activity[]>>;
  createActivity(data: Omit<Activity, "id">, options?: RequestOptions): Promise<ApiResponse<Activity>>;

  // Dashboard methods
  getFounderDashboard(companyId: string, options?: RequestOptions): Promise<ApiResponse<FounderDashboardData>>;
  getEmployeeDashboard(stakeholderId: string, options?: RequestOptions): Promise<ApiResponse<EmployeeDashboardData>>;
  getInvestorDashboard(stakeholderId: string, options?: RequestOptions): Promise<ApiResponse<InvestorDashboardData>>;

  // Vesting methods
  getVestingSchedules(options?: RequestOptions): Promise<ApiResponse<VestingSchedule[]>>;
  getVestingSchedule(id: string, options?: RequestOptions): Promise<ApiResponse<VestingSchedule>>;
  createVestingSchedule(data: Omit<VestingSchedule, "id">, options?: RequestOptions): Promise<ApiResponse<VestingSchedule>>;

  // Utility methods
  uploadDocument(file: File, metadata: any, options?: RequestOptions): Promise<ApiResponse<{ url: string }>>;
  downloadDocument(url: string, options?: RequestOptions): Promise<Blob>;
  exportData(type: string, format: string, filters?: any, options?: RequestOptions): Promise<Blob>;
}

// Error handling
export class ApiClientError extends Error {
  constructor(
    public statusCode: number,
    public error: ApiError,
    public response?: Response
  ) {
    super(error.message);
    this.name = "ApiClientError";
  }
}

// Response handlers
export async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      code: "UNKNOWN_ERROR",
      message: response.statusText || "An error occurred",
    }));
    
    throw new ApiClientError(response.status, error, response);
  }

  const data = await response.json();
  return data as ApiResponse<T>;
}

// Request builders
export function buildUrl(baseUrl: string, path: string, params?: Record<string, any>): string {
  const url = new URL(path, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

export function buildHeaders(
  config: ApiConfig,
  options?: RequestOptions
): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...config.headers,
    ...options?.headers,
  };
}

// Retry logic
export async function retryRequest<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) throw error;
    
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(fn, attempts - 1, delay * 2);
  }
}

// Mock delay simulation
export async function simulateDelay(delay?: number): Promise<void> {
  if (delay && process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

// Default API configuration
export const defaultApiConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "X-Client-Version": "1.0.0",
  },
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  mockDelay: process.env.NODE_ENV === "development" ? 500 : 0,
};

// Factory function to create API client
export function createApiClient(config: Partial<ApiConfig> = {}): ApiClient {
  const finalConfig = { ...defaultApiConfig, ...config };
  
  // Use mock client for development
  if (process.env.NODE_ENV === 'development') {
    const { createMockApiClient } = require('./api-client');
    return createMockApiClient(finalConfig);
  }
  
  // For production, implement real HTTP client
  throw new Error("Production API client not yet implemented");
}

// Export types and utilities
export type {
  Company,
  Stakeholder,
  Security,
  Grant,
  Transaction,
  Approval,
  CapTable,
  Compliance,
  ApiResponse,
  ApiError,
};