'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Linkedin, Github, Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight, Cookie } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  // GSAP animation removed as it conflicts with StickyFooterWrapper's reveal effect.
  // The footer is fixed at the bottom and revealed by scrolling, so fade-in is unnecessary/problematic.

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 pt-20 pb-10 relative overflow-hidden">

      {/* Dekoracyjne tło */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-900/5 dark:from-cyan-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* 1. MARKA & OPIS */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter">
              LykKreacji<span className="text-cyan-500">.</span>
            </Link>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
              Profesjonalne tworzenie stron internetowych we Wrocławiu i Dolnym Śląsku. Next.js, React, sklepy e-commerce, aplikacje Web3. IT hub Wrocławia, konkurencyjne ceny.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: siteConfig.socials.instagram || 'https://www.instagram.com/lyk_kreacji/' },
                { icon: Linkedin, href: siteConfig.socials.linkedin },
                { icon: Facebook, href: siteConfig.socials.facebook }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. USŁUGI (SEO Linki) */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Oferta</h4>
            <ul className="space-y-4">
              {['Strony WWW', 'Sklepy E-commerce', 'Aplikacje Webowe', 'Audyt UX/UI', 'Pozycjonowanie SEO'].map((item) => (
                <li key={item}>
                  <Link href="#uslugi" className="text-slate-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-gray-600 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. FIRMA */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Firma</h4>
            <ul className="space-y-4">
              {[
                { label: 'O mnie', href: '#hero' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Proces współpracy', href: '#jak-pracujemy' },
                { label: 'Cennik', href: '#kalkulator' },
                { label: 'Kontakt', href: '#kontakt' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. KONTAKT */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Kontakt</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-500 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-gray-500 uppercase font-bold">Telefon</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium">
                    {siteConfig.contact.displayPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-500 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-gray-500 uppercase font-bold">Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-500 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-gray-500 uppercase font-bold">Lokalizacja</p>
                  <span className="text-slate-600 dark:text-gray-300 text-sm">Wrocław, Dolny Śląsk<br />Obsługa całej Polski</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* LINIA PODZIAŁU */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
            &copy; {currentYear} LykKreacji. Wszelkie prawa zastrzeżone.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Link href="/polityka-prywatnosci" className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">
              Polityka Prywatności
            </Link>
            <Link href="/regulamin" className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">
              Regulamin
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('cookie-consent');
                localStorage.removeItem('cookie-consent-date');
                window.location.reload();
              }}
              aria-label="Zarządzaj ustawieniami cookies"
              className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
            >
              <Cookie className="w-4 h-4" />
              Zarządzaj cookies
            </button>
            <span className="text-xs text-green-500 flex items-center gap-1">
              💳 Płatność ratalna 0%
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}