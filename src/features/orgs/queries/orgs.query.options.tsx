import {
  infiniteQueryOptions,
  Query,
  QueryFunctionContext,
  queryOptions,
} from '@tanstack/react-query';
import { getAllOrgs, getSearchOrg } from '../services/client.orgs.services';
import cluster from 'cluster';
import { OrgsResponse } from '../types/orgs.types';
import { queryOptions } from '@tanstack/react-query';
import { getSearchOrg } from '../services/client.orgs.services';

export const orgSearchQueryOptions = (search: string) =>
  queryOptions({
    queryKey: ['orgs', { search }],
    queryFn: () => getSearchOrg(search),
  });

export const allOrgsQueryOptions = (cluster?: string, pageSize = 10, initalOrgs?: OrgsResponse) =>
  infiniteQueryOptions({
    queryKey: ['orgs', cluster],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      getAllOrgs(cluster, pageParam as number, pageSize),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      const { number, totalPages } = lastPage.page;
      return number + 1 < totalPages ? number + 1 : undefined;
    },
    initialData: initalOrgs
      ? {
          pages: [initalOrgs],
          pageParams: [0],
        }
      : undefined,
  });