import React from 'react';
import { render, screen } from '@testing-library/react';

import HowItWorks from '@/components/HowItWorks';

describe('HowItWorks Component', () => {
  it('renders section title', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Jak wygląda/i)).toBeInTheDocument();
  });

  it('displays all 4 steps', () => {
    render(<HowItWorks />);
    expect(screen.getByText('Konsultacja & Strategia')).toBeInTheDocument();
    expect(screen.getByText('Design & UX')).toBeInTheDocument();
    expect(screen.getByText('Development & Kodowanie')).toBeInTheDocument();
    expect(screen.getByText('Wdrożenie & Wsparcie')).toBeInTheDocument();
  });

  it('shows step descriptions', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Analizujemy Twój biznes/i)).toBeInTheDocument();
    expect(screen.getByText(/Projektuję unikalną szatę graficzną/i)).toBeInTheDocument();
    expect(screen.getByText(/Wdrażam projekt używając/i)).toBeInTheDocument();
    expect(screen.getByText(/Instalujemy stronę na serwerze/i)).toBeInTheDocument();
  });

  it('displays benefits for each step', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/plan działania i wstępną makietę/i)).toBeInTheDocument();
    expect(screen.getByText(/dokładnie, jak będzie wyglądać/i)).toBeInTheDocument();
    expect(screen.getByText(/ładuje się błyskawicznie/i)).toBeInTheDocument();
    expect(screen.getByText(/gotowe narzędzie do zarabiania/i)).toBeInTheDocument();
  });

  it('renders step numbers 1-4', () => {
    const { container } = render(<HowItWorks />);
    const numbers = container.querySelectorAll('.step-card');
    expect(numbers.length).toBe(4);
  });
});
