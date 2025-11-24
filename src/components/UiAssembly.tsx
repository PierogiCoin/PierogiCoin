import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const UiAssembly: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const elements = gsap.utils.toArray<HTMLDivElement>('.ui-element', containerRef.current);
        
        gsap.set(elements, { 
            y: 50, 
            opacity: 0,
            scale: 0.8,
            rotationX: 30
        });

        const tl = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        });

        tl.to(elements[0], { y: 0, opacity: 1, scale: 1, rotationX: 0 })
          .to(elements[1], { y: 0, opacity: 1, scale: 1, rotationX: 0 }, "-=0.5")
          .to(elements[2], { y: 0, opacity: 1, scale: 1, rotationX: 0 }, "-=0.4")
          .to(elements[3], { y: 0, opacity: 1, scale: 1, rotationX: 0 }, "-=0.3");

        return () => { tl.kill(); };
    }, [isActive]);

    return (
        <div 
            ref={containerRef} 
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 space-y-4 bg-gray-900/50 rounded-md"
            style={{ perspective: '800px' }}
        >
            <div className="w-3/4 h-8 bg-primary/30 rounded ui-element" />
            <div className="w-full h-24 bg-white/10 rounded-lg ui-element" />
            <div className="flex w-full space-x-4 ui-element">
                <div className="w-1/2 h-12 bg-primary rounded-lg" />
                <div className="w-1/2 h-12 bg-white/10 rounded-lg" />
            </div>
            <div className="w-2/3 h-16 bg-white/10 rounded-lg ui-element" />
        </div>
    );
};
