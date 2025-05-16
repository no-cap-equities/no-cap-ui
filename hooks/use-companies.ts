import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys, createQueryOptions, createMutationOptions } from './use-queries';
import type { Company } from '@/types';

// Get a single company
export function useCompany(id: string) {
  return useQuery(createQueryOptions(
    queryKeys.company(id),
    () => apiClient.getCompany(id)
  ));
}

// List companies
export function useCompanies() {
  return useQuery(createQueryOptions(
    queryKeys.companies(),
    () => apiClient.listCompanies()
  ));
}

// Create a company
export function useCreateCompany() {
  return useMutation(createMutationOptions(
    (data: Partial<Company>) => apiClient.createCompany(data)
  ));
}

// Update a company
export function useUpdateCompany(id: string) {
  return useMutation(createMutationOptions(
    (data: Partial<Company>) => apiClient.updateCompany(id, data),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        queryKeys.company(id);
      }
    }
  ));
}

// Delete a company
export function useDeleteCompany(id: string) {
  return useMutation(createMutationOptions(
    () => apiClient.deleteCompany(id),
    {
      onSuccess: () => {
        // Invalidate company list and specific company
        queryKeys.companies();
        queryKeys.company(id);
      }
    }
  ));
}