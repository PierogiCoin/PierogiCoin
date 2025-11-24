# 🚀 Quick Start: Google Services (5 minutes)

Fast setup guide for Google Search Console, Analytics, and Business Profile.

---

## ⚡ Step 1: Google Search Console (2 min)

### Add Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **"Add property"** → **"Domain"**
3. Enter: `lykkreacji.pl`
4. Copy the TXT record

### Verify with DNS

Go to your domain registrar and add:
```
Type: TXT
Name: @
Value: google-site-verification=abc123...
TTL: 3600
```

Wait 5 minutes, then click **"Verify"**

### Submit Sitemap

1. Go to **Sitemaps** in left menu
2. Enter: `sitemap.xml`
3. Click **"Submit"**

✅ **Done!** You'll start seeing data in 24-48 hours.

---

## 📊 Step 2: Google Analytics 4 (2 min)

### Create Property

1. Go to [analytics.google.com](https://analytics.google.com/)
2. **Create Account** → Name: `LykKreacji`
3. **Create Property** → Name: `LykKreacji Website`
4. Choose **Web** → URL: `https://lykkreacji.pl`
5. Copy your **Measurement ID**: `G-XXXXXXXXXX`

### Add to Website

**Already integrated!** ✅

Just add to Vercel:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add new variable:
   ```
   Key: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   Environments: Production, Preview, Development
   ```
3. Click **"Save"**
4. Redeploy: `vercel --prod`

### Verify

1. Visit your website
2. Open GA4 → **Reports** → **Realtime**
3. You should see yourself! 🎉

✅ **Done!** Analytics is tracking.

---

## 🏢 Step 3: Google Business Profile (1 min setup, 3-7 days verification)

### Create Profile

1. Go to [business.google.com](https://business.google.com/)
2. Click **"Manage now"**
3. Enter business name: `LykKreacji`
4. Choose category: **"Website Designer"**

### Add Details

```
Business name: LykKreacji
Category: Website Designer
Location: Service area business (hide address)
Service areas: Wrocław, Jelenia Góra, Wałbrzych, Legnica

Phone: +48 790 629 497
Website: https://lykkreacji.pl
Email: czesc@lykkreacji.pl

Description:
Profesjonalne tworzenie stron internetowych we Wrocławiu. 
Specjalizacja: Next.js, React, AI (ChatGPT, Gemini), 
sklepy e-commerce, Progressive Web Apps.

🚀 Enterprise quality, startup prices
📱 Full responsive design
⚡ Szybkie realizacje
```

### Verification

Choose method:
- **Phone** (SMS/Call) - fastest
- **Email** - if available
- **Postcard** - 5-7 days

✅ **Done!** Wait for verification.

---

## 🎯 Bonus: Microsoft Clarity (1 min)

### Setup

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com/)
2. Click **"Sign up"** (use Microsoft/GitHub/Google account)
3. **Add new project**:
   ```
   Name: LykKreacji
   Website: https://lykkreacji.pl
   ```
4. Copy your **Project ID**: `abc123def`

### Add to Vercel

1. Vercel Dashboard → Environment Variables
2. Add:
   ```
   Key: NEXT_PUBLIC_CLARITY_ID
   Value: abc123def
   ```
3. Redeploy

✅ **Done!** Session recordings start immediately.

---

## ✅ Checklist

After setup, you should have:

- [ ] Google Search Console property added ✅
- [ ] Domain verified ✅
- [ ] Sitemap submitted ✅
- [ ] Google Analytics property created ✅
- [ ] GA4 tracking code added ✅
- [ ] Google Business Profile created ✅
- [ ] Verification requested ✅
- [ ] Microsoft Clarity installed ✅

---

## 📊 What to Expect

### First 24 Hours
- ✅ Clarity: Immediate data
- ✅ GA4: Real-time tracking
- ⏳ Search Console: Waiting for first crawl

### First Week
- ✅ Search Console: First data appears
- ✅ GA4: Full reports available
- ✅ Clarity: Heatmaps available
- ⏳ Business Profile: Verification pending

### First Month
- ✅ Search Console: Full historical data
- ✅ Search results: Appearing in Google
- ✅ Business Profile: Live on Google Maps
- ✅ Analytics: Trends visible

---

## 🎯 Next Steps

### Week 1: Monitor
```bash
# Daily checks
- GA4 Realtime report
- Clarity recordings
- Search Console errors

# Action: Fix any errors
```

### Week 2: Optimize
```bash
# Review data
- Top pages (GA4)
- User behavior (Clarity)
- Search queries (Search Console)

# Action: Improve top 3 pages
```

### Week 3: Grow
```bash
# Expand
- Create blog content
- Build backlinks
- Get reviews (Business Profile)

# Action: Weekly content plan
```

---

## 🆘 Need Help?

### Google Search Console
- Not verifying? Check DNS propagation (24h)
- No data? Wait 48 hours after verification

### Google Analytics
- Not tracking? Check browser console for errors
- No realtime data? Disable ad blockers

### Google Business Profile
- Verification pending? Wait 5-7 days
- Need faster? Choose phone verification

### Microsoft Clarity
- No sessions? Check environment variable
- Sessions but no recordings? Check privacy settings

---

## 📚 Full Documentation

- [GOOGLE-SETUP.md](./GOOGLE-SETUP.md) - Detailed Google guide
- [MICROSOFT-CLARITY.md](./MICROSOFT-CLARITY.md) - Clarity guide
- [SEO-GUIDE.md](./SEO-GUIDE.md) - Complete SEO guide

---

**Total setup time: ~5 minutes** ⚡

**Results appear: 24-48 hours** 📊

**Full benefits: 2-4 weeks** 🚀

---

**Quick start by LykKreacji 🎯**
