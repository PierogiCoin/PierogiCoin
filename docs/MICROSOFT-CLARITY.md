# 📊 Microsoft Clarity Setup Guide

Complete guide for setting up Microsoft Clarity session recordings and heatmaps.

## 🎯 What is Microsoft Clarity?

Microsoft Clarity is a **FREE** user behavior analytics tool that provides:
- 📹 **Session recordings** - Watch how users interact with your site
- 🔥 **Heatmaps** - See where users click, scroll, and move
- 📊 **Insights** - Understand user frustration and dead clicks
- 🚀 **Performance** - Zero impact on site speed
- 🔒 **Privacy** - GDPR compliant

**Best part:** 100% FREE, unlimited sessions!

---

## 🚀 Setup (5 minutes)

### Step 1: Create Account

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Click **"Sign up"** or **"Get started free"**
3. Sign in with:
   - Microsoft account
   - OR GitHub account
   - OR Google account

### Step 2: Create Project

1. Click **"Add new project"**
2. Fill in details:
   ```
   Name: LykKreacji
   Website URL: https://lykkreacji.pl
   Category: Business Services / Technology
   ```
3. Click **"Add new project"**

### Step 3: Get Tracking Code

You'll see a tracking code like:

```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

Copy your **Project ID** (e.g., `abc123def`)

### Step 4: Add to Website

**Already done!** ✅

The code is already integrated in `src/app/layout.tsx`

Just add your Project ID to `.env.local`:

```env
NEXT_PUBLIC_CLARITY_ID=abc123def
```

### Step 5: Deploy

```bash
# Deploy to Vercel
vercel --prod

# Or commit and push (auto-deploy)
git add .env.local  # DON'T do this! Never commit .env files
git push
```

**Important:** Add to Vercel Environment Variables instead:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_CLARITY_ID` = `abc123def`
3. Redeploy

### Step 6: Verify

1. Visit your website: `https://lykkreacji.pl`
2. In Clarity dashboard, go to **Recordings**
3. Wait 1-2 minutes
4. You should see your session appear!

---

## 📹 Features

### 1. Session Recordings

**What you see:**
- Mouse movements
- Clicks
- Scrolls
- Form interactions
- Page navigation
- Viewport size
- Device type

**How to use:**
1. Go to **Recordings**
2. Filter by:
   - Date
   - Device (Desktop/Mobile/Tablet)
   - Country
   - Page URL
   - Custom tags
3. Click on any session to watch

**Pro tips:**
- Watch sessions with rage clicks (frustration)
- Check mobile sessions for usability issues
- Review sessions that ended quickly (bounce)

### 2. Heatmaps

**Types:**
- **Click heatmap** - Where users click
- **Scroll heatmap** - How far users scroll
- **Area heatmap** - Attention zones

**How to use:**
1. Go to **Heatmaps**
2. Select page URL
3. Choose heatmap type
4. Analyze patterns

**Look for:**
- Clicks on non-clickable elements → Add links/buttons
- Low scroll depth → Move important content up
- Ignored CTAs → Redesign or reposition

### 3. Insights Dashboard

**Metrics:**
- Sessions count
- Average session duration
- Scroll depth
- Dead clicks (clicks that do nothing)
- Rage clicks (repeated frustrated clicks)
- Quick backs (immediate bounce)
- JavaScript errors

**Filters:**
- Device type
- Country
- Page URL
- Custom segments

---

## 🎯 What to Track

### Key Pages

**Homepage:**
- Do users scroll to see services?
- Do they click on CTAs?
- Where do they leave?

**Calculator:**
- Do users complete the form?
- Which fields cause confusion?
- Do they see the estimated price?

**Contact:**
- Do users fill the form?
- Which field has most errors?
- Phone vs email preference?

**Portfolio:**
- Which projects get most attention?
- Do users click project images?
- Scroll depth?

---

## 📊 Useful Filters

### Find Problem Areas

**High bounce rate pages:**
```
Filter: Session duration < 10s
→ Fix: Improve page loading or content
```

**Mobile issues:**
```
Filter: Device = Mobile + Rage clicks
→ Fix: Mobile usability issues
```

**Form abandonment:**
```
Filter: Page = /contact + Did not convert
→ Fix: Simplify form or add help text
```

**Dead clicks:**
```
Filter: Dead clicks > 0
→ Fix: Make elements clickable or remove hover states
```

---

## 🔗 Integration with GA4

Clarity can send data to Google Analytics:

1. In Clarity, go to **Settings** → **Integrations**
2. Click **"Connect"** next to Google Analytics
3. Select your GA4 property
4. Click **"Connect"**

**Benefits:**
- See Clarity sessions in GA4 reports
- Create audiences based on Clarity insights
- Combine quantitative (GA4) + qualitative (Clarity) data

---

## 🔒 Privacy & GDPR

### Automatic Privacy Features

Clarity automatically:
- ✅ Masks sensitive data (passwords, credit cards)
- ✅ Removes personal information (emails, names)
- ✅ Complies with GDPR
- ✅ Respects DNT (Do Not Track)

### Manual Privacy Controls

**Mask specific elements:**

```html
<!-- Add class to sensitive elements -->
<div class="clarity-mask">
  User's email: sensitive@email.com
</div>
```

**Exclude pages:**

In Clarity dashboard → Settings → Advanced:
```
Exclude URLs: /admin/*, /dashboard/*
```

---

## 🎓 Best Practices

### 1. Review Weekly

**Monday morning routine:**
- Check last week's sessions
- Look for frustration signals (rage clicks, quick backs)
- Identify top 3 issues
- Create action items

### 2. Segment Your Data

Create segments for:
- **New visitors** (first-time users)
- **Returning visitors** (engaged users)
- **Mobile users** (different behavior)
- **Converters** (completed contact form)
- **Bounced users** (left quickly)

### 3. Watch Representative Sessions

Don't just watch outliers:
- 5 typical sessions
- 3 converting sessions
- 3 bouncing sessions

### 4. Combine with Other Data

**Clarity shows "what happened"**
- User clicked button X

**GA4 shows "how many"**
- 1,234 users clicked button X

**Together:** Full picture!

---

## 📈 Success Metrics

### Track Improvements

**Before Clarity:**
```
Contact form completion: 5%
Avg session duration: 1:23
Bounce rate: 68%
```

**After fixes:**
```
Contact form completion: 12% (+140%)
Avg session duration: 2:45 (+99%)
Bounce rate: 52% (-24%)
```

---

## 🆘 Troubleshooting

### No data showing?

1. **Check tracking code:**
   ```bash
   # View page source
   curl https://lykkreacji.pl | grep clarity
   ```

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for Clarity requests
   - Check for JavaScript errors

3. **Verify environment variable:**
   ```bash
   # Check if set
   echo $NEXT_PUBLIC_CLARITY_ID
   ```

4. **Wait longer:**
   - Initial data: 2-5 minutes
   - First session: Up to 10 minutes

### Sessions not recording?

- **Ad blockers:** Disable for testing
- **Privacy extensions:** May block tracking
- **Incognito mode:** Limited tracking
- **VPN:** May affect geo-data

### Heatmaps empty?

- Need minimum 100 sessions for reliable heatmaps
- Check date range filter
- Verify page URL filter

---

## 📊 Dashboard Widgets

### Key Metrics to Monitor

**Performance:**
```
✅ Average session duration: > 2 minutes (good)
✅ Scroll depth: > 50% (users see content)
✅ Pages per session: > 2 (engaged)
```

**Issues:**
```
⚠️ Rage clicks: < 5% (frustration)
⚠️ Dead clicks: < 10% (confusion)
⚠️ Quick backs: < 20% (bounce)
⚠️ JavaScript errors: < 1% (bugs)
```

**Engagement:**
```
📈 Sessions: Growing week-over-week
📈 Return rate: > 20% (loyalty)
📈 Conversion rate: Improving
```

---

## 🔗 Resources

- [Clarity Dashboard](https://clarity.microsoft.com/)
- [Documentation](https://docs.microsoft.com/en-us/clarity/)
- [Setup Guide](https://docs.microsoft.com/en-us/clarity/setup-and-installation/)
- [Privacy Guide](https://docs.microsoft.com/en-us/clarity/privacy-policy)

---

## 🎯 Quick Wins

**Week 1:**
- [ ] Install Clarity ✅
- [ ] Watch first 10 sessions
- [ ] Find top 3 issues
- [ ] Create action plan

**Week 2:**
- [ ] Implement fixes
- [ ] Set up custom tags
- [ ] Create segments
- [ ] Share insights with team

**Week 3:**
- [ ] Compare before/after
- [ ] Watch mobile sessions
- [ ] Review heatmaps
- [ ] Document learnings

**Week 4:**
- [ ] Weekly review routine
- [ ] Set up alerts
- [ ] Integrate with GA4
- [ ] Optimize further

---

## 💡 Pro Tips

### 1. Use Custom Tags

Tag sessions for better filtering:

```typescript
// In your code
declare global {
  interface Window {
    clarity?: (action: string, ...args: any[]) => void;
  }
}

// Tag converted users
if (typeof window !== 'undefined' && window.clarity) {
  window.clarity('set', 'converted', 'true');
}

// Tag premium users
window.clarity?.('set', 'plan', 'premium');
```

### 2. Track Custom Events

```typescript
// Track calculator usage
window.clarity?.('event', 'calculator_used');

// Track form starts
window.clarity?.('event', 'contact_form_started');
```

### 3. Create Dashboards

**Dashboard for developers:**
- JavaScript errors
- Console errors
- Rage clicks
- Dead clicks

**Dashboard for designers:**
- Heatmaps
- Scroll depth
- Mobile sessions
- Device comparison

**Dashboard for marketing:**
- Traffic sources
- Campaign performance
- Conversion funnels
- Exit pages

---

**Set up by LykKreacji 📊**
