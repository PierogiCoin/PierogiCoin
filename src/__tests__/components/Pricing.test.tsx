import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/CalculatorChoice', () => {
  return function MockCalculatorChoice() {
    return <div data-testid="calculator-choice">Calculator Choice</div>;
  };
});

import Pricing from '@/components/Pricing';

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
