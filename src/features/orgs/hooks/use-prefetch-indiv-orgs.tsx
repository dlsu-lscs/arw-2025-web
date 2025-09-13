import { useQueryClient } from '@tanstack/react-query';
import { getOrgByID } from '../services/client.orgs.services';
import { orgByIdQueryOptions } from '../queries/orgs.query.options';

export function usePrefetchIndivOrgs() {
  const queryClient = useQueryClient();

  async function prefetchOrgByID(id: number) {
    if (process.env.NODE_ENV !== 'production')
      console.log('🚀 Starting prefetch for org id #: ', id);

    try {
      await queryClient.prefetchQuery({
        ...orgByIdQueryOptions(id),
        staleTime: 10 * 60 * 1000, // 10 minutes - keep data fresh longer
      });

      if (process.env.NODE_ENV !== 'production')
        console.log(`✅ Prefetched org data for ID: ${id}`);
    } catch (error) {
      console.error('⚠️ Failed prefetching org by ID:', error);
    }
  }

  return { prefetchOrgByID };
}
