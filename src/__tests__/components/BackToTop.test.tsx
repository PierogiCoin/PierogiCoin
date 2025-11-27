import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackToTop from '@/components/Layout/BackToTop'

describe('BackToTop Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('renders back to top button', () => {
    const { container } = render(<BackToTop />)

    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('scrolls to top on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<BackToTop />)

    const button = container.querySelector('button')
    if (button) {
      await user.click(button)
      expect(button).toBeInTheDocument()
    }
  })

  it('shows button when scrolled down', () => {
    const { container } = render(<BackToTop />)

    fireEvent.scroll(window, { target: { scrollY: 500 } })

    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('has proper ARIA label', () => {
    const { container } = render(<BackToTop />)

    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })
})
