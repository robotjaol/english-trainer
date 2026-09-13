import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundEngine } from "../../utils/soundEngine.ts";

interface PronounceButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
  label?: string;
}

export const PronounceButton: React.FC<PronounceButtonProps> = ({
  text,
  className = "",
  size = "sm",
  label = "Listen to pronunciation",
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      soundEngine.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      soundEngine.speak(text, () => {
        setIsSpeaking(false);
      });
    }
  };

  const iconClass = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1 text-[#5D6870] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 rounded p-1 transition-colors cursor-pointer ${
        isSpeaking ? "text-[#0F766E] bg-[#CCFBF1]/60 animate-pulse" : ""
      } ${className}`}
    >
      <Volume2 className={iconClass} />
    </button>
  );
};
