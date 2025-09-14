'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const FIFTEEN_MINUTES = 15 * 60 * 1000;

export default function HighlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  //Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem('isHighlightCardVisible');
    const savedTime = localStorage.getItem('isHighlightCardVisibleTime');

    if (saved && savedTime) {
      const now = Date.now();
      const timeElapsed = now - parseInt(savedTime, 10);

      if (timeElapsed < FIFTEEN_MINUTES) {
        setVisible(saved === 'true');
      } else {
        localStorage.removeItem('isHighlightCardVisible');
        localStorage.removeItem('isHighlightCardVisibleTime');
        setVisible(true);
      }
    }
  }, []);

  //Persist data when it change
  useEffect(() => {
    localStorage.setItem('isHighlightCardVisible', visible.toString());
    localStorage.setItem('isHighlightCardVisibleTime', Date.now().toString());
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {visible && (
        <div
          className={cn('border-[1.5px] border-black flex px-8 py-2 2xl:py-4 relative', className)}
        >
          <span
            role="button"
            aria-label="close-card"
            onClick={() => {
              setVisible(false);
            }}
            className="cursor-pointer font-press-start flex items-center justify-center absolute top-0 right-2"
          >
            x
          </span>
          {children}
        </div>
      )}
    </>
  );
}
