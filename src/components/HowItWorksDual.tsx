'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Lightbulb, Palette, Code2, Rocket, CheckCircle2, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "01",
    title: "Konsultacja & Strategia",
    desc: "Nie zaczynam od kodowania. Zaczynam od pytania: 'Co ta strona ma sprzedawać?'. Analizujemy Twoją konkurencję i ustalamy lejek sprzedażowy.",
    benefit: "Plan działania i makieta UX.",
    icon: Lightbulb,
    color: "text-yellow-400",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: "02",
    title: "Design & Prototyp",
    desc: "Tworzę unikalny projekt graficzny w Figmie. Żadnych gotowych szablonów. Każdy piksel jest zaprojektowany pod Twoją markę i konwersję.",
    benefit: "Wizualizacja 1:1 przed startem prac.",
    icon: Palette,
    color: "text-purple-400",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    id: "03",
    title: "Development (Next.js)",
    desc: "Wdrażam projekt przy użyciu najnowszych technologii (Next.js 14, React). Strona jest ultra-szybka, bezpieczna i zoptymalizowana pod Google (SEO).",
    benefit: "Kod czysty, szybki i skalowalny.",
    icon: Code2,
    color: "text-cyan-400",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    id: "04",
    title: "Testy & Wdrożenie",
    desc: "Sprawdzam działanie na każdym urządzeniu. Konfiguruję domenę, serwer, certyfikat SSL i analitykę. Przekazuję Ci gotowy produkt.",
    benefit: "Gotowa maszyna do sprzedaży.",
    icon: Rocket,
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-500"
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const steps = gsap.utils.toArray<HTMLElement>('.step-card');
    
    // Animacja Linii Postępu (Wypełnianie w dół)
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        }
      }
    );

    // Animacja Kart (Wjeżdżanie z boków)
    steps.forEach((step, i) => {
      gsap.fromTo(step,
        { 
          opacity: 0, 
          x: i % 2 === 0 ? -50 : 50 // Parzyste z lewej, nieparzyste z prawej
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section id="jak-pracujemy" ref={containerRef} className="py-24 bg-black relative overflow-hidden">
      
      {/* Tło */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Nagłówek */}
        <div className="text-center mb-20">
          <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-4">Proces Współpracy</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Od pomysłu do <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">efektu.</span>
          </h2>
        </div>

        {/* Oś Czasu (Timeline Container) */}
        <div className="relative">
          
          {/* Pionowa Linia (Tło) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
          
          {/* Pionowa Linia (Aktywna - Gradient) */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500 -translate-x-1/2 origin-top" 
          />

          <div className="space-y-12 md:space-y-24">
            {STEPS.map((step, index) => (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Pusta przestrzeń (dla układu naprzemiennego) */}
                <div className="flex-1 hidden md:block" />

                {/* Punkt na osi (Kropka) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-white/20 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,0,0,1)]">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.gradient}`} />
                </div>

                {/* Karta Kroku */}
                <div className="flex-1 pl-12 md:pl-0 w-full">
                  <div className={`step-card relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    
                    {/* Numer w tle */}
                    <div className="absolute -top-6 -right-4 text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">
                      {step.id}
                    </div>

                    {/* Ikona */}
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className={`w-7 h-7 ${step.color}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{step.desc}</p>

                    {/* Sekcja "Co zyskujesz" */}
                    <div className="flex items-start gap-3 pt-6 border-t border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-gray-500 uppercase font-bold block mb-1">Co zyskujesz?</span>
                        <span className="text-gray-300 text-sm font-medium">{step.benefit}</span>
                      </div>
                    </div>

                    {/* Dekoracyjny Glow po hoverze */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Strzałka na dole */}
        <div className="flex justify-center mt-20">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-bounce text-gray-500">
                <ArrowDown size={20} />
            </div>
        </div>

      </div>
    </section>
  );
}