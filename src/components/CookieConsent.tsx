'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings, Check } from 'lucide-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Pokazujemy banner po krótkiej chwili dla lepszego UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Ładujemy zapisane preferencje
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        
        // Inicjalizuj tracking jeśli użytkownik się zgodził
        if (saved.analytics) {
          import('@/lib/cookies').then(({ initGoogleTagManager }) => {
            initGoogleTagManager();
          });
        }
        
        if (saved.marketing) {
          import('@/lib/cookies').then(({ initFacebookPixel }) => {
            initFacebookPixel();
          });
        }
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
    
    // Track cookie consent
    const consentType = prefs.analytics && prefs.marketing ? 'accept_all' : 
                       !prefs.analytics && !prefs.marketing ? 'reject_all' : 'custom';
    
    import('@/lib/analytics').then(({ trackCookieConsent }) => {
      trackCookieConsent(consentType, prefs);
    });
    
    // Inicjalizuj usługi na podstawie preferencji
    if (prefs.analytics) {
      // Dynamically import and initialize GTM
      import('@/lib/cookies').then(({ initGoogleTagManager }) => {
        initGoogleTagManager();
      });
    }
    
    if (prefs.marketing) {
      // Initialize marketing pixels
      import('@/lib/cookies').then(({ initFacebookPixel }) => {
        initFacebookPixel();
      });
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[100]" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[101] p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            
            {/* Header z ikoną */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Używamy plików cookies</h3>
                  <p className="text-cyan-50 text-sm">Dla lepszego doświadczenia na stronie</p>
                </div>
              </div>
            </div>

            {/* Treść */}
            <div className="p-4 sm:p-6">
              {!showSettings ? (
                <>
                  <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Używamy plików cookies i podobnych technologii, aby zapewnić prawidłowe działanie strony, 
                    analizować ruch oraz personalizować treści. Możesz zarządzać swoimi preferencjami poniżej.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Akceptuj wszystkie
                    </button>
                    
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      Tylko niezbędne
                    </button>
                    
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold py-3 px-6 rounded-lg border-2 border-slate-200 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Ustawienia
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-gray-500 mt-4 text-center">
                    Więcej informacji w{' '}
                    <Link href="/polityka-prywatnosci" className="text-cyan-600 hover:text-cyan-500 underline">
                      Polityce Prywatności
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {/* Niezbędne cookies */}
                    <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white">Niezbędne</h4>
                          <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full">
                            Wymagane
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-gray-400">
                          Cookies niezbędne do prawidłowego działania strony. Nie można ich wyłączyć.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="w-12 h-6 bg-cyan-500 rounded-full flex items-center justify-end px-1 cursor-not-allowed">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Analityczne cookies */}
                    <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Analityczne</h4>
                        <p className="text-sm text-slate-600 dark:text-gray-400">
                          Pomagają nam zrozumieć, jak odwiedzający korzystają ze strony (np. Google Analytics).
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            preferences.analytics ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-600'
                          } flex items-center ${preferences.analytics ? 'justify-end' : 'justify-start'} px-1`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                    </div>

                    {/* Marketing cookies */}
                    <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Marketingowe</h4>
                        <p className="text-sm text-slate-600 dark:text-gray-400">
                          Używane do wyświetlania spersonalizowanych reklam i śledzenia kampanii marketingowych.
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            preferences.marketing ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-600'
                          } flex items-center ${preferences.marketing ? 'justify-end' : 'justify-start'} px-1`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      Anuluj
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Check className="w-4 h-4" />
                      Zapisz ustawienia
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
