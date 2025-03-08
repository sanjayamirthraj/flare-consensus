"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ExternalLink, MessageSquare, Bot, AlertCircle, CPU } from "lucide-react";

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
  // Generate avatar for each debater
  const getDebaterAvatar = (id: number, stance: string) => {
    const colors = {
      "For": ["bg-[#E71D73]", "border-[#E71D73]/70"],
      "Against": ["bg-[#CF196A]", "border-[#CF196A]/70"],
      "Neutral": ["bg-[#B71761]", "border-[#B71761]/70"]
    };
    
    const modelIcons = {
      "GPT-4": <CPU size={20} className="text-white" />,
      "Claude": <Bot size={20} className="text-white" />,
      "PaLM 2": <AlertCircle size={20} className="text-white" />
    };
    
    const [bg, border] = colors[stance as keyof typeof colors] || ["bg-[#E71D73]", "border-[#E71D73]/70"];
    
    return (
      <div className={`relative group`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${bg} border-2 ${border} shadow-sm`}>
          <span className="text-white font-bold text-lg">
            {debater.model && modelIcons[debater.model as keyof typeof modelIcons] || id}
          </span>
        </div>
        <div className="absolute -inset-0.5 bg-[#E71D73] opacity-0 blur group-hover:opacity-10 transition duration-500 rounded-xl"></div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        {getDebaterAvatar(debater.id, debater.stance)}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{debater.name}</h3>
          <p className="text-gray-500">
            {debater.stance} Perspective 
            {debater.model && <span className="ml-2 opacity-80">• {debater.model}</span>}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {debater.responses.map((response, index) => (
          <Card key={index} className={`bg-white border-gray-200 ${response.isLoading ? "animate-pulse" : ""} transition-all duration-500 hover:shadow-md group overflow-hidden`}>
            <CardHeader className="pb-2 border-b border-gray-100 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-gray-700 flex items-center">
                <MessageSquare size={14} className="mr-2 text-[#E71D73] opacity-70" /> 
                Round {index + 1}
              </CardTitle>
              <div className="px-2 py-0.5 rounded-full bg-[#E71D73]/10 text-[#E71D73] text-xs border border-[#E71D73]/20">
                {debater.stance}
              </div>
            </CardHeader>
            
            <CardContent className="text-gray-700 pt-5 relative">
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
              
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E71D73]/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
            </CardContent>
            
            {!response.isLoading && response.sources && response.sources.length > 0 && (
              <CardFooter className="border-t border-gray-100 pt-4 flex-col items-start relative">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#E71D73] rounded-full mr-2"></span>
                  Sources
                </h4>
                <ul className="space-y-2 w-full">
                  {response.sources.map((source, idx) => (
                    <li key={idx} className="text-sm group/source">
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-[#E71D73] hover:text-[#CF196A] transition-colors"
                      >
                        <ExternalLink size={12} className="mr-2 opacity-70 group-hover/source:translate-x-0.5 group-hover/source:-translate-y-0.5 transition-transform" />
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardFooter>
            )}
          </Card>
        ))}

        {debater.responses.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <Bot size={40} className="mx-auto mb-4 text-gray-400" />
            <p>No responses yet. Start the debate to see this AI's perspective.</p>
          </div>
        )}
      </div>
    </div>
  );
} 