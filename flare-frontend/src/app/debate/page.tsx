"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { DebateTopicSelector } from "@/components/debate/TopicSelector";
import { AIDebater } from "@/components/debate/AIDebater";
import { DebateContext } from "@/components/debate/DebateContext";
import { debateService, AIDebater as AIDebaterType } from "@/services/debateService";
import Link from "next/link";

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

// Add this mock data at the top of the file after the imports
const MOCK_DEBATERS = [
  { 
    id: 1, 
    name: "Perspective A", 
    stance: "For", 
    model: "GPT-4",
    responses: [], 
    isLoading: false 
  },
  { 
    id: 2, 
    name: "Perspective B", 
    stance: "Against", 
    model: "Claude",
    responses: [], 
    isLoading: false 
  },
  { 
    id: 3, 
    name: "Perspective C", 
    stance: "Neutral", 
    model: "PaLM 2",
    responses: [], 
    isLoading: false 
  }
];

const MOCK_RESPONSES = {
  "Is AI a threat to humanity?": [
    {
      text: "From my analysis, AI poses several existential risks to humanity. Advanced AI systems could develop goals misaligned with human values, leading to unintended consequences when optimizing for specific outcomes. The development of artificial general intelligence (AGI) without proper safeguards could create systems that humans cannot control once deployed. Recent research by Stuart Russell and the Future of Life Institute highlights the difficulty of encoding complex human values into AI systems, potentially leading to unpredictable behavior.",
      sources: [
        { title: "The Precipice: Existential Risk and the Future of Humanity", url: "https://example.com/precipice-book" },
        { title: "Future of Life Institute: AI Safety Research", url: "https://example.com/fli-ai-safety" }
      ]
    },
    {
      text: "The narrative of AI as an existential threat is largely overblown based on my research. Current AI systems are narrow in their capabilities and lack the general intelligence needed to pose the kind of threats often portrayed in media. Most leading AI researchers, including Yann LeCun and Andrew Ng, have argued that fears of superintelligence are premature given the current state of technology. Furthermore, AI's benefits in healthcare, climate science, and productivity enhancements far outweigh speculative risks.",
      sources: [
        { title: "AI Myths Debunked", url: "https://example.com/ai-myths" },
        { title: "The Economic Benefits of AI", url: "https://example.com/ai-economic-benefits" }
      ]
    },
    {
      text: "Examining the evidence on both sides, there are legitimate concerns about AI risks that deserve serious attention, while acknowledging that many fears may be exaggerated. Advanced AI systems do present novel challenges in safety, alignment, and social impact that researchers at organizations like DeepMind, OpenAI, and MIRI are actively working to address. The potential risks exist on a spectrum, from immediate concerns about algorithmic bias and privacy to longer-term questions about control and value alignment.",
      sources: [
        { title: "Balanced Assessment of AI Risk", url: "https://example.com/balanced-ai-risk" },
        { title: "AI Governance Frameworks", url: "https://example.com/ai-governance" }
      ]
    }
  ]
};

export default function DebatePage() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [isResearchStarted, setIsResearchStarted] = useState(false);
  const [debaters, setDebaters] = useState<Debater[]>([]);
  const [isLoadingDebaters, setIsLoadingDebaters] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [isAskingFollowUp, setIsAskingFollowUp] = useState(false);

  // Load available debaters on component mount
  useEffect(() => {
    const loadDebaters = async () => {
      setIsLoadingDebaters(true);
      try {
        // Comment out the API call and use mock data directly for testing
        // const availableDebaters = await debateService.getAvailableDebaters();
        const availableDebaters = MOCK_DEBATERS;
        
        setDebaters(
          availableDebaters.map(debater => ({
            ...debater,
            responses: [],
            isLoading: false
          }))
        );
      } catch (error) {
        console.error("Failed to load researchers:", error);
      } finally {
        setIsLoadingDebaters(false);
      }
    };

    loadDebaters();
  }, []);

  const handleStartResearch = async () => {
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
    
    setIsResearchStarted(true);
    setCurrentRound(1);
    
    // Use mock data instead of API call
    setTimeout(() => {
      const mockIndex = debaters.findIndex(d => d.id === 1);
      let mockResponse = `This is a simulated response for the topic "${finalTopic}" from a perspective`;
      let mockSources = [
        { title: "Research Paper on " + finalTopic, url: "https://example.com/research" },
        { title: "Analysis on " + finalTopic, url: "https://example.com/analysis" }
      ];
      
      // Use predefined mock responses if available
      if (finalTopic === "Is AI a threat to humanity?") {
        setDebaters(prev => 
          prev.map((debater, index) => ({
            ...debater,
            responses: [{ 
              text: MOCK_RESPONSES[finalTopic][index].text, 
              isLoading: false,
              sources: MOCK_RESPONSES[finalTopic][index].sources
            }],
            isLoading: false
          }))
        );
      } else {
        // For other topics, use generic mock data
        setDebaters(prev => 
          prev.map((debater, index) => ({
            ...debater,
            responses: [{ 
              text: `${mockResponse} from ${debater.stance} standpoint. This is mock data for immediate testing since the topic "${finalTopic}" doesn't have predefined responses.`, 
              isLoading: false,
              sources: mockSources
            }],
            isLoading: false
          }))
        );
      }
    }, 1500);
  };

  const handleFollowUp = async () => {
    if (!followUpQuestion.trim()) {
      setIsAskingFollowUp(false);
      return;
    }
    
    const finalTopic = selectedTopic === "custom" ? customTopic : selectedTopic;
    const nextRound = currentRound + 1;
    
    // Add a new round with the follow-up question
    setDebaters(prev => 
      prev.map(debater => ({
        ...debater,
        responses: [
          ...debater.responses,
          { 
            text: `Answering follow-up question: "${followUpQuestion}" from ${debater.stance} perspective...`, 
            isLoading: true 
          }
        ],
        isLoading: true
      }))
    );
    
    // Use mock data for follow-up question
    setTimeout(() => {
      let mockResponse = `Regarding your question "${followUpQuestion}", from my perspective, I would analyze it as follows:`;
      let mockSources = [
        { title: `Additional Research on ${followUpQuestion}`, url: "https://example.com/research-followup" },
        { title: `Analysis Related to ${followUpQuestion}`, url: "https://example.com/analysis-followup" }
      ];
      
      // Create follow-up mock responses
      const followUpResponses = {
        "Is AI a threat to humanity?": [
          {
            text: `Regarding your question "${followUpQuestion}": From a perspective concerned about AI risk, this is a crucial point. Advanced AI systems designed to optimize for specific goals could potentially find ways to achieve those goals that conflict with broader human welfare or values. This problem is known as the "alignment problem" in AI safety research. Several research institutes, including the Machine Intelligence Research Institute and the Future of Humanity Institute, are actively working on mathematical and technical frameworks to ensure AI systems remain aligned with human values even as they become more capable.`,
            sources: [
              { title: "AI Alignment Problem Overview", url: "https://example.com/alignment-problem" },
              { title: "Value Alignment Research", url: "https://example.com/value-alignment" }
            ]
          },
          {
            text: `Addressing your question "${followUpQuestion}": From my perspective, most current concerns about AI "outwitting" humans are based on misunderstandings of how AI systems actually function. Today's AI operates within strict constraints on the tasks it can perform and the data it can access. Even advanced systems like GPT-4 or Claude are fundamentally pattern-matching systems with no goals or motivations. The control problem is less about containing a malicious entity and more about careful engineering of systems that operate predictably within their design parameters.`,
            sources: [
              { title: "Understanding Modern AI Limitations", url: "https://example.com/ai-limitations" },
              { title: "Neural Networks and Control Systems", url: "https://example.com/control-systems" }
            ]
          },
          {
            text: `In response to "${followUpQuestion}": A balanced approach recognizes both sides of this issue. While current AI systems aren't autonomous agents with goals that could conflict with human interests, future systems might become more agentic. The challenge is to develop governance structures, technical safeguards, and monitoring systems that grow alongside AI capabilities. Organizations like the Partnership on AI are bringing together stakeholders from across industry, academia, and civil society to develop best practices for responsible AI development that address these concerns without unnecessarily limiting beneficial applications.`,
            sources: [
              { title: "Partnership on AI", url: "https://example.com/partnership-ai" },
              { title: "Balanced AI Governance Approaches", url: "https://example.com/governance-balance" }
            ]
          }
        ]
      };
      
      if (finalTopic === "Is AI a threat to humanity?" && followUpQuestion) {
        setDebaters(prev => 
          prev.map((debater, index) => ({
            ...debater,
            responses: [
              ...prev.find(d => d.id === debater.id)?.responses.slice(0, -1) || [],
              { 
                text: followUpResponses[finalTopic][index].text, 
                isLoading: false,
                sources: followUpResponses[finalTopic][index].sources
              }
            ],
            isLoading: false
          }))
        );
      } else {
        // For other topics or if no specific follow-up is defined
        setDebaters(prev => 
          prev.map((debater, index) => ({
            ...debater,
            responses: [
              ...prev.find(d => d.id === debater.id)?.responses.slice(0, -1) || [],
              { 
                text: `${mockResponse} ${debater.stance === "For" ? "I believe there are strong arguments supporting this view." : debater.stance === "Against" ? "I find significant evidence contradicting this perspective." : "I can see valid points on both sides of this question."} ${followUpQuestion.endsWith("?") ? "To answer directly: " : "In summary: "}This is a complex issue that requires careful consideration from multiple angles.`, 
                isLoading: false,
                sources: mockSources
              }
            ],
            isLoading: false
          }))
        );
      }
      
      setCurrentRound(nextRound);
      setFollowUpQuestion("");
      setIsAskingFollowUp(false);
    }, 1500);
  };

  const handleNewRound = async () => {
    const finalTopic = selectedTopic === "custom" ? customTopic : selectedTopic;
    const nextRound = currentRound + 1;
    
    // Add a new round of research
    setDebaters(prev => 
      prev.map(debater => ({
        ...debater,
        responses: [
          ...debater.responses,
          { 
            text: `Continuing research on "${finalTopic}" with further analysis...`, 
            isLoading: true 
          }
        ],
        isLoading: true
      }))
    );
    
    // Use mock data for next round instead of API call
    setTimeout(() => {
      let mockResponse = `This is a simulated response for round ${nextRound} on the topic "${finalTopic}" from a perspective`;
      let mockSources = [
        { title: `Round ${nextRound} Research on ${finalTopic}`, url: "https://example.com/research-round-2" },
        { title: `Additional Analysis on ${finalTopic}`, url: "https://example.com/analysis-extended" }
      ];
      
      // Create round 2 mock responses
      const roundTwoResponses = {
        "Is AI a threat to humanity?": [
          {
            text: "Building on my previous points, superintelligent AI could also render humans obsolete in the workforce through mass automation. A paper published by Oxford economists estimated that 47% of US jobs are at high risk of automation in the coming decades. Additionally, AI weapons systems introduce unprecedented risks in warfare, with the potential for autonomous decision-making in lethal contexts. Organizations like the Campaign to Stop Killer Robots have documented how removing human judgment from targeting decisions could violate international humanitarian law.",
            sources: [
              { title: "Oxford University: The Future of Employment", url: "https://example.com/oxford-future-employment" },
              { title: "Campaign to Stop Killer Robots", url: "https://example.com/stop-killer-robots" }
            ]
          },
          {
            text: "I want to address the automation concerns raised previously. Historical evidence shows that technological revolutions typically create more jobs than they eliminate, just in different sectors. The World Economic Forum's Future of Jobs report predicts that while 85 million jobs may be displaced by automation by 2025, 97 million new roles may emerge. Regarding AI safety, there are robust research communities dedicated to alignment, interpretability, and value learning that are making significant progress in ensuring AI systems remain beneficial and under human control.",
            sources: [
              { title: "World Economic Forum: Future of Jobs Report", url: "https://example.com/wef-jobs-report" },
              { title: "AI Alignment Research Overview", url: "https://example.com/alignment-research" }
            ]
          },
          {
            text: "A balanced approach requires distinguishing between different timeframes and types of risk. Near-term AI applications raise important but manageable concerns about fairness, accountability, and transparency. Medium-term impacts on labor markets will require policy responses including education reforms and potential social safety nets. Long-term existential risks remain speculative but warrant investment in technical safety research. A comprehensive governance framework involving multiple stakeholders—technologists, policymakers, ethicists, and the public—offers the most promising path forward.",
            sources: [
              { title: "Timeline of AI Development and Safety", url: "https://example.com/ai-timeline" },
              { title: "Multi-stakeholder Approach to AI Regulation", url: "https://example.com/multi-stakeholder-ai" }
            ]
          }
        ]
      };
      
      if (finalTopic === "Is AI a threat to humanity?" && nextRound === 2) {
        setDebaters(prev => 
          prev.map((debater, index) => ({
            ...debater,
            responses: [
              ...prev.find(d => d.id === debater.id)?.responses.slice(0, -1) || [],
              { 
                text: roundTwoResponses[finalTopic][index].text, 
                isLoading: false,
                sources: roundTwoResponses[finalTopic][index].sources
              }
            ],
            isLoading: false
          }))
        );
      } else {
        // For other topics or rounds beyond 2, use generic mock data
        setDebaters(prev => 
          prev.map((debater, index) => ({
            ...debater,
            responses: [
              ...prev.find(d => d.id === debater.id)?.responses.slice(0, -1) || [],
              { 
                text: `${mockResponse} from ${debater.stance} standpoint. This is round ${nextRound} mock data.`, 
                isLoading: false,
                sources: mockSources
              }
            ],
            isLoading: false
          }))
        );
      }
      
      setCurrentRound(nextRound);
    }, 1500);
  };

  return (
    <div className="min-h-screen grid-bg bg-white text-gray-800">
      <header className="border-b border-gray-100 p-6 backdrop-blur-sm z-10 sticky top-0 bg-white/90">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <span className="text-3xl font-bold text-[#E71D73]">Flare</span>
              <span className="text-3xl font-bold">Consensus</span>
            </div>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300">Home</Link></li>
              <li><Link href="/debate" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300">Research</Link></li>
              <li>
                <a href="https://github.com/your-username/flare-consensus" target="_blank" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300 flex items-center">
                  <span className="mr-1">✨</span> GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="container mx-auto py-10 text-gray-800 page-transition">
        <div className="relative mb-16">
          <div className="absolute top-[-100px] right-[10%] w-[300px] h-[300px] rounded-full bg-[#E71D73]/5 filter blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-50px] left-[5%] w-[250px] h-[250px] rounded-full bg-[#E71D73]/5 filter blur-[80px] pointer-events-none"></div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">Multi-Perspective Research</h1>
          <p className="text-gray-600 text-center max-w-xl mx-auto">Explore topics through multiple AI viewpoints to gain a comprehensive understanding</p>
        </div>
        
        {!isResearchStarted ? (
          <Card className="max-w-2xl mx-auto bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-gray-900 flex items-center">
                <span className="mr-2 text-[#E71D73]">🔍</span> Choose a Research Topic
              </CardTitle>
              <CardDescription className="text-gray-600">
                Select a predefined topic or create your own for the AI researchers to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <DebateTopicSelector 
                predefinedTopics={predefinedTopics}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                customTopic={customTopic}
                setCustomTopic={setCustomTopic}
              />
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button 
                className="w-full bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button group" 
                onClick={handleStartResearch}
                disabled={!selectedTopic || (selectedTopic === "custom" && !customTopic) || isLoadingDebaters || debaters.length === 0}
              >
                {isLoadingDebaters ? (
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-4 rounded-full bg-white/70 animate-pulse"></span>
                    Loading Researchers...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Begin Multi-Perspective Research
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-10">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-gray-900">
                  {selectedTopic === "custom" ? customTopic : selectedTopic}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Multiple AI perspectives analyzing this topic with different viewpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DebateContext topic={selectedTopic === "custom" ? customTopic : selectedTopic} />
              </CardContent>
            </Card>

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E71D73]/0 via-[#E71D73]/10 to-[#E71D73]/0 -z-10 blur-xl h-[1px] top-1/2 transform -translate-y-1/2"></div>
              
              <div className="flex justify-center mb-2">
                <div className="px-3 py-1 rounded-full bg-[#E71D73]/10 border border-[#E71D73]/20 text-[#E71D73] text-sm inline-block">
                  <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#E71D73] animate-pulse"></span>
                  Research Round {currentRound}
                </div>
              </div>
            </div>

            {/* Side-by-side viewpoints */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {debaters.map((debater) => (
                <div key={debater.id} className="page-transition">
                  <AIDebater debater={debater} />
                </div>
              ))}
            </div>

            {/* Follow Up Question Section */}
            <div className="mt-10 flex flex-col gap-4 items-center">
              {isAskingFollowUp ? (
                <Card className="w-full max-w-2xl bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 text-lg flex items-center">
                      <span className="mr-2 text-[#E71D73]">❓</span> Ask a Follow-up Question
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Ask a specific question to get more detailed insights on this topic
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="What else would you like to know about this topic?"
                      value={followUpQuestion}
                      onChange={(e) => setFollowUpQuestion(e.target.value)}
                      className="min-h-[100px] bg-white border-gray-300 text-gray-700 placeholder:text-gray-400 focus:border-[#E71D73] transition-all p-4 glow-border-focus"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsAskingFollowUp(false);
                        setFollowUpQuestion("");
                      }}
                      className="border-gray-300 text-gray-700 hover:text-[#E71D73] hover:border-[#E71D73]"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleFollowUp} 
                      disabled={!followUpQuestion.trim() || debaters.some(d => d.isLoading)}
                      className="bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button"
                    >
                      Submit Question
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setIsAskingFollowUp(true)} 
                    className="bg-white border border-[#E71D73] text-[#E71D73] hover:bg-[#E71D73]/5 transition-all"
                  >
                    Ask a Follow-up Question
                  </Button>

                  <Button 
                    onClick={handleNewRound} 
                    disabled={debaters.some(d => d.isLoading)}
                    className="bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button group"
                  >
                    {debaters.some(d => d.isLoading) ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 rounded-full bg-white/70 animate-pulse"></span>
                        Researching...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Generate Additional Research
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-20 border-t border-gray-100 py-10 px-6 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2024 Flare Consensus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 