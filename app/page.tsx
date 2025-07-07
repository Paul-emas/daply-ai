"use client";

import { useState, useEffect } from "react";
import { ChatWindow } from "@/components/chat-window";
import Topbar from "@/components/shared/topbar";
import { simulateAIResponse } from "@/utils/function";
import { Message } from "@/types/message";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [universalPrompt, setUniversalPrompt] = useState("");
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Daply AI is active
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
    </div>
  );
}
