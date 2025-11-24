import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import CookieConsent from '@/components/CookieConsent';
import GTMNoscript from '@/components/GTMNoscript';
import './globals.css';

// --- Lokalne Dane Strukturalne (LocalBusiness - Wrocław & Dolny Śląsk) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LykKreacji - Tworzenie Stron Internetowych Wrocław",
  "image": "https://www.lykkreacji.pl/images/og-image-klodzko.jpg",
  "@id": "https://www.lykkreacji.pl",
  "url": "https://www.lykkreacji.pl",
  "telephone": "+48790629497",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Wrocław",
    "postalCode": "50-000",
    "addressRegion": "Dolnośląskie",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.1079,
    "longitude": 17.0385
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.linkedin.com/in/arkadiusz-lyczkowski",
    "https://github.com/yourusername"
  ],
  "description": "Profesjonalne tworzenie stron internetowych we Wrocławiu i całym Dolnym Śląsku. Specjalizacja: Next.js, React, sklepy e-commerce, aplikacje Web3. IT hub Wrocławia, konkurencyjne ceny.",
  "areaServed": [
    {
      "@type": "City",
      "name": "Wrocław"
    },
    {
      "@type": "City",
      "name": "Jelenia Góra"
    },
    {
      "@type": "City",
      "name": "Wałbrzych"
    },
    {
      "@type": "City",
      "name": "Legnica"
    },
    {
      "@type": "City",
      "name": "Kłodzko"
    },
    {
      "@type": "State",
      "name": "Dolnośląskie"
    }
  ],
  "serviceType": [
    "Tworzenie stron internetowych",
    "Sklepy e-commerce",
    "Aplikacje webowe",
    "Strony Next.js",
    "Aplikacje Web3",
    "SEO",
    "Progressive Web Apps"
  ]
};

// --- METADANE (SEO + Social Media) - WROCŁAW & DOLNY ŚLĄSK ---
export const metadata: Metadata = {
  metadataBase: new URL('https://www.lykkreacji.pl'),
  title: "Tworzenie Stron Internetowych Wrocław | Next.js & Web3 | LykKreacji",
  description: "Profesjonalne strony internetowe Wrocław i Dolny Śląsk. Next.js, React, sklepy e-commerce, aplikacje Web3. IT hub Wrocławia, konkurencyjne ceny. ☎ 790 629 497",
  authors: [{ name: "Arkadiusz Łyczkowski", url: "https://www.lykkreacji.pl" }],
  keywords: [
    "tworzenie stron internetowych Wrocław",
    "strony www Wrocław",
    "web developer Wrocław",
    "sklepy internetowe Wrocław",
    "programista Wrocław",
    "Next.js Wrocław",
    "React developer Wrocław",
    "Web3 Wrocław",
    "strony firmowe Wrocław",
    "aplikacje webowe Wrocław",
    "strony internetowe Dolny Śląsk",
    "e-commerce Wrocław"
  ],
  generator: 'Next.js',
  
  openGraph: {
    title: "Tworzenie Stron Internetowych Wrocław | LykKreacji",
    description: "Profesjonalne strony internetowe Wrocław i Dolny Śląsk. Next.js, React, e-commerce, Web3. IT hub Wrocławia, konkurencyjne ceny. ☎ 790 629 497",
    url: "https://www.lykkreacji.pl",
    siteName: "LykKreacji",
    images: [{ url: "/images/og-image-klodzko.jpg", width: 1200, height: 630, alt: "Tworzenie Stron Internetowych Wrocław - LykKreacji" }],
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Strony Internetowe Wrocław | LykKreacji",
    description: "Profesjonalne strony www Wrocław. Next.js, React, sklepy online, Web3. Dolny Śląsk.",
    images: ["/images/og-image-klodzko.jpg"],
  },

  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  
  other: {
    'application/ld+json': JSON.stringify(jsonLd),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1121" },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-white dark:bg-[#0B1121] text-slate-900 dark:text-slate-100`}>
        <GTMNoscript />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }} />
      </body>
    </html>
  );
}