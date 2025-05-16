import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys, createQueryOptions, createMutationOptions } from './use-queries';
import type { Stakeholder, ListOptions } from '@/types';

// Get a single stakeholder
export function useStakeholder(id: string) {
  return useQuery(createQueryOptions(
    queryKeys.stakeholder(id),
    () => apiClient.getStakeholder(id)
  ));
}

// List stakeholders
export function useStakeholders(options?: ListOptions) {
  return useQuery(createQueryOptions(
    options?.companyId 
      ? queryKeys.stakeholdersByCompany(options.companyId)
      : queryKeys.stakeholders(),
    () => apiClient.listStakeholders(options)
  ));
}

// Create a stakeholder
export function useCreateStakeholder() {
  return useMutation(createMutationOptions(
    (data: Partial<Stakeholder>) => apiClient.createStakeholder(data)
  ));
}

// Update a stakeholder
export function useUpdateStakeholder(id: string) {
  return useMutation(createMutationOptions(
    (data: Partial<Stakeholder>) => apiClient.updateStakeholder(id, data),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        queryKeys.stakeholder(id);
      }
    }
  ));
}

// Delete a stakeholder
export function useDeleteStakeholder(id: string) {
  return useMutation(createMutationOptions(
    () => apiClient.deleteStakeholder(id),
    {
      onSuccess: () => {
        // Invalidate stakeholder list and specific stakeholder
        queryKeys.stakeholders();
        queryKeys.stakeholder(id);
      }
    }
  ));
}