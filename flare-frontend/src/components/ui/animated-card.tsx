"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardProps } from "@/components/ui/card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animationType?: "hover" | "float" | "pulse" | "glow" | "none";
  animationDelay?: number;
  animationDuration?: number;
  glowColor?: string;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  animationType = "none",
  animationDelay = 0,
  animationDuration = 3,
  glowColor = "rgba(231, 29, 115, 0.3)",
  className,
  onClick,
  ...props
}: AnimatedCardProps) {
  const getAnimationProps = () => {
    switch (animationType) {
      case "hover":
        return {
          whileHover: { 
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          },
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        };
      case "float":
        return {
          animate: {
            y: [0, -10, 0],
          },
          transition: {
            duration: animationDuration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
            delay: animationDelay,
          },
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.02, 1],
          },
          transition: {
            duration: animationDuration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
            delay: animationDelay,
          },
        };
      case "glow":
        return {
          animate: {
            boxShadow: [
              "0 0 0 rgba(0, 0, 0, 0.1)",
              `0 0 20px ${glowColor}`,
              "0 0 0 rgba(0, 0, 0, 0.1)"
            ],
          },
          transition: {
            duration: animationDuration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
            delay: animationDelay,
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg overflow-hidden",
        className
      )}
      {...getAnimationProps()}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GradientBorderCard({
  children,
  className,
  gradientFrom = "#E71D73",
  gradientTo = "#FF9A8B",
  borderWidth = 2,
  padding = 16,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  gradientFrom?: string;
  gradientTo?: string;
  borderWidth?: number;
  padding?: number;
}) {
  return (
    <div 
      className={cn(
        "relative rounded-lg p-[2px] overflow-hidden",
        className
      )}
      {...props}
    >
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
          zIndex: 0,
        }}
      />
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-[6px] z-10 h-full"
        style={{ padding }}
      >
        {children}
      </div>
    </div>
  );
}

export function HoverCard({
  children,
  className,
  hoverScale = 1.03,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  hoverScale?: number;
}) {
  return (
    <motion.div
      className={cn("rounded-lg overflow-hidden", className)}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FlipCard({
  frontContent,
  backContent,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div 
      className={cn("relative perspective-1000 w-full h-full cursor-pointer", className)}
      onClick={() => setIsFlipped(!isFlipped)}
      {...props}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 backface-hidden">
          {frontContent}
        </div>
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
} 