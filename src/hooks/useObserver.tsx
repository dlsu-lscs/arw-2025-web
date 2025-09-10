import { on } from 'events';
import { RefObject, useEffect } from 'react';

interface ObserverProps {
  threshold?: number;
  once?: boolean;
  ref: RefObject<HTMLElement | null> | null;
  callback: () => void;
}

export default function useObserver(props: ObserverProps) {
  const { ref, callback, threshold = 0.5, once = false } = props;

  useEffect(() => {
    if (!ref || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            if (once) obs.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, threshold, once]);
}
