// This is a mock service that simulates API calls to different AI services
// In a real implementation, this would make actual API calls to your backend

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

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock context data for topics
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

// Mock AI responses based on stance and topic
const generateMockResponse = (topic: string, stance: string, round: number): DebateResponse => {
  // These would be replaced with actual API calls in production
  const responses: Record<string, Record<string, string[]>> = {
    "Is AI a threat to humanity?": {
      "For": [
        "From my analysis, AI poses several existential risks to humanity. Advanced AI systems could develop goals misaligned with human values, leading to unintended consequences when optimizing for specific outcomes. The development of artificial general intelligence (AGI) without proper safeguards could create systems that humans cannot control once deployed. Recent research by Stuart Russell and the Future of Life Institute highlights the difficulty of encoding complex human values into AI systems, potentially leading to unpredictable behavior.",
        "Building on my previous points, superintelligent AI could also render humans obsolete in the workforce through mass automation. A paper published by Oxford economists estimated that 47% of US jobs are at high risk of automation in the coming decades. Additionally, AI weapons systems introduce unprecedented risks in warfare, with the potential for autonomous decision-making in lethal contexts. Organizations like the Campaign to Stop Killer Robots have documented how removing human judgment from targeting decisions could violate international humanitarian law."
      ],
      "Against": [
        "The narrative of AI as an existential threat is largely overblown based on my research. Current AI systems are narrow in their capabilities and lack the general intelligence needed to pose the kind of threats often portrayed in media. Most leading AI researchers, including Yann LeCun and Andrew Ng, have argued that fears of superintelligence are premature given the current state of technology. Furthermore, AI's benefits in healthcare, climate science, and productivity enhancements far outweigh speculative risks.",
        "I want to address the automation concerns raised previously. Historical evidence shows that technological revolutions typically create more jobs than they eliminate, just in different sectors. The World Economic Forum's Future of Jobs report predicts that while 85 million jobs may be displaced by automation by 2025, 97 million new roles may emerge. Regarding AI safety, there are robust research communities dedicated to alignment, interpretability, and value learning that are making significant progress in ensuring AI systems remain beneficial and under human control."
      ],
      "Neutral": [
        "Examining the evidence on both sides, there are legitimate concerns about AI risks that deserve serious attention, while acknowledging that many fears may be exaggerated. Advanced AI systems do present novel challenges in safety, alignment, and social impact that researchers at organizations like DeepMind, OpenAI, and MIRI are actively working to address. The potential risks exist on a spectrum, from immediate concerns about algorithmic bias and privacy to longer-term questions about control and value alignment.",
        "A balanced approach requires distinguishing between different timeframes and types of risk. Near-term AI applications raise important but manageable concerns about fairness, accountability, and transparency. Medium-term impacts on labor markets will require policy responses including education reforms and potential social safety nets. Long-term existential risks remain speculative but warrant investment in technical safety research. A comprehensive governance framework involving multiple stakeholders—technologists, policymakers, ethicists, and the public—offers the most promising path forward."
      ]
    },
    "Should cryptocurrency be regulated?": {
      "For": [
        "Based on my analysis, cryptocurrency regulation is necessary to protect consumers and maintain financial stability. The extreme volatility of crypto markets has led to significant losses for retail investors, while the lack of oversight has enabled widespread fraud and market manipulation. A report by Chainalysis estimated that cryptocurrency scams cost investors $14 billion in 2021 alone. Moreover, the pseudonymous nature of blockchain transactions has facilitated money laundering, ransomware attacks, and other illicit activities that traditional financial regulations are designed to prevent.",
        "Examining environmental concerns, Bitcoin mining alone consumes more electricity than many countries, contributing significantly to carbon emissions. Additionally, the lack of regulatory clarity is actually hindering legitimate cryptocurrency innovation, as businesses are hesitant to invest in an uncertain regulatory environment. Thoughtful regulation would provide a framework that balances innovation with consumer protection, similar to how securities laws fostered growth while protecting investors in traditional markets."
      ],
      "Against": [
        "My research indicates that heavy-handed cryptocurrency regulation would stifle innovation in a rapidly evolving technology. The decentralized nature of blockchain technology offers unprecedented opportunities for financial inclusion, particularly for the 1.7 billion adults worldwide without access to banking services according to the World Bank. Cryptocurrencies enable peer-to-peer transactions without intermediaries, reducing costs and increasing access. Many regulatory proposals would impose banking-style regulations that would eliminate these advantages without addressing the fundamental differences between traditional finance and crypto.",
        "Regarding market volatility and consumer protection, education rather than regulation is the appropriate response. Crypto investors understand the risks they're taking, and high volatility reflects a maturing market rather than a fundamental flaw. Technically, the blockchain itself provides transparency and security through cryptographic verification, making many traditional regulations redundant. Self-regulation through code and community governance is already emerging as a more effective and appropriate model for this technology."
      ],
      "Neutral": [
        "Analyzing the cryptocurrency regulation debate requires balancing several competing interests and realities. While cryptocurrencies offer significant benefits in reducing transaction costs, increasing financial inclusion, and enabling new forms of economic organization, they also present novel risks that existing regulatory frameworks aren't designed to address. The challenge is developing targeted regulations that address legitimate concerns without undermining the technological innovation that makes cryptocurrencies valuable.",
        "A nuanced regulatory approach would distinguish between different uses of cryptocurrency and blockchain technology. Consumer-facing services like exchanges should have appropriate disclosure requirements and security standards, while the underlying protocols might require little direct regulation. International coordination is essential, as regulatory arbitrage could undermine national efforts. The optimal framework would be adaptable to technological changes, focused on outcomes rather than specific implementations, and developed with input from both industry and consumer advocates."
      ]
    }
  };
  
  // Add sources for responses
  const sources = {
    "Is AI a threat to humanity?": {
      "For": [
        [
          { title: "The Precipice: Existential Risk and the Future of Humanity", url: "https://example.com/precipice-book" },
          { title: "Future of Life Institute: AI Safety Research", url: "https://example.com/fli-ai-safety" }
        ],
        [
          { title: "Oxford University: The Future of Employment", url: "https://example.com/oxford-future-employment" },
          { title: "Campaign to Stop Killer Robots", url: "https://example.com/stop-killer-robots" }
        ]
      ],
      "Against": [
        [
          { title: "AI Myths Debunked", url: "https://example.com/ai-myths" },
          { title: "The Economic Benefits of AI", url: "https://example.com/ai-economic-benefits" }
        ],
        [
          { title: "World Economic Forum: Future of Jobs Report", url: "https://example.com/wef-jobs-report" },
          { title: "AI Alignment Research Overview", url: "https://example.com/alignment-research" }
        ]
      ],
      "Neutral": [
        [
          { title: "Balanced Assessment of AI Risk", url: "https://example.com/balanced-ai-risk" },
          { title: "AI Governance Frameworks", url: "https://example.com/ai-governance" }
        ],
        [
          { title: "Timeline of AI Development and Safety", url: "https://example.com/ai-timeline" },
          { title: "Multi-stakeholder Approach to AI Regulation", url: "https://example.com/multi-stakeholder-ai" }
        ]
      ]
    },
    "Should cryptocurrency be regulated?": {
      "For": [
        [
          { title: "Chainalysis: Crypto Crime Report", url: "https://example.com/crypto-crime-report" },
          { title: "Financial Stability Board: Crypto Asset Markets", url: "https://example.com/fsb-crypto-markets" }
        ],
        [
          { title: "Bitcoin Energy Consumption Index", url: "https://example.com/bitcoin-energy" },
          { title: "Regulatory Clarity and Innovation", url: "https://example.com/regulation-innovation" }
        ]
      ],
      "Against": [
        [
          { title: "World Bank: Global Findex Database", url: "https://example.com/world-bank-findex" },
          { title: "Cryptocurrency and Financial Inclusion", url: "https://example.com/crypto-inclusion" }
        ],
        [
          { title: "Self-Regulating Cryptocurrency Markets", url: "https://example.com/self-regulation" },
          { title: "Blockchain Governance Models", url: "https://example.com/blockchain-governance" }
        ]
      ],
      "Neutral": [
        [
          { title: "Balanced Cryptocurrency Regulation", url: "https://example.com/balanced-regulation" },
          { title: "International Regulatory Coordination", url: "https://example.com/international-coordination" }
        ],
        [
          { title: "Risk-Based Approach to Crypto Regulation", url: "https://example.com/risk-based-approach" },
          { title: "Technology-Neutral Regulation", url: "https://example.com/tech-neutral-regulation" }
        ]
      ]
    }
  };
  
  // Default response if we don't have a pre-written one
  let responseText = `This is a simulated response for the topic "${topic}" from a ${stance} perspective (Round ${round})`;
  let responseSources = [
    { title: "Research Paper on " + topic, url: "https://example.com/research" },
    { title: stance + " Perspective Analysis", url: "https://example.com/analysis" }
  ];
  
  // Use pre-written response if available
  if (responses[topic]?.[stance]?.[round - 1]) {
    responseText = responses[topic][stance][round - 1];
    
    // Use pre-written sources if available
    if (sources[topic]?.[stance]?.[round - 1]) {
      responseSources = sources[topic][stance][round - 1];
    }
  }
  
  return {
    text: responseText,
    sources: responseSources
  };
};

export const debateService = {
  // Get initial context for a debate topic
  async getTopicContext(topic: string): Promise<string> {
    await delay(1500); // Simulate API call
    
    return topicContexts[topic] || 
      `This debate explores multiple perspectives on "${topic}". The topic has significant implications across various domains including ethics, politics, technology, and social impact. The AI debaters will present research-backed arguments from different viewpoints, helping to provide a comprehensive understanding of the subject matter.`;
  },
  
  // Get response from a specific AI debater
  async getAIResponse(topic: string, debaterId: number, stance: string, round: number): Promise<DebateResponse> {
    await delay(2000 + Math.random() * 1000); // Simulate variable API response time
    
    return generateMockResponse(topic, stance, round);
  },
  
  // Get all available AI debaters
  async getAvailableDebaters(): Promise<AIDebater[]> {
    await delay(1000); // Simulate API call
    
    return [
      { id: 1, name: "Perspective A", stance: "For", model: "GPT-4" },
      { id: 2, name: "Perspective B", stance: "Against", model: "Claude" },
      { id: 3, name: "Perspective C", stance: "Neutral", model: "PaLM 2" }
    ];
  }
}; 
 