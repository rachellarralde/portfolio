"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector2, Mesh } from "three";

function CursorTrail() {
  const pointRefs = [
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null)
  ];
  
  const positions = useRef([
    { pos: new Vector2(), target: new Vector2() },
    { pos: new Vector2(), target: new Vector2() },
    { pos: new Vector2(), target: new Vector2() }
  ]).current;

  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      positions.forEach(p => p.target.set(x, y));
    };
    
    // Initialize off-screen
    positions.forEach(p => {
      p.pos.set(-10, -10);
      p.target.set(-10, -10);
    });
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [positions]);

  useFrame(() => {
    positions.forEach((point, i) => {
      const mesh = pointRefs[i].current;
      if (!mesh) return;
      
      // Gentle, smooth movement
      const speed = 0.1 - (i * 0.02);
      point.pos.x += (point.target.x - point.pos.x) * speed;
      point.pos.y += (point.target.y - point.pos.y) * speed;
      
      mesh.position.x = point.pos.x * viewport.width / 2;
      mesh.position.y = point.pos.y * viewport.height / 2;
    });
  });

  // Subtle, professional colors and sizes
  const colors = ["#8b5cf6", "#ec4899", "#3b82f6"];
  const sizes = [0.1, 0.08, 0.06];
  const opacities = [0.3, 0.2, 0.1];

  return (
    <>
      {pointRefs.map((ref, i) => (
        <mesh key={i} ref={ref}>
          <sphereGeometry args={[sizes[i], 32, 32]} />
          <meshBasicMaterial
            color={colors[i]}
            transparent
            opacity={opacities[i]}
          />
        </mesh>
      ))}
    </>
  );
}

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <CursorTrail />
      </Canvas>
    </div>
  );
}