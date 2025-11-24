# 🔍 Google Search Console & Analytics Setup Guide

Complete guide for setting up Google services for LykKreacji.

## 📋 Table of Contents

1. [Google Search Console](#google-search-console)
2. [Google Analytics 4](#google-analytics-4)
3. [Google Business Profile](#google-business-profile)
4. [Google Tag Manager](#google-tag-manager)
5. [Verification](#verification)

---

## 🔎 Google Search Console

### Step 1: Create Account

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Start now"**
3. Sign in with Google account

### Step 2: Add Property

**Choose Domain property (recommended):**

1. Click **"Add property"**
2. Select **"Domain"** (covers all subdomains)
3. Enter: `lykkreacji.pl`
4. Click **"Continue"**

### Step 3: Verify Ownership

**Method 1: DNS Verification (Recommended)**

1. Copy the TXT record provided
2. Go to your domain registrar (e.g., OVH, nazwa.pl)
3. Add DNS TXT record:
   ```
   Type: TXT
   Name: @
   Value: google-site-verification=XXXXXXXXXXXXXXXX
   ```
4. Wait 5-10 minutes for DNS propagation
5. Click **"Verify"** in Search Console

**Method 2: HTML Meta Tag**

Add to `src/app/layout.tsx`:

```typescript
other: {
  'google-site-verification': 'YOUR_VERIFICATION_CODE',
  // ... other meta tags
}
```

Then deploy and click **"Verify"**.

### Step 4: Submit Sitemap

1. In Search Console, go to **Sitemaps**
2. Enter: `https://lykkreacji.pl/sitemap.xml`
3. Click **"Submit"**

### Step 5: Monitor

**Check daily:**
- **Performance** - Clicks, impressions, CTR, position
- **Coverage** - Indexed pages, errors
- **Enhancements** - Core Web Vitals, mobile usability
- **Links** - Internal & external links

---

## 📊 Google Analytics 4

### Step 1: Create Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Start measuring"**
3. Account name: `LykKreacji`
4. Configure data sharing settings

### Step 2: Create Property

1. Property name: `LykKreacji Website`
2. Reporting time zone: `Poland (GMT+1)`
3. Currency: `PLN`
4. Click **"Next"**

### Step 3: Business Details

1. Industry: `Internet & Telecom / Computers & Electronics`
2. Business size: `Small (1-10 employees)`
3. Click **"Next"**

### Step 4: Business Objectives

Select:
- ✅ Generate leads
- ✅ Examine user behavior
- Click **"Create"**

### Step 5: Data Stream

1. Choose **"Web"**
2. Website URL: `https://lykkreacji.pl`
3. Stream name: `LykKreacji Web`
4. Click **"Create stream"**

### Step 6: Get Measurement ID

You'll receive ID like: `G-XXXXXXXXXX`

### Step 7: Add to Website

**Option A: Using next.js Script (Recommended)**

Create `src/lib/gtag.ts`:

```typescript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

Update `src/app/layout.tsx`:

```typescript
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        {/* Google Analytics */}
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
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Add to `.env.local`:**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Option B: Using Google Tag Manager (see below)**

### Step 8: Track Events

Add event tracking to forms, buttons:

```typescript
import { event as gaEvent } from '@/lib/gtag';

// Contact form submission
gaEvent({
  action: 'submit',
  category: 'Contact',
  label: 'Contact Form',
});

// Calculator usage
gaEvent({
  action: 'calculate',
  category: 'Calculator',
  label: 'Price Estimate',
  value: estimatedPrice,
});
```

---

## 🏢 Google Business Profile

### Step 1: Create Profile

1. Go to [Google Business Profile](https://www.google.com/business/)
2. Click **"Manage now"**
3. Enter business name: `LykKreacji`
4. Choose category: `Website Designer` or `Web Development`

### Step 2: Add Location

**If home-based (no physical location):**
1. Select **"No, I don't want to show my address"**
2. Choose service area: `Wrocław and surrounding areas`
3. Add cities: Wrocław, Jelenia Góra, Wałbrzych, Legnica

**If office location:**
1. Enter full address
2. Confirm location on map

### Step 3: Contact Information

```
Phone: +48 790 629 497
Website: https://lykkreacji.pl
Email: czesc@lykkreacji.pl
```

### Step 4: Business Description

```
Profesjonalne tworzenie stron internetowych we Wrocławiu. 
Specjalizujemy się w Next.js, React, sklepach e-commerce, 
aplikacjach AI (ChatGPT, Gemini) i Progressive Web Apps. 

✨ Enterprise quality, startup prices
🚀 Szybkie realizacje
💼 Doświadczony zespół
📱 Full responsive design

Technologie: Next.js 14, React, TypeScript, Tailwind CSS, 
Node.js, AI APIs, Web3

Obszar działania: Wrocław i cały Dolny Śląsk
```

### Step 5: Business Hours

```
Poniedziałek:  9:00 - 18:00
Wtorek:        9:00 - 18:00
Środa:         9:00 - 18:00
Czwartek:      9:00 - 18:00
Piątek:        9:00 - 18:00
Sobota:        Zamknięte
Niedziela:     Zamknięte
```

### Step 6: Add Photos

Upload:
- Logo (LykKreacji logo)
- Cover photo (professional workspace)
- Portfolio screenshots
- Team photos

### Step 7: Add Services

```
Strony internetowe Next.js - od 3000 PLN
Sklepy e-commerce - od 5000 PLN
Aplikacje AI - od 4000 PLN
Progressive Web Apps - od 4000 PLN
Landing pages - od 2000 PLN
SEO optimization - od 1000 PLN
```

### Step 8: Verify

1. Choose verification method:
   - **Phone** (SMS or call)
   - **Email** (if available)
   - **Postcard** (physical mail)

2. Follow verification steps
3. Wait for approval (1-7 days)

### Step 9: Optimize

- ✅ Add posts regularly
- ✅ Respond to reviews
- ✅ Update photos
- ✅ Add Q&A
- ✅ Enable messaging

---

## 🏷️ Google Tag Manager (Optional)

### Step 1: Create Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click **"Create Account"**
3. Account name: `LykKreacji`
4. Container name: `lykkreacji.pl`
5. Target platform: **Web**
6. Click **"Create"**

### Step 2: Install GTM

Add to `src/app/layout.tsx`:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="pl">
      <head>
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
      </head>
      <body>
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
        {children}
      </body>
    </html>
  );
}
```

**Add to `.env.local`:**
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Step 3: Configure Tags

**Add Google Analytics 4 tag:**
1. In GTM, click **"Tags"** → **"New"**
2. Tag Configuration → **Google Analytics: GA4 Configuration**
3. Measurement ID: `G-XXXXXXXXXX`
4. Trigger: **All Pages**
5. Save & Publish

**Add other tags:**
- Microsoft Clarity
- Meta Pixel
- LinkedIn Insight
- Hotjar

---

## ✅ Verification Checklist

### Google Search Console
- [ ] Property added
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] No critical errors
- [ ] Mobile usability OK
- [ ] Core Web Vitals good

### Google Analytics 4
- [ ] Property created
- [ ] Tracking code installed
- [ ] Real-time data visible
- [ ] Events configured
- [ ] Conversions defined
- [ ] Audience segments created

### Google Business Profile
- [ ] Profile created
- [ ] Location verified
- [ ] Contact info complete
- [ ] Photos uploaded
- [ ] Services listed
- [ ] Hours set
- [ ] Reviews enabled

### Google Tag Manager
- [ ] Container created
- [ ] GTM installed
- [ ] GA4 tag configured
- [ ] Tags tested
- [ ] Published

---

## 📊 Monitoring Dashboard

### Daily Check

**Search Console:**
```
- Total clicks: tracking
- Average position: tracking
- Click-through rate: tracking
- New errors: check
```

**Analytics:**
```
- Active users: tracking
- Top pages: review
- Traffic sources: analyze
- Bounce rate: monitor
```

### Weekly Review

- Performance trends
- Top search queries
- Page speed insights
- Mobile usability
- Error reports

### Monthly Report

- Traffic growth
- Keyword rankings
- Conversion rates
- Goal completions
- User behavior

---

## 🎯 Goals & Conversions

### GA4 Events to Track

```typescript
// Contact form submission
gtag('event', 'generate_lead', {
  currency: 'PLN',
  value: 0,
});

// Calculator usage
gtag('event', 'begin_checkout', {
  currency: 'PLN',
  value: estimatedPrice,
});

// Phone click
gtag('event', 'contact', {
  method: 'phone',
});

// Email click
gtag('event', 'contact', {
  method: 'email',
});
```

### Conversion Events

Mark as conversions in GA4:
- `generate_lead` - Contact form submission
- `begin_checkout` - Calculator estimate
- `contact` - Phone/email click
- `scroll` - Page scroll depth
- `file_download` - Portfolio downloads

---

## 🔗 Important Links

- [Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google Business Profile](https://business.google.com/)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## 🆘 Troubleshooting

### Search Console not updating
- Wait 24-48 hours for initial data
- Check verification status
- Re-submit sitemap
- Check robots.txt

### Analytics not tracking
- Verify tracking ID is correct
- Check browser console for errors
- Disable ad blockers for testing
- Use GA Debugger extension

### Business Profile not showing
- Complete all sections
- Add more photos
- Get first review
- Wait 1-2 weeks for indexing

---

**Setup by LykKreacji 🔍**
