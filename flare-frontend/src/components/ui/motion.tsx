"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 25 
    }
  }
};

// Reusable animation components
interface MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInRight}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PopIn({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={popIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({ children, delay = 0, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll animations
export function FadeInOnScroll({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUpOnScroll({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover animations
export function HoverScale({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverElevate({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Layout animations
export const MotionLayout = motion.div; 