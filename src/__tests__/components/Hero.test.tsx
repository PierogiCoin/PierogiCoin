import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero/Hero'

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

jest.mock('@/components/ui/MagneticButton', () => ({
  MagneticButton: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@/components/Hero/Hero3DBackground', () => ({
  Hero3DBackground: () => <div data-testid="hero-3d-bg" />
}))

jest.mock('@/i18n/LocaleProvider', () => ({
  useLocale: () => ({
    dict: {
      hero: {
        badge: 'Dostępne terminy na 2025',
        title: 'Tworzymy strony',
        title2: 'które zarabiają',
        subtitle: 'Nowoczesne rozwiązania dla Twojego biznesu',
        cta_primary: 'Sprawdź cenę',
        cta_secondary: 'Zobacz portfolio',
        trust: 'Gwarancja satysfakcji',
        words: {
          earns: 'Zarabiają',
          converts: 'Konwertują',
          dominates: 'Dominują'
        },
        values: {
          speed: 'Szybkość',
          speed_sub: 'Błyskawiczne ładowanie',
          conversion: 'Konwersja',
          conversion_sub: 'Więcej klientów',
          security: 'Bezpieczeństwo',
          security_sub: 'Pełna ochrona',
          transparency: 'Przejrzystość',
          transparency_sub: 'Jasne zasady'
        }
      }
    },
    locale: 'pl'
  })
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
    expect(ctaButton).toHaveAttribute('href', '#kalkulator')
  })
})
