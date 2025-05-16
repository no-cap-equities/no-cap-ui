import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions
} from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { 
  Company, 
  Stakeholder, 
  Security, 
  Grant, 
  Transaction, 
  CapTable,
  ApiResponse,
  ApiError,
  ListOptions
} from '@/types';

// Query keys factory for consistent key generation
export const queryKeys = {
  all: ['api'] as const,
  companies: () => [...queryKeys.all, 'companies'] as const,
  company: (id: string) => [...queryKeys.companies(), id] as const,
  
  stakeholders: () => [...queryKeys.all, 'stakeholders'] as const,
  stakeholder: (id: string) => [...queryKeys.stakeholders(), id] as const,
  stakeholdersByCompany: (companyId: string) => [...queryKeys.stakeholders(), 'company', companyId] as const,
  
  securities: () => [...queryKeys.all, 'securities'] as const,
  security: (id: string) => [...queryKeys.securities(), id] as const,
  securitiesByCompany: (companyId: string) => [...queryKeys.securities(), 'company', companyId] as const,
  
  grants: () => [...queryKeys.all, 'grants'] as const,
  grant: (id: string) => [...queryKeys.grants(), id] as const,
  grantsByStakeholder: (stakeholderId: string) => [...queryKeys.grants(), 'stakeholder', stakeholderId] as const,
  
  transactions: () => [...queryKeys.all, 'transactions'] as const,
  transaction: (id: string) => [...queryKeys.transactions(), id] as const,
  transactionsByCompany: (companyId: string) => [...queryKeys.transactions(), 'company', companyId] as const,
  
  capTables: () => [...queryKeys.all, 'cap-tables'] as const,
  capTable: (id: string) => [...queryKeys.capTables(), id] as const,
  capTablesByCompany: (companyId: string) => [...queryKeys.capTables(), 'company', companyId] as const,
};

// Base query options generator
export function createQueryOptions<T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<ApiResponse<T>>,
  options?: Partial<UseQueryOptions<ApiResponse<T>, ApiError>>
): UseQueryOptions<ApiResponse<T>, ApiError> {
  return {
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options
  };
}

// Base mutation options generator
export function createMutationOptions<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>>
): UseMutationOptions<ApiResponse<TData>, ApiError, TVariables> {
  const queryClient = useQueryClient();
  
  return {
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries after successful mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options
  };
}

// Error handler for queries and mutations
export function handleApiError(error: ApiError) {
  console.error('API Error:', error);
  // You can add global error handling logic here
  // For example, showing a toast notification
}

// Custom hook for handling query errors
export function useApiErrorHandler() {
  return {
    onError: (error: ApiError) => {
      handleApiError(error);
    }
  };
}