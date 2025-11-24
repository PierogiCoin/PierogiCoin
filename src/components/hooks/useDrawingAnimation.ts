import { useEffect } from 'react';
import { gsap } from 'gsap';
import type { RefObject } from 'react';

export const useDrawingAnimation = (
  containerRef: RefObject<HTMLDivElement>,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const mainElements = gsap.utils.toArray<SVGElement>('.drawing-svg-element', container);
    const glowElements = gsap.utils.toArray<SVGElement>('.glow-svg-element', container);
    const allLabels = gsap.utils.toArray<HTMLElement>('.drawing-label', container);
    
    const ctx = gsap.context(() => {
      // --- Reset stanu ---
      // Używamy opcji `autoAlpha: 0` do ukrycia elementów na początku.
      gsap.set([...mainElements, ...glowElements], { strokeDashoffset: (i, el) => (el as SVGPathElement).getTotalLength() || 500, autoAlpha: 0 });
      gsap.set(allLabels, { autoAlpha: 0 }); // Usunięto `y: 15`
      
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // --- Nowa, Lepsza Choreografia ---
      // 1. Pojawia się tytuł
      const title = allLabels.find(l => l.dataset.id === 'title');
      if (title) {
        tl.to(title, { autoAlpha: 1, duration: 0.6 }, "+=0.2");
      }

      // 2. Rysuje się główna ramka
      const frame = mainElements.find(el => el.dataset.id === 'frame');
      const frameGlow = glowElements.find(el => el.dataset.id === 'frame');
      if (frame && frameGlow) {
        tl.to([frame, frameGlow], { strokeDashoffset: 0, autoAlpha: 1, duration: 1 }, "-=0.2");
        tl.to(frameGlow, { autoAlpha: 0.8, yoyo: true, repeat: 1, duration: 0.5 }, "<");
      }

      // 3. Rysują się detale i pojawiają ich etykiety
      mainElements.forEach((el) => {
        if (el === frame) return;
        const id = el.dataset.id;
        const label = allLabels.find(l => l.dataset.id === id);
        
        const glowEl = glowElements.find(g => g.dataset.id === id);
        
        tl.to([el, glowEl], { strokeDashoffset: 0, autoAlpha: 1, duration: 0.8 }, "-=0.8");
        if (label) {
          tl.to(label, { autoAlpha: 1, duration: 0.5, ease: 'back.out(1.4)' }, "-=0.6");
        }
      });
      
      // 4. Finałowy "Oddech"
      tl.to(container, { scale: 1.02, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 }, "-=0.5");

      // --- Interaktywność ---
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = gsap.utils.mapRange(0, window.innerWidth, -5, 5, clientX);
        const y = gsap.utils.mapRange(0, window.innerHeight, -5, 5, clientY);
        gsap.to(container, { rotationY: x, rotationX: -y, duration: 1, ease: 'power1.out' });
      };
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, container);
    
    return () => ctx.revert();
  }, [isActive, containerRef]);
};
