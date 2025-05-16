import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './use-queries';
import { apiClient } from '@/lib/api-client';
import type { 
  Company, 
  Stakeholder, 
  Security, 
  Grant, 
  Transaction, 
  CapTable 
} from '@/types';

// Custom hook for cache management and synchronization
export function useCacheSync() {
  const queryClient = useQueryClient();

  // Invalidate specific entity and related data
  const invalidateEntity = (entityType: string, entityId?: string) => {
    switch (entityType) {
      case 'company':
        if (entityId) {
          queryClient.invalidateQueries({ queryKey: queryKeys.company(entityId) });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.companies() });
        break;
      
      case 'stakeholder':
        if (entityId) {
          queryClient.invalidateQueries({ queryKey: queryKeys.stakeholder(entityId) });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.stakeholders() });
        break;
      
      case 'security':
        if (entityId) {
          queryClient.invalidateQueries({ queryKey: queryKeys.security(entityId) });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.securities() });
        break;
      
      case 'grant':
        if (entityId) {
          queryClient.invalidateQueries({ queryKey: queryKeys.grant(entityId) });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.grants() });
        break;
      
      case 'transaction':
        if (entityId) {
          queryClient.invalidateQueries({ queryKey: queryKeys.transaction(entityId) });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions() });
        break;
      
      case 'capTable':
        if (entityId) {
          queryClient.invalidateQueries({ queryKey: queryKeys.capTable(entityId) });
        }
        queryClient.invalidateQueries({ queryKey: queryKeys.capTables() });
        break;
    }
  };

  // Invalidate all related data when a company is updated
  const invalidateCompanyRelatedData = (companyId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.company(companyId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.stakeholdersByCompany(companyId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.securitiesByCompany(companyId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.transactionsByCompany(companyId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.capTablesByCompany(companyId) });
  };

  // Optimistic update for entities
  const optimisticUpdate = <T extends { id: string }>(
    entityType: string,
    entityId: string,
    updateFn: (oldData: T) => T
  ) => {
    let queryKey: readonly unknown[];
    
    switch (entityType) {
      case 'company':
        queryKey = queryKeys.company(entityId);
        break;
      case 'stakeholder':
        queryKey = queryKeys.stakeholder(entityId);
        break;
      case 'security':
        queryKey = queryKeys.security(entityId);
        break;
      case 'grant':
        queryKey = queryKeys.grant(entityId);
        break;
      case 'transaction':
        queryKey = queryKeys.transaction(entityId);
        break;
      case 'capTable':
        queryKey = queryKeys.capTable(entityId);
        break;
      default:
        return;
    }

    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: updateFn(oldData.data)
      };
    });
  };

  // Sync related data after a transaction
  const syncTransactionEffects = (transaction: Transaction) => {
    // Invalidate the related stakeholder and security data
    if (transaction.fromStakeholderId) {
      invalidateEntity('stakeholder', transaction.fromStakeholderId);
    }
    if (transaction.toStakeholderId) {
      invalidateEntity('stakeholder', transaction.toStakeholderId);
    }
    if (transaction.securityId) {
      invalidateEntity('security', transaction.securityId);
    }
    // Invalidate cap table data
    invalidateEntity('capTable');
  };

  // Sync related data after a grant update
  const syncGrantEffects = (grant: Grant) => {
    // Invalidate the related stakeholder data
    if (grant.stakeholderId) {
      invalidateEntity('stakeholder', grant.stakeholderId);
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.grantsByStakeholder(grant.stakeholderId) 
      });
    }
    // Invalidate cap table data
    invalidateEntity('capTable');
  };

  // Prefetch related data
  const prefetchRelatedData = async (entityType: string, entityId: string) => {
    switch (entityType) {
      case 'company':
        // Prefetch related stakeholders, securities, and transactions
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: queryKeys.stakeholdersByCompany(entityId),
            queryFn: () => apiClient.listStakeholders({ companyId: entityId })
          }),
          queryClient.prefetchQuery({
            queryKey: queryKeys.securitiesByCompany(entityId),
            queryFn: () => apiClient.listSecurities({ companyId: entityId })
          }),
          queryClient.prefetchQuery({
            queryKey: queryKeys.transactionsByCompany(entityId),
            queryFn: () => apiClient.listTransactions({ companyId: entityId })
          }),
          queryClient.prefetchQuery({
            queryKey: queryKeys.capTablesByCompany(entityId),
            queryFn: () => apiClient.listCapTables({ companyId: entityId })
          })
        ]);
        break;
      
      case 'stakeholder':
        // Prefetch related grants
        await queryClient.prefetchQuery({
          queryKey: queryKeys.grantsByStakeholder(entityId),
          queryFn: () => apiClient.listGrants({ stakeholderId: entityId })
        });
        break;
    }
  };

  return {
    invalidateEntity,
    invalidateCompanyRelatedData,
    optimisticUpdate,
    syncTransactionEffects,
    syncGrantEffects,
    prefetchRelatedData
  };
}