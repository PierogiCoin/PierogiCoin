# 🏗️ Architecture

System architecture and design decisions for LykKreacji application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Design Patterns](#design-patterns)
5. [Data Flow](#data-flow)
6. [Security](#security)
7. [Performance](#performance)
8. [Deployment](#deployment)

---

## 🎯 Overview

### Architecture Type
**JAMstack (JavaScript, APIs, Markup)**
- Static-first approach
- API routes for dynamic functionality
- Edge deployment with Vercel
- CDN distribution

### Key Principles
- ✅ **Component-based** - Reusable React components
- ✅ **Type-safe** - TypeScript throughout
- ✅ **Performance-first** - Optimized bundle sizes
- ✅ **Accessible** - WCAG 2.1 AA compliance
- ✅ **Secure** - Rate limiting, CSP, validation
- ✅ **Tested** - Unit and integration tests

---

## 🛠️ Technology Stack

### Frontend
```
Next.js 14.2.2 (App Router)
├── React 18.3.0
├── TypeScript 5.3.3
├── Tailwind CSS 3.4.1
├── Framer Motion (animations)
├── GSAP (animations)
├── Radix UI (components)
└── Lucide Icons
```

### Backend/API
```
Next.js API Routes
├── Google Gemini AI (calculator)
├── Resend/Gmail (email)
├── Vercel Blob (file storage)
└── Upstash Redis (rate limiting)
```

### Development Tools
```
Developer Experience
├── Jest + RTL (testing)
├── ESLint + Prettier (linting)
├── Husky (git hooks)
├── TypeScript (types)
├── Zod (validation)
└── Bundle Analyzer
```

### Monitoring & Analytics
```
Observability
├── Vercel Analytics
├── Speed Insights
├── Web Vitals
├── Google Analytics 4
└── Microsoft Clarity
```

---

## 📁 Project Structure

```
lykkreea/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (routes)/            # Route groups
│   │   ├── api/                 # API routes
│   │   │   ├── contact/         # Contact form
│   │   │   ├── generateOffer/   # AI calculator
│   │   │   └── rate-limit-stats/
│   │   ├── error.tsx            # Error boundary
│   │   ├── global-error.tsx     # Global errors
│   │   ├── not-found.tsx        # 404 page
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── sections/            # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   └── Portfolio.tsx
│   │   ├── ErrorBoundary.tsx    # Error handling
│   │   ├── SkipToContent.tsx    # Accessibility
│   │   ├── FocusManager.tsx     # Keyboard nav
│   │   ├── PerformanceMonitor.tsx
│   │   └── ...
│   │
│   ├── lib/                     # Utilities
│   │   ├── env.ts              # Environment validation
│   │   ├── rateLimit.ts        # Rate limiting
│   │   ├── errorTracking.ts    # Error tracking
│   │   ├── webVitals.ts        # Performance
│   │   └── utils.ts            # Helpers
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useOnScreen.tsx
│   │   ├── useCodeTyper.ts
│   │   └── useReducedMotion.ts
│   │
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   │
│   └── __tests__/              # Tests
│       ├── components/
│       └── lib/
│
├── public/                      # Static files
│   ├── images/
│   ├── fonts/
│   ├── manifest.json
│   └── sw.js
│
├── docs/                        # Documentation
│   ├── TESTING.md
│   ├── PERFORMANCE.md
│   ├── ARCHITECTURE.md
│   └── ...
│
├── scripts/                     # Build scripts
│   └── analyze-bundle.js
│
├── .husky/                      # Git hooks
│   └── pre-commit
│
├── coverage/                    # Test coverage
│
├── next.config.mjs             # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── jest.config.js              # Jest config
├── .eslintrc.json             # ESLint config
├── .prettierrc                # Prettier config
└── package.json               # Dependencies
```

---

## 🎨 Design Patterns

### 1. Component Composition

```tsx
// Container Component
function Calculator() {
  const [values, setValues] = useState({})

  return (
    <CalculatorLayout>
      <CalculatorHeader />
      <CalculatorForm values={values} onChange={setValues} />
      <CalculatorResults values={values} />
    </CalculatorLayout>
  )
}
```

### 2. Custom Hooks

```tsx
// Reusable logic
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// Usage
function Component() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')
}
```

### 3. Server Components

```tsx
// app/page.tsx (Server Component)
export default async function Page() {
  const data = await fetchData() // Server-side

  return (
    <>
      <StaticSection data={data} />
      <InteractiveSection /> {/* Client Component */}
    </>
  )
}
```

### 4. API Route Handlers

```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validation
    const validated = schema.parse(body)
    
    // Business logic
    await sendEmail(validated)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send' },
      { status: 500 }
    )
  }
}
```

### 5. Error Boundaries

```tsx
// Hierarchical error handling
<Layout>
  <ErrorBoundary fallback={<ErrorUI />}>
    <Navigation />
  </ErrorBoundary>
  
  <ErrorBoundary fallback={<ErrorUI />}>
    <Main />
  </ErrorBoundary>
  
  <ErrorBoundary fallback={<ErrorUI />}>
    <Footer />
  </ErrorBoundary>
</Layout>
```

---

## 🔄 Data Flow

### Client-Side State

```
User Action
    ↓
Event Handler
    ↓
State Update (useState/useReducer)
    ↓
Re-render
    ↓
UI Update
```

### API Communication

```
Client
  ↓ (POST /api/contact)
Middleware (rate limit)
  ↓
API Route Handler
  ↓ (validation)
Business Logic
  ↓ (external service)
Response
  ↓ (JSON)
Client Update
```

### Form Flow

```tsx
User Input
    ↓
onChange Handler
    ↓
State Update
    ↓
Validation (Zod)
    ↓
Submit
    ↓
API Call
    ↓
Loading State
    ↓
Success/Error State
    ↓
UI Feedback
```

---

## 🔒 Security

### 1. Environment Variables

```typescript
// Type-safe validation with Zod
const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

### 2. Rate Limiting

```typescript
// Middleware (src/middleware.ts)
export async function middleware(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const result = await checkRateLimit(ip, 'contact')
  
  if (!result.success) {
    return createRateLimitResponse(...)
  }
  
  return NextResponse.next()
}
```

### 3. Input Validation

```typescript
// Zod schemas
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

// API route
const validated = contactSchema.parse(body)
```

### 4. Security Headers

```javascript
// next.config.mjs
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Content-Security-Policy', value: "..." },
    ],
  }]
}
```

### 5. CSRF Protection

```typescript
// Token-based
const token = generateToken()
localStorage.setItem('csrf', token)

// Include in requests
headers: {
  'X-CSRF-Token': token
}
```

---

## ⚡ Performance

### 1. Code Splitting

```tsx
// Dynamic imports
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Spinner />,
  ssr: false,
})
```

### 2. Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  quality={90}
/>
```

### 3. Font Optimization

```tsx
import { GeistSans } from 'geist/font/sans'

<body className={GeistSans.className}>
```

### 4. Caching Strategy

```
Static Assets
  → CDN (1 year)
  
API Routes
  → No cache (dynamic)
  
Images
  → CDN + Next.js Image Optimization
  
Fonts
  → Self-hosted + preload
```

### 5. Bundle Size

```bash
# Analysis
npm run analyze

# Targets
First Load JS: < 200 kB
Route: < 100 kB
```

---

## 🚀 Deployment

### Build Process

```
1. Environment validation (Zod)
2. TypeScript compilation
3. ESLint checks
4. Jest tests
5. Next.js build
6. Bundle analysis
7. Generate static pages
8. Output optimization
```

### Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["fra1"]
}
```

### Environment Setup

```
Development: .env.local
Staging: Vercel Environment Variables
Production: Vercel Environment Variables (encrypted)
```

### CI/CD Pipeline

```
Git Push
  ↓
Vercel Build
  ↓
Tests (Jest)
  ↓
Lint (ESLint)
  ↓
Type Check (TypeScript)
  ↓
Build (Next.js)
  ↓
Deploy (Preview/Production)
  ↓
Smoke Tests
```

---

## 📊 Monitoring

### Metrics Tracked

```
Performance
  - Web Vitals (LCP, INP, CLS, FCP, TTFB)
  - Bundle sizes
  - API response times
  
Errors
  - JavaScript errors
  - API errors
  - 404s
  
User Behavior
  - Page views
  - User flows
  - Conversions
  
Security
  - Rate limit violations
  - Failed auth attempts
  - Suspicious activity
```

---

## 🔮 Future Improvements

### Short Term
- [ ] E2E testing (Playwright)
- [ ] Storybook for components
- [ ] A/B testing framework
- [ ] Advanced analytics

### Long Term
- [ ] Internationalization (i18n)
- [ ] GraphQL API
- [ ] Real-time features (WebSockets)
- [ ] Mobile app (React Native)

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Platform](https://vercel.com/docs)

---

**Architected by LykKreacji 🏗️**
