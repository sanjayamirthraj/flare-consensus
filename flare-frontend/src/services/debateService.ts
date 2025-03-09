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

// API endpoint for chat service
const API_ENDPOINT = 'http://localhost/api/routes/chat/';

// Delay function for rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Make an API call to the debate backend with retry logic
async function callDebateAPI(systemMessage: string, userMessage: string, retryCount = 0): Promise<string> {
  const maxRetries = 3;
  const baseDelay = 1000; // Start with 1 second delay
  
  try {
    console.log(`Making API call with stance: ${systemMessage.substring(0, 30)}...`);
    
    const response = await fetch(API_ENDPOINT, {
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
      endpoint: API_ENDPOINT,
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
 