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

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [positions]);

  useFrame(() => {
    positions.forEach((point, i) => {
      // Each point follows with a delay
      const speed = 0.05 / (i + 1);
      
      // Smooth follow
      point.pos.x += (point.target.x - point.pos.x) * speed;
      point.pos.y += (point.target.y - point.pos.y) * speed;
      
      // Update mesh position
      if (pointRefs[i].current) {
        pointRefs[i].current.position.x = point.pos.x * viewport.width / 2;
        pointRefs[i].current.position.y = point.pos.y * viewport.height / 2;
      }
    });
  });

  return (
    <>
      {pointRefs.map((ref, i) => (
        <mesh 
          key={i} 
          ref={ref}
          position={[-10, -10, 0]} // Start off-screen
        >
          <sphereGeometry args={[0.05 - i * 0.01, 32, 32]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8 - i * 0.2} />
        </mesh>
      ))}
    </>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <CursorTrail />
      </Canvas>
    </div>
  );
}
