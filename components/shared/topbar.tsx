import Image from "next/image";
import React, { useState } from "react";
import { PromptSettings } from "../prompt-settings";
import { Settings, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Topbar {
  universalPrompt: string;
  setUniversalPrompt: (prompt: string) => void;
  isLoading?: boolean;
  isSending?: boolean;
}
const Topbar = ({
  universalPrompt,
  isLoading,
  isSending,
  setUniversalPrompt,
}: Topbar) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shadow-sm overflow-hidden rounded-lg">
              <Image
                src="/logo.jpeg"
                alt="Daply logo"
                sizes="20"
                width={36}
                height={36}
              />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">Daply AI</h1>
              <p className="text-xs text-gray-500">
                Intelligent conversation partner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {universalPrompt && !isLoading && !isSending && (
              <Badge className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                <Zap className="w-3 h-3 mr-1" />
                Custom Instructions
              </Badge>
            )}
            {(isLoading || isSending) && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  {isSending ? "Sending..." : "Thinking..."}
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-600"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <PromptSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        universalPrompt={universalPrompt}
        onPromptChange={setUniversalPrompt}
      />
    </header>
  );
};

export default Topbar;
