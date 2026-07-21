import { useState } from 'react';

/**
 * Custom hook to track recently viewed products
 * Stores up to 4 most recent unique products in localStorage
 */
export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  });

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 4);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  };

  return { recentlyViewed, addToRecentlyViewed };
};
