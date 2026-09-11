// Scroll reveal: quick fade-up as sections enter the viewport. The hidden
// pre-reveal state only applies once this hook arms the document via
// data-reveal-armed — so a JS failure can never leave content invisible.
import { useEffect } from 'react';

export function useRevealOnScroll(): void {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fail-open: reduced motion, missing IO support, or nothing to reveal —
    // the armed attribute is never set and CSS keeps everything visible.
    if (reducedMotion || !('IntersectionObserver' in window) || revealEls.length === 0) {
      return;
    }

    document.documentElement.dataset.revealArmed = '';
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    revealEls.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      delete document.documentElement.dataset.revealArmed;
    };
  }, []);
}
