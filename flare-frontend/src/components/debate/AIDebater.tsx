"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpenCheck } from "lucide-react";

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
      "For": ["bg-[#E71D73]", "border-[#E71D73]/70"],
      "Against": ["bg-[#CF196A]", "border-[#CF196A]/70"],
      "Neutral": ["bg-[#B71761]", "border-[#B71761]/70"]
    };
    
    // Get first letter of model or use id as fallback
    const getAvatarContent = () => {
      if (debater.model) {
        return debater.model.charAt(0);
      }
      return id.toString();
    };
    
    const [bg, border] = colors[stance as keyof typeof colors] || ["bg-[#E71D73]", "border-[#E71D73]/70"];
    
    return (
      <div className={`relative group`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${bg} border-2 ${border} shadow-sm`}>
          <span className="text-white font-bold text-lg">
            {getAvatarContent()}
          </span>
        </div>
        <div className="absolute -inset-0.5 bg-[#E71D73] opacity-0 blur group-hover:opacity-10 transition duration-500 rounded-xl"></div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <CardHeader className="border-b border-gray-100 pb-3">
          <div className="flex items-center gap-4">
            {getDebaterAvatar(debater.id, debater.stance)}
            <div>
              <CardTitle className="text-lg text-gray-900">{debater.name}</CardTitle>
              <CardDescription className="text-gray-500">
                {debater.stance} Perspective {debater.model && <span className="opacity-80">• {debater.model}</span>}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 flex-grow overflow-auto">
          <div className="space-y-4">
            {debater.responses.map((response, index) => (
              <div key={index} className={`${response.isLoading ? "animate-pulse" : ""}`}>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 mr-2 text-[#E71D73] opacity-70 flex items-center justify-center">
                    <span className="w-3 h-3 border-2 border-[#E71D73] rounded-full"></span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Research Round {index + 1}</p>
                </div>
                
                <div className="text-gray-700 space-y-2">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {response.text}
                  </p>
                  
                  {response.isLoading && (
                    <div className="mt-4 flex justify-center">
                      <div className="h-2 w-2 bg-[#E71D73] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="mx-1 h-2 w-2 bg-[#E71D73] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-[#E71D73] rounded-full animate-bounce"></div>
                    </div>
                  )}
                </div>
                
                {!response.isLoading && response.sources && response.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#E71D73] rounded-full mr-2"></span>
                      Sources
                    </h4>
                    <ul className="space-y-1 w-full">
                      {response.sources.map((source, idx) => (
                        <li key={idx} className="text-xs group/source">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-[#E71D73] hover:text-[#CF196A] transition-colors"
                          >
                            <span className="mr-1 text-[#E71D73] opacity-70 group-hover/source:translate-x-0.5 group-hover/source:-translate-y-0.5 transition-transform">→</span>
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {index < debater.responses.length - 1 && (
                  <div className="border-b border-gray-100 my-4"></div>
                )}
              </div>
            ))}

            {debater.responses.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-400">?</span>
                </div>
                <p className="text-sm">No research yet. Start to see this AI's perspective.</p>
              </div>
            )}
          </div>
        </CardContent>
        
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E71D73]/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
      </Card>
    </div>
  );
} 