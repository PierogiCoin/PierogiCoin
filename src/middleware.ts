import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  isWhitelisted,
  isBlacklisted,
  createRateLimitResponse,
  addRateLimitHeaders,
  type RateLimitConfig,
} from '@/lib/rateLimit'

// Track suspicious activity
const suspiciousActivity = new Map<string, number>()

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Generate Nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // 2. Construct CSP Header
  // Note: 'unsafe-eval' is often needed for Next.js in dev/production depending on specific libraries (like framer-motion or some analytics)
  // 'unsafe-inline' for styles is kept for now to avoid breaking UI frameworks that inject styles.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' https: http:;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://*.vercel-scripts.com https://generativelanguage.googleapis.com;
  `
  // Replace newlines with spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  // 3. Prepare Request Headers (pass nonce to server components)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  // --- Existing Logic Start ---

  // Only apply rate limiting to API routes
  if (!pathname.startsWith('/api/')) {
    // Add performance headers for static pages
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // Add CSP to response
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

    // Add timing headers for monitoring
    response.headers.set('X-Response-Time', Date.now().toString())

    // Enable compression hint
    response.headers.set('Content-Encoding', 'gzip')

    return response
  }

  // Get client IP
  const ip = getClientIp(request.headers)

  // Check blacklist
  if (isBlacklisted(ip)) {
    console.warn(`🚫 Blocked blacklisted IP: ${ip}`)
    return new Response(
      JSON.stringify({
        error: 'Forbidden',
        message: 'Access denied',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  // Skip rate limiting for whitelisted IPs
  if (isWhitelisted(ip)) {
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
    return response
  }

  // Determine rate limit config based on endpoint
  let config: RateLimitConfig = 'default'

  if (pathname.includes('/api/contact')) {
    config = 'contact'
  } else if (pathname.includes('/api/generateOffer')) {
    config = 'generateOffer'
  } else if (pathname.includes('/api/liveAnalyze')) {
    config = 'liveAnalyze'
  }

  // Check rate limit
  try {
    const result = await checkRateLimit(ip, config)

    // Track suspicious activity
    if (!result.success) {
      const attempts = suspiciousActivity.get(ip) || 0
      suspiciousActivity.set(ip, attempts + 1)

      // Log excessive attempts
      if (attempts > 10) {
        console.error(`🚨 Excessive rate limit violations from IP: ${ip}`)

        // Optional: Send alert to monitoring service
        if (process.env.NEXT_PUBLIC_ERROR_ENDPOINT) {
          fetch(process.env.NEXT_PUBLIC_ERROR_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'security',
              message: 'Excessive rate limit violations',
              ip,
              attempts: attempts + 1,
              endpoint: pathname,
              timestamp: new Date().toISOString(),
            }),
          }).catch(() => { }) // Silent fail
        }
      }

      return createRateLimitResponse(result.limit, result.remaining, result.reset)
    }

    // Continue to API route and add rate limit headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // Add CSP to response
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

    return addRateLimitHeaders(response, result.limit, result.remaining, result.reset)
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // Fail open - allow request if rate limit check fails
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
    return response
  }
}

// Configure which paths to run middleware on
export const config = {
  matcher: [
    '/api/:path*',
    // Exclude static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
