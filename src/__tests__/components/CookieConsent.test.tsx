import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CookieConsent from '@/components/CookieConsent';

// Mock cookies library
jest.mock('@/lib/cookies', () => ({
  initGoogleTagManager: jest.fn(),
  initFacebookPixel: jest.fn(),
  trackEvent: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CookieConsent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Initial State', () => {
    it('renders without crashing', () => {
      render(<CookieConsent />);
      expect(document.body).toBeInTheDocument();
    });

    it('does not show banner immediately', () => {
      render(<CookieConsent />);
      expect(screen.queryByText(/cookie/i)).not.toBeInTheDocument();
    });

    it('does not show banner when consent exists', () => {
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
      }));

      render(<CookieConsent />);
      jest.advanceTimersByTime(2000);
      
      expect(screen.queryByText(/używamy plików cookie/i)).not.toBeInTheDocument();
    });

    it('checks localStorage on mount', () => {
      const getSpy = jest.spyOn(localStorageMock, 'getItem');
      render(<CookieConsent />);
      
      expect(getSpy).toHaveBeenCalledWith('cookie-consent');
    });
  });

  describe('LocalStorage Integration', () => {
    it('loads saved preferences', () => {
      const prefs = {
        necessary: true,
        analytics: true,
        marketing: true,
      };
      localStorageMock.setItem('cookie-consent', JSON.stringify(prefs));

      render(<CookieConsent />);
      
      const saved = localStorageMock.getItem('cookie-consent');
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!)).toEqual(prefs);
    });

    it('handles missing localStorage gracefully', () => {
      render(<CookieConsent />);
      
      expect(localStorageMock.getItem('cookie-consent')).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('handles corrupted localStorage data', () => {
      localStorageMock.setItem('cookie-consent', 'invalid json');
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(<CookieConsent />);
      
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('does not crash with null localStorage', () => {
      localStorageMock.clear();
      
      expect(() => {
        render(<CookieConsent />);
      }).not.toThrow();
    });
  });

  describe('Tracking Integration', () => {
    it('initializes GTM when analytics accepted', async () => {
      const { initGoogleTagManager } = require('@/lib/cookies');
      
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
      }));

      render(<CookieConsent />);
      
      await waitFor(() => {
        expect(initGoogleTagManager).toHaveBeenCalled();
      }, { timeout: 2000 });
    });

    it('initializes Facebook Pixel when marketing accepted', async () => {
      const { initFacebookPixel } = require('@/lib/cookies');
      
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: true,
      }));

      render(<CookieConsent />);
      
      await waitFor(() => {
        expect(initFacebookPixel).toHaveBeenCalled();
      }, { timeout: 2000 });
    });

    it('initializes both trackers when all accepted', async () => {
      const { initGoogleTagManager, initFacebookPixel } = require('@/lib/cookies');
      
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      }));

      render(<CookieConsent />);
      
      await waitFor(() => {
        expect(initGoogleTagManager).toHaveBeenCalled();
        expect(initFacebookPixel).toHaveBeenCalled();
      }, { timeout: 2000 });
    });

    it('does not initialize trackers when rejected', () => {
      const { initGoogleTagManager, initFacebookPixel } = require('@/lib/cookies');
      
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      }));

      render(<CookieConsent />);
      jest.advanceTimersByTime(2000);
      
      expect(initGoogleTagManager).not.toHaveBeenCalled();
      expect(initFacebookPixel).not.toHaveBeenCalled();
    });
  });

  describe('Preference Management', () => {
    it('stores necessary cookie preference', () => {
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      }));

      render(<CookieConsent />);
      
      const saved = JSON.parse(localStorageMock.getItem('cookie-consent')!);
      expect(saved.necessary).toBe(true);
    });

    it('stores analytics preference', () => {
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
      }));

      render(<CookieConsent />);
      
      const saved = JSON.parse(localStorageMock.getItem('cookie-consent')!);
      expect(saved.analytics).toBe(true);
    });

    it('stores marketing preference', () => {
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: true,
      }));

      render(<CookieConsent />);
      
      const saved = JSON.parse(localStorageMock.getItem('cookie-consent')!);
      expect(saved.marketing).toBe(true);
    });
  });

  describe('Component Lifecycle', () => {
    it('runs useEffect on mount', () => {
      const getSpy = jest.spyOn(localStorageMock, 'getItem');
      
      render(<CookieConsent />);
      
      expect(getSpy).toHaveBeenCalled();
    });

    it('does not re-render unnecessarily', () => {
      localStorageMock.setItem('cookie-consent', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      }));

      const { rerender } = render(<CookieConsent />);
      
      rerender(<CookieConsent />);
      
      expect(localStorageMock.getItem('cookie-consent')).toBeTruthy();
    });
  });
});
