'use client';

import React, { lazy, Suspense, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/store/useAppStore';
import Lenis from '@studio-freight/lenis';

// Importy dla logiki
import { useTheme } from '@/hooks/useAppHooks';
import {
    useScrollDepthTracking,
    useTimeOnPageTracking,
    useErrorTracking,
    useOutboundLinkTracking
} from '@/hooks/useAnalytics';

// Importy komponentów
import AppLayout from '@/components/Layout/AppLayout';
import Hero from '@/components/Hero/Hero';
import { PortfolioScroll } from '@/components/PortfolioScroll';
import Footer from '@/components/Layout/Footer';
import { SectionLoader } from '@/components/SectionLoader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import StickyFooterWrapper from '@/components/Layout/StickyFooterWrapper';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import SeoManager from '@/components/SeoManager';

// Leniwe ładowanie
const Services = lazy(() => import('@/components/Services'));
const Pricing = lazy(() => import('@/components/Pricing/Pricing'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const BackToTop = lazy(() => import('@/components/Layout/BackToTop'));
const Skills = lazy(() => import('@/components/Skills'));
const Contact = lazy(() => import('@/components/Contact/Contact'));
const HowItWorksDual = lazy(() => import('@/components/HowItWorksDual'));
const FloatingPhone = lazy(() => import('@/components/FloatingPhone'));
const FAQ = lazy(() => import('@/components/FAQ/FAQ'));
const ServiceAreaMap = lazy(() => import('@/components/ServiceAreaMap'));
const PromoPopupManager = lazy(() => import('@/components/Promo/PromoPopupManager'));
import PageTransitionWrapper from '@/components/Layout/PageTransitionWrapper';

gsap.registerPlugin(ScrollTrigger);

// Nawigacja Landing Page
const navLinks = [
    { href: '#jak-pracujemy', label: 'Proces', id: 'jak-pracujemy' },
    { href: '#portfolio', label: 'Realizacje', id: 'portfolio' },
    { href: '#opinie', label: 'Opinie', id: 'opinie' },
    { href: '#kalkulator', label: 'Wycena', id: 'kalkulator' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
];

const Loader = () => (
    <div className="fixed inset-0 bg-[#0B1121] flex items-center justify-center z-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export function ClientLayout() {
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const { setActiveSection, setLenisInstance } = useAppStore();
    const { theme, toggleTheme, mounted } = useTheme();

    // Analytics hooks
    useScrollDepthTracking();
    useTimeOnPageTracking();
    useErrorTracking();
    useOutboundLinkTracking();

    useGSAP(() => {
        const lenis = new Lenis({
            lerp: 0.08, // Bardziej "miękkie" przewijanie, typowe dla stron premium
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        setLenisInstance(lenis);

        lenis.on('scroll', ScrollTrigger.update);

        const lenisRAF = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(lenisRAF);
        gsap.ticker.lagSmoothing(0);

        const handleRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener('refresh', handleRefresh);

        // Animacje sekcji - w Landing Page ważne jest "Storytelling"
        // Sekcje wjeżdżają jedna po drugiej, prowadząc wzrok
        let ctx: gsap.Context | null = null;

        // Poczekaj na następną klatkę aby DOM był gotowy
        requestAnimationFrame(() => {
            if (!mainContainerRef.current) return;

            ctx = gsap.context(() => {
                const sections = gsap.utils.toArray("main > section:not(#hero)");
                if (sections.length > 0) {
                    gsap.from(sections, {
                        y: 80,
                        autoAlpha: 0,
                        duration: 1,
                        ease: 'power3.out',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: sections[0] as Element,
                            start: 'top 85%'
                        }
                    });
                }

                // Śledzenie sekcji dla Analytics (opcjonalnie) lub aktywnego menu
                navLinks.forEach(link => {
                    const el = document.querySelector(link.href);
                    if (el) {
                        ScrollTrigger.create({
                            trigger: el,
                            start: 'top center',
                            end: 'bottom center',
                            onToggle: self => self.isActive && setActiveSection(link.id),
                        });
                    }
                });
            }, mainContainerRef);
        });

        return () => {
            if (ctx) ctx.revert();
            gsap.ticker.remove(lenisRAF);
            lenis.destroy();
            setLenisInstance(null);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            ScrollTrigger.removeEventListener('refresh', handleRefresh);
        };

    }, []);

    if (!mounted) return <Loader />;

    return (
        <div ref={mainContainerRef} className="bg-white dark:bg-[#0B1121] min-h-screen transition-colors duration-300 selection:bg-blue-500 selection:text-white">
            <ScrollProgressBar />
            <LocaleProvider>
                <SeoManager />
                <PageTransitionWrapper>
                    <Suspense fallback={<Loader />}>
                        <AppLayout
                            navLinks={navLinks}
                            theme={theme}
                            toggleTheme={toggleTheme}
                            mounted={mounted}
                        >
                            <main className="flex flex-col relative z-10">

                                {/* 1. HERO - Obietnica Wartości + CTA */}
                                <section id="hero" className="relative min-h-screen w-full">
                                    <Hero />
                                </section>

                                {/* 2. USŁUGI (PROBLEM -> ROZWIĄZANIE) */}
                                <section id="uslugi" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader label="Rozwiązania..." />}>
                                        <Services />
                                    </Suspense>
                                </section>

                                {/* 3. JAK PRACUJEMY (PROCES) */}
                                <section id="jak-pracujemy" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader label="Ładowanie procesu..." />}>
                                        <HowItWorksDual />
                                    </Suspense>
                                </section>

                                {/* 4. TECHNOLOGIE (WIARYGODNOŚĆ EKSPERTA) */}
                                <section id="technologie" className="relative w-full bg-slate-50/50 dark:bg-slate-900/50 -mt-px">
                                    <Suspense fallback={<SectionLoader />}>
                                        <Skills />
                                    </Suspense>
                                </section>

                                {/* 5. PORTFOLIO (DOWÓD SPOŁECZNY - TWARDY) */}
                                <section id="portfolio" className="relative w-full -mt-px">
                                    <PortfolioScroll />
                                </section>

                                {/* 6. OPINIE (DOWÓD SPOŁECZNY - MIĘKKI) */}
                                <section id="opinie" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader />}>
                                        <Testimonials />
                                    </Suspense>
                                </section>

                                {/* 7. WIELKI FINAŁ - WYCENA (CTA) */}
                                <section id="kalkulator" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader label="Kalkulator..." />}>
                                        <Pricing />
                                    </Suspense>
                                </section>

                                {/* 8. FAQ (CZĘSTO ZADAWANE PYTANIA) */}
                                <section id="faq" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader label="FAQ..." />}>
                                        <FAQ />
                                    </Suspense>
                                </section>

                                {/* 8.5. OBSZAR DZIAŁANIA (MAPA) */}
                                <section id="obszar-dzialania" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader label="Mapa..." />}>
                                        <ServiceAreaMap />
                                    </Suspense>
                                </section>

                                {/* 9. ALTERNATYWNY KONTAKT (DLA NIEZDECYDOWANYCH) */}
                                <section id="kontakt" className="relative w-full -mt-px">
                                    <Suspense fallback={<SectionLoader />}>
                                        <Contact />
                                    </Suspense>
                                </section>
                            </main>

                            <StickyFooterWrapper>
                                <Footer />
                            </StickyFooterWrapper>
                            <Suspense fallback={null}><BackToTop /></Suspense>
                            <Suspense fallback={null}><FloatingPhone /></Suspense>
                            <Suspense fallback={null}>
                                {typeof window !== 'undefined' && (
                                    React.createElement(lazy(() => import('@/components/PWAInstallPrompt')))
                                )}
                            </Suspense>
                        </AppLayout>

                        <CustomCursor />
                        <Suspense fallback={null}>
                            <PromoPopupManager />
                        </Suspense>
                    </Suspense>
                </PageTransitionWrapper>
            </LocaleProvider>
        </div>
    );
}