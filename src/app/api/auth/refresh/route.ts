import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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

      // If refresh fails with 401 or 404, clear both tokens from client
      if (response.status === 401 || response.status === 404) {
        console.log('🧹 Clearing tokens due to invalid refresh token (401/404)');

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

        console.log('✅ Both access_token and refresh_token cookies cleared');
        return nextResponse;
      }

      console.log('❌ Backend refresh failed with status:', response.status);
      return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
