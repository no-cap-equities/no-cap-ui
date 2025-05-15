// Core types for No Cap equity management platform

// Base entity with common fields
export interface BaseEntity {
  id: string;
  createdAt?: string; // ISO 8601
  updatedAt?: string; // ISO 8601
}

// Address type
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

// Company entity
export interface Company extends BaseEntity {
  name: string;
  logo?: string;
  valuationUsd: number; // cents
  valuationDisplay?: string;
  stage?: string;
  sector?: string;
  foundedDate?: string;
  address?: Address;
  jurisdiction?: string;
}

// Stakeholder types
export type StakeholderType = 'founder' | 'employee' | 'investor' | 'advisor' | 'other';
export type KYCStatus = 'verified' | 'pending' | 'rejected';

// Stakeholder entity
export interface Stakeholder extends BaseEntity {
  name: string;
  email: string;
  type: StakeholderType;
  kycStatus: KYCStatus;
  address?: Address;
  walletAddress?: string; // 0x address
  taxId?: string;
  accreditationStatus?: 'accredited' | 'not_accredited' | 'pending';
}

// Security types
export type SecurityType = 'common' | 'preferred' | 'option' | 'warrant' | 'safe' | 'rsu';

// Security entity
export interface Security extends BaseEntity {
  type: SecurityType;
  name: string;
  symbol?: string;
  description?: string;
  shareClass?: string;
  parValue?: number; // cents
  votingRights?: number; // multiplier, e.g., 1, 10
  liquidationPreference?: number; // multiplier
  conversionRatio?: number;
  pricePerShare?: number; // cents
}

// Grant entity
export interface Grant extends BaseEntity {
  stakeholderId: string;
  securityId: string;
  companyId: string;
  quantity: number;
  strikePrice?: number; // cents (for options)
  vestingScheduleId?: string;
  vestStart?: string;
  cliffDate?: string;
  vestEnd?: string;
  vestedQuantity: number;
  exercisedQuantity?: number;
  status: 'active' | 'cancelled' | 'expired' | 'exercised';
  grantDate: string;
  expirationDate?: string;
}

// Vesting schedule template
export interface VestingSchedule extends BaseEntity {
  name: string;
  description?: string;
  cliffMonths: number;
  durationMonths: number;
  vestingInterval: 'monthly' | 'quarterly' | 'yearly';
  cliffPercent?: number; // percentage that vests at cliff
}

// Transaction types
export type TransactionType = 'issuance' | 'transfer' | 'exercise' | 'cancellation' | 'conversion' | 'redemption';

// Transaction entity
export interface Transaction extends BaseEntity {
  type: TransactionType;
  fromStakeholderId?: string;
  toStakeholderId: string;
  securityId: string;
  quantity: number;
  pricePerShare?: number; // cents
  totalValue?: number; // cents
  grantId?: string; // for exercises
  transactionDate: string;
  txHash?: string; // blockchain transaction hash
  status: 'pending' | 'completed' | 'failed';
  notes?: string;
}

// Approval types
export type ApprovalType = 'grant_issuance' | 'transfer' | 'board_resolution' | 'financing_round' | 'other';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'awaiting_signatures';

// Approval entity
export interface Approval extends BaseEntity {
  type: ApprovalType;
  status: ApprovalStatus;
  requesterId: string;
  title: string;
  description?: string;
  documentUrls?: string[];
  approvers: Approver[];
  relatedEntityId?: string; // ID of grant, transaction, etc.
  relatedEntityType?: string;
  deadline?: string;
  createdDate: string;
  completedDate?: string;
}

// Approver for approval workflows
export interface Approver {
  stakeholderId: string;
  role: string;
  sequence: number;
  status: 'pending' | 'approved' | 'rejected' | 'delegated';
  respondedDate?: string;
  delegatedTo?: string;
  comments?: string;
}

// Cap table entry
export interface CapTableEntry {
  stakeholderId: string;
  securityId: string;
  shares: number;
  percentage: number;
  diluted?: boolean;
}

// Cap table snapshot
export interface CapTable extends BaseEntity {
  companyId: string;
  asOfDate: string;
  entries: CapTableEntry[];
  totalShares: number;
  fullyDilutedShares?: number;
  optionPoolSize?: number;
  treasuryShares?: number;
}

// Compliance types
export type ComplianceStatus = 'compliant' | 'warning' | 'violation' | 'pending';
export type FilingStatus = 'complete' | 'pending' | 'due-soon' | 'overdue';

// Compliance rule
export interface ComplianceRule extends BaseEntity {
  name: string;
  description: string;
  ruleType: string;
  jurisdiction?: string;
  enabled: boolean;
  parameters?: Record<string, any>;
  lastChecked?: string;
  status?: ComplianceStatus;
}

// Compliance checklist item
export interface ComplianceChecklistItem {
  id: string;
  label: string;
  status: FilingStatus;
  dueDate?: string;
  completedDate?: string;
  notes?: string;
  assignedTo?: string;
}

// Compliance entity
export interface Compliance extends BaseEntity {
  companyId: string;
  score: number; // 0-100
  ipoReadiness?: number; // 0-100
  jurisdictions: JurisdictionCompliance[];
  checklist: ComplianceChecklistItem[];
  filings: Filing[];
  ruleLog: RuleLogEntry[];
}

// Jurisdiction compliance status
export interface JurisdictionCompliance {
  code: string; // e.g., "US-DE", "CA-ON"
  name?: string;
  status: 'green' | 'yellow' | 'red';
  issues?: string[];
}

// Filing entity
export interface Filing {
  id: string;
  name: string;
  type: string;
  dueDate: string;
  filedDate?: string;
  status: FilingStatus;
  jurisdiction?: string;
  documentUrl?: string;
}

// Rule log entry
export interface RuleLogEntry {
  timestamp: string;
  ruleId: string;
  ruleName: string;
  result: 'passed' | 'warning' | 'failed';
  message?: string;
  details?: Record<string, any>;
}

// Treasury entity
export interface Treasury {
  companyId: string;
  usdCents: number;
  stablecoins: StablecoinBalance[];
  runwayDays?: number;
  lastUpdated: string;
}

// Stablecoin balance
export interface StablecoinBalance {
  symbol: string;
  address?: string;
  amount: number; // smallest unit (wei for ETH tokens)
  decimals?: number;
  usdValue?: number; // cents
}

// Activity/Event types
export type ActivityType = 
  | 'GRANT_ISSUED' 
  | 'TRANSFER' 
  | 'EXERCISE' 
  | 'APPROVAL_REQUEST'
  | 'APPROVAL_COMPLETED'
  | 'FILING_DUE'
  | 'VALUATION_UPDATE'
  | 'FUNDING_ROUND';

// Activity entity
export interface Activity extends BaseEntity {
  type: ActivityType;
  companyId: string;
  actorId?: string;
  message: string;
  details?: Record<string, any>;
  txHash?: string;
  timestamp: string;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
  metadata?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
  };
}

// Error response
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp?: string;
}

// User/Auth types
export type UserRole = 'founder' | 'employee' | 'investor';

export interface User {
  id: string;
  walletAddress?: string;
  email?: string;
  role: UserRole;
  stakeholderId?: string;
  companyId?: string;
  isAuthenticated: boolean;
}

// Dashboard summary types
export interface FounderDashboardData {
  company: Company;
  capTable: CapTable;
  treasury: Treasury;
  checklist: ComplianceChecklistItem[];
  activity: Activity[];
}

export interface EmployeeDashboardData {
  stakeholder: Stakeholder;
  grants: Grant[];
  vestingSchedule?: VestingSchedule;
  exerciseHistory: Transaction[];
  upcomingEvents: UpcomingEvent[];
  currentValuation: number; // per share price in cents
}

export interface InvestorDashboardData {
  investor: Stakeholder;
  summary: {
    totalInvestedUsd: number; // cents
    currentValueUsd: number; // cents
    roiPct: number;
  };
  holdings: InvestorHolding[];
  alerts: InvestorAlert[];
}

// Helper types
export interface UpcomingEvent {
  date: string;
  event: string;
  quantity?: number;
  title?: string;
  details?: any;
}

export interface InvestorHolding {
  companyId: string;
  companyName: string;
  logo?: string;
  security: string;
  shares: number;
  ownershipPct: number;
  costBasis: number; // cents
  currentValue: number; // cents
  lastValuationDate?: string;
}

export interface InvestorAlert {
  type: 'liquidity' | 'vote' | 'dilution' | 'compliance';
  companyId?: string;
  proposalId?: string;
  message: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
}

// Chart/Visualization types
export interface ChartDataPoint {
  label: string;
  value: number;
  percentage?: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

// Form/Wizard types
export interface EquityIssuanceFormData {
  stakeholderId: string;
  securityType: SecurityType;
  quantity: number;
  pricePerShare?: number;
  vestingScheduleId?: string;
  grantDate: string;
  notes?: string;
}

export interface TransferFormData {
  fromStakeholderId: string;
  toStakeholderId: string;
  securityId: string;
  quantity: number;
  pricePerShare?: number;
  transferDate: string;
  reason?: string;
}

// Rule engine types
export interface RuleCheckRequest {
  from: string;
  to: string;
  security: string;
  quantity: number;
}

export interface RuleCheckResult {
  rule: string;
  passed: boolean;
  message?: string;
  details?: any;
}

export interface RuleFlow {
  flow: RuleCheckResult[];
  final: 'allowed' | 'blocked';
  recommendations?: string[];
}