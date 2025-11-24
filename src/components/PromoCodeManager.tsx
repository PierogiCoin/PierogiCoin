'use client';

import React, { useState, useEffect } from 'react';
import { PromoCode } from '@/types/promo';
import { promoCodes, addPromoCode, togglePromoCode, removePromoCode } from '@/data/promoCodes';
import PromoStats from './PromoStats';

export default function PromoCodeManager() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [newCode, setNewCode] = useState({
    code: '',
    discount: 10,
    discountType: 'percentage' as 'percentage' | 'fixed',
    description: '',
    expiresAt: '',
    usageLimit: undefined as number | undefined,
    minPurchaseAmount: undefined as number | undefined
  });

  useEffect(() => {
    let filtered = [...promoCodes];
    
    // Filtruj po statusie
    if (filterActive === 'active') {
      filtered = filtered.filter(c => c.isActive);
    } else if (filterActive === 'inactive') {
      filtered = filtered.filter(c => !c.isActive);
    }
    
    // Filtruj po wyszukiwaniu
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setCodes(filtered);
  }, [searchTerm, filterActive]);

  const handleToggle = (code: string) => {
    togglePromoCode(code);
    setCodes([...promoCodes]);
  };

  const handleRemove = (code: string) => {
    if (confirm(`Czy na pewno usunąć kod ${code}?`)) {
      removePromoCode(code);
      setCodes([...promoCodes]);
    }
  };

  const handleAdd = () => {
    if (!newCode.code.trim()) {
      alert('Wpisz kod promocyjny');
      return;
    }

    if (newCode.discount < 1 || newCode.discount > 100) {
      alert('Zniżka musi być między 1% a 100%');
      return;
    }

    addPromoCode({
      code: newCode.code.toUpperCase(),
      discount: newCode.discount,
      discountType: newCode.discountType,
      isActive: true,
      description: newCode.description,
      expiresAt: newCode.expiresAt || undefined,
      usageLimit: newCode.usageLimit,
      minPurchaseAmount: newCode.minPurchaseAmount
    });

    setCodes([...promoCodes]);
    setNewCode({ 
      code: '', 
      discount: 10, 
      discountType: 'percentage',
      description: '', 
      expiresAt: '', 
      usageLimit: undefined,
      minPurchaseAmount: undefined
    });
    setShowAddForm(false);
  };

  return (
    <div className="promo-manager max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Zarządzanie Kodami Promocyjnymi</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
          className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg"
        />
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">Wszystkie</option>
          <option value="active">Tylko aktywne</option>
          <option value="inactive">Tylko nieaktywne</option>
        </select>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Nowy Kod Promocyjny</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kod*</label>
              <input
                type="text"
                value={newCode.code}
                onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                placeholder="np. LATO2024"
                className="w-full px-3 py-2 border rounded-lg uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Typ zniżki*</label>
              <select
                value={newCode.discountType}
                onChange={(e) => setNewCode({ ...newCode, discountType: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="percentage">Procent (%)</option>
                <option value="fixed">Stała kwota (zł)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Zniżka ({newCode.discountType === 'percentage' ? '%' : 'zł'})*
              </label>
              <input
                type="number"
                value={newCode.discount}
                onChange={(e) => setNewCode({ ...newCode, discount: parseInt(e.target.value) || 0 })}
                min="1"
                max={newCode.discountType === 'percentage' ? 100 : undefined}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Opis</label>
              <input
                type="text"
                value={newCode.description}
                onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
                placeholder="Opcjonalny opis promocji"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data wygaśnięcia</label>
              <input
                type="date"
                value={newCode.expiresAt}
                onChange={(e) => setNewCode({ ...newCode, expiresAt: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Limit użyć</label>
              <input
                type="number"
                value={newCode.usageLimit || ''}
                onChange={(e) => setNewCode({ ...newCode, usageLimit: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Bez limitu"
                min="1"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Min. kwota zakupu (zł)</label>
              <input
                type="number"
                value={newCode.minPurchaseAmount || ''}
                onChange={(e) => setNewCode({ ...newCode, minPurchaseAmount: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Brak minimum"
                min="1"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Zapisz Kod
          </button>
        </div>
      )}

      <div className="space-y-3">
        {codes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Brak kodów promocyjnych. Dodaj pierwszy kod!
          </div>
        ) : (
          codes.map((promo) => (
            <div
              key={promo.code}
              className={`p-4 rounded-lg border ${
                promo.isActive ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-blue-600">{promo.code}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      -{promo.discount}{promo.discountType === 'percentage' ? '%' : ' zł'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      promo.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {promo.isActive ? '✓ Aktywny' : '✗ Nieaktywny'}
                    </span>
                  </div>
                  {promo.description && (
                    <p className="text-gray-600 mt-1">{promo.description}</p>
                  )}
                  <div className="flex gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                    <span>Użyć: {promo.usedCount}{promo.usageLimit ? `/${promo.usageLimit}` : ''}</span>
                    {promo.expiresAt && (
                      <span>Wygasa: {new Date(promo.expiresAt).toLocaleDateString('pl-PL')}</span>
                    )}
                    {promo.minPurchaseAmount && (
                      <span>Min: {promo.minPurchaseAmount} zł</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(promo.code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      promo.isActive
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {promo.isActive ? 'Wyłącz' : 'Włącz'}
                  </button>
                  <button
                    onClick={() => handleRemove(promo.code)}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200"
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
