import React from "react";
import { ReadingSingleChoiceQuestion } from "../../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../../domain/sessions/types.ts";
import { BookOpen, Check, X } from "lucide-react";
import { PronounceButton } from "../../../components/common/PronounceButton.tsx";

interface ReadingQuestionViewProps {
  question: ReadingSingleChoiceQuestion;
  optionOrder: string[];
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

export const ReadingQuestionView: React.FC<ReadingQuestionViewProps> = ({
  question,
  optionOrder,
  response,
  evaluation,
  onSelect,
  disabled = false,
}) => {
  const selectedOptionId =
    response?.type === "reading-single-choice" ? response.optionId : undefined;

  const orderedOptions = optionOrder
    .map((id) => question.options.find((o) => o.id === id))
    .filter(Boolean) as typeof question.options;

  const letters = ["A", "B", "C", "D", "E", "F"];
  const isEvaluated = Boolean(evaluation);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
      {/* Reading passage column */}
      <article
        id="reading-passage-card"
        className="w-full lg:w-1/2 p-5 bg-white border border-[#D9DED9] rounded-lg shadow-2xs max-h-[500px] overflow-y-auto"
        aria-label="Reading Passage"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E7EBE7]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            <BookOpen className="w-4 h-4" />
            <span>Reading Passage</span>
          </div>
          <PronounceButton text={question.passage} size="sm" label="Listen to reading passage" />
        </div>
        <div className="prose prose-sm text-[#172026] leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {question.passage}
        </div>
      </article>

      {/* Comprehension Question and choices column */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-4">
          <span className="inline-block text-xs font-bold text-[#5D6870] uppercase tracking-wider mb-1">
            Question
          </span>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-[#172026] leading-snug">
              {question.prompt}
            </h3>
            <PronounceButton text={question.prompt} size="sm" label="Listen to question" />
          </div>
        </div>

        <fieldset className="w-full border-none p-0 m-0">
          <legend className="sr-only">Comprehension answer choices</legend>
          <div className="flex flex-col gap-2.5">
            {orderedOptions.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              const letter = letters[idx] || `${idx + 1}`;
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
                  id={`reading-option-${option.id}`}
                  className={containerClass}
                >
                  <div className="flex items-center gap-3 w-full pr-2">
                    <input
                      type="radio"
                      name={`reading-${question.id}`}
                      value={option.id}
                      checked={isSelected}
                      disabled={disabled}
                      onChange={() => !disabled && onSelect(option.id)}
                      className="sr-only"
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
                    >
                      {isCorrect ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isIncorrectSelection ? (
                        <X className="w-4 h-4 stroke-[3]" />
                      ) : (
                        letter
                      )}
                    </div>

                    <span className="text-sm sm:text-base leading-snug flex-1">
                      {option.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isEvaluated && isCorrect && (
                      <span className="text-xs font-semibold text-[#16794B] px-2 py-0.5 rounded bg-[#E8F7EE] border border-[#16794B]/30">
                        Correct
                      </span>
                    )}
                    {isEvaluated && isIncorrectSelection && (
                      <span className="text-xs font-semibold text-[#B42318] px-2 py-0.5 rounded bg-[#FDECEA] border border-[#B42318]/30">
                        Selected
                      </span>
                    )}
                    {!isEvaluated && (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono text-[#5D6870] bg-[#F6F8F6] border border-[#D9DED9] rounded">
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
    </div>
  );
};
