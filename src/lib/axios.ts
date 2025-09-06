import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use your Next.js API route for refresh
        await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        // Retry the original request
        return api(originalRequest);
      } catch {
        console.error('Session expired, redirecting to login...');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
