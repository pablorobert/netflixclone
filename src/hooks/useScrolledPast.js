import { useEffect, useState } from 'react';

/** Indica se a página já foi rolada além de `threshold` pixels. */
export const useScrolledPast = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
};
