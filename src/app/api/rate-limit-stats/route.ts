import { NextResponse } from 'next/server'
import { rateLimitMonitor } from '@/lib/rateLimitMonitor'

/**
 * Get rate limit statistics (admin endpoint)
 */
export async function GET(request: Request) {
  // Simple auth check (you should implement proper auth)
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const minutes = parseInt(searchParams.get('minutes') || '5', 10)
  const stats = rateLimitMonitor.getStats(minutes)

  return NextResponse.json({
    stats,
    recentAttempts: rateLimitMonitor.getRecentAttempts(minutes).slice(-20),
  })
}
