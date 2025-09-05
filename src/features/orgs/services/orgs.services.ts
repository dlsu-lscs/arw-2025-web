import api from '@/lib/axios';

export async function getAllOrgs(cluster?: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { page, pageSize };

  if (cluster) params.cluster = cluster;

  const { data } = await api.get('/orgs', { params });

  return data;
}

export async function getSearchOrg(q: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { q, page, pageSize };

  const { data } = await api.get('/orgs/search', { params });

  return data;
}

export async function getOrgByID(id: number) {
  const { data } = await api.get(`/orgs/${id}`);

  return data;
}

export async function getOrgByName(name: string) {
  const { data } = await api.get(`/orgs/name/${name}`);

  return data;
}
