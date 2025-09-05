import { queryOptions } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useUserStore } from '../store/use-user-store';

// Define a reusable queryOptions config
export const userQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await api.get('/auth/me');

    // Update Zustand store with fetched user
    useUserStore.getState().setUser(data);

    return data;
  },
  staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  retry: false,
});
