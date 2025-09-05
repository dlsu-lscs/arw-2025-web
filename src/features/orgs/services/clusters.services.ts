import api from '@/lib/axios';

export async function getAllClusters() {
  const { data } = await api.get('/clusters');

  return data;
}

export async function getClusterByID(id: number) {
  const { data } = await api.get(`/clusters/${id}`);

  return data;
}

export async function getClusterByName(name: string) {
  const { data } = await api.get(`/clusters/name/${name}`);

  return data;
}
