import { render, screen } from '@testing-library/react'
import Footer from '@/components/Layout/Footer'
import { siteConfig } from '@/data/siteConfig'

jest.mock('@/i18n/LocaleProvider', () => ({
  useLocale: () => ({
    dict: {
      footer: {
        copyright: '2025 LykKreacji',
        rights: 'Wszelkie prawa zastrzeżone',
        contact: {
          title: 'Kontakt',
          phone: 'Telefon',
          email: 'Email'
        },
        socials: {
          title: 'Social Media'
        },
        links: {
          title: 'Linki',
          privacy: 'Polityka Prywatności',
          terms: 'Regulamin'
        }
      }
    }
  })
}))

describe('Footer Component', () => {
  it('renders footer section', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('displays copyright information', () => {
    render(<Footer />)

    expect(screen.getByText(/2025 LykKreacji/i)).toBeInTheDocument()
  })

  it('displays contact email', () => {
    render(<Footer />)

    const emailLink = screen.getByRole('link', { name: /czesc@lykkreacji\.pl/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:czesc@lykkreacji.pl')
  })

  it('displays phone number', () => {
    render(<Footer />)

    const phoneLink = screen.getByText(siteConfig.contact.displayPhone).closest('a')
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', `tel:${siteConfig.contact.phone}`)
  })

  it('displays social media links', () => {
    render(<Footer />)

    const links = screen.getAllByRole('link')
    const hasInstagram = links.some(link =>
      link.getAttribute('href')?.includes('instagram')
    )
    expect(hasInstagram).toBe(true)
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })
})
