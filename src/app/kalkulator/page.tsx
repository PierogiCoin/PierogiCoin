'use client'

import React, { useState } from 'react'
import { StandardCalculator } from '@/components/Calculator/StandardCalculator'
import { AICalculator } from '@/components/Calculator/AiCalculator'
import { TechComparison } from '@/components/Calculator/TechComparison'
import { motion } from 'framer-motion'
import { Calculator, Sparkles } from 'lucide-react'

export default function CalculatorPage() {
  const [mode, setMode] = useState<'standard' | 'ai'>('ai')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kalkulator Wyceny Stron WWW LykKreacji',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PLN',
    },
    description:
      'Narzędzie do szybkiej wyceny stron internetowych, sklepów e-commerce i aplikacji webowych. Porównanie technologii WordPress i Next.js.',
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 px-4 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-purple-900/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
          >
            Wyceń Swój Projekt
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Wybierz metodę wyceny, która najbardziej Ci odpowiada. Skorzystaj z tradycyjnego
            kalkulatora lub pozwól sztucznej inteligencji dobrać rozwiązanie dla Ciebie.
          </motion.p>
        </div>

        {/* Mode Switcher */}
        <div className="flex justify-center">
          <div className="bg-white/5 p-1 rounded-full border border-white/10 flex relative">
            <button
              onClick={() => setMode('standard')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                mode === 'standard' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Standardowy
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                mode === 'ai' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Assistant
            </button>

            {/* Sliding Background */}
            <motion.div
              layout
              className="absolute top-1 bottom-1 bg-purple-600 rounded-full"
              initial={false}
              animate={{
                left: mode === 'standard' ? '4px' : '50%',
                width: mode === 'standard' ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                x: mode === 'standard' ? 0 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Calculator Container */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {mode === 'standard' ? <StandardCalculator /> : <AICalculator />}
        </motion.div>

        {/* Tech Comparison Section */}
        <TechComparison />
      </div>
    </main>
  )
}
