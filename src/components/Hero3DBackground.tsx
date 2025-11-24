// Hero3DBackground.tsx
'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- SHADERY (JĘZYK KARTY GRAFICZNEJ - GLSL) ---
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aRandom;
  varying float vDist;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.5 + aRandom * 10.0) * 0.05;
    pos.x += cos(uTime * 0.5 + aRandom * 10.0) * 0.05;

    float dist = distance(pos, vec3(uMouse.x, uMouse.y, 0.0));
    vec3 direction = normalize(pos - vec3(uMouse.x, uMouse.y, 0.0));
    float force = smoothstep(0.7, 0.0, dist);
    pos += direction * force * 0.3;

    vDist = force;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 10.0 * (1.0 - force) + 5.0;
    gl_PointSize *= (1.0 / -viewPosition.z);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vDist;

  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    float strength = vDist * 2.0 + 0.5;
    gl_FragColor = vec4(uColor * strength, 1.0);
  }
`;

// --- KOMPONENT SCENY 3D ---
const SceneContent = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 5000;
    const radius = 2.5;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const R = Math.cbrt(Math.random()) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i3] = R * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = R * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = R * Math.cos(phi);
      randoms[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    return geo;
  }, []);
  
  // Zmiana koloru uniformu na podstawie zdarzenia
  useEffect(() => {
      const handleColorChange = (event: CustomEvent<{ r: number, g: number, b: number }>) => {
          if (materialRef.current) {
              materialRef.current.uniforms.uColor.value = new THREE.Color(event.detail.r, event.detail.g, event.detail.b);
          }
      };
      window.addEventListener('hero-text-change', handleColorChange as EventListener);
      return () => window.removeEventListener('hero-text-change', handleColorChange as EventListener);
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      
      const mouseX = state.mouse.x * viewport.width / 2;
      const mouseY = state.mouse.y * viewport.height / 2;

      mousePosition.current.x = THREE.MathUtils.lerp(mousePosition.current.x, mouseX, 0.05);
      mousePosition.current.y = THREE.MathUtils.lerp(mousePosition.current.y, mouseY, 0.05);
      
      materialRef.current.uniforms.uMouse.value.x = mousePosition.current.x;
      materialRef.current.uniforms.uMouse.value.y = mousePosition.current.y;
    }
    if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#0070f3') },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// --- GŁÓWNY EKSPORTOWANY KOMPONENT ---
export const Hero3DBackground = () => (
  <Canvas
    camera={{ position: [0, 0, 4], fov: 75 }}
    style={{ width: '100%', height: '100%', position: 'absolute' }}
    dpr={[1, 2]}
    gl={{ 
        powerPreference: 'low-power', 
        antialias: true,
        alpha: true,
        failIfMajorPerformanceCaveat: true
    }} 
  >
    <SceneContent />
  </Canvas>
);
