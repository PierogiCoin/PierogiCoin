'use client'

import { AICalculator } from '@/components/Calculator/AiCalculator'

export default function TestCalcPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Test Kalkulatora AI</h1>
          <p className="text-slate-300 text-lg">
            Testowa strona do sprawdzenia generowania PDF i kalkulacji ceny
          </p>
        </div>

        <AICalculator />
      </div>
    </div>
  )
}
