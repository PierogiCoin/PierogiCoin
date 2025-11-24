import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// In-memory rate limiter for development
class InMemoryRateLimiter {
  private cache: Map<string, { count: number; resetAt: number }>

  constructor() {
    this.cache = new Map()
  }

  async limit(identifier: string, tokens: number, window: number): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: number
  }> {
    const now = Date.now()
    const key = identifier
    const cached = this.cache.get(key)

    // Clean expired entries
    if (cached && cached.resetAt < now) {
      this.cache.delete(key)
    }

    const entry = this.cache.get(key) || { count: 0, resetAt: now + window }

    if (entry.count >= tokens) {
      return {
        success: false,
        limit: tokens,
        remaining: 0,
        reset: entry.resetAt,
      }
    }

    entry.count++
    this.cache.set(key, entry)

    return {
      success: true,
      limit: tokens,
      remaining: tokens - entry.count,
      reset: entry.resetAt,
    }
  }
}

// Initialize rate limiters
let ratelimit: Ratelimit | InMemoryRateLimiter

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Production: Use Upstash Redis
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
    prefix: '@lykkreea/ratelimit',
  })
} else {
  // Development: Use in-memory limiter
  console.warn('⚠️ Using in-memory rate limiter (development mode)')
  ratelimit = new InMemoryRateLimiter()
}

// Rate limit configurations for different endpoints
export const rateLimitConfigs = {
  default: { tokens: 10, window: 10_000 }, // 10 requests per 10 seconds
  contact: { tokens: 3, window: 60_000 }, // 3 requests per minute
  generateOffer: { tokens: 5, window: 60_000 }, // 5 requests per minute
  liveAnalyze: { tokens: 10, window: 60_000 }, // 10 requests per minute
  strict: { tokens: 5, window: 60_000 }, // 5 requests per minute
  relaxed: { tokens: 20, window: 10_000 }, // 20 requests per 10 seconds
}

export type RateLimitConfig = keyof typeof rateLimitConfigs

/**
 * Check rate limit for a given identifier
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = 'default'
) {
  const { tokens, window } = rateLimitConfigs[config]

  if (ratelimit instanceof InMemoryRateLimiter) {
    return await ratelimit.limit(identifier, tokens, window)
  }

  // Upstash Ratelimit
  const result = await ratelimit.limit(identifier)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIp(headers: Headers): string {
  // Try various headers that might contain the real IP
  const forwardedFor = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  const cfConnectingIp = headers.get('cf-connecting-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  return realIp || cfConnectingIp || 'unknown'
}

/**
 * IP Whitelist (trusted IPs that bypass rate limiting)
 */
const WHITELIST: string[] = process.env.RATE_LIMIT_WHITELIST?.split(',') || []

/**
 * IP Blacklist (blocked IPs)
 */
const BLACKLIST: string[] = process.env.RATE_LIMIT_BLACKLIST?.split(',') || []

export function isWhitelisted(ip: string): boolean {
  return WHITELIST.includes(ip)
}

export function isBlacklisted(ip: string): boolean {
  return BLACKLIST.includes(ip)
}

/**
 * Create rate limit response
 */
export function createRateLimitResponse(
  limit: number,
  remaining: number,
  reset: number
) {
  return new Response(
    JSON.stringify({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      limit,
      remaining,
      reset: new Date(reset).toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
        'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
      },
    }
  )
}

/**
 * Add rate limit headers to response
 */
export function addRateLimitHeaders(
  response: Response,
  limit: number,
  remaining: number,
  reset: number
): Response {
  const headers = new Headers(response.headers)
  headers.set('X-RateLimit-Limit', limit.toString())
  headers.set('X-RateLimit-Remaining', remaining.toString())
  headers.set('X-RateLimit-Reset', reset.toString())

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
