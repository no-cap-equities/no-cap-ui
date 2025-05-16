import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys, createQueryOptions, createMutationOptions } from './use-queries';
import type { CapTable, ListOptions } from '@/types';

// Get a single cap table
export function useCapTable(id: string) {
  return useQuery(createQueryOptions(
    queryKeys.capTable(id),
    () => apiClient.getCapTable(id)
  ));
}

// List cap tables
export function useCapTables(options?: ListOptions) {
  return useQuery(createQueryOptions(
    options?.companyId 
      ? queryKeys.capTablesByCompany(options.companyId)
      : queryKeys.capTables(),
    () => apiClient.listCapTables(options)
  ));
}

// Create a cap table
export function useCreateCapTable() {
  return useMutation(createMutationOptions(
    (data: Partial<CapTable>) => apiClient.createCapTable(data)
  ));
}

// Update a cap table
export function useUpdateCapTable(id: string) {
  return useMutation(createMutationOptions(
    (data: Partial<CapTable>) => apiClient.updateCapTable(id, data),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        queryKeys.capTable(id);
      }
    }
  ));
}

// Delete a cap table
export function useDeleteCapTable(id: string) {
  return useMutation(createMutationOptions(
    () => apiClient.deleteCapTable(id),
    {
      onSuccess: () => {
        // Invalidate cap table list and specific cap table
        queryKeys.capTables();
        queryKeys.capTable(id);
      }
    }
  ));
}