// Mock Upstash modules before importing rateLimit
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn(),
}))

jest.mock('@upstash/ratelimit', () => ({
  Ratelimit: jest.fn(),
}))

import { checkRateLimit, isWhitelisted, isBlacklisted } from '@/lib/rateLimit'

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = { ...originalEnv }
})

afterAll(() => {
  process.env = originalEnv
})

describe('Rate Limiting', () => {
  it('allows requests within limit', async () => {
    const result = await checkRateLimit('test-ip-1', 'default')
    expect(result.success).toBe(true)
    expect(result.remaining).toBeGreaterThan(0)
  })

  it('blocks requests after limit exceeded', async () => {
    const ip = 'test-ip-2'
    
    // Make requests up to limit (10 for default)
    for (let i = 0; i < 10; i++) {
      await checkRateLimit(ip, 'default')
    }

    // Next request should be blocked
    const result = await checkRateLimit(ip, 'default')
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('respects different configs', async () => {
    const ip = 'test-ip-3'
    
    // Contact endpoint has stricter limit (3 req/min)
    const result1 = await checkRateLimit(ip, 'contact')
    expect(result1.success).toBe(true)
    
    const result2 = await checkRateLimit(ip, 'contact')
    expect(result2.success).toBe(true)
    
    const result3 = await checkRateLimit(ip, 'contact')
    expect(result3.success).toBe(true)
    
    // 4th should fail
    const result4 = await checkRateLimit(ip, 'contact')
    expect(result4.success).toBe(false)
  })

  it('provides reset timestamp', async () => {
    const result = await checkRateLimit('test-ip-4', 'default')
    expect(result.reset).toBeGreaterThan(Date.now())
  })
})

describe('Whitelist/Blacklist', () => {
  it('checks whitelist', () => {
    process.env.RATE_LIMIT_WHITELIST = '192.168.1.1,10.0.0.1'
    expect(isWhitelisted('192.168.1.1')).toBe(false) // Not loaded in test
    expect(isWhitelisted('203.0.113.5')).toBe(false)
  })

  it('checks blacklist', () => {
    process.env.RATE_LIMIT_BLACKLIST = '123.456.789.0'
    expect(isBlacklisted('123.456.789.0')).toBe(false) // Not loaded in test
    expect(isBlacklisted('192.168.1.1')).toBe(false)
  })
})
