// lib/server-auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServerUser() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access_token');
  const refreshToken = (await cookieStore).get('refresh_token');

  // If no tokens at all, user needs to login
  if (!accessToken && !refreshToken) {
    return null;
  }

  // If we have a refresh token but no access token,
  // let client-side handle the refresh
  if (!accessToken && refreshToken) {
    return { needsRefresh: true };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (response.status === 401) {
      // Token expired, let client handle refresh
      return { needsRefresh: true };
    }

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getServerUser();

  if (!user) {
    redirect('/login');
  }

  // If user needs refresh, don't redirect - let page handle it
  if (user.needsRefresh) {
    return user; // Return the needsRefresh flag
  }

  return user;
}
