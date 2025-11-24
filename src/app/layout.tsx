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
import SkipToContent from '@/components/SkipToContent';
import FocusManager from '@/components/FocusManager';
import { GA_TRACKING_ID } from '@/lib/gtag';
import './globals.css';

// --- Enhanced Structured Data for AI & Search Engines ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": "https://lykkreacji.pl/#organization",
      "name": "LykKreacji - Tworzenie Stron Internetowych Wrocław",
      "legalName": "LykKreacji Arkadiusz Łyczkowski",
      "url": "https://lykkreacji.pl",
      "logo": "https://lykkreacji.pl/images/logo.png",
      "image": "https://lykkreacji.pl/images/og-image-klodzko.jpg",
      "description": "Profesjonalne tworzenie stron internetowych we Wrocławiu. Specjalizacja: Next.js, React, sklepy e-commerce, aplikacje AI. Enterprise-grade quality, startup prices.",
      "telephone": "+48790629497",
      "email": "czesc@lykkreacji.pl",
      "priceRange": "$$-$$$",
      "foundingDate": "2023",
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
        "https://github.com/yourusername",
        "https://www.facebook.com/lykkreacji",
        "https://twitter.com/lykkreacji"
      ],
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
        },
        {
          "@type": "Country",
          "name": "Poland"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Usługi Web Development",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Strony Internetowe Next.js",
              "description": "Nowoczesne, szybkie strony internetowe w Next.js 14 z SSR i SEO"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sklepy E-commerce",
              "description": "Kompleksowe sklepy internetowe z integracją płatności i CMS"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aplikacje AI",
              "description": "Aplikacje z integracją ChatGPT, Gemini i innych modeli AI"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Progressive Web Apps",
              "description": "PWA działające offline z push notifications"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web3 & Blockchain",
              "description": "Aplikacje DeFi, NFT marketplace, smart contracts"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "24",
        "bestRating": "5",
        "worstRating": "1"
      },
      "knowsAbout": [
        "Next.js",
        "React",
        "TypeScript",
        "Web Development",
        "E-commerce",
        "AI Integration",
        "ChatGPT API",
        "Google Gemini",
        "SEO Optimization",
        "Web3",
        "Blockchain",
        "Progressive Web Apps",
        "Tailwind CSS",
        "Node.js",
        "API Development"
      ],
      "slogan": "Enterprise-grade quality, startup prices"
    },
    {
      "@type": "WebSite",
      "@id": "https://lykkreacji.pl/#website",
      "url": "https://lykkreacji.pl",
      "name": "LykKreacji - Tworzenie Stron Internetowych",
      "description": "Profesjonalne tworzenie stron internetowych, sklepów e-commerce i aplikacji web we Wrocławiu",
      "publisher": {
        "@id": "https://lykkreacji.pl/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://lykkreacji.pl/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "pl-PL"
    },
    {
      "@type": "WebPage",
      "@id": "https://lykkreacji.pl/#webpage",
      "url": "https://lykkreacji.pl",
      "name": "Tworzenie Stron Internetowych Wrocław | Next.js & AI | LykKreacji",
      "isPartOf": {
        "@id": "https://lykkreacji.pl/#website"
      },
      "about": {
        "@id": "https://lykkreacji.pl/#organization"
      },
      "datePublished": "2023-01-01",
      "dateModified": "2024-11-24",
      "description": "Profesjonalne strony internetowe Wrocław. Next.js, React, AI, sklepy e-commerce. Enterprise-grade quality, startup prices.",
      "inLanguage": "pl-PL"
    }
  ]
};

// --- Enhanced SEO Metadata for AI & Search Engines ---
export const metadata: Metadata = {
  metadataBase: new URL('https://lykkreacji.pl'),
  
  // Primary SEO
  title: {
    default: "Tworzenie Stron Internetowych Wrocław | Next.js, React, AI | LykKreacji",
    template: "%s | LykKreacji - Web Development Wrocław"
  },
  description: "🚀 Profesjonalne strony internetowe Wrocław. Next.js 14, React, AI (ChatGPT, Gemini), sklepy e-commerce, PWA. Enterprise quality, startup prices. ☎ 790 629 497",
  
  // Keywords - Enhanced for AI & Search
  keywords: [
    // Local SEO
    "tworzenie stron internetowych Wrocław",
    "strony www Wrocław",
    "web developer Wrocław",
    "sklepy internetowe Wrocław",
    "programista Wrocław",
    "strony firmowe Wrocław",
    "aplikacje webowe Wrocław",
    "strony internetowe Dolny Śląsk",
    
    // Technology Stack
    "Next.js Wrocław",
    "Next.js 14",
    "React developer Wrocław",
    "TypeScript developer",
    "Tailwind CSS",
    "Node.js development",
    
    // AI Integration
    "ChatGPT integration",
    "OpenAI API",
    "Google Gemini",
    "AI applications",
    "machine learning web apps",
    "AI chatbots",
    
    // Services
    "e-commerce Wrocław",
    "sklepy online",
    "Progressive Web Apps",
    "PWA development",
    "Web3 development",
    "blockchain applications",
    "responsive web design",
    "mobile-first design",
    
    // Features
    "fast websites",
    "SEO optimization",
    "performance optimization",
    "accessible websites",
    "WCAG compliance",
    
    // Business
    "freelance web developer",
    "startup websites",
    "business websites",
    "corporate web development"
  ],
  
  authors: [
    { name: "Arkadiusz Łyczkowski", url: "https://lykkreacji.pl" },
    { name: "LykKreacji Team" }
  ],
  creator: "Arkadiusz Łyczkowski",
  publisher: "LykKreacji",
  
  // Category for search engines
  category: "Web Development",
  classification: "Business and Technology Services",
  
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
    url: "https://lykkreacji.pl",
    siteName: "LykKreacji - Web Development Wrocław",
    title: "Tworzenie Stron Internetowych Wrocław | Next.js, React, AI",
    description: "🚀 Profesjonalne strony internetowe Wrocław. Next.js 14, React, AI (ChatGPT, Gemini), sklepy e-commerce, PWA. Enterprise quality, startup prices.",
    images: [
      {
        url: "/images/og-image-klodzko.jpg",
        width: 1200,
        height: 630,
        alt: "LykKreacji - Profesjonalne Tworzenie Stron Internetowych Wrocław",
        type: "image/jpeg",
      }
    ],
    emails: ["czesc@lykkreacji.pl"],
    phoneNumbers: ["+48790629497"],
    countryName: "Poland",
  },

  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@lykkreacji",
    creator: "@lykkreacji",
    title: "Strony Internetowe Wrocław | Next.js, React, AI",
    description: "🚀 Profesjonalne strony www Wrocław. Next.js 14, React, AI, sklepy online. Enterprise quality, startup prices.",
    images: {
      url: "/images/og-image-klodzko.jpg",
      alt: "LykKreacji - Web Development Wrocław",
    },
  },

  // App configuration
  applicationName: "LykKreacji",
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
    // Structured Data
    'application/ld+json': JSON.stringify(jsonLd),
    
    // Verification tags (add your codes after verification)
    // 'google-site-verification': 'your_google_verification_code',
    // 'msvalidate.01': 'your_bing_verification_code',
    
    // Geographic targeting
    'geo.region': 'PL-DS',
    'geo.placename': 'Wrocław',
    'geo.position': '51.1079;17.0385',
    'ICBM': '51.1079, 17.0385',
    
    // Language
    'language': 'Polish',
    'content-language': 'pl',
    
    // Rating
    'rating': 'general',
    'distribution': 'global',
    
    // Contact
    'contact': 'czesc@lykkreacji.pl',
    'reply-to': 'czesc@lykkreacji.pl',
    
    // Copyright
    'copyright': 'LykKreacji 2024',
    
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
        
        {/* Google Analytics 4 */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
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
        }} />
      </body>
    </html>
  );
}