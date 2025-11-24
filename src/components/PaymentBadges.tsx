'use client';

import React from 'react';
import { CreditCard, ShieldCheck, Banknote } from 'lucide-react';

export default function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      {/* Raty 0% */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
        <CreditCard className="w-5 h-5 text-green-500" />
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          Raty 0%
        </span>
      </div>

      {/* Bezpieczne płatności */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
        <ShieldCheck className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          Bezpieczne płatności
        </span>
      </div>

      {/* Płatność ratalna */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
        <Banknote className="w-5 h-5 text-purple-500" />
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          Płatność ratalna
        </span>
      </div>
    </div>
  );
}

export function InstallmentInfo({ price }: { price: number }) {
  const calculate = (months: number) => {
    return Math.round(price / months);
  };

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
            Płatność ratalna dostępna
          </h4>
          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <p>• <span className="font-medium text-slate-900 dark:text-white">{calculate(6)} PLN/mies.</span> przez 6 miesięcy</p>
            <p>• <span className="font-medium text-slate-900 dark:text-white">{calculate(12)} PLN/mies.</span> przez 12 miesięcy</p>
            <p className="text-xs mt-2 text-green-600 dark:text-green-400">
              ✨ Raty 0% - bez dodatkowych kosztów
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentLogos() {
  return (
    <div className="mt-6">
      <p className="text-xs text-center text-slate-500 dark:text-slate-500 mb-3">
        Akceptujemy płatności przez:
      </p>
      <div className="flex items-center justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
        {/* PayU */}
        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="text-sm font-bold text-[#00A651]">PayU</span>
        </div>
        
        {/* Przelewy24 */}
        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="text-sm font-bold text-[#D8232A]">Przelewy24</span>
        </div>
        
        {/* Stripe */}
        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="text-sm font-bold text-[#635BFF]">Stripe</span>
        </div>
      </div>
    </div>
  );
}
