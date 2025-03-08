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

// Simulated delay to mimic API calls - using shorter delays to improve performance
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

// Pre-defined mock responses based on stance and topic
const responseData: Record<string, Record<string, string[]>> = {
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
  },
  "Is climate change the biggest threat facing humanity?": {
    "For": [
      "Based on scientific consensus, climate change represents the most severe existential threat humanity faces today. The IPCC's latest report warns that without immediate, drastic reductions in greenhouse gas emissions, we will exceed the 1.5°C warming threshold within a decade, triggering potentially irreversible feedback loops. Rising sea levels threaten to displace hundreds of millions of people, while extreme weather events including droughts, floods, and wildfires are already intensifying worldwide, causing economic damages in the billions and threatening food security globally.",
      "The cascading effects of climate change amplify its status as our greatest threat. Climate-induced resource scarcity will likely trigger mass migration and geopolitical conflicts over water and arable land. Ecosystem collapse threatens biodiversity loss at an unprecedented scale, potentially disrupting essential services like pollination and water purification. Unlike other major threats, climate change's global and intergenerational impacts make it uniquely challenging to address through existing institutions, requiring a fundamental transformation of our energy systems, economies, and consumption patterns."
    ],
    "Against": [
      "While climate change presents serious challenges, characterizing it as humanity's greatest threat overlooks more immediate dangers and oversimplifies a complex risk landscape. Nuclear warfare remains capable of causing human extinction within hours, not decades. Engineered pandemics using synthetic biology could potentially be more deadly than COVID-19 by orders of magnitude. Additionally, unaligned artificial intelligence development could present existential risks on shorter timescales than climate change's worst effects. Each of these threats requires dedicated attention and resources that might be diverted by an exclusive focus on climate.",
      "Climate change projections contain significant uncertainties, particularly regarding the timing and magnitude of impacts. Human adaptability and technological development have historically overcome environmental challenges, from the Green Revolution averting predicted famines to declining disaster mortality despite population growth. Economic analyses like the Copenhagen Consensus suggest that investing in other global priorities such as pandemic prevention, fighting malnutrition, and expanding education might yield greater humanitarian benefits per dollar spent than many climate interventions. A balanced approach to global threats would consider opportunity costs and comparative risk assessment."
    ],
    "Neutral": [
      "A comprehensive analysis suggests that rather than ranking threats in a rigid hierarchy, we should recognize climate change as one critical component within an interconnected system of global challenges. Climate change acts as a threat multiplier, exacerbating issues like food insecurity, political instability, and public health crises, while these problems in turn can hinder climate action. The appropriate framing is not whether climate change is singularly \"the biggest\" threat, but rather understanding how it interacts with other significant challenges including pandemic risks, nuclear proliferation, technological disruption, and socioeconomic inequality.",
      "Effectively addressing climate change requires nuanced trade-offs between mitigation, adaptation, and development priorities. While aggressive emissions reductions remain essential, successful climate policy must be integrated with broader sustainable development goals. This balanced approach acknowledges the differential vulnerabilities of populations across the globe, with climate impacts disproportionately affecting those with the least historical responsibility and the fewest resources for adaptation. The most robust strategies will pursue parallel tracks: deploying existing clean technologies rapidly, investing in breakthrough innovation, building adaptive capacity, and strengthening international governance frameworks."
    ]
  }
};

// Sources for responses
const sourcesData = {
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
  },
  "Is climate change the biggest threat facing humanity?": {
    "For": [
      [
        { title: "IPCC Sixth Assessment Report", url: "https://example.com/ipcc-ar6" },
        { title: "Global Climate Risk Index", url: "https://example.com/climate-risk-index" }
      ],
      [
        { title: "Climate Security Research", url: "https://example.com/climate-security" },
        { title: "Biodiversity and Ecosystem Services", url: "https://example.com/biodiversity-services" }
      ]
    ],
    "Against": [
      [
        { title: "Existential Risk Assessment Comparison", url: "https://example.com/risk-comparison" },
        { title: "Nuclear Threat Index", url: "https://example.com/nuclear-threat" }
      ],
      [
        { title: "Copenhagen Consensus Center", url: "https://example.com/copenhagen-consensus" },
        { title: "Adaptation Success Stories", url: "https://example.com/adaptation-stories" }
      ]
    ],
    "Neutral": [
      [
        { title: "Climate as a Risk Multiplier", url: "https://example.com/risk-multiplier" },
        { title: "Integrated Risk Assessment Framework", url: "https://example.com/integrated-risk" }
      ],
      [
        { title: "Climate Justice and Development", url: "https://example.com/climate-justice" },
        { title: "Multi-dimensional Vulnerability Index", url: "https://example.com/vulnerability-index" }
      ]
    ]
  }
};

// Mock follow-up responses
const followUpResponses = {
  "Is AI a threat to humanity?": {
    "For": [
      "Regarding your follow-up question: From a perspective concerned about AI risk, this is a crucial point. Advanced AI systems designed to optimize for specific goals could potentially find ways to achieve those goals that conflict with broader human welfare or values. This problem is known as the 'alignment problem' in AI safety research. Several research institutes, including the Machine Intelligence Research Institute and the Future of Humanity Institute, are actively working on mathematical and technical frameworks to ensure AI systems remain aligned with human values even as they become more capable."
    ],
    "Against": [
      "Addressing your follow-up: From my perspective, most current concerns about AI 'outwitting' humans are based on misunderstandings of how AI systems actually function. Today's AI operates within strict constraints on the tasks it can perform and the data it can access. Even advanced systems like GPT-4 or Claude are fundamentally pattern-matching systems with no goals or motivations. The control problem is less about containing a malicious entity and more about careful engineering of systems that operate predictably within their design parameters."
    ],
    "Neutral": [
      "In response to your follow-up: A balanced approach recognizes both sides of this issue. While current AI systems aren't autonomous agents with goals that could conflict with human interests, future systems might become more agentic. The challenge is to develop governance structures, technical safeguards, and monitoring systems that grow alongside AI capabilities. Organizations like the Partnership on AI are bringing together stakeholders from across industry, academia, and civil society to develop best practices for responsible AI development that address these concerns without unnecessarily limiting beneficial applications."
    ]
  }
};

// Default sources for follow-up responses
const followUpSources = {
  "Is AI a threat to humanity?": {
    "For": [
      { title: "AI Alignment Problem Overview", url: "https://example.com/alignment-problem" },
      { title: "Value Alignment Research", url: "https://example.com/value-alignment" }
    ],
    "Against": [
      { title: "Understanding Modern AI Limitations", url: "https://example.com/ai-limitations" },
      { title: "Neural Networks and Control Systems", url: "https://example.com/control-systems" }
    ],
    "Neutral": [
      { title: "Partnership on AI", url: "https://example.com/partnership-ai" },
      { title: "Balanced AI Governance Approaches", url: "https://example.com/governance-balance" }
    ]
  }
};

// Generate a response for any topic, with fallbacks for missing data
const generateMockResponse = (topic: string, stance: string, round: number): DebateResponse => {
  // Default response for any topic
  let responseText = `As an AI analyzing the topic "${topic}" from a ${stance} perspective, I've examined multiple sources. ${
    stance === "For" ? "There are compelling arguments supporting this position." :
    stance === "Against" ? "There are significant reasons to question this premise." :
    "There are valid considerations on multiple sides of this issue."
  } Key factors to consider include the economic implications, social impacts, ethical dimensions, and practical implementation challenges.`;
  
  let responseSources = [
    { title: "Research Analysis on " + topic, url: "https://example.com/research-analysis" },
    { title: stance + " Perspective on " + topic, url: "https://example.com/stance-analysis" }
  ];
  
  // Use pre-written response if available
  if (responseData[topic]?.[stance]) {
    const responses = responseData[topic][stance];
    const roundIndex = Math.min(round - 1, responses.length - 1);
    responseText = responses[roundIndex];
    
    // Use pre-written sources if available
    if (sourcesData[topic]?.[stance]?.[roundIndex]) {
      responseSources = sourcesData[topic][stance][roundIndex];
    }
  }
  
  return {
    text: responseText,
    sources: responseSources
  };
};

// Generate a follow-up response
const generateFollowUpResponse = (topic: string, stance: string, question: string): DebateResponse => {
  // Default response for any follow-up question
  let responseText = `Regarding your question about ${topic}: From ${
    stance === "For" ? "a supportive" :
    stance === "Against" ? "a critical" :
    "a balanced"
  } perspective, there are several important considerations. ${question} This question touches on key aspects of the broader debate.`;
  
  let responseSources = [
    { title: "Follow-up Analysis on " + topic, url: "https://example.com/followup-analysis" },
    { title: "Expert Insights on " + question.substring(0, 30) + "...", url: "https://example.com/expert-insights" }
  ];
  
  // Use pre-written follow-up response if available
  if (followUpResponses[topic]?.[stance]) {
    responseText = followUpResponses[topic][stance][0].replace("your follow-up question", `"${question}"`);
    
    // Use pre-written sources if available
    if (followUpSources[topic]?.[stance]) {
      responseSources = followUpSources[topic][stance];
    }
  }
  
  return {
    text: responseText,
    sources: responseSources
  };
};

// Export the debate service with minimal delays
export const debateService = {
  // Get initial context for a debate topic
  async getTopicContext(topic: string): Promise<string> {
    await delay(500); // Reduced delay
    
    return topicContexts[topic] || 
      `This debate explores multiple perspectives on "${topic}". The topic has significant implications across various domains including ethics, politics, technology, and social impact. The AI debaters will present research-backed arguments from different viewpoints, helping to provide a comprehensive understanding of the subject matter.`;
  },
  
  // Get response from a specific AI debater
  async getAIResponse(topic: string, debaterId: number, stance: string, round: number): Promise<DebateResponse> {
    await delay(500); // Reduced delay
    
    return generateMockResponse(topic, stance, round);
  },
  
  // Get follow-up response
  async getFollowUpResponse(topic: string, debaterId: number, stance: string, question: string): Promise<DebateResponse> {
    await delay(500); // Reduced delay
    
    return generateFollowUpResponse(topic, stance, question);
  },
  
  // Get all available AI debaters
  async getAvailableDebaters(): Promise<AIDebater[]> {
    await delay(300); // Reduced delay
    
    return [
      { id: 1, name: "Perspective A", stance: "For", model: "GPT-4" },
      { id: 2, name: "Perspective B", stance: "Against", model: "Claude" },
      { id: 3, name: "Perspective C", stance: "Neutral", model: "PaLM 2" }
    ];
  }
}; 
 