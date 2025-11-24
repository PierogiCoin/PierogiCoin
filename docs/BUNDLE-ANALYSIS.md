# 📦 Bundle Analysis

Analiza wielkości bundle'a i optymalizacja wydajności.

## 📋 Spis treści

1. [Przegląd](#przegląd)
2. [Analiza Bundle](#analiza-bundle)
3. [Interpretacja Wyników](#interpretacja-wyników)
4. [Optymalizacje](#optymalizacje)
5. [Best Practices](#best-practices)
6. [Monitoring](#monitoring)

---

## 🎯 Przegląd

Bundle analyzer pomaga:
- ✅ Identyfikować duże dependencies
- ✅ Znajdować duplicate packages
- ✅ Optymalizować code splitting
- ✅ Redukować bundle size
- ✅ Poprawiać wydajność

**Cele:**
- First Load JS: < 200 kB
- Route: < 100 kB
- Shared chunks: Zoptymalizowane

---

## 🔍 Analiza Bundle

### 1. Visual Analysis (Interactive)

```bash
# Uruchom bundle analyzer
npm run analyze

# Otwiera się w przeglądarce:
# - Client bundle: http://localhost:8888
# - Server bundle: http://localhost:8889
```

**Co zobaczysz:**
- Interaktywny treemap
- Rozmiary każdego modułu
- Zależności między plikami
- Gzipped sizes

### 2. Server-Only Analysis

```bash
npm run analyze:server
```

### 3. Browser-Only Analysis

```bash
npm run analyze:browser
```

### 4. Text Report

```bash
# Po build:
npm run analyze:report
```

**Output:**
```
📦 Analyzing Next.js Bundle...

📄 Page Sizes:
────────────────────────────────────────────────────────
🟢 /                              0.12 MB
🟡 /demo-promo                    0.28 MB
🔴 /test-calc                     0.55 MB
────────────────────────────────────────────────────────
📊 Total Bundle Size: 2.45 MB

💡 Recommendations:
📦 gsap: Consider importing only needed modules
📦 three: Very large - use dynamic imports
```

---

## 📊 Interpretacja Wyników

### Bundle Size Indicators

**🟢 Good (< 250 kB)**
```
First Load JS: 167 kB
Route: 79.5 kB
```
✅ Excellent performance

**🟡 Needs Improvement (250-500 kB)**
```
First Load JS: 340 kB
Route: 280 kB
```
⚠️ Consider optimization

**🔴 Poor (> 500 kB)**
```
First Load JS: 650 kB
Route: 520 kB
```
❌ Critical - needs optimization

### Typical Next.js Output

```bash
Route (app)                    Size     First Load JS
┌ ○ /                          79.5 kB    167 kB
├ ○ /demo-promo                5.2 kB     172 kB
├ ○ /test-calc                 245 kB     412 kB
└ ○ /admin/promo-codes         12.3 kB    179 kB

+ First Load JS shared by all  87.5 kB
  ├ chunks/...                 42.1 kB
  └ other shared chunks        45.4 kB
```

**Legend:**
- `○` - Static (generated at build time)
- `●` - SSG (Static Site Generation)
- `λ` - Server (server-side renders at runtime)

---

## 🚀 Optymalizacje

### 1. Dynamic Imports

**Przed:**
```tsx
import HeavyComponent from './HeavyComponent'

export default function Page() {
  return <HeavyComponent />
}
```

**Po:**
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Client-only if needed
})

export default function Page() {
  return <HeavyComponent />
}
```

**Savings:** 200-500 kB per dynamic component

### 2. Import Only What You Need

**Przed:**
```tsx
import * as Icons from 'lucide-react'
// Imports ALL icons (~1MB)

<Icons.Home />
```

**Po:**
```tsx
import { Home } from 'lucide-react'
// Imports only Home icon (~2kB)

<Home />
```

**Savings:** ~998 kB

### 3. Code Splitting by Route

```tsx
// app/heavy-page/page.tsx
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/Chart'))
const Editor = dynamic(() => import('@/components/Editor'))

export default function HeavyPage() {
  return (
    <>
      <Chart />
      <Editor />
    </>
  )
}
```

### 4. Lazy Load Below the Fold

```tsx
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const BelowTheFold = dynamic(() => import('./BelowTheFold'))

export default function Page() {
  const [showBelow, setShowBelow] = useState(false)

  useEffect(() => {
    // Load after initial render
    setShowBelow(true)
  }, [])

  return (
    <>
      <AboveTheFold />
      {showBelow && <BelowTheFold />}
    </>
  )
}
```

### 5. Optimize Dependencies

**Check for duplicates:**
```bash
npm ls <package-name>

# Example
npm ls react
# Should show single version
```

**Remove unused dependencies:**
```bash
npm uninstall <unused-package>
```

### 6. Use Lighter Alternatives

**Heavy packages → Lighter alternatives:**
- `moment` (69kB) → `date-fns` (13kB) or `dayjs` (2kB)
- `lodash` (71kB) → `lodash-es` (tree-shakeable)
- `axios` (13kB) → native `fetch`
- `howler` (24kB) → Web Audio API

### 7. Enable Compression

```javascript
// next.config.mjs
const nextConfig = {
  compress: true, // Gzip compression
}
```

**In production (Vercel):**
- Automatic Brotli compression
- Edge caching
- Smart bundling

---

## 📈 Before & After Example

### Before Optimization

```bash
Route (app)                    Size     First Load JS
┌ ○ /                          245 kB   512 kB 🔴
├ ○ /calculator                380 kB   647 kB 🔴
└ ○ /portfolio                 420 kB   687 kB 🔴

Total size: 1.8 MB
```

### After Optimization

```bash
Route (app)                    Size     First Load JS
┌ ○ /                          79.5 kB  167 kB 🟢
├ ○ /calculator                125 kB   212 kB 🟡
└ ○ /portfolio                 98 kB    185 kB 🟢

Total size: 564 kB
```

**Improvement:** 68% smaller! ⚡

---

## 💡 Best Practices

### 1. Regular Analysis

```bash
# Before every major release
npm run build
npm run analyze
```

### 2. Set Size Budgets

```javascript
// next.config.mjs
const nextConfig = {
  // Performance budgets
  webpack: (config) => {
    config.performance = {
      maxAssetSize: 512000,    // 500 kB
      maxEntrypointSize: 512000,
    }
    return config
  },
}
```

### 3. Monitor in CI/CD

```yaml
# .github/workflows/bundle-analysis.yml
name: Bundle Analysis

on: [pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run analyze:report
```

### 4. Tree Shaking

```javascript
// Ensure ES modules
// package.json
{
  "type": "module",
  "sideEffects": false
}
```

### 5. Webpack Bundle Analysis

```bash
# See detailed webpack stats
ANALYZE=true npm run build

# Generated files:
# - .next/analyze/client.html
# - .next/analyze/server.html
```

---

## 🎯 Optimization Checklist

- [ ] Run `npm run analyze`
- [ ] Identify packages > 100 kB
- [ ] Use dynamic imports for large components
- [ ] Import only needed modules
- [ ] Check for duplicate dependencies
- [ ] Remove unused dependencies
- [ ] Use lighter alternatives
- [ ] Enable compression
- [ ] Set performance budgets
- [ ] Monitor in CI/CD

---

## 📊 Monitoring

### Build Output

```bash
npm run build
```

**Watch for:**
```
⚠ First Load JS shared by all  215 kB (target: < 200 kB)
```

### Lighthouse

```bash
# Check Performance score
lighthouse https://your-site.com
```

**Metrics to watch:**
- Performance score: 90+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms

### Vercel Analytics

**Bundle size tracked automatically:**
- Per-route sizes
- Historical data
- Regression detection

---

## 🔧 Troubleshooting

### Issue: Bundle too large

**Solution:**
1. Run `npm run analyze`
2. Find largest packages
3. Use dynamic imports
4. Check for duplicates

### Issue: Duplicate packages

```bash
npm ls <package>

# Shows multiple versions
```

**Solution:**
```bash
npm dedupe
# or
npm install <package>@latest
```

### Issue: Slow builds

**Solution:**
```javascript
// next.config.mjs
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      }
    }
    return config
  },
}
```

---

## 📚 Common Bundle Sizes

### Our Project (Target)

- **Main bundle**: ~87 kB
- **Route /**: ~79 kB
- **First Load JS**: ~167 kB ✅

### Large Dependencies

```
gsap: ~45 kB
@radix-ui/*: ~120 kB (all components)
three: ~600 kB (use dynamic import!)
howler: ~24 kB
react-dom: ~130 kB (framework)
```

### Optimization Impact

| Package | Before | After | Savings |
|---------|--------|-------|---------|
| Icons (all) | 1 MB | 2 kB | 99.8% |
| GSAP (full) | 200 kB | 45 kB | 77.5% |
| Three.js | 600 kB | Dynamic | Lazy |
| Moment | 69 kB | Day.js 2 kB | 97% |

---

## 🔗 Resources

- [Next.js Bundle Analysis](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [BundlePhobia](https://bundlephobia.com/) - Check package sizes
- [Web.dev - Reduce JS](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

**Optimized by LykKreacji 📦**
