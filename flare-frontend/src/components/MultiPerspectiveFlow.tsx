"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Network } from 'lucide-react';

interface MultiPerspectiveFlowProps {
  debateTopic?: string;
}

const MultiPerspectiveFlow: React.FC<MultiPerspectiveFlowProps> = ({ 
  debateTopic = "Should AI development be regulated?" 
}) => {
  const [animationState, setAnimationState] = useState<'initial' | 'toRouter' | 'toPerspectives' | 'showContent'>('initial');
  
  // Control the animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Reset animation
      setAnimationState('initial');
      
      // Wait a moment before starting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Topic to router animation
      setAnimationState('toRouter');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Router to perspectives animation
      setAnimationState('toPerspectives');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show content in each perspective
      setAnimationState('showContent');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Loop the animation after a pause
      await new Promise(resolve => setTimeout(resolve, 3000));
      sequence();
    };
    
    sequence();
    return () => setAnimationState('initial');
  }, [debateTopic]);
  
  return (
    <div className="w-full max-w-4xl mx-auto relative h-[650px] py-4">
      {/* Stylish Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-white">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAzNGgyLTJ6Ii8+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0yOSAyOUgxdjMwaDU8VjFIMjl2Mjh6IiBzdHJva2U9IiNlZWUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9Ii44Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#E71D73]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Animated Gradient Lines */}
        <motion.div 
          className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#E71D73]/20 to-transparent"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          animate={{ 
            x: [0, 10, 0], 
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      
      <div className="relative z-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Multi-Perspective Analysis Flow</h2>
        
        {/* Debate Topic */}
        <motion.div 
          className="relative mx-auto w-[320px] mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gray-950 text-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Debate Topic</h3>
            <p className="text-sm">{debateTopic}</p>
          </div>
          
          {/* Animated packet from Topic to Router */}
          {animationState !== 'initial' && (
            <motion.div 
              className="absolute left-1/2 top-full w-3 h-3 rounded-full bg-[#E71D73] -ml-1.5 shadow-[0_0_10px_rgba(231,29,115,0.6)]"
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: 80, 
                opacity: animationState === 'toRouter' ? 1 : 0 
              }}
              transition={{ duration: 1.2 }}
            />
          )}
        </motion.div>
        
        {/* Router with Consensus Visualization */}
        <motion.div 
          className="relative mx-auto w-[100px] h-[100px] mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center shadow-md border border-gray-200">
            <Network className="h-5 w-5 text-[#E71D73] mb-1" />
            <p className="text-xs font-semibold text-gray-600">Router</p>
          </div>
          
          {/* Consensus ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#E71D73]/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 0.9], 
              opacity: [0, 0.5, 0],
              transition: { 
                repeat: Infinity, 
                duration: 2,
                repeatType: "loop"
              }
            }}
          />
          
          {/* Animated packets from Router to Perspectives */}
          {animationState === 'toPerspectives' && (
            <>
              <motion.div 
                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-green-500 -ml-1.5 shadow-[0_0_10px_rgba(0,200,0,0.5)]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: -220, y: 120, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5 }}
              />
              <motion.div 
                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-blue-500 -ml-1.5 shadow-[0_0_10px_rgba(0,0,200,0.5)]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: 0, y: 120, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              <motion.div 
                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-red-500 -ml-1.5 shadow-[0_0_10px_rgba(200,0,0,0.5)]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: 220, y: 120, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.4 }}
              />
            </>
          )}
        </motion.div>
        
        {/* Perspectives Row in T-formation */}
        <div className="flex justify-between gap-6 relative z-10">
          {/* Pro Perspective */}
          <motion.div 
            className="flex-1 bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: animationState === 'showContent' 
                ? '0 0 15px rgba(0, 255, 0, 0.2)' 
                : '0 0 0px rgba(0, 255, 0, 0)'
            }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 border border-green-300 flex items-center justify-center mr-2">
                <Plus className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Pro</h3>
            </div>
            
            {/* Consensus Learning Visualization */}
            <div className="absolute top-2 right-2 flex items-center">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Network className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-xs ml-1 text-green-600 font-medium">Consensus</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: animationState === 'showContent' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-gray-600 mb-2">Arguments supporting the topic</p>
              <p className="text-sm text-gray-600 mb-2">Key benefits and advantages</p>
              <p className="text-sm text-gray-600">Supporting evidence and data</p>
            </motion.div>
          </motion.div>
          
          {/* Neutral Perspective */}
          <motion.div 
            className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: animationState === 'showContent' 
                ? '0 0 15px rgba(0, 0, 255, 0.2)' 
                : '0 0 0px rgba(0, 0, 255, 0)'
            }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center mr-2">
                <span className="text-blue-600 font-bold">≈</span>
              </div>
              <h3 className="font-semibold text-gray-800">Neutral</h3>
            </div>
            
            {/* Consensus Learning Visualization */}
            <div className="absolute top-2 right-2 flex items-center">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <Network className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-xs ml-1 text-blue-600 font-medium">Consensus</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: animationState === 'showContent' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm text-gray-600 mb-2">Balanced viewpoints</p>
              <p className="text-sm text-gray-600 mb-2">Contextual considerations</p>
              <p className="text-sm text-gray-600">Nuanced analysis</p>
            </motion.div>
          </motion.div>
          
          {/* Against Perspective */}
          <motion.div 
            className="flex-1 bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: animationState === 'showContent' 
                ? '0 0 15px rgba(255, 0, 0, 0.2)' 
                : '0 0 0px rgba(255, 0, 0, 0)'
            }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-red-100 border border-red-300 flex items-center justify-center mr-2">
                <Minus className="h-4 w-4 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Against</h3>
            </div>
            
            {/* Consensus Learning Visualization */}
            <div className="absolute top-2 right-2 flex items-center">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <Network className="h-3 w-3 text-red-600" />
              </div>
              <span className="text-xs ml-1 text-red-600 font-medium">Consensus</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: animationState === 'showContent' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-sm text-gray-600 mb-2">Arguments opposing the topic</p>
              <p className="text-sm text-gray-600 mb-2">Potential risks and drawbacks</p>
              <p className="text-sm text-gray-600">Counterpoints and concerns</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MultiPerspectiveFlow; 