'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { allOrgsQueryOptions } from '../queries/orgs.query.options';

const CLUSTER_TYPES = ['all', 'engage', 'cap13', 'aspire', 'probe', 'aso'] as const;

/**
 * Hook to prefetch organizations for all cluster types
 * This eliminates loading states when switching between clusters
 */
export function usePrefetchOrgClusters() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production')
      console.log('🚀 Starting prefetch for all cluster types:', CLUSTER_TYPES);

    // Prefetch all cluster types in parallel
    const prefetchPromises = CLUSTER_TYPES.map(async (clusterType) => {
      try {
        await queryClient.prefetchInfiniteQuery({
          ...allOrgsQueryOptions(clusterType, 10),
          staleTime: 10 * 60 * 1000, // 10 minutes - keep data fresh longer
        });
        if (process.env.NODE_ENV !== 'production')
          console.log(`✅ Prefetched organizations for cluster: ${clusterType}`);
      } catch (error) {
        console.warn(`⚠️ Failed to prefetch cluster ${clusterType}:`, error);
      }
    });

    // Wait for all prefetches to complete
    Promise.all(prefetchPromises).then(() => {
      if (process.env.NODE_ENV !== 'production')
        console.log('🎉 All cluster prefetching completed!');
    });
  }, [queryClient]);
}
