"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown, Edit3 } from "lucide-react";

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
    <div className="space-y-6">
      <div className="space-y-2 relative">
        <Label htmlFor="topic" className="text-gray-700 flex items-center text-sm">
          <span className="w-2 h-2 bg-[#E71D73] rounded-full mr-2"></span>
          SELECT TOPIC
        </Label>
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger 
            id="topic" 
            className="border-gray-300 bg-white text-gray-800 hover:border-[#E71D73] transition-all h-12 glow-border-focus"
          >
            <SelectValue placeholder="Select a topic for debate" />
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border-gray-200 text-gray-800 max-h-[300px]"
            position="popper"
          >
            <div className="grid gap-1 p-1">
              {predefinedTopics.map((topic, index) => (
                <SelectItem 
                  key={index} 
                  value={topic} 
                  className="text-gray-700 focus:bg-[#E71D73]/10 focus:text-[#E71D73] relative rounded-sm px-8 py-2.5 hover:bg-[#E71D73]/5 transition-all duration-200 cursor-pointer data-[state=checked]:bg-[#E71D73]/10 data-[state=checked]:text-[#E71D73]"
                >
                  {topic}
                </SelectItem>
              ))}
              <div className="h-px bg-gradient-to-r from-transparent via-[#E71D73]/20 to-transparent my-1"></div>
              <SelectItem 
                value="custom" 
                className="text-gray-700 focus:bg-[#E71D73]/10 focus:text-[#E71D73] relative rounded-sm px-8 py-2.5 hover:bg-[#E71D73]/5 transition-all duration-200 cursor-pointer data-[state=checked]:bg-[#E71D73]/10 data-[state=checked]:text-[#E71D73]"
              >
                <div className="flex items-center">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Custom Topic
                </div>
              </SelectItem>
            </div>
          </SelectContent>
        </Select>
      </div>

      {selectedTopic === "custom" && (
        <div className="space-y-2 relative animate-fadeIn">
          <Label htmlFor="custom-topic" className="text-gray-700 flex items-center text-sm">
            <span className="w-2 h-2 bg-[#E71D73] rounded-full mr-2"></span>
            ENTER YOUR TOPIC
          </Label>
          <div className="relative">
            <Textarea
              id="custom-topic"
              placeholder="Type your debate topic here..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="min-h-[120px] bg-white border-gray-300 text-gray-700 placeholder:text-gray-400 focus:border-[#E71D73] transition-all p-4 glow-border-focus"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {customTopic.length} characters
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-1">
            For best results, phrase your topic as a clear question or statement that can be debated.
          </p>
        </div>
      )}
    </div>
  );
} 