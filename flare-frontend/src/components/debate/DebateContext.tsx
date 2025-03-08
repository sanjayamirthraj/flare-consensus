"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DebateContextProps {
  topic: string;
}

// Mock context data for topics
const MOCK_CONTEXTS = {
  "Is AI a threat to humanity?": 
    "This debate explores the potential risks of advanced artificial intelligence systems. The question involves considerations of technological capabilities, ethical frameworks, regulatory approaches, and philosophical questions about consciousness and control. Key areas of focus include existential risks, job displacement, autonomous weapons, privacy concerns, and bias in AI systems.",
  
  "Should cryptocurrency be regulated?": 
    "This debate examines the role of government regulation in cryptocurrency markets. Topics include concerns about market volatility, consumer protection, financial stability, crime prevention, environmental impact, and innovation. The debate touches on economics, law, technology, and governance.",
  
  "Is climate change the biggest threat facing humanity?": 
    "This debate explores the severity and urgency of climate change relative to other global challenges. Areas of discussion include scientific consensus, economic impacts, health effects, national security, technological solutions, and intergenerational ethics. The topic spans science, economics, politics, and ethics.",
  
  "Should universal basic income be implemented?": 
    "This debate examines the potential benefits and drawbacks of providing all citizens with a regular stipend regardless of employment status. Topics include economic feasibility, social welfare, labor market effects, automation responses, wealth inequality, and human dignity. The discussion involves economics, social policy, politics, and philosophy.",
  
  "Is space exploration worth the cost?": 
    "This debate evaluates whether the financial investment in space exploration yields sufficient benefits to humanity. Areas of focus include scientific advancement, technological innovation, resource utilization, national prestige, existential risk mitigation, and opportunity costs. The topic spans economics, science, technology, and ethics."
};

export function DebateContext({ topic }: DebateContextProps) {
  const [contextInfo, setContextInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!topic) return;
    
    setIsLoading(true);
    
    // Use mock data directly instead of API call
    setTimeout(() => {
      const mockContext = MOCK_CONTEXTS[topic] || 
        `This is a multi-perspective analysis of "${topic}". The topic has significant implications across various domains and can be examined from multiple viewpoints to provide a comprehensive understanding.`;
      
      setContextInfo(mockContext);
      setIsLoading(false);
    }, 800);
    
  }, [topic]);

  return (
    <div className={`space-y-5 ${isLoading ? "animate-pulse" : ""}`}>
      <div className="flex items-center">
        <span className="w-2 h-2 bg-[#E71D73] rounded-full mr-2"></span>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <span className="mr-2 text-[#E71D73] inline-block w-5 h-5 flex items-center justify-center">
            <span className="text-sm">📚</span>
          </span>
          Topic Overview
        </h3>
      </div>
      
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 relative group transition-all duration-300 hover:shadow-md">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute top-[-3px] left-[-15px] text-[#E71D73]/30">
              <span className="text-3xl">💻</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed pl-6">
              {contextInfo}
            </p>
            <div className="absolute -bottom-2 -right-2 w-36 h-36 bg-[#E71D73]/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
} 