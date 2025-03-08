import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Database, Users, Layers, Brain, Code, Bot, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen grid-bg text-gray-800 flex flex-col">
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
              <li><Link href="/debate" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300">Debate</Link></li>
              <li><a href="https://github.com/your-username/flare-consensus" target="_blank" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300 flex items-center"><Github size={16} className="mr-1" /> GitHub</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#E71D73]/10 filter blur-[100px]"></div>
              <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#E71D73]/10 filter blur-[80px]"></div>
              <div className="absolute bottom-[5%] left-[40%] w-[350px] h-[350px] rounded-full bg-[#E71D73]/5 filter blur-[120px]"></div>
            </div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-1">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 space-y-8 page-transition">
                <div className="inline-block px-3 py-1 rounded-full bg-[#E71D73]/10 border border-[#E71D73]/20 text-[#E71D73] text-sm mb-2">
                  <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#E71D73] animate-pulse"></span>
                  Next Generation AI Debate Platform
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                  Explore multiple<br />perspectives with<br /><span className="text-[#E71D73]">AI-powered debates</span>
                </h2>
                
                <p className="text-xl text-gray-600">
                  Flare Consensus uses multiple AI models to present different viewpoints on complex topics, helping you form a more nuanced understanding.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/debate">
                    <Button size="lg" className="px-8 bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button group transition-all">
                      Start a Debate <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </Link>
                  
                  <a href="https://github.com/your-username/flare-consensus" target="_blank" className="inline-flex items-center justify-center px-8 py-3 rounded-md border border-gray-300 hover:border-[#E71D73] text-gray-700 hover:text-[#E71D73] transition-all duration-300">
                    <Github size={18} className="mr-2" /> View on GitHub
                  </a>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center page-transition" style={{ animationDelay: '0.2s' }}>
                <div className="w-full max-w-md aspect-square relative bg-white border-2 border-[#E71D73]/20 glow-card rounded-xl flex items-center justify-center overflow-hidden p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E71D73]/5 via-white to-white"></div>
                  
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E71D73]/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E71D73]/30 to-transparent"></div>
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#E71D73]/30 to-transparent"></div>
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#E71D73]/30 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    <div className="bg-white p-5 rounded-lg border border-[#E71D73]/20 shadow-sm flex flex-col items-center justify-center group hover:shadow-md hover:border-[#E71D73]/30 transition-all duration-300">
                      <Users size={40} className="text-[#E71D73] mb-3" />
                      <span className="text-gray-700 text-center font-medium">Multiple AI Perspectives</span>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg border border-[#E71D73]/20 shadow-sm flex flex-col items-center justify-center group hover:shadow-md hover:border-[#E71D73]/30 transition-all duration-300">
                      <Database size={40} className="text-[#E71D73] mb-3" />
                      <span className="text-gray-700 text-center font-medium">Research-backed Arguments</span>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg border border-[#E71D73]/20 shadow-sm flex flex-col items-center justify-center group hover:shadow-md hover:border-[#E71D73]/30 transition-all duration-300">
                      <Layers size={40} className="text-[#E71D73] mb-3" />
                      <span className="text-gray-700 text-center font-medium">Multi-round Debates</span>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg border border-[#E71D73]/20 shadow-sm flex flex-col items-center justify-center group hover:shadow-md hover:border-[#E71D73]/30 transition-all duration-300">
                      <Brain size={40} className="text-[#E71D73] mb-3" />
                      <span className="text-gray-700 text-center font-medium">Advanced AI Models</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-1">
            <div className="text-center mb-16 page-transition">
              <h5 className="text-[#E71D73] mb-2 inline-flex items-center justify-center">
                <Sparkles size={18} className="mr-2" /> POWERFUL FEATURES
              </h5>
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">How It Works</h2>
              <p className="max-w-2xl mx-auto text-gray-600">Our platform provides a unique way to understand complex topics through multiple AI perspectives.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 page-transition relative overflow-hidden group" style={{ animationDelay: '0.1s' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E71D73]/5 rounded-bl-full"></div>
                <div className="w-14 h-14 bg-[#E71D73]/10 text-[#E71D73] rounded-full flex items-center justify-center font-bold text-xl mb-4 border border-[#E71D73]/20 relative z-1">
                  <span>1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Select a Topic</h3>
                <p className="text-gray-600">Choose from predefined topics or create your own custom debate question.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 page-transition relative overflow-hidden group" style={{ animationDelay: '0.2s' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E71D73]/5 rounded-bl-full"></div>
                <div className="w-14 h-14 bg-[#E71D73]/10 text-[#E71D73] rounded-full flex items-center justify-center font-bold text-xl mb-4 border border-[#E71D73]/20 relative z-1">
                  <span>2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Research</h3>
                <p className="text-gray-600">Multiple AI models research and present arguments from different perspectives.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 page-transition relative overflow-hidden group" style={{ animationDelay: '0.3s' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E71D73]/5 rounded-bl-full"></div>
                <div className="w-14 h-14 bg-[#E71D73]/10 text-[#E71D73] rounded-full flex items-center justify-center font-bold text-xl mb-4 border border-[#E71D73]/20 relative z-1">
                  <span>3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Explore Viewpoints</h3>
                <p className="text-gray-600">Review the debate and generate additional rounds to see counter-arguments.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 page-transition">
                <div className="relative max-w-md mx-auto">
                  <div className="w-full aspect-[4/3] bg-white border-2 border-[#E71D73]/20 rounded-lg p-4 relative shadow-md">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E71D73]/5 to-transparent pointer-events-none"></div>
                    
                    <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="ml-2 text-xs text-gray-500">AI Debate Session</span>
                    </div>
                    
                    <div className="typing-animation text-gray-800 mb-2 text-sm">
                      <span className="text-[#E71D73]">root@flare:~$</span> start_debate --topic="AI Ethics"
                    </div>
                    
                    <div className="text-gray-700 text-sm space-y-2">
                      <p><span className="text-[#E71D73] font-medium">Perspective A:</span> AI development requires ethical guardrails...</p>
                      <p><span className="text-[#E71D73] font-medium">Perspective B:</span> Innovation shouldn't be constrained by...</p>
                      <p><span className="text-[#E71D73] font-medium">Perspective C:</span> A balanced approach considers both...</p>
                    </div>
                    
                    <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 rounded-full bg-[#E71D73]/10 filter blur-[80px]"></div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 page-transition" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Experience the future of AI-powered debate</h2>
                <p className="text-gray-600 mb-6">Our platform harnesses the power of multiple AI models to analyze topics from different perspectives, providing you with a comprehensive understanding of complex issues.</p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: <Bot size={20} />, text: "Each AI debater represents a unique perspective" },
                    { icon: <Database size={20} />, text: "Arguments backed by research and citations" },
                    { icon: <Code size={20} />, text: "Sophisticated algorithms ensure balanced viewpoints" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-[#E71D73] mt-1">{item.icon}</span>
                      <span className="text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/debate">
                  <Button className="px-6 py-2 bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button">
                    Try It Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-10 px-6 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-[#E71D73]">Flare</span>
              <span className="text-2xl font-bold text-gray-800">Consensus</span>
            </div>
            <p className="text-gray-500 max-w-md">Exploring complex topics through multiple AI perspectives.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <Link href="/debate" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300">Start Debate</Link>
            <a href="#" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300">Terms of Service</a>
            <a href="https://github.com/your-username/flare-consensus" target="_blank" className="text-gray-700 hover:text-[#E71D73] transition-all duration-300 flex items-center">
              <Github size={14} className="mr-1" /> GitHub
            </a>
          </div>
        </div>
        
        <div className="container mx-auto mt-8 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
          © 2024 Flare Consensus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
