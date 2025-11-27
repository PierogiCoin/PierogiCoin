'use client';

import PromoCodeInput from '@/components/Promo/PromoCodeInput';
import { useState } from 'react';

export default function DemoPromoPage() {
  const [basePrice] = useState(1000);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const finalPrice = basePrice * (1 - discount / 100);
  const saved = basePrice * (discount / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Demo Kodów Promocyjnych
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Przetestuj system kodów rabatowych
          </p>

          {/* Przykładowy produkt */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Przykładowa usługa</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Cena bazowa:</span>
                <span className="font-semibold">{basePrice} zł</span>
              </div>

              {discount > 0 && (
                <>
                  <div className="flex justify-between text-green-600">
                    <span>Kod promocyjny ({promoCode}):</span>
                    <span>-{discount}%</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Oszczędzasz:</span>
                    <span>{saved.toFixed(2)} zł</span>
                  </div>
                  <hr className="my-2" />
                </>
              )}

              <div className="flex justify-between text-2xl font-bold text-blue-600">
                <span>Do zapłaty:</span>
                <span>{finalPrice.toFixed(2)} zł</span>
              </div>
            </div>
          </div>

          {/* Pole na kod promocyjny */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Masz kod promocyjny?</h3>
            <PromoCodeInput
              onPromoApplied={(disc, code) => {
                setDiscount(disc);
                setPromoCode(code);
              }}
              onPromoRemoved={() => {
                setDiscount(0);
                setPromoCode('');
              }}
            />
          </div>

          {/* Przykładowe kody */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-800">
              💡 Przykładowe kody do przetestowania:
            </h4>
            <ul className="space-y-1 text-sm text-yellow-900">
              <li>• <code className="bg-yellow-100 px-2 py-1 rounded">KLO15</code> - 15% zniżki</li>
              <li>• <code className="bg-yellow-100 px-2 py-1 rounded">WELCOME10</code> - 10% zniżki</li>
            </ul>
          </div>

          {/* Link do panelu admina */}
          <div className="mt-6 text-center">
            <a
              href="/admin/promo-codes"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              🔧 Panel Admina - Zarządzaj Kodami
            </a>
          </div>
        </div>

        {/* Instrukcja */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">📚 Jak to działa?</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Wpisz jeden z przykładowych kodów promocyjnych powyżej</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Kliknij &quot;Zastosuj&quot; - zobaczysz obliczoną zniżkę</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Przejdź do Panelu Admina, aby dodać własne kody lub wyłączyć istniejące</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
