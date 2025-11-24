'use client';

import React, { useState } from 'react';
import { validatePromo } from '@/api/validatePromo';
import { PromoValidationResult } from '@/types/promo';

interface PromoCodeInputProps {
  onPromoApplied?: (discount: number, code: string, discountType?: string) => void;
  onPromoRemoved?: () => void;
  className?: string;
  purchaseAmount?: number; // kwota zakupu do walidacji
  showSuggestions?: boolean; // pokazuj sugestie kodów
}

export default function PromoCodeInput({ 
  onPromoApplied, 
  onPromoRemoved,
  className = '',
  purchaseAmount,
  showSuggestions = false
}: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; discountType?: string } | null>(null);
  const [message, setMessage] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleValidate = async () => {
    if (!code.trim()) {
      setMessage('Wpisz kod promocyjny');
      return;
    }

    setIsValidating(true);
    try {
      const result: PromoValidationResult = await validatePromo(code);
      
      if (result.valid && result.discount && result.code) {
        setAppliedPromo({ code: result.code, discount: result.discount, discountType: result.discountType });
        setMessage(result.message);
        setCode('');
        onPromoApplied?.(result.discount, result.code, result.discountType);
      } else {
        setMessage(result.message);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Błąd podczas walidacji kodu');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    setAppliedPromo(null);
    setMessage('');
    onPromoRemoved?.();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidate();
    }
  };

  return (
    <div className={`promo-code-input ${className}`}>
      {!appliedPromo ? (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Wpisz kod promocyjny"
              disabled={isValidating}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
            <button
              onClick={handleValidate}
              disabled={isValidating || !code.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isValidating ? 'Sprawdzam...' : 'Zastosuj'}
            </button>
          </div>
          
          {message && (
            <div className={`text-sm px-3 py-2 rounded ${
              message.includes('aktywowany') || message.includes('Zniżka')
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-green-800 font-semibold">✓ Kod: {appliedPromo.code}</span>
              <span className="text-green-600">
                - Zniżka {appliedPromo.discount}{appliedPromo.discountType === 'percentage' ? '%' : ' zł'}
              </span>
            </div>
            {message && <p className="text-sm text-green-700 mt-1">{message}</p>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(appliedPromo.code)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              title="Kopiuj kod"
            >
              {showCopied ? '✓ Skopiowano' : '📋'}
            </button>
            <button
              onClick={handleRemove}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Usuń
            </button>
          </div>
        </div>
      )}
      
      {showSuggestions && !appliedPromo && (
        <div className="mt-2 text-xs text-gray-500">
          💡 Dostępne kody: KLO15, WELCOME10, RABAT50
        </div>
      )}
    </div>
  );
}
