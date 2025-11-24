'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, Calculator, Phone } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Usługi', href: '#uslugi' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Opinie', href: '#opinie' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Obsługa Scrolla (Zmiana tła)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animacja Menu Mobilnego
  useGSAP(() => {
    gsap.set(mobileMenuRef.current, { xPercent: 100 });
    
    tl.current = gsap.timeline({ paused: true })
      .to(mobileMenuRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      .from('.mobile-nav-link', {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      });
  }, { scope: headerRef });

  useEffect(() => {
    if (isMobileMenuOpen) {
      tl.current?.play();
      document.body.style.overflow = 'hidden'; // Blokada scrolla strony
    } else {
      tl.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Płynne przewijanie do sekcji
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Zamknij mobile menu jeśli otwarte

    if (href.startsWith('/')) {
        // Jeśli to link do innej podstrony (np. /kalkulator)
        window.location.href = href;
        return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/90 dark:bg-black/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight z-50 relative">
          LykKreacji<span className="text-cyan-500">.pl</span>
        </Link>

        {/* 2. DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-sm font-medium transition-colors relative group ${
                isScrolled 
                  ? 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                  : 'text-slate-900 dark:text-white/90 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* 3. CTA BUTTONS (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Przełącznik motywu */}
          <ThemeToggle />
          
          {/* Link do Kalkulatora */}
          <a 
            href="#kalkulator"
            onClick={(e) => handleScrollTo(e, '#kalkulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
              isScrolled
                ? 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10'
                : 'bg-slate-900/10 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-900/20 dark:hover:bg-white/20'
            }`}
          >
            <Calculator size={16} className="text-cyan-400" />
            Wyceń projekt
          </a>

          {/* Przycisk Kontakt */}
          <a 
            href="#kontakt"
            onClick={(e) => handleScrollTo(e, '#kontakt')}
            className="px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
          >
            Współpraca
          </a>
        </div>

        {/* 4. MOBILE HAMBURGER */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden z-50 p-2 ${
            isScrolled 
              ? 'text-slate-900 dark:text-white' 
              : 'text-slate-900 dark:text-white'
          }`}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 5. MOBILE MENU OVERLAY */}
        <div 
          ref={mobileMenuRef}
          className="fixed inset-0 bg-slate-950 dark:bg-black backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden"
        >
          {/* Tło dekoracyjne */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <nav className="flex flex-col gap-8 text-center relative z-10">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="mobile-nav-link text-3xl font-bold text-white drop-shadow-lg hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <div className="w-12 h-px bg-white/10 mx-auto my-4" />

            {/* Przełącznik motywu w mobile menu */}
            <div className="mobile-nav-link flex items-center justify-center">
              <ThemeToggle />
            </div>

            <a 
              href="#kalkulator"
              onClick={(e) => handleScrollTo(e, '#kalkulator')}
              className="mobile-nav-link flex items-center justify-center gap-3 text-xl text-gray-300 hover:text-white drop-shadow-lg transition-colors"
            >
              <Calculator size={24} className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              Kalkulator Wyceny
            </a>
            
            <a 
              href="tel:+48790626497"
              className="mobile-nav-link flex items-center justify-center gap-3 text-xl text-gray-300 hover:text-white drop-shadow-lg transition-colors"
            >
              <Phone size={24} className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              +48 790 626 497
            </a>
          </nav>
        </div>

      </div>
    </header>
  );
}