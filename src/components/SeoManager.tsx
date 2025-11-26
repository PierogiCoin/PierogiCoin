'use client';

import { useEffect } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

export default function SeoManager() {
    const { locale, dict } = useLocale();

    useEffect(() => {
        // Update document title
        document.title = locale === 'pl'
            ? 'LykKreacji - Profesjonalne Strony Internetowe'
            : locale === 'en'
                ? 'LykKreacji - Professional Web Development'
                : 'LykKreacji - Profesionální Tvorba Webů';

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', dict.hero.subtitle);
        }

        // Update html lang attribute
        document.documentElement.lang = locale;

        // Update Open Graph locale
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) {
            ogLocale.setAttribute('content', locale === 'cs' ? 'cs_CZ' : locale === 'en' ? 'en_US' : 'pl_PL');
        }

    }, [locale, dict]);

    return null;
}
