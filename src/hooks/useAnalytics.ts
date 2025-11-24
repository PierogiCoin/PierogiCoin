/**
 * Custom hooks dla Analytics
 */

import { useEffect, useRef } from 'react';
import {
  trackScrollDepth,
  trackTimeOnPage,
  trackSectionView,
  trackPageView
} from '@/lib/analytics';

/**
 * Hook do śledzenia głębokości scrollowania
 * Trackuje: 25%, 50%, 75%, 90%, 100%
 */
export function useScrollDepthTracking() {
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = Math.round((scrolled / scrollHeight) * 100);

      // Trackuj na progu: 25, 50, 75, 90, 100
      const thresholds = [25, 50, 75, 90, 100];
      
      thresholds.forEach(threshold => {
        if (percentage >= threshold && !tracked.current.has(threshold)) {
          tracked.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Hook do śledzenia czasu na stronie
 * Trackuje co 30 sekund
 */
export function useTimeOnPageTracking() {
  useEffect(() => {
    const startTime = Date.now();
    let lastTracked = 0;

    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      
      // Trackuj co 30 sekund
      if (seconds > 0 && seconds % 30 === 0 && seconds !== lastTracked) {
        lastTracked = seconds;
        trackTimeOnPage(seconds);
      }
    }, 1000);

    // Track przy opuszczeniu strony
    const handleBeforeUnload = () => {
      const finalSeconds = Math.floor((Date.now() - startTime) / 1000);
      trackTimeOnPage(finalSeconds);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

/**
 * Hook do śledzenia widoczności sekcji
 * Używa Intersection Observer
 */
export function useSectionTracking(sectionId: string, sectionName: string) {
  const tracked = useRef(false);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true;
            trackSectionView(sectionName, sectionId);
          }
        });
      },
      {
        threshold: 0.5, // Trackuj gdy 50% sekcji jest widoczne
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, sectionName]);
}

/**
 * Hook do śledzenia page view (SPA routing)
 */
export function usePageViewTracking() {
  useEffect(() => {
    trackPageView(window.location.pathname, document.title);
  }, []);
}

/**
 * Hook do śledzenia błędów JavaScript
 */
export function useErrorTracking() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      import('@/lib/analytics').then(({ trackError }) => {
        trackError(event.message, event.error?.stack);
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
}

/**
 * Hook do śledzenia nieaktywności użytkownika
 */
export function useInactivityTracking(timeoutMinutes: number = 5) {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Track inactivity
        import('@/lib/analytics').then(({ trackTimeOnPage }) => {
          trackTimeOnPage(timeoutMinutes * 60);
        });
      }, timeoutMinutes * 60 * 1000);
    };

    // Reset on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeoutMinutes]);
}

/**
 * Hook do śledzenia outbound links
 */
export function useOutboundLinkTracking() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        
        // Sprawdź czy to link zewnętrzny
        if (url.hostname !== window.location.hostname) {
          import('@/lib/analytics').then(({ trackOutboundLink }) => {
            trackOutboundLink(url.href, link.textContent || link.href);
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
