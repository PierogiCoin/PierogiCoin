'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import {
  generateCalculatorLink,
  copyCalculatorLink,
  formatSocialLink,
  type CalculatorLinkOptions
} from '@/lib/calculatorLinks';

interface ShareCalculatorButtonProps {
  options?: CalculatorLinkOptions;
  className?: string;
  variant?: 'button' | 'icon';
  message?: string;
}

export function ShareCalculatorButton({
  options = {},
  className = '',
  variant = 'button',
  message = 'Sprawdź kalkulator wyceny projektu! 🚀'
}: ShareCalculatorButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const calculatorLink = generateCalculatorLink(options);

  const handleCopy = async () => {
    const success = await copyCalculatorLink(calculatorLink);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'calculator_link',
          item_id: options.type || 'default'
        });
      }
    }
  };

  const handleSocialShare = (type: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp') => {
    const socialLink = formatSocialLink(type, calculatorLink, message);
    window.open(socialLink, '_blank', 'width=600,height=400');
    setShowMenu(false);

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: type,
        content_type: 'calculator_link',
        item_id: options.type || 'default'
      });
    }
  };

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all ${className}`}
          aria-label="Udostępnij kalkulator"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowMenu(false);
                }
              }}
            />

            {/* Menu */}
            <div className="absolute right-0 top-12 z-50 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 min-w-[200px]">
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Skopiowano!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Kopiuj link</span>
                  </>
                )}
              </button>

              <div className="my-2 h-px bg-slate-700" />

              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </button>

              <button
                onClick={() => handleSocialShare('linkedin')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Button variant
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all ${className}`}
      >
        <Share2 className="w-4 h-4" />
        <span>Udostępnij</span>
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowMenu(false);
              }
            }}
          />

          {/* Menu */}
          <div className="absolute right-0 top-12 z-50 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 min-w-[200px]">
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Skopiowano!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kopiuj link</span>
                </>
              )}
            </button>

            <div className="my-2 h-px bg-slate-700" />

            <button
              onClick={() => handleSocialShare('facebook')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </button>

            <button
              onClick={() => handleSocialShare('twitter')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </button>

            <button
              onClick={() => handleSocialShare('linkedin')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Quick Share Links - predefiniowane linki
 */
export function QuickShareLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* AI Kalkulator */}
      <ShareCalculatorButton
        options={{ type: 'ai' }}
        message="Sprawdź AI Kalkulator - wycena projektu w sekundach! 🤖"
        className="text-sm"
      />

      {/* Prosty Kalkulator */}
      <ShareCalculatorButton
        options={{ type: 'simple' }}
        message="Oblicz wycenę swojego projektu! 💰"
        className="text-sm"
      />

      {/* Landing Page */}
      <ShareCalculatorButton
        options={{
          type: 'simple',
          preselect: {
            projectType: 'landing',
            design: 'custom',
            features: ['seo']
          }
        }}
        message="Wycena Landing Page - sprawdź teraz! 🚀"
        className="text-sm"
      />
    </div>
  );
}
