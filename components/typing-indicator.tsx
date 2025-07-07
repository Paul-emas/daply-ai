"use client";

import { useEffect, useState } from "react";

interface TypingIndicatorProps {
  isVisible: boolean;
  className?: string;
}

export function TypingIndicator({
  isVisible,
  className = "",
}: TypingIndicatorProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const typingTexts = [
    "Daply AI is thinking",
    "Daply AI is processing",
    "Daply AI is generating response",
    "Daply AI is typing",
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentText("");
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const text = typingTexts[currentIndex];
    let index = 0;
    setCurrentText("");

    const typeInterval = setInterval(() => {
      setCurrentText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentIndex, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
    >
      <span>{currentText}</span>
      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
