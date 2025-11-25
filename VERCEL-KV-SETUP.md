# 🚀 Vercel KV Setup Guide

## ✅ Co zostało dodane:

### 📦 Pliki:
- `src/lib/promoKV.ts` - KV operations
- `src/app/api/promo-codes/route.ts` - CRUD API
- `src/app/api/promo-codes/validate/route.ts` - Validation API
- `src/app/api/promo-codes/migrate/route.ts` - Migration tool

### 📚 Funkcje:
- ✅ Add/Delete/Toggle promo codes
- ✅ List all codes
- ✅ Validate codes
- ✅ Auto-expiry (TTL)
- ✅ Usage tracking
- ✅ Statistics

---

## 🔧 Setup (3 kroki):

### KROK 1: Create Vercel KV Database

```
1. Vercel Dashboard
2. Storage → Create Database
3. Select "KV" (Redis)
4. Name: promo-codes-db
5. Click "Create"
```

### KROK 2: Copy Environment Variables

```
1. After creation, you'll see:
   - KV_REST_API_URL
   - KV_REST_API_TOKEN

2. Copy these values

3. Add to Vercel:
   Project Settings → Environment Variables → Add
   
4. Add locally to .env.local:
   KV_REST_API_URL="https://your-kv-url.kv.vercel-storage.com"
   KV_REST_API_TOKEN="your_token_here"
```

### KROK 3: Migrate Existing Codes

```bash
# After deploy, visit:
https://your-domain.com/api/promo-codes/migrate

# Or locally:
npm run dev
# Then open: http://localhost:3000/api/promo-codes/migrate

# Response:
{
  "success": true,
  "message": "Migrated 6 promo codes to KV",
  "count": 6
}
```

---

## 📋 API Endpoints:

### GET /api/promo-codes
List all promo codes + stats

```typescript
const res = await fetch('/api/promo-codes');
const { codes, stats } = await res.json();
```

### POST /api/promo-codes
Add new promo code

```typescript
await fetch('/api/promo-codes', {
  method: 'POST',
  body: JSON.stringify({
    code: 'SUMMER2025',
    discount: 25,
    discountType: 'percentage',
    description: 'Letnia promocja',
    expiresAt: '2025-08-31',
    isActive: true
  })
});
```

### PATCH /api/promo-codes?code=XXX
Toggle active state

```typescript
await fetch('/api/promo-codes?code=SUMMER2025', {
  method: 'PATCH'
});
```

### DELETE /api/promo-codes?code=XXX
Delete promo code

```typescript
await fetch('/api/promo-codes?code=SUMMER2025', {
  method: 'DELETE'
});
```

### POST /api/promo-codes/validate
Validate and use code

```typescript
const res = await fetch('/api/promo-codes/validate', {
  method: 'POST',
  body: JSON.stringify({
    code: 'SUMMER2025',
    amount: 5000 // Amount in PLN
  })
});

const result = await res.json();
// {
//   valid: true,
//   discount: 25,
//   discountType: 'percentage',
//   discountAmount: 1250,
//   finalAmount: 3750,
//   message: 'Kod aktywowany! Zniżka 25%'
// }
```

---

## 🎯 Użycie w Admin Panel:

### Update PromoCodeManager.tsx:

```typescript
// Load codes from KV
async function loadCodes() {
  const res = await fetch('/api/promo-codes');
  const { codes, stats } = await res.json();
  setCodes(codes);
  setStats(stats);
}

// Add code
async function handleAdd(newCode) {
  await fetch('/api/promo-codes', {
    method: 'POST',
    body: JSON.stringify(newCode)
  });
  loadCodes();
}

// Toggle active
async function handleToggle(code) {
  await fetch(`/api/promo-codes?code=${code}`, {
    method: 'PATCH'
  });
  loadCodes();
}

// Delete
async function handleDelete(code) {
  await fetch(`/api/promo-codes?code=${code}`, {
    method: 'DELETE'
  });
  loadCodes();
}
```

---

## 🎁 Features:

### Auto-Expiry:
Codes automatically expire based on `expiresAt` date (TTL in Redis)

### Usage Tracking:
Every validation increments `usedCount`

### Statistics:
- Total codes
- Total usages
- Per-code usage

### Validation:
- Active check
- Expiry check
- Usage limit check
- Min purchase amount

---

## 💰 Cost:

**FREE tier:**
- 256 MB storage
- 30,000 commands/month
- Good for 10,000+ promo codes

**Pro tier:** $20/month
- 1 GB storage
- 1M commands/month

---

## 🔒 Security (Optional):

Add NextAuth to protect admin endpoints:

```bash
npm install next-auth
```

Then add authentication middleware.

---

## ✅ Verification:

After setup, test:

```bash
# 1. Migrate codes
curl http://localhost:3000/api/promo-codes/migrate

# 2. List codes
curl http://localhost:3000/api/promo-codes

# 3. Validate code
curl -X POST http://localhost:3000/api/promo-codes/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"CHRISTMAS2024","amount":5000}'
```

---

## 🎉 Done!

Your promo codes now use Vercel KV!

Benefits:
- ✅ Instant updates (no deploy)
- ✅ Real-time stats
- ✅ Auto-expiry
- ✅ Scalable
- ✅ Fast (Redis)

---

## 📞 Support:

Vercel KV Docs: https://vercel.com/docs/storage/vercel-kv
