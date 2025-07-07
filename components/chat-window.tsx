"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageBubble } from "@/components/message-bubble";
import { LoadingMessage } from "@/components/loading-message";
import { Send, Mic, Paperclip, ImageIcon } from "lucide-react";
import { Message } from "@/types/message";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  isSending?: boolean;
  isWelcomeMode?: boolean;
}

export function ChatWindow({
  messages,
  onSendMessage,
  isLoading,
  isSending = false,
  isWelcomeMode = false,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    "🧠 Help me brainstorm ideas",
    "📚 Explain a complex topic",
    "✍️ Write something creative",
    "🛠️ Solve a problem",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  if (isWelcomeMode && messages.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`relative transition-all duration-200 ${
              isFocused ? "transform scale-[1.01]" : ""
            }`}
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything or start a conversation..."
              className={`min-h-[80px] text-lg bg-white border rounded-2xl px-5 py-4 pr-20 resize-none transition-all duration-200 ${
                isFocused
                  ? "border-emerald-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              disabled={isLoading || isSending}
            />

            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInput(suggestion)}
                className="px-4 py-2 text-xs bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 duration-200 text-gray-700 active:scale-90 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <ScrollArea ref={scrollAreaRef} className="h-[500px] p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <LoadingMessage />}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  isLoading
                    ? "Daply AI is thinking..."
                    : "Continue the conversation..."
                }
                className="min-h-[50px] max-h-[120px] bg-white border-gray-200 rounded-xl resize-none pr-12 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-200"
                disabled={isLoading || isSending}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                >
                  <Paperclip className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                >
                  <ImageIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm rounded-xl transition-colors duration-200"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
