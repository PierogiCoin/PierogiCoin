// W pliku: hooks/useLenisScroll.ts

'use client';

import { useAppStore } from '@/store/useAppStore'; 
import { useCallback } from 'react';

/**
 * Hook ułatwiający przewijanie za pomocą Lenis.
 */
export const useLenisScroll = () => {
  const { lenisInstance } = useAppStore();

  /**
   * Płynnie przewija do góry strony (Top of Page).
   */
  const scrollToTop = useCallback(() => {
    if (lenisInstance) {
      // Używamy tego samego easingu co w Lenis
      lenisInstance.scrollTo(0, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  }, [lenisInstance]);

  /**
   * Płynnie przewija do konkretnego selektora CSS (kotwicy).
   * @param target Selektor CSS (np. '#kontakt' lub element DOM).
   */
  const scrollTo = useCallback((target: string | HTMLElement) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { 
        duration: 1.2, 
        offset: -80, // Offset na stałe menu nawigacyjne
        lerp: 0.1 
      });
    } else {
      // Fallback
      document.querySelector(target as string)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenisInstance]);

  return { scrollToTop, scrollTo, lenisInstance };
};