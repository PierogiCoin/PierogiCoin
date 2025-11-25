import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '@/components/Contact'

global.fetch = jest.fn()

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
  })

  it('renders contact form with all fields', () => {
    render(<Contact />)
    
    expect(screen.getByLabelText(/twoje imię/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/adres e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/numer telefonu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/o czym chcesz porozmawiać/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /wyślij wiadomość/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('allows typing in name field', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByLabelText(/twoje imię/i)
    await user.type(nameInput, 'Jan Kowalski')
    
    expect(nameInput).toHaveValue('Jan Kowalski')
  })

  it('allows typing in email field', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const emailInput = screen.getByLabelText(/adres e-mail/i)
    await user.type(emailInput, 'jan@example.com')
    
    expect(emailInput).toHaveValue('jan@example.com')
  })

  it('allows typing in phone field', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const phoneInput = screen.getByLabelText(/numer telefonu/i)
    await user.type(phoneInput, '+48 123 456 789')
    
    expect(phoneInput).toHaveValue('+48 123 456 789')
  })

  it('allows typing in message field', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const messageInput = screen.getByLabelText(/o czym chcesz porozmawiać/i)
    await user.type(messageInput, 'Test message')
    
    expect(messageInput).toHaveValue('Test message')
  })

  it('displays contact information', () => {
    render(<Contact />)
    
    expect(screen.getByText(/czesc@lykkreacji\.pl/i)).toBeInTheDocument()
    expect(screen.getByText(/\+48 790 629 497/i)).toBeInTheDocument()
  })

  it('has phone and email links', () => {
    render(<Contact />)
    
    const phoneLink = screen.getByRole('link', { name: /\+48 790 629 497/i })
    const emailLink = screen.getByRole('link', { name: /czesc@lykkreacji\.pl/i })
    
    expect(phoneLink).toHaveAttribute('href', 'tel:+48790629497')
    expect(emailLink).toHaveAttribute('href', 'mailto:czesc@lykkreacji.pl')
  })
})
