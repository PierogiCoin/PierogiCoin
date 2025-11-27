import { Metadata } from 'next';
import LocalLandingPage from '@/components/LocalLandingPage';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
    title: "Tworzenie Stron Internetowych Polanica-Zdrój | WWW dla Hoteli",
    description: "Strony internetowe Polanica-Zdrój. Specjalizacja w stronach dla turystyki, hoteli i pensjonatów. Systemy rezerwacji, wielojęzyczność. Sprawdź ofertę.",
    keywords: ["strony internetowe Polanica-Zdrój", "strony dla hoteli Polanica", "tworzenie stron Polanica", "agencja reklamowa Polanica", "systemy rezerwacji"],
    alternates: {
        canonical: 'https://lykkreacji.pl/strony-internetowe-polanica-zdroj',
    },
    openGraph: {
        title: "Tworzenie Stron Internetowych Polanica-Zdrój | LykKreacji",
        description: "Nowoczesne strony WWW dla biznesu w Polanicy-Zdroju. Zwiększ liczbę rezerwacji dzięki profesjonalnej stronie.",
        url: 'https://lykkreacji.pl/strony-internetowe-polanica-zdroj',
        siteName: 'LykKreacji',
        locale: 'pl_PL',
        type: 'website',
        images: [
            {
                url: 'https://lykkreacji.pl/api/og?title=Strony+Internetowe+Polanica-Zdr%C3%B3j',
                width: 1200,
                height: 630,
                alt: 'Tworzenie Stron Internetowych Polanica-Zdrój',
            },
        ],
    }
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "LykKreacji - Strony Internetowe Polanica-Zdrój",
        "image": "https://lykkreacji.pl/api/og?title=Strony+Internetowe+Polanica-Zdr%C3%B3j",
        "url": "https://lykkreacji.pl/strony-internetowe-polanica-zdroj",
        "telephone": siteConfig.contact.phone,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Polanica-Zdrój",
            "addressRegion": "Dolnośląskie",
            "addressCountry": "PL"
        },
        "areaServed": {
            "@type": "City",
            "name": "Polanica-Zdrój"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.4075,
            "longitude": 16.5147
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "sameAs": [
            siteConfig.socials.facebook,
            siteConfig.socials.instagram,
            siteConfig.socials.linkedin
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LocalLandingPage
                city="Polanica-Zdrój"
                title="Tworzenie Stron Internetowych Polanica-Zdrój"
                description="Prowadzisz pensjonat lub hotel w Polanicy? Potrzebujesz strony, która sprzedaje. Tworzymy skuteczne strony WWW z systemami rezerwacji."
            />
        </>
    );
}
