import {
  infiniteQueryOptions,
  Query,
  QueryFunctionContext,
  queryOptions,
} from '@tanstack/react-query';
import { getAllOrgs, getOrgByID, getSearchOrg } from '../services/client.orgs.services';
import cluster from 'cluster';
import { OrgsResponse } from '../types/orgs.types';

export const orgSearchQueryOptions = (search: string) =>
  queryOptions({
    queryKey: ['orgs', { search }],
    queryFn: () => getSearchOrg(search),
  });

export const allOrgsQueryOptions = (cluster?: string, pageSize = 10, initialOrgs?: OrgsResponse) =>
  infiniteQueryOptions({
    queryKey: ['orgs', { cluster }],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      getAllOrgs(cluster, pageParam as number, pageSize),
    initialPageParam: 0,
    getNextPageParam: (lastPage: OrgsResponse) => {
      const { number, totalPages } = lastPage.page;
      return number + 1 < totalPages ? number + 1 : undefined;
    },
    getPreviousPageParam: (firstPage: OrgsResponse) => {
      const { number } = firstPage.page;
      return number > 0 ? number - 1 : undefined;
    },
    initialData: initialOrgs
      ? {
          pages: [initialOrgs],
          pageParams: [0],
        }
      : undefined,
  });

export const orgByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['org', { id }],
    queryFn: () => getOrgByID(id),
  });