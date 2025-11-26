'use client';

import React, { useRef, ReactElement } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
    children: ReactElement;
    strength?: number; // Siła przyciągania (domyślnie 0.5)
    active?: boolean;  // Czy efekt jest aktywny (domyślnie true)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    strength = 0.5,
    active = true
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!active) return;

        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: ref, dependencies: [active, strength] });

    // Klonujemy dziecko, aby dodać mu ref, jeśli to możliwe, 
    // ale tutaj używamy wrappera div, aby nie ingerować w propsy dziecka zbyt mocno.
    // Dla najlepszego efektu, dziecko powinno wypełniać ten div.
    return (
        <div ref={ref} className="inline-block cursor-pointer">
            {children}
        </div>
    );
};
