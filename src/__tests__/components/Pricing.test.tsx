import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/Calculator/CalculatorChoice', () => {
  return function MockCalculatorChoice() {
    return <div data-testid="calculator-choice">Calculator Choice</div>;
  };
});

jest.mock('@/i18n/LocaleProvider', () => ({
  useLocale: () => ({
    dict: {
      pricing: {
        badge: 'Transparentne Zasady',
        title: 'Ty decydujesz o',
        title_highlight: 'kosztach',
        subtitle: 'Subtitle text',
        features: {
          guarantee: 'Gwarancja stałej ceny',
          invoice: 'Faktura VAT 23%',
          installments: 'Płatność w transzach',
          zero_percent: 'Raty 0%'
        },
        loader: 'Loading...'
      }
    }
  })
}));

import Pricing from '@/components/Pricing/Pricing';

describe('Pricing Component', () => {
  it('renders pricing section', () => {
    render(<Pricing />);
    expect(screen.getByText(/Ty decydujesz o/i)).toBeInTheDocument();
  });

  it('displays pricing header with badge', () => {
    render(<Pricing />);
    expect(screen.getByText('Transparentne Zasady')).toBeInTheDocument();
  });

  it('shows guarantee features', () => {
    render(<Pricing />);
    expect(screen.getByText('Gwarancja stałej ceny')).toBeInTheDocument();
    expect(screen.getByText('Faktura VAT 23%')).toBeInTheDocument();
    expect(screen.getByText('Płatność w transzach')).toBeInTheDocument();
    expect(screen.getByText('Raty 0%')).toBeInTheDocument();
  });

  it('renders calculator choice component', () => {
    render(<Pricing />);
    expect(screen.getByTestId('calculator-choice')).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<Pricing />);
    const section = container.querySelector('#kalkulator');
    expect(section).toBeInTheDocument();
  });
});
