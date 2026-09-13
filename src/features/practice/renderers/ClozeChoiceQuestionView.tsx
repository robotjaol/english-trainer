import React from "react";
import { ClozeChoiceQuestion } from "../../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../../domain/sessions/types.ts";
import { Check, X } from "lucide-react";

interface ClozeChoiceQuestionViewProps {
  question: ClozeChoiceQuestion;
  optionOrder: string[];
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

export const ClozeChoiceQuestionView: React.FC<ClozeChoiceQuestionViewProps> = ({
  question,
  optionOrder,
  response,
  evaluation,
  onSelect,
  disabled = false,
}) => {
  const selectedOptionId = response?.type === "cloze-choice" ? response.optionId : undefined;
  const selectedOption = question.options.find((o) => o.id === selectedOptionId);

  const orderedOptions = optionOrder
    .map((id) => question.options.find((o) => o.id === id))
    .filter(Boolean) as typeof question.options;

  // Split prompt at {{blank}}
  const parts = question.prompt.split("{{blank}}");
  const beforeBlank = parts[0] || "";
  const afterBlank = parts[1] || "";

  const isEvaluated = Boolean(evaluation);

  return (
    <div className="w-full">
      {/* Cloze Interactive Sentence Box */}
      <div
        id="cloze-sentence-preview"
        className="mb-6 p-4 sm:p-5 rounded-lg bg-white border border-[#D9DED9] shadow-2xs text-lg leading-relaxed text-[#172026]"
      >
        <span>{beforeBlank}</span>
        <span
          className={`inline-block px-3 py-0.5 mx-1 rounded-md font-semibold border transition-all ${
            isEvaluated
              ? evaluation?.isCorrect
                ? "bg-[#E8F7EE] text-[#16794B] border-[#16794B]"
                : "bg-[#FDECEA] text-[#B42318] border-[#B42318]"
              : selectedOption
              ? "bg-[#CCFBF1] text-[#0F766E] border-[#0F766E]"
              : "bg-[#F6F8F6] text-[#5D6870] border-dashed border-[#8B98A0] min-w-[80px] text-center"
          }`}
        >
          {selectedOption ? selectedOption.text : "_______"}
        </span>
        <span>{afterBlank}</span>
      </div>

      {/* Answer options */}
      <fieldset className="w-full border-none p-0 m-0">
        <legend className="text-xs font-semibold text-[#5D6870] uppercase tracking-wider mb-2">
          Choose the best word to fill the blank:
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {orderedOptions.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = isEvaluated && question.correctOptionId === option.id;
            const isIncorrectSelection = isEvaluated && isSelected && !isCorrect;

            let containerClass =
              "group relative flex items-center justify-between p-3.5 rounded-lg border text-left transition-all duration-150 cursor-pointer min-h-[46px] ";

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
                id={`cloze-option-${option.id}`}
                className={containerClass}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name={`cloze-${question.id}`}
                    value={option.id}
                    checked={isSelected}
                    disabled={disabled}
                    onChange={() => !disabled && onSelect(option.id)}
                    className="sr-only"
                  />
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold shrink-0 ${
                      isCorrect
                        ? "bg-[#16794B] text-white"
                        : isIncorrectSelection
                        ? "bg-[#B42318] text-white"
                        : isSelected
                        ? "bg-[#0F766E] text-white"
                        : "bg-[#F6F8F6] text-[#5D6870] border border-[#D9DED9]"
                    }`}
                  >
                    {isCorrect ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isIncorrectSelection ? (
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className="font-medium">{option.text}</span>
                </div>

                <div className="flex items-center gap-1">
                  {isEvaluated && isCorrect && (
                    <span className="text-[11px] font-semibold text-[#16794B] px-1.5 py-0.5 rounded bg-[#E8F7EE]">
                      Correct
                    </span>
                  )}
                  {isEvaluated && isIncorrectSelection && (
                    <span className="text-[11px] font-semibold text-[#B42318] px-1.5 py-0.5 rounded bg-[#FDECEA]">
                      Chosen
                    </span>
                  )}
                  {!isEvaluated && (
                    <kbd className="hidden sm:inline-block px-1 py-0.5 text-[10px] font-mono text-[#5D6870] bg-[#F6F8F6] border border-[#D9DED9] rounded">
                      {idx + 1}
                    </kbd>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};
