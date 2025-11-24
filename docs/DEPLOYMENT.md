# 🚀 Deployment Guide

Complete guide for deploying LykKreacji application to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Database & Redis](#database--redis)
5. [Domain Configuration](#domain-configuration)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring](#monitoring)
8. [Rollback](#rollback)

---

## ✅ Prerequisites

### Required Services

- [ ] **Vercel Account** - [vercel.com/signup](https://vercel.com/signup)
- [ ] **GitHub Account** - Repository access
- [ ] **Domain** - lykkreacji.pl
- [ ] **Google Gemini API** - AI calculator
- [ ] **Email Service** - Resend or Gmail

### Optional Services

- [ ] **Upstash Redis** - Rate limiting (production)
- [ ] **Vercel Blob** - File storage
- [ ] **Google Analytics** - Analytics
- [ ] **Microsoft Clarity** - Session recordings

---

## 🔐 Environment Setup

### 1. Required Variables

```env
# AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Email (choose one)
RESEND_API_KEY=re_xxx
EMAIL_TO=czesc@lykkreacji.pl

# OR Gmail
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_TO=czesc@lykkreacji.pl
```

### 2. Optional Variables

```env
# Rate Limiting (Production)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxx

# Admin
ADMIN_SECRET=random_secret_here
```

### 3. Vercel Environment Variables

**Add in Vercel Dashboard:**

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your API key
   - **Environments**: Production, Preview, Development
3. Click "Save"

**Sensitive variables:**
- Mark as "Sensitive" ✅
- Encrypt automatically
- Not visible in logs

---

## 🚀 Vercel Deployment

### Method 1: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Link project
vercel link

# 4. Deploy to preview
vercel

# 5. Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

**One-time Setup:**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import Git Repository
3. Select your GitHub repo
4. Configure:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Add Environment Variables
6. Click "Deploy"

**Automatic Deployments:**

```
Git Push → main branch
  → Production deployment

Git Push → other branches
  → Preview deployment
```

### Method 3: Drag & Drop

```bash
# 1. Build locally
npm run build

# 2. Export
npm run export

# 3. Drag .next folder to vercel.com
```

---

## 📊 Database & Redis

### Upstash Redis (Rate Limiting)

**Setup:**

1. Go to [upstash.com](https://upstash.com/)
2. Create account (free tier available)
3. Create new Redis database
   - Name: `lykkreea-ratelimit`
   - Region: Europe (Frankfurt)
   - Type: Global
4. Copy REST URL and Token
5. Add to Vercel Environment Variables:
   ```
   UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxx
   ```

**Verify:**
```bash
curl https://xxx.upstash.io/ping \
  -H "Authorization: Bearer xxx"
# Response: "PONG"
```

### Vercel Blob (Optional)

```bash
# Link to Vercel Blob
vercel link

# Create blob store
vercel blob create

# Get token
vercel env pull .env.local
```

---

## 🌐 Domain Configuration

### Add Custom Domain

**Vercel Dashboard:**

1. Project Settings → Domains
2. Add Domain: `lykkreacji.pl`
3. Add Domain: `www.lykkreacji.pl`

**DNS Configuration:**

```
Type    Name    Value
─────────────────────────────────────
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**SSL Certificate:**
- Automatically provisioned by Vercel
- HTTPS enforced
- Auto-renewal

### Domain Verification

```bash
# Check DNS propagation
dig lykkreacji.pl

# Check SSL
curl -I https://lykkreacji.pl
```

---

## 🔄 CI/CD Pipeline

### Automatic Checks

```yaml
# .github/workflows/ci.yml (optional)
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

### Vercel Checks

Automatic on every deploy:

1. ✅ **Build** - Next.js build succeeds
2. ✅ **Lint** - ESLint checks pass
3. ✅ **Type Check** - TypeScript compilation
4. ⚠️ **Lighthouse** - Performance audit
5. ⚠️ **Bundle Size** - Size analysis

### Deployment Protection

```
Preview Deployments
  → All branches except main
  → Review before merge
  
Production Deployments
  → Only main branch
  → Requires passing checks
```

---

## 📈 Monitoring

### Vercel Analytics

**Enable:**
1. Project Settings → Analytics
2. Enable Web Analytics
3. Enable Speed Insights

**Metrics:**
- Page views
- Unique visitors
- Top pages
- Referrers
- Countries
- Devices

### Web Vitals

**Real User Monitoring:**
```
Tracked automatically:
- LCP (Largest Contentful Paint)
- INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)
```

**View in Vercel:**
- Analytics → Speed Insights
- Per-page breakdown
- Historical data
- P75 / P95 percentiles

### Error Tracking

**Console Errors:**
```tsx
// Automatically tracked in production
window.onerror = (msg, url, line, col, error) => {
  // Sent to analytics
}
```

**API Errors:**
```tsx
// Logged in Vercel Functions
console.error('API Error:', error)
// Visible in: Deployments → Function Logs
```

### Alerts

**Setup in Vercel:**
1. Project Settings → Notifications
2. Add Slack/Email integration
3. Configure alerts:
   - Build failures
   - Error rate spikes
   - High response times

---

## 🔙 Rollback

### Instant Rollback

**Vercel Dashboard:**
1. Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Confirm

**CLI:**
```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

### Git Revert

```bash
# Revert last commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

### Emergency Rollback

```bash
# Force rollback to specific commit
git reset --hard <commit-hash>
git push --force origin main

# Vercel will deploy previous state
```

---

## 🧪 Testing Deployment

### Smoke Tests

```bash
# 1. Check homepage
curl -I https://lykkreacji.pl
# Should return 200 OK

# 2. Check API
curl -X POST https://lykkreacji.pl/api/health
# Should return healthy status

# 3. Check assets
curl -I https://lykkreacji.pl/_next/static/...
# Should return 200 OK

# 4. Check redirects
curl -I https://www.lykkreacji.pl
# Should redirect to https://lykkreacji.pl
```

### Performance Tests

```bash
# Lighthouse
lighthouse https://lykkreacji.pl

# Expected scores:
# Performance: 95+
# Accessibility: 95+
# Best Practices: 100
# SEO: 100
```

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
```bash
# 1. Local build
npm run build

# 2. Check Node version
node -v
# Should be 18.x or 20.x

# 3. Check logs
vercel logs
```

**Common Issues:**
- Missing environment variables
- TypeScript errors
- Dependency conflicts
- Timeout (increase in vercel.json)

### Environment Variables Not Working

```bash
# 1. Verify in Vercel Dashboard
vercel env ls

# 2. Pull latest
vercel env pull

# 3. Re-deploy
vercel --prod
```

### Rate Limit Not Working

**Check Redis:**
```bash
# Test connection
curl https://xxx.upstash.io/ping \
  -H "Authorization: Bearer xxx"

# Should return: "PONG"
```

**Fallback:**
- Uses in-memory if Redis unavailable
- Check console for warnings

### Domain Issues

```bash
# 1. Check DNS propagation
dig lykkreacji.pl

# 2. Check SSL
openssl s_client -connect lykkreacji.pl:443

# 3. Clear DNS cache
# macOS: sudo dscacheutil -flushcache
# Windows: ipconfig /flushdns
```

---

## 📋 Pre-deployment Checklist

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] No TypeScript errors (`npm run build`)
- [ ] Bundle size acceptable (`npm run analyze`)

### Environment
- [ ] All required env vars set
- [ ] API keys valid
- [ ] Email service configured
- [ ] Redis connected (if using)

### Features
- [ ] Forms working
- [ ] Calculator working
- [ ] Analytics tracking
- [ ] Error pages styled
- [ ] Mobile responsive

### SEO
- [ ] Meta tags correct
- [ ] Sitemap generated
- [ ] robots.txt present
- [ ] Structured data valid

### Performance
- [ ] Images optimized
- [ ] Fonts loaded correctly
- [ ] No console errors
- [ ] Web Vitals good

### Security
- [ ] HTTPS enforced
- [ ] Security headers set
- [ ] Rate limiting active
- [ ] Input validation working

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Deployment Docs**: https://vercel.com/docs/deployments
- **Environment Variables**: https://vercel.com/docs/environment-variables
- **Custom Domains**: https://vercel.com/docs/custom-domains
- **Edge Network**: https://vercel.com/docs/edge-network

---

## 📞 Support

**Vercel Support:**
- Documentation: vercel.com/docs
- Discord: vercel.com/discord
- Email: support@vercel.com

**Project Support:**
- Email: czesc@lykkreacji.pl
- Issues: GitHub Issues

---

**Deployed with ❤️ by LykKreacji 🚀**
