'use client'; 

import React, { Suspense, useState, useEffect, useCallback, memo } from 'react';
import { useLenisScroll } from '@/hooks/useLenisScroll'; // KLUCZOWA ZMIANA: Import hooka Lenis
import { useAppStore } from '@/store/useAppStore'; // KLUCZOWA ZMIANA: Import stanu aplikacji

// Leniwe ładowanie dla elementów layoutu
// WAŻNE: W Twojej strukturze Header, Footer i BackToTop są już importowane w ClientLayout.
// Upewnię się, że importujemy je z tej samej ścieżki, jakiej używasz.
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));
const BackToTop = React.lazy(() => import('./BackToTop'));

// --- Hook do zarządzania Motywem (Używam Twojej oryginalnej definicji) ---
const useTheme = () => {
  // Użyjmy useAppStore dla motywu, jeśli jest dostępny, dla synchronizacji
  const { theme, toggleTheme, mounted, setMounted } = useAppStore(state => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
    mounted: state.mounted,
    setMounted: state.setMounted,
  }));
  
  // Zostawiam Twoją oryginalną logikę z useEffect i useState dla theme/mounted na wypadek, gdyby AppStore tego nie obsługiwał
  // Ale dla spójności przyjmuję, że AppStore jest źródłem prawdy
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Opcjonalnie: Zapewnienie, że klasa na <html> jest poprawna po załadowaniu
    document.documentElement.className = theme; 
    setMounted(true);
  }, [theme, setMounted]);

  // Używamy funkcji z useAppStore
  return { theme, toggleTheme, mounted };
};


// --- Dane Nawigacyjne (wymagane przez HeaderProps) ---
const navLinks = [
    { id: 'hero', href: '#hero', label: 'Start' },
    { id: 'jak-to-dziala', href: '#jak-to-dziala', label: 'Proces' },
    { id: 'portfolio', href: '#portfolio', label: 'Portfolio' },
    { id: 'kontakt', href: '#kontakt', label: 'Kontakt' },
];

interface LayoutProps {
  children: React.ReactNode;
}

// Komponent zastępczy (fallback)
const LoadingFallback = () => (
    <div className="flex justify-center items-center py-4">
        Ładowanie...
    </div>
);


const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Pobieranie wymaganych propów z hooków
  const { theme, toggleTheme, mounted } = useTheme(); 
  
  // KLUCZOWA ZMIANA: Pobranie funkcji Lenis
  const { scrollTo } = useLenisScroll();

  // KLUCZOWA ZMIANA: Definicja funkcji obsługi kliknięcia (wymagana przez Header)
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      // Wywołujemy płynne przewijanie Lenis
      scrollTo(href); 
  }, [scrollTo]);


  // Jeśli komponent nie jest zamontowany, renderujemy tylko minimalny fallback
  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    // Używamy motywu na poziomie najwyższego elementu
    <div className={theme}> 
      {/* 1. Użycie Suspense dla Header */}
      <Suspense fallback={<LoadingFallback />}>
        <div className="animated-section">
          <Header />
        </div>
      </Suspense>
      
      <main id="main-content">
        {children}
      </main>

      {/* 2. Użycie Suspense dla Footer i BackToTop */}
      <Suspense fallback={<LoadingFallback />}>
        <div className="animated-section">
          <Footer />
          <BackToTop />
        </div>
      </Suspense>
    </div>
  );
};

export default memo(Layout);