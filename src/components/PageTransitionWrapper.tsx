'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useLocale } from '@/i18n/LocaleProvider';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
    const { isTransitioning } = useLocale();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isTransitioning) {
            gsap.to(containerRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: 'power2.in'
            });
        } else {
            gsap.to(containerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, { dependencies: [isTransitioning], scope: containerRef });

    return (
        <div ref={containerRef} className="opacity-100">
            {children}
        </div>
    );
}
