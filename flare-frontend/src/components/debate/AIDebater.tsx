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
        <motion.div 
          className={`flex h-16 w-16 items-center justify-center rounded-xl ${bg} border-2 ${border} shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <motion.span 
            className="text-white font-bold text-xl"
            animate={{ 
              opacity: [1, 0.8, 1],
              textShadow: [
                "0 0 5px rgba(255,255,255,0.3)",
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 5px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {getAvatarContent()}
          </motion.span>
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-[#E71D73] opacity-0 blur group-hover:opacity-20 transition duration-300 rounded-xl"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
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
      <Card className={`bg-white border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group relative ${
        debater.isLoading ? 'research-card-glow' : ''
      }`}>
        {/* Card background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <motion.div 
            className="w-full h-full"
            style={{ 
              backgroundImage: `radial-gradient(circle at 20% 30%, #E71D73 1px, transparent 1px), radial-gradient(circle at 50% 60%, #E71D73 1px, transparent 1px), radial-gradient(circle at 80% 40%, #E71D73 1px, transparent 1px)`,
              backgroundSize: "60px 60px"
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Add slow pulsing background for loading state */}
        {debater.isLoading && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#E71D73]/1 via-[#E71D73]/2 to-[#E71D73]/1 pointer-events-none"
            animate={{ 
              x: [-20, 20, -20],
            }}
            transition={{ 
              duration: 8.0,
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        )}
        
        <CardHeader className="border-b border-gray-100 pb-4 relative">
          <div className="flex items-center gap-4">
            {getDebaterAvatar(debater.id, debater.stance)}
            <div>
              <CardTitle className="text-xl text-gray-900 mb-1">{debater.name}</CardTitle>
              <CardDescription className="text-gray-500 flex items-center">
                <motion.span 
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    debater.stance === "For" ? "bg-[#E71D73]" : 
                    debater.stance === "Against" ? "bg-[#CF196A]" : 
                    "bg-[#B71761]"
                  }`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="font-medium">{debater.stance}</span> Perspective 
                {debater.model && (
                  <span className="ml-2 opacity-80 flex items-center">
                    • <span className="ml-1">{debater.model}</span>
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          
          {/* Decorative accent bar at the bottom */}
          <motion.div 
            className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${
              debater.stance === "For" ? "bg-gradient-to-r from-[#E71D73] to-[#E71D73]/50" : 
              debater.stance === "Against" ? "bg-gradient-to-r from-[#CF196A] to-[#CF196A]/50" : 
              "bg-gradient-to-r from-[#B71761] to-[#B71761]/50"
            }`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </CardHeader>
        
        <CardContent className="pt-5 flex-grow overflow-auto">
          <div className="space-y-6">
            {debater.responses.map((response, index) => (
              <motion.div 
                key={index} 
                className="transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={`flex items-center mb-3 pb-2 ${index > 0 ? "pt-2 border-t border-gray-100" : ""}`}>
                  <motion.div 
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded-full ${
                      debater.stance === "For" ? "bg-[#E71D73]/10 text-[#E71D73]" : 
                      debater.stance === "Against" ? "bg-[#CF196A]/10 text-[#CF196A]" : 
                      "bg-[#B71761]/10 text-[#B71761]"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-xs font-semibold">{index + 1}</span>
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Research Round {index + 1}</p>
                    {index > 0 && (
                      <p className="text-xs text-gray-500">Follow-up</p>
                    )}
                  </div>
                </div>
                
                <div className="text-gray-700 space-y-3">
                  {response.isLoading ? (
                    <motion.p 
                      className="whitespace-pre-wrap leading-relaxed text-gray-600"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 1.0 }}
                    >
                      {response.text}
                    </motion.p>
                  ) : (
                    <motion.p 
                      className="whitespace-pre-wrap leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    >
                      {response.text}
                    </motion.p>
                  )}
                  
                  {response.isLoading && (
                    <div className="mt-5 flex justify-center">
                      <div className="flex space-x-3">
                        <motion.div 
                          className="h-3 w-3 bg-[#E71D73]/40 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, 3, 0]
                          }}
                          transition={{ 
                            duration: 4.0,
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0,
                            repeatType: "reverse"
                          }}
                        />
                        <motion.div 
                          className="h-3 w-3 bg-[#E71D73]/40 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, 3, 0]
                          }}
                          transition={{ 
                            duration: 4.0,
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 1.3,
                            repeatType: "reverse"
                          }}
                        />
                        <motion.div 
                          className="h-3 w-3 bg-[#E71D73]/40 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, 3, 0]
                          }}
                          transition={{ 
                            duration: 4.0,
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 2.6,
                            repeatType: "reverse"
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {!response.isLoading && response.sources && response.sources.length > 0 && (
                  <motion.div 
                    className="mt-5 pt-4 border-t border-gray-100 animate-fadeIn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <motion.span 
                        className={`w-2 h-2 rounded-full mr-2 ${
                          debater.stance === "For" ? "bg-[#E71D73]" : 
                          debater.stance === "Against" ? "bg-[#CF196A]" : 
                          "bg-[#B71761]"
                        }`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className={
                        debater.stance === "For" ? "text-[#E71D73]" : 
                        debater.stance === "Against" ? "text-[#CF196A]" : 
                        "text-[#B71761]"
                      }>Sources</span>
                    </h4>
                    <ul className="space-y-2 w-full">
                      {response.sources.map((source, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-xs group/source"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx, duration: 0.5 }}
                          whileHover={{ x: 3 }}
                        >
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
                            <motion.span 
                              className="mr-1.5 opacity-80 text-xs"
                              animate={{ x: [0, 2, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >→</motion.span>
                            {source.title}
                            <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {debater.responses.length === 0 && (
              <motion.div 
                className="text-center py-12 text-gray-500 animate-fadeIn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    debater.stance === "For" ? "border-2 border-[#E71D73]/30" : 
                    debater.stance === "Against" ? "border-2 border-[#CF196A]/30" : 
                    "border-2 border-[#B71761]/30"
                  }`}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(231,29,115,0)",
                      "0 0 10px rgba(231,29,115,0.3)",
                      "0 0 0 rgba(231,29,115,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span 
                    className={`text-2xl ${
                      debater.stance === "For" ? "text-[#E71D73]/70" : 
                      debater.stance === "Against" ? "text-[#CF196A]/70" : 
                      "text-[#B71761]/70"
                    }`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >?</motion.span>
                </motion.div>
                <p className="text-sm">No research yet. Start to see this AI's perspective.</p>
              </motion.div>
            )}
          </div>
        </CardContent>
        
        {/* Background decorative elements */}
        <motion.div 
          className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none ${
            debater.stance === "For" ? "bg-[#E71D73]" : 
            debater.stance === "Against" ? "bg-[#CF196A]" : 
            "bg-[#B71761]"
          }`}
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </Card>
    </motion.div>
  );
} 