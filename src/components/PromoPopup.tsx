'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PromoPopupProps {
  title?: string;
  description?: string;
  code?: string;
  discount?: string;
  validUntil?: string;
  image?: string;
  autoShow?: boolean;
  delay?: number; // opóźnienie w ms
  showOnce?: boolean; // pokazuj raz na sesję
}

export default function PromoPopup({
  title = '🎉 Black Friday Sale!',
  description = 'Zdobądź ekskluzywny rabat na wszystkie usługi!',
  code = 'BLACKFRIDAY',
  discount = '30%',
  validUntil = '30.11.2024',
  image,
  autoShow = true,
  delay = 3000,
  showOnce = true,
}: PromoPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Sprawdź czy popup był już pokazany w tej sesji
    if (showOnce) {
      const wasShown = sessionStorage.getItem('promoPopupShown');
      if (wasShown) return;
    }

    // Pokaż popup z opóźnieniem
    if (autoShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        if (showOnce) {
          sessionStorage.setItem('promoPopupShown', 'true');
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [autoShow, delay, showOnce]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={handleClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        aria-label="Zamknij popup promocyjny"
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md animate-slideUp">
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Zamknij"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="relative p-8 text-white">
            {/* Image (optional) */}
            {image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src={image} alt="Promocja" className="w-full h-40 object-cover" />
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold mb-2 text-center">
              {title}
            </h2>

            {/* Discount badge */}
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-white text-purple-600 px-6 py-2 rounded-full text-2xl font-black shadow-lg">
                -{discount} ZNIŻKI
              </span>
            </div>

            {/* Description */}
            <p className="text-center text-white/90 mb-6">
              {description}
            </p>

            {/* Code box */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 border border-white/20">
              <p className="text-sm text-white/80 mb-2 text-center">
                Użyj kodu:
              </p>
              <div className="flex items-center justify-center gap-3">
                <code className="text-2xl font-mono font-bold tracking-wider">
                  {code}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
                >
                  {copied ? '✓ Skopiowano' : 'Kopiuj'}
                </button>
              </div>
            </div>

            {/* Valid until */}
            <p className="text-center text-sm text-white/70">
              ⏰ Oferta ważna do: <span className="font-semibold">{validUntil}</span>
            </p>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              className="w-full mt-6 px-6 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Skorzystaj teraz! 🎁
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
