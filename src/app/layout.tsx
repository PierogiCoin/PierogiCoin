import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import CookieConsent from '@/components/CookieConsent';
import GTMNoscript from '@/components/GTMNoscript';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorTracker from '@/components/ErrorTracker';
import SkipToContent from '@/components/Layout/SkipToContent';
import FocusManager from '@/components/FocusManager';
import PromoPopupManager from '@/components/Promo/PromoPopupManager';
import { GA_TRACKING_ID } from '@/lib/gtag';
import { siteConfig } from '@/data/siteConfig';
import './globals.css';

// --- Enhanced Structured Data for AI & Search Engines ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${siteConfig.url}/#organization`,
      "name": siteConfig.name,
      "legalName": siteConfig.legalName,
      "url": siteConfig.url,
      "logo": siteConfig.logo,
      "image": siteConfig.ogImage,
      "description": siteConfig.description,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "priceRange": "$$-$$$",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address.street,
        "addressLocality": siteConfig.contact.address.city,
        "postalCode": siteConfig.contact.address.zip,
        "addressRegion": siteConfig.contact.address.region,
        "addressCountry": siteConfig.contact.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": siteConfig.contact.geo.lat,
        "longitude": siteConfig.contact.geo.lng
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": siteConfig.openingHours.days,
        "opens": siteConfig.openingHours.opens,
        "closes": siteConfig.openingHours.closes
      },
      "sameAs": [
        siteConfig.socials.linkedin,
        siteConfig.socials.github,
        siteConfig.socials.facebook,
        siteConfig.socials.twitter
      ],
      "areaServed": siteConfig.areaServed.map(area => ({
        "@type": area === "Poland" ? "Country" : (area === "Dolnośląskie" ? "State" : "City"),
        "name": area
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Usługi Web Development",
        "itemListElement": siteConfig.services.map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": service.description
          }
        }))
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "24",
        "bestRating": "5",
        "worstRating": "1"
      },
      "knowsAbout": [
        "Next.js", "React", "TypeScript", "Web Development", "E-commerce",
        "AI Integration", "ChatGPT API", "Google Gemini", "SEO Optimization",
        "Web3", "Blockchain", "Progressive Web Apps", "Tailwind CSS", "Node.js"
      ],
      "slogan": "Enterprise-grade quality, startup prices"
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      "url": siteConfig.url,
      "name": siteConfig.shortName,
      "description": siteConfig.description,
      "publisher": {
        "@id": `${siteConfig.url}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "pl-PL"
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      "url": siteConfig.url,
      "name": siteConfig.name,
      "isPartOf": {
        "@id": `${siteConfig.url}/#website`
      },
      "about": {
        "@id": `${siteConfig.url}/#organization`
      },
      "datePublished": "2023-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "description": siteConfig.description,
      "inLanguage": "pl-PL"
    }
  ]
};

// --- Enhanced SEO Metadata for AI & Search Engines ---
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // Primary SEO
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`
  },
  description: `🚀 ${siteConfig.description} ☎ ${siteConfig.contact.displayPhone}`,

  // Keywords - Enhanced for AI & Search
  keywords: [
    "tworzenie stron internetowych Wrocław", "strony www Wrocław", "web developer Wrocław",
    "Next.js Wrocław", "React developer Wrocław", "aplikacje AI", "ChatGPT integration",
    "sklepy internetowe", "PWA development", "SEO optimization", "strony internetowe Dolny Śląsk",
    "programista Wrocław", "strony firmowe Wrocław", "aplikacje webowe Wrocław",
    "Next.js 14", "TypeScript developer", "Tailwind CSS", "Node.js development",
    "OpenAI API", "Google Gemini", "machine learning web apps", "AI chatbots",
    "e-commerce Wrocław", "sklepy online", "Web3 development", "blockchain applications",
    "responsive web design", "mobile-first design", "fast websites", "performance optimization",
    "accessible websites", "WCAG compliance", "freelance web developer", "startup websites",
    "business websites", "corporate web development"
  ],

  authors: [
    { name: "Arkadiusz Łyczkowski", url: siteConfig.url },
    { name: "LykKreacji Team" }
  ],
  creator: "Arkadiusz Łyczkowski",
  publisher: "LykKreacji",

  // Category for search engines
  category: "Web Development",
  classification: "Business and Technology Services",

  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'pl': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'cs': `${siteConfig.url}/cs`,
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Enhanced Open Graph
  openGraph: {
    type: "website",
    locale: "pl_PL",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.name)}&description=${encodeURIComponent(siteConfig.description)}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: "image/png",
      }
    ],
    emails: [siteConfig.contact.email],
    phoneNumbers: [siteConfig.contact.phone],
    countryName: "Poland",
  },

  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@lykkreacji",
    creator: "@lykkreacji",
    title: siteConfig.name,
    description: siteConfig.description,
    images: {
      url: `/api/og?title=${encodeURIComponent(siteConfig.name)}&description=${encodeURIComponent(siteConfig.description)}`,
      alt: siteConfig.name,
    },
  },

  // App configuration
  applicationName: siteConfig.shortName,
  referrer: "origin-when-cross-origin",

  // Icons & Manifest
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#06b6d4" },
    ],
  },
  manifest: "/manifest.json",

  // Additional metadata
  other: {
    // Geographic targeting
    'geo.region': `PL-${siteConfig.contact.address.region === 'Dolnośląskie' ? 'DS' : 'XX'}`,
    'geo.placename': siteConfig.contact.address.city,
    'geo.position': `${siteConfig.contact.geo.lat};${siteConfig.contact.geo.lng}`,
    'ICBM': `${siteConfig.contact.geo.lat}, ${siteConfig.contact.geo.lng}`,

    // Language
    'language': 'Polish',
    'content-language': 'pl',

    // Rating
    'rating': 'general',
    'distribution': 'global',

    // Contact
    'contact': siteConfig.contact.email,
    'reply-to': siteConfig.contact.email,

    // Copyright
    'copyright': `LykKreacji ${new Date().getFullYear()}`,

    // Revisit
    'revisit-after': '7 days',

    // AI Search Optimization
    'ai-content-declaration': 'This website uses AI-assisted content and services',
    'ai-content-type': 'Enhanced',
    'ai-services': 'ChatGPT API, Google Gemini API',
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

import { headers } from 'next/headers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const nonce = headers().get('x-nonce') || '';

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
        <link rel="canonical" href="https://lykkreacji.pl" />
        <link rel="alternate" hrefLang="pl" href="https://lykkreacji.pl" />
        <link rel="alternate" hrefLang="en" href="https://lykkreacji.pl/en" />
        <link rel="alternate" hrefLang="cs" href="https://lykkreacji.pl/cs" />

        {/* Main JSON-LD Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          nonce={nonce}
        />

        {/* Breadcrumbs JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://lykkreacji.pl"
              }
            ]
          }` }}
          nonce={nonce}
        />

        {/* Google Analytics 4 */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              nonce={nonce}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-white dark:bg-[#0B1121] text-slate-900 dark:text-slate-100`}>
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        <SkipToContent />
        <GTMNoscript />
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
            <CookieConsent />
            <PromoPopupManager />
          </ThemeProvider>
        </ErrorBoundary>
        <FocusManager />
        <ErrorTracker />
        <WebVitalsReporter />
        <PerformanceMonitor />
        <Analytics />
        <SpeedInsights />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }}
          nonce={nonce}
        />
      </body>
    </html>
  );
}