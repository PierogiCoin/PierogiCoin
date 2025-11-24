# 🚦 API Rate Limiting

Kompleksowy system ochrony API przed spamem i atakami DDoS.

## 📋 Spis treści

1. [Przegląd](#przegląd)
2. [Konfiguracja](#konfiguracja)
3. [Limity Endpointów](#limity-endpointów)
4. [Whitelist/Blacklist](#whitelistblacklist)
5. [Monitoring](#monitoring)
6. [Development vs Production](#development-vs-production)
7. [Testing](#testing)

---

## 🎯 Przegląd

System rate limiting zabezpiecza wszystkie endpointy `/api/*` przed:
- ✅ Spam requests
- ✅ DDoS attacks
- ✅ Brute force attempts
- ✅ API abuse

**Funkcje:**
- IP-based throttling
- Custom limits per endpoint
- Redis/In-memory cache
- Whitelist/Blacklist IP
- Real-time monitoring
- Automatic blocking
- 429 error responses

---

## ⚙️ Konfiguracja

### 1. Environment Variables

```env
# .env.local

# PRODUCTION: Upstash Redis (recommended)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here

# IP Whitelist (comma-separated)
RATE_LIMIT_WHITELIST=192.168.1.1,10.0.0.1

# IP Blacklist (comma-separated)
RATE_LIMIT_BLACKLIST=123.456.789.0

# Admin secret (for stats endpoint)
ADMIN_SECRET=your_random_secret_here
```

### 2. Upstash Redis Setup (Production)

**Free Plan:**
1. Zarejestruj się na [upstash.com](https://upstash.com/)
2. Utwórz nową bazę Redis
3. Skopiuj REST URL i Token
4. Dodaj do `.env.local`

**Bez Redis:**
- Używa in-memory cache (development)
- Działa lokalnie
- Nie współdzielone między instancjami

---

## 📊 Limity Endpointów

### Domyślne Limity

```typescript
// src/lib/rateLimit.ts
export const rateLimitConfigs = {
  default: { tokens: 10, window: 10_000 },     // 10 req/10s
  contact: { tokens: 3, window: 60_000 },      // 3 req/min
  generateOffer: { tokens: 5, window: 60_000 }, // 5 req/min
  liveAnalyze: { tokens: 10, window: 60_000 }, // 10 req/min
  strict: { tokens: 5, window: 60_000 },       // 5 req/min
  relaxed: { tokens: 20, window: 10_000 },     // 20 req/10s
}
```

### Custom Limits

```typescript
// src/middleware.ts
if (pathname.includes('/api/your-endpoint')) {
  config = 'strict' // lub custom config
}
```

### Dodanie Nowego Limitu

```typescript
// 1. Dodaj w rateLimitConfigs
export const rateLimitConfigs = {
  // ...
  myEndpoint: { tokens: 100, window: 60_000 }, // 100 req/min
}

// 2. Użyj w middleware
if (pathname.includes('/api/my-endpoint')) {
  config = 'myEndpoint'
}
```

---

## 🎯 Whitelist/Blacklist

### Whitelist (Bypass Rate Limiting)

**Przypadki użycia:**
- Twoje serwery
- Zaufane API integrations
- Internal tools
- Monitoring services

**Konfiguracja:**
```env
RATE_LIMIT_WHITELIST=192.168.1.1,10.0.0.1,203.0.113.5
```

### Blacklist (Block Completely)

**Przypadki użycia:**
- Znane złośliwe IP
- Spam bots
- Attackers

**Konfiguracja:**
```env
RATE_LIMIT_BLACKLIST=123.456.789.0,98.765.432.1
```

**Odpowiedź:**
```json
{
  "error": "Forbidden",
  "message": "Access denied"
}
```
Status: `403 Forbidden`

---

## 📈 Monitoring

### 1. Console Logs (Development)

```bash
✅ Rate Limit: 192.168.1.1 -> /api/contact (2/3)
🚫 Rate Limit: 203.0.113.5 -> /api/contact (0/3)
🚨 Excessive rate limit violations from IP: 203.0.113.5
```

### 2. Stats Endpoint

**Endpoint:**
```
GET /api/rate-limit-stats?secret=YOUR_ADMIN_SECRET&minutes=5
```

**Response:**
```json
{
  "stats": {
    "total": 150,
    "blocked": 23,
    "blockRate": 15.33,
    "topIPs": [
      ["192.168.1.1", 45],
      ["203.0.113.5", 38]
    ],
    "endpointCounts": {
      "/api/contact": 78,
      "/api/generateOffer": 72
    },
    "timeRange": 5
  },
  "recentAttempts": [...]
}
```

### 3. Google Analytics

Automatycznie śledzone eventy:
```typescript
gtag('event', 'rate_limit_check', {
  blocked: 1,
  endpoint: '/api/contact'
})
```

### 4. Alert System

Po 10 violations od tego samego IP:
```typescript
// Wysyłane do NEXT_PUBLIC_ERROR_ENDPOINT
{
  type: 'security',
  message: 'Excessive rate limit violations',
  ip: '203.0.113.5',
  attempts: 11,
  endpoint: '/api/contact',
  timestamp: '2024-01-20T10:30:00.000Z'
}
```

---

## 🔄 Development vs Production

### Development (bez Redis)

```bash
npm run dev
```

**Funkcje:**
- ✅ In-memory cache
- ✅ Console warnings
- ✅ Podstawowe limity
- ❌ Nie współdzielone między procesami
- ❌ Reset przy restarcie

**Warning:**
```
⚠️ Using in-memory rate limiter (development mode)
```

### Production (z Redis)

**Konfiguracja:**
```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**Funkcje:**
- ✅ Persistent cache
- ✅ Współdzielone między instancjami
- ✅ Sliding window algorithm
- ✅ Analytics
- ✅ High performance

---

## 🧪 Testing

### 1. Manual Testing

```bash
# Test rate limit
curl http://localhost:3000/api/contact \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'

# Repeat 4 times to hit limit (3 req/min)
```

**Expected:**
```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "limit": 3,
  "remaining": 0,
  "reset": "2024-01-20T10:31:00.000Z"
}
```

**Headers:**
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705748460000
Retry-After: 45
```

### 2. Load Testing

```bash
# Install hey (HTTP load generator)
brew install hey

# Test with 100 requests
hey -n 100 -c 10 http://localhost:3000/api/contact
```

### 3. Unit Tests

```typescript
// __tests__/lib/rateLimit.test.ts
import { checkRateLimit } from '@/lib/rateLimit'

test('rate limit blocks after threshold', async () => {
  const ip = '192.168.1.1'
  
  // First 3 should succeed
  for (let i = 0; i < 3; i++) {
    const result = await checkRateLimit(ip, 'contact')
    expect(result.success).toBe(true)
  }
  
  // 4th should fail
  const result = await checkRateLimit(ip, 'contact')
  expect(result.success).toBe(false)
})
```

---

## 🛡️ Security Best Practices

### 1. Custom Error Messages

```typescript
// ❌ Bad - reveals info
return new Response('Rate limit: 3/min', { status: 429 })

// ✅ Good - generic message
return new Response('Too many requests', { status: 429 })
```

### 2. Vary Limits by Endpoint

```typescript
// Strict for sensitive endpoints
contact: { tokens: 3, window: 60_000 }

// Relaxed for public data
getProjects: { tokens: 50, window: 60_000 }
```

### 3. Monitor Suspicious Activity

```typescript
// Auto-track excessive violations
if (attempts > 10) {
  console.error(`🚨 Suspicious IP: ${ip}`)
  // Consider auto-blacklisting
}
```

### 4. Fail Open

```typescript
try {
  const result = await checkRateLimit(ip, config)
} catch (error) {
  // Allow request if rate limit check fails
  return NextResponse.next()
}
```

---

## 🔧 Advanced Configuration

### Custom Rate Limit Per User

```typescript
// Instead of IP, use user ID
const userId = await getUserId(request)
const identifier = userId || ip

const result = await checkRateLimit(identifier, 'default')
```

### Dynamic Limits

```typescript
// Adjust based on user tier
const config = user.isPro ? 'relaxed' : 'strict'
const result = await checkRateLimit(user.id, config)
```

### Multiple Limits

```typescript
// Check both IP and user limits
const ipResult = await checkRateLimit(ip, 'default')
const userResult = await checkRateLimit(user.id, 'contact')

if (!ipResult.success || !userResult.success) {
  return createRateLimitResponse(...)
}
```

---

## 📚 Troubleshooting

### Issue: "Too Many Requests" w development

**Rozwiązanie:**
```bash
# Restart dev server (clears in-memory cache)
npm run dev
```

### Issue: Whitelist nie działa

**Sprawdź:**
```bash
# .env.local
RATE_LIMIT_WHITELIST=192.168.1.1  # No spaces!
```

### Issue: Redis connection failed

**Fallback:**
```typescript
// Automatically falls back to in-memory
console.warn('⚠️ Using in-memory rate limiter')
```

---

## 📊 Response Headers

Każda odpowiedź zawiera:

```
X-RateLimit-Limit: 10       # Max requests
X-RateLimit-Remaining: 7    # Remaining requests
X-RateLimit-Reset: 1705748460000  # Reset timestamp
Retry-After: 45             # Seconds to wait (if blocked)
```

---

## 🚀 Performance

**Upstash Redis:**
- < 10ms latency
- Global edge network
- Auto-scaling
- 99.99% uptime

**In-Memory:**
- < 1ms latency
- Zero external deps
- Limited to single instance

---

## 📚 Resources

- [Upstash Documentation](https://upstash.com/docs/redis/overall/getstarted)
- [Rate Limiting Algorithms](https://en.wikipedia.org/wiki/Rate_limiting)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

**Zabezpieczone przez LykKreacji 🚦**
