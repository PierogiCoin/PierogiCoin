"use client";

import React, { useEffect, useRef } from "react";

interface Drop {
    x: number;
    y: number;
    speed: number;
    length: number;
    opacity: number;
    blur: number;
}

export const FallingDropsBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let drops: Drop[] = [];
        let width = 0;
        let height = 0;

        const initDrops = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const dropCount = Math.floor(width / 10); // Adjust density
            drops = [];

            for (let i = 0; i < dropCount; i++) {
                drops.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    speed: Math.random() * 5 + 2,
                    length: Math.random() * 20 + 10,
                    opacity: Math.random() * 0.5 + 0.1,
                    blur: Math.random() * 2, // Some drops are blurrier (depth)
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Optional: Add a subtle trail effect
            // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            // ctx.fillRect(0, 0, width, height);

            drops.forEach((drop) => {
                ctx.beginPath();

                // Gradient for the drop (fading tail)
                const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
                gradient.addColorStop(0, `rgba(6, 182, 212, 0)`); // Cyan transparent top
                gradient.addColorStop(1, `rgba(6, 182, 212, ${drop.opacity})`); // Cyan visible bottom

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.lineCap = "round";

                // Apply blur if supported (simulating depth)
                // Note: ctx.filter is not supported in all browsers/environments efficiently, 
                // but for modern web it's okay. If performance issues, remove this.
                if (drop.blur > 1) {
                    ctx.filter = `blur(${drop.blur}px)`;
                } else {
                    ctx.filter = 'none';
                }

                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.stroke();

                // Update position
                drop.y += drop.speed;

                // Reset if out of bounds
                if (drop.y > height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * width;
                    drop.speed = Math.random() * 5 + 2;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        initDrops();
        animate();

        const handleResize = () => {
            initDrops();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.6 }} // Global opacity to blend with background
        />
    );
};
