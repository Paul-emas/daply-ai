"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Info, Settings, User, Briefcase, Heart } from "lucide-react";

interface PromptSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  universalPrompt: string;
  onPromptChange: (prompt: string) => void;
}

export function PromptSettings({
  isOpen,
  onClose,
  universalPrompt,
  onPromptChange,
}: PromptSettingsProps) {
  const [tempPrompt, setTempPrompt] = useState(universalPrompt);

  const handleSave = () => {
    onPromptChange(tempPrompt);
    onClose();
  };

  const handleClear = () => {
    setTempPrompt("");
    onPromptChange("");
  };

  const handleCancel = () => {
    setTempPrompt(universalPrompt);
    onClose();
  };

  const presetPrompts = [
    {
      name: "Creative Assistant",
      icon: Heart,
      prompt:
        "You are a creative and imaginative assistant. Always think outside the box and provide unique, innovative solutions. Be enthusiastic and inspiring in your responses.",
    },
    {
      name: "Professional Helper",
      icon: Briefcase,
      prompt:
        "You are a professional and efficient assistant. Provide clear, concise, and actionable advice. Focus on practical solutions and maintain a business-appropriate tone.",
    },
    {
      name: "Friendly Companion",
      icon: User,
      prompt:
        "You are a warm, friendly, and supportive companion. Be conversational, empathetic, and encouraging. Use a casual tone and show genuine interest in helping.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Custom Instructions
              </DialogTitle>
              {universalPrompt && (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mt-2">
                  Active
                </Badge>
              )}
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed text-gray-600">
            Customize how your AI assistant behaves and responds. Choose a
            preset or create your own custom instructions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preset Options */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Quick Presets
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {presetPrompts.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setTempPrompt(preset.prompt)}
                  className="p-4 text-left bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <preset.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {preset.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {preset.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="space-y-3">
            <Label
              htmlFor="prompt"
              className="text-sm font-semibold text-gray-700"
            >
              Custom Instructions
            </Label>
            <Textarea
              id="prompt"
              value={tempPrompt}
              onChange={(e) => setTempPrompt(e.target.value)}
              placeholder="Describe how you want your AI assistant to behave, respond, and interact with you..."
              className="min-h-[120px] resize-none rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-200"
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {tempPrompt.length} characters
              </div>
              {tempPrompt && (
                <div className="text-xs text-emerald-600 font-medium">
                  ✓ Instructions ready
                </div>
              )}
            </div>
          </div>

          {tempPrompt && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <div className="font-semibold text-emerald-900 mb-1">
                    Preview Active
                  </div>
                  <div className="text-emerald-700">
                    Your AI assistant will follow these instructions in all
                    conversations. You can change this anytime.
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!tempPrompt}
              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              Reset to Default
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-200 hover:bg-gray-50 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-emerald-500 hover:bg-emerald-600 text-white transition-colors duration-200"
              >
                Save Instructions
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
