//@ts-nocheck
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Scale, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const perspectives = [
  {
    id: "pro",
    title: "For",
    description: "Supporting arguments and evidence that highlight the benefits and advantages of the position.",
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
    icon: ThumbsUp,
    points: [
      "Comprehensive analysis of supporting evidence",
      "Expert opinions favoring this position",
      "Statistical data showing positive outcomes",
      "Historical precedents of success",
    ],
  },
  {
    id: "neutral",
    title: "Neutral",
    description: "Balanced analysis that presents facts and context without bias or preference.",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    icon: Scale,
    points: [
      "Objective presentation of all relevant facts",
      "Contextual information for deeper understanding",
      "Comparison of different viewpoints",
      "Identification of common ground",
    ],
  },
  {
    id: "con",
    title: "Against",
    description: "Critical arguments and evidence that highlight the drawbacks and limitations of the position.",
    color: "bg-gradient-to-br from-rose-500 to-red-600",
    icon: ThumbsDown,
    points: [
      "Analysis of potential risks and downsides",
      "Expert critiques of the position",
      "Data showing negative consequences",
      "Alternative approaches to consider",
    ],
  },
]

export default function PerspectiveAnimation() {
  const [activePerspective, setActivePerspective] = useState("neutral")
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePerspectiveChange = (perspective) => {
    if (perspective !== activePerspective && !isAnimating) {
      setIsAnimating(true)
      setActivePerspective(perspective)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const activePerspectiveData = perspectives.find((p) => p.id === activePerspective)

  return (
    <div className="w-full">
      {/* Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {perspectives.map((perspective) => (
          <Button
            key={perspective.id}
            variant={perspective.id === activePerspective ? "default" : "outline"}
            className={`px-6 py-2 ${perspective.id === activePerspective ? perspective.color : ""}`}
            onClick={() => handlePerspectiveChange(perspective.id)}
          >
            <perspective.icon className="mr-2 h-4 w-4" />
            {perspective.title}
          </Button>
        ))}
      </div>

      {/* Main animation container */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePerspective}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 ${activePerspectiveData.color} text-white p-8 flex flex-col`}
          >
            <div className="flex items-center mb-6">
              <activePerspectiveData.icon className="h-10 w-10 mr-4" />
              <h2 className="text-3xl font-bold">{activePerspectiveData.title}</h2>
            </div>

            <p className="text-xl mb-8 max-w-2xl">{activePerspectiveData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
              {activePerspectiveData.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start"
                >
                  {activePerspective === "pro" && <CheckCircle className="h-6 w-6 mr-2 flex-shrink-0" />}
                  {activePerspective === "neutral" && <AlertCircle className="h-6 w-6 mr-2 flex-shrink-0" />}
                  {activePerspective === "con" && <XCircle className="h-6 w-6 mr-2 flex-shrink-0" />}
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Example topic */}
      {/* <div className="mt-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Example Topic: Climate Policy</h3>
        <div className="flex flex-col md:flex-row gap-4">
          {perspectives.map((perspective) => (
            <div
              key={perspective.id}
              className={`flex-1 p-4 rounded-lg border-2 ${
                perspective.id === activePerspective
                  ? `border-${perspective.id === "pro" ? "green" : perspective.id === "neutral" ? "blue" : "red"}-500`
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center mb-2">
                <perspective.icon
                  className={`h-5 w-5 mr-2 ${
                    perspective.id === "pro"
                      ? "text-green-500"
                      : perspective.id === "neutral"
                        ? "text-blue-500"
                        : "text-red-500"
                  }`}
                />
                <h4 className="font-medium">{perspective.title}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {perspective.id === "pro" && "Carbon taxes incentivize innovation and reduce emissions effectively."}
                {perspective.id === "neutral" &&
                  "Climate policies must balance environmental impact with economic considerations."}
                {perspective.id === "con" &&
                  "Strict regulations may harm economic growth and disproportionately affect certain industries."}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

