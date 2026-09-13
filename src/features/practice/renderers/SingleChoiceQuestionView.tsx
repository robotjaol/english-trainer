import React from "react";
import { SingleChoiceQuestion } from "../../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../../domain/sessions/types.ts";
import { Check, X } from "lucide-react";
import { PronounceButton } from "../../../components/common/PronounceButton.tsx";

interface SingleChoiceQuestionViewProps {
  question: SingleChoiceQuestion;
  optionOrder: string[];
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

export const SingleChoiceQuestionView: React.FC<SingleChoiceQuestionViewProps> = ({
  question,
  optionOrder,
  response,
  evaluation,
  onSelect,
  disabled = false,
}) => {
  const selectedOptionId = response?.type === "single-choice" ? response.optionId : undefined;
  const orderedOptions = optionOrder
    .map((id) => question.options.find((o) => o.id === id))
    .filter(Boolean) as typeof question.options;

  const letters = ["A", "B", "C", "D", "E", "F"];

  return (
    <fieldset className="w-full border-none p-0 m-0">
      <legend className="sr-only">Answer options</legend>
      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Choices">
        {orderedOptions.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = letters[idx] || `${idx + 1}`;
          const isEvaluated = Boolean(evaluation);
          const isCorrect = isEvaluated && question.correctOptionId === option.id;
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
              id={`option-label-${option.id}`}
              className={containerClass}
            >
              <div className="flex items-center gap-3 w-full pr-2">
                {/* Native hidden radio input for screen reader and keyboard accessibility */}
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => !disabled && onSelect(option.id)}
                  className="sr-only"
                  aria-labelledby={`option-text-${option.id}`}
                />

                {/* Option letter marker */}
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold shrink-0 transition-colors ${
                    isCorrect
                      ? "bg-[#16794B] text-white"
                      : isIncorrectSelection
                      ? "bg-[#B42318] text-white"
                      : isSelected
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#F6F8F6] text-[#5D6870] border border-[#D9DED9] group-hover:border-[#0F766E]"
                  }`}
                  aria-hidden="true"
                >
                  {isCorrect ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isIncorrectSelection ? (
                    <X className="w-4 h-4 stroke-[3]" />
                  ) : (
                    letter
                  )}
                </div>

                {/* Option text */}
                <span
                  id={`option-text-${option.id}`}
                  className="text-base font-normal leading-snug flex-1"
                >
                  {option.text}
                </span>
              </div>

              {/* Shortcut badge, pronounce button and correctness badges */}
              <div className="flex items-center gap-1.5 shrink-0">
                <PronounceButton text={option.text} size="sm" label={`Pronounce option ${letter}`} />
                {isEvaluated && isCorrect && (
                  <span className="text-xs font-semibold text-[#16794B] px-2 py-0.5 rounded bg-[#E8F7EE] border border-[#16794B]/30">
                    Correct
                  </span>
                )}
                {isEvaluated && isIncorrectSelection && (
                  <span className="text-xs font-semibold text-[#B42318] px-2 py-0.5 rounded bg-[#FDECEA] border border-[#B42318]/30">
                    Your Choice
                  </span>
                )}
                {!isEvaluated && (
                  <kbd
                    className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono text-[#5D6870] bg-[#F6F8F6] border border-[#D9DED9] rounded shadow-2xs"
                    title={`Press key ${idx + 1} to select`}
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
