import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    // 1. Setup IntersectionObserver with 85% viewport threshold
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach(el => observer.observe(el));

    // 2. Safety Fallback: Automatically activate any un-revealed elements after 1.5s so nothing stays hidden
    const fallbackTimer = setTimeout(() => {
      elements.forEach(el => el.classList.add('reveal-active'));
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);
};
