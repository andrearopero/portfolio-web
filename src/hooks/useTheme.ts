// Theme state for the React app. The no-FOUC bootstrap in index.html has
// already resolved the initial theme before first paint — this hook reads
// that result and flips it on demand.
import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

function readInitialTheme(): Theme {
  // Bootstrap script sets data-theme on <html> pre-paint; trust it.
  const current = document.documentElement.dataset.theme;
  return current === 'dark' ? 'dark' : 'light';
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Persistence is best-effort; the visual flip already happened.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
