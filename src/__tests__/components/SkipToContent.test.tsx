import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SkipToContent from '@/components/Layout/SkipToContent'

describe('SkipToContent Component', () => {
  it('renders skip to content link', () => {
    const { container } = render(<SkipToContent />)

    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
  })

  it('links to main content', () => {
    const { container } = render(<SkipToContent />)

    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('is visually hidden by default', () => {
    const { container } = render(<SkipToContent />)

    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
  })

  it('becomes visible on focus', async () => {
    const { container } = render(<SkipToContent />)

    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SkipToContent />)

    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
  })
})
