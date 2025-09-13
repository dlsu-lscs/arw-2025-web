import { getCookieHeader } from '@/lib/auth-cookies';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverGetAllOrgs(seed: string, cluster?: string, page = 0, pageSize = 10) {
  const params: Record<string, string | number> = { page, pageSize, seed };

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
