'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator, Sparkles, Code } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#uslugi', label: 'Usługi' },
    { href: '#jak-pracujemy', label: 'Proces' },
    { href: '#technologie', label: 'Technologie' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#opinie', label: 'Opinie' },
    { href: '#kalkulator', label: 'Wycena' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 shadow-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <Code className="w-8 h-8 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors" />
              <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              LykKreacji
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA + THEME TOGGLE */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/#kalkulator"
              className="group relative px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Wycena 30s
              <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/10">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-4 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between">
              <ThemeToggle />
              <Link
                href="/#kalkulator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white font-bold rounded-full flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Wycena
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}