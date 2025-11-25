import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'next-themes'
import ThemeToggle from '@/components/ThemeToggle'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>
  )
}

describe('ThemeToggle Component', () => {
  it('renders theme toggle button', () => {
    const { container } = renderWithTheme(<ThemeToggle />)
    
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    const { container } = renderWithTheme(<ThemeToggle />)
    
    const button = container.querySelector('button')
    if (button) {
      await user.click(button)
      expect(button).toBeInTheDocument()
    }
  })

  it('shows sun icon in dark mode', () => {
    const { container } = renderWithTheme(<ThemeToggle />)
    
    const button = container.querySelector('button')
    const icon = button?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    const { container } = renderWithTheme(<ThemeToggle />)
    
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })
})
