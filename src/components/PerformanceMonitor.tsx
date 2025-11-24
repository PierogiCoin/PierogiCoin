'use client'

import { useEffect, useState } from 'react'
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'

interface VitalsData {
  lcp?: number
  inp?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

export default function PerformanceMonitor() {
  const [vitals, setVitals] = useState<VitalsData>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or with query param
    const shouldShow =
      process.env.NODE_ENV === 'development' ||
      (typeof window !== 'undefined' && window.location.search.includes('debug=perf'))

    setIsVisible(shouldShow)

    if (shouldShow) {
      onLCP(metric => setVitals(prev => ({ ...prev, lcp: metric.value })))
      onINP(metric => setVitals(prev => ({ ...prev, inp: metric.value })))
      onCLS(metric => setVitals(prev => ({ ...prev, cls: metric.value })))
      onFCP(metric => setVitals(prev => ({ ...prev, fcp: metric.value })))
      onTTFB(metric => setVitals(prev => ({ ...prev, ttfb: metric.value })))
    }
  }, [])

  if (!isVisible) return null

  const getRating = (name: string, value: number) => {
    const thresholds: Record<string, [number, number]> = {
      lcp: [2500, 4000],
      inp: [200, 500],
      cls: [0.1, 0.25],
      fcp: [1800, 3000],
      ttfb: [800, 1800],
    }

    const [good, poor] = thresholds[name] || [0, 0]
    if (value <= good) return 'good'
    if (value <= poor) return 'needs-improvement'
    return 'poor'
  }

  const formatValue = (name: string, value?: number) => {
    if (!value) return '-'
    if (name === 'cls') return value.toFixed(3)
    return Math.round(value)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white text-xs p-4 rounded-lg shadow-xl font-mono">
      <div className="font-bold mb-2 text-cyan-400">⚡ Web Vitals</div>
      <div className="space-y-1">
        {Object.entries(vitals).map(([name, value]) => {
          const rating = getRating(name, value)
          const color =
            rating === 'good'
              ? 'text-green-400'
              : rating === 'needs-improvement'
                ? 'text-yellow-400'
                : 'text-red-400'

          return (
            <div key={name} className="flex justify-between gap-4">
              <span className="uppercase">{name}:</span>
              <span className={color}>{formatValue(name, value)}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-2 pt-2 border-t border-gray-700 text-[10px] text-gray-400">
        Add ?debug=perf to URL in production
      </div>
    </div>
  )
}
