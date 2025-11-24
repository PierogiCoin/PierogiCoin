'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Handshake, Monitor, Smartphone, Zap, Search, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 'design',
    title: 'UI/UX Design',
    description: "Projekty, które nie tylko wyglądają, ale sprzedają. Tworzę intuicyjne interfejsy, w których użytkownik od razu wie, co ma zrobić.",
    icon: PenTool,
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    id: 'dev',
    title: 'Web Development',
    description: "Koduję w Next.js i React. Twoja strona będzie szybka jak błyskawica, bezpieczna i łatwa w rozbudowie w przyszłości.",
    icon: Monitor,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-teal-500/20"
  },
  {
    id: 'mobile',
    title: 'RWD & Mobile First',
    description: "Ponad 70% ruchu to smartfony. Twoja strona będzie wyglądać perfekcyjnie na każdym ekranie - od iPhone'a po telewizor.",
    icon: Smartphone,
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 'seo',
    title: 'SEO & Wydajność',
    description: "Google kocha szybkie strony. Optymalizuję kod tak, abyś był wysoko w wynikach wyszukiwania bez wydawania fortuny na reklamy.",
    icon: Search,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: 'conversion',
    title: 'Konwersja & Sprzedaż',
    description: "Każdy przycisk i nagłówek ma cel. Projektuję ścieżki użytkownika tak, aby zamieniały odwiedzających w płacących klientów.",
    icon: Handshake,
    color: "text-green-400",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 'speed',
    title: 'Szybkość (Core Vitals)',
    description: "Nikt nie lubi czekać. Moje strony ładują się w ułamku sekundy, co drastycznie zmniejsza współczynnik odrzuceń.",
    icon: Zap,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // Animacja startuje, gdy sekcja jest widoczna w 20%
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-white dark:bg-black relative overflow-hidden pt-0">
      {/* Dekoracyjne tło (glow) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Co mogę dla Ciebie <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">zbudować?</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Nie tworzę tylko &quot;ładnych obrazków&quot;. Dostarczam kompletne rozwiązania biznesowe, które zarabiają.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="service-card group relative p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradientowy hover effect w tle */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Ikona */}
                <div className={`w-14 h-14 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                  <service.icon size={28} />
                </div>

                {/* Treść */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-gray-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}