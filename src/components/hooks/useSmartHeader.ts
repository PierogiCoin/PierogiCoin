import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// UWAGA: Usunięto błędną linię 'if (!gsap.getCache(ScrollTrigger))'.
// Zakładamy, że ScrollTrigger został już poprawnie zarejestrowany w AppLayout.tsx
// zgodnie z wcześniejszymi ustaleniami.

/**
 * Hook to manage smart header and scroll progress.
 * Animates the header and progress bar using GSAP for optimal performance.
 * @param headerRef Ref do elementu nagłówka (np. <header>).
 * @param progressBarRef Ref do elementu paska postępu (np. <div> lub <progress>).
 */
export const useSmartHeader = (
    headerRef: RefObject<HTMLElement>,
    progressBarRef: RefObject<HTMLElement>
) => {
    useEffect(() => {
        const headerElement = headerRef.current;
        const progressBarElement = progressBarRef.current;
        
        const triggers: ScrollTrigger[] = []; 
        let headerTl: gsap.core.Timeline | null = null;

        if (!headerElement || !progressBarElement) return;

        // --- GSAP Timeline dla Nagłówka ---
        headerTl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.3, ease: 'power2.inOut' }
        });
        headerTl.to(headerElement, { yPercent: -100 });

        // ScrollTrigger do ukrywania/pokazywania nagłówka
        const headerTrigger = ScrollTrigger.create({
            trigger: document.body, 
            start: '100px top', 
            end: 'max',
            onUpdate: (self) => {
                // Użycie opcjonalnego łańcucha na timeline jest bezpieczniejsze
                if (self.direction === -1) {
                    headerTl?.reverse(); // Scroll w górę: Pokaż nagłówek
                } else {
                    headerTl?.play(); // Scroll w dół: Ukryj nagłówek
                }
            }
        });
        triggers.push(headerTrigger);

        // --- ScrollTrigger do animacji paska postępu ---
        // Pasek postępu będzie animowany od 0% do 100% szerokości
        const progressTrigger = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            animation: gsap.to(progressBarElement, { width: '100%', ease: 'none' }),
            onRefresh: () => {
                // Odświeżenie przy ładowaniu leniwym
                ScrollTrigger.refresh(true); 
            }
        });
        triggers.push(progressTrigger);

        // --- Czyszczenie ---
        return () => {
            triggers.forEach(trigger => trigger.kill());
            if (headerTl) {
                headerTl.kill();
            }
        };
    }, [headerRef, progressBarRef]);

    return {};
};