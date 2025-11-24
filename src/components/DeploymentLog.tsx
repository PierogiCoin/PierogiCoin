'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';

type DeploymentLogProps = {
    lines: readonly string[];
};

export type DeploymentLogHandle = {
    play: () => gsap.core.Timeline;
};

export const DeploymentLog = forwardRef<DeploymentLogHandle, DeploymentLogProps>(({ lines }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            const logLines = gsap.utils.toArray('.log-line', containerRef.current);
            const tl = gsap.timeline();
            // Animujemy pojawianie się linii logu
            tl.fromTo(logLines, 
                { opacity: 0 }, 
                { opacity: 1, stagger: 0.1, duration: 0.2 }
            );
            return tl;
        }
    }));
    
    return (
        <div ref={containerRef} className="absolute inset-0 p-6 font-mono text-sm leading-6">
            {lines.map((line, i) => (
                <p key={i} className="log-line text-green-400 opacity-0">{`[${i+1}/${lines.length}] ${line}`}</p>
            ))}
        </div>
    );
});

DeploymentLog.displayName = 'DeploymentLog';
