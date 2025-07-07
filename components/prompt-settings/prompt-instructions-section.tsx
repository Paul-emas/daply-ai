"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { PresetPrompt } from "@/types/prompt";

interface PromptInstructionsSectionProps {
  tempPrompt: string;
  onPromptChange: (value: string) => void;
  activePreset?: PresetPrompt;
}

const PromptInstructionsSection = ({
  tempPrompt,
  onPromptChange,
  activePreset,
}: PromptInstructionsSectionProps) => {
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="prompt"
            className="text-sm font-semibold text-gray-700"
          >
            Custom Instructions
          </Label>
          {!activePreset && tempPrompt && (
            <Badge variant="outline" className="text-xs">
              Custom
            </Badge>
          )}
        </div>
        <Textarea
          id="prompt"
          value={tempPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          maxLength={450}
          placeholder="Describe how you want your AI assistant to behave, respond, and interact with you..."
          className="min-h-[120px] resize-none rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-200"
        />
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {tempPrompt.length}/450 characters
          </div>
          <div className="flex items-center gap-2">
            {activePreset && (
              <div className="text-xs text-emerald-600 font-medium">
                ✓ {activePreset.name} selected
              </div>
            )}
            {!activePreset && tempPrompt && (
              <div className="text-xs text-emerald-600 font-medium">
                ✓ Custom instructions ready
              </div>
            )}
          </div>
        </div>
      </div>

      {tempPrompt && (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <div className="font-semibold text-emerald-900 mb-1">
                {activePreset
                  ? `${activePreset.name} Active`
                  : "Custom instructions"}
              </div>
              <div className="text-emerald-700 text-xs">
                Your AI assistant will follow these instructions in all
                conversations. You can change this anytime.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptInstructionsSection;
