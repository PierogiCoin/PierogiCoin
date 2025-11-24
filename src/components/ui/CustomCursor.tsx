'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sprawdź czy to urządzenie dotykowe - jeśli tak, nie renderuj kursora
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Ukryj domyślny kursor systemowy (opcjonalnie, ale lepiej zostawić widoczny dla dostępności)
    // document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5, // Follower jest wolniejszy (efekt płynności)
        ease: 'power2.out'
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Powiększ kursor na elementach interaktywnych
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        gsap.to(follower, { scale: 2, backgroundColor: 'rgba(6, 182, 212, 0.3)', duration: 0.3 });
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      } else {
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      // document.body.style.cursor = 'auto';
    };
  }, []);

  // Jeśli renderujemy na serwerze lub urządzeniu dotykowym, zwróć null (ukryj)
  return (
    <>
      {/* Kropka środkowa */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
      {/* Okrąg podążający */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-300"
      />
    </>
  );
}