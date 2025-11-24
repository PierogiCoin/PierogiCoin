// components/CodeScrubber.tsx
'use client';
import React, { forwardRef, useImperativeHandle, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export type CodeScrubberHandle = {
  play: () => void;
};

interface CodeScrubberProps {
  data?: string[] | null;
}

const defaultCodeData = [
    'git init',
    'git add .',
    'git commit -m "feat: first commit"',
    'npm install react react-dom',
    'npm run dev',
    'Starting dev server...',
    'Client loaded and connected.',
];

export const CodeScrubber = forwardRef<CodeScrubberHandle, CodeScrubberProps>(({ data = defaultCodeData }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            timeline.current?.play();
        }
    }));

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // POPRAWKA 1: Jawne określenie typów elementów
        const lines = gsap.utils.toArray<HTMLElement>('.code-line span', container);
        const scrubArea = container.querySelector<HTMLElement>('.scrub-area'); // Jawna konwersja na HTMLElement

        const ctx = gsap.context(() => {
            timeline.current = gsap.timeline({ paused: true });

            // Animacja "wpisywania" liter
            lines.forEach(line => {
                const text = line.textContent || '';
                line.textContent = ''; // Czyścimy tekst
                
                timeline.current?.to(line, {
                    text: text, // Używamy pluginu TextPlugin
                    duration: text.length * 0.05, // Czas zależy od długości
                    ease: 'none',
                });
            });

            // Logika Scrubbera (przewijania myszką)
            if (scrubArea) {
                const onScrub = (e: MouseEvent | TouchEvent) => {
                    const rect = scrubArea.getBoundingClientRect();
                    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
                    const progress = gsap.utils.clamp(0, 1, y / rect.height);
                    timeline.current?.progress(progress).pause();
                };

                // POPRAWKA 2: Użycie anonimowych funkcji do prawidłowego typowania addEventListener
                scrubArea.addEventListener('mousemove', (e: MouseEvent) => onScrub(e));
                scrubArea.addEventListener('touchmove', (e: TouchEvent) => onScrub(e));
            }

        }, container);
        
        return () => ctx.revert();
    }, [data]);

    return (
        <div ref={containerRef} className="h-full flex flex-col p-4 relative">
            <div className="flex-grow overflow-auto">
                {(data || []).map((line, i) => (
                    <div key={i} className="code-line text-sm leading-relaxed flex items-center">
                        <span className="text-gray-500 w-8 flex-shrink-0 text-right pr-4">{i + 1}</span>
                        <span className="text-gray-300 block"></span>
                    </div>
                ))}
            </div>
            {/* Ten div to niewidoczny obszar, po którym przesuwamy myszką */}
            <div className="scrub-area absolute inset-0 cursor-ns-resize"></div>
        </div>
    );
});

CodeScrubber.displayName = 'CodeScrubber';