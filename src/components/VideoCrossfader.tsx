import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface VideoCrossfaderProps {
  src: string;
  alt: string;
}

export const VideoCrossfader: React.FC<VideoCrossfaderProps> = ({ src, alt }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Animacja crossfade przy zmianie `src`
    // 1. Zanikamy stary film (jeśli istnieje)
    gsap.to(video, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // 2. Podmieniamy źródło, gdy jest już niewidoczne
        video.src = src;
        video.load();
        video.play().catch(error => console.log("Autoplay was prevented:", error));
        // 3. Płynnie pokazujemy nowy film
        gsap.to(video, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      },
    });
  }, [src]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        key={src} // Klucz pomaga Reactowi, ale GSAP zarządza płynnością
        loop
        muted
        autoPlay
        playsInline
        className="w-full h-full object-cover opacity-0" // Zaczyna niewidoczne
        aria-label={alt}
      />
    </div>
  );
};
