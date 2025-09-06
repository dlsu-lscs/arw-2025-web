import { getCookieHeader } from '@/lib/auth-cookies';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllClusters() {
  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/clusters`, {
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getAllClusters:', error);
    throw error;
  }
}

export async function getClusterByID(id: number) {
  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/clusters/${id}`, {
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getClusterByID:', error);
    throw error;
  }
}

export async function getClusterByName(name: string) {
  const cookieHeader = await getCookieHeader();

  try {
    const { data } = await axios.get(`${BASE_URL}/api/clusters/name/${name}`, {
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    console.error('Error in getClusterByName:', error);
    throw error;
  }
}
