"use client";

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useTexture, Float, TorusKnot } from '@react-three/drei';
import { Vector3, Mesh, Group, Material, Color } from 'three';
import { MotionConfig } from 'framer-motion';

// Debug component
const DebugInfo = () => {
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    console.log('Three.js Renderer:', gl);
    console.log('Three.js Scene:', scene);
    console.log('Three.js Camera:', camera);
  }, [gl, scene, camera]);
  
  return null;
};

// Error boundary for canvas
function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-red-900/50 p-6 rounded-lg text-white">
        <h3 className="text-xl font-bold mb-2">3D Rendering Error</h3>
        <p>There was a problem rendering the 3D scene.</p>
        <p className="mt-2 text-sm">Please check that your browser supports WebGL.</p>
      </div>
    </div>
  );
}

// Simple fallback sphere that will always render
const FallbackSphere = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#E71D73" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </mesh>
  );
};

// Animated perspective sphere
const PerspectiveSphere = ({ position, color, label, delay = 0, isHovered }: { 
  position: [number, number, number], 
  color: string, 
  label: string,
  delay?: number,
  isHovered: boolean
}) => {
  const sphereRef = useRef<Group>(null);
  const materialRef = useRef<Material>(null);
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);
  
  // Create complementary colors for particles
  const particleColor = new Color(color).offsetHSL(0.5, 0, 0).getStyle();
  
  // Dynamic position based on hover state
  const dynamicPosition: [number, number, number] = isHovered 
    ? [position[0] * 1.3, position[1], position[2]] 
    : position;
  
  // Animation using useFrame instead of motion
  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Handle initial animation
      if (scale < 1) {
        setScale(prev => Math.min(prev + delta * 0.8, 1));
        setOpacity(prev => Math.min(prev + delta * 1.2, 1));
      }

      // Handle hover animation
      if (active) {
        sphereRef.current.scale.lerp(new Vector3(1.15, 1.15, 1.15), 0.1);
      } else {
        sphereRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1);
      }

      // Apply glow when active
      if (materialRef.current) {
        const material = materialRef.current as any;
        if (material.emissiveIntensity !== undefined) {
          material.emissiveIntensity = active ? 0.5 : 0.1;
        }
      }
    }
  });

  // Delayed start effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setScale(0.01); // Start the animation after delay
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <>
      <group
        ref={sphereRef}
        position={dynamicPosition}
        scale={[scale, scale, scale]}
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
      >
        {/* Main colored sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            ref={materialRef}
            color={color}
            roughness={0.4}
            metalness={0.5}
            emissive={color}
            emissiveIntensity={0.1}
            opacity={opacity}
            transparent={true}
          />
        </mesh>

        {/* Text label */}
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>

        {/* Orbiting particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <OrbitingParticle 
            key={i} 
            color={particleColor} 
            radius={1.5 + i * 0.1} 
            speed={0.2 + i * 0.05} 
            offset={i * (Math.PI * 2) / 5} 
            opacity={opacity}
          />
        ))}
      </group>
    </>
  );
};

// Orbiting particle component
const OrbitingParticle = ({ color, radius, speed, offset, opacity }: {
  color: string,
  radius: number,
  speed: number,
  offset: number,
  opacity: number
}) => {
  const ref = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.sin(t) * radius;
      ref.current.position.z = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={opacity * 0.8}
      />
    </mesh>
  );
};

// Connection beam between nodes
const ConnectionBeam = ({ start, end, color, isHovered }: { 
  start: [number, number, number], 
  end: [number, number, number], 
  color: string,
  isHovered: boolean
}) => {
  const ref = useRef<Mesh>(null);
  const [opacity, setOpacity] = useState(0);
  
  // Calculate position and scale for the beam
  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ];
  
  // Calculate distance and direction
  const direction = new Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  );
  
  const length = direction.length();
  
  useFrame((state, delta) => {
    // Fade in animation
    if (opacity < 0.6) {
      setOpacity(prev => Math.min(prev + delta * 0.3, 0.6));
    }
    
    // Hover animation
    if (ref.current) {
      const material = ref.current.material as any;
      if (material && material.opacity !== undefined) {
        material.opacity = isHovered ? 0.8 : opacity;
      }
    }
  });
  
  return (
    <mesh ref={ref} position={midPoint} scale={[0.05, length, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1, 1, 1, 8, 1, false]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity}
        fog={false}
      />
    </mesh>
  );
};

// Central topic node
const TopicNode = ({ isHovered }: { isHovered: boolean }) => {
  const ref = useRef<Group>(null);
  const materialRef = useRef<Material>(null);
  const [scale, setScale] = useState(0);
  
  useFrame((state, delta) => {
    // Initial animation
    if (scale < 1) {
      setScale(prev => Math.min(prev + delta * 0.5, 1));
    }
    
    // Hover animation
    if (ref.current) {
      if (isHovered) {
        ref.current.scale.lerp(new Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        ref.current.scale.lerp(new Vector3(scale, scale, scale), 0.1);
      }
    }
    
    // Rotation animation
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
    
    // Glow animation
    if (materialRef.current) {
      const material = materialRef.current as any;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = isHovered ? 0.7 : 0.3;
      }
    }
  });
  
  return (
    <group ref={ref} scale={[scale, scale, scale]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial 
            ref={materialRef}
            color="#E71D73"
            roughness={0.3}
            metalness={0.7}
            emissive="#E71D73"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        <Text
          position={[0, -2, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Topic
        </Text>
      </Float>
    </group>
  );
};

// Main scene component
const Scene = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [sceneReady, setSceneReady] = useState(false);

  // Set up camera
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 10);
    // Mark scene as ready after a delay to ensure everything is loaded
    const timer = setTimeout(() => setSceneReady(true), 500);
    return () => clearTimeout(timer);
  }, [camera]);

  // If scene isn't ready yet, show a simple fallback
  if (!sceneReady) {
    return <FallbackSphere />;
  }

  // Define positions
  const origin: [number, number, number] = [0, 0, 0];
  const forPosition: [number, number, number] = [4, 0, 0];
  const neutralPosition: [number, number, number] = [0, 3, 0];
  const againstPosition: [number, number, number] = [-4, 0, 0];

  return (
    <group>
      <DebugInfo />
      
      {/* Nodes */}
      <group 
        onPointerOver={() => setHoveredNode('topic')}
        onPointerOut={() => setHoveredNode(null)}
      >
        <TopicNode isHovered={hoveredNode === 'topic'} />
      </group>

      {/* Perspective spheres */}
      <group 
        onPointerOver={() => setHoveredNode('for')}
        onPointerOut={() => setHoveredNode(null)}
      >
        <PerspectiveSphere 
          position={forPosition} 
          color="#E71D73" 
          label="For" 
          delay={0.3}
          isHovered={hoveredNode === 'for'}
        />
      </group>

      <group 
        onPointerOver={() => setHoveredNode('neutral')}
        onPointerOut={() => setHoveredNode(null)}
      >
        <PerspectiveSphere 
          position={neutralPosition} 
          color="#CF196A" 
          label="Neutral" 
          delay={0.6}
          isHovered={hoveredNode === 'neutral'}
        />
      </group>

      <group 
        onPointerOver={() => setHoveredNode('against')}
        onPointerOut={() => setHoveredNode(null)}
      >
        <PerspectiveSphere 
          position={againstPosition} 
          color="#B71761" 
          label="Against" 
          delay={0.9}
          isHovered={hoveredNode === 'against'}
        />
      </group>

      {/* Connecting beams */}
      <ConnectionBeam 
        start={origin} 
        end={forPosition} 
        color="#E71D73" 
        isHovered={hoveredNode === 'for' || hoveredNode === 'topic'}
      />
      <ConnectionBeam 
        start={origin} 
        end={neutralPosition} 
        color="#CF196A" 
        isHovered={hoveredNode === 'neutral' || hoveredNode === 'topic'}
      />
      <ConnectionBeam 
        start={origin} 
        end={againstPosition} 
        color="#B71761" 
        isHovered={hoveredNode === 'against' || hoveredNode === 'topic'}
      />

      {/* Light sources */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
    </group>
  );
};

// Main exported component
export default function ThreePerspectivesScene() {
  // For prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.error('WebGL not supported');
        setHasError(true);
      }
    } catch (e) {
      console.error('Error checking WebGL support:', e);
      setHasError(true);
    }
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className="relative w-full aspect-square max-w-3xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-[#E71D73]/20">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading scene...</div>}>
          <Canvas 
            dpr={[1, 2]} 
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <color attach="background" args={['#000000']} />
            <Scene />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(2 * Math.PI) / 3}
              rotateSpeed={0.5}
              autoRotate={!prefersReducedMotion}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </Suspense>
        
        {/* Hint text */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
          Click and drag to explore · Hover to interact
        </div>
      </div>
    </div>
  );
} 