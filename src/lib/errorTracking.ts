type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

interface ErrorReport {
  message: string
  stack?: string
  severity: ErrorSeverity
  timestamp: string
  url: string
  userAgent: string
  context?: Record<string, unknown>
}

export function trackError(
  error: Error,
  severity: ErrorSeverity = 'medium',
  context?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return

  const report: ErrorReport = {
    message: error.message,
    stack: error.stack,
    severity,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    context,
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', {
      severityLevel: severity.toUpperCase(),
      ...report,
    })
  }

  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: severity === 'critical',
    })
  }

  // Send to custom error tracking endpoint
  if (process.env.NEXT_PUBLIC_ERROR_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ERROR_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
      keepalive: true,
    }).catch(err => {
      console.error('Failed to send error report:', err)
    })
  }

  // Optional: Sentry, LogRocket, etc.
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { level: severity, extra: context })
  // }
}

export function trackPromiseRejection() {
  if (typeof window === 'undefined') return

  window.addEventListener('unhandledrejection', event => {
    trackError(
      new Error(`Unhandled Promise Rejection: ${event.reason}`),
      'high',
      { reason: event.reason }
    )
  })
}

export function trackResourceErrors() {
  if (typeof window === 'undefined') return

  window.addEventListener(
    'error',
    event => {
      if (event.target !== window) {
        const target = event.target as HTMLElement
        trackError(
          new Error(`Resource failed to load: ${target.tagName}`),
          'low',
          {
            src: (target as HTMLImageElement).src || (target as HTMLScriptElement).src,
            tagName: target.tagName,
          }
        )
      }
    },
    true
  )
}

// Initialize all error tracking
export function initErrorTracking() {
  trackPromiseRejection()
  trackResourceErrors()
}
