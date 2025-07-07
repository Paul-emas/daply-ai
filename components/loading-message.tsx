"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingMessage() {
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = ["thinking...", "processing...", "generating response..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className="bg-emerald-500 text-white">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>

      <div className="max-w-[75%] space-y-2">
        <div className="inline-block px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Daply is {phases[currentPhase]}
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
