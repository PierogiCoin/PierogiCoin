import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatedKeyword } from '@/components/AnimatedKeyword';

describe('AnimatedKeyword Component', () => {
  it('renders children content', () => {
    render(<AnimatedKeyword>Test Keyword</AnimatedKeyword>);
    expect(screen.getByText('Test Keyword')).toBeInTheDocument();
  });

  it('wraps content in strong tag', () => {
    const { container } = render(<AnimatedKeyword>Bold Text</AnimatedKeyword>);
    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent('Bold Text');
  });

  it('has keyword-highlight class', () => {
    const { container } = render(<AnimatedKeyword>Highlighted</AnimatedKeyword>);
    const strong = container.querySelector('strong');
    expect(strong).toHaveClass('keyword-highlight');
  });

  it('contains highlight element span', () => {
    const { container } = render(<AnimatedKeyword>Test</AnimatedKeyword>);
    const highlightSpan = container.querySelector('.highlight-element');
    expect(highlightSpan).toBeInTheDocument();
  });

  it('applies inline styles to strong element', () => {
    const { container } = render(<AnimatedKeyword>Styled</AnimatedKeyword>);
    const strong = container.querySelector('strong');
    expect(strong).toHaveStyle({ position: 'relative', display: 'inline-block' });
  });

  it('renders with dark mode classes', () => {
    const { container } = render(<AnimatedKeyword>Dark Mode</AnimatedKeyword>);
    const strong = container.querySelector('strong');
    expect(strong?.className).toContain('dark:text-white');
  });
});
