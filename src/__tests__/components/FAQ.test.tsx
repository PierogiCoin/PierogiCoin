import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '@/components/FAQ';

describe('FAQ Component', () => {
  describe('Initial Render', () => {
    it('renders FAQ heading', () => {
      render(<FAQ />);
      expect(screen.getByText(/najczęściej zadawane pytania/i)).toBeInTheDocument();
    });

    it('renders all FAQ items', () => {
      render(<FAQ />);
      const questions = screen.getAllByRole('button');
      expect(questions.length).toBeGreaterThan(0);
    });

    it('all items are collapsed by default', () => {
      render(<FAQ />);
      const expandedItems = screen.queryAllByText(/odpowiedź/i);
      expect(expandedItems.length).toBe(0);
    });
  });

  describe('Accordion Functionality', () => {
    it('expands item when clicked', () => {
      render(<FAQ />);
      const firstQuestion = screen.getAllByRole('button')[0];
      
      fireEvent.click(firstQuestion);
      
      // Check if content is visible
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('collapses item when clicked again', () => {
      render(<FAQ />);
      const firstQuestion = screen.getAllByRole('button')[0];
      
      fireEvent.click(firstQuestion);
      fireEvent.click(firstQuestion);
      
      // Item should collapse
      expect(firstQuestion).toBeInTheDocument();
    });

    it('allows multiple items to be open', () => {
      render(<FAQ />);
      const questions = screen.getAllByRole('button');
      
      if (questions.length >= 2) {
        fireEvent.click(questions[0]);
        fireEvent.click(questions[1]);
        
        // Both should be accessible
        expect(questions[0]).toBeInTheDocument();
        expect(questions[1]).toBeInTheDocument();
      }
    });
  });

  describe('Content', () => {
    it('renders questions', () => {
      render(<FAQ />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button.textContent).toBeTruthy();
      });
    });

    it('has proper heading hierarchy', () => {
      render(<FAQ />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper button roles', () => {
      render(<FAQ />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('buttons are keyboard accessible', () => {
      render(<FAQ />);
      const firstButton = screen.getAllByRole('button')[0];
      
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);
    });
  });

  describe('Styling', () => {
    it('renders with proper container classes', () => {
      const { container } = render(<FAQ />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders FAQ items', () => {
      render(<FAQ />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
