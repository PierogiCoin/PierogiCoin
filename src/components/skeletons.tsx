// src/components/skeletons.tsx
import React from 'react';

// Szkielet dla typowej sekcji z nagłówkiem i tekstem
export const SectionSkeleton: React.FC = () => (
  <div className="container mx-auto px-6 py-20 animate-pulse">
    <div className="h-10 w-1/3 bg-gray-700 rounded-md mx-auto mb-6"></div>
    <div className="h-6 w-1/2 bg-gray-700 rounded-md mx-auto"></div>
  </div>
);

// Szkielet specjalnie dla sekcji portfolio
export const PortfolioSkeleton: React.FC = () => (
  <div className="container mx-auto px-6 py-20 animate-pulse">
    <div className="h-10 w-1/3 bg-gray-700 rounded-md mx-auto mb-6"></div>
    <div className="h-6 w-1/2 bg-gray-700 rounded-md mx-auto mb-16"></div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="h-96 bg-gray-700 rounded-lg"></div>
      <div className="h-96 bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);
