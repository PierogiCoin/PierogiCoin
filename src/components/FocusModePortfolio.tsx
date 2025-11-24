'use client';

import React from 'react'; // <-- TUTAJ BYŁ BŁĄD (przecinek zamiast 'from')
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import { projectsData } from '@/data/projects';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { X, ArrowUpRight, Github } from 'lucide-react';
import { useEffect, useRef, memo } from 'react';

gsap.registerPlugin(Flip);

export const FocusModePortfolio: React.FC = memo(() => {
    const { isFocusMode, currentProjectIndex, exitFocusMode, focusElement } = useAppStore();
    const containerRef = useRef<HTMLDivElement>(null);

    const project = currentProjectIndex !== null ? projectsData[currentProjectIndex] : null;

    useEffect(() => {
        if (!project) return;
        const container = containerRef.current;
        if (isFocusMode && project && focusElement && container) {
            const state = Flip.getState(focusElement, { props: "opacity" });
            container.style.display = 'block';
            gsap.set(focusElement, { opacity: 0 });

            Flip.from(state, {
                target: container,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.fromTo(".focus-content", 
                        { autoAlpha: 0, y: 30 }, 
                        { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }
                    );
                }
            });
        }
    }, [isFocusMode, project, focusElement, containerRef]);

    const handleBackClick = () => {
        const container = containerRef.current;
        if (!container || !focusElement) return;
        
        gsap.to(".focus-content", {
            autoAlpha: 0, y: 30, duration: 0.3, stagger: { amount: 0.2, from: "end" },
            onComplete: () => {
                const state = Flip.getState(container, { props: "opacity" });
                gsap.set(focusElement, { opacity: 1 });

                Flip.from(state, {
                    target: focusElement,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        gsap.set(container, { display: 'none' });
                        exitFocusMode();
                    }
                });
            }
        });
    };

    if (!project) {
        return null;
    }

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white z-50 overflow-y-auto hidden"
        >
            <button onClick={handleBackClick} className="fixed top-6 right-6 z-50 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
                <X className="w-6 h-6" />
            </button>
            
            <div className="max-w-5xl mx-auto p-8 pt-24">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-2 focus-content">{project.title}</h1>
                <p className="text-xl text-blue-500 dark:text-cyan-400 mb-8 focus-content">{project.subtitle}</p>
                
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl mb-8 focus-content">
                    <Image src={project.screenshotUrl} alt={`${project.title} screenshot`} fill className="object-cover" />
                </div>
                
                <div className="focus-content">
                    <h2 className="text-2xl font-bold mb-4">Opis Projektu</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">{project.description}</p>
                </div>
                
                <div className="focus-content mt-8">
                    <h2 className="text-2xl font-bold mb-4">Użyte Technologie</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">{tag}</span>)}
                    </div>
                </div>

                <div className="flex gap-4 mt-8 focus-content">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                            Live Demo <ArrowUpRight className="w-5 h-5 ml-2" />
                        </a>
                    )}
                    {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition-all">
                            <Github className="w-5 h-5 mr-2" /> Zobacz Kod
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
});

FocusModePortfolio.displayName = 'FocusModePortfolio';