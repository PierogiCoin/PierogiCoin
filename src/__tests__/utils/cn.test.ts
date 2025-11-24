import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toContain('text-red-500')
    expect(cn('text-red-500', 'bg-blue-500')).toContain('bg-blue-500')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).not.toContain('hidden')
  })

  it('overrides conflicting Tailwind classes', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })
})
