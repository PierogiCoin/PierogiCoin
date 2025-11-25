'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, Database, Globe, Layout, Server, Smartphone, Cpu, Layers, Zap, ShieldCheck 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Lista technologii (możesz podmienić ikony na SVG logotypy dla lepszego efektu)
const SKILLS = [
  { name: "Next.js", icon: Globe },
  { name: "React", icon: Code2 },
  { name: "TypeScript", icon: Layout },
  { name: "Tailwind CSS", icon: Layers },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "GSAP", icon: Zap },
  { name: "Mobile First", icon: Smartphone },
  { name: "SEO", icon: Cpu },
  { name: "Security", icon: ShieldCheck },
];

// Duplikujemy listę, aby uzyskać efekt nieskończoności
const MARQUEE_ITEMS = [...SKILLS, ...SKILLS, ...SKILLS];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      // Obliczamy szerokość pojedynczego zestawu (1/3 całości)
      const totalWidth = marquee.scrollWidth;
      const singleSetWidth = totalWidth / 3;

      // Animacja nieskończonego przewijania
      gsap.to(marquee, {
        x: -singleSetWidth, // Przesuwamy tylko o jedną długość zestawu
        duration: 20,       // Czas trwania jednego cyklu (im więcej, tym wolniej)
        ease: "none",
        repeat: -1,         // Nieskończona pętla
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % singleSetWidth) // Resetuje pozycję bez skoku
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-black border-y border-white/5 relative overflow-hidden">
      
      {/* Nagłówek sekcji (opcjonalny, mały) */}
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">
          Technologie, których używam
        </p>
      </div>

      {/* Gradientowe maski po bokach (Fade effect) */}
      <div className="absolute top-0 left-0 w-20 sm:w-40 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 sm:w-40 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        <div ref={marqueeRef} className="flex items-center gap-16 sm:gap-24 px-4 whitespace-nowrap will-change-transform">
          {MARQUEE_ITEMS.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="group flex flex-col items-center justify-center gap-4 opacity-40 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              {/* Ikona z efektem Glow */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] transform group-hover:scale-110">
                <skill.icon strokeWidth={1.5} className="w-full h-full" />
              </div>
              
              {/* Nazwa */}
              <span className="text-xs sm:text-sm font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-wider">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}