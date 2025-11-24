'use client';

import { Suspense } from 'react';
import { ClientLayout } from '@/components/ClientLayout';

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-[#0B1121] flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ClientLayout />
    </Suspense>
  );
}