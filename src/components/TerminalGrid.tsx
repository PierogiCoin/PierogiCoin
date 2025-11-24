import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { gsap } from 'gsap';

const GridContent = () => {
  const gridRef = React.useRef<any>();

  useFrame((state) => {
    // Płynne podążanie siatki za myszą
    gsap.to(gridRef.current.position, {
      x: state.mouse.x * 0.1,
      y: state.mouse.y * 0.1,
      duration: 1,
      ease: 'power2.out',
    });
  });

  return (
    <Grid
      ref={gridRef}
      args={[30, 30]}
      cellSize={0.2}
      cellThickness={1}
      cellColor="#00aaff"
      sectionSize={1}
      sectionThickness={1.5}
      sectionColor="#0070f3"
      fadeDistance={10}
      fadeStrength={1}
      infiniteGrid
    />
  );
};

export const TerminalGrid: React.FC = () => (
  <div className="absolute inset-0 z-0 opacity-20">
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <GridContent />
    </Canvas>
  </div>
);
