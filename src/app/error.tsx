'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="pixel-corners--wrapper mx-auto max-w-lg">
          <div className="bg-white border-2 border-black p-8 pixel-corners">
            <h1 className="font-press-start text-2xl sm:text-3xl mb-4 text-red-600">Oops!</h1>
            <h2 className="font-press-start text-lg sm:text-xl mb-6">Something went wrong</h2>
            <p className="font-space-mono text-sm sm:text-base mb-6 text-gray-700">
              A client-side error occurred while loading the page.
              {process.env.NODE_ENV === 'development' && (
                <>
                  <br />
                  <br />
                  <span className="text-red-600 font-mono text-xs break-all">{error.message}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
