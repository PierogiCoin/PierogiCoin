'use client';

import React, { useRef, useState, useEffect } from 'react';

interface StickyFooterWrapperProps {
    children: React.ReactNode;
}

export default function StickyFooterWrapper({ children }: StickyFooterWrapperProps) {
    const footerRef = useRef<HTMLDivElement>(null);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.offsetHeight);
            }
        };

        // Initial measurement
        updateHeight();

        // Observe resize
        const resizeObserver = new ResizeObserver(updateHeight);
        if (footerRef.current) {
            resizeObserver.observe(footerRef.current);
        }

        window.addEventListener('resize', updateHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <>
            {/* Placeholder that pushes content up by the height of the footer */}
            <div style={{ height: footerHeight }} className="w-full relative z-10 bg-white dark:bg-[#0B1121]" />

            {/* The actual fixed footer */}
            <div
                ref={footerRef}
                className="fixed bottom-0 left-0 w-full -z-10"
            >
                {children}
            </div>
        </>
    );
}
