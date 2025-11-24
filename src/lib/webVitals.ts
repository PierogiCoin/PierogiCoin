import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

// Web Vitals thresholds
const VITALS_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
}

// Rating helper
function getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = VITALS_THRESHOLDS[metric.name as keyof typeof VITALS_THRESHOLDS]
  if (!thresholds) return 'good'

  if (metric.value <= thresholds.good) return 'good'
  if (metric.value <= thresholds.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Send to analytics
function sendToAnalytics(metric: Metric) {
  const rating = getRating(metric)

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: rating,
    })
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[Web Vitals] ${metric.name}:`,
      Math.round(metric.value),
      rating.toUpperCase(),
      metric
    )
  }

  // Custom analytics endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating,
      id: metric.id,
      navigationType: metric.navigationType,
      timestamp: Date.now(),
      url: window.location.href,
    })

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body)
    } else {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        body,
        method: 'POST',
        keepalive: true,
      })
    }
  }
}

// Initialize Web Vitals tracking
export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
    onINP(sendToAnalytics)
  } catch (err) {
    console.error('[Web Vitals] Error:', err)
  }
}

// Export for custom usage
export { onCLS, onFCP, onLCP, onTTFB, onINP }

// Extend Window type for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string | number>
    ) => void
  }
}
