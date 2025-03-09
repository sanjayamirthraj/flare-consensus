"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DebateTopicSelector } from "@/components/debate/TopicSelector";
import { AIDebater } from "@/components/debate/AIDebater";
import { DebateContext } from "@/components/debate/DebateContext";
import { debateService, AIDebater as AIDebaterType } from "@/services/debateService";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResearchPaper } from "@/components/debate/ResearchPaper";

const predefinedTopics = [
  "Is AI a threat to humanity?",
  "Should cryptocurrency be regulated?",
  "Is climate change the biggest threat facing humanity?",
  "Should universal basic income be implemented?",
  "Is space exploration worth the cost?",
];

interface Response {
  text: string;
  isLoading: boolean;
  sources?: {
    title: string;
    url: string;
  }[];
}

interface Debater extends AIDebaterType {
  responses: Response[];
  isLoading: boolean;
}

export default function DebatePage() {
  // Core state
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [debaters, setDebaters] = useState<Debater[]>([]);
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(0); 
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Follow-up question state
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const [showFollowUpForm, setShowFollowUpForm] = useState<boolean>(false);
  
  // Research paper state
  const [researchPaper, setResearchPaper] = useState<any>(null);
  const [isGeneratingPaper, setIsGeneratingPaper] = useState<boolean>(false);
  const [showResearchPaper, setShowResearchPaper] = useState<boolean>(false);

  // Effect to load debaters on mount - this only happens once
  useEffect(() => {
    const loadDebaters = async () => {
      try {
        const availableDebaters = await debateService.getAvailableDebaters();
        setDebaters(
          availableDebaters.map(debater => ({
            ...debater,
            responses: [],
            isLoading: false
          }))
        );
        setApiError(null);
      } catch (error) {
        console.error("Failed to load debaters:", error);
        setApiError("Failed to load debaters. Please try refreshing the page.");
      }
    };

    loadDebaters();
  }, []);

  // Get the current topic (either selected or custom)
  const getCurrentTopic = useCallback(() => {
    return customTopic || selectedTopic;
  }, [customTopic, selectedTopic]);

  // Handle starting a new research session
  const handleStartResearch = useCallback(async () => {
    const topic = getCurrentTopic();
    if (!topic) return;
    
    // Reset research state
    setIsResearching(true);
    setCurrentRound(1);
    setApiError(null);
    
    // Update debaters to show loading state with staggered messages
    setDebaters(prev => 
      prev.map((debater, index) => ({
        ...debater,
        responses: [{ 
          text: index === 0 
            ? `Researching "${topic}" from ${debater.stance} perspective...` 
            : `Waiting to research "${topic}" from ${debater.stance} perspective${'.'.repeat((index % 3) + 1)}`,
          isLoading: true 
        }],
        isLoading: true
      }))
    );
    
    try {
      // Get a fresh copy of debaters state after the update
      const currentDebatersState = [...debaters];
      
      // Process each debater sequentially to avoid race conditions
      for (let i = 0; i < currentDebatersState.length; i++) {
        const debater = currentDebatersState[i];
        
        // Update message to show this debater is currently being processed
        if (i > 0) {
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              return {
                ...d,
                responses: [{ 
                  text: `Researching "${topic}" from ${d.stance} perspective...`, 
                  isLoading: true 
                }]
              };
            });
          });
        }
        
        try {
          const response = await debateService.getAIResponse(
            topic, 
            debater.id, 
            debater.stance, 
            1
          );
          
          // Update this debater with response
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              return {
                ...d,
                responses: [{ 
                  text: response.text, 
                  isLoading: false,
                  sources: response.sources
                }],
                isLoading: false
              };
            });
          });
        } catch (error) {
          console.error(`Error getting response for ${debater.stance}:`, error);
          
          // Update with error
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              return {
                ...d,
                responses: [{ 
                  text: `Failed to generate a response for ${d.stance} perspective. Please try again.`,
                  isLoading: false,
                  sources: []
                }],
                isLoading: false
              };
            });
          });
        }
      }
      
      setIsResearching(false);
    } catch (error) {
      console.error("Error in research process:", error);
      setApiError("An error occurred during the debate. Please try again or choose a different topic.");
      
      // Reset loading states on error
      setDebaters(prev => 
        prev.map(debater => ({
          ...debater,
          responses: debater.responses.map(r => ({ 
            ...r, 
            isLoading: false,
            text: r.isLoading ? 'Failed to load response. Please try again.' : r.text
          })),
          isLoading: false
        }))
      );
      setIsResearching(false);
    }
  }, [debaters, getCurrentTopic]);

  // Handle starting a new round of research
  const handleNewRound = useCallback(async () => {
    const topic = getCurrentTopic();
    const nextRound = currentRound + 1;
    
    // Add a new loading response to each debater
    setDebaters(prev => 
      prev.map(debater => ({
        ...debater,
        responses: [
          ...debater.responses,
          { 
            text: `Continuing research on "${topic}" with round ${nextRound}...`, 
            isLoading: true 
          }
        ],
        isLoading: true
      }))
    );
    
    try {
      // Get a fresh copy of debaters state after the update
      const currentDebatersState = [...debaters];
      
      // Process each debater sequentially
      for (let i = 0; i < currentDebatersState.length; i++) {
        const debater = currentDebatersState[i];
        
        try {
          const response = await debateService.getAIResponse(
            topic, 
            debater.id, 
            debater.stance, 
            nextRound
          );
          
          // Update this debater's latest response
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              const updatedResponses = [...d.responses];
              updatedResponses[updatedResponses.length - 1] = {
                text: response.text,
                isLoading: false,
                sources: response.sources
              };
              
              return {
                ...d,
                responses: updatedResponses,
                isLoading: false
              };
            });
          });
        } catch (error) {
          console.error(`Error getting response for ${debater.stance}:`, error);
          
          // Update with error
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              const updatedResponses = [...d.responses];
              updatedResponses[updatedResponses.length - 1] = {
                text: `Failed to generate a response for round ${nextRound}. Please try again.`,
                isLoading: false,
                sources: []
              };
              
              return {
                ...d,
                responses: updatedResponses,
                isLoading: false
              };
            });
          });
        }
      }
      
      setCurrentRound(nextRound);
    } catch (error) {
      console.error("Error in new round process:", error);
      setApiError("An error occurred while generating new research. Please try again.");
      
      // Reset loading states on error
      setDebaters(prev => 
        prev.map(debater => ({
          ...debater,
          responses: debater.responses.map((r, idx) => 
            idx === debater.responses.length - 1 
              ? { ...r, isLoading: false, text: 'Failed to load response. Please try again.' } 
              : r
          ),
          isLoading: false
        }))
      );
    }
  }, [currentRound, debaters, getCurrentTopic]);

  // Handle follow-up question submission
  const handleFollowUp = useCallback(async () => {
    if (!followUpQuestion.trim()) return;
    
    const topic = getCurrentTopic();
    const nextRound = currentRound + 1;
    setApiError(null);
    
    // Add a new loading response to each debater with staggered messages
    setDebaters(prev => 
      prev.map((debater, index) => ({
        ...debater,
        responses: [
          ...debater.responses,
          { 
            text: index === 0
              ? `Answering follow-up question: "${followUpQuestion}" from ${debater.stance} perspective...`
              : `Waiting to answer: "${followUpQuestion}" from ${debater.stance} perspective${'.'.repeat((index % 3) + 1)}`,
            isLoading: true 
          }
        ],
        isLoading: true
      }))
    );
    
    try {
      // Get a fresh copy of debaters state after the update
      const currentDebatersState = [...debaters];
      
      // Process each debater sequentially
      for (let i = 0; i < currentDebatersState.length; i++) {
        const debater = currentDebatersState[i];
        
        // Update message to show this debater is currently being processed
        if (i > 0) {
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              const updatedResponses = [...d.responses];
              updatedResponses[updatedResponses.length - 1] = {
                text: `Answering follow-up question: "${followUpQuestion}" from ${debater.stance} perspective...`,
                isLoading: true
              };
              
              return {
                ...d,
                responses: updatedResponses
              };
            });
          });
        }
        
        try {
          const response = await debateService.getFollowUpResponse(
            topic, 
            debater.id, 
            debater.stance, 
            followUpQuestion
          );
          
          // Update this debater's latest response
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              const updatedResponses = [...d.responses];
              updatedResponses[updatedResponses.length - 1] = {
                text: response.text,
                isLoading: false,
                sources: response.sources
              };
              
              return {
                ...d,
                responses: updatedResponses,
                isLoading: false
              };
            });
          });
        } catch (error) {
          console.error(`Error getting follow-up response for ${debater.stance}:`, error);
          
          // Update with error
          setDebaters(prevState => {
            return prevState.map((d, idx) => {
              if (idx !== i) return d;
              
              const updatedResponses = [...d.responses];
              updatedResponses[updatedResponses.length - 1] = {
                text: `Failed to generate a response for your follow-up question. Please try again.`,
                isLoading: false,
                sources: []
              };
              
              return {
                ...d,
                responses: updatedResponses,
                isLoading: false
              };
            });
          });
        }
      }
      
      setCurrentRound(nextRound);
      setFollowUpQuestion("");
      setShowFollowUpForm(false);
    } catch (error) {
      console.error("Error in follow-up process:", error);
      setApiError("An error occurred while processing your follow-up question. Please try again.");
      
      // Reset loading states on error
      setDebaters(prev => 
        prev.map(debater => ({
          ...debater,
          responses: debater.responses.map((r, idx) => 
            idx === debater.responses.length - 1
              ? { ...r, isLoading: false, text: 'Failed to load response. Please try again.' }
              : r
          ),
          isLoading: false
        }))
      );
    }
  }, [debaters, followUpQuestion, getCurrentTopic, currentRound]);

  // Handle generation of research paper
  const handleGenerateResearchPaper = useCallback(async () => {
    if (!getCurrentTopic() || isGeneratingPaper || isResearching) return;
    
    setIsGeneratingPaper(true);
    
    try {
      // Create a formatted version of debater responses to pass to the service
      const debaterResponses = debaters.map(debater => ({
        name: debater.name,
        stance: debater.stance,
        responses: debater.responses.map(r => ({ text: r.text }))
      }));
      
      // Call the debate service to generate the research paper
      const paper = await debateService.generateResearchPaper(getCurrentTopic(), debaterResponses);
      
      setResearchPaper(paper);
      setShowResearchPaper(true);
    } catch (error) {
      console.error("Failed to generate research paper:", error);
      // Could add an error toast notification here
    } finally {
      setIsGeneratingPaper(false);
    }
  }, [debaters, getCurrentTopic, isGeneratingPaper, isResearching]);

  // Add this section near where you render UI elements
  const renderErrorMessage = () => {
    if (!apiError) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
        <p className="font-medium">Error</p>
        <p>{apiError}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced background with subtle grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none"></div>
      
      {/* Animated gradient orbs in background */}
      <motion.div 
        className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E71D73]/5 rounded-full blur-[120px] opacity-70 pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E71D73]/5 rounded-full blur-[100px] opacity-60 pointer-events-none"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* New animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#E71D73]/40"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.7, 0.4],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="border-b border-gray-100 p-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm animate-fadeIn">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 relative z-10">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-[#E71D73] hover:opacity-90 transition">
              <div className="text-2xl font-bold">Marckarimi</div>
            </Link>
            <div className="hidden md:block mx-8 h-6 w-px bg-gray-200"></div>
            <div className="hidden md:block text-lg text-gray-800 font-semibold">AI Deep Research</div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/">
              <Button variant="outline" size="sm" className="rounded-full text-sm">
                <span className="mr-2">↩</span> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 relative z-[1]">
        <motion.h1 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#E71D73] relative inline-block">
            AI
            <span className="absolute inset-0 bg-[#E71D73]/10 blur-sm -z-10 rounded-lg animate-pulse"></span>
          </span> 
          <span className="relative">
            Debate: {getCurrentTopic() || "Select a Topic"}
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#E71D73] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </motion.h1>
        
        {/* Error Message */}
        {renderErrorMessage()}
        
        {/* Topic Selection Section - Moved to top */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Topic Selection */}
            <motion.div 
              className="lg:col-span-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E71D73]/30"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(231, 29, 115, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h2 className="text-xl font-bold mb-5 text-gray-800 flex items-center">
                <span className="text-[#E71D73] mr-2">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🔍
                  </motion.div>
                </span>
                Select Debate Topic
              </h2>
              
              <DebateTopicSelector
                predefinedTopics={predefinedTopics}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                customTopic={customTopic}
                setCustomTopic={setCustomTopic}
              />
              
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  onClick={handleStartResearch}
                  disabled={!getCurrentTopic() || isResearching}
                  className="w-full bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button group transition-all relative overflow-hidden"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-[#E71D73]/0 via-[#E71D73]/40 to-[#E71D73]/0 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5
                    }}
                  />
                  {isResearching ? (
                    <span className="flex items-center justify-center">
                      <motion.div 
                        className="mr-2 inline-block w-2 h-2 bg-white/70 rounded-full"
                        animate={{ x: [-2, 2, -2] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      Researching...
                    </span>
                  ) : (
                    <span className="relative z-10">Start Research</span>
                  )}
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Topic Context */}
            <div className="lg:col-span-6">
              {getCurrentTopic() ? (
                <DebateContext key={`initial-${getCurrentTopic()}`} topic={getCurrentTopic()} />
              ) : (
                <div className="h-full bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center text-center bg-gradient-to-br from-white to-[#E71D73]/5">
                  <div>
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E71D73]/10 flex items-center justify-center relative"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-2xl">📚</span>
                      <motion.div 
                        className="absolute -inset-1 border border-[#E71D73]/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Topic Overview</h3>
                    <p className="text-gray-500">Select a topic to see its overview and context</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Debate Content - Now Full Width */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {debaters.length > 0 && currentRound > 0 ? (
            <>
              {/* Debate round indicator */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, duration: 1.2 }}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E71D73]/10 border border-[#E71D73]/20 text-[#E71D73] text-sm font-medium animate-fadeIn">
                  <motion.div 
                    className="mr-2 inline-block w-3 h-3 rounded-full bg-[#E71D73]/40"
                    animate={{ 
                      x: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 4.0,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "reverse"
                    }}
                  />
                  <span>Research Round {currentRound}</span>
                </div>
              </motion.div>
              
              {/* Topic Context - Shown during research phase as well */}
              {getCurrentTopic() && (
                <motion.div 
                  className="mb-8"
                  key={`context-container-${getCurrentTopic()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
                    <span className="text-[#E71D73]">{getCurrentTopic()}</span> - Topic Overview
                  </h3>
                  <DebateContext key={`debate-${getCurrentTopic()}-${currentRound}`} topic={getCurrentTopic()} />
                </motion.div>
              )}
              
              {/* Debaters grid - Now full width with staggered animation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {debaters.map((debater, index) => (
                  <motion.div
                    key={debater.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1.0, 
                      delay: index * 0.15
                    }}
                  >
                    <AIDebater debater={debater} />
                  </motion.div>
                ))}
              </div>
              
              {/* Follow-up form */}
              {showFollowUpForm ? (
                <motion.div 
                  className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-md transition-all duration-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <span className="text-[#E71D73] mr-2">💬</span>
                    Ask a Follow-up Question
                  </h3>
                  <Textarea
                    placeholder="Ask a follow-up question to all debaters..."
                    value={followUpQuestion}
                    onChange={(e) => setFollowUpQuestion(e.target.value)}
                    className="min-h-[120px] bg-white border-gray-300 text-gray-700 mb-5 focus:border-[#E71D73] focus:ring-[#E71D73]/20"
                  />
                  <div className="flex justify-end gap-4">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setShowFollowUpForm(false);
                          setFollowUpQuestion("");
                        }}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button 
                        onClick={handleFollowUp} 
                        disabled={!followUpQuestion.trim() || isResearching}
                        className="bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button"
                      >
                        {isResearching ? (
                          <span className="flex items-center">
                            <span className="mr-2 inline-block w-2 h-2 bg-white rounded-full animate-ping"></span>
                            Processing...
                          </span>
                        ) : (
                          "Submit Question"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex justify-center gap-5 mb-10">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <span className="absolute inset-0 rounded-md bg-[#E71D73]/10 -z-10 filter blur-md" />
                    <Button 
                      variant="outline" 
                      onClick={() => setShowFollowUpForm(true)}
                      disabled={isResearching}
                      className="border-[#E71D73]/30 text-[#E71D73] hover:bg-[#E71D73]/5 hover:border-[#E71D73] px-6 relative overflow-hidden group"
                    >
                      <motion.span 
                        className="absolute inset-0 bg-[#E71D73]/5 -z-10"
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="mr-2">💬</span> Ask Follow-up
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <span className="absolute inset-0 rounded-md bg-[#2070E7]/10 -z-10 filter blur-md" />
                    <Button 
                      variant="outline" 
                      onClick={handleGenerateResearchPaper}
                      disabled={isResearching || isGeneratingPaper}
                      className="border-[#2070E7]/30 text-[#2070E7] hover:bg-[#2070E7]/5 hover:border-[#2070E7] px-6 relative overflow-hidden group"
                    >
                      <motion.span 
                        className="absolute inset-0 bg-[#2070E7]/5 -z-10"
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.2 }}
                      />
                      {isGeneratingPaper ? (
                        <span className="flex items-center">
                          <span className="mr-2 inline-block w-2 h-2 bg-white rounded-full animate-ping"></span>
                          Generating...
                        </span>
                      ) : (
                        <>
                          <span className="mr-2">📝</span> Generate Research Paper
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              )}
            </>
          ) : (
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-10 text-center shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-[#E71D73]/5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E71D73]/10 flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-4xl">🤔</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#E71D73]/30 to-transparent"
                  animate={{ y: ["120%", "90%", "120%"] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Start your AI Debate</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Select a topic above and start research to see multiple AI perspectives debating the issue.
              </p>
              <motion.div 
                className="inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-[#E71D73] text-2xl mb-2">
                  ↑
                </div>
                <p className="text-sm text-gray-500">Choose a topic to begin</p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 mt-12 text-center text-gray-500 text-sm bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} <span className="text-[#E71D73]">Marckarimi</span> • AI-Powered Deep Research Platform</p>
          </div>
        </div>
      </footer>

      {/* Add Research Paper Component */}
      {researchPaper && (
        <ResearchPaper 
          paperData={researchPaper}
          isOpen={showResearchPaper}
          onClose={() => setShowResearchPaper(false)}
          topic={getCurrentTopic()}
        />
      )}
    </div>
  );
} 