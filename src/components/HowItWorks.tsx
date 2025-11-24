'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Lightbulb, Palette, Code, Rocket, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: 1,
    title: "Konsultacja & Strategia",
    desc: "Analizujemy Twój biznes i konkurencję. Ustalamy cele sprzedażowe, a nie tylko wygląd.",
    benefit: "Otrzymujesz plan działania i wstępną makietę.",
    icon: Lightbulb,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20"
  },
  {
    id: 2,
    title: "Design & UX",
    desc: "Projektuję unikalną szatę graficzną, która wyróżni Cię na tle konkurencji i poprowadzi klienta do zakupu.",
    benefit: "Widzisz dokładnie, jak będzie wyglądać Twoja strona.",
    icon: Palette,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20"
  },
  {
    id: 3,
    title: "Development & Kodowanie",
    desc: "Wdrażam projekt używając najnowszych technologii (Next.js), dbając o szybkość i SEO.",
    benefit: "Strona ładuje się błyskawicznie i jest gotowa na Google.",
    icon: Code,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20"
  },
  {
    id: 4,
    title: "Wdrożenie & Wsparcie",
    desc: "Instalujemy stronę na serwerze, podpinamy domenę i szkolę Cię z obsługi.",
    benefit: "Masz gotowe narzędzie do zarabiania + 30 dni wsparcia.",
    icon: Rocket,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20"
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const steps = gsap.utils.toArray('.step-card');
    
    // Animacja paska łączącego
    gsap.fromTo(lineRef.current, 
      { height: '0%' },
      { 
        height: '100%', 
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5
        }
      }
    );

    // Animacja kart
    steps.forEach((step: any, i) => {
      gsap.fromTo(step,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        { 
          opacity: 1, x: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Nagłówek sekcji */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Jak wygląda <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">współpraca?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Prosty proces w 4 krokach. Bez technicznego żargonu, bez stresu. Ty zajmujesz się biznesem, ja resztą.
          </p>
        </div>

        {/* Linia centralna (tylko desktop) */}
        <div className="absolute left-1/2 top-32 bottom-0 w-0.5 bg-gray-800 hidden md:block -translate-x-1/2">
          <div ref={lineRef} className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500 origin-top" />
        </div>

        {/* Kroki */}
        <div className="space-y-12 md:space-y-24 relative z-10">
          {STEPS.map((step, index) => (
            <div key={step.id} className={`step-card flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Ikona / Numer */}
              <div className="relative flex-shrink-0 z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.bg} ${step.border} border backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center text-sm font-bold text-white">
                  {step.id}
                </div>
              </div>

              {/* Treść */}
              <div className={`flex-1 text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {step.desc}
                </p>
                
                {/* Benefit Box */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm ${step.color}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-medium">{step.benefit}</span>
                </div>
              </div>

              {/* Pusty div dla balansu na desktopie */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}