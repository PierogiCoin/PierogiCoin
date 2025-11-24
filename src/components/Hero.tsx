'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowRight, Calculator } from 'lucide-react'; // Ikony dla lepszego wizuala

// Tło konstelacji (ładowane dynamicznie dla wydajności)
const AnimatedConstellationBackground = dynamic(() => import('./AnimatedConstellationBackground'), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Animacje wejścia
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(textRef.current?.children || [], 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    )
    .fromTo(buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black text-slate-900 dark:text-white pb-0 transition-colors duration-300">
      
      {/* 1. TŁO - Przyciemnione, aby tekst był czytelny */}
      <div className="absolute inset-0 z-0 opacity-60">
        <AnimatedConstellationBackground />
      </div>
      
      {/* Gradient overlay dla lepszej czytelności tekstu */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 dark:from-black/30 via-transparent to-white/80 dark:to-black/80 z-0 pointer-events-none" />

      {/* 2. GŁÓWNA TREŚĆ */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <div ref={textRef} className="flex flex-col items-center gap-6">
          {/* Badge - Haczyk uwagi */}
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium tracking-wide uppercase backdrop-blur-sm">
            Darmowa wycena online
          </span>

          {/* H1 - Wrocław SEO + Premium positioning */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
            Tworzenie Stron Internetowych{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-600">
              Wrocław
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl mt-2 block text-slate-600 dark:text-slate-300">
              Next.js • React • Web3 • Dolny Śląsk
            </span>
          </h1>

          {/* Subheadline - Wrocław IT hub */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Profesjonalne strony firmowe, sklepy e-commerce i aplikacje webowe dla biznesu we Wrocławiu i całym Dolnym Śląsku.
            <span className="block mt-2 text-cyan-600 dark:text-cyan-400 font-semibold">IT Hub Wrocławia • Nowoczesne technologie • Konkurencyjne ceny</span>
          </p>
        </div>

        {/* 3. GŁÓWNE CTA - Przycisk Kalkulatora */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <a href="#kalkulator">
            <button 
              ref={buttonRef}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              {/* Efekt połysku na przycisku */}
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -translate-x-full" />
              
              <Calculator className="w-6 h-6" />
              <span>Rozpocznij Wycenę</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>

          {/* Secondary CTA (opcjonalne) */}
          <a href="#portfolio" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-slate-600 dark:hover:border-gray-400 pb-0.5">
            Zobacz nasze realizacje
          </a>
        </div>

        {/* 4. TRUST INDICATOR - Mały tekst pod przyciskiem */}
        <p className="mt-6 text-xs text-slate-500 dark:text-gray-500 uppercase tracking-widest">
          Bez zobowiązań • Wynik natychmiast na maila
        </p>

      </div>
    </section>
  );
}