import { getCookieHeader } from '@/lib/auth-cookies';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllOrgs(cluster?: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { page, pageSize };
  if (cluster) params.cluster = cluster;

  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/orgs`, {
      params,
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getAllOrgs:', error);
    throw error;
  }
}

export async function getSearchOrg(q: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { q, page, pageSize };
  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/orgs/search`, {
      params,
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getSearchOrg:', error);
    throw error;
  }
}

export async function getOrgByID(id: number) {
  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/orgs/${id}`, {
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getOrgByID:', error);
    throw error;
  }
}

export async function getOrgByName(name: string) {
  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/orgs/name/${name}`, {
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getOrgByName:', error);
    throw error;
  }
}
