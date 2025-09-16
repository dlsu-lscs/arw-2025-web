import api from '@/lib/axios';
import { OrgsResponse } from '../types/orgs.types';

export async function getAllOrgs(
  seed: string,
  cluster?: string,
  page = 0,
  pageSize = 10,
  prioritized: string | string[] = 'CSO'
): Promise<OrgsResponse> {
  const params: Record<string, string | number> = {
    page,
    pageSize,
    seed,
    prioritized: Array.isArray(prioritized) ? prioritized.join(',') : prioritized,
  };

  if (cluster && cluster !== 'all') params.cluster = cluster;

  if (process.env.NODE_ENV !== 'production') console.log('📋 getAllOrgs params:', params);

  try {
    const { data } = await api.get('/api/orgs', { params });
    return data;
  } catch (error) {
    console.error('Error in getAllOrgs:', error);
    throw error;
  }
}

export async function getSearchOrg(q: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { q, page, pageSize };

  try {
    const { data } = await api.get('/api/orgs/search', {
      params,
    });
    if (process.env.NODE_ENV !== 'production') console.log('🔍 Search result:', data);
    return data;
  } catch (error) {
    console.error('Error in getSearchOrg:', error);
    throw error;
  }
}

export async function getOrgByID(id: number) {
  try {
    const { data } = await api.get(`/api/orgs/${id}`);
    return data;
  } catch (error) {
    console.error('Error in getOrgByID:', error);
    throw error;
  }
}

export async function getOrgByName(name: string) {
  try {
    const { data } = await api.get(`/api/orgs/name/${name}`);
    return data;
  } catch (error) {
    console.error('Error in getOrgByName:', error);
    throw error;
  }
}
