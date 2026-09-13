import React from "react";
import { ErrorIdentificationQuestion } from "../../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../../domain/sessions/types.ts";
import { AlertTriangle, Check, X } from "lucide-react";

interface ErrorIdentificationViewProps {
  question: ErrorIdentificationQuestion;
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onSelectSegment: (segmentId: string) => void;
  disabled?: boolean;
}

export const ErrorIdentificationView: React.FC<ErrorIdentificationViewProps> = ({
  question,
  response,
  evaluation,
  onSelectSegment,
  disabled = false,
}) => {
  const selectedSegmentId =
    response?.type === "error-identification" ? response.segmentId : undefined;
  const isEvaluated = Boolean(evaluation);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#9A6700]">
        <AlertTriangle className="w-4 h-4" />
        <span>Select the segment with the error:</span>
      </div>

      {/* Sentence flow with clickable highlighted segments */}
      <div
        id="error-sentence-flow"
        className="p-4 sm:p-5 mb-5 rounded-lg bg-white border border-[#D9DED9] shadow-2xs leading-relaxed text-base sm:text-lg flex flex-wrap gap-1.5 items-center"
      >
        {question.segments.map((seg, idx) => {
          const isSelected = selectedSegmentId === seg.id;
          const isErrorSegment = isEvaluated && question.incorrectSegmentId === seg.id;
          const isIncorrectSelection = isEvaluated && isSelected && !isErrorSegment;

          let segClass =
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-sm font-medium transition-all cursor-pointer ";

          if (isEvaluated) {
            if (isErrorSegment) {
              segClass += "bg-[#E8F7EE] border-[#16794B] text-[#16794B] ring-2 ring-[#16794B]/30 font-bold ";
            } else if (isIncorrectSelection) {
              segClass += "bg-[#FDECEA] border-[#B42318] text-[#B42318] ring-2 ring-[#B42318]/30 font-bold ";
            } else {
              segClass += "bg-white border-[#E7EBE7] text-[#5D6870] opacity-80 ";
            }
          } else if (isSelected) {
            segClass += "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E] ring-2 ring-[#0F766E]/30 font-semibold ";
          } else {
            segClass += "bg-[#F6F8F6] border-[#D9DED9] text-[#172026] hover:border-[#0F766E] hover:bg-[#CCFBF1]/20 ";
          }

          return (
            <button
              key={seg.id}
              type="button"
              id={`segment-btn-${seg.id}`}
              disabled={disabled}
              onClick={() => !disabled && onSelectSegment(seg.id)}
              className={segClass}
              aria-pressed={isSelected}
            >
              <span className="text-xs px-1 py-0.2 rounded bg-black/5 font-mono text-[#5D6870]">
                {idx + 1}
              </span>
              <span>{seg.text}</span>
            </button>
          );
        })}
      </div>

      {/* Segment List Options */}
      <div className="flex flex-col gap-2">
        {question.segments.map((seg, idx) => {
          const isSelected = selectedSegmentId === seg.id;
          const isErrorSegment = isEvaluated && question.incorrectSegmentId === seg.id;
          const isIncorrectSelection = isEvaluated && isSelected && !isErrorSegment;

          return (
            <button
              key={seg.id}
              type="button"
              id={`segment-choice-${seg.id}`}
              disabled={disabled}
              onClick={() => !disabled && onSelectSegment(seg.id)}
              className={`flex items-center justify-between p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                isEvaluated
                  ? isErrorSegment
                    ? "bg-[#E8F7EE] border-[#16794B] text-[#172026]"
                    : isIncorrectSelection
                    ? "bg-[#FDECEA] border-[#B42318] text-[#172026]"
                    : "bg-white border-[#D9DED9] text-[#5D6870] opacity-75"
                  : isSelected
                  ? "bg-[#CCFBF1] border-[#0F766E] text-[#172026] ring-1 ring-[#0F766E]"
                  : "bg-white border-[#D9DED9] text-[#172026] hover:bg-[#F6F8F6]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                    isErrorSegment
                      ? "bg-[#16794B] text-white"
                      : isIncorrectSelection
                      ? "bg-[#B42318] text-white"
                      : isSelected
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#F6F8F6] text-[#5D6870] border border-[#D9DED9]"
                  }`}
                >
                  {isErrorSegment ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : isIncorrectSelection ? (
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className="text-sm font-medium">"{seg.text}"</span>
              </div>

              <div className="flex items-center gap-2">
                {isEvaluated && isErrorSegment && (
                  <span className="text-xs font-semibold text-[#16794B] bg-[#E8F7EE] px-2 py-0.5 rounded border border-[#16794B]/30">
                    Contains Error
                  </span>
                )}
                {isEvaluated && isIncorrectSelection && (
                  <span className="text-xs font-semibold text-[#B42318] bg-[#FDECEA] px-2 py-0.5 rounded border border-[#B42318]/30">
                    Your Selection
                  </span>
                )}
                {!isEvaluated && (
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono text-[#5D6870] bg-[#F6F8F6] border border-[#D9DED9] rounded">
                    {idx + 1}
                  </kbd>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
