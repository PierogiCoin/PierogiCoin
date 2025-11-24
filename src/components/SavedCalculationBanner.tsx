'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock, Mail, FileText, ArrowRight, Sparkles } from 'lucide-react';
import {
  getSavedCalculatorData,
  clearCalculatorData,
  formatPrice,
  getTimeSinceText,
} from '@/lib/calculatorStorage';

interface SavedCalculationBannerProps {
  onRestoreCalculation?: (selections: any) => void;
}

export default function SavedCalculationBanner({
  onRestoreCalculation,
}: SavedCalculationBannerProps) {
  const [savedData, setSavedData] = useState<ReturnType<typeof getSavedCalculatorData>>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for saved data on mount
    const data = getSavedCalculatorData();
    if (data) {
      setSavedData(data);
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearCalculatorData();
      setSavedData(null);
    }, 300);
  };

  const handleRestore = () => {
    if (savedData && onRestoreCalculation) {
      onRestoreCalculation(savedData.selections);
      setIsVisible(false);
    }
  };

  if (!savedData || !isVisible) return null;

  const emailSent = savedData.emailSent;
  const timeSince = getTimeSinceText();

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse" />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Witaj ponownie! 👋
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {emailSent
                    ? 'Masz zapisaną wycenę z wysłaną ofertą'
                    : 'Masz niezakończoną wycenę projektu'}
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors p-1"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Saved calculation info */}
          <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-200/50 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600 dark:text-gray-400">
                Twoja wycena:
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {formatPrice(savedData.price)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{timeSince}</span>
              </div>
              {emailSent && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Mail className="w-3 h-3" />
                  <span>PDF wysłany</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!emailSent ? (
              <>
                <button
                  onClick={handleRestore}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
                >
                  <FileText className="w-4 h-4" />
                  Wyślij PDF z ofertą
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleDismiss}
                  className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Rozpocznij od nowa
                </button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-gray-400">
                  ✅ Oferta została wysłana. Sprawdź swoją skrzynkę!
                </span>
                <button
                  onClick={handleDismiss}
                  className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  OK, rozumiem
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
      </div>
    </div>
  );
}
