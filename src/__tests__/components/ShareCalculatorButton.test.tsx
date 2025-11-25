import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareCalculatorButton, QuickShareLinks } from '@/components/ShareCalculatorButton';

jest.mock('@/lib/calculatorLinks', () => ({
  generateCalculatorLink: jest.fn(() => 'https://example.com/calculator'),
  copyCalculatorLink: jest.fn(() => Promise.resolve(true)),
  formatSocialLink: jest.fn((type, link, message) => `https://${type}.com/share?url=${link}`),
}));

describe('ShareCalculatorButton Component', () => {
  beforeEach(() => {
    Object.assign(window, { gtag: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Button variant', () => {
    it('renders button variant by default', () => {
      render(<ShareCalculatorButton />);
      expect(screen.getByText('Udostępnij')).toBeInTheDocument();
    });

    it('toggles menu on button click', () => {
      render(<ShareCalculatorButton />);
      const button = screen.getByText('Udostępnij');
      
      fireEvent.click(button);
      expect(screen.getByText('Kopiuj link')).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(screen.queryByText('Kopiuj link')).not.toBeInTheDocument();
    });

    it('shows social share options in menu', () => {
      render(<ShareCalculatorButton />);
      fireEvent.click(screen.getByText('Udostępnij'));
      
      expect(screen.getByText('Facebook')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    });

    it('copies link when copy button clicked', async () => {
      const { copyCalculatorLink } = require('@/lib/calculatorLinks');
      render(<ShareCalculatorButton />);
      
      fireEvent.click(screen.getByText('Udostępnij'));
      fireEvent.click(screen.getByText('Kopiuj link'));
      
      await waitFor(() => {
        expect(copyCalculatorLink).toHaveBeenCalled();
        expect(screen.getByText('Skopiowano!')).toBeInTheDocument();
      });
    });
  });

  describe('Icon variant', () => {
    it('renders icon variant', () => {
      const { container } = render(<ShareCalculatorButton variant="icon" />);
      const button = container.querySelector('button[aria-label="Udostępnij kalkulator"]');
      expect(button).toBeInTheDocument();
    });

    it('opens menu on icon click', () => {
      render(<ShareCalculatorButton variant="icon" />);
      const button = screen.getByLabelText('Udostępnij kalkulator');
      
      fireEvent.click(button);
      expect(screen.getByText('Kopiuj link')).toBeInTheDocument();
    });
  });

  describe('Social sharing', () => {
    beforeEach(() => {
      window.open = jest.fn();
    });

    it('opens Facebook share window', () => {
      render(<ShareCalculatorButton />);
      fireEvent.click(screen.getByText('Udostępnij'));
      fireEvent.click(screen.getByText('Facebook'));
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining('facebook.com'),
        '_blank',
        'width=600,height=400'
      );
    });

    it('tracks analytics on social share', () => {
      render(<ShareCalculatorButton options={{ type: 'ai' }} />);
      fireEvent.click(screen.getByText('Udostępnij'));
      fireEvent.click(screen.getByText('Twitter'));
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'share', {
        method: 'twitter',
        content_type: 'calculator_link',
        item_id: 'ai'
      });
    });
  });

  describe('QuickShareLinks Component', () => {
    it('renders multiple share buttons', () => {
      render(<QuickShareLinks />);
      const buttons = screen.getAllByText('Udostępnij');
      expect(buttons.length).toBeGreaterThan(1);
    });
  });

  describe('Backdrop behavior', () => {
    it('closes menu when backdrop clicked', () => {
      const { container } = render(<ShareCalculatorButton />);
      fireEvent.click(screen.getByText('Udostępnij'));
      
      const backdrop = container.querySelector('.fixed.inset-0');
      expect(backdrop).toBeInTheDocument();
      
      fireEvent.click(backdrop!);
      expect(screen.queryByText('Kopiuj link')).not.toBeInTheDocument();
    });
  });
});
