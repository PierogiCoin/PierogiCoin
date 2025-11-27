'use client';

import { useState, useRef } from 'react';
import { Globe, Check } from 'lucide-react';
import { i18n, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleProvider';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function LanguageSwitcher() {
    const { locale: currentLocale, setLocale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen && dropdownRef.current) {
            gsap.fromTo(dropdownRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    const switchLanguage = (newLocale: Locale) => {
        setLocale(newLocale);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-300 dark:border-white/10"
                aria-label="Change language"
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{localeFlags[currentLocale]}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
                        role="button"
                        tabIndex={0}
                        aria-label="Close language menu"
                    />

                    {/* Dropdown */}
                    <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
                    >
                        {i18n.locales.map((locale) => (
                            <button
                                key={locale}
                                onClick={() => switchLanguage(locale)}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">{localeFlags[locale]}</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {localeNames[locale]}
                                    </span>
                                </span>
                                {currentLocale === locale && (
                                    <Check className="w-4 h-4 text-cyan-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
