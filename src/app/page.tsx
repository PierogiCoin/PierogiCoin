import { Suspense } from 'react';
import { ClientLayout } from '@/components/Layout/ClientLayout';

// Force static generation for optimal TTFB
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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