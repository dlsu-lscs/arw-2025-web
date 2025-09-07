// src/providers/query-provider.tsx
'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: ReactNode;
}

// Initialize QueryClient outside component to prevent re-creation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch automatically when tab focuses
      refetchOnReconnect: true, // Refetch if user reconnects to the internet
      staleTime: 1000 * 60, // 1 min cache freshness
    },
  },
});

export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
