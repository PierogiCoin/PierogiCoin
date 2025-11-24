/**
 * Rate Limit Monitoring & Analytics
 */

interface RateLimitAttempt {
  ip: string
  endpoint: string
  timestamp: number
  blocked: boolean
  limit: number
  remaining: number
}

class RateLimitMonitor {
  private attempts: RateLimitAttempt[] = []
  private maxStoredAttempts = 1000

  /**
   * Log a rate limit attempt
   */
  logAttempt(attempt: RateLimitAttempt) {
    this.attempts.push(attempt)

    // Keep only recent attempts
    if (this.attempts.length > this.maxStoredAttempts) {
      this.attempts = this.attempts.slice(-this.maxStoredAttempts)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const emoji = attempt.blocked ? '🚫' : '✅'
      console.log(
        `${emoji} Rate Limit: ${attempt.ip} -> ${attempt.endpoint} (${attempt.remaining}/${attempt.limit})`
      )
    }

    // Track in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'rate_limit_check', {
        blocked: attempt.blocked ? 1 : 0,
        endpoint: attempt.endpoint,
      })
    }
  }

  /**
   * Get attempts in the last N minutes
   */
  getRecentAttempts(minutes: number = 5): RateLimitAttempt[] {
    const cutoff = Date.now() - minutes * 60 * 1000
    return this.attempts.filter(a => a.timestamp > cutoff)
  }

  /**
   * Get blocked attempts in the last N minutes
   */
  getBlockedAttempts(minutes: number = 5): RateLimitAttempt[] {
    return this.getRecentAttempts(minutes).filter(a => a.blocked)
  }

  /**
   * Get statistics
   */
  getStats(minutes: number = 5) {
    const recent = this.getRecentAttempts(minutes)
    const blocked = recent.filter(a => a.blocked)

    // Count by IP
    const ipCounts = recent.reduce(
      (acc, a) => {
        acc[a.ip] = (acc[a.ip] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    // Count by endpoint
    const endpointCounts = recent.reduce(
      (acc, a) => {
        acc[a.endpoint] = (acc[a.endpoint] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    // Find top offenders
    const topIPs = Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    return {
      total: recent.length,
      blocked: blocked.length,
      blockRate: recent.length > 0 ? (blocked.length / recent.length) * 100 : 0,
      topIPs,
      endpointCounts,
      timeRange: minutes,
    }
  }

  /**
   * Check if IP is suspicious (many blocks in short time)
   */
  isSuspicious(ip: string, threshold: number = 5): boolean {
    const recent = this.getRecentAttempts(5)
    const ipBlocked = recent.filter(a => a.ip === ip && a.blocked)
    return ipBlocked.length >= threshold
  }

  /**
   * Get all attempts (for admin dashboard)
   */
  getAllAttempts(): RateLimitAttempt[] {
    return [...this.attempts]
  }

  /**
   * Clear all stored attempts
   */
  clear() {
    this.attempts = []
  }
}

// Singleton instance
export const rateLimitMonitor = new RateLimitMonitor()

// Export for admin dashboard
export type { RateLimitAttempt }
