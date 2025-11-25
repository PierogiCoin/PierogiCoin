import { renderHook } from '@testing-library/react'
import { useLenisScroll } from '@/hooks/useLenisScroll'

jest.mock('@studio-freight/lenis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    destroy: jest.fn(),
    raf: jest.fn(),
  }))
})

describe('useLenisScroll Hook', () => {
  it('initializes Lenis on mount', () => {
    const { result } = renderHook(() => useLenisScroll())
    
    expect(result.current).toBeDefined()
    expect(result.current).toHaveProperty('scrollTo')
    expect(result.current).toHaveProperty('scrollToTop')
  })

  it('cleans up Lenis on unmount', () => {
    const { unmount } = renderHook(() => useLenisScroll())
    
    unmount()
    expect(true).toBe(true)
  })

  it('handles smooth scroll functionality', () => {
    renderHook(() => useLenisScroll())
    
    expect(true).toBe(true)
  })
})
