"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  animationType?: "pulse" | "bounce" | "scale" | "glow" | "shine" | "none";
  animationDelay?: number;
  animationDuration?: number;
  glowColor?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export function AnimatedButton({
  animationType = "none",
  animationDelay = 0,
  animationDuration = 1.5,
  glowColor = "rgba(231, 29, 115, 0.5)",
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  const getAnimationProps = () => {
    switch (animationType) {
      case "pulse":
        return {
          animate: {
            scale: [1, 1.05, 1],
          },
          transition: {
            duration: animationDuration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
            delay: animationDelay,
          },
        };
      case "bounce":
        return {
          animate: {
            y: [0, -5, 0],
          },
          transition: {
            duration: animationDuration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
            delay: animationDelay,
          },
        };
      case "scale":
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10,
          },
        };
      case "glow":
        return {
          whileHover: { boxShadow: `0 0 15px 5px ${glowColor}` },
          transition: {
            duration: 0.2,
          },
        };
      default:
        return {};
    }
  };

  const buttonContent = (
    <>
      {animationType === "shine" && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animationDelay }}
        >
          <motion.div
            className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[20deg]"
            animate={{ left: "200%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "easeInOut",
              delay: animationDelay,
            }}
          />
        </motion.div>
      )}
      {children}
    </>
  );

  return (
    <motion.div {...getAnimationProps()}>
      <Button
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {buttonContent}
      </Button>
    </motion.div>
  );
}

export function GradientButton({
  className,
  children,
  gradientFrom = "#E71D73",
  gradientTo = "#FF9A8B",
  textColor = "white",
  ...props
}: ButtonProps & {
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
}) {
  return (
    <motion.button
      className={cn(
        "relative px-6 py-2 rounded-md font-medium transition-all",
        className
      )}
      style={{
        background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 rounded-md"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
          opacity: 0.8,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.7 }}
      />
      {children}
    </motion.button>
  );
}

export function IconPulseButton({
  icon,
  children,
  className,
  ...props
}: ButtonProps & {
  icon: React.ReactNode;
}) {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {icon}
      </motion.div>
      {children}
    </Button>
  );
}

export function ArrowButton({
  children,
  className,
  direction = "right",
  ...props
}: ButtonProps & {
  direction?: "right" | "left" | "up" | "down";
}) {
  const arrowDirections = {
    right: "→",
    left: "←",
    up: "↑",
    down: "↓",
  };

  const arrow = arrowDirections[direction];

  return (
    <Button
      className={cn("group flex items-center gap-2", className)}
      {...props}
    >
      {children}
      <motion.span
        animate={{
          x: direction === "right" ? [0, 4, 0] : direction === "left" ? [0, -4, 0] : 0,
          y: direction === "down" ? [0, 4, 0] : direction === "up" ? [0, -4, 0] : 0,
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {arrow}
      </motion.span>
    </Button>
  );
} 