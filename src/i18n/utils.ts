import type { Locale } from './config';
import pl from './locales/pl.json';
import en from './locales/en.json';
import cs from './locales/cs.json';

const dictionaries = {
    pl,
    en,
    cs,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];

export type Dictionary = typeof pl;

// Helper function to get nested translation
export function getTranslation(
    dict: Dictionary,
    key: string
): string {
    const keys = key.split('.');
    let value: any = dict;

    for (const k of keys) {
        value = value?.[k];
        if (value === undefined) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }

    return value as string;
}

// Hook for client components
export function useTranslation(locale: Locale) {
    const dict = getDictionary(locale);

    const t = (key: string) => getTranslation(dict, key);

    return { t, dict };
}
