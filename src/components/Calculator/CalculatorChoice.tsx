'use client'

import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Zap, Sparkles, ArrowRight, Clock, Brain } from 'lucide-react'
import { ShareCalculatorButton } from '../ShareCalculatorButton'
import { parseCalculatorParams } from '@/lib/calculatorLinks'

// Lazy load kalkulatorów
const Calculator = lazy(() => import('./Calculator'))
const AiCalculator = lazy(() =>
  import('./AiCalculator').then(module => ({ default: module.AICalculator }))
)

const CalculatorLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[600px] w-full bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-sm">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin" />
      <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500/20 rounded-full" />
    </div>
    <p className="mt-6 text-cyan-600 dark:text-cyan-400 font-mono text-sm animate-pulse tracking-widest uppercase">
      Ładowanie kalkulatora...
    </p>
  </div>
)

type CalculatorType = 'simple' | 'ai' | null

export default function CalculatorChoice() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>(null)

  // Check URL parameters on mount
  useEffect(() => {
    const urlParams = parseCalculatorParams()
    if (urlParams?.type) {
      setSelectedCalculator(urlParams.type === 'ai' ? 'ai' : 'simple')
    }
  }, [])

  // Jeśli wybrano kalkulator, pokaż go
  if (selectedCalculator) {
    return (
      <div className="relative">
        {/* Przycisk powrotu */}
        <button
          onClick={() => setSelectedCalculator(null)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Zmień sposób wyceny
        </button>

        <Suspense fallback={<CalculatorLoader />}>
          {selectedCalculator === 'simple' ? <Calculator /> : <AiCalculator />}
        </Suspense>
      </div>
    )
  }

  // Ekran wyboru kalkulatora
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Wybierz sposób wyceny projektu
        </h3>
        <p className="text-slate-600 dark:text-gray-400 text-lg">
          Dopasuj kalkulator do swoich potrzeb
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* PROSTY KALKULATOR */}
        <div
          className="group relative bg-white dark:bg-slate-900/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-lg dark:shadow-none"
          onClick={() => setSelectedCalculator('simple')}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedCalculator('simple')
            }
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Ikona */}
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-4">
              <Clock className="w-3 h-3" />
              Szybka wycena
            </div>

            {/* Tytuł */}
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Prosty Kalkulator
            </h4>

            {/* Opis */}
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
              Wybierasz opcje z listy, dostajesz natychmiastową wycenę. Idealny dla jasno
              określonych projektów.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {[
                'Wycena w ~1 minutę',
                'Przejrzyste opcje',
                'Natychmiastowy rezultat',
                'PDF z ofertą',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  </div>
                  <span className="text-slate-700 dark:text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
              Rozpocznij wycenę
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* AI KALKULATOR */}
        <div
          className="group relative bg-white dark:bg-slate-900/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-lg dark:shadow-none"
          onClick={() => setSelectedCalculator('ai')}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedCalculator('ai')
            }
          }}
        >
          {/* Premium badge */}
          <div className="absolute -top-3 -right-3 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black rounded-full shadow-lg">
            PREMIUM
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Ikona */}
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-8 h-8 text-white" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-4">
              <Sparkles className="w-3 h-3" />
              Analiza AI
            </div>

            {/* Tytuł */}
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Kalkulator AI
            </h4>

            {/* Opis */}
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
              Opisujesz projekt, AI analizuje i daje szczegółową wycenę z rekomendacjami. Dla
              większych projektów.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {[
                'Wycena w ~3 minuty',
                'Personalizowana analiza',
                'Rekomendacje technologiczne',
                'Szczegółowy PDF',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <span className="text-slate-700 dark:text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
              Rozpocznij analizę AI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          <ShareCalculatorButton
            options={{ type: 'simple' }}
            message="Oblicz wycenę swojego projektu z prostym kalkulatorem! 💰"
            variant="button"
          />
          <ShareCalculatorButton
            options={{ type: 'ai' }}
            message="Sprawdź AI Kalkulator - analiza projektu w sekundach! 🤖"
            variant="button"
          />
        </div>

        <p className="text-slate-500 dark:text-gray-500 text-sm">
          🔒 Bezpiecznie • Bez zobowiązań • Wynik natychmiast na email
        </p>
      </div>
    </div>
  )
}
