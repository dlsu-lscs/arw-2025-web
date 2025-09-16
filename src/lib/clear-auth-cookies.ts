import { NextResponse } from 'next/server';

/**
 * Utility to clear authentication cookies with multiple strategies for production compatibility
 */
export function clearAuthCookies(response: NextResponse) {
  const isProduction = process.env.NODE_ENV === 'production';

  // Get domain from environment
  const domain = process.env.COOKIE_DOMAIN;

  // Multiple clearing strategies for better compatibility
  const clearingStrategies = [
    // Strategy 1: Basic clearing (no domain)
    { domain: '', secure: isProduction },
    // Strategy 2: With specified domain if available
    ...(domain ? [{ domain, secure: isProduction }] : []),
    // Strategy 3: Try common production patterns
    ...(isProduction ? [{ domain: '.vercel.app', secure: true }] : []),
  ];

  const cookieNames = ['access_token', 'refresh_token'];

  clearingStrategies.forEach((strategy, index) => {
    const domainPart = strategy.domain ? `; Domain=${strategy.domain}` : '';
    const securePart = strategy.secure ? '; Secure' : '';
    const cookieOptions = `HttpOnly; Path=/; SameSite=Lax; Max-Age=0${securePart}${domainPart}`;

    cookieNames.forEach((cookieName) => {
      response.headers.append('Set-Cookie', `${cookieName}=; ${cookieOptions}`);
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `🧹 Strategy ${index + 1} - Domain: ${strategy.domain || 'none'}, Options: ${cookieOptions}`
      );
    }
  });

  // Keep this log for production debugging of cookie clearing
  console.log('✅ Applied multiple cookie clearing strategies for production compatibility');

  return response;
}

/**
 * Clear cookies on server-side only (Next.js cookies() API)
 * Note: This does NOT clear cookies in the client browser
 */
export async function clearAuthCookiesServer() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  try {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    if (process.env.NODE_ENV !== 'production') {
      console.log('🧹 Cleared cookies from server-side store (client cookies still exist)');
    }
    return true;
  } catch (error) {
    console.warn('⚠️ Failed to clear server-side cookies:', error);
    return false;
  }
}

/**
 * Complete cookie clearing: Server + Client
 * Use this for full logout functionality
 */
export async function clearAuthCookiesComplete(response: NextResponse) {
  // 1. Clear on server-side
  await clearAuthCookiesServer();

  // 2. Clear on client-side (browser)
  clearAuthCookies(response);

  // Keep this log for production debugging of authentication issues
  console.log('🧹 Cleared cookies on both server and client');
  return response;
}
