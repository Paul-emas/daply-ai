"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PresetPrompt } from "@/types/prompt";

interface PromptPresetCardProps {
  preset: PresetPrompt;
  isActive: boolean;
  isSaved: boolean;
  onClick: () => void;
}

const PromptPresetCard = ({
  preset,
  isActive,
  isSaved,
  onClick,
}: PromptPresetCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2.5 text-left rounded-xl border transition-all duration-200 group relative
        ${
          isActive
            ? "bg-emerald-50 border-emerald-300 shadow-sm"
            : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
        }
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`
          w-8 h-8 rounded-lg flex items-center justify-center transition-colors
          ${
            isActive
              ? "bg-emerald-200"
              : "bg-emerald-100 group-hover:bg-emerald-200"
          }
        `}
        >
          <preset.icon className="w-4 h-4 text-emerald-600" />
        </div>
        <span
          className={`
          font-medium text-sm
          ${isActive ? "text-emerald-900" : "text-gray-800"}
        `}
        >
          {preset.name}
        </span>
      </div>
      <p
        className={`
        text-xs line-clamp-2
        ${isActive ? "text-emerald-700" : "text-gray-600"}
      `}
      >
        {preset.prompt}
      </p>

      {isSaved && (
        <div className="ml-auto mt-2 flex">
          <Badge className="bg-emerald-500 text-white text-[10px] px-2 py-0.5">
            <Check className="w-3 h-3 mr-1" />
            Saved
          </Badge>
        </div>
      )}

      {isActive && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
      )}
    </button>
  );
};

export default PromptPresetCard;
