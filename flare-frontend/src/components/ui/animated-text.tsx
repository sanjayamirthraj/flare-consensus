"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: "typewriter" | "fade" | "highlight" | "gradient" | "wave" | "none";
  animationDelay?: number;
  animationDuration?: number;
  gradientFrom?: string;
  gradientTo?: string;
  highlightColor?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
  as?: React.ElementType;
}

export function AnimatedText({
  text,
  className,
  animationType = "none",
  animationDelay = 0,
  animationDuration = 1,
  gradientFrom = "#E71D73",
  gradientTo = "#FF9A8B",
  highlightColor = "rgba(231, 29, 115, 0.2)",
  staggerChildren = false,
  staggerDelay = 0.03,
  as: Component = "span",
}: AnimatedTextProps) {
  const getAnimationProps = () => {
    switch (animationType) {
      case "typewriter":
        return {
          initial: { width: 0 },
          animate: { width: "100%" },
          transition: {
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeInOut",
          },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: {
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeInOut",
          },
        };
      case "highlight":
        return {
          initial: { backgroundSize: "0% 100%" },
          animate: { backgroundSize: "100% 100%" },
          transition: {
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeInOut",
          },
          style: {
            backgroundImage: `linear-gradient(to right, ${highlightColor}, ${highlightColor})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
            display: "inline",
          },
        };
      case "gradient":
        return {
          style: {
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          },
        };
      default:
        return {};
    }
  };

  if (animationType === "wave") {
    return (
      <Component className={className}>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              repeatType: "loop",
              delay: animationDelay + index * 0.05,
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  if (staggerChildren) {
    return (
      <Component className={className}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: staggerDelay, delayChildren: animationDelay }}
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  if (animationType === "typewriter") {
    return (
      <div className={cn("relative inline-block overflow-hidden", className)}>
        <Component className="invisible">{text}</Component>
        <motion.div
          className="absolute top-0 left-0 whitespace-nowrap"
          {...getAnimationProps()}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.span className={className} {...getAnimationProps()}>
      {text}
    </motion.span>
  );
}

export function GradientText({
  text,
  className,
  from = "#E71D73",
  to = "#FF9A8B",
  animate = false,
  duration = 3,
}: {
  text: string;
  className?: string;
  from?: string;
  to?: string;
  animate?: boolean;
  duration?: number;
}) {
  const style = {
    background: `linear-gradient(to right, ${from}, ${to})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };

  if (animate) {
    return (
      <motion.span
        className={className}
        style={style}
        animate={{
          background: [
            `linear-gradient(to right, ${from}, ${to})`,
            `linear-gradient(to right, ${to}, ${from})`,
            `linear-gradient(to right, ${from}, ${to})`,
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
}

export function TypewriterText({
  text,
  className,
  speed = 40,
  cursor = true,
}: {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
}) {
  const [displayText, setDisplayText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, speed, text]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export function SplitText({
  text,
  className,
  wordClassName,
  charClassName,
  type = "words",
  staggerChildren = true,
  staggerDelay = 0.03,
  animation = "fadeUp",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  type?: "words" | "chars";
  staggerChildren?: boolean;
  staggerDelay?: number;
  animation?: "fadeUp" | "fadeIn" | "scale";
}) {
  const getAnimationVariants = () => {
    switch (animation) {
      case "fadeUp":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = getAnimationVariants();

  if (type === "chars") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerChildren ? staggerDelay : 0,
            },
          },
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className={charClassName}
            variants={variants}
            transition={{ duration: 0.3 }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerChildren ? staggerDelay : 0,
          },
        },
      }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className={wordClassName}
          variants={variants}
          transition={{ duration: 0.3 }}
          style={{ display: "inline-block" }}
        >
          {word}
          {index !== text.split(" ").length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.div>
  );
} 