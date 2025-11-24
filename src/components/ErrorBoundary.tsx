'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🔴 Error Boundary caught an error:', error, errorInfo)

    // Send to error tracking service
    if (typeof window !== 'undefined') {
      // Google Analytics
      if ((window as any).gtag) {
        ;(window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: 1,
        })
      }

      // Optional: Send to custom error tracking endpoint
      if (process.env.NEXT_PUBLIC_ERROR_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_ERROR_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
        }).catch(err => console.error('Failed to send error report:', err))
      }
    }

    this.setState({ errorInfo })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      const isDev = process.env.NODE_ENV === 'development'

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black px-4">
          <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Ups! Coś poszło nie tak
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md">
                Wystąpił nieoczekiwany błąd. Przepraszamy za niedogodności.
              </p>

              {/* Error details in development */}
              {isDev && this.state.error && (
                <div className="w-full mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="text-left">
                    <p className="text-sm font-mono text-red-800 dark:text-red-300 mb-2">
                      {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <details className="text-xs text-red-700 dark:text-red-400 mt-2">
                        <summary className="cursor-pointer hover:underline">
                          Stack trace
                        </summary>
                        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">
                          {this.state.error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={this.handleReset}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Odśwież stronę
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <Home className="w-5 h-5" />
                  Strona główna
                </button>
              </div>

              {/* Support info */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 w-full">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Jeśli problem się powtarza, skontaktuj się z nami:
                  <br />
                  <a
                    href="mailto:czesc@lykkreacji.pl"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
                  >
                    czesc@lykkreacji.pl
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
