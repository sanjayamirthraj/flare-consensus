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
    // Clear existing context info when topic changes
    setContextInfo("");
    
    if (!topic) return;
    
    setIsLoading(true);
    console.log(`Fetching context for topic: ${topic}`);
    
    // Use the debateService to get context for the topic
    const fetchContext = async () => {
      try {
        const context = await debateService.getTopicContext(topic);
        console.log(`Received context for ${topic}:`, context);
        setContextInfo(context);
      } catch (error) {
        console.error(`Error fetching topic context for '${topic}':`, error);
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
        transition={{ duration: 1.0 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <motion.span 
            className="mr-2 text-[#E71D73] inline-block w-6 h-6 flex items-center justify-center relative"
            whileHover={{ scale: 1.2, rotate: 10 }}
            animate={{ y: [0, -2, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-lg">📚</span>
            <motion.span 
              className="absolute inset-0 rounded-full border border-[#E71D73]/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.span>
          <span className="relative">
            Topic Overview
            <motion.div 
              className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-[#E71D73] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </span>
        </h3>
      </motion.div>
      
      <motion.div 
        className={`mt-4 flex-grow bg-white rounded-xl border border-gray-200 p-6 relative group transition-all duration-300 hover:shadow-md hover:border-[#E71D73]/30 ${isLoading ? "animate-pulse" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ boxShadow: "0 4px 20px rgba(231, 29, 115, 0.1)" }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-xl opacity-[0.02] pointer-events-none">
          <motion.div 
            className="w-full h-full"
            style={{ 
              backgroundImage: `radial-gradient(circle at 20% 30%, #E71D73 0.5px, transparent 0.5px), radial-gradient(circle at 70% 60%, #E71D73 0.5px, transparent 0.5px), radial-gradient(circle at 40% 80%, #E71D73 0.5px, transparent 0.5px)`,
              backgroundSize: "40px 40px"
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {isLoading ? (
          <div className="space-y-3 relative z-10">
            <motion.div 
              className="h-5 bg-gray-200 rounded-full w-3/4"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="h-5 bg-gray-200 rounded-full"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div 
              className="h-5 bg-gray-200 rounded-full w-5/6"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.div 
              className="h-5 bg-gray-200 rounded-full w-2/3"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
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
              animate={{ rotate: [12, 20, 12, 5, 12], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">💡</span>
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -right-2 text-[#E71D73]/20 transform -rotate-12"
              animate={{ rotate: [-12, -5, -12, -20, -12], scale: [1, 1.1, 1] }}
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
                  <motion.span 
                    className="text-[#E71D73] font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {topic}:
                  </motion.span>{" "}
                  {contextInfo.replace(topic, "")}
                </motion.p>
                <motion.div 
                  className="mt-auto pt-3 border-t border-[#E71D73]/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center text-[#E71D73]/70 text-sm">
                    <motion.span 
                      className="w-4 h-4 flex items-center justify-center mr-2 bg-[#E71D73]/10 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        backgroundColor: ["rgba(231,29,115,0.1)", "rgba(231,29,115,0.2)", "rgba(231,29,115,0.1)"]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-xs">i</span>
                    </motion.span>
                    <motion.span 
                      className="italic"
                      animate={{ color: ["rgba(231,29,115,0.5)", "rgba(231,29,115,0.7)", "rgba(231,29,115,0.5)"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Context provided to help frame the debate
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Background gradient effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#E71D73]/5 via-[#E71D73]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 