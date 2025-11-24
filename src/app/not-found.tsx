'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 leading-none">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-slate-600 dark:text-slate-400" />
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Strona nie znaleziona
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
          Nie możemy znaleźć strony, której szukasz. Sprawdź adres URL lub wróć na stronę główną.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Link
            href="/"
            className="flex-1 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            <Home className="w-5 h-5" />
            Strona główna
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex-1 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Wróć
          </button>
        </div>

        {/* Popular links */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Popularne strony:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#kalkulator"
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Kalkulator wyceny
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link
              href="/#portfolio"
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Portfolio
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link
              href="/#kontakt"
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
