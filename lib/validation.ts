// Data validation utilities for No Cap types

import type {
  Company,
  Stakeholder,
  Security,
  Grant,
  Transaction,
  Approval,
  CapTable,
  Compliance,
  KYCStatus,
  StakeholderType,
  SecurityType,
  TransactionType,
  ApprovalType,
  ApprovalStatus,
  ComplianceStatus,
  FilingStatus,
  ActivityType,
  UserRole,
} from "@/types";

// Type guards
export function isCompany(data: any): data is Company {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.name === "string" &&
    typeof data.valuationUsd === "number"
  );
}

export function isStakeholder(data: any): data is Stakeholder {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    isStakeholderType(data.type) &&
    isKYCStatus(data.kycStatus)
  );
}

export function isSecurity(data: any): data is Security {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.type === "string" &&
    isSecurityType(data.type) &&
    typeof data.name === "string"
  );
}

export function isGrant(data: any): data is Grant {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.stakeholderId === "string" &&
    typeof data.securityId === "string" &&
    typeof data.companyId === "string" &&
    typeof data.quantity === "number" &&
    typeof data.vestedQuantity === "number" &&
    typeof data.grantDate === "string" &&
    ["active", "cancelled", "expired", "exercised"].includes(data.status)
  );
}

export function isTransaction(data: any): data is Transaction {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    isTransactionType(data.type) &&
    typeof data.toStakeholderId === "string" &&
    typeof data.securityId === "string" &&
    typeof data.quantity === "number" &&
    typeof data.transactionDate === "string" &&
    ["pending", "completed", "failed"].includes(data.status)
  );
}

// Enum validators
export function isKYCStatus(value: any): value is KYCStatus {
  return ["verified", "pending", "rejected"].includes(value);
}

export function isStakeholderType(value: any): value is StakeholderType {
  return ["founder", "employee", "investor", "advisor", "other"].includes(value);
}

export function isSecurityType(value: any): value is SecurityType {
  return ["common", "preferred", "option", "warrant", "safe", "rsu"].includes(value);
}

export function isTransactionType(value: any): value is TransactionType {
  return ["issuance", "transfer", "exercise", "cancellation", "conversion", "redemption"].includes(value);
}

export function isApprovalType(value: any): value is ApprovalType {
  return ["grant_issuance", "transfer", "board_resolution", "financing_round", "other"].includes(value);
}

export function isApprovalStatus(value: any): value is ApprovalStatus {
  return ["pending", "approved", "rejected", "awaiting_signatures"].includes(value);
}

export function isComplianceStatus(value: any): value is ComplianceStatus {
  return ["compliant", "warning", "violation", "pending"].includes(value);
}

export function isFilingStatus(value: any): value is FilingStatus {
  return ["complete", "pending", "due-soon", "overdue"].includes(value);
}

export function isActivityType(value: any): value is ActivityType {
  const types: ActivityType[] = [
    "GRANT_ISSUED",
    "TRANSFER",
    "EXERCISE",
    "APPROVAL_REQUEST",
    "APPROVAL_COMPLETED",
    "FILING_DUE",
    "VALUATION_UPDATE",
    "FUNDING_ROUND",
  ];
  return types.includes(value);
}

export function isUserRole(value: any): value is UserRole {
  return ["founder", "employee", "investor"].includes(value);
}

// Validation error class
export class ValidationError extends Error {
  constructor(
    public field: string,
    public value: any,
    public message: string
  ) {
    super(`Validation error in ${field}: ${message}`);
    this.name = "ValidationError";
  }
}

// Validation result type
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// Complex entity validators
export function validateCompany(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.id || typeof data.id !== "string") {
    errors.push(new ValidationError("id", data.id, "ID must be a non-empty string"));
  }

  if (!data.name || typeof data.name !== "string") {
    errors.push(new ValidationError("name", data.name, "Name must be a non-empty string"));
  }

  if (typeof data.valuationUsd !== "number" || data.valuationUsd < 0) {
    errors.push(new ValidationError("valuationUsd", data.valuationUsd, "Valuation must be a non-negative number"));
  }

  if (data.stage && typeof data.stage !== "string") {
    errors.push(new ValidationError("stage", data.stage, "Stage must be a string"));
  }

  if (data.sector && typeof data.sector !== "string") {
    errors.push(new ValidationError("sector", data.sector, "Sector must be a string"));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateStakeholder(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.id || typeof data.id !== "string") {
    errors.push(new ValidationError("id", data.id, "ID must be a non-empty string"));
  }

  if (!data.name || typeof data.name !== "string") {
    errors.push(new ValidationError("name", data.name, "Name must be a non-empty string"));
  }

  if (!data.email || typeof data.email !== "string" || !isValidEmail(data.email)) {
    errors.push(new ValidationError("email", data.email, "Email must be a valid email address"));
  }

  if (!isStakeholderType(data.type)) {
    errors.push(new ValidationError("type", data.type, "Type must be a valid stakeholder type"));
  }

  if (!isKYCStatus(data.kycStatus)) {
    errors.push(new ValidationError("kycStatus", data.kycStatus, "KYC status must be a valid status"));
  }

  if (data.walletAddress && !isValidEthereumAddress(data.walletAddress)) {
    errors.push(new ValidationError("walletAddress", data.walletAddress, "Wallet address must be a valid Ethereum address"));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateGrant(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.id || typeof data.id !== "string") {
    errors.push(new ValidationError("id", data.id, "ID must be a non-empty string"));
  }

  if (!data.stakeholderId || typeof data.stakeholderId !== "string") {
    errors.push(new ValidationError("stakeholderId", data.stakeholderId, "Stakeholder ID must be a non-empty string"));
  }

  if (!data.securityId || typeof data.securityId !== "string") {
    errors.push(new ValidationError("securityId", data.securityId, "Security ID must be a non-empty string"));
  }

  if (!data.companyId || typeof data.companyId !== "string") {
    errors.push(new ValidationError("companyId", data.companyId, "Company ID must be a non-empty string"));
  }

  if (typeof data.quantity !== "number" || data.quantity <= 0) {
    errors.push(new ValidationError("quantity", data.quantity, "Quantity must be a positive number"));
  }

  if (typeof data.vestedQuantity !== "number" || data.vestedQuantity < 0) {
    errors.push(new ValidationError("vestedQuantity", data.vestedQuantity, "Vested quantity must be a non-negative number"));
  }

  if (data.vestedQuantity > data.quantity) {
    errors.push(new ValidationError("vestedQuantity", data.vestedQuantity, "Vested quantity cannot exceed total quantity"));
  }

  if (!data.grantDate || !isValidISODate(data.grantDate)) {
    errors.push(new ValidationError("grantDate", data.grantDate, "Grant date must be a valid ISO date"));
  }

  if (!["active", "cancelled", "expired", "exercised"].includes(data.status)) {
    errors.push(new ValidationError("status", data.status, "Status must be a valid grant status"));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateTransaction(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.id || typeof data.id !== "string") {
    errors.push(new ValidationError("id", data.id, "ID must be a non-empty string"));
  }

  if (!isTransactionType(data.type)) {
    errors.push(new ValidationError("type", data.type, "Type must be a valid transaction type"));
  }

  if (!data.toStakeholderId || typeof data.toStakeholderId !== "string") {
    errors.push(new ValidationError("toStakeholderId", data.toStakeholderId, "To stakeholder ID must be a non-empty string"));
  }

  if (!data.securityId || typeof data.securityId !== "string") {
    errors.push(new ValidationError("securityId", data.securityId, "Security ID must be a non-empty string"));
  }

  if (typeof data.quantity !== "number" || data.quantity <= 0) {
    errors.push(new ValidationError("quantity", data.quantity, "Quantity must be a positive number"));
  }

  if (!data.transactionDate || !isValidISODate(data.transactionDate)) {
    errors.push(new ValidationError("transactionDate", data.transactionDate, "Transaction date must be a valid ISO date"));
  }

  if (!["pending", "completed", "failed"].includes(data.status)) {
    errors.push(new ValidationError("status", data.status, "Status must be a valid transaction status"));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Helper validators
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidEthereumAddress(address: string): boolean {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

export function isValidISODate(date: string): boolean {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date.split("T")[0]);
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Array validators
export function validateArray<T>(
  array: any[],
  itemValidator: (item: any) => ValidationResult
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!Array.isArray(array)) {
    errors.push(new ValidationError("array", array, "Value must be an array"));
    return { valid: false, errors };
  }

  array.forEach((item, index) => {
    const result = itemValidator(item);
    if (!result.valid) {
      result.errors.forEach((error) => {
        errors.push(new ValidationError(`[${index}].${error.field}`, error.value, error.message));
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Generic object validator
export function validateObject(
  data: any,
  schema: Record<string, (value: any) => boolean | ValidationResult>
): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof data !== "object" || data === null) {
    errors.push(new ValidationError("object", data, "Value must be an object"));
    return { valid: false, errors };
  }

  for (const [field, validator] of Object.entries(schema)) {
    const value = data[field];
    const result = validator(value);
    
    if (typeof result === "boolean") {
      if (!result) {
        errors.push(new ValidationError(field, value, `Invalid value for ${field}`));
      }
    } else {
      if (!result.valid) {
        result.errors.forEach((error) => {
          errors.push(new ValidationError(`${field}.${error.field}`, error.value, error.message));
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Validation helpers for common patterns
export function required(value: any): boolean {
  return value !== null && value !== undefined && value !== "";
}

export function minLength(min: number) {
  return (value: string): boolean => {
    return typeof value === "string" && value.length >= min;
  };
}

export function maxLength(max: number) {
  return (value: string): boolean => {
    return typeof value === "string" && value.length <= max;
  };
}

export function minValue(min: number) {
  return (value: number): boolean => {
    return typeof value === "number" && value >= min;
  };
}

export function maxValue(max: number) {
  return (value: number): boolean => {
    return typeof value === "number" && value <= max;
  };
}

export function inRange(min: number, max: number) {
  return (value: number): boolean => {
    return typeof value === "number" && value >= min && value <= max;
  };
}

export function pattern(regex: RegExp) {
  return (value: string): boolean => {
    return typeof value === "string" && regex.test(value);
  };
}

export function oneOf<T>(values: T[]) {
  return (value: any): boolean => {
    return values.includes(value);
  };
}

// Batch validation
export function validateBatch<T>(
  items: T[],
  validator: (item: T) => ValidationResult
): ValidationResult {
  const errors: ValidationError[] = [];

  items.forEach((item, index) => {
    const result = validator(item);
    if (!result.valid) {
      result.errors.forEach((error) => {
        errors.push(
          new ValidationError(
            `items[${index}].${error.field}`,
            error.value,
            error.message
          )
        );
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Error formatter
export function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => `${error.field}: ${error.message}`)
    .join("\n");
}