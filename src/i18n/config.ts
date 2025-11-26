export const i18n = {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'cs'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
    pl: 'Polski',
    en: 'English',
    cs: 'Čeština',
};

export const localeFlags: Record<Locale, string> = {
    pl: '🇵🇱',
    en: '🇬🇧',
    cs: '🇨🇿',
};
