import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '@/components/About';

describe('About Component', () => {
  describe('Initial Render', () => {
    it('renders section heading', () => {
      render(<About />);
      expect(screen.getByText(/więcej niż kod/i)).toBeInTheDocument();
    });

    it('renders component without crashing', () => {
      const { container } = render(<About />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('displays company information', () => {
      render(<About />);
      const content = screen.getByText(/partnerstwo w cyfrowej kreacji/i);
      expect(content).toBeInTheDocument();
    });

    it('has proper section id for navigation', () => {
      const { container } = render(<About />);
      const section = container.querySelector('#o-mnie');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<About />);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('renders semantic HTML', () => {
      const { container } = render(<About />);
      const section = container.querySelector('.section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('renders with container', () => {
      const { container } = render(<About />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
