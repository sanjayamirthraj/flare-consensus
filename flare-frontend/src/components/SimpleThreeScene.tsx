//@ts-nocheck

'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box(props: any) {
  const meshRef = useRef<any>();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#E71D73" />
    </mesh>
  );
}

function Sphere(props: any) {
  const meshRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.x = Math.sin(t) * 3;
      meshRef.current.position.z = Math.cos(t) * 3;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#CF196A" />
    </mesh>
  );
}

function Torus(props: any) {
  const meshRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(t) * 3;
      meshRef.current.position.z = Math.sin(t) * 3;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial color="#B71761" />
    </mesh>
  );
}

export default function SimpleThreeScene() {
  return (
    <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-[#E71D73]/20">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Box position={[0, 0, 0]} />
        <Sphere position={[0, 0, 0]} />
        <Torus position={[0, 0, 0]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
} 