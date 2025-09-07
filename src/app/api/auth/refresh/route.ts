import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token');

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Call your backend refresh endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        Cookie: `refresh_token=${refreshToken.value}`,
      },
    });

    if (!response.ok) {
      // If refresh fails with 401 or 404, clear both tokens from client
      if (response.status === 401 || response.status === 404) {
        const nextResponse = NextResponse.json({ error: 'Refresh failed' }, { status: 401 });

        // Clear access_token cookie
        nextResponse.cookies.set('access_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 0, // Expire immediately
          path: '/',
        });

        // Clear refresh_token cookie
        nextResponse.cookies.set('refresh_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 0, // Expire immediately
          path: '/',
        });

        return nextResponse;
      }

      return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
    }

    // Extract Set-Cookie headers (string)
    const setCookieHeader = response.headers.get('set-cookie');

    const nextResponse = NextResponse.json({ success: true });

    if (setCookieHeader) {
      // Forward the cookie to the client
      nextResponse.headers.append('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
