'use client';

import React, { useRef, Suspense, memo } from 'react';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '../store/useAppStore';

// Załóżmy, że ten komponent istnieje w innym pliku
const Hero3DBackground = memo(() => { return <div className="w-full h-full bg-black"></div>; });
Hero3DBackground.displayName = 'Hero3DBackground';

// --- Konfiguracja ---
const COUNTDOWN_ITEMS = [
    { word: "Kreatywność", color: new THREE.Color('#ff0099') },
    { word: "Technologia", color: new THREE.Color('#0070f3') },
    { word: "Rezultaty", color: new THREE.Color('#34a853') },
];
const sounds = {
    whoosh: new Howl({ src: ['/sounds/whoosh.mp3'], volume: 0.3 }),
    sweep: new Howl({ src: ['/sounds/sweep.mp3'], volume: 0.5 }),
    shine: new Howl({ src: ['/sounds/shine.mp3'], volume: 0.4 }),
    transition: new Howl({ src: ['/sounds/transition.mp3'], volume: 0.6 }),
};

/**
 * Hook zarządzający całą logiką animacji Preloader'a.
 */
const usePreloaderAnimation = (ref: React.RefObject<HTMLDivElement>, onFinish: () => void) => {
    useGSAP(() => {
        const preloader = ref.current;
        if (!preloader) return;

        // Natychmiastowe sprawdzenie motywu, aby uniknąć mignięcia
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        const isDarkMode = storedTheme ? storedTheme === 'dark' : prefersDark;
        
        gsap.set(preloader, { backgroundColor: isDarkMode ? '#0B1121' : '#ffffff' });

        const masterTimeline = gsap.timeline({
            delay: 0.5,
            onComplete: () => {
                sounds.transition.play();
                gsap.to(preloader, { 
                    scale: 1.05, filter: 'blur(8px)', autoAlpha: 0, 
                    duration: 0.8, ease: 'power3.in',
                    onComplete: onFinish 
                });
            }
        });
        
        masterTimeline.fromTo(['.preloader-bg', '.preloader-content'], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: 'power2.out' });
        
        const wordsTimeline = gsap.timeline();
        COUNTDOWN_ITEMS.forEach((item, index) => {
            wordsTimeline
                .fromTo(`.countdown-word-${index}`, { yPercent: 100, autoAlpha: 0 }, {
                    yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out',
                    // POPRAWKA: Użycie bloku kodu, aby funkcja onStart zwracała 'void'
                    onStart: () => { sounds.whoosh.play(); } 
                })
                .to(`.countdown-word-${index}`, { yPercent: -100, autoAlpha: 0, duration: 0.6, ease: 'power3.in', delay: 0.6 });
        });
        
        masterTimeline
            .add(wordsTimeline, 0.5)
            .fromTo('.logo-mask-inner', { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'power3.inOut', onStart: () => { sounds.sweep.play(); } }, "<0.5")
            .fromTo('.logo-shine', { xPercent: -150 }, { xPercent: 150, duration: 1, ease: 'power2.inOut', onStart: () => { sounds.shine.play(); } }, "<0.3")
            .to('.preloader-content', { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, "+=0.8");

    }, { scope: ref });
};

/**
 * Główny Komponent Preloader'a
 */
export const PreloaderMasterpiece: React.FC = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const finishPreloader = useAppStore((state) => state.finishPreloader);

    usePreloaderAnimation(preloaderRef, finishPreloader);

    return (
        <div ref={preloaderRef} className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="preloader-bg absolute inset-0 opacity-0">
                <Suspense fallback={null}><Hero3DBackground /></Suspense>
            </div>

            <div className="preloader-content relative text-center opacity-0">
                <div className="relative overflow-hidden mb-8 logo-mask">
                    <h1 id="preloader-logo" className="text-4xl md:text-5xl font-extrabold tracking-wider text-slate-900 dark:text-white">
                        <span className="logo-mask-inner inline-block">LykKreacji</span>
                    </h1>
                    <div className="logo-shine absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
                </div>
                
                <div className="relative h-10 text-xl md:text-2xl text-slate-500 dark:text-slate-400 overflow-hidden">
                    {COUNTDOWN_ITEMS.map((item, index) => (
                        <div key={item.word} className={`countdown-word countdown-word-${index} absolute inset-0 flex items-center justify-center opacity-0`}>{item.word}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};