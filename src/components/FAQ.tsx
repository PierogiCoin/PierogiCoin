'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Ile trwa realizacja projektu?',
    answer: 'Standardowa strona firmowa to 2-4 tygodnie. Sklep e-commerce 4-8 tygodni. Oferujemy też tryb ekspresowy (+25% do ceny) z realizacją w 7-14 dni.'
  },
  {
    question: 'Czy mogę płacić w ratach?',
    answer: 'Tak! Oferujemy płatność w transzach (40% start, 30% po projekcie, 30% po wdrożeniu) oraz raty 0% rozłożone na 3-6 miesięcy dla projektów powyżej 10,000 zł.'
  },
  {
    question: 'Czy strona będzie responsywna (mobilna)?',
    answer: 'Absolutnie! Wszystkie nasze strony są w 100% responsywne i zoptymalizowane pod urządzenia mobilne, tablety i desktopy. Priorytetem jest mobile-first design.'
  },
  {
    question: 'Czy zajmujecie się pozycjonowaniem SEO?',
    answer: 'Tak. Podstawowe SEO (meta tagi, schema.org, sitemap) jest wliczone w cenę. Oferujemy też zaawansowane SEO jako osobną usługę - optymalizacja treści, link building, audyty.'
  },
  {
    question: 'Co jeśli będę chciał coś zmienić później?',
    answer: 'Pierwsza poprawka (do 2h pracy) w ciągu 30 dni po wdrożeniu jest gratis. Dalsze zmiany według cennika: 250 zł/h lub pakiety godzinowe z rabatem.'
  },
  {
    question: 'Czy dostaję dostęp do kodu źródłowego?',
    answer: 'Tak! Po zakończeniu projektu dostajesz pełny kod źródłowy, dokumentację techniczną i instrukcję obsługi. Jesteś właścicielem kodu.'
  },
  {
    question: 'Czy pomożecie z hostingiem i domeną?',
    answer: 'Oczywiście! Pomożemy wybrać hosting, założyć domenę i skonfigurować wszystko. Możemy też zarządzać hostingiem za Ciebie (opcja managed hosting).'
  },
  {
    question: 'Czy robicie aplikacje Web3/blockchain?',
    answer: 'Tak, to nasza specjalizacja! Tworzymy aplikacje Web3, smart kontrakty, integracje z walletami (MetaMask, WalletConnect) i platformy DeFi. Sprawdź nasze portfolio (PierogiMeme.io).'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Dekoracyjne gradienty jak w innych sekcjach */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-bold mb-6">
            <HelpCircle size={16} />
            <span>FAQ</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Najczęściej zadawane pytania
          </h2>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Nie znalazłeś odpowiedzi? Skontaktuj się z nami: <a href="tel:+48790629497" className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">790 629 497</a>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              
              {/* Answer */}
              <div 
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA pod FAQ */}
        <div className="mt-12 text-center p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 dark:from-cyan-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-3xl border border-cyan-500/30 dark:border-cyan-500/40">
          <p className="text-lg text-slate-800 dark:text-slate-200 font-medium mb-4">
            Masz inne pytanie?
          </p>
          <a 
            href="#kontakt" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105"
          >
            Skontaktuj się z nami
          </a>
        </div>

      </div>
    </section>
  );
}
