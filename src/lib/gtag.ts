/**
 * Google Analytics (GA4) helper functions
 * 
 * Usage:
 * 1. Add NEXT_PUBLIC_GA_ID to .env.local
 * 2. Import and use pageview() and event() functions
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for common actions
export const trackContactFormSubmit = () => {
  event({
    action: 'submit',
    category: 'Contact',
    label: 'Contact Form Submission',
  });

  // GA4 conversion event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      currency: 'PLN',
      value: 0,
    });
  }
};

export const trackCalculatorUse = (estimatedPrice: number) => {
  event({
    action: 'calculate',
    category: 'Calculator',
    label: 'Price Estimate',
    value: estimatedPrice,
  });

  // GA4 conversion event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'PLN',
      value: estimatedPrice,
    });
  }
};

export const trackPhoneClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Phone Number',
  });

  // GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'contact', {
      method: 'phone',
    });
  }
};

export const trackEmailClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Email Address',
  });

  // GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'contact', {
      method: 'email',
    });
  }
};

export const trackButtonClick = (buttonName: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: buttonName,
  });
};

export const trackPortfolioView = (projectName: string) => {
  event({
    action: 'view',
    category: 'Portfolio',
    label: projectName,
  });
};

export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `${percentage}% Scroll Depth`,
    value: percentage,
  });
};
