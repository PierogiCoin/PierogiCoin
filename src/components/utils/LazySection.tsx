// src/components/utils/LazySection.tsx
import React, { lazy, Suspense, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen'; // Twój istniejący hook

interface LazySectionProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback: React.ReactNode;
}

const LazySection: React.FC<LazySectionProps> = ({ component: Component, fallback }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Zaczynamy ładowanie, gdy sekcja jest 100px od dolnej krawędzi ekranu
  const isVisible = useOnScreen(ref, { rootMargin: '0px 0px 100px 0px', threshold: 0 });

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazySection;
