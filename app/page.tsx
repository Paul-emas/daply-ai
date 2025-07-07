"use client";

import { useState, useEffect } from "react";
import { ChatWindow } from "@/components/chat-window";
import { PromptSettings } from "@/components/prompt-settings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, MessageSquare, Brain, Zap } from "lucide-react";
import Topbar from "@/components/shared/topbar";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [universalPrompt, setUniversalPrompt] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const savedPrompt = localStorage.getItem("universalPrompt");
    if (savedPrompt) {
      setUniversalPrompt(savedPrompt);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("universalPrompt", universalPrompt);
  }, [universalPrompt]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsSending(false);

    try {
      const response = await simulateAIResponse(content, universalPrompt);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar
        isLoading={isLoading}
        isSending={isSending}
        universalPrompt={universalPrompt}
        setUniversalPrompt={setUniversalPrompt}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="text-center space-y-8 py-40">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  Hi, how can i help?
                </h2>
              </div>
            </div>

            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              isSending={isSending}
              isWelcomeMode={true}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  AI Assistant Active
                </span>
              </div>
            </div>
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              isSending={isSending}
              isWelcomeMode={false}
            />
          </div>
        )}
      </main>

      <PromptSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        universalPrompt={universalPrompt}
        onPromptChange={setUniversalPrompt}
      />
    </div>
  );
}

async function simulateAIResponse(
  userMessage: string,
  universalPrompt: string
): Promise<string> {
  await new Promise((resolve) =>
    setTimeout(resolve, 1200 + Math.random() * 1800)
  );

  const fullPrompt = universalPrompt
    ? `${universalPrompt}\n\nUser: ${userMessage}`
    : userMessage;

  const responses = [
    "That's a great question! I'd be happy to help you explore this topic. Let me share some thoughts and insights that might be useful.",
    "I find this really interesting! There are several ways to approach this, and I'd like to walk you through some key considerations.",
    "Thanks for bringing this up. This is definitely worth discussing in detail. Here's how I see it and what I think might help.",
    "Excellent point! I appreciate how you've framed this question. Let me provide some perspective that might be valuable.",
    "This is exactly the kind of thoughtful question I enjoy working on. Let me break this down and share some insights.",
    "I'm glad you asked about this! It's a topic with many interesting aspects. Here's what I think would be most helpful to consider.",
    "That's a really good question that deserves a thorough response. Let me share some ideas and approaches that might work well.",
    "I appreciate you bringing this to my attention. This is definitely something we can work through together. Here's my take on it.",
  ];

  if (
    fullPrompt.toLowerCase().includes("hello") ||
    fullPrompt.toLowerCase().includes("hi")
  ) {
    return "Hello! I'm your AI assistant, and I'm here to help with whatever you need. Whether you have questions, want to brainstorm ideas, or just chat, I'm ready to assist. What can I help you with today?";
  }

  if (fullPrompt.toLowerCase().includes("help")) {
    return "I'm here to help! I can assist with a wide range of tasks including answering questions, helping with creative projects, problem-solving, analysis, writing, and much more. What specific area would you like help with?";
  }

  const selectedResponse =
    responses[Math.floor(Math.random() * responses.length)];

  if (universalPrompt) {
    return `${selectedResponse}\n\nI'm following your custom instructions: "${universalPrompt.substring(
      0,
      80
    )}${universalPrompt.length > 80 ? "..." : ""}"`;
  }

  return selectedResponse;
}
