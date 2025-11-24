import React from 'react';

// Ta prosta stylizacja zostanie użyta w komponencie
const keywordStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  fontWeight: 600, // semibold
};

const highlightStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '30%',
  backgroundColor: 'var(--color-primary, #0070f3)', // Użyje zmiennej CSS, jeśli istnieje
  zIndex: -1,
  transformOrigin: 'left',
  transform: 'scaleX(0)', // Zaczyna ukryty
};

export const AnimatedKeyword: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <strong 
      className="text-text-main-light dark:text-white keyword-highlight" 
      style={keywordStyle}
    >
      {children}
      <span className="highlight-element" style={highlightStyle}></span>
    </strong>
  );
};
