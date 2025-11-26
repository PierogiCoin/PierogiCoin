import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export const Mockup: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            if (isActive) {
                gsap.fromTo(container, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
            } else {
                gsap.to(container, { autoAlpha: 0, scale: 0.9, duration: 0.8, ease: 'power2.out' });
            }
        });

        return () => ctx.revert();
    }, [isActive]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center p-8">
            <div className="relative w-full h-full">
                <Image
                    src="https://images.unsplash.com/photo-1549646639-f538356c9a35?q=80&w=2787&auto=format&fit=crop"
                    alt="Przykładowa grafika"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
};
