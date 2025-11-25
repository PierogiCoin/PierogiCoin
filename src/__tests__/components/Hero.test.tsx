import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

// Mock GSAP and dynamic imports
jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}))

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => null
    DynamicComponent.displayName = 'DynamicComponent'
    return DynamicComponent
  },
}))

describe('Hero Component', () => {
  it('renders hero section', () => {
    render(<Hero />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('displays CTA button', () => {
    render(<Hero />)
    
    const ctaButton = screen.getByRole('link', { name: /sprawdź cenę/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/kalkulator')
  })
})
