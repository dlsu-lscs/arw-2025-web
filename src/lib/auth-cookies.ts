import { cookies } from 'next/headers';

export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  if (!cookieStore) return '';

  const access = cookieStore.get('access_token')?.value;
  const refresh = cookieStore.get('refresh_token')?.value;

  const cookieHeader = [access && `access_token=${access}`, refresh && `refresh_token=${refresh}`]
    .filter(Boolean)
    .join('; ');

  return cookieHeader;
}
