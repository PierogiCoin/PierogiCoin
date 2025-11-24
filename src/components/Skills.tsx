'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { NextjsIcon, ReactIcon, TypeScriptIcon, TailwindCssIcon, NodejsIcon, VercelIcon, MetaIconModern, GoogleIcon } from './icons/TechIcons';

// Powielamy tablicę, aby uzyskać efekt nieskończoności bez przerw
const SKILLS = [
  { icon: NextjsIcon, name: 'Next.js' },
  { icon: ReactIcon, name: 'React' },
  { icon: TypeScriptIcon, name: 'TypeScript' },
  { icon: TailwindCssIcon, name: 'Tailwind CSS' },
  { icon: NodejsIcon, name: 'Node.js' },
  { icon: VercelIcon, name: 'Vercel' },
  { icon: MetaIconModern, name: 'Meta Ads' },
  { icon: GoogleIcon, name: 'Google Ads' },
];

// Tworzymy potrójną listę dla płynnego loopa
const MARQUEE_ITEMS = [...SKILLS, ...SKILLS, ...SKILLS];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Obliczamy szerokość pojedynczego zestawu (1/3 całości)
    const totalWidth = marquee.scrollWidth;
    const singleSetWidth = totalWidth / 3;

    // Animacja nieskończonego przewijania
    const tl = gsap.to(marquee, {
      x: -singleSetWidth, // Przesuwamy o jedną długość zestawu
      duration: 20, // Czas trwania jednego cyklu (im więcej, tym wolniej)
      ease: "none",
      repeat: -1, // Nieskończoność
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % singleSetWidth) // Resetuje pozycję bez przeskoku
      }
    });

    // Pauza po najechaniu myszką
    marquee.addEventListener('mouseenter', () => tl.pause());
    marquee.addEventListener('mouseleave', () => tl.play());

  }, { scope: containerRef });

  return (
    <section id="technologie" ref={containerRef} className="py-20 bg-white dark:bg-black border-y border-slate-200 dark:border-white/5 overflow-hidden relative">
      
      {/* Gradientowe maski po bokach (fade effect) */}
      <div className="absolute top-0 left-0 w-20 sm:w-40 h-full bg-gradient-to-r from-slate-50 dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 sm:w-40 h-full bg-gradient-to-l from-slate-50 dark:from-black to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-12 px-4">
        <p className="text-sm font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2">Technologie</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Narzędzia, których używam do <span className="text-slate-500 dark:text-gray-500">budowania Twojego sukcesu</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden py-4">
        <div ref={marqueeRef} className="flex items-center gap-12 sm:gap-24 px-12 whitespace-nowrap will-change-transform">
          {MARQUEE_ITEMS.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="group flex flex-col items-center justify-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {/* Ikona */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                <skill.icon className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(100,100,100,0.2)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
              </div>
              
              {/* Nazwa (pojawia się po najechaniu) */}
              <span className="text-sm font-medium text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}