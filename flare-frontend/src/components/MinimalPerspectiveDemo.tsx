"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Scale } from "lucide-react"

const perspectives = [
  {
    id: "pro",
    title: "Pro",
    description: "Supporting arguments",
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
    icon: ThumbsUp,
    point: "Carbon taxes incentivize innovation and reduce emissions."
  },
  {
    id: "neutral",
    title: "Neutral",
    description: "Balanced analysis",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    icon: Scale,
    point: "Climate policies must balance environmental and economic concerns."
  },
  {
    id: "con",
    title: "Con",
    description: "Critical arguments",
    color: "bg-gradient-to-br from-rose-500 to-red-600",
    icon: ThumbsDown,
    point: "Strict regulations may harm economic growth for certain industries."
  },
]

export default function MinimalPerspectiveDemo() {
  const [activePerspective, setActivePerspective] = useState("neutral")
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePerspectiveChange = (perspective: string) => {
    if (perspective !== activePerspective && !isAnimating) {
      setIsAnimating(true)
      setActivePerspective(perspective)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const activePerspectiveData = perspectives.find((p) => p.id === activePerspective)!

  return (
    <div className="w-full">
      {/* Navigation */}
      <div className="flex justify-center gap-1 mb-2">
        {perspectives.map((perspective) => (
          <Button
            key={perspective.id}
            variant={perspective.id === activePerspective ? "default" : "outline"}
            size="sm"
            className={`px-2 py-1 h-7 text-xs ${perspective.id === activePerspective ? perspective.color : ""}`}
            onClick={() => handlePerspectiveChange(perspective.id)}
          >
            <perspective.icon className="mr-1 h-3 w-3" />
            {perspective.title}
          </Button>
        ))}
      </div>

      {/* Main animation container */}
      <div className="relative w-full h-36 overflow-hidden rounded-lg bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePerspective}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`absolute inset-0 ${activePerspectiveData.color} text-white p-3 flex flex-col`}
          >
            <div className="flex items-center mb-1">
              <activePerspectiveData.icon className="h-4 w-4 mr-1" />
              <h2 className="text-sm font-bold">{activePerspectiveData.title} Perspective</h2>
            </div>

            <p className="text-xs mb-1">{activePerspectiveData.description}</p>

            <div className="mt-auto p-2 bg-white/10 rounded-lg">
              <p className="text-xs">
                <strong>Example:</strong> {activePerspectiveData.point}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white bg-opacity-10"
              style={{
                width: `${Math.random() * 30 + 15}px`,
                height: `${Math.random() * 30 + 15}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 15 - 7],
                y: [0, Math.random() * 15 - 7],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: Math.random() * 3 + 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 