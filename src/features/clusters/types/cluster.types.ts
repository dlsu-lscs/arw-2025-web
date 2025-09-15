/**
 * Cluster type definitions for organization filtering
 */
export type ClusterTypeConst =
  | 'all'
  | 'engage'
  | 'probe'
  | 'aso'
  | 'aspire'
  | 'cap%2013'
  | 'cso'
  | 'outside%20cso';

/**
 * All available cluster types for prefetching
 */
export const CLUSTER_TYPES: readonly ClusterTypeConst[] = [
  'all',
  'engage',
  'probe',
  'aso',
  'aspire',
  'cap%2013',
  'cso',
  'outside%20cso',
] as const;

export type ClusterType = {
  id: number;
  name: string;
  description: string;
};
