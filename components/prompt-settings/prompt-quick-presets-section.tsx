"use client";

import { Label } from "@/components/ui/label";
import PromptPresetCard from "@/components/prompt-settings/prompt-preset-card";
import { quickPrompts } from "@/utils/preset-prompts";

interface PromptQuickPresetsSectionProps {
  tempPrompt: string;
  universalPrompt: string;
  onPresetSelect: (prompt: string) => void;
}

const PromptQuickPresetsSection = ({
  tempPrompt,
  universalPrompt,
  onPresetSelect,
}: PromptQuickPresetsSectionProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-gray-700">
        Quick Presets
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {quickPrompts.map((preset) => {
          const isActive = preset.prompt === tempPrompt;
          const isSaved = preset.prompt === universalPrompt;

          return (
            <PromptPresetCard
              key={preset.name}
              preset={preset}
              isActive={isActive}
              isSaved={isSaved}
              onClick={() => onPresetSelect(preset.prompt)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PromptQuickPresetsSection;
