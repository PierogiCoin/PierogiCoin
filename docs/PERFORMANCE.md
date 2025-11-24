# 📊 Performance Monitoring

Dokumentacja systemu monitorowania wydajności aplikacji.

## 🎯 Metryki Web Vitals

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**
   - ✅ Good: ≤ 2.5s
   - ⚠️ Needs Improvement: 2.5s - 4s
   - ❌ Poor: > 4s
   - **Co mierzy**: Czas ładowania największego elementu

2. **FID (First Input Delay)** / **INP (Interaction to Next Paint)**
   - ✅ Good: ≤ 100ms (FID) / ≤ 200ms (INP)
   - ⚠️ Needs Improvement: 100-300ms / 200-500ms
   - ❌ Poor: > 300ms / > 500ms
   - **Co mierzy**: Responsywność na interakcje użytkownika

3. **CLS (Cumulative Layout Shift)**
   - ✅ Good: ≤ 0.1
   - ⚠️ Needs Improvement: 0.1 - 0.25
   - ❌ Poor: > 0.25
   - **Co mierzy**: Stabilność wizualną (przesunięcia elementów)

### Inne Metryki

4. **FCP (First Contentful Paint)**
   - ✅ Good: ≤ 1.8s
   - ⚠️ Needs Improvement: 1.8s - 3s
   - ❌ Poor: > 3s

5. **TTFB (Time to First Byte)**
   - ✅ Good: ≤ 800ms
   - ⚠️ Needs Improvement: 800ms - 1800ms
   - ❌ Poor: > 1800ms

---

## 🛠️ Narzędzia

### 1. Vercel Speed Insights

```tsx
// Automatycznie dodane w layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
```

**Funkcje:**
- Real User Monitoring (RUM)
- Dashboard w Vercel
- Automatyczne alerty
- Analiza per route

**Dostęp:**
- https://vercel.com/dashboard → Analytics → Speed Insights

### 2. Web Vitals Reporter

```tsx
// src/lib/webVitals.ts
import { reportWebVitals } from '@/lib/webVitals'
```

**Wysyła dane do:**
- Google Analytics 4
- Custom analytics endpoint
- Console (development)

### 3. Performance Monitor (Dev)

**Aktywacja:**
```
# Development
http://localhost:3000

# Production
https://lykkreacji.pl?debug=perf
```

Pokazuje metryki na żywo w prawym dolnym rogu.

---

## 📈 Google Analytics Integration

Web Vitals są automatycznie wysyłane do GA4:

```javascript
gtag('event', 'LCP', {
  value: 2500,
  metric_rating: 'good',
  metric_id: 'v3-1234...',
})
```

**Dashboard GA4:**
1. Events → Web Vitals
2. Custom Reports → Performance
3. Real-time → Performance events

---

## 🔍 Monitoring w Praktyce

### Lighthouse CI (lokalne testy)

```bash
# Instalacja
npm install -g @lhci/cli

# Uruchom
lhci autorun
```

### Vercel Analytics

```bash
# Deploy z analytics
vercel --prod

# Zobacz metryki
vercel inspect [URL]
```

### Chrome DevTools

1. **Performance Tab**
   - Record page load
   - Analyze timeline
   - Identify bottlenecks

2. **Lighthouse**
   - Desktop + Mobile
   - All categories
   - Suggestions

3. **Network Tab**
   - Waterfall analysis
   - Bundle sizes
   - Cache status

---

## 🎯 Cele Wydajnościowe

### Desktop
- **Performance**: 95+
- **FCP**: < 1.5s
- **LCP**: < 2.0s
- **CLS**: < 0.05

### Mobile
- **Performance**: 90+
- **FCP**: < 2.0s
- **LCP**: < 2.5s
- **CLS**: < 0.1

---

## 🚀 Optymalizacje

### Obrazy
```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // Above the fold
  placeholder="blur"
/>
```

### Fonty
```tsx
// Używamy Geist z next/font
import { GeistSans } from 'geist/font/sans'

// Automatyczna optymalizacja
```

### Code Splitting
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Spinner />,
  ssr: false // Client-only
})
```

### Lazy Loading
```tsx
<LazySection id="portfolio">
  <Portfolio />
</LazySection>
```

---

## 📊 Tracking Custom Metrics

```typescript
// src/lib/webVitals.ts
export function trackCustomMetric(name: string, value: number) {
  if (window.gtag) {
    window.gtag('event', name, {
      value: Math.round(value),
      custom_metric: true,
    })
  }
}

// Usage
trackCustomMetric('api_response_time', 250)
```

---

## 🐛 Debugging Performance

### Development
```bash
# Performance Monitor aktywny automatycznie
npm run dev
```

### Production
```bash
# Dodaj ?debug=perf do URL
https://lykkreacji.pl?debug=perf
```

### Bundle Analysis
```bash
# Przyszły improvement - @next/bundle-analyzer
npm run build
npm run analyze
```

---

## 📞 Alerty

### Vercel
- Automatic performance alerts
- Email notifications
- Slack integration (opcjonalnie)

### Custom
```typescript
// src/lib/webVitals.ts
if (metric.value > threshold) {
  // Send alert to your service
  fetch('/api/alerts', {
    method: 'POST',
    body: JSON.stringify({ metric }),
  })
}
```

---

## 📚 Resources

- [Web Vitals](https://web.dev/vitals/)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

**Monitorowane przez LykKreacji 📊**
