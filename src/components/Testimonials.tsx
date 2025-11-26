'use client';

import Image from 'next/image';

import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, Quote, ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Właściciel",
    role: "BHP Stronie Śląskie",
    // Profesjonalny awatar z inicjałami firmy (niebieski - biznesowy)
    image: "https://ui-avatars.com/api/?name=BHP&background=0D8ABC&color=fff&size=150",
    rating: 5,
    text: "Strona idealnie oddaje profesjonalizm naszej firmy szkoleniowej. Jest czytelna, szybka, a klienci w końcu bez problemu znajdują ofertę i kontakt. Współpraca przebiegła wzorowo i terminowo.",
  },
  {
    id: 2,
    name: "Founder Team",
    role: "PierogiMeme.io",
    // Awatar w kolorystyce krypto (złoty/pomarańczowy)
    image: "https://ui-avatars.com/api/?name=PM&background=F59E0B&color=fff&size=150",
    rating: 5,
    text: "Potrzebowaliśmy designu, który zrobi 'hype' i to się udało! Strona wygląda kosmicznie, animacje są płynne, a całość świetnie działa na mobile. Dokładnie o taki efekt nam chodziło w projekcie krypto.",
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSlide = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const content = contentRef.current;

    // 1. Animacja wyjścia (Fade Out + Przesunięcie)
    gsap.to(content, {
      opacity: 0,
      x: direction === 'next' ? -50 : 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        // 2. Zmiana stanu (Logika pętli dla 2 elementów)
        setActiveIndex((prev) => {
          if (direction === 'next') return (prev + 1) % TESTIMONIALS.length;
          return (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        });

        // Reset pozycji dla wejścia
        gsap.set(content, { x: direction === 'next' ? 50 : -50 });

        // 3. Animacja wejścia (Fade In)
        gsap.to(content, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => setIsAnimating(false)
        });
      }
    });
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section id="opinie" ref={containerRef} className="py-24 bg-white dark:bg-black relative overflow-hidden flex items-center justify-center">

      {/* Tło dekoracyjne */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-cyan-900/5 dark:from-cyan-900/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">

        {/* Nagłówek */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Zaufali mi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">inni:</span>
          </h2>
        </div>

        {/* Karta Opinii (Glassmorphism) */}
        <div className="relative bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl min-h-[400px] flex flex-col justify-center">

          {/* Ikona Cytatu (W tle) */}
          <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-16 h-16 text-slate-200 dark:text-white/5 rotate-180" />

          <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center">

            {/* Gwiazdki */}
            <div className="flex gap-1 mb-6">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
              ))}
            </div>

            {/* Treść Opinii */}
            <p className="text-lg sm:text-2xl text-slate-700 dark:text-gray-200 font-medium leading-relaxed mb-8 italic">
              <span>&quot;{activeTestimonial.text}&quot;</span>
            </p>

            {/* Autor */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-cyan-500/50 object-cover"
                />
                {/* Badge Zweryfikowany */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-black rounded-full p-0.5">
                  <BadgeCheck className="w-5 h-5 text-cyan-500 dark:text-cyan-400 fill-white dark:fill-black" />
                </div>
              </div>

              <div className="text-left">
                <h4 className="text-slate-900 dark:text-white font-bold text-lg">{activeTestimonial.name}</h4>
                <p className="text-cyan-600 dark:text-cyan-400 text-sm">{activeTestimonial.role}</p>
              </div>
            </div>

          </div>

          {/* Przyciski Nawigacji (Na bokach karty - Desktop) */}
          <button
            onClick={() => handleSlide('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 hidden sm:block z-20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => handleSlide('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 hidden sm:block z-20"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Nawigacja mobilna (na dole) */}
          <div className="flex justify-center gap-4 mt-8 sm:hidden z-20">
            <button onClick={() => handleSlide('prev')} className="p-3 rounded-full bg-white/10 text-white active:bg-cyan-500"><ArrowLeft /></button>
            <button onClick={() => handleSlide('next')} className="p-3 rounded-full bg-white/10 text-white active:bg-cyan-500"><ArrowRight /></button>
          </div>

        </div>

        {/* Wskaźniki (Kropki) */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                // Opcjonalnie można dodać skok do konkretnego slajdu
              }}
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-cyan-500' : 'w-2 bg-gray-700'
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}