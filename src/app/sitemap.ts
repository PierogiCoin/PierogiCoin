import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lykkreacji.pl';
    const currentDate = new Date().toISOString();

    return [
        // Homepage - Main Entry Point
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        // Services Section
        {
            url: `${baseUrl}/#uslugi`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // How We Work / Process
        {
            url: `${baseUrl}/#jak-pracujemy`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Portfolio Section
        {
            url: `${baseUrl}/#portfolio`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Pricing Calculator
        {
            url: `${baseUrl}/#kalkulator`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // FAQ Section
        {
            url: `${baseUrl}/#faq`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Contact Section
        {
            url: `${baseUrl}/#kontakt`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Legal Pages
        {
            url: `${baseUrl}/polityka-prywatnosci`,
            lastModified: '2024-11-24',
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/regulamin`,
            lastModified: '2024-11-24',
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        // Local Landing Pages (Kłodzko & Region)
        {
            url: `${baseUrl}/strony-internetowe-klodzko`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/strony-internetowe-polanica-zdroj`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/strony-internetowe-bystrzyca-klodzka`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Regional Landing Pages (Dolny Śląsk)
        {
            url: `${baseUrl}/strony-internetowe-wroclaw`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/strony-internetowe-walbrzych`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/strony-internetowe-swidnica`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
