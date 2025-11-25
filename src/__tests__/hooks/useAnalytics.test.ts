import { renderHook } from '@testing-library/react'
import { useScrollDepthTracking, useTimeOnPageTracking } from '@/hooks/useAnalytics'

jest.mock('@/lib/analytics', () => ({
  trackScrollDepth: jest.fn(),
  trackTimeOnPage: jest.fn(),
  trackSectionView: jest.fn(),
  trackPageView: jest.fn(),
}))

describe('useAnalytics Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('useScrollDepthTracking hook initializes without errors', () => {
    const { result } = renderHook(() => useScrollDepthTracking())
    expect(result.current).toBeUndefined()
  })

  it('useTimeOnPageTracking hook initializes without errors', () => {
    const { result } = renderHook(() => useTimeOnPageTracking())
    expect(result.current).toBeUndefined()
  })

  it('sets up scroll event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    renderHook(() => useScrollDepthTracking())
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    addEventListenerSpy.mockRestore()
  })

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollDepthTracking())
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
