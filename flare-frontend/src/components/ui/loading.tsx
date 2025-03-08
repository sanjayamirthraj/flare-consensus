"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
  className?: string;
}

export function Loading({ 
  size = "md", 
  color = "#E71D73", 
  text, 
  className = "" 
}: LoadingProps) {
  const sizes = {
    sm: { circle: 4, container: 16 },
    md: { circle: 6, container: 24 },
    lg: { circle: 8, container: 32 },
  };

  const circleSize = sizes[size].circle;
  const containerSize = sizes[size].container;

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  const circleVariants = {
    initial: { opacity: 0.4 },
    animate: (i: number) => ({
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
      }
    })
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className="relative"
        style={{ width: containerSize, height: containerSize }}
        variants={containerVariants}
        animate="animate"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const x = Math.cos(angle) * (containerSize / 2 - circleSize / 2);
          const y = Math.sin(angle) * (containerSize / 2 - circleSize / 2);
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: circleSize,
                height: circleSize,
                backgroundColor: color,
                top: containerSize / 2 - circleSize / 2 + y,
                left: containerSize / 2 - circleSize / 2 + x,
              }}
              variants={circleVariants}
              initial="initial"
              animate="animate"
              custom={i}
            />
          );
        })}
      </motion.div>
      
      {text && (
        <motion.p 
          className="mt-3 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function PulseLoader({ 
  color = "#E71D73", 
  size = "md", 
  className = "" 
}: Omit<LoadingProps, "text">) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const dotSize = sizes[size] / 4;
  const containerSize = sizes[size];

  return (
    <div 
      className={`flex items-center justify-center gap-2 ${className}`}
      style={{ height: containerSize }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function ProgressLoader({
  progress = 0,
  color = "#E71D73",
  height = 4,
  className = "",
  showPercentage = false
}: {
  progress: number;
  color?: string;
  height?: number;
  className?: string;
  showPercentage?: boolean;
}) {
  return (
    <div className={`w-full ${className}`}>
      <div 
        className="w-full bg-gray-100 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {showPercentage && (
        <motion.p 
          className="text-xs text-right mt-1 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(progress)}%
        </motion.p>
      )}
    </div>
  );
}

export function TypewriterText({
  text,
  className = "",
  speed = 40
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * speed / 1000 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function ThinkingLoader({
  color = "#E71D73",
  text = "Thinking",
  className = ""
}: {
  color?: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-2 text-gray-600">{text}</span>
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="text-lg"
            style={{ color }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -3, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            .
          </motion.span>
        ))}
      </div>
    </div>
  );
} 