import { Metadata } from 'next';
import LocalLandingPage from '@/components/LocalLandingPage';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
    title: "Tworzenie Stron Internetowych Bystrzyca Kłodzka | Tanie i Szybkie Strony",
    description: "Strony internetowe Bystrzyca Kłodzka. Nowoczesne wizytówki firmowe, sklepy online. Lokalne wsparcie i szkolenie z obsługi. Darmowa wycena.",
    keywords: ["strony internetowe Bystrzyca Kłodzka", "tworzenie stron Bystrzyca", "strony www Bystrzyca Kłodzka", "agencja reklamowa Bystrzyca", "wizytówki internetowe"],
    alternates: {
        canonical: 'https://lykkreacji.pl/strony-internetowe-bystrzyca-klodzka',
    },
    openGraph: {
        title: "Tworzenie Stron Internetowych Bystrzyca Kłodzka | LykKreacji",
        description: "Profesjonalne strony WWW w Bystrzycy Kłodzkiej. Zadbaj o wizerunek swojej firmy w internecie.",
        url: 'https://lykkreacji.pl/strony-internetowe-bystrzyca-klodzka',
        siteName: 'LykKreacji',
        locale: 'pl_PL',
        type: 'website',
        images: [
            {
                url: 'https://lykkreacji.pl/api/og?title=Strony+Internetowe+Bystrzyca+K%C5%82odzka',
                width: 1200,
                height: 630,
                alt: 'Tworzenie Stron Internetowych Bystrzyca Kłodzka',
            },
        ],
    }
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "LykKreacji - Strony Internetowe Bystrzyca Kłodzka",
        "image": "https://lykkreacji.pl/api/og?title=Strony+Internetowe+Bystrzyca+K%C5%82odzka",
        "url": "https://lykkreacji.pl/strony-internetowe-bystrzyca-klodzka",
        "telephone": siteConfig.contact.phone,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bystrzyca Kłodzka",
            "addressRegion": "Dolnośląskie",
            "addressCountry": "PL"
        },
        "areaServed": {
            "@type": "City",
            "name": "Bystrzyca Kłodzka"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.2975,
            "longitude": 16.6514
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
                city="Bystrzyca Kłodzka"
                title="Tworzenie Stron Internetowych Bystrzyca Kłodzka"
                description="Rozwijaj swój biznes w Bystrzycy Kłodzkiej z profesjonalną stroną internetową. Oferujemy nowoczesne strony WWW, sklepy online i wsparcie techniczne."
            />
        </>
    );
}
