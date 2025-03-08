'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for the Three.js components
const ThreePerspectivesScene = dynamic(
  () => import('./ThreePerspectivesScene'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-2">Loading 3D scene...</p>
          <div className="w-8 h-8 border-4 border-[#E71D73] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    ) 
  }
);

// Simplified version as fallback
const SimpleThreeScene = dynamic(
  () => import('./SimpleThreeScene'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-2">Loading simplified scene...</p>
          <div className="w-8 h-8 border-4 border-[#E71D73] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    ) 
  }
);

export default function ThreeSceneWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    // This will only run on the client
    setIsClient(true);
    
    // Set a timeout to check if we need to use the fallback
    const timer = setTimeout(() => {
      // If we've tried the main scene but had issues, try the fallback
      if (loadAttempt === 1) {
        console.log("Using simplified fallback scene");
        setUseFallback(true);
      }
      
      // First attempt to load the main scene
      if (loadAttempt === 0) {
        setLoadAttempt(1);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [loadAttempt]);

  if (!isClient) {
    return (
      <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-2">Initializing 3D scene...</p>
          <div className="w-8 h-8 border-4 border-[#E71D73] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Try the simple scene as a fallback
  if (useFallback) {
    return <SimpleThreeScene />;
  }

  // Try the main scene first
  return (
    <div 
      className="relative w-full"
      onClick={() => {
        // If clicking doesn't show animation after a few seconds, try fallback
        if (loadAttempt === 1) {
          setLoadAttempt(2);
          setTimeout(() => setUseFallback(true), 2000);
        }
      }}
    >
      <ThreePerspectivesScene />
    </div>
  );
} 