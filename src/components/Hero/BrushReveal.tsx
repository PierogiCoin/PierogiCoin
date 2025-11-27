"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface BrushRevealProps {
    children: React.ReactNode;
    delay?: number;
}

export const BrushReveal: React.FC<BrushRevealProps> = ({ children, delay = 0 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        if (!maskRef.current) return;

        // Initial state: path length is 0 (invisible)
        const length = maskRef.current.getTotalLength();
        gsap.set(maskRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length,
            autoAlpha: 1,
        });

        // Animate stroke to reveal content
        gsap.to(maskRef.current, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            delay: delay,
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {/* The content to be revealed */}
            <div
                className="w-full h-full"
                style={{
                    maskImage: "url(#brush-mask)",
                    WebkitMaskImage: "url(#brush-mask)",
                    maskSize: "cover",
                    WebkitMaskSize: "cover",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat"
                }}
            >
                {children}
            </div>

            {/* SVG defining the mask */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0">
                <defs>
                    <mask id="brush-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
                        {/* 
              A complex path simulating a brush stroke. 
              Coordinates are normalized (0-1) for objectBoundingBox.
            */}
                        <path
                            ref={maskRef}
                            d="M0.1,0.5 C0.2,0.4 0.3,0.6 0.4,0.5 S0.6,0.4 0.7,0.5 S0.9,0.6 1.0,0.5"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* Additional strokes for better coverage */}
                        <path
                            d="M0.05,0.4 C0.25,0.3 0.45,0.7 0.65,0.4 S0.85,0.3 1.0,0.4"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            style={{ animation: 'none' }} // We might want to animate this too or just have it static if we want a partial reveal
                        />
                    </mask>
                </defs>
            </svg>

            {/* Alternative approach: Using a direct SVG overlay if mask is tricky with complex content */}
        </div>
    );
};

// Improved version using a more organic "blob" or "ink" expansion
export const InkReveal: React.FC<BrushRevealProps> = ({ children, delay = 0 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const maskId = `ink-mask-${Math.random().toString(36).substr(2, 9)}`;

    useGSAP(() => {
        const tl = gsap.timeline({ delay });

        // Animate multiple "blobs" to cover the area
        tl.to(".ink-blob", {
            scale: 50,
            duration: 2,
            stagger: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                // Remove clip-path to prevent cutting off content (shadows, tooltips, etc.)
                if (contentRef.current) {
                    contentRef.current.style.clipPath = 'none';
                }
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full">
            <div ref={contentRef} style={{ clipPath: `url(#${maskId})` }} className="w-full">
                {children}
            </div>

            <svg className="absolute w-0 h-0">
                <defs>
                    <clipPath id={maskId} clipPathUnits="objectBoundingBox">
                        <circle className="ink-blob" cx="0.5" cy="0.5" r="0.01" />
                        <circle className="ink-blob" cx="0.2" cy="0.3" r="0.01" />
                        <circle className="ink-blob" cx="0.8" cy="0.7" r="0.01" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}
