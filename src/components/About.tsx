'use client';

import type React from "react";
import { useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Code, Palette, Zap, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-komponent: Animowana Ramka ze Zdjęciem w SVG (POPRAWIONA) ---
const SpinningProfileImage = memo(() => {

  // KLUCZOWA POPRAWKA: Definicja zmiennej CSS dla koloru
  const strokeColor = 'hsl(var(--foreground))';

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <clipPath id="circleClip"><circle cx="50" cy="50" r="38" /></clipPath>
          <path id="textPath" d="M 15, 50 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
        </defs>

        <style>{`
          @keyframes spin-slow { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
          } 
          .animate-spin-slow { 
            animation: spin-slow 40s linear infinite; 
            transform-origin: center; 
          }
        `}</style>

        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          // Użycie zmiennej CSS dla koloru ramki
          stroke={strokeColor}
          strokeWidth="1.5"
          // Delikatna przezroczystość w jasnym motywie, pełna w ciemnym
          className="opacity-50 dark:opacity-80 animate-pulse"
        />
        <image
          href="/images/arkadiusz-lyczkowski.jpg"
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#circleClip)"
        />
        <text
          dy="-2"
          // Użycie zmiennej CSS dla koloru tekstu
          fill={strokeColor}
          fontSize="4.5"
          fontWeight="600"
          letterSpacing="0.2"
          className="opacity-70 dark:opacity-100"
        >
          <textPath href="#textPath" startOffset="50%" textAnchor="middle" className="animate-spin-slow">
            READY TO COLLABORATE • READY TO COLLABORATE •
          </textPath>
        </text>
      </svg>
    </div>
  );
});
SpinningProfileImage.displayName = 'SpinningProfileImage';

// --- Sub-komponent: Filar Pracy ---
interface PillarItemProps { icon: React.ReactNode; title: string; children: React.ReactNode; }
const PillarItem: React.FC<PillarItemProps> = ({ icon, title, children }) => (
  <li className="flex items-start gap-4 animated-about-element">
    <span className="bg-blue-500/10 dark:bg-cyan-400/10 p-3 rounded-full mt-1">{icon}</span>
    <div>
      <h3 className="font-bold text-lg text-slate-800 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-200">{children}</p>
    </div>
  </li>
);

// --- Główny Komponent "O Mnie" ---
const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const imageCol = imageColRef.current;
    const contentCol = contentColRef.current;
    if (!section || !imageCol || !contentCol) return;

    // Wstępne animacje wejścia
    gsap.from(".animated-about-element", {
      y: 50,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 70%" },
    });

    // Efekt 3D reagujący na ruch myszką
    const xToContent = gsap.quickTo(contentCol, "x", { duration: 0.8, ease: "power3.out" });
    const yToContent = gsap.quickTo(contentCol, "y", { duration: 0.8, ease: "power3.out" });
    const rotXToContent = gsap.quickTo(contentCol, "rotationX", { duration: 0.8, ease: "power3.out" });
    const rotYToContent = gsap.quickTo(contentCol, "rotationY", { duration: 0.8, ease: "power3.out" });
    const xToImg = gsap.quickTo(imageCol, "x", { duration: 0.8, ease: "power3.out" });
    const yToImg = gsap.quickTo(imageCol, "y", { duration: 0.8, ease: "power3.out" });
    const rotXToImg = gsap.quickTo(imageCol, "rotationX", { duration: 0.8, ease: "power3.out" });
    const rotYToImg = gsap.quickTo(imageCol, "rotationY", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Delikatniejsze przesunięcia na kolumnie treści
      xToContent(xPercent * 5);
      yToContent(yPercent * 5);
      rotXToContent(-yPercent * 1);
      rotYToContent(xPercent * 1);

      // Większe przesunięcia na obrazie
      xToImg(-xPercent * 15);
      yToImg(-yPercent * 15);
      rotXToImg(yPercent * 2);
      rotYToImg(-xPercent * 2);
    };

    const enableMotion = () => section.addEventListener("mousemove", handleMouseMove);
    const disableMotion = () => {
      section.removeEventListener("mousemove", handleMouseMove);
      // Resetowanie pozycji po opuszczeniu sekcji
      gsap.to([contentCol, imageCol], { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.5 });
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      // Aktywacja tylko na desktopie
      onEnter: () => { if (window.innerWidth >= 1024) enableMotion(); },
      onLeave: disableMotion,
      onLeaveBack: disableMotion,
      onEnterBack: () => { if (window.innerWidth >= 1024) enableMotion(); },
    });

    // Cleanup
    return () => {
      disableMotion();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      id="o-mnie"
      // Użycie klasy sekcji i tła
      className="section bg-slate-50 dark:bg-slate-900 relative overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-16 items-center">
        <div ref={imageColRef} className="lg:col-span-2 animated-about-element will-change-transform">
          <SpinningProfileImage />
        </div>
        <div ref={contentColRef} className="lg:col-span-3 will-change-transform">
          <h2 className="animated-about-element section-title text-slate-900 dark:text-white">
            Więcej Niż Kod. <br />Partnerstwo w Cyfrowej Kreacji.
          </h2>
          <p className="animated-about-element text-lg text-slate-600 dark:text-slate-200 leading-relaxed mb-8">
            Moja filozofia opiera się na rzemiośle. Przekształcam Twoją wizję w cyfrowe narzędzie,
            które autentycznie rezonuje z użytkownikami i napędza Twój biznes.
            To proces, w którym technologia spotyka się z empatią.
          </p>
          <ul className="space-y-6 mb-10" aria-label="Filary mojej pracy">
            <PillarItem icon={<Palette className="text-blue-500 dark:text-cyan-400 w-6 h-6" />} title="Strategia i Estetyka">
              Projektuję interfejsy, które nie tylko wyglądają świetnie, ale prowadzą użytkownika prosto do celu, budując zaufanie.
            </PillarItem>
            <PillarItem icon={<Code className="text-blue-500 dark:text-cyan-400 w-6 h-6" />} title="Niezawodność i Skalowalność">
              Tworzę solidne fundamenty, które rosną razem z Twoim biznesem. Czysty kod to gwarancja stabilności na lata.
            </PillarItem>
            <PillarItem icon={<Zap className="text-blue-500 dark:text-cyan-400 w-6 h-6" />} title="Szybkość i Użyteczność">
              Optymalizuję wydajność na każdym kroku, szanując czas Twoich klientów i poprawiając pozycję w wyszukiwarkach.
            </PillarItem>
          </ul>
          <div className="animated-about-element">
            <a
              href="#kontakt"
              aria-label="Skontaktuj się ze mną"
              className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              Porozmawiajmy o Twoim Projekcie
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(About);