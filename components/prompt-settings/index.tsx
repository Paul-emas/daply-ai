"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Settings } from "lucide-react";
import PromptInstructionsSection from "@/components/prompt-settings/prompt-instructions-section";
import { quickPrompts } from "@/utils/preset-prompts";
import PromptQuickPresetsSection from "./prompt-quick-presets-section";

export interface PromptSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  universalPrompt: string;
  onPromptChange: (prompt: string) => void;
}

const PromptSettings = ({
  isOpen,
  onClose,
  universalPrompt,
  onPromptChange,
}: PromptSettingsProps) => {
  const [tempPrompt, setTempPrompt] = useState<string>(universalPrompt);

  const handleSave = () => {
    if (!tempPrompt) return;
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

  const activePreset = useMemo(
    () => quickPrompts.find((preset) => preset.prompt === tempPrompt),
    [tempPrompt]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 items-center flex gap-2">
                Custom Instructions{" "}
                {universalPrompt && (
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Active
                  </Badge>
                )}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-sm leading-relaxed text-gray-600">
            Customize how your AI assistant behaves and responds. Choose a
            preset or create your own custom instructions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <PromptQuickPresetsSection
            tempPrompt={tempPrompt}
            universalPrompt={universalPrompt}
            onPresetSelect={setTempPrompt}
          />

          <PromptInstructionsSection
            tempPrompt={tempPrompt}
            onPromptChange={setTempPrompt}
            activePreset={activePreset}
          />

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
};

export default PromptSettings;
