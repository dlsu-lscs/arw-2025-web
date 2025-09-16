import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.dlsucso-arw.com',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (process.env.NODE_ENV !== 'production') {
          console.log('🔄 401 detected, attempting token refresh...');
        }

        // Use your Next.js API route for refresh
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('✅ Token refresh successful, retrying original request');
          }
          // Retry the original request with new tokens
          return api(originalRequest);
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log('❌ Token refresh failed:', refreshResponse.status);
          }
          throw new Error('Refresh failed');
        }
      } catch (refreshError) {
        // Keep this error log for production to track authentication issues
        console.error('💥 Session expired, redirecting to login...', refreshError);

        // Use router in client-side, fallback to window.location
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }

        return Promise.reject(new Error('Session expired'));
      }
    }

    return Promise.reject(error);
  }
);

export default api;
