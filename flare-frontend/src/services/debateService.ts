// This service makes API calls to the backend for debate functionality

interface DebateResponse {
  text: string;
  sources?: {
    title: string;
    url: string;
  }[];
}

export interface AIDebater {
  id: number;
  name: string;
  stance: string; // "For", "Against", "Neutral"
  model: string;
}

// New interface for research paper response
export interface ResearchPaperResponse {
  title: string;
  abstract: string;
  introduction: string;
  perspectives: {
    stance: string;
    content: string;
  }[];
  discussion: string;
  conclusion: string;
  references: string[];
}

// Mock data for topics to provide context
const topicContexts: Record<string, string> = {
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

// API endpoints
const CHAT_API_ENDPOINT = 'http://localhost/api/routes/chat/';
const RESEARCH_PAPER_API_ENDPOINT = 'http://localhost/api/routes/chat/research_paper';

// Delay function for rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Make an API call to the debate backend with retry logic
async function callDebateAPI(systemMessage: string, userMessage: string, retryCount = 0): Promise<string> {
  const maxRetries = 3;
  const baseDelay = 1000; // Start with 1 second delay
  
  try {
    console.log(`Making API call with stance: ${systemMessage.substring(0, 30)}...`);
    
    const response = await fetch(CHAT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_message: systemMessage,
        user_message: userMessage,
      })
    });

    // Check for rate limiting (usually 429 Too Many Requests)
    if (response.status === 429 && retryCount < maxRetries) {
      const retryDelay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Rate limited. Retrying in ${retryDelay}ms... (Attempt ${retryCount + 1}/${maxRetries})`);
      await delay(retryDelay);
      return callDebateAPI(systemMessage, userMessage, retryCount + 1);
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      
      // If we have retries left for other types of errors
      if (retryCount < maxRetries) {
        const retryDelay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
        console.log(`API error. Retrying in ${retryDelay}ms... (Attempt ${retryCount + 1}/${maxRetries})`);
        await delay(retryDelay);
        return callDebateAPI(systemMessage, userMessage, retryCount + 1);
      }
      
      throw new Error(`API Error: ${JSON.stringify(errorData.detail || 'Unknown error')}`);
    }

    const data = await response.json();
    console.log(`API response successful for: ${systemMessage.substring(0, 30)}...`);
    return data.response;
  } catch (error) {
    console.error('Failed to call debate API:', error);
    console.error('Request details:', {
      endpoint: CHAT_API_ENDPOINT,
      systemMessage: systemMessage.substring(0, 100) + '...',
      userMessage
    });
    
    // If we have retries left for network errors
    if (retryCount < maxRetries) {
      const retryDelay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Network error. Retrying in ${retryDelay}ms... (Attempt ${retryCount + 1}/${maxRetries})`);
      await delay(retryDelay);
      return callDebateAPI(systemMessage, userMessage, retryCount + 1);
    }
    
    throw error;
  }
}

// Generate system message for the specific debate stance
function generateSystemMessage(topic: string, stance: string): string {
  const context = topicContexts[topic] || 
    `This debate explores multiple perspectives on "${topic}". The topic has significant implications across various domains.`;
  
  let systemMessage = '';
  
  switch (stance) {
    case 'For':
      systemMessage = `Present arguments supporting the position that ${topic}. ${context}`;
      break;
    case 'Against':
      systemMessage = `Present arguments opposing the position that ${topic}. ${context}`;
      break;
    case 'Neutral':
      systemMessage = `Present both supporting and opposing arguments on the topic: ${topic}. ${context}`;
      break;
    default:
      systemMessage = `Discuss the topic: ${topic}. ${context}`;
  }
  
  return systemMessage;
}

// Generate system message for creating a research paper
function generateResearchPaperSystemMessage(topic: string): string {
  return `Generate a comprehensive research paper on the topic: "${topic}". 
  The paper should synthesize multiple perspectives in an academic format, with an abstract, introduction, 
  analysis of different viewpoints, discussion, conclusion, and references. 
  Maintain an objective, scholarly tone throughout the paper.`;
}

// Export the debate service
export const debateService = {
  // Get initial context for a debate topic
  async getTopicContext(topic: string): Promise<string> {
    return topicContexts[topic] || 
      `This debate explores multiple perspectives on "${topic}". The topic has significant implications across various domains including ethics, politics, technology, and social impact. The AI debaters will present research-backed arguments from different viewpoints, helping to provide a comprehensive understanding of the subject matter.`;
  },
  
  // Get response from a specific AI debater
  async getAIResponse(topic: string, debaterId: number, stance: string, round: number): Promise<DebateResponse> {
    const systemMessage = generateSystemMessage(topic, stance);
    const userMessage = `Please provide your initial argument on the topic: "${topic}"`;
    
    // Add a delay based on debaterId to prevent rate limiting
    // First debater (id=1) has no delay, second has 1500ms, third has 3000ms
    const delayTime = (debaterId - 1) * 1500;
    if (delayTime > 0) {
      console.log(`Delaying API call for ${stance} perspective by ${delayTime}ms to prevent rate limiting`);
      await delay(delayTime);
    }
    
    try {
      const apiResponse = await callDebateAPI(systemMessage, userMessage);
      
      // For now, we don't have real sources from the API, so leaving empty
      return {
        text: apiResponse,
        sources: []
      };
    } catch (error) {
      console.error(`Error getting AI response for ${stance} stance on ${topic}:`, error);
      return {
        text: `Sorry, there was an error generating a response. Please try again later.`,
        sources: []
      };
    }
  },
  
  // Get follow-up response
  async getFollowUpResponse(topic: string, debaterId: number, stance: string, question: string): Promise<DebateResponse> {
    const systemMessage = generateSystemMessage(topic, stance);
    const userMessage = `Follow-up question about ${topic}: ${question}`;
    
    // Add a delay based on debaterId to prevent rate limiting
    // First debater (id=1) has no delay, second has 1500ms, third has 3000ms
    const delayTime = (debaterId - 1) * 1500;
    if (delayTime > 0) {
      console.log(`Delaying follow-up API call for ${stance} perspective by ${delayTime}ms to prevent rate limiting`);
      await delay(delayTime);
    }
    
    try {
      const apiResponse = await callDebateAPI(systemMessage, userMessage);
      
      return {
        text: apiResponse,
        sources: []
      };
    } catch (error) {
      console.error(`Error getting follow-up response for ${stance} stance on ${topic}:`, error);
      return {
        text: `Sorry, there was an error generating a response to your follow-up question. Please try again later.`,
        sources: []
      };
    }
  },
  
  // Generate a research paper from debate perspectives
  async generateResearchPaper(topic: string, debaterResponses: {name: string, stance: string, responses: {text: string}[]}[]): Promise<ResearchPaperResponse> {
    const systemMessage = generateResearchPaperSystemMessage(topic);
    
    // Prepare the perspectives for the API
    const perspectives = debaterResponses.map(debater => {
      // Combine all responses into a single content string
      const content = debater.responses.map((response, idx) => 
        `Response ${idx + 1}: ${response.text}`
      ).join('\n\n');
      
      return {
        stance: debater.name + " (" + debater.stance + ")",
        content
      };
    });
    
    try {
      console.log('Generating research paper from debate data...');
      
      // Use the new research paper specific endpoint
      const response = await fetch(RESEARCH_PAPER_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic,
          perspectives,
          system_message: systemMessage
        })
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const apiResponse = data.response;
      
      // Parse the response into structured sections
      const sections = parsePaperResponse(apiResponse, topic);
      
      return sections;
    } catch (error) {
      console.error(`Error generating research paper for ${topic}:`, error);
      return {
        title: `Research Analysis: ${topic}`,
        abstract: "Error generating paper. Please try again later.",
        introduction: "",
        perspectives: [],
        discussion: "",
        conclusion: "",
        references: []
      };
    }
  },
  
  // Get all available AI debaters
  async getAvailableDebaters(): Promise<AIDebater[]> {
    // This would typically come from an API, but for simplicity we'll return static data
    return [
      { id: 1, name: "Perspective A", stance: "For", model: "gemini-2.0-flash-001" },
      { id: 2, name: "Perspective B", stance: "Against", model: "gemini-2.0-flash-001" },
      { id: 3, name: "Perspective C", stance: "Neutral", model: "gemini-2.0-flash-001" }
    ];
  }
}; 

// Helper function to parse the API response into structured paper sections
function parsePaperResponse(response: string, topic: string): ResearchPaperResponse {
  // Default structure if we can't parse properly
  const defaultPaper: ResearchPaperResponse = {
    title: `Research Analysis: ${topic}`,
    abstract: extractSection(response, "Abstract") || "This paper examines multiple perspectives on the topic.",
    introduction: extractSection(response, "Introduction") || "",
    perspectives: [],
    discussion: extractSection(response, "Discussion") || "",
    conclusion: extractSection(response, "Conclusion") || "",
    references: []
  };
  
  // Try to extract perspectives sections
  const forContent = extractSection(response, "Supporting Perspective") || 
                     extractSection(response, "For Perspective") || 
                     extractSection(response, "Argument For");
                     
  const againstContent = extractSection(response, "Opposing Perspective") || 
                         extractSection(response, "Against Perspective") || 
                         extractSection(response, "Argument Against");
                         
  const neutralContent = extractSection(response, "Neutral Perspective") || 
                         extractSection(response, "Balanced Perspective") || 
                         extractSection(response, "Alternative Viewpoints");
  
  // Add any perspectives we found
  if (forContent) {
    defaultPaper.perspectives.push({ stance: "For", content: forContent });
  }
  
  if (againstContent) {
    defaultPaper.perspectives.push({ stance: "Against", content: againstContent });
  }
  
  if (neutralContent) {
    defaultPaper.perspectives.push({ stance: "Neutral", content: neutralContent });
  }
  
  // Extract references if available
  const refsSection = extractSection(response, "References") || 
                     extractSection(response, "Bibliography") || "";
  
  if (refsSection) {
    // Split by newlines and filter out empty lines
    defaultPaper.references = refsSection
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  
  return defaultPaper;
}

// Helper to extract a section from the response text
function extractSection(text: string, sectionName: string): string | null {
  const regex = new RegExp(`(#{1,3}\\s*${sectionName}|\\*\\*${sectionName}\\*\\*|${sectionName}:)([\\s\\S]*?)(?=(#{1,3}\\s*|\\*\\*|\\d+\\.\\s*\\*\\*|$))`, 'i');
  const match = text.match(regex);
  
  if (match && match[2]) {
    return match[2].trim();
  }
  
  return null;
} 
 