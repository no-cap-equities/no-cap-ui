import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys, createQueryOptions, createMutationOptions } from './use-queries';
import type { Transaction, ListOptions } from '@/types';

// Get a single transaction
export function useTransaction(id: string) {
  return useQuery(createQueryOptions(
    queryKeys.transaction(id),
    () => apiClient.getTransaction(id)
  ));
}

// List transactions
export function useTransactions(options?: ListOptions) {
  return useQuery(createQueryOptions(
    options?.companyId 
      ? queryKeys.transactionsByCompany(options.companyId)
      : queryKeys.transactions(),
    () => apiClient.listTransactions(options)
  ));
}

// Create a transaction
export function useCreateTransaction() {
  return useMutation(createMutationOptions(
    (data: Partial<Transaction>) => apiClient.createTransaction(data)
  ));
}

// Update a transaction
export function useUpdateTransaction(id: string) {
  return useMutation(createMutationOptions(
    (data: Partial<Transaction>) => apiClient.updateTransaction(id, data),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        queryKeys.transaction(id);
      }
    }
  ));
}

// Delete a transaction
export function useDeleteTransaction(id: string) {
  return useMutation(createMutationOptions(
    () => apiClient.deleteTransaction(id),
    {
      onSuccess: () => {
        // Invalidate transaction list and specific transaction
        queryKeys.transactions();
        queryKeys.transaction(id);
      }
    }
  ));
}