import { render, screen } from '@testing-library/react'
import Services from '@/components/Services'

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}))

jest.mock('gsap', () => ({
  gsap: {
    registerPlugin: jest.fn(),
    fromTo: jest.fn(),
    to: jest.fn(),
  },
}))

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))

describe('Services Component', () => {
  it('renders services section', () => {
    const { container } = render(<Services />)
    
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('displays all service cards', () => {
    render(<Services />)
    
    expect(screen.getByText(/UI\/UX Design/i)).toBeInTheDocument()
    expect(screen.getByText(/Web Development/i)).toBeInTheDocument()
    expect(screen.getByText(/RWD & Mobile First/i)).toBeInTheDocument()
    expect(screen.getByText(/SEO & Wydajność/i)).toBeInTheDocument()
    expect(screen.getByText(/Konwersja & Sprzedaż/i)).toBeInTheDocument()
  })

  it('displays service descriptions', () => {
    render(<Services />)
    
    expect(screen.getByText(/Projekty, które nie tylko wyglądają/i)).toBeInTheDocument()
    expect(screen.getByText(/Koduję w Next\.js i React/i)).toBeInTheDocument()
  })

  it('has correct number of service items', () => {
    const { container } = render(<Services />)
    const serviceCards = container.querySelectorAll('.service-card')
    expect(serviceCards.length).toBeGreaterThanOrEqual(5)
  })

  it('displays icons for each service', () => {
    const { container } = render(<Services />)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })
})
