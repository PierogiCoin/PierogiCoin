'use client';

import React, { useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

gsap.registerPlugin(ScrollTrigger);

// Leniwe ładowanie Wyboru Kalkulatora (prosty + AI)
const CalculatorChoice = lazy(() => import('./CalculatorChoice'));

// --- Ulepszony Loader ---
const PricingLoader = () => {
    const { dict } = useLocale();
    return (
        <div className="flex flex-col justify-center items-center min-h-[600px] w-full bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-sm">
            <div className="relative">
                {/* Pulsujące okręgi */}
                <div className="w-16 h-16 border-4 border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500/20 rounded-full" />
            </div>
            <p className="mt-6 text-cyan-600 dark:text-cyan-400 font-mono text-sm animate-pulse tracking-widest uppercase">
                {dict.pricing.loader}
            </p>
        </div>
    );
};

export default function Pricing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { dict } = useLocale();

    useGSAP(() => {
        // Animacja wejścia nagłówka
        gsap.fromTo(".pricing-header",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section id="kalkulator" ref={containerRef} className="py-24 bg-white dark:bg-black relative overflow-hidden">

            {/* Dekoracyjne tło (Glow effects) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/5 dark:bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* 1. NAGŁÓWEK SEKCJI */}
                <div className="pricing-header text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-bold mb-6">
                        <Sparkles size={16} />
                        <span>{dict.pricing.badge}</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        {dict.pricing.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">{dict.pricing.title_highlight}</span>
                    </h2>

                    <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {dict.pricing.subtitle}
                    </p>

                    {/* Gwarancja ceny */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-slate-500 dark:text-gray-500">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-600 dark:text-green-500 w-5 h-5" />
                            <span className="text-slate-700 dark:text-gray-400">{dict.pricing.features.guarantee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-600 dark:text-green-500 w-5 h-5" />
                            <span className="text-slate-700 dark:text-gray-400">{dict.pricing.features.invoice}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-600 dark:text-green-500 w-5 h-5" />
                            <span className="text-slate-700 dark:text-gray-400">{dict.pricing.features.installments}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-600 dark:text-green-500 w-5 h-5" />
                            <span className="font-semibold text-green-600 dark:text-green-400">{dict.pricing.features.zero_percent}</span>
                        </div>
                    </div>
                </div>

                {/* 2. WYBÓR KALKULATORA (Prosty + AI Premium) */}
                <div className="pricing-header relative">
                    <Suspense fallback={<PricingLoader />}>
                        <CalculatorChoice />
                    </Suspense>
                </div>

            </div>
        </section>
    );
}