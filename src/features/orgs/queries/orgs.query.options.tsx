import { queryOptions } from '@tanstack/react-query';
import { getSearchOrg } from '../services/client.orgs.services';

export const orgSearchQueryOptions = (search: string) =>
  queryOptions({
    queryKey: ['orgs', { search }],
    queryFn: () => getSearchOrg(search),
  });
