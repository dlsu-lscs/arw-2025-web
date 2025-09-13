'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RefreshPage() {
  const router = useRouter();

  useEffect(() => {
    const performRefresh = async () => {
      try {
        // Call your Next.js API route to refresh tokens
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          // Redirect back to where user was trying to go
          const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/';
          router.push(returnTo);
        } else {
          // Refresh failed, redirect to login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Refresh failed:', error);
        router.push('/auth/login');
      }
    };

    performRefresh();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-white">Refreshing your session...</p>
      </div>
    </div>
  );
}
