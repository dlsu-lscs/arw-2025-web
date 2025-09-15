/**
 * Cluster type definitions for organization filtering
 */
export type ClusterTypeConst =
  | 'all'
  | 'engage'
  | 'probe'
  | 'aso'
  | 'aspire'
  | 'cap 13'
  | 'cso'
  | 'outside cso';

/**
 * All available cluster types for prefetching
 */
export const CLUSTER_TYPES: readonly ClusterTypeConst[] = [
  'all',
  'engage',
  'probe',
  'aso',
  'aspire',
  'cap 13',
  'cso',
  'outside cso',
] as const;

/**
 * Cluster Types
 */
export type ClusterType = {
  id: ClusterTypeConst;
  name: string;
  description: string;
};

/**
 * Cluster Carousel Type
 */
export type ClusterCarouselType = {
  id: ClusterTypeConst;
  acronym: string;
  name: string;
};
