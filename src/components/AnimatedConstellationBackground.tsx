'use client';

import React, { useMemo, memo } from 'react';
import dynamic from 'next/dynamic';

const Constellation = memo(() => {
    const deterministicRandom = (seed: number) => { const x = Math.sin(seed) * 10000; return x - Math.floor(x); };
    const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        duration: `${deterministicRandom(i * 10) * 20 + 20}s`,
        delay: `-${deterministicRandom(i * 20) * 20}s`,
        size: `${deterministicRandom(i * 30) * 1.5 + 0.5}px`,
        '--x-start': `${deterministicRandom(i * 40) * 100}vw`,
        '--y-start': `${deterministicRandom(i * 50) * 100}vh`,
        '--x-end': `${deterministicRandom(i * 60) * 100}vw`,
        '--y-end': `${deterministicRandom(i * 70) * 100}vh`,
    })), []);

    return (
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20 dark:opacity-40 transition-opacity duration-500">
            <g>
                {particles.map(p => (
                    <circle 
                        key={p.id} 
                        r={p.size} 
                        fill="currentColor" 
                        className="text-slate-400 dark:text-slate-700" 
                        style={{ 
                            animation: 'drift linear infinite alternate', 
                            animationDuration: p.duration, 
                            animationDelay: p.delay, 
                            '--x-start': p['--x-start'], 
                            '--y-start': p['--y-start'], 
                            '--x-end': p['--x-end'], 
                            '--y-end': p['--y-end'] 
                        } as any} 
                    />
                ))}
            </g>
        </svg>
    );
});
Constellation.displayName = 'Constellation';

const AnimatedConstellationBackground = dynamic(() => Promise.resolve(Constellation), { 
    ssr: false,
    loading: () => null // Nie pokazuj nic podczas ładowania
});

export default AnimatedConstellationBackground;