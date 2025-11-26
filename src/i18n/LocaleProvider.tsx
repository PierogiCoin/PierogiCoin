'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { i18n, type Locale } from '@/i18n/config';
import { getDictionary, type Dictionary } from '@/i18n/utils';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    dict: Dictionary;
    isTransitioning: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(i18n.defaultLocale);
    const [dict, setDict] = useState<Dictionary>(getDictionary(i18n.defaultLocale));
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Check cookie for saved preference
        const savedLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1] as Locale;

        if (savedLocale && i18n.locales.includes(savedLocale)) {
            setLocaleState(savedLocale);
            setDict(getDictionary(savedLocale));
        }
    }, []);

    const setLocale = async (newLocale: Locale) => {
        if (newLocale === locale) return;

        setIsTransitioning(true);

        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 300));

        setLocaleState(newLocale);
        setDict(getDictionary(newLocale));
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

        // Wait for DOM update then fade in
        setTimeout(() => {
            setIsTransitioning(false);
        }, 50);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, dict, isTransitioning }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
}
