# 🔐 Environment Variables

Type-safe environment variable validation with Zod.

## 📋 Spis treści

1. [Przegląd](#przegląd)
2. [Required Variables](#required-variables)
3. [Optional Variables](#optional-variables)
4. [Validation](#validation)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Przegląd

System walidacji zapewnia:
- ✅ Type-safe environment variables
- ✅ Runtime validation
- ✅ Clear error messages
- ✅ Auto-complete w IDE
- ✅ Fail-fast on missing vars
- ✅ Development warnings

**Benefits:**
- No typos in env var names
- Catch missing variables early
- Better developer experience
- Production-ready validation

---

## 📝 Required Variables

### AI Configuration

```env
# REQUIRED for calculator
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy to `.env.local`

### Email Configuration

**At least ONE required:**

**Option 1: Resend (Recommended)**
```env
RESEND_API_KEY=re_your_resend_api_key_here
EMAIL_TO=your_notification_email@example.com
```

**Option 2: Gmail**
```env
EMAIL_SERVER_USER=your_gmail@gmail.com
EMAIL_SERVER_PASSWORD=your_16_char_app_password
EMAIL_TO=your_notification_email@gmail.com
```

---

## ⚙️ Optional Variables

### EmailJS (Contact Forms)

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Analytics

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

### Rate Limiting

```env
# Production (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here

# IP Lists
RATE_LIMIT_WHITELIST=192.168.1.1,10.0.0.1
RATE_LIMIT_BLACKLIST=123.456.789.0
```

### Admin & Security

```env
ADMIN_SECRET=your_random_secret_here
NEXT_PUBLIC_ERROR_ENDPOINT=https://api.example.com/errors
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://api.example.com/analytics
```

### Vercel Blob Storage

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

---

## ✅ Validation

### Automatic Validation

Environment variables are validated automatically on:
- ✅ App start (development)
- ✅ Build time (production)
- ✅ Runtime (server-side)

### Validation Schema

```typescript
// src/lib/env.ts
import { z } from 'zod'

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  GEMINI_API_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_SERVER_USER: z.string().email().optional(),
  // ... more fields
})
```

### Custom Validation

```typescript
// Example: At least one email service required
function validateEmailConfig(data) {
  const hasResend = !!data.RESEND_API_KEY
  const hasGmail = !!(data.EMAIL_SERVER_USER && data.EMAIL_SERVER_PASSWORD)

  if (!hasResend && !hasGmail) {
    throw new Error('Either RESEND_API_KEY or Gmail must be set')
  }
}
```

---

## 🚀 Usage

### Import Type-Safe Env

```typescript
// ✅ Good - Type-safe
import { env } from '@/lib/env'

const apiKey = env.GEMINI_API_KEY // string | undefined
const nodeEnv = env.NODE_ENV       // 'development' | 'production' | 'test'
```

```typescript
// ❌ Bad - Not type-safe
const apiKey = process.env.GEMINI_API_KEY // string | undefined (no validation)
```

### Check if Variable Exists

```typescript
import { hasEnv } from '@/lib/env'

if (hasEnv('UPSTASH_REDIS_REST_URL')) {
  // Use Redis
} else {
  // Use in-memory cache
}
```

### Get with Fallback

```typescript
import { getEnv } from '@/lib/env'

const apiUrl = getEnv('NEXT_PUBLIC_API_URL', 'https://default.com')
const timeout = getEnv('API_TIMEOUT', 5000)
```

### Check Missing Variables

```typescript
import { getMissingEnvVars } from '@/lib/env'

const missing = getMissingEnvVars()

if (missing.length > 0) {
  console.error('Missing:', missing)
}
```

---

## 🧪 Testing

### Unit Tests

```typescript
// __tests__/lib/env.test.ts
import { z } from 'zod'

test('validates email format', () => {
  const schema = z.string().email()
  
  expect(() => schema.parse('test@example.com')).not.toThrow()
  expect(() => schema.parse('invalid')).toThrow()
})
```

### Mock Environment Variables

```typescript
describe('Feature with env vars', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      GEMINI_API_KEY: 'test-key',
    }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('uses env variable', () => {
    // Your test here
  })
})
```

---

## 🐛 Troubleshooting

### Error: Missing GEMINI_API_KEY

```bash
❌ Invalid server environment variables:
  GEMINI_API_KEY: Required
```

**Solution:**
```bash
# Add to .env.local
GEMINI_API_KEY=your_key_here
```

### Error: Email configuration

```bash
❌ Email configuration error: Either RESEND_API_KEY or EMAIL_SERVER_USER + EMAIL_SERVER_PASSWORD must be set
```

**Solution:**
```bash
# Option 1: Use Resend
RESEND_API_KEY=re_xxx
EMAIL_TO=your@email.com

# Option 2: Use Gmail
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_TO=your@email.com
```

### Error: Invalid email format

```bash
❌ Invalid server environment variables:
  EMAIL_SERVER_USER: Invalid email
```

**Solution:**
```bash
# Must be valid email
EMAIL_SERVER_USER=valid@example.com  # ✓
EMAIL_SERVER_USER=invalid             # ✗
```

### Error: Invalid URL

```bash
❌ Invalid client environment variables:
  NEXT_PUBLIC_API_URL: Invalid url
```

**Solution:**
```bash
# Must be valid URL
NEXT_PUBLIC_API_URL=https://api.example.com  # ✓
NEXT_PUBLIC_API_URL=not-a-url                 # ✗
```

### Build Fails Due to Env Vars

**Development:**
```bash
# Shows warning, doesn't crash
⚠️ Environment validation failed (development mode)
Some features may not work correctly
```

**Production:**
```bash
# Fails fast - stops build
❌ Missing required environment variables
```

---

## 📊 Validation Output

### Success (Development)

```bash
✅ Environment variables validated successfully
📋 Configuration status:
  • AI (Gemini): ✓
  • Email (Resend): ✓
  • Email (Gmail): ✗
  • Redis: ✗ (using in-memory)
  • EmailJS: ✓
  • Analytics: ✗
```

### Failure (Production)

```bash
❌ Invalid server environment variables:
{
  "GEMINI_API_KEY": [
    "Required"
  ],
  "EMAIL_SERVER_USER": [
    "Invalid email"
  ]
}
Error: Invalid server environment variables
```

---

## 🔧 Advanced Configuration

### Add New Required Variable

```typescript
// src/lib/env.ts
const serverSchema = z.object({
  // ... existing fields
  MY_NEW_API_KEY: z.string().min(1, 'MY_NEW_API_KEY is required'),
})
```

### Add New Optional Variable

```typescript
const serverSchema = z.object({
  // ... existing fields
  MY_OPTIONAL_KEY: z.string().optional(),
})
```

### Add URL Validation

```typescript
const serverSchema = z.object({
  API_URL: z.string().url('Must be valid URL'),
})
```

### Add Custom Validation

```typescript
const serverSchema = z.object({
  PORT: z.string()
    .regex(/^\d+$/, 'Must be a number')
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0 && val < 65536, 'Invalid port'),
})
```

### Add Conditional Validation

```typescript
const schema = z.object({
  FEATURE_ENABLED: z.string().optional(),
  FEATURE_API_KEY: z.string().optional(),
}).refine(
  data => {
    if (data.FEATURE_ENABLED === 'true') {
      return !!data.FEATURE_API_KEY
    }
    return true
  },
  {
    message: 'FEATURE_API_KEY required when FEATURE_ENABLED is true',
    path: ['FEATURE_API_KEY'],
  }
)
```

---

## 🎨 IDE Auto-Complete

TypeScript provides auto-complete:

```typescript
import { env } from '@/lib/env'

env. // IDE shows all available variables
    // ↓ GEMINI_API_KEY
    // ↓ RESEND_API_KEY
    // ↓ NODE_ENV
    // ↓ ...
```

---

## 📚 Best Practices

### 1. Never Commit Secrets

```bash
# ✅ Good
.env.local     # in .gitignore
.env.example   # commit this (no secrets)

# ❌ Bad
.env           # contains secrets
```

### 2. Use Type-Safe Import

```typescript
// ✅ Good
import { env } from '@/lib/env'
const key = env.GEMINI_API_KEY

// ❌ Bad
const key = process.env.GEMINI_API_KEY
```

### 3. Validate Early

```typescript
// App startup
import '@/lib/validateEnv'  // Validates immediately
```

### 4. Provide Fallbacks

```typescript
// ✅ Good
const timeout = getEnv('API_TIMEOUT', 5000)

// ❌ Bad
const timeout = env.API_TIMEOUT || 5000 // Not type-safe
```

### 5. Document Required Variables

```typescript
// .env.example
# REQUIRED
GEMINI_API_KEY=your_key_here

# OPTIONAL
UPSTASH_REDIS_REST_URL=
```

---

## 📋 Environment Checklist

**Before Deploy:**

- [ ] All required variables set
- [ ] Email configuration complete
- [ ] API keys valid
- [ ] URLs properly formatted
- [ ] No typos in variable names
- [ ] `.env.local` not committed
- [ ] `.env.example` updated
- [ ] Build succeeds
- [ ] No validation errors

---

## 🔗 Resources

- [Zod Documentation](https://zod.dev/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

**Type-safe by LykKreacji 🔐**
