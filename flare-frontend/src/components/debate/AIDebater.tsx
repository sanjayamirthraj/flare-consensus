"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Source {
  title: string;
  url: string;
}

interface Response {
  text: string;
  isLoading: boolean;
  sources?: Source[];
}

interface Debater {
  id: number;
  name: string;
  stance: string;
  model?: string;
  responses: Response[];
  isLoading: boolean;
}

interface AIDebaterProps {
  debater: Debater;
}

export function AIDebater({ debater }: AIDebaterProps) {
  // Generate avatar with just a letter/number instead of an icon
  const getDebaterAvatar = (id: number, stance: string) => {
    const colors = {
      "For": ["bg-gradient-to-br from-[#E71D73] to-[#C4175F]", "border-[#E71D73]/70", "For"],
      "Against": ["bg-gradient-to-br from-[#CF196A] to-[#AF1655]", "border-[#CF196A]/70", "Against"],
      "Neutral": ["bg-gradient-to-br from-[#B71761] to-[#97144C]", "border-[#B71761]/70", "Neutral"]
    };
    
    // Get first letter of model or use id as fallback
    const getAvatarContent = () => {
      if (debater.model) {
        return debater.model.charAt(0);
      }
      return id.toString();
    };
    
    const [bg, border, stance_label] = colors[stance as keyof typeof colors] || ["bg-gradient-to-br from-[#E71D73] to-[#C4175F]", "border-[#E71D73]/70", "For"];
    
    return (
      <div className="relative group">
        <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${bg} border-2 ${border} shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
          <span className="text-white font-bold text-xl">
            {getAvatarContent()}
          </span>
        </div>
        <div className="absolute inset-0 bg-[#E71D73] opacity-0 blur group-hover:opacity-20 transition duration-300 rounded-xl"></div>
      </div>
    );
  };

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group">
        <CardHeader className="border-b border-gray-100 pb-4 relative">
          <div className="flex items-center gap-4">
            {getDebaterAvatar(debater.id, debater.stance)}
            <div>
              <CardTitle className="text-xl text-gray-900 mb-1">{debater.name}</CardTitle>
              <CardDescription className="text-gray-500 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  debater.stance === "For" ? "bg-[#E71D73]" : 
                  debater.stance === "Against" ? "bg-[#CF196A]" : 
                  "bg-[#B71761]"
                }`}></span>
                {debater.stance} Perspective 
                {debater.model && (
                  <span className="ml-2 opacity-80 flex items-center">
                    • <span className="ml-1">{debater.model}</span>
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          
          {/* Decorative accent bar at the bottom */}
          <div className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${
            debater.stance === "For" ? "bg-gradient-to-r from-[#E71D73] to-[#E71D73]/50" : 
            debater.stance === "Against" ? "bg-gradient-to-r from-[#CF196A] to-[#CF196A]/50" : 
            "bg-gradient-to-r from-[#B71761] to-[#B71761]/50"
          }`}></div>
        </CardHeader>
        
        <CardContent className="pt-5 flex-grow overflow-auto">
          <div className="space-y-5">
            {debater.responses.map((response, index) => (
              <div key={index} className={`${response.isLoading ? "animate-pulse" : ""} transition-all duration-300`}>
                <div className="flex items-center mb-3">
                  <div className={`w-5 h-5 mr-2 flex items-center justify-center rounded-full ${
                    debater.stance === "For" ? "bg-[#E71D73]/10 text-[#E71D73]" : 
                    debater.stance === "Against" ? "bg-[#CF196A]/10 text-[#CF196A]" : 
                    "bg-[#B71761]/10 text-[#B71761]"
                  }`}>
                    <span className="text-xs font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Research Round {index + 1}</p>
                </div>
                
                <div className="text-gray-700 space-y-3">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {response.text}
                  </p>
                  
                  {response.isLoading && (
                    <div className="mt-5 flex justify-center">
                      <div className="flex space-x-2">
                        <div className="h-2.5 w-2.5 bg-[#E71D73] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2.5 w-2.5 bg-[#E71D73] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2.5 w-2.5 bg-[#E71D73] rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {!response.isLoading && response.sources && response.sources.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-gray-100 animate-fadeIn">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        debater.stance === "For" ? "bg-[#E71D73]" : 
                        debater.stance === "Against" ? "bg-[#CF196A]" : 
                        "bg-[#B71761]"
                      }`}></span>
                      Sources
                    </h4>
                    <ul className="space-y-2 w-full">
                      {response.sources.map((source, idx) => (
                        <li key={idx} className="text-xs group/source">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center transition-all hover:translate-x-1 duration-200 ${
                              debater.stance === "For" ? "text-[#E71D73] hover:text-[#D61A6A]" : 
                              debater.stance === "Against" ? "text-[#CF196A] hover:text-[#BF0F5A]" : 
                              "text-[#B71761] hover:text-[#A7095A]"
                            }`}
                          >
                            <span className="mr-1.5 opacity-80 text-xs">→</span>
                            {source.title}
                            <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {index < debater.responses.length - 1 && (
                  <div className="border-b border-gray-100 my-5"></div>
                )}
              </div>
            ))}

            {debater.responses.length === 0 && (
              <div className="text-center py-12 text-gray-500 animate-fadeIn">
                <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  debater.stance === "For" ? "border-2 border-[#E71D73]/30" : 
                  debater.stance === "Against" ? "border-2 border-[#CF196A]/30" : 
                  "border-2 border-[#B71761]/30"
                }`}>
                  <span className={`text-2xl ${
                    debater.stance === "For" ? "text-[#E71D73]/70" : 
                    debater.stance === "Against" ? "text-[#CF196A]/70" : 
                    "text-[#B71761]/70"
                  }`}>?</span>
                </div>
                <p className="text-sm">No research yet. Start to see this AI's perspective.</p>
              </div>
            )}
          </div>
        </CardContent>
        
        {/* Background decorative elements */}
        <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none ${
          debater.stance === "For" ? "bg-[#E71D73]" : 
          debater.stance === "Against" ? "bg-[#CF196A]" : 
          "bg-[#B71761]"
        }`}></div>
      </Card>
    </motion.div>
  );
} 