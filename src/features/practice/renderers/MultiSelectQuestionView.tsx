import React from "react";
import { MultiSelectQuestion } from "../../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../../domain/sessions/types.ts";
import { Check, X, CheckSquare, Square } from "lucide-react";

interface MultiSelectQuestionViewProps {
  question: MultiSelectQuestion;
  optionOrder: string[];
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onToggle: (optionId: string) => void;
  disabled?: boolean;
}

export const MultiSelectQuestionView: React.FC<MultiSelectQuestionViewProps> = ({
  question,
  optionOrder,
  response,
  evaluation,
  onToggle,
  disabled = false,
}) => {
  const selectedOptionIds = new Set(
    response?.type === "multi-select" && Array.isArray(response.optionIds) ? response.optionIds : []
  );

  const orderedOptions = optionOrder
    .map((id) => question.options.find((o) => o.id === id))
    .filter(Boolean) as typeof question.options;

  const letters = ["A", "B", "C", "D", "E", "F"];

  return (
    <fieldset className="w-full border-none p-0 m-0">
      <legend className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider mb-2">
        Multiple Select (Select all correct options)
      </legend>
      <div className="flex flex-col gap-2.5">
        {orderedOptions.map((option, idx) => {
          const isSelected = selectedOptionIds.has(option.id);
          const letter = letters[idx] || `${idx + 1}`;
          const isEvaluated = Boolean(evaluation);
          const isCorrect = isEvaluated && question.correctOptionIds.includes(option.id);
          const isIncorrectSelection = isEvaluated && isSelected && !isCorrect;

          let containerClass =
            "group relative flex items-center justify-between p-3.5 sm:p-4 rounded-lg border text-left transition-all duration-150 cursor-pointer min-h-[48px] clickable-joy ";

          if (isEvaluated) {
            if (isCorrect) {
              containerClass += "bg-[#E8F7EE] border-[#16794B] text-[#172026] ring-1 ring-[#16794B] ";
            } else if (isIncorrectSelection) {
              containerClass += "bg-[#FDECEA] border-[#B42318] text-[#172026] ring-1 ring-[#B42318] ";
            } else {
              containerClass += "bg-white/60 border-[#D9DED9] text-[#5D6870] opacity-75 ";
            }
          } else if (isSelected) {
            containerClass += "bg-[#CCFBF1] border-[#0F766E] text-[#172026] ring-1 ring-[#0F766E] ";
          } else {
            containerClass += "bg-white border-[#D9DED9] text-[#172026] hover:border-[#0F766E]/50 hover:bg-[#F6F8F6] ";
          }

          return (
            <label
              key={option.id}
              id={`multi-option-label-${option.id}`}
              className={containerClass}
            >
              <div className="flex items-center gap-3 w-full pr-2">
                <input
                  type="checkbox"
                  name={`multi-question-${question.id}`}
                  value={option.id}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => !disabled && onToggle(option.id)}
                  className="sr-only"
                  aria-labelledby={`multi-option-text-${option.id}`}
                />

                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold shrink-0 transition-colors ${
                    isCorrect
                      ? "bg-[#16794B] text-white"
                      : isIncorrectSelection
                      ? "bg-[#B42318] text-white"
                      : isSelected
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#F6F8F6] text-[#5D6870] border border-[#D9DED9]"
                  }`}
                  aria-hidden="true"
                >
                  {isCorrect ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isIncorrectSelection ? (
                    <X className="w-4 h-4 stroke-[3]" />
                  ) : isSelected ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </div>

                <span
                  id={`multi-option-text-${option.id}`}
                  className="text-base font-normal leading-snug flex-1"
                >
                  <span className="font-semibold text-xs text-[#5D6870] mr-2">[{letter}]</span>
                  {option.text}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isEvaluated && isCorrect && (
                  <span className="text-xs font-semibold text-[#16794B] px-2 py-0.5 rounded bg-[#E8F7EE] border border-[#16794B]/30">
                    Required
                  </span>
                )}
                {isEvaluated && isIncorrectSelection && (
                  <span className="text-xs font-semibold text-[#B42318] px-2 py-0.5 rounded bg-[#FDECEA] border border-[#B42318]/30">
                    Incorrectly Chosen
                  </span>
                )}
                {!isEvaluated && (
                  <kbd
                    className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono text-[#5D6870] bg-[#F6F8F6] border border-[#D9DED9] rounded shadow-2xs"
                    title={`Press key ${idx + 1} to toggle`}
                  >
                    {idx + 1}
                  </kbd>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
