'use client';

import React, { useState, useEffect } from 'react';
import { PromoCode } from '@/types/promo';
import PromoStats from './PromoStats';
import toast, { Toaster } from 'react-hot-toast';

export default function PromoCodeManager() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const [newCode, setNewCode] = useState({
    code: '',
    discount: 10,
    discountType: 'percentage' as 'percentage' | 'fixed',
    description: '',
    expiresAt: '',
    usageLimit: undefined as number | undefined,
    minPurchaseAmount: undefined as number | undefined
  });

  const fetchCodes = async () => {
    try {
      const response = await fetch('/api/promo-codes');
      if (response.ok) {
        const data = await response.json();
        setCodes(data.codes);
      }
    } catch (error) {
      console.error('Failed to fetch codes:', error);
      toast.error('Błąd pobierania kodów');
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterActive === 'active') return matchesSearch && code.isActive;
    if (filterActive === 'inactive') return matchesSearch && !code.isActive;
    return matchesSearch;
  });

  const handleToggle = async (code: string) => {
    try {
      const response = await fetch(`/api/promo-codes?code=${code}`, { method: 'PATCH' });
      if (response.ok) {
        toast.success('Status kodu zmieniony');
        fetchCodes();
      } else {
        toast.error('Błąd zmiany statusu');
      }
    } catch (error) {
      toast.error('Błąd połączenia');
    }
  };

  const handleRemove = async (code: string) => {
    if (confirm(`Czy na pewno usunąć kod ${code}?`)) {
      try {
        const response = await fetch(`/api/promo-codes?code=${code}`, { method: 'DELETE' });
        if (response.ok) {
          toast.success('Kod usunięty');
          fetchCodes();
        } else {
          toast.error('Błąd usuwania kodu');
        }
      } catch (error) {
        toast.error('Błąd połączenia');
      }
    }
  };

  const handleAdd = async () => {
    if (!newCode.code.trim()) {
      toast.error('Wpisz kod promocyjny');
      return;
    }

    if (newCode.discount < 1) {
      toast.error('Zniżka musi być dodatnia');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/promo-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCode,
          isActive: true
        })
      });

      if (response.ok) {
        toast.success('Kod dodany pomyślnie');
        setShowAddForm(false);
        setNewCode({
          code: '',
          discount: 10,
          discountType: 'percentage',
          description: '',
          expiresAt: '',
          usageLimit: undefined,
          minPurchaseAmount: undefined
        });
        fetchCodes();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Błąd dodawania kodu');
      }
    } catch (error) {
      toast.error('Błąd połączenia');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="promo-manager max-w-4xl mx-auto p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Zarządzanie Kodami Promocyjnymi</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {showAddForm ? 'Anuluj' : '+ Dodaj Kod'}
        </button>
      </div>

      <PromoStats />

      {/* Filtry i wyszukiwanie */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="🔍 Szukaj kodu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          aria-label="Szukaj kodu"
        />
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value as any)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          aria-label="Filtruj kody"
        >
          <option value="all">Wszystkie</option>
          <option value="active">Tylko aktywne</option>
          <option value="inactive">Tylko nieaktywne</option>
        </select>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200 animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Nowy Kod Promocyjny</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="promo-code" className="block text-sm font-medium mb-1">Kod*</label>
              <input
                id="promo-code"
                type="text"
                value={newCode.code}
                onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                placeholder="np. LATO2024"
                className="w-full px-3 py-2 border rounded-lg uppercase focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="promo-type" className="block text-sm font-medium mb-1">Typ zniżki*</label>
              <select
                id="promo-type"
                value={newCode.discountType}
                onChange={(e) => setNewCode({ ...newCode, discountType: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="percentage">Procent (%)</option>
                <option value="fixed">Stała kwota (zł)</option>
              </select>
            </div>
            <div>
              <label htmlFor="promo-discount" className="block text-sm font-medium mb-1">
                Zniżka ({newCode.discountType === 'percentage' ? '%' : 'zł'})*
              </label>
              <input
                id="promo-discount"
                type="number"
                value={newCode.discount}
                onChange={(e) => setNewCode({ ...newCode, discount: parseInt(e.target.value) || 0 })}
                min="1"
                max={newCode.discountType === 'percentage' ? 100 : undefined}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="promo-desc" className="block text-sm font-medium mb-1">Opis</label>
              <input
                id="promo-desc"
                type="text"
                value={newCode.description}
                onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
                placeholder="Opcjonalny opis promocji"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="promo-expires" className="block text-sm font-medium mb-1">Data wygaśnięcia</label>
              <input
                id="promo-expires"
                type="date"
                value={newCode.expiresAt}
                onChange={(e) => setNewCode({ ...newCode, expiresAt: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="promo-limit" className="block text-sm font-medium mb-1">Limit użyć</label>
              <input
                id="promo-limit"
                type="number"
                value={newCode.usageLimit || ''}
                onChange={(e) => setNewCode({ ...newCode, usageLimit: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Bez limitu"
                min="1"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="promo-min" className="block text-sm font-medium mb-1">Min. kwota zakupu (zł)</label>
              <input
                id="promo-min"
                type="number"
                value={newCode.minPurchaseAmount || ''}
                onChange={(e) => setNewCode({ ...newCode, minPurchaseAmount: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Brak minimum"
                min="1"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Zapisywanie...' : 'Zapisz Kod'}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filteredCodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            {searchTerm ? 'Brak wyników wyszukiwania' : 'Brak kodów promocyjnych. Dodaj pierwszy kod!'}
          </div>
        ) : (
          filteredCodes.map((promo) => (
            <div
              key={promo.code}
              className={`p-4 rounded-lg border transition-all ${promo.isActive ? 'bg-white border-gray-200 hover:shadow-md' : 'bg-gray-100 border-gray-300 opacity-75'
                }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xl font-bold text-blue-600 font-mono">{promo.code}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      -{promo.discount}{promo.discountType === 'percentage' ? '%' : ' zł'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${promo.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {promo.isActive ? '✓ Aktywny' : '✗ Nieaktywny'}
                    </span>
                  </div>
                  {promo.description && (
                    <p className="text-gray-600 mt-2">{promo.description}</p>
                  )}
                  <div className="flex gap-4 mt-3 text-sm text-gray-500 flex-wrap">
                    <span title="Liczba użyć">👥 Użyć: {promo.usedCount || 0}{promo.usageLimit ? `/${promo.usageLimit}` : ''}</span>
                    {promo.expiresAt && (
                      <span title="Data wygaśnięcia">📅 Wygasa: {new Date(promo.expiresAt).toLocaleDateString('pl-PL')}</span>
                    )}
                    {promo.minPurchaseAmount && (
                      <span title="Minimalna kwota zamówienia">💰 Min: {promo.minPurchaseAmount} zł</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 sm:self-center">
                  <button
                    onClick={() => handleToggle(promo.code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${promo.isActive
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                  >
                    {promo.isActive ? 'Wyłącz' : 'Włącz'}
                  </button>
                  <button
                    onClick={() => handleRemove(promo.code)}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
