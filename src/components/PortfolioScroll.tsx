'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ExternalLink, Layers } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "BHP Stronie Śląskie",
    category: "Strona Firmowa",
    description: "Kompletny rebranding i wdrożenie strony dla firmy szkoleniowej. System zapisów, szybki kontakt i SEO lokalne.",
    image: "/projects/bhp.jpg", // Upewnij się, że plik istnieje w public/projects/
    link: "https://bhpstronieslaskie.pl",
    tech: ["Next.js", "Tailwind", "EmailJS"],
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: 2,
    title: "PierogiMeme.io",
    category: "Krypto / Web3",
    description: "Landing page dla projektu kryptowalutowego. Wysoka wydajność, animacje GSAP i integracja z social media.",
    image: "/projects/pierogi.jpg", // Upewnij się, że plik istnieje w public/projects/
    link: "https://pierogimeme.io",
    tech: ["React", "GSAP", "Web3"],
    color: "from-yellow-500 to-orange-600"
  }
];

export const PortfolioScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const bgText = bgTextRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    // --- DESKTOP ANIMATION ---
    mm.add("(min-width: 1024px)", () => {
      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollLength = totalWidth - viewportWidth;

      // Jeśli zawartość jest węższa niż ekran, nie scrollujemy poziomo
      if (scrollLength <= 0) return;

      // Główny Scroll Poziomy
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Przyklejamy sekcję
          scrub: 1,  // Płynność
          start: "top top",
          end: () => `+=${totalWidth}`, // Długość scrolla
          invalidateOnRefresh: true,
        }
      });

      tl.to(container, {
        x: -scrollLength - 50, // Przesuwamy kontener w lewo (z małym marginesem)
        ease: "none",
      });

      // Paralaksa Napisu w tle
      gsap.to(bgText, {
        x: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
        }
      });

      // Paralaksa Zdjęć wewnątrz kart
      gsap.utils.toArray<HTMLElement>(".project-image").forEach((img) => {
        gsap.to(img, {
          backgroundPosition: "100% center",
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: tl,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });
    });

  }, { scope: sectionRef });

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-black overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Tło Dekoracyjne */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Gigantyczny Napis w Tle */}
      <div 
        ref={bgTextRef} 
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[20vw] font-black text-white/5 pointer-events-none select-none leading-none"
      >
        SELECTED WORK
      </div>

      {/* Nagłówek Sekcji */}
      <div className="container mx-auto px-4 lg:px-8 mb-12 lg:absolute lg:top-12 lg:left-8 lg:z-20 lg:mb-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-cyan-500" />
          <span className="text-cyan-500 font-bold tracking-widest uppercase text-sm">Portfolio</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white max-w-xl leading-tight">
          Projekty, które <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">robią różnicę.</span>
        </h2>
      </div>

      {/* Kontener Kart */}
      <div className="w-full overflow-hidden lg:h-screen lg:flex lg:items-center">
        <div 
          ref={containerRef} 
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 lg:pl-[40vw] lg:pr-20 pb-20 lg:pb-0"
        >
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="group relative w-full lg:w-[700px] aspect-[16/10] flex-shrink-0 rounded-3xl overflow-hidden bg-gray-900 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl"
            >
              {/* Obrazek z Paralaksą */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="project-image w-[120%] h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    backgroundPosition: "0% center"
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Treść Karty */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Kategoria i Tech Stack */}
                <div className="flex flex-wrap items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${project.color}`}>
                    {project.category}
                  </span>
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300 border border-white/10 backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-base max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-500 mb-6">
                  {project.description}
                </p>

                <Link 
                  href={project.link} 
                  target="_blank"
                  className="inline-flex items-center gap-3 text-white font-bold group/btn w-fit"
                >
                  <span className="border-b border-cyan-500 pb-0.5 group-hover/btn:border-white transition-colors">Zobacz online</span>
                  <ArrowRight className="w-5 h-5 text-cyan-500 group-hover/btn:translate-x-2 group-hover/btn:text-white transition-transform duration-300" />
                </Link>
              </div>

              {/* Ikona w rogu */}
              <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <ExternalLink size={24} />
              </div>
            </div>
          ))}

          {/* Karta "Call to Action" na końcu */}
          <div className="w-full lg:w-[500px] aspect-[16/10] flex-shrink-0 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all group cursor-pointer relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <div className="relative z-10 text-center p-8">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 border border-white/10">
                    <Layers size={40} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Twój Projekt?</h3>
                <p className="text-gray-400 mb-8">Dołącz do grona zadowolonych klientów.</p>
                
                <Link href="/kalkulator" className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors">
                  Rozpocznij Wycenę
                </Link>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};