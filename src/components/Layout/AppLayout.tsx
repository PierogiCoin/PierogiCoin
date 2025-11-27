'use client';

import React, { memo, ReactNode, lazy, Suspense } from 'react';
import Header from './Header';
import ServiceAreaMap from '@/components/ServiceAreaMap';
// Importujemy nowy hook do obsługi płynnego przewijania
import { useLenisScroll } from '@/hooks/useLenisScroll';

// Leniwe ładowanie BackToTop (prawdopodobnie używa useLenisScroll wewnętrznie)
const BackToTop = lazy(() => import('./BackToTop'));

// Typy dla propsów
interface NavLink { href: string; label: string; id: string; }
interface AppLayoutProps {
    children: ReactNode;
    navLinks: NavLink[];
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    mounted: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, navLinks, theme, toggleTheme, mounted }) => {

    // 1. POBIERAMY FUNKCJĘ SCROLLTO Z HOOKA
    const { scrollTo } = useLenisScroll();

    /**
     * Obsługuje kliknięcie linku nawigacyjnego, używając Lenis do płynnego przewijania.
     * Zastępuje domyślne skoki przeglądarki.
     */
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault(); // Zablokuj domyślne zachowanie linku
        scrollTo(href);       // Użyj Lenis do płynnego przewinięcia
    };

    return (
        <div className={mounted ? theme : 'dark'}>
            {/* Lenis działa na poziomie body, ale zachowujemy strukturę */}
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main id="main-content">
                        {children}
                        {/* Assuming FAQ, ServiceAreaMap, Contact, and Footer are part of the main content */}
                        {/* Placeholder for FAQ, Contact, and Footer as they are not defined in the original imports */}
                        {/* <FAQ /> */}
                        <ServiceAreaMap />
                        {/* <Contact /> */}
                        {/* <Footer /> */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default memo(AppLayout);