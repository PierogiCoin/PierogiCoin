'use client';

import React, { useRef, useReducer, useMemo, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import { Check, ChevronRight, RefreshCcw, Send, Sparkles, Info } from 'lucide-react';
import CalculatorIcons from "./icons/CalculatorIcons";
import SavedCalculationBanner from './SavedCalculationBanner';
import {
  saveCalculatorData,
  getSavedCalculatorData,
  markEmailAsSent,
  clearCalculatorData,
} from '@/lib/calculatorStorage';
import { parseCalculatorParams } from '@/lib/calculatorLinks'; 

gsap.registerPlugin(TextPlugin);

const AnimatedConstellationBackground = dynamic(() => import('./AnimatedConstellationBackground'), { ssr: false });
const { PageIcon, DesignIcon, FeaturesIcon, CartIcon, ClockIcon, LightbulbIcon } = CalculatorIcons;

// --- 1. DEFINICJA CENNIKA (Ceny rynkowe - Ty liczysz 70% z tego) ---
const BASE_PRICE = 1000; // Podstawa rynkowa
const PRICES = {
  type: {
    landing: 1500,
    website: 3000,
    ecommerce: 5500,
    app: 10000,
  },
  design: {
    template: 300,
    custom: 1500,
    premium: 3000,
  },
  features: {
    cms: 1000,
    seo: 800,
    multilang: 1200,
    payments: 1000,
    animations: 800,
  },
  deadline: {
    standard: 1,    // x1
    fast: 1.25,     // +25%
    express: 1.5,   // +50%
  }
};

// --- 2. STAN I LOGIKA ---
const initialState = {
  step: 1,
  selections: {
    type: '',
    design: '',
    features: [],
    deadline: 'standard',
  },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_SELECTION':
      return {
        ...state,
        selections: { ...state.selections, [action.field]: action.value }
      };
    case 'TOGGLE_FEATURE':
      const features = state.selections.features.includes(action.value)
        ? state.selections.features.filter((f: string) => f !== action.value)
        : [...state.selections.features, action.value];
      return {
        ...state,
        selections: { ...state.selections, features }
      };
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: Math.max(1, state.step - 1) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Check for URL parameters and saved calculation on mount
  useEffect(() => {
    // Check URL parameters first
    const urlParams = parseCalculatorParams();
    if (urlParams?.preselect) {
      const { projectType, design, features, deadline } = urlParams.preselect;
      
      if (projectType) {
        dispatch({ type: 'SET_SELECTION', field: 'type', value: projectType });
      }
      if (design) {
        dispatch({ type: 'SET_SELECTION', field: 'design', value: design });
      }
      if (features && features.length > 0) {
        dispatch({ type: 'SET_SELECTION', field: 'features', value: features });
      }
      if (deadline) {
        dispatch({ type: 'SET_SELECTION', field: 'deadline', value: deadline });
      }
      
      // Track preselected calculator view
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculator_preselected', {
          project_type: projectType,
          design: design,
          features: features?.join(','),
          deadline: deadline
        });
      }
    } else {
      // Check for saved calculation only if no URL params
      const saved = getSavedCalculatorData();
      if (saved) {
        setShowBanner(true);
      }
    }
  }, []);

  // Save calculation whenever selections or price changes
  useEffect(() => {
    // Only save if we have at least type and design selected
    if (state.selections.type && state.selections.design) {
      const price = calculation.myPrice;
      saveCalculatorData(state.selections, price, isSent);
    }
  }, [state.selections, calculation.myPrice, isSent]);

  // Handle restore from saved calculation
  const handleRestoreSavedCalculation = (selections: any) => {
    dispatch({ type: 'SET_SELECTION', field: 'type', value: selections.type });
    dispatch({ type: 'SET_SELECTION', field: 'design', value: selections.design });
    dispatch({ type: 'SET_SELECTION', field: 'features', value: selections.features });
    dispatch({ type: 'SET_SELECTION', field: 'deadline', value: selections.deadline });
    
    // Go to summary step
    dispatch({ type: 'NEXT_STEP' });
    dispatch({ type: 'NEXT_STEP' });
    dispatch({ type: 'NEXT_STEP' });
    dispatch({ type: 'NEXT_STEP' });
    
    setShowBanner(false);
  };

  // --- 3. OBLICZANIE CENY (MAGIA) ---
  const calculation = useMemo(() => {
    let marketPrice = BASE_PRICE;

    // Dodaj typ
    if (state.selections.type) marketPrice += PRICES.type[state.selections.type as keyof typeof PRICES.type] || 0;
    
    // Dodaj design
    if (state.selections.design) marketPrice += PRICES.design[state.selections.design as keyof typeof PRICES.design] || 0;
    
    // Dodaj funkcje
    state.selections.features.forEach((f: string) => {
      marketPrice += PRICES.features[f as keyof typeof PRICES.features] || 0;
    });

    // Mnożnik czasu
    const multiplier = PRICES.deadline[state.selections.deadline as keyof typeof PRICES.deadline] || 1;
    marketPrice *= multiplier;

    // TWOJA CENA (70% rynkowej)
    const myPrice = Math.round(marketPrice * 0.7);
    const savings = Math.round(marketPrice - myPrice);

    return { marketPrice, myPrice, savings };
  }, [state.selections]);

  // Animacja zmiany kroku
  useGSAP(() => {
    gsap.fromTo(".step-content", 
      { opacity: 0, x: 20 }, 
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [state.step] });

  // Funkcja wysyłania
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Proszę podać prawidłowy adres email');
      return;
    }
    
    setIsSending(true);
    
    try {
      // Przygotowanie danych do wysłania
      const typeLabels: Record<string, string> = {
        landing: 'Landing Page',
        website: 'Strona Firmowa',
        ecommerce: 'Sklep Online',
        app: 'Aplikacja Web'
      };
      
      const designLabels: Record<string, string> = {
        template: 'Ekonomiczny',
        custom: 'Indywidualny',
        premium: 'Premium + Animacje'
      };
      
      const featureLabels: Record<string, string> = {
        cms: 'Panel CMS',
        seo: 'Pakiet SEO',
        multilang: 'Wielojęzyczność',
        payments: 'Płatności',
        animations: 'Extra Animacje'
      };
      
      const summary = [
        {
          question: 'Typ projektu',
          answer: typeLabels[state.selections.type] || state.selections.type
        },
        {
          question: 'Styl designu',
          answer: designLabels[state.selections.design] || state.selections.design
        },
        {
          question: 'Funkcje dodatkowe',
          answer: state.selections.features.map((f: string) => featureLabels[f] || f).join(', ') || 'Brak'
        },
        {
          question: 'Termin realizacji',
          answer: state.selections.deadline === 'standard' ? 'Standardowy' : 
                  state.selections.deadline === 'fast' ? 'Szybki (+25%)' : 'Ekspresowy (+50%)'
        }
      ];
      
      // Wysłanie do API
      const response = await fetch('/api/generateOffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          estimate: {
            min: calculation.myPrice,
            max: calculation.myPrice
          },
          description: `Projekt typu: ${typeLabels[state.selections.type]}, Design: ${designLabels[state.selections.design]}, Funkcje: ${state.selections.features.map((f: string) => featureLabels[f]).join(', ')}`,
          selections: state.selections,
          summary: summary
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Nie udało się wysłać oferty');
      }
      
      const data = await response.json();
      console.log('Oferta wysłana:', data);
      
      setIsSent(true);
      
      // Mark email as sent in localStorage
      markEmailAsSent();
    } catch (error) {
      console.error('Błąd wysyłania:', error);
      alert('Wystąpił błąd podczas wysyłania oferty. Spróbuj ponownie.');
    } finally {
      setIsSending(false);
    }
  };

  // --- 4. RENDEROWANIE KROKÓW ---
  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <div className="step-content space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <PageIcon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" /> Czego potrzebujesz?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'landing', label: 'Landing Page', desc: 'Jedna strona sprzedażowa', price: 'od 2000 zł' },
                { id: 'website', label: 'Strona Firmowa', desc: 'Wizytówka z podstronami', price: 'od 4500 zł' },
                { id: 'ecommerce', label: 'Sklep Online', desc: 'Pełna sprzedaż produktów', price: 'od 8000 zł' },
                { id: 'app', label: 'Aplikacja Web', desc: 'Zaawansowany system', price: 'od 15000 zł' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    dispatch({ type: 'SET_SELECTION', field: 'type', value: opt.id });
                    dispatch({ type: 'NEXT_STEP' });
                  }}
                  className={`p-6 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] ${
                    state.selections.type === opt.id 
                      ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-lg text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-sm text-slate-600 dark:text-gray-400 mt-1">{opt.desc}</div>
                  <div className="text-xs text-cyan-600 dark:text-cyan-300 mt-3 font-mono">Rynkowo: {opt.price}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <DesignIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" /> Jaki design?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'template', label: 'Ekonomiczny', desc: 'Bazujący na gotowych, sprawdzonych rozwiązaniach. Szybki czas realizacji.' },
                { id: 'custom', label: 'Indywidualny', desc: 'Unikalny projekt graficzny dopasowany do Twojej marki od zera.' },
                { id: 'premium', label: 'Premium + Animacje', desc: 'Zaawansowane efekty, 3D, interakcje (efekt WOW).' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    dispatch({ type: 'SET_SELECTION', field: 'design', value: opt.id });
                    dispatch({ type: 'NEXT_STEP' });
                  }}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    state.selections.design === opt.id 
                      ? 'bg-cyan-500/20 border-cyan-500' 
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-sm text-slate-600 dark:text-gray-400">{opt.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => dispatch({ type: 'PREV_STEP' })} className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-sm mt-4">← Wróć</button>
          </div>
        );

      case 3:
        return (
          <div className="step-content space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FeaturesIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" /> Dodatki
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'cms', label: 'Panel CMS', desc: 'Edycja treści' },
                { id: 'seo', label: 'Pakiet SEO', desc: 'Pozycjonowanie' },
                { id: 'multilang', label: 'Wielojęzyczność', desc: 'PL / EN / DE' },
                { id: 'payments', label: 'Płatności', desc: 'Stripe / PayU' },
                { id: 'animations', label: 'Extra Animacje', desc: 'GSAP / Three.js' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => dispatch({ type: 'TOGGLE_FEATURE', value: opt.id })}
                  className={`p-4 rounded-lg border text-left transition-all flex justify-between items-center ${
                    state.selections.features.includes(opt.id)
                      ? 'bg-green-500/20 border-green-500 text-slate-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                  {state.selections.features.includes(opt.id) && <Check className="w-4 h-4 text-green-500 dark:text-green-400" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
                <button onClick={() => dispatch({ type: 'PREV_STEP' })} className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">← Wróć</button>
                <button 
                    onClick={() => dispatch({ type: 'NEXT_STEP' })}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2"
                >
                    Dalej <ChevronRight className="w-4 h-4" />
                </button>
            </div>
          </div>
        );

      case 4: // WYNIK
        return (
          <div className="step-content text-center" ref={resultRef}>
            {!isSent ? (
              <>
                <div className="mb-8 relative p-6 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-50 dark:from-gray-900 dark:to-black border border-slate-200 dark:border-gray-800">
                  <div className="text-slate-500 dark:text-gray-400 text-sm uppercase tracking-widest mb-2">Szacunkowa wartość rynkowa</div>
                  <div className="text-3xl font-bold text-slate-400 dark:text-gray-500 line-through decoration-red-500/50 decoration-2">
                    {calculation.marketPrice.toLocaleString()} PLN
                  </div>
                  
                  <div className="my-6 h-px bg-slate-300 dark:bg-gray-800 w-full" />
                  
                  <div className="text-cyan-600 dark:text-cyan-400 text-sm uppercase tracking-widest mb-2 font-bold flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" /> Twoja Cena Specjalna
                  </div>
                  <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {calculation.myPrice.toLocaleString()} PLN
                  </div>
                  <div className="inline-block bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
                    Oszczędzasz: {calculation.savings.toLocaleString()} PLN
                  </div>
                  
                  {/* Installment info */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                    <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">Płatność ratalna dostępna:</div>
                    <div className="flex justify-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(calculation.myPrice / 6).toLocaleString()}</div>
                        <div className="text-xs text-slate-400 dark:text-gray-500 mt-1">PLN / 6 miesięcy</div>
                      </div>
                      <div className="w-px bg-slate-300 dark:bg-gray-800"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(calculation.myPrice / 12).toLocaleString()}</div>
                        <div className="text-xs text-slate-400 dark:text-gray-500 mt-1">PLN / 12 miesięcy</div>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-500 mt-3 flex items-center justify-center gap-1">
                      ✨ Raty 0% - bez dodatkowych kosztów
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSend} className="space-y-4 max-w-sm mx-auto">
                  <p className="text-slate-600 dark:text-gray-300 text-sm mb-4">
                    Zostaw e-mail, aby otrzymać szczegółową wycenę PDF i zarezerwować ten termin.
                  </p>
                  <input
                    type="email"
                    required
                    placeholder="twoj@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSending ? <RefreshCcw className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                    {isSending ? 'Przetwarzanie...' : 'Odbierz Wycenę'}
                  </button>
                </form>
                <button 
                  onClick={() => {
                    dispatch({ type: 'RESET' });
                    clearCalculatorData();
                  }} 
                  className="mt-6 text-xs text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white underline"
                >
                  Zacznij od nowa
                </button>
              </>
            ) : (
              <div className="py-10">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dziękuję!</h3>
                <p className="text-slate-600 dark:text-gray-400">Wycena została wysłana na Twój adres e-mail.</p>
                <p className="text-slate-500 dark:text-gray-500 text-sm mt-2">Skontaktuję się z Tobą w ciągu 24h.</p>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section ref={containerRef} className="relative w-full py-20 px-4 overflow-hidden bg-white dark:bg-black min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 opacity-40 dark:opacity-40 pointer-events-none hidden dark:block">
        <AnimatedConstellationBackground />
      </div>

      {/* Saved calculation banner */}
      {showBanner && (
        <SavedCalculationBanner onRestoreCalculation={handleRestoreSavedCalculation} />
      )}

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-black/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Pasek postępu */}
        <div className="flex justify-between mb-8 px-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s <= state.step ? 'bg-cyan-500 w-full mx-1' : 'bg-slate-300 dark:bg-gray-700 w-full mx-1'}`} />
          ))}
        </div>

        {renderStep()}
      </div>
    </section>
  );
}