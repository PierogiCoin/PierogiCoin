'use client';

import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function FloatingPhone() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Pokaż po 5 sekundach
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Sprawdź czy użytkownik już ukrył przycisk w tej sesji
    const hidden = sessionStorage.getItem('phone-button-hidden');
    if (hidden === 'true') {
      setIsHidden(true);
    }

    // Ukryj gdy użytkownik jest w sekcji kontakt
    const handleScroll = () => {
      const btn = document.querySelector('.floating-phone-btn');
      if (!btn) return;
      
      const contactSection = document.querySelector('#kontakt');
      const footer = document.querySelector('footer');
      
      if (contactSection || footer) {
        const rect = contactSection?.getBoundingClientRect() || footer?.getBoundingClientRect();
        const isInContactArea = rect && rect.top < window.innerHeight;
        
        if (isInContactArea && isVisible) {
          gsap.to(btn, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in'
          });
        } else if (!isInContactArea && isVisible && !isHidden) {
          gsap.to(btn, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, isHidden]);

  useEffect(() => {
    if (isVisible && !isHidden) {
      // Poczekaj na następną klatkę, aby element był w DOM
      requestAnimationFrame(() => {
        const btn = document.querySelector('.floating-phone-btn');
        const icon = document.querySelector('.floating-phone-icon');
        
        if (btn) {
          // Animacja wejścia
          gsap.fromTo(btn,
            {
              scale: 0,
              opacity: 0,
              rotation: -180
            },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.5,
              ease: 'back.out(1.7)'
            }
          );
        }

        if (icon) {
          // Subtelna animacja pulsowania
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      });
    }
  }, [isVisible, isHidden]);

  const handleHide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const btn = document.querySelector('.floating-phone-btn');
    if (btn) {
      gsap.to(btn, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          setIsHidden(true);
          sessionStorage.setItem('phone-button-hidden', 'true');
        }
      });
    }
  };

  const handleCall = () => {
    // Track event w GTM
    import('@/lib/analytics').then(({ trackPhoneClick }) => {
      trackPhoneClick('+48790629497', 'floating_button');
    });
  };

  // Nie pokazuj na desktop (tylko mobile/tablet)
  if (typeof window !== 'undefined' && window.innerWidth > 1024) {
    return null;
  }

  // Nie pokazuj jeśli użytkownik ukrył lub nie jest jeszcze widoczny
  if (!isVisible || isHidden) {
    return null;
  }

  return (
    <div className="floating-phone-btn fixed bottom-20 right-4 z-40 md:bottom-24 md:right-6">
      {/* Główny przycisk */}
      <a
        href="tel:+48790629497"
        onClick={handleCall}
        className="relative block w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-shadow group"
        aria-label="Zadzwoń teraz"
      >
        {/* Pulsujące kółko w tle */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
        
        {/* Ikona telefonu */}
        <div className="floating-phone-icon absolute inset-0 flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>

        {/* Tooltip na hover */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          +48 790 629 497
        </span>
      </a>

      {/* Przycisk zamknięcia */}
      <button
        onClick={handleHide}
        className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Ukryj przycisk"
      >
        <X className="w-3 h-3 text-white dark:text-slate-900" />
      </button>
    </div>
  );
}
