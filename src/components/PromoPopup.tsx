'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, Copy, Check, Sparkles, Gift } from 'lucide-react';

interface PromoPopupProps {
  title?: string;
  description?: string;
  code?: string;
  discount?: string;
  validUntil?: string;
  autoShow?: boolean;
  delay?: number; // opóźnienie w ms
  showOnce?: boolean; // pokazuj raz na sesję
}

export default function PromoPopup({
  title = 'Oferta Specjalna',
  description = 'Zdobądź zniżkę na pierwszą stronę internetową lub sklep.',
  code = 'START2024',
  discount = '-15%',
  validUntil = '30.11.2024',
  autoShow = true,
  delay = 5000,
  showOnce = true,
}: PromoPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Czy komponent jest w DOM
  const [copied, setCopied] = useState(false);
  
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Logika pokazywania
  useEffect(() => {
    if (!autoShow) return;

    const timer = setTimeout(() => {
      if (showOnce) {
        const wasShown = sessionStorage.getItem('promoPopupShown');
        if (wasShown) return;
      }
      setIsMounted(true); // Montujemy w DOM
      // setIsVisible ustawimy w useGSAP po animacji wejścia
    }, delay);

    return () => clearTimeout(timer);
  }, [autoShow, delay, showOnce]);

  // Animacja Wejścia / Wyjścia
  useGSAP(() => {
    if (isMounted && popupRef.current && overlayRef.current) {
      // Wejście
      setIsVisible(true);
      const tl = gsap.timeline();
      
      tl.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5 }
      )
      .fromTo(popupRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

      if (showOnce) {
        sessionStorage.setItem('promoPopupShown', 'true');
      }
    }
  }, [isMounted]);

  const handleClose = () => {
    if (!popupRef.current || !overlayRef.current) return;

    // Animacja Wyjścia
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setIsMounted(false);
      }
    });

    tl.to(popupRef.current, { scale: 0.8, opacity: 0, y: 50, duration: 0.4, ease: "power3.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Overlay (Tło) */}
      <div 
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Popup Card */}
      <div 
        ref={popupRef}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Dekoracyjne Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-cyan-500/20 blur-[80px] pointer-events-none" />
        
        {/* Przycisk Zamknięcia */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-8 relative z-10 text-center">
          
          {/* Ikona / Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Gift className="w-8 h-8 text-cyan-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            {title} <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </h3>
          
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            {description}
          </p>

          {/* Sekcja z Kodem */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Twój kod rabatowy</p>
                <p className="text-2xl font-mono font-bold text-white tracking-widest">{code}</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Zniżka</p>
                <p className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{discount}</p>
              </div>
            </div>
          </div>

          {/* Przycisk Kopiuj */}
          <button
            onClick={handleCopy}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" /> Skopiowano!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Odbierz Rabat
              </>
            )}
          </button>

          <p className="text-xs text-gray-600 mt-4">
            Oferta ważna do: {validUntil}
          </p>
        </div>
      </div>
    </div>
  );
}