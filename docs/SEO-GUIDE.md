# 🔍 SEO & AI Search Optimization Guide

Complete guide for search engine and AI crawler optimization.

## 📋 Table of Contents

1. [Overview](#overview)
2. [AI Crawlers](#ai-crawlers)
3. [Structured Data](#structured-data)
4. [robots.txt Configuration](#robotstxt-configuration)
5. [Sitemap](#sitemap)
6. [Meta Tags](#meta-tags)
7. [Performance SEO](#performance-seo)
8. [Local SEO](#local-seo)
9. [Monitoring](#monitoring)

---

## 🎯 Overview

### Optimization For

✅ **Traditional Search Engines:**
- Google
- Bing
- DuckDuckGo
- Yandex
- Baidu

✅ **AI Search Engines:**
- ChatGPT (OpenAI)
- Google Gemini / Bard
- Microsoft Copilot
- Perplexity AI
- You.com
- Claude (Anthropic)

✅ **AI Assistants:**
- Siri (Apple)
- Alexa (Amazon)
- Google Assistant

---

## 🤖 AI Crawlers

### Allowed Crawlers

**robots.txt** explicitly allows these AI bots:

```
ChatGPT-User          # OpenAI ChatGPT browsing
GPTBot                # OpenAI indexing
OAI-SearchBot         # OpenAI search
Google-Extended       # Google AI features
Googlebot             # Google Search
anthropic-ai          # Claude
Claude-Web            # Claude web browsing
PerplexityBot         # Perplexity AI
YouBot                # You.com
Applebot              # Apple Siri
Applebot-Extended     # Apple AI features
Bingbot               # Microsoft Bing
FacebookBot           # Meta AI
```

### AI Plugin Manifest

Located at `/.well-known/ai-plugin.json` and `/ai-plugin.json`:

```json
{
  "schema_version": "v1",
  "name_for_model": "lykkreacji_web_development",
  "description_for_model": "LykKreacji is a professional web development agency...",
  "contact_email": "czesc@lykkreacji.pl",
  "logo_url": "https://lykkreacji.pl/images/logo.png"
}
```

**Purpose:**
- ChatGPT plugin discovery
- AI search indexing
- Better AI understanding
- Contact information

---

## 📊 Structured Data

### Enhanced JSON-LD Schema

**Multiple entity types:**

```typescript
"@graph": [
  {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "name": "LykKreacji",
    "description": "...",
    "knowsAbout": [
      "Next.js",
      "React",
      "AI Integration",
      "ChatGPT API",
      "Google Gemini",
      // ... more
    ]
  },
  {
    "@type": "WebSite",
    "url": "https://lykkreacji.pl",
    "potentialAction": {
      "@type": "SearchAction"
    }
  },
  {
    "@type": "WebPage",
    "dateModified": "2024-11-24"
  }
]
```

**Benefits:**
- Google Knowledge Graph
- Rich snippets
- AI understanding
- Voice search optimization

### Offer Catalog

```typescript
"hasOfferCatalog": {
  "@type": "OfferCatalog",
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Strony Internetowe Next.js",
        "description": "..."
      }
    }
  ]
}
```

---

## 🤖 robots.txt Configuration

### Current Setup

```
# AI Crawlers explicitly allowed
User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

# ... more AI bots

# Disallow private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# Sitemap
Sitemap: https://lykkreacji.pl/sitemap.xml
```

**Key Points:**
- ✅ All AI bots explicitly allowed
- ✅ Clear disallow rules
- ✅ Sitemap reference
- ✅ Crawl-delay set to 1 second

---

## 🗺️ Sitemap

### XML Sitemap

Located at `/sitemap.xml`:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://lykkreacji.pl</loc>
    <lastmod>2024-11-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://lykkreacji.pl/og-image.jpg</image:loc>
      <image:title>LykKreacji</image:title>
    </image:image>
  </url>
</urlset>
```

**Features:**
- ✅ Image sitemap included
- ✅ Last modified dates
- ✅ Change frequency hints
- ✅ Priority indicators

---

## 🏷️ Meta Tags

### Enhanced SEO Tags

```typescript
export const metadata: Metadata = {
  title: {
    default: "...",
    template: "%s | LykKreacji"
  },
  description: "...",
  keywords: [
    // 50+ targeted keywords
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: { /* Enhanced OG */ },
  twitter: { /* Twitter Card */ },
  other: {
    'geo.region': 'PL-DS',
    'geo.placename': 'Wrocław',
    'ai-content-declaration': 'This website uses AI-assisted content',
    'ai-services': 'ChatGPT API, Google Gemini API',
  }
}
```

### AI-Specific Tags

```typescript
'ai-content-declaration': 'This website uses AI-assisted content and services'
'ai-content-type': 'Enhanced'
'ai-services': 'ChatGPT API, Google Gemini API'
```

**Purpose:**
- Inform AI about AI usage
- Transparency
- Better AI understanding

---

## ⚡ Performance SEO

### Core Web Vitals

**Targets for SEO:**
- **LCP**: < 2.5s ✅
- **INP**: < 200ms ✅
- **CLS**: < 0.1 ✅
- **FCP**: < 1.8s ✅
- **TTFB**: < 800ms ✅

**Impact on rankings:**
- Google Page Experience
- Mobile-first indexing
- User experience signals

### Optimization

```typescript
// next.config.mjs
{
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

---

## 📍 Local SEO

### Geographic Targeting

```typescript
other: {
  'geo.region': 'PL-DS',          // Lower Silesia
  'geo.placename': 'Wrocław',
  'geo.position': '51.1079;17.0385',
  'ICBM': '51.1079, 17.0385',
}
```

### Area Served

```typescript
"areaServed": [
  { "@type": "City", "name": "Wrocław" },
  { "@type": "City", "name": "Jelenia Góra" },
  { "@type": "City", "name": "Wałbrzych" },
  { "@type": "City", "name": "Legnica" },
  { "@type": "City", "name": "Kłodzko" },
  { "@type": "State", "name": "Dolnośląskie" },
  { "@type": "Country", "name": "Poland" }
]
```

### Google Business Profile

**Setup:**
1. Create Google Business Profile
2. Verify location
3. Add services
4. Get reviews
5. Link to website

---

## 📈 Monitoring

### Google Search Console

**Track:**
- Search queries
- Click-through rate (CTR)
- Impressions
- Average position
- Index coverage
- Core Web Vitals

**Setup:**
```html
<meta name="google-site-verification" content="your_code" />
```

### Bing Webmaster Tools

```html
<meta name="msvalidate.01" content="your_code" />
```

### Analytics

```typescript
// Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

// Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

---

## 🔧 SEO Checklist

### Technical SEO
- [x] robots.txt configured
- [x] sitemap.xml generated
- [x] SSL certificate (HTTPS)
- [x] Mobile-friendly
- [x] Fast loading (< 3s)
- [x] No broken links
- [x] Canonical URLs
- [x] Structured data
- [x] Alt text on images
- [x] Meta descriptions

### AI Optimization
- [x] AI crawlers allowed
- [x] AI plugin manifest
- [x] Rich descriptions
- [x] Clear service listings
- [x] Contact information
- [x] Expertise declared
- [x] Technology stack listed

### Content SEO
- [x] Keyword research
- [x] Target keywords in title
- [x] H1-H6 hierarchy
- [x] Internal linking
- [x] Content quality
- [x] Regular updates
- [x] Schema markup

### Local SEO
- [x] NAP consistency (Name, Address, Phone)
- [x] Google Business Profile
- [x] Local keywords
- [x] Geographic targeting
- [x] Area served defined
- [x] Local structured data

---

## 🎯 Keywords Strategy

### Primary Keywords
```
tworzenie stron internetowych Wrocław
strony www Wrocław
web developer Wrocław
sklepy internetowe Wrocław
```

### Technology Keywords
```
Next.js Wrocław
React developer
TypeScript developer
AI integration
ChatGPT API
Google Gemini
```

### Long-tail Keywords
```
profesjonalne strony internetowe Wrocław
tworzenie sklepów online Dolny Śląsk
aplikacje AI Wrocław
Next.js web development Poland
```

### LSI Keywords (Latent Semantic Indexing)
```
responsive design
mobile-first
PWA
SEO optimization
performance optimization
accessibility
```

---

## 📊 Expected Results

### Traditional Search
- **Time to rank**: 2-6 months
- **Target**: Top 10 for primary keywords
- **CTR**: 3-5% average
- **Traffic**: 500-1000 visitors/month

### AI Search
- **Time to index**: 1-4 weeks
- **Visibility**: ChatGPT, Gemini, Copilot
- **Queries**: Direct service questions
- **Citations**: Business recommendations

---

## 🔄 Maintenance

### Weekly
- [ ] Check Search Console
- [ ] Monitor rankings
- [ ] Review analytics
- [ ] Check for errors

### Monthly
- [ ] Update content
- [ ] Add new pages
- [ ] Build backlinks
- [ ] Review competitors
- [ ] Update sitemap

### Quarterly
- [ ] Audit technical SEO
- [ ] Refresh keywords
- [ ] Update schema
- [ ] Analyze performance
- [ ] Adjust strategy

---

## 📚 Resources

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Schema.org](https://schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Documentation
- [Google SEO Guide](https://developers.google.com/search/docs)
- [Bing SEO Guide](https://www.bing.com/webmasters/help/webmasters-guidelines)
- [OpenAI GPTBot](https://platform.openai.com/docs/gptbot)

---

## 🎯 Quick Wins

**Immediate actions:**
1. ✅ Submit sitemap to Google Search Console
2. ✅ Submit sitemap to Bing Webmaster Tools
3. ✅ Create Google Business Profile
4. ✅ Add schema markup (done)
5. ✅ Optimize Core Web Vitals (done)
6. ✅ Allow AI crawlers (done)
7. ⏳ Build backlinks
8. ⏳ Get customer reviews
9. ⏳ Create blog content
10. ⏳ Social media presence

---

**Optimized by LykKreacji 🔍**
