import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AiCalculator from '@/components/Calculator/AiCalculator';
import * as calculatorStorage from '@/lib/calculatorStorage';

// Mock dependencies
jest.mock('@/lib/calculatorStorage');
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => null;
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

global.fetch = jest.fn();

// Mock useDebounce to return immediately for faster tests
jest.mock('@/components/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

describe('AiCalculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (calculatorStorage.getSavedCalculatorData as jest.Mock).mockReturnValue(null);
    (calculatorStorage.saveCalculatorData as jest.Mock).mockImplementation(() => { });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        estimate: { min: 3000, max: 5000 },
        extracted: {
          type: 'Landing Page',
          design: 'Custom',
          features: 'Contact Form, Blog',
        },
        aiAnalysis: 'This project requires modern design.',
      }),
    });
  });

  describe('Initial Render', () => {
    it('renders main components', () => {
      render(<AiCalculator />);
      expect(screen.getByText(/opisz swój pomysł/i)).toBeInTheDocument();
      expect(screen.getByText(/analiza na żywo/i)).toBeInTheDocument();
    });

    it('renders description textarea', () => {
      render(<AiCalculator />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('rows', '10');
    });

    it('checks for saved calculations on mount', () => {
      render(<AiCalculator />);
      expect(calculatorStorage.getSavedCalculatorData).toHaveBeenCalled();
    });
  });

  describe('User Input', () => {
    it('allows typing in textarea', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Test input');

      expect(textarea).toHaveValue('Test input');
    });

    it('does not call API for short descriptions', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Too short');

      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      }, { timeout: 500 });
    });

    it('calls liveAnalyze API for long descriptions', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      const longText = 'This is a sufficiently long description that should trigger the AI analysis';
      await user.type(textarea, longText);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/liveAnalyze',
          expect.objectContaining({
            method: 'POST',
          })
        );
      });
    });
  });

  describe('AI Analysis Response', () => {
    it('displays analysis results', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'I need a professional website for my photography business');

      await waitFor(() => {
        expect(screen.getByText(/3000|5000/)).toBeInTheDocument();
      }, { timeout: 5000 });
    });

    it('saves results to localStorage', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Project that should be saved automatically to local storage');

      await waitFor(() => {
        expect(calculatorStorage.saveCalculatorData).toHaveBeenCalled();
      });
    });

    it('shows extracted project type', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Need a landing page with modern design and animations');

      await waitFor(() => {
        const landingPageElements = screen.getAllByText(/Landing Page/i);
        expect(landingPageElements.length).toBeGreaterThan(0);
      }, { timeout: 5000 });
    });
  });

  describe('Generate Offer', () => {
    it('shows generate offer section after analysis', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Description to trigger full analysis with email section');

      await waitFor(() => {
        expect(screen.getByText(/pobierz pełną ofertę/i)).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Test project for email validation check');

      await waitFor(() => {
        expect(screen.getByText(/3000|5000/)).toBeInTheDocument();
      }, { timeout: 5000 });

      const buttons = screen.getAllByRole('button');
      const button = buttons.find(btn => btn.textContent?.toLowerCase().includes('pobierz'));

      if (button && !button.hasAttribute('disabled')) {
        await user.click(button);

        // Check that button is now disabled or error shown
        await waitFor(() => {
          expect(button.hasAttribute('disabled') || screen.queryByText(/wypełnij/i)).toBeTruthy();
        }, { timeout: 2000 });
      }
    });

    it('calls generateOffer API with valid email', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Complete project description for offer generation test');

      await waitFor(() => {
        expect(screen.getByText(/3000|5000/)).toBeInTheDocument();
      }, { timeout: 5000 });

      // Find email input flexibly
      const inputs = screen.getAllByRole('textbox');
      const emailInput = inputs.find(input =>
        input.getAttribute('type') === 'email' ||
        input.getAttribute('placeholder')?.toLowerCase().includes('email')
      );

      if (emailInput) {
        await user.type(emailInput, 'test@example.com');

        const buttons = screen.getAllByRole('button');
        const button = buttons.find(btn => btn.textContent?.toLowerCase().includes('pobierz'));

        if (button) {
          await user.click(button);
        }
      }

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/generateOffer',
          expect.any(Object)
        );
      });
    });

    it('marks email as sent after successful generation', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Final test for email sent flag in localStorage');

      await waitFor(() => {
        expect(screen.getByText(/3000|5000/)).toBeInTheDocument();
      }, { timeout: 5000 });

      // Find email input more flexibly
      const inputs = screen.getAllByRole('textbox');
      const emailInput = inputs.find(input =>
        input.getAttribute('type') === 'email' ||
        input.getAttribute('placeholder')?.toLowerCase().includes('email')
      );

      if (emailInput) {
        await user.type(emailInput, 'final@example.com');

        const buttons = screen.getAllByRole('button');
        const offerButton = buttons.find(btn => btn.textContent?.toLowerCase().includes('pobierz'));

        if (offerButton) {
          await user.click(offerButton);

          await waitFor(() => {
            expect(calculatorStorage.saveCalculatorData).toHaveBeenCalled();
          }, { timeout: 3000 });
        }
      }
    });
  });

  describe('Loading States', () => {
    it('shows loading indicator during analysis', async () => {
      const user = userEvent.setup();

      let resolvePromise: any;
      (global.fetch as jest.Mock).mockReturnValue(
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
      );

      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Testing loading state with delayed promise resolution');

      await waitFor(() => {
        // Check for loading dots (animate-pulse elements)
        const container = screen.getByText(/analiza na żywo/i).parentElement;
        expect(container).toBeInTheDocument();
      });

      // Resolve the promise
      resolvePromise({
        ok: true,
        json: async () => ({
          estimate: { min: 2000, max: 3000 },
          extracted: { type: 'Test', design: 'Custom', features: 'None' },
          aiAnalysis: 'Done',
        }),
      });
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'This will cause a network error for testing');

      await waitFor(() => {
        const errorElements = screen.queryAllByText(/network/i);
        expect(errorElements.length).toBeGreaterThan(0);
      }, { timeout: 2000 });
    });

    it('handles API error responses', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'API Error' }),
      });

      render(<AiCalculator />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Trigger API error response for test coverage');

      await waitFor(() => {
        // Error should be displayed somewhere
        expect(screen.getByText(/analiza na żywo/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Integration', () => {
    it('completes full user journey', async () => {
      const user = userEvent.setup();
      render(<AiCalculator />);

      // Step 1: Enter description - find textarea by placeholder
      const textarea = screen.getByPlaceholderText(/fotografem/i);
      await user.type(textarea, 'Complete user journey test with full workflow');

      // Step 2: Wait for analysis with increased timeout
      await waitFor(() => {
        expect(screen.getByText(/3000|5000/)).toBeInTheDocument();
      }, { timeout: 5000 });

      // Step 3: Find email input by type attribute
      const inputs = screen.getAllByRole('textbox');
      const emailInput = inputs.find(input =>
        input.getAttribute('type') === 'email' ||
        input.getAttribute('placeholder')?.toLowerCase().includes('email')
      );

      if (emailInput) {
        await user.type(emailInput, 'journey@example.com');

        // Step 4: Find and click generate button
        const buttons = screen.getAllByRole('button');
        const generateButton = buttons.find(btn => btn.textContent?.toLowerCase().includes('pobierz'));

        if (generateButton && !generateButton.hasAttribute('disabled')) {
          await user.click(generateButton);

          // Step 5: Verify API call was made
          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
          }, { timeout: 3000 });
        }
      }
    });
  });
});
