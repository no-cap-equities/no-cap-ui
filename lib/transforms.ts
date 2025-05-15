// Data transformation utilities for No Cap types

import type {
  CapTable,
  CapTableEntry,
  ChartDataPoint,
  TimeSeriesDataPoint,
  Grant,
  Transaction,
  Stakeholder,
  Security,
  Company,
  Treasury,
  StablecoinBalance,
  Activity,
  InvestorHolding,
  FounderDashboardData,
  EmployeeDashboardData,
  InvestorDashboardData,
} from "@/types";

// Currency formatting helpers
export function centsToUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatLargeNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Date formatting helpers
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(d);
}

export function getRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Cap table transformations
export function capTableToChart(capTable: CapTable): ChartDataPoint[] {
  return capTable.entries.map((entry) => ({
    label: getStakeholderLabel(entry.stakeholderId),
    value: entry.shares,
    percentage: entry.percentage,
    color: getStakeholderColor(entry.stakeholderId),
  }));
}

export function calculateOwnershipPercentage(shares: number, totalShares: number): number {
  return (shares / totalShares) * 100;
}

export function groupCapTableByType(
  entries: CapTableEntry[],
  stakeholders: Stakeholder[]
): Record<string, CapTableEntry[]> {
  const stakeholderMap = new Map(stakeholders.map((s) => [s.id, s]));
  
  return entries.reduce((groups, entry) => {
    const stakeholder = stakeholderMap.get(entry.stakeholderId);
    const type = stakeholder?.type || "other";
    
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(entry);
    
    return groups;
  }, {} as Record<string, CapTableEntry[]>);
}

export function aggregateCapTableByType(
  entries: CapTableEntry[],
  stakeholders: Stakeholder[]
): ChartDataPoint[] {
  const grouped = groupCapTableByType(entries, stakeholders);
  
  return Object.entries(grouped).map(([type, entries]) => {
    const totalShares = entries.reduce((sum, e) => sum + e.shares, 0);
    const totalPercentage = entries.reduce((sum, e) => sum + e.percentage, 0);
    
    return {
      label: capitalizeFirst(type),
      value: totalShares,
      percentage: totalPercentage,
      color: getTypeColor(type),
    };
  });
}

// Grant transformations
export function calculateVestedAmount(grant: Grant, asOfDate?: Date): number {
  const now = asOfDate || new Date();
  const startDate = new Date(grant.vestStart || grant.grantDate);
  const cliffDate = grant.cliffDate ? new Date(grant.cliffDate) : null;
  const endDate = grant.vestEnd ? new Date(grant.vestEnd) : null;

  // If we're before the cliff, nothing is vested
  if (cliffDate && now < cliffDate) {
    return 0;
  }

  // If we're after the end date, everything is vested
  if (endDate && now >= endDate) {
    return grant.quantity;
  }

  // Calculate linear vesting
  if (endDate) {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const vestedPercentage = Math.min(elapsed / totalDuration, 1);
    return Math.floor(grant.quantity * vestedPercentage);
  }

  // If no end date, assume fully vested
  return grant.quantity;
}

export function getVestingProgress(grant: Grant): number {
  const vested = calculateVestedAmount(grant);
  return (vested / grant.quantity) * 100;
}

export function getNextVestingDate(grant: Grant): Date | null {
  const now = new Date();
  const endDate = grant.vestEnd ? new Date(grant.vestEnd) : null;
  
  if (!endDate || now >= endDate) {
    return null;
  }
  
  // Assume monthly vesting for simplicity
  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  
  return nextMonth <= endDate ? nextMonth : endDate;
}

// Transaction transformations
export function groupTransactionsByType(transactions: Transaction[]): Record<string, Transaction[]> {
  return transactions.reduce((groups, tx) => {
    if (!groups[tx.type]) {
      groups[tx.type] = [];
    }
    groups[tx.type].push(tx);
    return groups;
  }, {} as Record<string, Transaction[]>);
}

export function calculateTransactionValue(transaction: Transaction): number {
  if (transaction.totalValue) {
    return transaction.totalValue;
  }
  if (transaction.pricePerShare) {
    return transaction.quantity * transaction.pricePerShare;
  }
  return 0;
}

export function getTransactionSummary(transaction: Transaction, stakeholders: Map<string, Stakeholder>): string {
  const from = transaction.fromStakeholderId ? stakeholders.get(transaction.fromStakeholderId)?.name : null;
  const to = stakeholders.get(transaction.toStakeholderId)?.name || "Unknown";
  
  switch (transaction.type) {
    case "issuance":
      return `Issued ${formatLargeNumber(transaction.quantity)} shares to ${to}`;
    case "transfer":
      return `${from || "Unknown"} transferred ${formatLargeNumber(transaction.quantity)} shares to ${to}`;
    case "exercise":
      return `${to} exercised ${formatLargeNumber(transaction.quantity)} options`;
    case "cancellation":
      return `Cancelled ${formatLargeNumber(transaction.quantity)} shares from ${to}`;
    default:
      return `${transaction.type} of ${formatLargeNumber(transaction.quantity)} shares`;
  }
}

// Dashboard data transformations
export function transformFounderDashboard(data: any): FounderDashboardData {
  // Transform raw API data to typed dashboard data
  return {
    company: {
      id: data.company.id,
      name: data.company.name,
      logo: data.company.logo,
      valuationUsd: data.company.valuationUsd,
      valuationDisplay: data.company.valuationDisplay,
    },
    capTable: {
      id: `${data.company.id}-cap-table`,
      companyId: data.company.id,
      asOfDate: data.capTable.asOf,
      entries: data.capTable.holders.map((holder: any, index: number) => ({
        stakeholderId: `holder-${index}`,
        securityId: "common",
        shares: holder.shares,
        percentage: holder.pct,
      })),
      totalShares: data.capTable.holders.reduce((sum: number, h: any) => sum + h.shares, 0),
    },
    treasury: {
      companyId: data.company.id,
      usdCents: data.treasury.usdCents,
      stablecoins: data.treasury.stablecoins,
      runwayDays: data.treasury.runwayDays,
      lastUpdated: new Date().toISOString(),
    },
    checklist: data.checklist.items,
    activity: data.activity.map((a: any) => ({
      ...a,
      companyId: data.company.id,
    })),
  };
}

export function transformEmployeeDashboard(data: any): EmployeeDashboardData {
  return {
    stakeholder: {
      id: data.user,
      name: "Employee",
      email: `${data.user}@company.com`,
      type: "employee",
      kycStatus: "verified",
    },
    grants: data.grants,
    exerciseHistory: [],
    upcomingEvents: data.upcoming,
    currentValuation: data["409aPrice"],
  };
}

export function transformInvestorDashboard(data: any): InvestorDashboardData {
  return {
    investor: {
      id: data.investor,
      name: "Investor",
      email: `investor@example.com`,
      type: "investor",
      kycStatus: "verified",
      walletAddress: data.investor,
    },
    summary: data.summary,
    holdings: data.holdings,
    alerts: data.alerts,
  };
}

// Chart data transformations
export function prepareTimeSeriesData(
  data: Array<{ date: string; value: number }>,
  label?: string
): TimeSeriesDataPoint[] {
  return data.map((point) => ({
    date: point.date,
    value: point.value,
    label: label || formatLargeNumber(point.value),
  }));
}

export function aggregateByPeriod(
  data: TimeSeriesDataPoint[],
  period: "day" | "week" | "month" | "year"
): TimeSeriesDataPoint[] {
  const grouped = new Map<string, number>();
  
  data.forEach((point) => {
    const date = new Date(point.date);
    let key: string;
    
    switch (period) {
      case "day":
        key = date.toISOString().split("T")[0];
        break;
      case "week":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split("T")[0];
        break;
      case "month":
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        break;
      case "year":
        key = String(date.getFullYear());
        break;
    }
    
    grouped.set(key, (grouped.get(key) || 0) + point.value);
  });
  
  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({
      date,
      value,
    }));
}

// Helper functions
function getStakeholderLabel(id: string): string {
  // In a real app, this would look up the actual stakeholder name
  if (id.includes("founder")) return "Founders";
  if (id.includes("employee")) return "Employees";
  if (id.includes("investor")) return "Investors";
  if (id.includes("option")) return "Option Pool";
  return id;
}

function getStakeholderColor(id: string): string {
  // Define consistent colors for different stakeholder types
  if (id.includes("founder")) return "#3B82F6"; // blue
  if (id.includes("employee")) return "#10B981"; // green
  if (id.includes("investor")) return "#F59E0B"; // yellow
  if (id.includes("option")) return "#8B5CF6"; // purple
  return "#6B7280"; // gray
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    founder: "#3B82F6",
    employee: "#10B981",
    investor: "#F59E0B",
    advisor: "#EC4899",
    other: "#6B7280",
  };
  return colors[type] || colors.other;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export formatting utilities
export function formatAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTransactionHash(hash: string): string {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

// Security type formatters
export function formatSecurityType(type: string): string {
  const typeMap: Record<string, string> = {
    common: "Common Stock",
    preferred: "Preferred Stock",
    option: "Stock Option",
    warrant: "Warrant",
    safe: "SAFE",
    rsu: "RSU",
  };
  return typeMap[type] || type;
}

// Status formatters
export function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => capitalizeFirst(word))
    .join(" ");
}

// Vesting calculation helpers
export function calculateCliffShares(grant: Grant, cliffPercent = 25): number {
  return Math.floor((grant.quantity * cliffPercent) / 100);
}

export function calculateMonthlyVestingAmount(
  grant: Grant,
  totalMonths: number,
  cliffPercent = 25
): number {
  const cliffShares = calculateCliffShares(grant, cliffPercent);
  const remainingShares = grant.quantity - cliffShares;
  const monthsAfterCliff = totalMonths - 12; // Assuming 12-month cliff
  
  return monthsAfterCliff > 0 ? Math.floor(remainingShares / monthsAfterCliff) : 0;
}

// Treasury helpers
export function calculateTotalTreasuryUSD(treasury: Treasury): number {
  const stablecoinValue = treasury.stablecoins.reduce((sum, coin) => {
    return sum + (coin.usdValue || 0);
  }, 0);
  
  return treasury.usdCents + stablecoinValue;
}

export function formatTreasuryBalance(treasury: Treasury): string {
  const total = calculateTotalTreasuryUSD(treasury);
  return centsToUSD(total);
}

// Activity transformation
export function formatActivityMessage(activity: Activity, stakeholders?: Map<string, Stakeholder>): string {
  if (activity.message) return activity.message;
  
  const actor = activity.actorId && stakeholders ? stakeholders.get(activity.actorId)?.name : "System";
  
  switch (activity.type) {
    case "GRANT_ISSUED":
      return `${actor} issued ${formatLargeNumber(activity.details?.quantity || 0)} grants`;
    case "TRANSFER":
      return `${actor} transferred ${formatLargeNumber(activity.details?.quantity || 0)} shares`;
    case "EXERCISE":
      return `${actor} exercised ${formatLargeNumber(activity.details?.quantity || 0)} options`;
    case "APPROVAL_REQUEST":
      return `${actor} requested approval for ${activity.details?.title || "action"}`;
    case "APPROVAL_COMPLETED":
      return `Approval completed for ${activity.details?.title || "action"}`;
    case "FILING_DUE":
      return `${activity.details?.filing || "Filing"} is due soon`;
    case "VALUATION_UPDATE":
      return `Company valuation updated to ${centsToUSD(activity.details?.newValuation || 0)}`;
    case "FUNDING_ROUND":
      return `${activity.details?.roundName || "Funding round"} completed`;
    default:
      return `${activity.type} by ${actor}`;
  }
}

// Role-based data filtering
export function filterDataByRole(data: any, role: string): any {
  // Implement role-based data filtering logic
  // This would filter sensitive information based on user role
  return data;
}

// Compliance score calculation
export function calculateComplianceScore(checklist: any[]): number {
  if (!checklist.length) return 100;
  
  const completed = checklist.filter((item) => item.status === "complete").length;
  return Math.round((completed / checklist.length) * 100);
}

// Export all transformation utilities
export const transforms = {
  centsToUSD,
  formatLargeNumber,
  formatPercentage,
  formatDate,
  formatDateTime,
  getRelativeTime,
  capTableToChart,
  calculateOwnershipPercentage,
  groupCapTableByType,
  aggregateCapTableByType,
  calculateVestedAmount,
  getVestingProgress,
  getNextVestingDate,
  groupTransactionsByType,
  calculateTransactionValue,
  getTransactionSummary,
  transformFounderDashboard,
  transformEmployeeDashboard,
  transformInvestorDashboard,
  prepareTimeSeriesData,
  aggregateByPeriod,
  formatAddress,
  formatTransactionHash,
  formatSecurityType,
  formatStatus,
  calculateCliffShares,
  calculateMonthlyVestingAmount,
  calculateTotalTreasuryUSD,
  formatTreasuryBalance,
  formatActivityMessage,
  filterDataByRole,
  calculateComplianceScore,
};