import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Database, Users, Layers, Brain, Code, Bot, Sparkles } from "lucide-react";
import PerspectiveAnimation from '@/components/animation';

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

      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="lg:w-1/2 space-y-6 max-w-xl page-transition">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-[#E71D73]">AI Debates</span> with Multiple Perspectives
            </h1>
            <p className="text-lg text-gray-600">
              Flare Consensus uses AI to analyze complex topics from different viewpoints,
              providing balanced insights to help you form your own opinion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#E71D73] hover:bg-[#d01968] text-white" size="lg" asChild>
                <Link href="/debate">Try a Debate <ArrowRight className="ml-2" size={16} /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/your-username/flare-consensus" target="_blank">View Source <Github className="ml-2" size={16} /></a>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full page-transition" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-[#E71D73]" />
                  Interactive Perspective Demo
                </h3>
              </div>
              <div className="p-4">
                <PerspectiveAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add a divider for visual separation */}
      <div className="w-full h-16 bg-gradient-to-r from-transparent via-[#E71D73]/10 to-transparent relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-[2px] bg-[#E71D73]/30"></div>
        </div>
      </div>

      {/* Updated perspective exploration section with better separation */}
      <section className="py-16 px-6 bg-gray-950 border-y border-gray-800 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-1">
          {/* Enhanced visual header */}
          <div className="text-center mb-16 page-transition">
            <div className="inline-block px-6 py-2 border border-[#E71D73]/20 rounded-full bg-gray-900 shadow-lg mb-4">
              <h5 className="text-[#E71D73] flex items-center justify-center font-medium">
                <Sparkles size={18} className="mr-2" /> EXPLORE DIFFERENT PERSPECTIVES
              </h5>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Three Distinct Viewpoints</h2>
            <div className="w-16 h-1 bg-[#E71D73] mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-300">
              Our platform provides a unique debate experience by showing you three AI-powered viewpoints on every topic.
            </p>
          </div>
          
          {/* Visually enhanced perspective cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900 p-8 rounded-xl border border-[#E71D73]/20 shadow-lg transition-all duration-300 page-transition hover:border-[#E71D73]/40 relative" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#E71D73]/5 rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-[#E71D73]/10 text-[#E71D73] rounded-full flex items-center justify-center font-bold text-xl mb-5 border border-[#E71D73]/20">
                <span>✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">For</h3>
              <p className="text-gray-300 border-l-2 border-[#E71D73]/40 pl-4 italic">
                Carbon taxes incentivize innovation and reduce emissions effectively.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl border border-[#B71761]/20 shadow-lg transition-all duration-300 page-transition hover:border-[#B71761]/40 relative" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#B71761]/5 rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-[#B71761]/10 text-[#B71761] rounded-full flex items-center justify-center font-bold text-xl mb-5 border border-[#B71761]/20">
                <span>○</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Neutral</h3>
              <p className="text-gray-300 border-l-2 border-[#B71761]/40 pl-4 italic">
                Climate policies must balance environmental impact with economic considerations.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl border border-[#CF196A]/20 shadow-lg transition-all duration-300 page-transition hover:border-[#CF196A]/40 relative" style={{ animationDelay: '0.3s' }}>
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#CF196A]/5 rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-[#CF196A]/10 text-[#CF196A] rounded-full flex items-center justify-center font-bold text-xl mb-5 border border-[#CF196A]/20">
                <span>✗</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Against</h3>
              <p className="text-gray-300 border-l-2 border-[#CF196A]/40 pl-4 italic">
                Strict regulations may harm economic growth and disproportionately affect certain industries.
              </p>
            </div>
          </div>
          
          {/* Enhanced CTA */}
          <div className="text-center bg-gray-900/50 p-8 rounded-xl border border-gray-800 shadow-lg">
            <p className="text-xl text-gray-300 mb-6">
              Experience how AI can present multiple perspectives on complex topics
            </p>
            <Link href="/debate">
              <Button className="px-8 py-3 bg-[#E71D73] hover:bg-[#D61A6A] text-white glow-button text-lg">
                Start Your Own Debate <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
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
              <Button className="bg-[#E71D73] hover:bg-[#d01968] text-white">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-[#E71D73]">Flare</span>
                <span className="text-2xl font-bold">Consensus</span>
              </div>
              <p className="mt-2 text-gray-400">Illuminating debates with multiple AI perspectives</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Bot size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Users size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Flare Consensus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
