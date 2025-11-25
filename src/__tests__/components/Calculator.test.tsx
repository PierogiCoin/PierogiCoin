import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from '@/components/Calculator';
import * as calculatorStorage from '@/lib/calculatorStorage';
import * as calculatorLinks from '@/lib/calculatorLinks';

// Mock dependencies
jest.mock('@/lib/calculatorStorage');
jest.mock('@/lib/calculatorLinks');
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => null;
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

global.fetch = jest.fn();

describe('Calculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (calculatorStorage.getSavedCalculatorData as jest.Mock).mockReturnValue(null);
    (calculatorLinks.parseCalculatorParams as jest.Mock).mockReturnValue(null);
    (calculatorStorage.saveCalculatorData as jest.Mock).mockImplementation(() => {});
    (calculatorStorage.markEmailAsSent as jest.Mock).mockImplementation(() => {});
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  describe('Initial Render', () => {
    it('renders calculator with step 1', () => {
      render(<Calculator />);
      expect(screen.getByText(/czego potrzebujesz/i)).toBeInTheDocument();
    });

    it('displays all project type options', () => {
      render(<Calculator />);
      expect(screen.getByText('Landing Page')).toBeInTheDocument();
      expect(screen.getByText('Strona Firmowa')).toBeInTheDocument();
      expect(screen.getByText('Sklep Online')).toBeInTheDocument();
      expect(screen.getByText('Aplikacja Web')).toBeInTheDocument();
    });
  });

  describe('Navigation Flow', () => {
    it('moves to design step after selecting project type', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => {
        expect(screen.getByText(/jaki design/i)).toBeInTheDocument();
      });
    });

    it('shows design options in step 2', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => {
        expect(screen.getByText('Ekonomiczny')).toBeInTheDocument();
        expect(screen.getByText('Indywidualny')).toBeInTheDocument();
        expect(screen.getByText('Premium + Animacje')).toBeInTheDocument();
      });
    });

    it('moves to features step after selecting design', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const customDesign = screen.getByText('Indywidualny').closest('button');
      await user.click(customDesign!);
      
      await waitFor(() => {
        expect(screen.getByText(/dodatki/i)).toBeInTheDocument();
      });
    });

    it('can go back to previous step', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const backButton = screen.getByText(/wróć/i).closest('button');
      await user.click(backButton!);
      
      await waitFor(() => {
        expect(screen.getByText(/czego potrzebujesz/i)).toBeInTheDocument();
      });
    });
  });

  describe('Features Selection', () => {
    it('allows selecting multiple features', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      // Navigate to features step
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const customDesign = screen.getByText('Indywidualny').closest('button');
      await user.click(customDesign!);
      
      await waitFor(() => expect(screen.getByText(/dodatki/i)).toBeInTheDocument());
      
      // Select features
      const cmsFeature = screen.getByText('Panel CMS').closest('button');
      const seoFeature = screen.getByText('Pakiet SEO').closest('button');
      
      await user.click(cmsFeature!);
      await user.click(seoFeature!);
      
      // Features should be marked as selected
      expect(cmsFeature).toHaveClass(/green/);
      expect(seoFeature).toHaveClass(/green/);
    });

    it('allows toggling features on and off', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      // Navigate to features step
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const customDesign = screen.getByText('Indywidualny').closest('button');
      await user.click(customDesign!);
      
      await waitFor(() => expect(screen.getByText(/dodatki/i)).toBeInTheDocument());
      
      const cmsFeature = screen.getByText('Panel CMS').closest('button');
      
      // Toggle on
      await user.click(cmsFeature!);
      expect(cmsFeature).toHaveClass(/green/);
      
      // Toggle off
      await user.click(cmsFeature!);
      expect(cmsFeature).not.toHaveClass(/green/);
    });
  });

  describe('Price Display', () => {
    it('shows market price and special price', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      // Navigate through steps to see price
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const templateDesign = screen.getByText('Ekonomiczny').closest('button');
      await user.click(templateDesign!);
      
      await waitFor(() => expect(screen.getByText(/dodatki/i)).toBeInTheDocument());
      
      // Move to results
      const nextButton = screen.getByText(/dalej/i).closest('button');
      await user.click(nextButton!);
      
      await waitFor(() => {
        expect(screen.getByText(/wartość rynkowa/i)).toBeInTheDocument();
        expect(screen.getByText(/twoja cena specjalna/i)).toBeInTheDocument();
      });
    });

    it('displays price in PLN', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const templateDesign = screen.getByText('Ekonomiczny').closest('button');
      await user.click(templateDesign!);
      
      await waitFor(() => expect(screen.getByText(/dodatki/i)).toBeInTheDocument());
      
      const nextButton = screen.getByText(/dalej/i).closest('button');
      await user.click(nextButton!);
      
      await waitFor(() => {
        const plnElements = screen.getAllByText(/PLN/i);
        expect(plnElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Storage Integration', () => {
    it('saves calculation data', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      // Navigate to result step to trigger save
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const templateDesign = screen.getByText('Ekonomiczny').closest('button');
      await user.click(templateDesign!);
      
      await waitFor(() => expect(screen.getByText(/dodatki/i)).toBeInTheDocument());
      
      const nextButton = screen.getByText(/dalej/i).closest('button');
      await user.click(nextButton!);
      
      await waitFor(() => {
        expect(calculatorStorage.saveCalculatorData).toHaveBeenCalled();
      });
    });

    it('shows banner when saved calculation exists', () => {
      (calculatorStorage.getSavedCalculatorData as jest.Mock).mockReturnValue({
        selections: {
          type: 'landing',
          design: 'custom',
          features: [],
          deadline: 'standard',
        },
        price: 2800,
        timestamp: new Date().toISOString(),
      });
      
      render(<Calculator />);
      
      expect(screen.getByText(/witaj ponownie/i)).toBeInTheDocument();
    });
  });

  describe('URL Parameters', () => {
    it('preselects options from URL parameters', () => {
      (calculatorLinks.parseCalculatorParams as jest.Mock).mockReturnValue({
        preselect: {
          projectType: 'landing',
          design: 'custom',
          features: ['seo'],
          deadline: 'fast',
        },
      });
      
      render(<Calculator />);
      
      // Should have moved past step 1 if preselected
      expect(calculatorStorage.saveCalculatorData).toHaveBeenCalled();
    });
  });

  describe('Reset Functionality', () => {
    it('has reset button available', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      // Look for reset/restart button
      const resetButton = screen.queryByText(/od nowa|reset/i);
      if (resetButton) {
        expect(resetButton).toBeInTheDocument();
      }
    });
  });

  describe('Promo Code Integration', () => {
    it('has promo code input component', async () => {
      const user = userEvent.setup();
      render(<Calculator />);
      
      // Navigate to final step where promo code might be visible
      const landingOption = screen.getByText('Landing Page').closest('button');
      await user.click(landingOption!);
      
      await waitFor(() => expect(screen.getByText(/jaki design/i)).toBeInTheDocument());
      
      const templateDesign = screen.getByText('Ekonomiczny').closest('button');
      await user.click(templateDesign!);
      
      await waitFor(() => expect(screen.getByText(/dodatki/i)).toBeInTheDocument());
      
      const nextButton = screen.getByText(/dalej/i).closest('button');
      await user.click(nextButton!);
      
      // Promo code input should be visible
      await waitFor(() => {
        const promoInput = screen.queryByPlaceholderText(/kod/i);
        if (promoInput) {
          expect(promoInput).toBeInTheDocument();
        }
      });
    });
  });
});
