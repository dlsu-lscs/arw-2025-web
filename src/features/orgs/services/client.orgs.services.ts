import api from '@/lib/axios';

export async function getSearchOrg(q: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { q, page, pageSize };

  try {
    const { data } = await api.get('/api/orgs/search', {
      params,
    });
    console.log(data);
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
