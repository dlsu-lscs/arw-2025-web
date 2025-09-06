// lib/server-auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as jose from 'jose';
import { User, AuthUser } from '@/features/auth/types/user';

// Verify and decode JWT with signature validation
async function verifyAndDecodeJWT(token: string) {
  try {
    // Check if token exists and is not empty
    if (!token || token.trim() === '') {
      console.log('Token is empty or null');
      return null;
    }

    // Basic JWT format check (must have 3 parts)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('Invalid JWT format: token has', parts.length, 'parts instead of 3');
      console.log('Token value:', token);
      return null;
    }

    // Check if any part is empty
    if (parts.some((part) => !part || part.trim() === '')) {
      console.log('JWT has empty parts');
      return null;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key' // Should match your backend secret
    );

    // Verify signature and decode payload
    const { payload } = await jose.jwtVerify(token, secret);
    if (process.env.NODE_ENV !== 'production') {
      console.log(payload);
    }
    return payload;
  } catch (error) {
    console.log('JWT verification failed:', (error as Error).message || error);
    console.log('Problematic token:', token.substring(0, 100) + '...');
    return null;
  }
}

// Check if token looks like a JWT (has 3 parts separated by dots)
function isJWTFormat(token: string): boolean {
  return token.split('.').length === 3;
}

// Check if token looks like a UUID/GUID
function isUUIDFormat(token: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(token);
}

// Check if JWT token is expired using already verified payload
function isPayloadExpired(payload: jose.JWTPayload | null) {
  if (!payload || !payload.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export async function getServerUser(): Promise<AuthUser> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');
    const refreshToken = cookieStore.get('refresh_token');

    if (process.env.NODE_ENV !== 'production') {
      console.log('=== Token Debug Info ===');
      console.log('Access token exists:', !!accessToken);
      console.log('Refresh token exists:', !!refreshToken);

      if (accessToken) {
        console.log('Access token length:', accessToken.value.length);
        console.log('Access token preview:', accessToken.value.substring(0, 50) + '...');
      }

      if (refreshToken) {
        console.log('Refresh token length:', refreshToken.value.length);
        console.log('Refresh token preview:', refreshToken.value.substring(0, 50) + '...');
      }
    }

    // If no tokens at all, user needs to login
    if (!accessToken && !refreshToken) {
      console.log('No tokens found');
      return null;
    }

    // If we have an access token, try to decode it
    if (accessToken && accessToken.value && accessToken.value.trim() !== '') {
      const payload = await verifyAndDecodeJWT(accessToken.value);

      // If token is valid and not expired, return user data
      if (payload && !isPayloadExpired(payload)) {
        console.log('Access token is valid');
        return {
          sub: payload.sub as string,
          name: payload.name as string,
          picture: payload.picture as string,
        };
      } else {
        console.log('Access token is expired or invalid');
      }
    } else {
      console.log('Access token is empty or malformed');
    }

    // If access token is expired/invalid but we have refresh token
    if (refreshToken && refreshToken.value && refreshToken.value.trim() !== '') {
      // Check if refresh token is a UUID (opaque token) or JWT
      if (isUUIDFormat(refreshToken.value)) {
        console.log('Refresh token is UUID format - valid for refresh');
        return {
          sub: '',
          name: '',
          picture: '',
          needsRefresh: true,
        };
      } else if (isJWTFormat(refreshToken.value)) {
        console.log('Refresh token is JWT format - verifying');
        const refreshPayload = await verifyAndDecodeJWT(refreshToken.value);
        if (refreshPayload && !isPayloadExpired(refreshPayload)) {
          console.log('Refresh token JWT is valid - needs refresh');
          return {
            sub: '',
            name: '',
            picture: '',
            needsRefresh: true,
          };
        } else {
          console.log('Refresh token JWT is expired or invalid');
        }
      } else {
        console.log('Refresh token has unknown format');
      }
    } else {
      console.log('Refresh token is empty or malformed');
    }

    // Both tokens are invalid/expired
    console.log('Both tokens are invalid - redirecting to login');
    return null;
  } catch (error) {
    console.error('Error in getServerUser:', error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth/login');
  }

  // If user needs refresh, redirect to refresh page
  if (user.needsRefresh) {
    redirect('/auth/refresh');
  }

  return user;
}

// Helper function to get just the email from JWT
export async function getServerUserEmail(): Promise<string | null> {
  const user = await getServerUser();

  if (!user || user.needsRefresh) {
    return null;
  }

  return user.sub;
}

// Helper function to check if user is authenticated (boolean)
export async function isServerAuthenticated(): Promise<boolean> {
  const user = await getServerUser();
  return !!user && !user.needsRefresh;
}
