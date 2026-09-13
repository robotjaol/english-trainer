import React from "react";
import { Flag } from "lucide-react";

interface ProgressIndicatorProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  isFlagged: boolean;
  onToggleFlag: () => void;
  mode: "practice" | "assessment" | "review";
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentIndex,
  totalQuestions,
  answeredCount,
  isFlagged,
  onToggleFlag,
  mode,
}) => {
  const percentComplete = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const modeBadgeText =
    mode === "practice"
      ? "Practice Mode"
      : mode === "assessment"
      ? "Assessment Mode"
      : "Review Mode";

  const modeBadgeClass =
    mode === "practice"
      ? "bg-[#CCFBF1] text-[#0F766E] border-[#0F766E]/20"
      : mode === "assessment"
      ? "bg-[#FFF4CC] text-[#9A6700] border-[#9A6700]/20"
      : "bg-[#EBF3FF] text-[#175CD3] border-[#175CD3]/20";

  return (
    <div id="progress-indicator-container" className="w-full mb-6">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2.5">
          <span
            id="mode-badge"
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${modeBadgeClass}`}
          >
            {modeBadgeText}
          </span>
          <span className="text-sm font-semibold text-[#172026]">
            Question {currentIndex + 1}{" "}
            <span className="text-[#5D6870] font-normal">of {totalQuestions}</span>
          </span>
          <span className="hidden sm:inline-block text-xs text-[#5D6870]">
            ({answeredCount} answered)
          </span>
        </div>

        <button
          id="flag-question-button"
          type="button"
          onClick={onToggleFlag}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
            isFlagged
              ? "bg-[#FFF4CC] text-[#9A6700] border-[#9A6700] font-semibold"
              : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6] hover:text-[#172026]"
          }`}
          aria-pressed={isFlagged}
          title={isFlagged ? "Remove question flag" : "Flag question for later review"}
        >
          <Flag className={`w-3.5 h-3.5 ${isFlagged ? "fill-current" : ""}`} aria-hidden="true" />
          <span>{isFlagged ? "Flagged" : "Flag for Review"}</span>
        </button>
      </div>

      {/* Accessible visual progress bar */}
      <div
        className="w-full h-1.5 bg-[#E7EBE7] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
      >
        <div
          className="h-full bg-[#0F766E] transition-all duration-200 ease-out"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </div>
  );
};
