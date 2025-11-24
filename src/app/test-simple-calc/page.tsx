'use client';

import Calculator from '@/components/Calculator';

export default function TestSimpleCalcPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Test Prostego Kalkulatora
          </h1>
          <p className="text-gray-400">
            Prosty kalkulator z predefiniowanymi opcjami
          </p>
        </div>
        
        <Calculator />
      </div>
    </div>
  );
}
