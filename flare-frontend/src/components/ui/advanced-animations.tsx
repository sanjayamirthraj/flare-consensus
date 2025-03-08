"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Advanced animation variants
export const flipVariants: Variants = {
  hidden: { 
    rotateY: 90,
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
};

export const floatingCardVariants: Variants = {
  hidden: { 
    y: 40, 
    opacity: 0,
    rotateX: 10,
    rotateZ: -5,
  },
  visible: { 
    y: 0, 
    opacity: 1,
    rotateX: 0,
    rotateZ: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

export const scaleWithGlowVariants: Variants = {
  hidden: { 
    scale: 0.7, 
    opacity: 0,
    boxShadow: "0 0 0px rgba(231, 29, 115, 0)"
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    boxShadow: "0 0 20px rgba(231, 29, 115, 0.3)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export const staggerWithScaleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const itemScaleVariants: Variants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
    y: 20,
    rotateZ: -5
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export const heartbeatVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0px rgba(231, 29, 115, 0)",
      "0 0 15px rgba(231, 29, 115, 0.3)",
      "0 0 0px rgba(231, 29, 115, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

export const bounceTransitionVariants: Variants = {
  initial: { 
    y: 0, 
    opacity: 1, 
    scale: 1
  },
  exit: { 
    y: -20, 
    opacity: 0, 
    scale: 0.95, 
    transition: { 
      duration: 0.2 
    } 
  },
  enter: { 
    y: 20, 
    opacity: 0, 
    scale: 0.95, 
    transition: { 
      duration: 0.2 
    } 
  }
};

export const morphingBgVariants: Variants = {
  animate: {
    background: [
      "radial-gradient(circle at 0% 0%, rgba(231, 29, 115, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
      "radial-gradient(circle at 100% 0%, rgba(231, 29, 115, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
      "radial-gradient(circle at 100% 100%, rgba(231, 29, 115, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
      "radial-gradient(circle at 0% 100%, rgba(231, 29, 115, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
      "radial-gradient(circle at 0% 0%, rgba(231, 29, 115, 0.05) 0%, rgba(255, 255, 255, 0) 50%)"
    ],
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  }
};

export const rotatingBorderVariants: Variants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Advanced animation components
interface AnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FlipCard({ children, delay = 0, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={flipVariants}
      transition={{ delay }}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingCard({ children, delay = 0, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={floatingCardVariants}
      transition={{ delay }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ScaleWithGlow({ children, delay = 0, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleWithGlowVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItemsParent({ children, delay = 0, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerWithScaleVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: Omit<AnimationProps, "delay">) {
  return (
    <motion.div
      variants={itemScaleVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Heartbeat({ children, className = "" }: Omit<AnimationProps, "delay">) {
  return (
    <motion.div
      animate="pulse"
      variants={heartbeatVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children, className = "" }: Omit<AnimationProps, "delay">) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="enter"
        animate="initial"
        exit="exit"
        variants={bounceTransitionVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function MorphingBackground({ children, className = "" }: Omit<AnimationProps, "delay">) {
  return (
    <motion.div
      animate="animate"
      variants={morphingBgVariants}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GlowingBorder({ 
  children, 
  borderWidth = 1, 
  className = "",
  glowColor = "rgba(231, 29, 115, 0.5)",
  borderRadius = "0.5rem"
}: Omit<AnimationProps, "delay"> & { 
  borderWidth?: number, 
  glowColor?: string,
  borderRadius?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0px ${glowColor}`,
            `0 0 10px ${glowColor}`,
            `0 0 0px ${glowColor}`
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ 
          position: 'absolute',
          inset: 0,
          borderRadius,
          zIndex: -1
        }}
      />
      <div 
        style={{ 
          border: `${borderWidth}px solid rgba(231, 29, 115, 0.3)`,
          borderRadius,
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function RotatingBorder({ 
  children, 
  borderWidth = 2, 
  className = "", 
  gradientFrom = "#E71D73",
  gradientTo = "#FF9A8B",
  borderRadius = "0.5rem"
}: Omit<AnimationProps, "delay"> & { 
  borderWidth?: number, 
  gradientFrom?: string,
  gradientTo?: string,
  borderRadius?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        style={{
          position: 'absolute',
          inset: -borderWidth,
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
          backgroundSize: "300% 300%",
          borderRadius,
          zIndex: 0
        }}
        animate="animate"
        variants={rotatingBorderVariants}
      />
      <div 
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: `calc(${borderRadius} - 2px)`,
          margin: borderWidth,
          zIndex: 1
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ShimmerButton({ 
  children, 
  className = "",
  shimmerColor = "rgba(255, 255, 255, 0.4)",
  onClick,
  ...props
}: Omit<AnimationProps, "delay"> & { 
  shimmerColor?: string,
  onClick?: () => void
}) {
  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          zIndex: 1,
          transform: 'skewX(-20deg)',
        }}
        animate={{
          x: ['calc(-100% - 50px)', 'calc(100% + 50px)']
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
          repeatDelay: 0.5
        }}
      />
      {children}
    </motion.div>
  );
} 