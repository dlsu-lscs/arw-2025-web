import { useEffect, useState } from 'react';

export const useImageFallback = (imageUrl?: string | null, fallbackUrl?: string): string => {
  // Use a type guard to ensure we have a string for the initial state
  const initialUrl = imageUrl && typeof imageUrl === 'string' ? imageUrl : fallbackUrl;
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(initialUrl || '');

  useEffect(() => {
    // Reset to the new imageUrl immediately when it changes
    if (imageUrl && typeof imageUrl === 'string') {
      setCurrentImageUrl(imageUrl);

      const img = new window.Image();
      img.src = imageUrl;
      img.onerror = () => {
        if (fallbackUrl) {
          setCurrentImageUrl(fallbackUrl);
        }
      };
    } else if (fallbackUrl) {
      // If no imageUrl provided, use fallback
      setCurrentImageUrl(fallbackUrl);
    }
  }, [imageUrl, fallbackUrl]);

  return currentImageUrl;
};
