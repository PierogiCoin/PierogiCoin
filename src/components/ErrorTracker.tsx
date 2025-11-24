'use client'

import { useEffect } from 'react'
import { initErrorTracking } from '@/lib/errorTracking'

export default function ErrorTracker() {
  useEffect(() => {
    initErrorTracking()
  }, [])

  return null
}
