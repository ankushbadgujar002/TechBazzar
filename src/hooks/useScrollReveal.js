import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element is visible in the viewport.
 * Useful for trigger scroll-reveal CSS animations.
 * 
 * @param {Object} options IntersectionObserver configuration options
 * @returns {Array} [RefObject, boolean]
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        if (options.triggerOnce !== false) {
          observer.unobserve(entry.target);
        }
      } else if (options.triggerOnce === false) {
        setIsRevealed(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px', // trigger slightly before entering fully
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, isRevealed];
}
