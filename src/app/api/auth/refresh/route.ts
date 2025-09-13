import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { clearAuthCookies, clearAuthCookiesComplete } from '@/lib/clear-auth-cookies';

export async function POST() {
  console.log('🔄 Refresh endpoint called');

  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token');

    console.log('🍪 Checking for refresh token...');
    console.log('Refresh token exists:', !!refreshToken);

    if (refreshToken) {
      console.log('Refresh token length:', refreshToken.value.length);
      console.log('Refresh token preview:', refreshToken.value.substring(0, 20) + '...');
    }

    if (!refreshToken) {
      console.log('❌ No refresh token found in cookies');
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    console.log('🌐 Calling backend refresh endpoint...');
    console.log('Backend URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`);

    // Call your backend refresh endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        Cookie: `refresh_token=${refreshToken.value}`,
      },
    });

    console.log('📡 Backend response status:', response.status);
    console.log('📡 Backend response ok:', response.ok);

    if (!response.ok) {
      console.log('❌ Backend refresh failed');

      // If refresh fails , clear both tokens from client
      console.log('🧹 Clearing tokens due to invalid refresh token (401/404)');

      const nextResponse = NextResponse.json({ error: 'Refresh failed' }, { status: 401 });

      // Clear cookies using multiple strategies for production compatibility
      clearAuthCookiesComplete(nextResponse);

      console.log('✅ Both access_token and refresh_token cookies cleared via multiple strategies');

      return nextResponse;
    }

    console.log('✅ Backend refresh successful');

    // Extract Set-Cookie headers (string)
    const setCookieHeader = response.headers.get('set-cookie');

    console.log('🍪 Checking for Set-Cookie header from backend...');
    console.log('Set-Cookie header exists:', !!setCookieHeader);

    if (setCookieHeader) {
      console.log('Set-Cookie header preview:', setCookieHeader.substring(0, 100) + '...');
    }

    const nextResponse = NextResponse.json({ success: true });

    if (setCookieHeader) {
      // Forward the cookie to the client
      nextResponse.headers.append('Set-Cookie', setCookieHeader);
      console.log('✅ Forwarded Set-Cookie header to client');
    } else {
      console.log('⚠️ No Set-Cookie header received from backend');
    }

    console.log('✅ Refresh completed successfully');
    return nextResponse;
  } catch (error) {
    console.error('💥 Refresh error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    console.log('🧹 Clearing tokens due to unexpected error');

    const nextResponse = NextResponse.json({ error: 'Internal server error' }, { status: 500 });

    // Clear cookies on any error using multiple strategies
    clearAuthCookies(nextResponse);

    console.log('✅ Cookies cleared due to error');

    return nextResponse;
  }
}
