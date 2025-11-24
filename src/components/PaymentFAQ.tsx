'use client';

import React, { useState } from 'react';
import { ChevronDown, CreditCard, Shield, CheckCircle } from 'lucide-react';

const faqs = [
  {
    question: "Jak działają płatności ratalne?",
    answer: "Oferujemy elastyczne raty 0% na okres 6 lub 12 miesięcy bez żadnych dodatkowych kosztów. Płatności realizowane są przez bezpieczne systemy: PayU, Przelewy24 lub Stripe."
  },
  {
    question: "Czy mogę płacić w transzach?",
    answer: "Tak! Standardowo dzielimy płatność na 3 transze: 30% przy starcie projektu, 40% po akceptacji prototypu, 30% po finalizacji. Możemy dostosować harmonogram do Twoich potrzeb."
  },
  {
    question: "Jakie metody płatności akceptujecie?",
    answer: "Akceptujemy przelewy bankowe, płatności online (PayU, Przelewy24, Stripe), płatności ratalne, oraz płatności kartą. Wszystkie transakcje są w pełni zabezpieczone."
  },
  {
    question: "Czy wystawiacie fakturę VAT?",
    answer: "Tak, wystawiamy faktury VAT 23% dla każdej transakcji. Faktury są wysyłane elektronicznie w ciągu 3 dni roboczych od otrzymania płatności."
  }
];

export default function PaymentFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-4">
          <CreditCard className="w-4 h-4" />
          Płatności
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Najczęściej zadawane pytania
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Wszystko o płatnościach i ratach
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-semibold text-slate-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Bezpieczne płatności</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Szyfrowanie SSL</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-500" />
          <span>Raty 0%</span>
        </div>
      </div>
    </div>
  );
}
