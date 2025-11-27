'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
    { name: "Kłodzko", slug: "/strony-internetowe-klodzko", top: "50%", left: "50%", main: true },
    { name: "Polanica-Zdrój", slug: "/strony-internetowe-polanica-zdroj", top: "45%", left: "40%" },
    { name: "Bystrzyca Kł.", slug: "/strony-internetowe-bystrzyca-klodzka", top: "65%", left: "55%" },
    { name: "Wrocław", slug: "/strony-internetowe-wroclaw", top: "20%", left: "70%", highlight: true },
    { name: "Wałbrzych", slug: "/strony-internetowe-walbrzych", top: "35%", left: "30%" },
    { name: "Świdnica", slug: "/strony-internetowe-swidnica", top: "30%", left: "45%" },
];

export default function ServiceAreaMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(".map-point",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-white dark:bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-16">
                <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                    Działamy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Lokalnie</span> i Globalnie
                </h2>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                    Nasza baza to Kłodzko, ale obsługujemy klientów z całego Dolnego Śląska i Polski.
                </p>
            </div>

            <div className="max-w-4xl mx-auto relative aspect-[16/9] bg-slate-100 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden">
                {/* Abstract Map Background */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                {/* Stylized River/Roads (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,40 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
                    <path d="M50,0 Q60,25 50,50 T50,100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
                </svg>

                {/* Points */}
                {LOCATIONS.map((loc, i) => (
                    <Link
                        key={i}
                        href={loc.slug}
                        className={`map-point absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 transition-transform hover:scale-110 z-10`}
                        style={{ top: loc.top, left: loc.left }}
                    >
                        <div className={`relative flex items-center justify-center w-4 h-4 rounded-full ${loc.main ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)]' : 'bg-slate-400 dark:bg-slate-600'}`}>
                            {loc.main && <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-75" />}
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm border transition-colors ${loc.highlight ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 'bg-white/50 dark:bg-black/50 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 group-hover:text-cyan-500 group-hover:border-cyan-500/50'}`}>
                            {loc.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
