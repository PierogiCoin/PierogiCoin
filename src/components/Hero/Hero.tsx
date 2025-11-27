'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight, Calculator, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { FallingDropsBackground } from './FallingDropsBackground';
import { InkReveal } from './BrushReveal';
import { useLocale } from '@/i18n/LocaleProvider';

gsap.registerPlugin(TextPlugin);

// --- Tło (Zoptymalizowane) ---
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-[#050505] dark:to-black z-0" />
    <div className="absolute top-[-20%] left-[20%] w-[40vw] h-[40vw] bg-cyan-200/20 dark:bg-cyan-900/10 rounded-full blur-[100px]" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px]" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }} />
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" style={{ opacity: 0.15 }} />
  </div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { dict, locale } = useLocale();

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Sekwencja wejścia
    tl.fromTo(".hero-element",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // 2. Typewriter Effect (Bardziej agresywny sprzedażowo)
    const words = [dict.hero.words.earns, dict.hero.words.converts, dict.hero.words.dominates];
    const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    words.forEach((word) => {
      const wordTl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1.5 });
      wordTl.to(textRef.current, { duration: 0.8, text: word, ease: "none" });
      masterTl.add(wordTl);
    });

    // 3. Pulsowanie przycisku CTA
    gsap.to(".cta-pulse", {
      boxShadow: "0 0 20px 5px rgba(6, 182, 212, 0.4)",
      repeat: -1,
      yoyo: true,
      duration: 1.5
    });

    return () => {
      masterTl.kill();
      tl.kill();
    };

  }, { scope: containerRef, dependencies: [locale] }); // Added dict dependency to re-run animation on language change

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <FallingDropsBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* SCARCITY BADGE (Niedostępność) */}
        <div className="hero-element inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md mb-8 hover:bg-slate-200/80 dark:hover:bg-white/10 transition-colors cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-gray-300 tracking-wide">
            {dict.hero.badge}
          </span>
        </div>

        {/* GŁÓWNY NAGŁÓWEK */}
        <InkReveal delay={0.5}>
          <div className="relative">
            <h1 className="hero-element text-5xl sm:text-7xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
              {dict.hero.title} <br />
              {dict.hero.title2} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600">
                <span ref={textRef}></span>
                <span className="animate-blink text-slate-900 dark:text-white">|</span>
              </span>
            </h1>

            <p className="hero-element text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {dict.hero.subtitle}
            </p>

            {/* CTA SECTION */}
            <div className="hero-element flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">

                {/* PRIMARY CTA - CALCULATOR */}
                <MagneticButton strength={0.6}>
                  <Link
                    href="#kalkulator"
                    className="cta-pulse group relative px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-3 w-full sm:w-auto min-w-[260px]"
                  >
                    <Calculator className="w-6 h-6" />
                    {dict.hero.cta_primary}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>

                {/* SECONDARY CTA */}
                <MagneticButton strength={0.3}>
                  <Link
                    href="#portfolio"
                    className="px-8 py-5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 font-bold text-lg rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-w-[260px] backdrop-blur-sm"
                  >
                    {dict.hero.cta_secondary}
                  </Link>
                </MagneticButton>
              </div>

              {/* MICRO COPY (Trust builder) */}
              <p className="text-xs text-slate-500 dark:text-gray-500 mt-2 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                {dict.hero.trust}
              </p>
            </div>
          </div>
        </InkReveal>

        {/* VALUE PROPS (Zamiast samych ikon technologii) */}
        <div className="hero-element mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Zap, label: dict.hero.values.speed, sub: dict.hero.values.speed_sub },
            { icon: TrendingUp, label: dict.hero.values.conversion, sub: dict.hero.values.conversion_sub },
            { icon: ShieldCheck, label: dict.hero.values.security, sub: dict.hero.values.security_sub },
            { icon: Calculator, label: dict.hero.values.transparency, sub: dict.hero.values.transparency_sub },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300">
                <item.icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="text-center">
                <div className="font-bold text-white text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}