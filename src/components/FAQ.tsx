'use client';

import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "Ile kosztuje strona internetowa?",
    answer: "To zależy od skali projektu. Prosta wizytówka to inny koszt niż rozbudowany sklep. Dlatego stworzyłem Kalkulator Wyceny (dostępny w menu), który w 30 sekund poda Ci przybliżony koszt bez dzwonienia."
  },
  {
    question: "Jak długo trwa realizacja?",
    answer: "Standardowy Landing Page powstaje w 7-14 dni. Bardziej złożone projekty (sklepy, aplikacje) zajmują zwykle od 3 do 5 tygodni. Zawsze ustalamy harmonogram przed startem."
  },
  {
    question: "Czy wystawiasz fakturę VAT?",
    answer: "Tak, oczywiście. Na każdą usługę wystawiam pełną fakturę VAT 23%. To podstawa bezpiecznej współpracy B2B."
  },
  {
    question: "Czy strona będzie działać na telefonach?",
    answer: "Absolutnie. Projektuję w podejściu 'Mobile First'. Twoja strona będzie wyglądać i działać perfekcyjnie na każdym urządzeniu – od iPhone'a po duży monitor 4K."
  },
  {
    question: "Co potrzebuję, żeby zacząć?",
    answer: "Wystarczy pomysł. Jeśli masz teksty i zdjęcia – super. Jeśli nie – pomogę Ci je przygotować lub zorganizuję profesjonalny copywriting i sesję zdjęciową."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    gsap.fromTo(".faq-item",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-black relative overflow-hidden">
      
      {/* Dekoracyjne tło */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Nagłówek */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold mb-6">
            <HelpCircle size={16} />
            <span>Baza Wiedzy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Pytania i <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Odpowiedzi</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Wszystko, co musisz wiedzieć przed rozpoczęciem współpracy. <br />
            Nie znalazłeś odpowiedzi? Zadzwoń: <a href="tel:+48790626497" className="text-white hover:text-cyan-400 font-bold transition-colors underline decoration-cyan-500/50">+48 790 626 497</a>
          </p>
        </div>

        {/* Lista FAQ */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={`faq-item rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'bg-white/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-cyan-500 text-black rotate-180' : 'bg-white/5 text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <div 
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}