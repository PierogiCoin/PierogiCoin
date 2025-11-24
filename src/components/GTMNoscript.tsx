'use client';

import { useEffect, useState } from 'react';

export default function GTMNoscript() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if user has consented to analytics
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        const preferences = JSON.parse(consent);
        setHasConsent(preferences.analytics === true);
      }
    } catch (e) {
      console.error('Error checking cookie consent:', e);
    }
  }, []);

  // Only render noscript iframe if user consented
  if (!hasConsent) return null;

  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-554CLKKV"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
