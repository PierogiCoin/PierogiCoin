'use client'

import { useEffect } from 'react'

/**
 * Focus Manager
 * Manages focus styles and keyboard navigation
 */
export default function FocusManager() {
  useEffect(() => {
    // Add focus-visible class to body when using keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation')
      }
    }

    // Remove focus-visible class when using mouse
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation')
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return null
}
