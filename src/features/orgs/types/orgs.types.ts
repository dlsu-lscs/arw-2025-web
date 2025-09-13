import type { InfiniteData } from '@tanstack/react-query';
import { ClusterType } from '@/features/clusters/types/cluster.types';
import { CollegeType } from './colleges.types';
import { PublicationsType } from './pubs.types';

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface OrgsResponse {
  content: OrganizationType[];
  page: PageInfo;
}

export type OrganizationType = {
  id: number;
  name: string;
  shortName: string;
  about: string;
  fee: string;
  gformsUrl: string;
  facebookUrl: string;
  mission: string;
  vision: string;
  tagline: string;
  cluster: ClusterType;
  college: CollegeType;
  publications: PublicationsType;
};

export type OrgsInfiniteData = InfiniteData<OrgsResponse>;
