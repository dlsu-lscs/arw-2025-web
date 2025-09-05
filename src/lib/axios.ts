import { useUserStore } from '@/features/auth/store/use-user-store';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');

        return api(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().setUser(null);
        localStorage.removeItem('user-storage');
        console.error('Session expired, redirecting to login...');

        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
