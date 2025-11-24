/**
 * Utility functions for managing cookie consent
 */

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

/**
 * Check if user has given consent for specific cookie type
 */
export function hasConsent(type: keyof CookiePreferences): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    const preferences: CookiePreferences = JSON.parse(consent);
    return preferences[type] === true;
  } catch (e) {
    console.error('Error checking cookie consent:', e);
    return false;
  }
}

/**
 * Get all cookie preferences
 */
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return null;
    
    return JSON.parse(consent);
  } catch (e) {
    console.error('Error getting cookie preferences:', e);
    return null;
  }
}

/**
 * Check if user has made a cookie choice
 */
export function hasUserMadeChoice(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') !== null;
}

/**
 * Initialize Google Tag Manager (only if user consented)
 */
export function initGoogleTagManager() {
  if (!hasConsent('analytics')) return;
  
  const GTM_ID = 'GTM-554CLKKV';
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  
  // Add GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
  
  console.log('Google Tag Manager initialized');
}

/**
 * Initialize Facebook Pixel (only if user consented)
 */
export function initFacebookPixel() {
  if (!hasConsent('marketing')) return;
  
  // Tutaj dodaj swój kod Facebook Pixel
  console.log('Facebook Pixel initialized');
}

/**
 * Initialize all tracking services based on user consent
 */
export function initializeTracking() {
  const preferences = getCookiePreferences();
  
  if (preferences?.analytics) {
    initGoogleTagManager();
  }
  
  if (preferences?.marketing) {
    initFacebookPixel();
  }
}

/**
 * Reset cookie consent (useful for testing or "manage cookies" button)
 */
export function resetCookieConsent() {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cookie-consent');
  localStorage.removeItem('cookie-consent-date');
}
