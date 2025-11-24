'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Portfolio - moje projekty
const PROJECTS = [
  {
    id: 1,
    title: "PierogiMeme.io",
    category: "Krypto / Web3",
    image: "/projects/pierogi.jpg",
    link: "https://pierogimeme.io",
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 2,
    title: "BHP Stronie Śląskie",
    category: "Strona Firmowa",
    image: "/projects/bhp.png",
    link: "https://bhpstronieslaskie.pl",
    color: "from-blue-600 to-cyan-500"
  }
];

export const PortfolioScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Obliczamy szerokość przewijania
    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Tylko dla Desktopu (> 768px) uruchamiamy poziomy scroll
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(container, {
        x: () => -(totalWidth - viewportWidth + 100), // +100 marginesu
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Przyklejamy sekcję
          scrub: 1, // Płynne przewijanie z opóźnieniem
          start: "top top",
          end: () => `+=${totalWidth}`, // Długość scrolla zależna od szerokości kontentu
          invalidateOnRefresh: true,
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-slate-50 dark:bg-black overflow-hidden">
      
      {/* Desktop: Sticky Container (dla mobile to zwykły blok) */}
      <div className="md:h-screen md:flex md:items-center py-20 md:py-0">
        
        {/* Nagłówek (Sticky na mobile, statyczny wewnątrz flexa na desktop) */}
        <div className="px-4 md:absolute md:top-20 md:left-10 md:z-20 mb-12 md:mb-0">
          <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-2">Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Wybrane <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Realizacje</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-md">
            Projekty, które łączą design z technologią. Zobacz, co stworzyłem dla innych.
          </p>
        </div>

        {/* Kontener Kart (Przewijany poziomo na desktop, pionowo na mobile) */}
        <div 
          ref={containerRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-16 px-4 md:pl-[40vw] md:pr-20"
        >
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative w-full md:w-[600px] aspect-[16/9] md:aspect-[4/3] flex-shrink-0 rounded-3xl overflow-hidden bg-slate-200 dark:bg-gray-900 border border-slate-300 dark:border-white/10"
            >
              {/* Obrazek z efektem Zoom */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Placeholder obrazka (zastąp prawdziwym <img>) */}
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Overlay gradientowy */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Treść na karcie */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 bg-gradient-to-r ${project.color}`}>
                  {project.category}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                
                <Link href={project.link} target="_blank" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mt-4 group/link">
                  Zobacz projekt <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* Ikona w rogu */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45 group-hover:rotate-0">
                <ExternalLink size={20} />
              </div>
            </div>
          ))}
          
          {/* Karta "Zobacz więcej" na końcu */}
          <div className="w-full md:w-[400px] aspect-[16/9] md:aspect-[4/3] flex-shrink-0 flex items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group cursor-pointer">
             <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center mx-auto mb-4 text-slate-500 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                    <ArrowRight size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">To nie wszystko</h3>
                <p className="text-slate-600 dark:text-gray-500 mt-2">Skontaktuj się, aby zobaczyć więcej.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};