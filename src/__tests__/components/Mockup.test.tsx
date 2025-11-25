import React from 'react';
import { render, screen } from '@testing-library/react';

import { Mockup } from '@/components/Mockup';

describe('Mockup Component', () => {
  it('renders image when active', () => {
    render(<Mockup isActive={true} />);
    const img = screen.getByRole('img', { name: /Przykładowa grafika/i });
    expect(img).toBeInTheDocument();
  });

  it('renders image when inactive', () => {
    render(<Mockup isActive={false} />);
    const img = screen.getByRole('img', { name: /Przykładowa grafika/i });
    expect(img).toBeInTheDocument();
  });

  it('has correct image source', () => {
    render(<Mockup isActive={true} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('unsplash.com');
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Mockup isActive={true} />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full');
  });
});
