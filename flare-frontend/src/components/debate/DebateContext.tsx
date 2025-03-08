"use client";

import { useEffect, useState } from "react";
import { debateService } from "@/services/debateService";
import { motion } from "framer-motion";

interface DebateContextProps {
  topic: string;
}

export function DebateContext({ topic }: DebateContextProps) {
  const [contextInfo, setContextInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!topic) return;
    
    setIsLoading(true);
    
    // Use the debateService to get context for the topic
    const fetchContext = async () => {
      try {
        const context = await debateService.getTopicContext(topic);
        setContextInfo(context);
      } catch (error) {
        console.error("Error fetching topic context:", error);
        setContextInfo(`This debate explores multiple perspectives on "${topic}".`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContext();
  }, [topic]);

  return (
    <div className="h-full flex flex-col animate-fadeIn">
      <motion.div 
        className="flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2 text-[#E71D73] inline-block w-6 h-6 flex items-center justify-center">
            <span className="text-lg">📚</span>
          </span>
          Topic Overview
        </h3>
      </motion.div>
      
      <motion.div 
        className={`mt-4 flex-grow bg-white rounded-xl border border-gray-200 p-6 relative group transition-all duration-300 hover:shadow-md hover:border-[#E71D73]/30 ${isLoading ? "animate-pulse" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded-full"></div>
            <div className="h-5 bg-gray-200 rounded-full w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded-full w-2/3"></div>
          </div>
        ) : (
          <motion.div 
            className="relative h-full flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-2 -left-2 text-[#E71D73]/20 transform rotate-12"
              animate={{ rotate: [12, 20, 12, 5, 12] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">💡</span>
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -right-2 text-[#E71D73]/20 transform -rotate-12"
              animate={{ rotate: [-12, -5, -12, -20, -12] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">🔍</span>
            </motion.div>
            
            {/* Main content */}
            <div className="relative z-10 flex-grow">
              <div className="pl-8 pt-1">
                <motion.p 
                  className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-2 overflow-auto max-h-[200px] pr-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {contextInfo}
                </motion.p>
                <motion.div 
                  className="mt-auto pt-3 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center text-[#E71D73]/70 text-sm">
                    <span className="w-4 h-4 flex items-center justify-center mr-2 bg-[#E71D73]/10 rounded-full">
                      <span className="text-xs">i</span>
                    </span>
                    <span className="italic">Context provided to help frame the debate</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E71D73]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 