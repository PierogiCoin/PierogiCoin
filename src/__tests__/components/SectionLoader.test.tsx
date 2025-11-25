import React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionLoader } from '@/components/SectionLoader';

describe('SectionLoader Component', () => {
  it('renders loader without label', () => {
    const { container } = render(<SectionLoader />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders loader with label', () => {
    render(<SectionLoader label="Ładowanie danych..." />);
    expect(screen.getByText('Ładowanie danych...')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<SectionLoader />);
    const paragraph = container.querySelector('p');
    expect(paragraph).not.toBeInTheDocument();
  });

  it('has correct CSS classes for spinner', () => {
    const { container } = render(<SectionLoader />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('w-16', 'h-16', 'border-4', 'border-cyan-500');
  });

  it('has min-height screen container', () => {
    const { container } = render(<SectionLoader label="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
  });
});
