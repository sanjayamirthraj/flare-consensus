"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { debateService } from "@/services/debateService";
import { Info, Terminal } from "lucide-react";

interface DebateContextProps {
  topic: string;
}

export function DebateContext({ topic }: DebateContextProps) {
  const [contextInfo, setContextInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!topic) return;
    
    setIsLoading(true);
    
    // Fetch context information about the topic from the service
    const fetchContext = async () => {
      try {
        const contextData = await debateService.getTopicContext(topic);
        setContextInfo(contextData);
      } catch (error) {
        console.error("Failed to fetch topic context:", error);
        setContextInfo(
          `An error occurred while fetching context for "${topic}". ` +
          `The debate will continue, but background information may be limited.`
        );
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContext();
  }, [topic]);

  return (
    <div className={`space-y-5 ${isLoading ? "animate-pulse" : ""}`}>
      <div className="flex items-center">
        <span className="w-2 h-2 bg-[#E71D73] rounded-full mr-2"></span>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Info size={18} className="mr-2 text-[#E71D73]" />
          Topic Context
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
              <Terminal size={36} />
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