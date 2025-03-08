"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DebateTopicSelector } from "@/components/debate/TopicSelector";
import { AIDebater } from "@/components/debate/AIDebater";
import { DebateContext } from "@/components/debate/DebateContext";
import { debateService, AIDebater as AIDebaterType } from "@/services/debateService";

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
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [isDebateStarted, setIsDebateStarted] = useState(false);
  const [debaters, setDebaters] = useState<Debater[]>([]);
  const [isLoadingDebaters, setIsLoadingDebaters] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  // Load available debaters on component mount
  useEffect(() => {
    const loadDebaters = async () => {
      setIsLoadingDebaters(true);
      try {
        const availableDebaters = await debateService.getAvailableDebaters();
        setDebaters(
          availableDebaters.map(debater => ({
            ...debater,
            responses: [],
            isLoading: false
          }))
        );
      } catch (error) {
        console.error("Failed to load debaters:", error);
      } finally {
        setIsLoadingDebaters(false);
      }
    };

    loadDebaters();
  }, []);

  const handleStartDebate = async () => {
    const finalTopic = selectedTopic === "custom" ? customTopic : selectedTopic;
    if (!finalTopic) return;

    // Reset debaters with the new topic
    setDebaters(prev => 
      prev.map(debater => ({
        ...debater,
        responses: [{ text: `Researching "${finalTopic}" from ${debater.stance} perspective...`, isLoading: true }],
        isLoading: true
      }))
    );
    
    setIsDebateStarted(true);
    setCurrentRound(1);
    
    // Make API calls to get responses from different AI perspectives
    try {
      const responsePromises = debaters.map(debater => 
        debateService.getAIResponse(finalTopic, debater.id, debater.stance, 1)
      );
      
      const responses = await Promise.all(responsePromises);
      
      setDebaters(prev => 
        prev.map((debater, index) => ({
          ...debater,
          responses: [{ 
            text: responses[index].text, 
            isLoading: false,
            sources: responses[index].sources
          }],
          isLoading: false
        }))
      );
    } catch (error) {
      console.error("Failed to get AI responses:", error);
      // Handle error state
      setDebaters(prev => 
        prev.map(debater => ({
          ...debater,
          responses: [{ text: "Failed to load response. Please try again.", isLoading: false }],
          isLoading: false
        }))
      );
    }
  };

  const handleNewRound = async () => {
    const finalTopic = selectedTopic === "custom" ? customTopic : selectedTopic;
    const nextRound = currentRound + 1;
    
    // Add a new round of debate
    setDebaters(prev => 
      prev.map(debater => ({
        ...debater,
        responses: [
          ...debater.responses,
          { 
            text: `Continuing debate on "${finalTopic}" with further analysis...`, 
            isLoading: true 
          }
        ],
        isLoading: true
      }))
    );
    
    // Make API calls for the next round
    try {
      const responsePromises = debaters.map(debater => 
        debateService.getAIResponse(finalTopic, debater.id, debater.stance, nextRound)
      );
      
      const responses = await Promise.all(responsePromises);
      
      setDebaters(prev => 
        prev.map((debater, index) => ({
          ...debater,
          responses: [
            ...prev.find(d => d.id === debater.id)?.responses.slice(0, -1) || [],
            { 
              text: responses[index].text, 
              isLoading: false,
              sources: responses[index].sources
            }
          ],
          isLoading: false
        }))
      );
      
      setCurrentRound(nextRound);
    } catch (error) {
      console.error("Failed to get AI responses for next round:", error);
      // Handle error state
      setDebaters(prev => 
        prev.map(debater => ({
          ...debater,
          responses: [
            ...prev.find(d => d.id === debater.id)?.responses.slice(0, -1) || [],
            { text: "Failed to load response. Please try again.", isLoading: false }
          ],
          isLoading: false
        }))
      );
    }
  };

  return (
    <div className="container mx-auto py-10 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Debate Platform</h1>
      
      {!isDebateStarted ? (
        <Card className="max-w-2xl mx-auto bg-white border-gray-200 shadow-sm text-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800">Choose a Topic</CardTitle>
            <CardDescription className="text-gray-500">
              Select a predefined topic or create your own for the AI debaters to discuss.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DebateTopicSelector 
              predefinedTopics={predefinedTopics}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              customTopic={customTopic}
              setCustomTopic={setCustomTopic}
            />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button group" 
              onClick={handleStartDebate}
              disabled={!selectedTopic || (selectedTopic === "custom" && !customTopic) || isLoadingDebaters || debaters.length === 0}
            >
              {isLoadingDebaters ? "Loading Debaters..." : "Start Debate"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-10">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">
                {selectedTopic === "custom" ? customTopic : selectedTopic}
              </CardTitle>
              <CardDescription className="text-gray-500">
                Multiple AI perspectives analyzing this topic with different viewpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DebateContext topic={selectedTopic === "custom" ? customTopic : selectedTopic} />
            </CardContent>
          </Card>

          <Tabs defaultValue={debaters[0]?.id.toString()} className="w-full">
            <TabsList className="grid bg-white border border-gray-200 p-1 mb-8 rounded-md" style={{ gridTemplateColumns: `repeat(${debaters.length}, 1fr)` }}>
              {debaters.map((debater) => (
                <TabsTrigger 
                  key={debater.id} 
                  value={debater.id.toString()}
                  className="data-[state=active]:bg-[#E71D73] data-[state=active]:text-white transition-all duration-300"
                >
                  {debater.name} ({debater.stance})
                </TabsTrigger>
              ))}
            </TabsList>
            
            {debaters.map((debater) => (
              <TabsContent key={debater.id} value={debater.id.toString()}>
                <AIDebater debater={debater} />
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-center">
            <Button 
              onClick={handleNewRound} 
              disabled={debaters.some(d => d.isLoading)}
              className="px-6 bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button group"
            >
              Generate Next Round of Debate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 