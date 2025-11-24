'use client'

import { useEffect } from 'react'
import { reportWebVitals } from '@/lib/webVitals'

export default function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals()
  }, [])

  return null
}
