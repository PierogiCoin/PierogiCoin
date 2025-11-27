import { Metadata } from 'next';
import LocalLandingPage from '@/components/LocalLandingPage';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
    title: "Tworzenie Stron Internetowych Kłodzko | Strony WWW, Sklepy",
    description: "Profesjonalne strony internetowe Kłodzko. Lokalny Software House, nowoczesne technologie (Next.js), faktura VAT. Umów się na spotkanie w Kłodzku.",
    keywords: ["strony internetowe Kłodzko", "tworzenie stron Kłodzko", "strony www Kłodzko", "agencja interaktywna Kłodzko", "software house Kłodzko"],
    alternates: {
        canonical: 'https://lykkreacji.pl/strony-internetowe-klodzko',
    },
    openGraph: {
        title: "Tworzenie Stron Internetowych Kłodzko | LykKreacji",
        description: "Lokalny Software House w Kłodzku. Strony WWW, Sklepy Internetowe, Aplikacje. Zadzwoń: 790 629 497.",
        url: 'https://lykkreacji.pl/strony-internetowe-klodzko',
        siteName: 'LykKreacji',
        locale: 'pl_PL',
        type: 'website',
        images: [
            {
                url: 'https://lykkreacji.pl/api/og?title=Strony+Internetowe+K%C5%82odzko',
                width: 1200,
                height: 630,
                alt: 'Tworzenie Stron Internetowych Kłodzko',
            },
        ],
    }
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "LykKreacji - Strony Internetowe Kłodzko",
        "image": "https://lykkreacji.pl/api/og?title=Strony+Internetowe+K%C5%82odzko",
        "url": "https://lykkreacji.pl/strony-internetowe-klodzko",
        "telephone": siteConfig.contact.phone,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kłodzko",
            "addressRegion": "Dolnośląskie",
            "addressCountry": "PL"
        },
        "areaServed": {
            "@type": "City",
            "name": "Kłodzko"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.4375,
            "longitude": 16.6547
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
                city="Kłodzko"
                title="Tworzenie Stron Internetowych Kłodzko"
                description="Szukasz wykonawcy strony internetowej w Kłodzku? Dobrze trafiłeś. Tworzymy nowoczesne strony WWW i sklepy internetowe dla lokalnych firm."
            />
        </>
    );
}
