'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function ScrollProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        // Initial calculation
        updateScrollProgress();

        // Update on scroll with GSAP smooth interpolation
        const handleScroll = () => {
            requestAnimationFrame(updateScrollProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateScrollProgress);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateScrollProgress);
        };
    }, []);

    useEffect(() => {
        // Smooth animation for the progress bar
        gsap.to('.scroll-progress-fill', {
            scaleX: scrollProgress / 100,
            duration: 0.1,
            ease: 'none',
        });
    }, [scrollProgress]);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999] pointer-events-none">
            <div
                className="scroll-progress-fill h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 origin-left"
                style={{
                    transform: `scaleX(${scrollProgress / 100})`,
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                }}
            />
        </div>
    );
}
