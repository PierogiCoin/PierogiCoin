'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Bezpieczny dla SSR hook do zarządzania motywem jasnym/ciemnym.
 * Gwarantuje brak błędów hydratacji w Next.js.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let initialTheme: 'light' | 'dark' = 'dark';
    try {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        initialTheme = storedTheme;
      } else {
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        initialTheme = userMedia.matches ? 'dark' : 'light';
      }
    } catch (e) {
      console.error("Błąd odczytu preferencji motywu:", e);
    }
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.colorScheme = theme;
      try {
        window.localStorage.setItem('theme', theme);
      } catch (e) {
        console.error("Błąd zapisu preferencji motywu:", e);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme, mounted };
};

/**
 * Hook do animacji ostatniego słowa w serii fraz.
 */
export const useAnimatedWordCycle = (
    phrases: readonly { base: string; animated: string[] }[],
    config: { durationPerWord: number }
) => {
    const [indices, setIndices] = useState({ phraseIndex: 0, wordIndex: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setIndices(prev => {
                const currentAnimatedWords = phrases[prev.phraseIndex].animated;
                const isLastWord = prev.wordIndex + 1 >= currentAnimatedWords.length;
                
                if (isLastWord) {
                    const nextPhraseIndex = (prev.phraseIndex + 1) % phrases.length;
                    return { phraseIndex: nextPhraseIndex, wordIndex: 0 };
                }
                return { ...prev, wordIndex: prev.wordIndex + 1 };
            });
        }, config.durationPerWord);

        return () => clearInterval(interval);
    }, [phrases, config.durationPerWord]);

    const phrase = phrases[indices.phraseIndex];
    const word = phrase.animated[indices.wordIndex];

    return { baseText: phrase.base, animatedWord: word, animationKey: `${indices.phraseIndex}-${indices.wordIndex}` };
};