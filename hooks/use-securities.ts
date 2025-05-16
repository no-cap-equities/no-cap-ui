import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys, createQueryOptions, createMutationOptions } from './use-queries';
import type { Security, ListOptions } from '@/types';

// Get a single security
export function useSecurity(id: string) {
  return useQuery(createQueryOptions(
    queryKeys.security(id),
    () => apiClient.getSecurity(id)
  ));
}

// List securities
export function useSecurities(options?: ListOptions) {
  return useQuery(createQueryOptions(
    options?.companyId 
      ? queryKeys.securitiesByCompany(options.companyId)
      : queryKeys.securities(),
    () => apiClient.listSecurities(options)
  ));
}

// Create a security
export function useCreateSecurity() {
  return useMutation(createMutationOptions(
    (data: Partial<Security>) => apiClient.createSecurity(data)
  ));
}

// Update a security
export function useUpdateSecurity(id: string) {
  return useMutation(createMutationOptions(
    (data: Partial<Security>) => apiClient.updateSecurity(id, data),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        queryKeys.security(id);
      }
    }
  ));
}

// Delete a security
export function useDeleteSecurity(id: string) {
  return useMutation(createMutationOptions(
    () => apiClient.deleteSecurity(id),
    {
      onSuccess: () => {
        // Invalidate security list and specific security
        queryKeys.securities();
        queryKeys.security(id);
      }
    }
  ));
}