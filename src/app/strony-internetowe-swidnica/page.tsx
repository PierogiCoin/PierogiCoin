import { Metadata } from 'next';
import LocalLandingPage from '@/components/LocalLandingPage';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
    title: "Tworzenie Stron Internetowych Świdnica | Profesjonalne WWW",
    description: "Strony internetowe Świdnica. Indywidualne projekty graficzne, RWD, CMS. Kompleksowa obsługa firm ze Świdnicy. Pozycjonowanie i sklepy online.",
    keywords: ["strony internetowe Świdnica", "tworzenie stron Świdnica", "strony www Świdnica", "agencja interaktywna Świdnica", "sklepy internetowe Świdnica"],
    alternates: {
        canonical: 'https://lykkreacji.pl/strony-internetowe-swidnica',
    },
    openGraph: {
        title: "Tworzenie Stron Internetowych Świdnica | LykKreacji",
        description: "Tworzymy strony internetowe, które zarabiają. Oferta dla firm ze Świdnicy.",
        url: 'https://lykkreacji.pl/strony-internetowe-swidnica',
        siteName: 'LykKreacji',
        locale: 'pl_PL',
        type: 'website',
        images: [
            {
                url: 'https://lykkreacji.pl/api/og?title=Strony+Internetowe+%C5%9Awidnica',
                width: 1200,
                height: 630,
                alt: 'Tworzenie Stron Internetowych Świdnica',
            },
        ],
    }
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "LykKreacji - Strony Internetowe Świdnica",
        "image": "https://lykkreacji.pl/api/og?title=Strony+Internetowe+%C5%9Awidnica",
        "url": "https://lykkreacji.pl/strony-internetowe-swidnica",
        "telephone": siteConfig.contact.phone,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Świdnica",
            "addressRegion": "Dolnośląskie",
            "addressCountry": "PL"
        },
        "areaServed": {
            "@type": "City",
            "name": "Świdnica"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.8437,
            "longitude": 16.4885
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
                city="Świdnica"
                title="Tworzenie Stron Internetowych Świdnica"
                description="Szukasz agencji interaktywnej w Świdnicy? Zrealizuj z nami swój projekt strony lub sklepu. Nowoczesne technologie, szybki czas realizacji i wsparcie na każdym etapie."
            />
        </>
    );
}
