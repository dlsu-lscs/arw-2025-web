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
      return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
    }

    // Extract new cookies from backend response
    const setCookieHeaders = response.headers.getSetCookie();

    const nextResponse = NextResponse.json({ success: true });

    // Forward the new cookies to the browser
    setCookieHeaders.forEach((cookie) => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
