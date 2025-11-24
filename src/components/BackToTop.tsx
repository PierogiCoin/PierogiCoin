// W pliku: src/components/BackToTop.tsx

'use client';

import React, { useState, useEffect, memo } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenisScroll } from '@/hooks/useLenisScroll'; // Import naszego hooka

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // KLUCZOWA ZMIANA: Pobranie funkcji scrollToTop z hooka Lenis
  const { scrollToTop } = useLenisScroll();

  // Efekt do kontrolowania widoczności przycisku
  useEffect(() => {
    // Sprawdzanie, czy istnieje instancja Lenis, zanim zaczniemy nasłuchiwać
    // (W Lenis zazwyczaj używa się instancji scroll, ale dla prostoty zostawmy window.scrollY)
    const toggleVisibility = () => {
      // Pokaż przycisk, gdy przewinięcie jest większe niż wysokość okna * 0.8
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Handler kliknięcia używający funkcji Lenis
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTop(); // Używamy płynnego przewijania Lenis
  };

  return (
    <button
      onClick={handleClick}
      data-cursor-interactive="true"
      aria-label="Wróć na górę strony"
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 transform 
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-0'}
        hover:bg-blue-700 hover:scale-110 active:scale-95`}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default memo(BackToTop);