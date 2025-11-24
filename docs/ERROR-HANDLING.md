# 🛡️ Error Handling & Recovery

Kompleksowy system obsługi błędów w aplikacji.

## 📋 Spis treści

1. [Error Boundaries](#error-boundaries)
2. [Error Pages](#error-pages)
3. [Error Tracking](#error-tracking)
4. [Testing](#testing)
5. [Best Practices](#best-practices)

---

## 🔴 Error Boundaries

### Global Error Boundary

Opakowuje całą aplikację w `layout.tsx`:

```tsx
<ErrorBoundary>
  <ThemeProvider>
    {children}
  </ThemeProvider>
</ErrorBoundary>
```

**Funkcje:**
- Catch React errors
- Piękny error UI
- Auto-report do GA4
- Reset functionality
- Development mode details

### Custom Fallback

```tsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <MyComponent />
</ErrorBoundary>
```

---

## 📄 Error Pages

### 1. `error.tsx` - Route Errors

Błędy w konkretnej route:

```tsx
// app/error.tsx
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Wystąpił błąd</h2>
      <button onClick={reset}>Spróbuj ponownie</button>
    </div>
  )
}
```

**Kiedy się uruchamia:**
- Runtime errors w komponencie
- Błędy w data fetching
- API errors

### 2. `global-error.tsx` - Critical Errors

Najbardziej krytyczne błędy:

```tsx
// app/global-error.tsx
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h1>Krytyczny błąd aplikacji</h1>
      </body>
    </html>
  )
}
```

**Kiedy się uruchamia:**
- Błędy w root layout
- Błędy w error boundary
- Critical crashes

### 3. `not-found.tsx` - 404

Brak strony:

```tsx
// app/not-found.tsx
export default function NotFound() {
  return <h1>404 - Strona nie znaleziona</h1>
}
```

**Trigger:**
```tsx
import { notFound } from 'next/navigation'

if (!data) {
  notFound()
}
```

---

## 📊 Error Tracking

### Automatyczne tracking

```typescript
// src/lib/errorTracking.ts
import { trackError } from '@/lib/errorTracking'

try {
  // risky operation
} catch (error) {
  trackError(error, 'high', { context: 'data' })
}
```

### Severity Levels

- **low** - nie krytyczne (resource failed)
- **medium** - standardowe błędy
- **high** - ważne błędy (promise rejection)
- **critical** - krytyczne błędy (app crash)

### Automatyczne trackowanie

```tsx
// W layout.tsx
<ErrorTracker />
```

Śledzi:
- Unhandled promise rejections
- Resource loading errors
- Runtime errors

### Integracje

**Google Analytics 4:**
```typescript
window.gtag('event', 'exception', {
  description: error.message,
  fatal: 1,
})
```

**Custom Endpoint:**
```env
NEXT_PUBLIC_ERROR_ENDPOINT=https://api.example.com/errors
```

**Przyszłe:**
- Sentry
- LogRocket
- DataDog

---

## 🧪 Testing

### Unit Tests

```typescript
// __tests__/components/ErrorBoundary.test.tsx
import { render } from '@testing-library/react'
import ErrorBoundary from '@/components/ErrorBoundary'

test('catches errors', () => {
  const ThrowError = () => {
    throw new Error('Test')
  }

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )

  expect(screen.getByText(/błąd/i)).toBeInTheDocument()
})
```

### Manual Testing

```tsx
// Test component
export default function ErrorTest() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('Test error')
  }

  return (
    <button onClick={() => setShouldError(true)}>
      Trigger Error
    </button>
  )
}
```

**URL:**
```
/error-test?trigger=true
```

---

## 💡 Best Practices

### 1. Granular Error Boundaries

```tsx
// ❌ Bad - jeden boundary dla całej app
<ErrorBoundary>
  <EntireApp />
</ErrorBoundary>

// ✅ Good - multiple boundaries
<Layout>
  <ErrorBoundary>
    <Sidebar />
  </ErrorBoundary>
  
  <ErrorBoundary>
    <MainContent />
  </ErrorBoundary>
</Layout>
```

### 2. Meaningful Error Messages

```tsx
// ❌ Bad
throw new Error('Error')

// ✅ Good
throw new Error('Failed to load user data: Invalid user ID')
```

### 3. Error Context

```typescript
trackError(error, 'high', {
  userId: user.id,
  action: 'checkout',
  step: 'payment',
})
```

### 4. User-Friendly Messages

```tsx
// ❌ Bad
<p>{error.message}</p>

// ✅ Good
<p>
  {isDev ? error.message : 'Coś poszło nie tak. Spróbuj ponownie.'}
</p>
```

### 5. Recovery Actions

```tsx
<button onClick={() => window.location.reload()}>
  Odśwież stronę
</button>

<button onClick={() => router.push('/')}>
  Strona główna
</button>

<button onClick={reset}>
  Spróbuj ponownie
</button>
```

---

## 🚨 Error Types

### Network Errors

```typescript
try {
  const res = await fetch('/api/data')
  if (!res.ok) throw new Error('Network error')
} catch (error) {
  trackError(error, 'medium', { endpoint: '/api/data' })
}
```

### Validation Errors

```typescript
try {
  const data = validateInput(input)
} catch (error) {
  trackError(error, 'low', { input })
  showToast('Nieprawidłowe dane')
}
```

### Auth Errors

```typescript
try {
  await signIn()
} catch (error) {
  trackError(error, 'high', { action: 'signIn' })
  redirect('/login')
}
```

---

## 📈 Monitoring

### Development

```bash
npm run dev
# Errors automatycznie w console
```

### Production

**Vercel Dashboard:**
- Errors → Overview
- Real-time error tracking
- Error rate charts

**Google Analytics:**
- Events → Exceptions
- Custom reports
- Error trends

---

## 🔧 Configuration

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_ERROR_ENDPOINT=https://api.example.com/errors
```

### Error Boundary Options

```tsx
<ErrorBoundary
  fallback={<CustomUI />}
  onError={(error, errorInfo) => {
    // Custom handling
  }}
>
  {children}
</ErrorBoundary>
```

---

## 📚 Resources

- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Web.dev Error Reporting](https://web.dev/reporting-api/)

---

**Bezpieczna aplikacja dzięki LykKreacji 🛡️**
