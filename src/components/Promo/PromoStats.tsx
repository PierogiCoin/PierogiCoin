'use client';

import { promoCodes } from '@/data/promoCodes';
import { useMemo } from 'react';

export default function PromoStats() {
  const stats = useMemo(() => {
    const total = promoCodes.length;
    const active = promoCodes.filter(p => p.isActive).length;
    const totalUsage = promoCodes.reduce((sum, p) => sum + p.usedCount, 0);
    const mostUsed = promoCodes.reduce((prev, current) => 
      (current.usedCount > prev.usedCount) ? current : prev
    , promoCodes[0]);

    return { total, active, totalUsage, mostUsed };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-blue-800">Wszystkich kodów</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        <div className="text-sm text-green-800">Aktywnych</div>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="text-2xl font-bold text-purple-600">{stats.totalUsage}</div>
        <div className="text-sm text-purple-800">Użyć łącznie</div>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <div className="text-sm font-mono text-orange-600">{stats.mostUsed?.code || '-'}</div>
        <div className="text-xs text-orange-800">Najpopularniejszy</div>
      </div>
    </div>
  );
}
