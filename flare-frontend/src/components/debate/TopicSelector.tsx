"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DebateTopicSelectorProps {
  predefinedTopics: string[];
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  customTopic: string;
  setCustomTopic: (topic: string) => void;
}

export function DebateTopicSelector({
  predefinedTopics,
  selectedTopic,
  setSelectedTopic,
  customTopic,
  setCustomTopic,
}: DebateTopicSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        <Label htmlFor="topic" className="text-gray-700 text-sm font-medium">
          SELECT RESEARCH TOPIC
        </Label>
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger 
            id="topic" 
            className="border-gray-300 bg-white text-gray-800 hover:border-[#E71D73] focus:border-[#E71D73] focus:ring-[#E71D73]/10 transition-all h-11 rounded-md shadow-sm"
          >
            <SelectValue placeholder="Select a topic to research" />
            <span className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180">▼</span>
          </SelectTrigger>
          <SelectContent 
            className="bg-white border-gray-200 text-gray-800 max-h-[300px] rounded-md shadow-md border-[#E71D73]/20 animate-fadeIn overflow-hidden"
            position="popper"
          >
            <div className="grid gap-1 p-1">
              {predefinedTopics.map((topic, index) => (
                <SelectItem 
                  key={index} 
                  value={topic} 
                  className="text-gray-700 focus:bg-[#E71D73]/10 focus:text-[#E71D73] relative rounded-md px-8 py-2.5 hover:bg-[#E71D73]/5 transition-all duration-200 cursor-pointer data-[state=checked]:bg-[#E71D73]/10 data-[state=checked]:text-[#E71D73]"
                >
                  <div className="flex items-center">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#E71D73]/70"></span>
                    <span className="truncate">{topic}</span>
                  </div>
                </SelectItem>
              ))}
              <div className="h-px bg-gradient-to-r from-transparent via-[#E71D73]/30 to-transparent my-1.5"></div>
              <SelectItem 
                value="custom" 
                className="text-gray-700 focus:bg-[#E71D73]/10 focus:text-[#E71D73] relative rounded-md px-8 py-2.5 hover:bg-[#E71D73]/5 transition-all duration-200 cursor-pointer data-[state=checked]:bg-[#E71D73]/10 data-[state=checked]:text-[#E71D73]"
              >
                <div className="flex items-center">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#E71D73]/70"></span>
                  <span className="mr-2 text-sm">✏️</span>
                  Custom Topic
                </div>
              </SelectItem>
            </div>
          </SelectContent>
        </Select>
      </div>

      {selectedTopic === "custom" && (
        <div className="space-y-2.5 animate-fadeIn">
          <Label htmlFor="custom-topic" className="text-gray-700 text-sm font-medium">
            ENTER YOUR TOPIC
          </Label>
          <div className="relative group">
            <Textarea
              id="custom-topic"
              placeholder="Type your research topic here..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="min-h-[100px] max-h-[100px] bg-white border-gray-300 text-gray-700 placeholder:text-gray-400 focus:border-[#E71D73] focus:ring-[#E71D73]/20 transition-all p-3 rounded-md shadow-sm hover:border-[#E71D73]/50 group-hover:border-[#E71D73]/30"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
              {customTopic.length} chars
            </div>
            <div className="absolute -inset-px scale-105 rounded-md bg-gradient-to-r from-[#E71D73]/0 via-[#E71D73]/10 to-[#E71D73]/0 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          <p className="text-xs text-gray-500 italic pl-4 border-l-2 border-[#E71D73]/20">
            Phrase your topic as a clear question or statement that can be researched from multiple angles.
          </p>
        </div>
      )}
    </div>
  );
} 