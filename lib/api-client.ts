// Mock API client implementation for development

import {
  ApiClient,
  ApiConfig,
  RequestOptions,
  ApiResponse,
  FilterOptions,
  PaginationOptions,
  buildUrl,
  buildHeaders,
  simulateDelay,
  ApiClientError,
} from "./api";

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
  EquityIssuanceFormData,
  TransferFormData,
  RuleCheckRequest,
  RuleFlow,
  FounderDashboardData,
  EmployeeDashboardData,
  InvestorDashboardData,
  VestingSchedule,
} from "@/types";

// Mock data storage
interface MockDataStore {
  companies: Map<string, Company>;
  stakeholders: Map<string, Stakeholder>;
  securities: Map<string, Security>;
  grants: Map<string, Grant>;
  transactions: Map<string, Transaction>;
  approvals: Map<string, Approval>;
  capTables: Map<string, CapTable>;
  compliance: Map<string, Compliance>;
  filings: Map<string, Filing>;
  treasury: Map<string, Treasury>;
  activities: Map<string, Activity>;
  vestingSchedules: Map<string, VestingSchedule>;
}

// Initialize mock data store
const mockData: MockDataStore = {
  companies: new Map(),
  stakeholders: new Map(),
  securities: new Map(),
  grants: new Map(),
  transactions: new Map(),
  approvals: new Map(),
  capTables: new Map(),
  compliance: new Map(),
  filings: new Map(),
  treasury: new Map(),
  activities: new Map(),
  vestingSchedules: new Map(),
};

// Mock API Client Implementation
export class MockApiClient implements ApiClient {
  constructor(private config: ApiConfig) {
    this.initializeMockData();
  }

  private async request<T>(
    method: string,
    path: string,
    options?: RequestOptions,
    body?: any
  ): Promise<ApiResponse<T>> {
    // Simulate network delay
    await simulateDelay(this.config.mockDelay);

    // Simulate errors occasionally
    if (Math.random() < 0.05) {
      throw new ApiClientError(500, {
        code: "MOCK_ERROR",
        message: "Simulated server error",
      });
    }

    // Handle different endpoints
    const response = await this.handleMockRequest(method, path, body);
    
    return {
      data: response as T,
    };
  }

  private async handleMockRequest(method: string, path: string, body?: any): Promise<any> {
    // Parse path to determine resource and action
    const pathParts = path.split("/").filter(Boolean);
    const resource = pathParts[0];
    const id = pathParts[1];
    
    switch (resource) {
      case "companies":
        return this.handleCompanyRequest(method, id, body);
      case "stakeholders":
        return this.handleStakeholderRequest(method, id, body);
      case "securities":
        return this.handleSecurityRequest(method, id, body);
      case "grants":
        return this.handleGrantRequest(method, id, body);
      case "transactions":
        return this.handleTransactionRequest(method, id, body);
      // Add more cases as needed
      default:
        throw new ApiClientError(404, {
          code: "NOT_FOUND",
          message: `Resource ${resource} not found`,
        });
    }
  }

  private handleCompanyRequest(method: string, id?: string, body?: any): any {
    switch (method) {
      case "GET":
        if (id) {
          const company = mockData.companies.get(id);
          if (!company) {
            throw new ApiClientError(404, {
              code: "NOT_FOUND",
              message: `Company ${id} not found`,
            });
          }
          return company;
        }
        return Array.from(mockData.companies.values());
      case "PUT":
      case "PATCH":
        if (!id) {
          throw new ApiClientError(400, {
            code: "BAD_REQUEST",
            message: "Company ID required for update",
          });
        }
        const existing = mockData.companies.get(id);
        if (!existing) {
          throw new ApiClientError(404, {
            code: "NOT_FOUND",
            message: `Company ${id} not found`,
          });
        }
        const updated = { ...existing, ...body, id };
        mockData.companies.set(id, updated);
        return updated;
      default:
        throw new ApiClientError(405, {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${method} not allowed for companies`,
        });
    }
  }

  private handleStakeholderRequest(method: string, id?: string, body?: any): any {
    switch (method) {
      case "GET":
        if (id) {
          const stakeholder = mockData.stakeholders.get(id);
          if (!stakeholder) {
            throw new ApiClientError(404, {
              code: "NOT_FOUND",
              message: `Stakeholder ${id} not found`,
            });
          }
          return stakeholder;
        }
        return Array.from(mockData.stakeholders.values());
      case "POST":
        const newId = `stakeholder-${Date.now()}`;
        const newStakeholder = { ...body, id: newId };
        mockData.stakeholders.set(newId, newStakeholder);
        return newStakeholder;
      case "PUT":
      case "PATCH":
        if (!id) {
          throw new ApiClientError(400, {
            code: "BAD_REQUEST",
            message: "Stakeholder ID required for update",
          });
        }
        const existing = mockData.stakeholders.get(id);
        if (!existing) {
          throw new ApiClientError(404, {
            code: "NOT_FOUND",
            message: `Stakeholder ${id} not found`,
          });
        }
        const updated = { ...existing, ...body, id };
        mockData.stakeholders.set(id, updated);
        return updated;
      case "DELETE":
        if (!id) {
          throw new ApiClientError(400, {
            code: "BAD_REQUEST",
            message: "Stakeholder ID required for deletion",
          });
        }
        if (!mockData.stakeholders.has(id)) {
          throw new ApiClientError(404, {
            code: "NOT_FOUND",
            message: `Stakeholder ${id} not found`,
          });
        }
        mockData.stakeholders.delete(id);
        return null;
      default:
        throw new ApiClientError(405, {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${method} not allowed for stakeholders`,
        });
    }
  }

  private handleSecurityRequest(method: string, id?: string, body?: any): any {
    // Similar implementation to stakeholder
    switch (method) {
      case "GET":
        if (id) {
          const security = mockData.securities.get(id);
          if (!security) {
            throw new ApiClientError(404, {
              code: "NOT_FOUND",
              message: `Security ${id} not found`,
            });
          }
          return security;
        }
        return Array.from(mockData.securities.values());
      case "POST":
        const newId = `security-${Date.now()}`;
        const newSecurity = { ...body, id: newId };
        mockData.securities.set(newId, newSecurity);
        return newSecurity;
      case "PUT":
      case "PATCH":
        if (!id) {
          throw new ApiClientError(400, {
            code: "BAD_REQUEST",
            message: "Security ID required for update",
          });
        }
        const existing = mockData.securities.get(id);
        if (!existing) {
          throw new ApiClientError(404, {
            code: "NOT_FOUND",
            message: `Security ${id} not found`,
          });
        }
        const updated = { ...existing, ...body, id };
        mockData.securities.set(id, updated);
        return updated;
      default:
        throw new ApiClientError(405, {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${method} not allowed for securities`,
        });
    }
  }

  private handleGrantRequest(method: string, id?: string, body?: any): any {
    switch (method) {
      case "GET":
        if (id) {
          const grant = mockData.grants.get(id);
          if (!grant) {
            throw new ApiClientError(404, {
              code: "NOT_FOUND",
              message: `Grant ${id} not found`,
            });
          }
          return grant;
        }
        return Array.from(mockData.grants.values());
      case "POST":
        const newId = `grant-${Date.now()}`;
        const newGrant = { ...body, id: newId };
        mockData.grants.set(newId, newGrant);
        return newGrant;
      case "PUT":
      case "PATCH":
        if (!id) {
          throw new ApiClientError(400, {
            code: "BAD_REQUEST",
            message: "Grant ID required for update",
          });
        }
        const existing = mockData.grants.get(id);
        if (!existing) {
          throw new ApiClientError(404, {
            code: "NOT_FOUND",
            message: `Grant ${id} not found`,
          });
        }
        const updated = { ...existing, ...body, id };
        mockData.grants.set(id, updated);
        return updated;
      default:
        throw new ApiClientError(405, {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${method} not allowed for grants`,
        });
    }
  }

  private handleTransactionRequest(method: string, id?: string, body?: any): any {
    switch (method) {
      case "GET":
        if (id) {
          const transaction = mockData.transactions.get(id);
          if (!transaction) {
            throw new ApiClientError(404, {
              code: "NOT_FOUND",
              message: `Transaction ${id} not found`,
            });
          }
          return transaction;
        }
        return Array.from(mockData.transactions.values());
      case "POST":
        const newId = `tx-${Date.now()}`;
        const newTransaction = { ...body, id: newId, status: "completed" };
        mockData.transactions.set(newId, newTransaction);
        return newTransaction;
      default:
        throw new ApiClientError(405, {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${method} not allowed for transactions`,
        });
    }
  }

  // Initialize mock data
  private initializeMockData(): void {
    // Add sample companies
    mockData.companies.set("acme-inc", {
      id: "acme-inc",
      name: "Acme Robotics",
      logo: "/img/acme.svg",
      valuationUsd: 850000000,
      valuationDisplay: "$8.5M",
      stage: "Series A",
      sector: "Robotics",
      foundedDate: "2020-01-01",
    });

    // Add sample stakeholders
    mockData.stakeholders.set("emp-001", {
      id: "emp-001",
      name: "Jane Doe",
      email: "jane@acme.io",
      type: "employee",
      kycStatus: "verified",
    });

    mockData.stakeholders.set("founder-001", {
      id: "founder-001",
      name: "John Smith",
      email: "john@acme.io",
      type: "founder",
      kycStatus: "verified",
    });

    // Add sample securities
    mockData.securities.set("common-stock", {
      id: "common-stock",
      type: "common",
      name: "Common Stock",
      symbol: "COMMON",
      parValue: 1, // 1 cent
      votingRights: 1,
    });

    mockData.securities.set("series-a-preferred", {
      id: "series-a-preferred",
      type: "preferred",
      name: "Series A Preferred Stock",
      symbol: "SERIESA",
      parValue: 1,
      votingRights: 1,
      liquidationPreference: 1.0,
    });

    // Add sample grants
    mockData.grants.set("grant-001", {
      id: "grant-001",
      stakeholderId: "emp-001",
      securityId: "common-stock",
      companyId: "acme-inc",
      quantity: 10000,
      strikePrice: 25,
      vestingScheduleId: "standard-4yr",
      vestStart: "2022-01-01",
      cliffDate: "2023-01-01",
      vestEnd: "2026-01-01",
      vestedQuantity: 5000,
      status: "active",
      grantDate: "2022-01-01",
    });

    // Add sample cap table
    mockData.capTables.set("acme-cap-table", {
      id: "acme-cap-table",
      companyId: "acme-inc",
      asOfDate: new Date().toISOString(),
      entries: [
        {
          stakeholderId: "founder-001",
          securityId: "common-stock",
          shares: 4500000,
          percentage: 45,
        },
        {
          stakeholderId: "emp-001",
          securityId: "common-stock",
          shares: 1500000,
          percentage: 15,
        },
      ],
      totalShares: 10000000,
      fullyDilutedShares: 10500000,
      optionPoolSize: 500000,
    });

    // Add sample treasury
    mockData.treasury.set("acme-treasury", {
      companyId: "acme-inc",
      usdCents: 220000000,
      stablecoins: [
        { symbol: "USDC", amount: 125000000 },
        { symbol: "DAI", amount: 95000000 },
      ],
      runwayDays: 270,
      lastUpdated: new Date().toISOString(),
    });

    // Add sample vesting schedules
    mockData.vestingSchedules.set("standard-4yr", {
      id: "standard-4yr",
      name: "Standard 4-Year Vesting",
      description: "4-year vesting with 1-year cliff",
      cliffMonths: 12,
      durationMonths: 48,
      vestingInterval: "monthly",
      cliffPercent: 25,
    });
  }

  // Implement API Client interface methods
  async getCompany(id: string, options?: RequestOptions): Promise<ApiResponse<Company>> {
    return this.request<Company>("GET", `/companies/${id}`, options);
  }

  async updateCompany(
    id: string,
    data: Partial<Company>,
    options?: RequestOptions
  ): Promise<ApiResponse<Company>> {
    return this.request<Company>("PATCH", `/companies/${id}`, options, data);
  }

  async getStakeholders(
    filters?: FilterOptions & PaginationOptions,
    options?: RequestOptions
  ): Promise<ApiResponse<Stakeholder[]>> {
    return this.request<Stakeholder[]>("GET", "/stakeholders", options);
  }

  async getStakeholder(id: string, options?: RequestOptions): Promise<ApiResponse<Stakeholder>> {
    return this.request<Stakeholder>("GET", `/stakeholders/${id}`, options);
  }

  async createStakeholder(
    data: Omit<Stakeholder, "id">,
    options?: RequestOptions
  ): Promise<ApiResponse<Stakeholder>> {
    return this.request<Stakeholder>("POST", "/stakeholders", options, data);
  }

  async updateStakeholder(
    id: string,
    data: Partial<Stakeholder>,
    options?: RequestOptions
  ): Promise<ApiResponse<Stakeholder>> {
    return this.request<Stakeholder>("PATCH", `/stakeholders/${id}`, options, data);
  }

  async deleteStakeholder(id: string, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.request<void>("DELETE", `/stakeholders/${id}`, options);
  }

  async getSecurities(
    filters?: FilterOptions & PaginationOptions,
    options?: RequestOptions
  ): Promise<ApiResponse<Security[]>> {
    return this.request<Security[]>("GET", "/securities", options);
  }

  async getSecurity(id: string, options?: RequestOptions): Promise<ApiResponse<Security>> {
    return this.request<Security>("GET", `/securities/${id}`, options);
  }

  async createSecurity(
    data: Omit<Security, "id">,
    options?: RequestOptions
  ): Promise<ApiResponse<Security>> {
    return this.request<Security>("POST", "/securities", options, data);
  }

  async updateSecurity(
    id: string,
    data: Partial<Security>,
    options?: RequestOptions
  ): Promise<ApiResponse<Security>> {
    return this.request<Security>("PATCH", `/securities/${id}`, options, data);
  }

  async getGrants(
    filters?: FilterOptions & PaginationOptions,
    options?: RequestOptions
  ): Promise<ApiResponse<Grant[]>> {
    return this.request<Grant[]>("GET", "/grants", options);
  }

  async getGrant(id: string, options?: RequestOptions): Promise<ApiResponse<Grant>> {
    return this.request<Grant>("GET", `/grants/${id}`, options);
  }

  async getGrantsByStakeholder(
    stakeholderId: string,
    options?: RequestOptions
  ): Promise<ApiResponse<Grant[]>> {
    const allGrants = await this.getGrants();
    const filtered = allGrants.data.filter((grant) => grant.stakeholderId === stakeholderId);
    return { data: filtered };
  }

  async createGrant(
    data: Omit<Grant, "id">,
    options?: RequestOptions
  ): Promise<ApiResponse<Grant>> {
    return this.request<Grant>("POST", "/grants", options, data);
  }

  async updateGrant(
    id: string,
    data: Partial<Grant>,
    options?: RequestOptions
  ): Promise<ApiResponse<Grant>> {
    return this.request<Grant>("PATCH", `/grants/${id}`, options, data);
  }

  async exerciseGrant(
    id: string,
    quantity: number,
    options?: RequestOptions
  ): Promise<ApiResponse<Transaction>> {
    const grant = await this.getGrant(id);
    
    // Create exercise transaction
    const transaction: Omit<Transaction, "id"> = {
      type: "exercise",
      toStakeholderId: grant.data.stakeholderId,
      securityId: grant.data.securityId,
      quantity,
      grantId: id,
      transactionDate: new Date().toISOString(),
      status: "completed",
    };
    
    return this.createTransaction(transaction, options);
  }

  async cancelGrant(
    id: string,
    reason?: string,
    options?: RequestOptions
  ): Promise<ApiResponse<Grant>> {
    return this.updateGrant(id, { status: "cancelled" }, options);
  }

  async getTransactions(
    filters?: FilterOptions & PaginationOptions,
    options?: RequestOptions
  ): Promise<ApiResponse<Transaction[]>> {
    return this.request<Transaction[]>("GET", "/transactions", options);
  }

  async getTransaction(id: string, options?: RequestOptions): Promise<ApiResponse<Transaction>> {
    return this.request<Transaction>("GET", `/transactions/${id}`, options);
  }

  async createTransaction(
    data: Omit<Transaction, "id">,
    options?: RequestOptions
  ): Promise<ApiResponse<Transaction>> {
    return this.request<Transaction>("POST", "/transactions", options, data);
  }

  async previewTransaction(
    data: TransferFormData,
    options?: RequestOptions
  ): Promise<ApiResponse<RuleFlow>> {
    // Mock rule checking
    const ruleFlow: RuleFlow = {
      flow: [
        { rule: "Sender KYC", passed: true },
        { rule: "Recipient KYC", passed: true },
        { rule: "Transfer Window", passed: true },
      ],
      final: "allowed",
    };
    
    return { data: ruleFlow };
  }

  // Implement remaining methods...
  // (For brevity, I'll stub out the remaining methods)

  async getApprovals(): Promise<ApiResponse<Approval[]>> {
    return { data: [] };
  }

  async getApproval(id: string): Promise<ApiResponse<Approval>> {
    throw new Error("Not implemented");
  }

  async createApproval(data: Omit<Approval, "id">): Promise<ApiResponse<Approval>> {
    throw new Error("Not implemented");
  }

  async approveRequest(id: string, comments?: string): Promise<ApiResponse<Approval>> {
    throw new Error("Not implemented");
  }

  async rejectRequest(id: string, reason: string): Promise<ApiResponse<Approval>> {
    throw new Error("Not implemented");
  }

  async delegateApproval(id: string, delegateTo: string): Promise<ApiResponse<Approval>> {
    throw new Error("Not implemented");
  }

  async getCapTable(companyId: string, asOfDate?: string): Promise<ApiResponse<CapTable>> {
    const capTable = mockData.capTables.get(`${companyId}-cap-table`);
    if (!capTable) {
      throw new ApiClientError(404, {
        code: "NOT_FOUND",
        message: `Cap table for company ${companyId} not found`,
      });
    }
    return { data: capTable };
  }

  async getCapTableHistory(
    companyId: string,
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<CapTable[]>> {
    return { data: [] };
  }

  async simulateDilution(companyId: string, params: any): Promise<ApiResponse<CapTable>> {
    const capTable = await this.getCapTable(companyId);
    // Simulate dilution logic here
    return capTable;
  }

  async getCompliance(companyId: string): Promise<ApiResponse<Compliance>> {
    const compliance = mockData.compliance.get(companyId);
    if (!compliance) {
      // Return default compliance
      return {
        data: {
          id: `${companyId}-compliance`,
          companyId,
          score: 85,
          ipoReadiness: 65,
          jurisdictions: [],
          checklist: [],
          filings: [],
          ruleLog: [],
        },
      };
    }
    return { data: compliance };
  }

  async getFilings(companyId: string): Promise<ApiResponse<Filing[]>> {
    return { data: [] };
  }

  async createFiling(data: Omit<Filing, "id">): Promise<ApiResponse<Filing>> {
    throw new Error("Not implemented");
  }

  async updateFilingStatus(id: string, status: string): Promise<ApiResponse<Filing>> {
    throw new Error("Not implemented");
  }

  async checkRules(request: RuleCheckRequest): Promise<ApiResponse<RuleFlow>> {
    return this.previewTransaction(request as any);
  }

  async getTreasury(companyId: string): Promise<ApiResponse<Treasury>> {
    const treasury = mockData.treasury.get(`${companyId}-treasury`);
    if (!treasury) {
      throw new ApiClientError(404, {
        code: "NOT_FOUND",
        message: `Treasury for company ${companyId} not found`,
      });
    }
    return { data: treasury };
  }

  async updateTreasury(
    companyId: string,
    data: Partial<Treasury>
  ): Promise<ApiResponse<Treasury>> {
    throw new Error("Not implemented");
  }

  async getActivities(companyId: string): Promise<ApiResponse<Activity[]>> {
    return { data: [] };
  }

  async createActivity(data: Omit<Activity, "id">): Promise<ApiResponse<Activity>> {
    throw new Error("Not implemented");
  }

  async getFounderDashboard(companyId: string): Promise<ApiResponse<FounderDashboardData>> {
    const company = await this.getCompany(companyId);
    const capTable = await this.getCapTable(companyId);
    const treasury = await this.getTreasury(companyId);
    const compliance = await this.getCompliance(companyId);
    const activities = await this.getActivities(companyId);
    
    return {
      data: {
        company: company.data,
        capTable: capTable.data,
        treasury: treasury.data,
        checklist: compliance.data.checklist,
        activity: activities.data,
      },
    };
  }

  async getEmployeeDashboard(stakeholderId: string): Promise<ApiResponse<EmployeeDashboardData>> {
    const stakeholder = await this.getStakeholder(stakeholderId);
    const grants = await this.getGrantsByStakeholder(stakeholderId);
    
    return {
      data: {
        stakeholder: stakeholder.data,
        grants: grants.data,
        exerciseHistory: [],
        upcomingEvents: [],
        currentValuation: 250, // $2.50 per share
      },
    };
  }

  async getInvestorDashboard(stakeholderId: string): Promise<ApiResponse<InvestorDashboardData>> {
    const stakeholder = await this.getStakeholder(stakeholderId);
    
    return {
      data: {
        investor: stakeholder.data,
        summary: {
          totalInvestedUsd: 150000000,
          currentValueUsd: 375000000,
          roiPct: 150,
        },
        holdings: [],
        alerts: [],
      },
    };
  }

  async getVestingSchedules(): Promise<ApiResponse<VestingSchedule[]>> {
    return { data: Array.from(mockData.vestingSchedules.values()) };
  }

  async getVestingSchedule(id: string): Promise<ApiResponse<VestingSchedule>> {
    const schedule = mockData.vestingSchedules.get(id);
    if (!schedule) {
      throw new ApiClientError(404, {
        code: "NOT_FOUND",
        message: `Vesting schedule ${id} not found`,
      });
    }
    return { data: schedule };
  }

  async createVestingSchedule(
    data: Omit<VestingSchedule, "id">
  ): Promise<ApiResponse<VestingSchedule>> {
    const id = `schedule-${Date.now()}`;
    const schedule = { ...data, id };
    mockData.vestingSchedules.set(id, schedule);
    return { data: schedule };
  }

  async uploadDocument(file: File, metadata: any): Promise<ApiResponse<{ url: string }>> {
    // Simulate file upload
    return { data: { url: `https://mock-storage.com/${file.name}` } };
  }

  async downloadDocument(url: string): Promise<Blob> {
    // Simulate file download
    return new Blob(["Mock document content"], { type: "application/pdf" });
  }

  async exportData(type: string, format: string, filters?: any): Promise<Blob> {
    // Simulate data export
    return new Blob(["Mock export data"], { type: "text/csv" });
  }
}

// Factory function to create mock API client
export function createMockApiClient(config: Partial<ApiConfig> = {}): ApiClient {
  const finalConfig = { ...config, baseUrl: config.baseUrl || "/api/mock" };
  return new MockApiClient(finalConfig as ApiConfig);
}